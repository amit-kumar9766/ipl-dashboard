# Deployment Guide

This guide explains how to deploy the IPL Dashboard to different platforms.

## 🚀 Vercel (Recommended)

Vercel is the easiest way to deploy Next.js applications.

### Steps:
1. **Create Vercel Account**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with your GitHub account

2. **Connect Repository**
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will automatically detect it's a Next.js project

3. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your app will be live at `https://your-project.vercel.app`

### Why Vercel?
- **Automatic**: Detects Next.js and builds automatically
- **Fast**: Global CDN for fast loading
- **Free**: Generous free tier
- **Easy**: One-click deployment

## 🌐 Netlify

Alternative to Vercel, also very good for Next.js.

### Steps:
1. **Create Netlify Account**
   - Go to [netlify.com](https://netlify.com)
   - Sign up with GitHub

2. **Deploy**
   - Click "New site from Git"
   - Choose your repository
   - Set build command: `npm run build`
   - Set publish directory: `.next`

## 🐳 Docker (Advanced)

If you want to deploy to any server.

### Create Dockerfile:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Build and Run:
```bash
docker build -t ipl-dashboard .
docker run -p 3000:3000 ipl-dashboard
```

## 🔧 Environment Variables

If you need to configure anything:

### Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=https://your-domain.com
NEXT_PUBLIC_ENABLE_ANALYTICS=true
```

### Vercel Environment Variables:
1. Go to your project settings
2. Add environment variables
3. Redeploy

## 📱 Mobile Testing

After deployment, test on mobile:
- Open your app on phone
- Check if responsive design works
- Test touch interactions
- Verify loading speed

## 🐛 Common Issues

### Build Fails
- Check if all dependencies are in `package.json`
- Make sure TypeScript compiles without errors
- Verify all imports are correct

### API Not Working
- Check if `/api/scrape` endpoint works
- Verify CORS settings if needed
- Test scraping functionality

### Slow Loading
- Enable compression in hosting settings
- Optimize images
- Check bundle size

## 📊 Performance Tips

1. **Enable Compression**: Most hosting platforms do this automatically
2. **Use CDN**: Vercel/Netlify provide global CDN
3. **Optimize Images**: Use Next.js Image component
4. **Minimize Bundle**: Remove unused dependencies

## 🔒 Security Notes

- The scraping functionality respects rate limits
- No sensitive data is stored
- API endpoints are public (by design)
- Consider adding rate limiting for production

## 📈 Monitoring

After deployment:
- Monitor error rates
- Check performance metrics
- Watch for scraping failures
- Track user engagement

## 🎯 Next Steps

1. **Add Analytics**: Google Analytics or Vercel Analytics
2. **Set up Monitoring**: Error tracking with Sentry
3. **Optimize Performance**: Use Lighthouse for suggestions
4. **Add Features**: Real-time notifications, historical data

---

**Note**: This project is for educational purposes. Make sure to respect the target website's terms of service when scraping data. 