import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { ScrapedData, Match, PointsTableEntry, Team, HistoricalMatch, PlayerStats, TeamHistory, PerformanceMetrics } from '../../types';

// Cache to avoid too many requests to the website
// Learned this from Next.js docs - helps with performance
let cachedData: ScrapedData | null = null;
let lastCacheUpdate = 0;
const CACHE_DURATION = 3 * 60 * 1000; // 3 minutes - found this works well

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Check if we have cached data and it's still fresh
    const now = Date.now();
    if (cachedData && (now - lastCacheUpdate) < CACHE_DURATION) {
      return res.status(200).json({
        ...cachedData,
        cacheStatus: 'hit',
        cacheAge: Math.floor((now - lastCacheUpdate) / 1000)
      });
    }

    // Try to get fresh data from IPL website
    const scrapedData = await fetchIPLData();
    
    // Update our cache with new data
    cachedData = scrapedData;
    lastCacheUpdate = now;
    
    res.status(200).json({
      ...scrapedData,
      cacheStatus: 'miss',
      cacheAge: 0
    });
  } catch (error) {
    // If scraping fails, use dummy data so the app still works
    // This was tricky to implement but makes the app more reliable
    const fallbackData = generateFallbackData();
    res.status(200).json({
      ...fallbackData,
      cacheStatus: 'fallback',
      cacheAge: 0,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

async function fetchIPLData(): Promise<ScrapedData> {
  try {
    // Fetch the main IPL website page
    // Using axios because it's easier than fetch() for this
    const response = await axios.get('https://www.iplt20.com', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1'
      },
      timeout: 15000 // 15 second timeout to avoid hanging
    });

    // Parse the HTML using cheerio (like jQuery for Node.js)
    // This was the hardest part to learn but very useful
    const $ = cheerio.load(response.data);
    
    // Extract different types of data from the page
    const liveMatch = extractLiveMatch($);
    const upcomingMatches = extractUpcomingMatches($);
    const pointsTable = extractPointsTable($);

    // If we found any data, return it
    if (liveMatch || upcomingMatches.length > 0 || pointsTable.length > 0) {
      return {
        liveMatch,
        upcomingMatches,
        pointsTable,
        schedule: [...upcomingMatches],
        lastUpdated: new Date().toISOString(),
        dataSource: 'ipl_official'
      };
    }

    // If no data found, throw error to trigger fallback
    throw new Error('No data found on IPL website');
  } catch (error) {
    console.error('Scraping failed:', error);
    throw error;
  }
}

function extractLiveMatch($: cheerio.CheerioAPI): Match | null {
  // Look for live match elements on the page
  // Using multiple selectors because website structure changes
  const liveSelectors = [
    '.live-match', '.match-live', '.live', '[class*="live"]',
    '.match[class*="live"]', '.fixture[class*="live"]',
    '.live-score', '.live-update', '.live-indicator',
    'div:contains("LIVE")', 'span:contains("Live")',
    '.matchCenter', '.matches-main', '.matches-container'
  ];

  for (const selector of liveSelectors) {
    try {
      const liveElement = $(selector).first();
      if (liveElement.length > 0) {
        // Try different ways to find team names
        const team1Name = liveElement.find('.team1, .team-1, .team-a, .team-name:first, h3:first').text().trim();
        const team2Name = liveElement.find('.team2, .team-2, .team-b, .team-name:last, h3:last').text().trim();
        
        if (team1Name && team2Name && team1Name !== team2Name) {
          return {
            id: `live-${Date.now()}`,
            team1: createTeam(team1Name),
            team2: createTeam(team2Name),
            date: new Date().toISOString().split('T')[0],
            time: 'Live',
            venue: 'Live Match',
            status: 'live',
            score1: 'N/A',
            score2: 'N/A'
          };
        }
      }
    } catch (error) {
      continue; // Try next selector
    }
  }
  
  return null;
}

function extractUpcomingMatches($: cheerio.CheerioAPI): Match[] {
  const matches: Match[] = [];
  
  // Try multiple selectors for match elements
  const matchSelectors = [
    '.match-item', '.fixture', '.match', '.game',
    'table tbody tr', '.matches-container .match',
    '.schedule-item', '.fixture-item'
  ];

  for (const selector of matchSelectors) {
    try {
      $(selector).each((index, element) => {
        const $element = $(element);
        
        // Try different ways to find team names
        const team1Name = $element.find('.team1, .team-1, .team-a, td:first-child, .team-name:first').text().trim();
        const team2Name = $element.find('.team2, .team-2, .team-b, td:nth-child(2), .team-name:last').text().trim();
        
        // Make sure we have both team names and they're different
        if (team1Name && team2Name && team1Name !== team2Name && team1Name.length > 2 && team2Name.length > 2) {
          // Check if this match is not already added
          const existingMatch = matches.find(m => 
            m.team1.name === team1Name && m.team2.name === team2Name
          );
          
          if (!existingMatch) {
            matches.push({
              id: `upcoming-${index}`,
              team1: createTeam(team1Name),
              team2: createTeam(team2Name),
              date: new Date(Date.now() + (index + 1) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              time: '19:30 IST',
              venue: 'TBD',
              status: 'upcoming'
            });
          }
        }
      });
      
      // If we found matches, break out of the selector loop
      if (matches.length > 0) break;
    } catch (error) {
      continue; // Try next selector
    }
  }
  
  // Return only first 5 matches to keep it simple
  return matches.slice(0, 5);
}

function extractPointsTable($: cheerio.CheerioAPI): PointsTableEntry[] {
  const pointsTable: PointsTableEntry[] = [];
  
  // Try multiple selectors for points table
  const tableSelectors = [
    'table tbody tr', '.points-table tr', '.standings-table tr',
    '.table tbody tr', '.leaderboard tr', '.rankings tr'
  ];

  for (const selector of tableSelectors) {
    try {
      $(selector).each((index, row) => {
        const $row = $(row);
        const cells = $row.find('td');
        
        // Make sure we have enough cells for all the data we need
        if (cells.length >= 4) {
          // Try different cell positions for team name
          const teamName = cells.eq(1).text().trim() || 
                          cells.eq(0).text().trim() || 
                          $row.find('.team-name, .team').text().trim();
          
          // Only add if team name is valid (more than 2 characters)
          if (teamName && teamName.length > 2 && teamName.length < 50) {
            // Try to extract numbers from cells
            const played = parseInt(cells.eq(2).text().replace(/[^\d]/g, '')) || 0;
            const won = parseInt(cells.eq(3).text().replace(/[^\d]/g, '')) || 0;
            const lost = parseInt(cells.eq(4).text().replace(/[^\d]/g, '')) || 0;
            const points = parseInt(cells.eq(5).text().replace(/[^\d]/g, '')) || 0;
            const nrrText = cells.eq(6).text().replace(/[^\d.-]/g, '');
            const netRunRate = parseFloat(nrrText) || 0;
            
            // Check if this team is not already added
            const existingTeam = pointsTable.find(pt => pt.team.name === teamName);
            if (!existingTeam) {
              pointsTable.push({
                team: createTeam(teamName),
                played,
                won,
                lost,
                tied: 0,
                noResult: 0,
                points,
                netRunRate,
                position: pointsTable.length + 1
              });
            }
          }
        }
      });
      
      // If we found teams, break out of the selector loop
      if (pointsTable.length > 0) break;
    } catch (error) {
      continue; // Try next selector
    }
  }
  
  // Return only first 10 teams
  return pointsTable.slice(0, 10);
}

function createTeam(name: string): Team {
  // Map team names to their short names
  // This makes the UI cleaner
  const shortNames: { [key: string]: string } = {
    'mumbai indians': 'MI',
    'chennai super kings': 'CSK',
    'royal challengers': 'RCB',
    'kolkata knight riders': 'KKR',
    'delhi capitals': 'DC',
    'punjab kings': 'PBKS',
    'rajasthan royals': 'RR',
    'sunrisers hyderabad': 'SRH',
    'gujarat titans': 'GT',
    'lucknow super giants': 'LSG'
  };
  
  const normalizedName = name.toLowerCase();
  // If we don't have a short name, create one from initials
  const shortName = shortNames[normalizedName] || name.split(' ').map(word => word[0]).join('').toUpperCase();
  
  return {
    id: name.toLowerCase().replace(/\s+/g, ''),
    name: name,
    shortName: shortName
  };
}

function generateFallbackData(): ScrapedData {
  // Create dummy data when scraping fails
  // This ensures the app always has something to show
  const teams = [
    { id: 'mumbai-indians', name: 'Mumbai Indians', shortName: 'MI' },
    { id: 'chennai-super-kings', name: 'Chennai Super Kings', shortName: 'CSK' },
    { id: 'royal-challengers', name: 'Royal Challengers', shortName: 'RCB' },
    { id: 'kolkata-knight-riders', name: 'Kolkata Knight Riders', shortName: 'KKR' },
    { id: 'delhi-capitals', name: 'Delhi Capitals', shortName: 'DC' }
  ];

  // 30% chance of having a live match (makes it more realistic)
  const liveMatch = Math.random() > 0.7 ? {
    id: 'live-1',
    team1: teams[0],
    team2: teams[1],
    date: new Date().toISOString().split('T')[0],
    time: 'Live',
    venue: 'Wankhede Stadium, Mumbai',
    status: 'live' as const,
    score1: '156/4 (18.2)',
    score2: 'Yet to bat'
  } : null;

  // Create some upcoming matches
  const upcomingMatches: Match[] = [
    {
      id: 'upcoming-1',
      team1: teams[2],
      team2: teams[3],
      date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      time: '19:30 IST',
      venue: 'M. Chinnaswamy Stadium, Bangalore',
      status: 'upcoming'
    },
    {
      id: 'upcoming-2',
      team1: teams[4],
      team2: teams[0],
      date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      time: '19:30 IST',
      venue: 'Arun Jaitley Stadium, Delhi',
      status: 'upcoming'
    }
  ];

  // Create a points table with realistic data
  const pointsTable: PointsTableEntry[] = teams.map((team, index) => ({
    team,
    played: 10 + index,
    won: 6 + Math.floor(index / 2),
    lost: 4 + Math.floor(index / 2),
    tied: 0,
    noResult: 0,
    points: (6 + Math.floor(index / 2)) * 2,
    netRunRate: (Math.random() - 0.5) * 2,
    position: index + 1
  }));

  // Create historical matches data
  const historicalMatches: HistoricalMatch[] = [
    {
      id: '1',
      date: '2024-05-15',
      team1: 'Mumbai Indians',
      team2: 'Chennai Super Kings',
      team1Score: '185/6 (20.0)',
      team2Score: '182/8 (20.0)',
      result: 'Mumbai Indians won by 3 runs',
      venue: 'Wankhede Stadium, Mumbai',
      playerOfTheMatch: 'Rohit Sharma',
      highlights: ['Rohit Sharma scored 89 runs', 'MS Dhoni hit 3 sixes in final over', 'Thrilling finish']
    },
    {
      id: '2',
      date: '2024-05-14',
      team1: 'Royal Challengers',
      team2: 'Kolkata Knight Riders',
      team1Score: '205/4 (20.0)',
      team2Score: '208/6 (19.2)',
      result: 'Kolkata Knight Riders won by 4 wickets',
      venue: 'M. Chinnaswamy Stadium, Bangalore',
      playerOfTheMatch: 'Andre Russell',
      highlights: ['Virat Kohli century', 'Andre Russell 5-wicket haul', 'Super over finish']
    },
    {
      id: '3',
      date: '2024-05-13',
      team1: 'Delhi Capitals',
      team2: 'Punjab Kings',
      team1Score: '165/7 (20.0)',
      team2Score: '166/5 (18.3)',
      result: 'Punjab Kings won by 5 wickets',
      venue: 'Arun Jaitley Stadium, Delhi',
      playerOfTheMatch: 'Shikhar Dhawan',
      highlights: ['Shikhar Dhawan 75 runs', 'Kagiso Rabada 3 wickets', 'Clinical chase']
    },
    {
      id: '4',
      date: '2024-05-12',
      team1: 'Rajasthan Royals',
      team2: 'Sunrisers Hyderabad',
      team1Score: '178/6 (20.0)',
      team2Score: '175/8 (20.0)',
      result: 'Rajasthan Royals won by 3 runs',
      venue: 'Sawai Mansingh Stadium, Jaipur',
      playerOfTheMatch: 'Jos Buttler',
      highlights: ['Jos Buttler 82 runs', 'Rashid Khan 4 wickets', 'Last ball thriller']
    },
    {
      id: '5',
      date: '2024-05-11',
      team1: 'Gujarat Titans',
      team2: 'Lucknow Super Giants',
      team1Score: '192/5 (20.0)',
      team2Score: '188/7 (20.0)',
      result: 'Gujarat Titans won by 4 runs',
      venue: 'Narendra Modi Stadium, Ahmedabad',
      playerOfTheMatch: 'Hardik Pandya',
      highlights: ['Hardik Pandya all-round performance', 'KL Rahul 67 runs', 'Tight finish']
    }
  ];

  // Create player stats data
  const playerStats: PlayerStats[] = [
    {
      name: 'Virat Kohli',
      team: 'Royal Challengers',
      matches: 14,
      runs: 973,
      wickets: 0,
      catches: 8,
      strikeRate: 152.3,
      economy: 0,
      form: ['W', 'W', 'L', 'W', 'W']
    },
    {
      name: 'Rohit Sharma',
      team: 'Mumbai Indians',
      matches: 14,
      runs: 892,
      wickets: 0,
      catches: 12,
      strikeRate: 145.8,
      economy: 0,
      form: ['W', 'L', 'W', 'W', 'L']
    },
    {
      name: 'Jasprit Bumrah',
      team: 'Mumbai Indians',
      matches: 14,
      runs: 45,
      wickets: 24,
      catches: 3,
      strikeRate: 120.5,
      economy: 7.2,
      form: ['W', 'W', 'L', 'W', 'W']
    },
    {
      name: 'Andre Russell',
      team: 'Kolkata Knight Riders',
      matches: 14,
      runs: 567,
      wickets: 18,
      catches: 6,
      strikeRate: 178.9,
      economy: 8.1,
      form: ['W', 'L', 'W', 'L', 'W']
    },
    {
      name: 'Rashid Khan',
      team: 'Gujarat Titans',
      matches: 14,
      runs: 234,
      wickets: 22,
      catches: 4,
      strikeRate: 145.2,
      economy: 6.8,
      form: ['W', 'W', 'W', 'L', 'W']
    }
  ];

  // Create team history data
  const teamHistory: TeamHistory[] = [
    {
      team: 'Mumbai Indians',
      season: '2024',
      matches: 14,
      wins: 10,
      losses: 4,
      points: 20,
      netRunRate: 0.523,
      position: 1,
      playoffs: true
    },
    {
      team: 'Chennai Super Kings',
      season: '2024',
      matches: 14,
      wins: 9,
      losses: 5,
      points: 18,
      netRunRate: 0.412,
      position: 2,
      playoffs: true
    },
    {
      team: 'Royal Challengers',
      season: '2024',
      matches: 14,
      wins: 8,
      losses: 6,
      points: 16,
      netRunRate: 0.298,
      position: 3,
      playoffs: true
    },
    {
      team: 'Kolkata Knight Riders',
      season: '2024',
      matches: 14,
      wins: 8,
      losses: 6,
      points: 16,
      netRunRate: 0.187,
      position: 4,
      playoffs: true
    },
    {
      team: 'Delhi Capitals',
      season: '2024',
      matches: 14,
      wins: 7,
      losses: 7,
      points: 14,
      netRunRate: 0.045,
      position: 5,
      playoffs: false
    }
  ];

  // Create performance metrics data
  const performanceMetrics: PerformanceMetrics[] = [
    {
      team: 'Mumbai Indians',
      battingAverage: 165.4,
      bowlingAverage: 142.3,
      runRate: 8.45,
      wicketRate: 6.8,
      winPercentage: 71.4,
      form: ['W', 'W', 'L', 'W', 'W']
    },
    {
      team: 'Chennai Super Kings',
      battingAverage: 158.7,
      bowlingAverage: 145.2,
      runRate: 8.12,
      wicketRate: 6.5,
      winPercentage: 64.3,
      form: ['W', 'L', 'W', 'W', 'L']
    },
    {
      team: 'Royal Challengers',
      battingAverage: 172.3,
      bowlingAverage: 148.9,
      runRate: 8.78,
      wicketRate: 7.2,
      winPercentage: 57.1,
      form: ['L', 'W', 'W', 'L', 'W']
    },
    {
      team: 'Kolkata Knight Riders',
      battingAverage: 156.8,
      bowlingAverage: 151.4,
      runRate: 7.95,
      wicketRate: 6.9,
      winPercentage: 57.1,
      form: ['W', 'L', 'L', 'W', 'W']
    },
    {
      team: 'Delhi Capitals',
      battingAverage: 149.2,
      bowlingAverage: 153.7,
      runRate: 7.68,
      wicketRate: 7.1,
      winPercentage: 50.0,
      form: ['L', 'W', 'W', 'L', 'L']
    }
  ];

  return {
    liveMatch,
    upcomingMatches,
    pointsTable,
    schedule: [...upcomingMatches],
    lastUpdated: new Date().toISOString(),
    dataSource: 'fallback',
    historicalMatches,
    playerStats,
    teamHistory,
    performanceMetrics
  };
}
