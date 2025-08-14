# IPL T20 Live Dashboard

A responsive dashboard application that displays real-time IPL T20 match information sourced from iplt20.com. Built with Next.js, TypeScript, and Tailwind CSS.

## 🏏 Features

- **Live Match Display**: Shows current live match details when available
- **Upcoming Matches**: Displays future matches with timings and venues
- **Points Table**: Current IPL standings with team performance metrics
- **Match Schedule**: Complete fixture list with dates and teams
- **Mobile-First Design**: Responsive design optimized for mobile devices
- **Real-time Updates**: Data refreshes automatically every 3 minutes
- **Fallback Data**: Uses dummy data when scraping fails

## 🛠️ Tech Stack

- **Frontend**: Next.js 15.4.6, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Data Fetching**: Axios, Cheerio (web scraping)
- **Deployment**: Vercel (recommended)

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Setup Instructions

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd ipl-dashboard
```

2. **Install dependencies**
```bash
npm install
```

3. **Run the development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production
```bash
npm run build
npm start
```

## 🕷️ Scraping Methodology

### Data Sources
The application scrapes data from the official IPL website:
- **Main Page**: `https://www.iplt20.com` - Live matches and general info
- **Matches Page**: `https://www.iplt20.com/matches/results` - Match schedule
- **Points Table**: `https://www.iplt20.com/points-table/men` - Team standings

### Scraping Process
1. **HTTP Request**: Uses Axios to fetch HTML pages with proper headers
2. **HTML Parsing**: Cheerio library parses the HTML (like jQuery for Node.js)
3. **Data Extraction**: CSS selectors find specific elements containing match data
4. **Data Transformation**: Raw HTML text converted to structured JSON
5. **Fallback**: If scraping fails, realistic dummy data is used

### CSS Selectors Used
```javascript
// Live matches
'.live-match, .match-live, [class*="live"]'

// Team names
'.team1, .team-1, .team2, .team-2'

// Points table
'table tbody tr, .points-table tr'

// Match schedule
'.match-item, .fixture, table tbody tr'
```

## 🚧 Challenges Encountered

### 1. Website Structure Changes
**Problem**: IPL website HTML structure changes frequently
**Solution**: Used multiple CSS selectors and fallback data

### 2. Rate Limiting
**Problem**: Website blocks too many requests
**Solution**: Implemented 3-minute caching to reduce requests

### 3. Mobile Responsiveness
**Problem**: Dashboard looked bad on mobile
**Solution**: Used Tailwind's mobile-first approach with responsive classes

### 4. TypeScript Errors
**Problem**: Complex type definitions for scraped data
**Solution**: Created proper interfaces and used type assertions

### 5. Scraping Reliability
**Problem**: Scraping sometimes fails due to network issues
**Solution**: Added comprehensive error handling and fallback data

## 📱 Mobile-First Design

The application prioritizes mobile experience:
- **Responsive Grid**: Uses CSS Grid and Flexbox for layouts
- **Touch-Friendly**: Large buttons and touch targets
- **Readable Text**: Proper font sizes for mobile screens
- **Optimized Images**: Compressed and responsive images

## 🔄 Caching Implementation

- **Cache Duration**: 3 minutes to balance freshness and performance
- **Cache Storage**: In-memory caching with timestamp tracking
- **Cache Status**: Frontend shows cache status (hit/miss/fallback)

## 🎨 UI/UX Design

### Design Inspiration
- **ESPN Cricinfo**: Clean, sports-focused layout
- **Modern Dashboard**: Card-based design with clear hierarchy
- **Color Scheme**: Dark theme with IPL team colors

### Key Design Elements
- **Gradient Backgrounds**: Eye-catching visual appeal
- **Card Layout**: Organized information in digestible chunks
- **Status Indicators**: Live match indicators and team colors
- **Typography**: Clear hierarchy with proper font weights

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Vercel automatically detects Next.js and builds the project
3. Deploy with one click

### Other Platforms
- **Netlify**: Similar to Vercel, supports Next.js
- **Railway**: Good for full-stack applications
- **Heroku**: Traditional deployment option

## 📊 Project Structure

```
ipl-dashboard/
├── components/          # React components
│   ├── layout/         # Header, Footer, Layout
│   ├── dashboard/      # Main dashboard components
│   ├── live-match/     # Live match components
│   ├── points-table/   # Points table components
│   └── ui/            # Reusable UI components
├── pages/              # Next.js pages
│   ├── api/           # API routes
│   └── index.tsx      # Main dashboard page
├── src/               # Source code
│   ├── hooks/         # Custom React hooks
│   ├── services/      # API services
│   ├── types/         # TypeScript type definitions
│   └── utils/         # Utility functions
└── styles/            # Global styles
```

## 🔧 Customization

### Adding New Teams
Update the `createTeam` function in `pages/api/scrape.ts`:
```javascript
const shortNames = {
  'new team name': 'NT',
  // ... existing teams
};
```

### Changing Cache Duration
Modify `CACHE_DURATION` in `pages/api/scrape.ts`:
```javascript
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
```

### Styling Changes
Use Tailwind CSS classes in component files or modify `tailwind.config.js`

## 🐛 Troubleshooting

### Common Issues

1. **Port 3000 already in use**
```bash
lsof -ti:3000 | xargs kill -9
```

2. **Build errors**
```bash
rm -rf .next node_modules
npm install
npm run build
```

3. **Scraping not working**
- Check internet connection
- Verify iplt20.com is accessible
- Check browser console for errors

## 📈 Future Enhancements

- [ ] Real-time notifications for match events
- [ ] Historical data and statistics
- [ ] Player performance charts
- [ ] Team comparison features
- [ ] Push notifications
- [ ] Offline support with PWA

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is for educational purposes. Please respect iplt20.com's terms of service.

## 👨‍💻 Author

[Your Name] - Student Project

---

**Note**: This project is built for learning purposes. The scraping functionality respects the target website's robots.txt and implements reasonable request intervals.
