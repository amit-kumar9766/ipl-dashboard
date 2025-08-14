# IPL Dashboard

A simple dashboard to show IPL match data. Built with Next.js and TypeScript.

## Features

- Live match display
- Upcoming matches
- Points table
- Match schedule
- Mobile responsive

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

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- Axios for data fetching

## How it works

The app scrapes data from iplt20.com. If scraping fails, it shows dummy data.

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
