// types/index.ts
export interface Team {
    id: string;
    name: string;
    shortName: string;
    logo?: string;
  }
  
  export interface Match {
    id: string;
    team1: Team;
    team2: Team;
    date: string;
    time: string;
    venue: string;
    status: 'upcoming' | 'live' | 'completed';
    result?: string;
    score1?: string;
    score2?: string;
    matchNumber?: string;
    format?: string;
  }
  
  export interface PointsTableEntry {
    team: Team;
    played: number;
    won: number;
    lost: number;
    tied: number;
    noResult: number;
    points: number;
    netRunRate: number;
    position: number;
  }

  export interface LiveScore {
    team1Score: string;
    team2Score: string;
    overs: string;
    status: string;
  }

  export interface HistoricalMatch {
    id: string;
    date: string;
    team1: string;
    team2: string;
    team1Score: string;
    team2Score: string;
    result: string;
    venue: string;
    playerOfTheMatch?: string;
    highlights: string[];
  }

  export interface PlayerStats {
    name: string;
    team: string;
    matches: number;
    runs: number;
    wickets: number;
    catches: number;
    strikeRate: number;
    economy: number;
    form: string[];
  }

  export interface TeamHistory {
    team: string;
    season: string;
    matches: number;
    wins: number;
    losses: number;
    points: number;
    netRunRate: number;
    position: number;
    playoffs: boolean;
  }

  export interface PerformanceMetrics {
    team: string;
    battingAverage: number;
    bowlingAverage: number;
    runRate: number;
    wicketRate: number;
    winPercentage: number;
    form: string[];
  }
  
  export interface ScrapedData {
    liveMatch: Match | null;
    upcomingMatches: Match[];
    pointsTable: PointsTableEntry[];
    schedule: Match[];
    lastUpdated?: string;
    dataSource?: string;
    historicalMatches?: HistoricalMatch[];
    playerStats?: PlayerStats[];
    teamHistory?: TeamHistory[];
    performanceMetrics?: PerformanceMetrics[];
  }