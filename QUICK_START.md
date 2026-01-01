# 🚀 Quick Start Guide - AI News Hub

## Prerequisites
- Node.js 18+
- npm or yarn
- Google Gemini API key

## 1. Clone & Setup

```bash
git clone https://github.com/ysrg2003/ai-news-hub-pro.git
cd ai-news-hub-pro
```

## 2. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env and add your GEMINI_API_KEY
npm run dev
```

Backend will run on `http://localhost:3001`

## 3. Frontend Setup (New Terminal)

```bash
cd frontend
npm install --force
npm run dev
```

Frontend will run on `http://localhost:5173`

## 4. Access the Application

- **Frontend**: http://localhost:5173
- **API**: http://localhost:3001/api
- **API Docs**: http://localhost:3001/api-docs

## 5. Generate Content

To manually trigger content generation:

```bash
curl -X POST http://localhost:3001/api/automation/run
```

Or visit: `http://localhost:3001/api/automation/run`

## Project Structure

```
ai-news-hub-pro/
├── backend/              # Node.js/Express API
│   ├── src/
│   │   ├── services/    # Content generation & automation
│   │   ├── routes/      # API endpoints
│   │   └── utils/       # Helper functions
│   └── index.js         # Entry point
│
├── frontend/            # React/Vite web app
│   ├── src/
│   │   ├── pages/       # Page components
│   │   ├── components/  # Reusable components
│   │   └── App.tsx      # Main app
│   └── vite.config.ts
│
└── README.md
```

## Key Features

✅ Automated daily content generation (16 articles/day)
✅ 3-step Gemini AI process for quality content
✅ Unique SVG cover images for each article
✅ Full-text search with live suggestions
✅ Category browsing and article archive
✅ Table of contents, social sharing, related articles
✅ SEO optimization with sitemap generation
✅ Responsive design for all devices

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3001
lsof -ti:3001 | xargs kill -9

# Or use different port
PORT=3002 npm run dev
```

### Gemini API Errors
- Verify API key is valid
- Check API quota and billing
- Review rate limiting (1.5s between calls)

### Build Issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

1. **Deploy to Vercel**: See [DEPLOYMENT.md](./DEPLOYMENT.md)
2. **Customize Content**: Edit prompts in `backend/src/services/contentGenerator.js`
3. **Add Features**: See [CONTRIBUTING.md](./CONTRIBUTING.md)
4. **Read Full Docs**: See [README.md](./README.md)

## Support

- 📚 Full documentation: [README.md](./README.md)
- 🚀 Deployment guide: [DEPLOYMENT.md](./DEPLOYMENT.md)
- 🤝 Contributing: [CONTRIBUTING.md](./CONTRIBUTING.md)

Happy coding! 🎉
