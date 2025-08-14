# IPL Dashboard

A live IPL cricket dashboard built with Next.js and TypeScript. Shows real-time match data, points table, and match schedules.

## Features

- Live match display
- Upcoming matches
- Points table
- Match schedule
- Historical data & analytics
- Mobile responsive design
- Auto-refresh every 3 minutes
- Web scraping from iplt20.com
- Fallback data when scraping fails

## Tech Stack

- **Frontend**: Next.js 15.4.6, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Data Fetching**: Axios, Cheerio (web scraping)
- **Deployment**: Vercel

## Setup

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Open http://localhost:3000

## How it works

The app scrapes data from iplt20.com using:
- HTTP requests with browser-like headers
- HTML parsing with Cheerio
- Multiple CSS selectors for data extraction
- Fallback dummy data when scraping fails

## Project Structure

```
├── components/          # React components
│   ├── layout/         # Header, Footer, Layout
│   ├── dashboard/      # Main dashboard components
│   ├── live-match/     # Live match components
│   ├── points-table/   # Points table components
│   └── history/        # Historical data components
├── pages/              # Next.js pages and API routes
├── src/                # Source code, hooks, services
└── types/              # TypeScript definitions
```

## Key Features

- **Web Scraping**: Fetches live data from iplt20.com
- **Caching**: 3-minute cache to reduce requests
- **Error Handling**: Stops auto-refresh after 3 consecutive errors
- **Responsive Design**: Works on all device sizes
- **TypeScript**: Full type safety throughout

## Deployment

Deploy to Vercel:
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

## Why Scraping Fails

Scraping can fail because:
- Website blocks automated requests
- HTML structure changes
- Network issues
- Rate limiting

The app handles this by showing fallback data when scraping doesn't work.
