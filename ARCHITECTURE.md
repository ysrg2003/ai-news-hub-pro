# 🏗️ AI News Hub - Architecture Documentation

## System Overview

AI News Hub is a fully automated news generation platform that uses Google Gemini API to create high-quality articles daily. The system is divided into two main components: Backend (API) and Frontend (Web Application).

```
┌─────────────────────────────────────────────────────────────┐
│                    User Interface (React)                    │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │  Pages: Home, Search, Category, Article, Archive, etc.  │ │
│  │  Components: Header, Footer, ArticleCard, etc.          │ │
│  └─────────────────────────────────────────────────────────┘ │
└────────────────────┬────────────────────────────────────────┘
                     │ HTTP/REST
┌────────────────────▼────────────────────────────────────────┐
│              Backend API (Node.js/Express)                   │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │  Routes: /api/articles, /api/automation, /api/search   │ │
│  │  Services: Content Generation, Automation, Data Mgmt   │ │
│  │  Utils: Image Gen, Sitemap Gen, Schemas, Data Manager  │ │
│  └─────────────────────────────────────────────────────────┘ │
└────────────────────┬────────────────────────────────────────┘
                     │
        ┌────────────┼────────────┐
        │            │            │
        ▼            ▼            ▼
    ┌────────┐  ┌────────┐  ┌──────────┐
    │ Gemini │  │  JSON  │  │ Cron Job │
    │  API   │  │ Storage│  │Scheduler │
    └────────┘  └────────┘  └──────────┘
```

## Backend Architecture

### 1. Entry Point: `index.js`
```
index.js
├── Load environment variables
├── Initialize Express app
├── Schedule daily automation
└── Handle graceful shutdown
```

### 2. Application Setup: `src/app.js`
```
app.js
├── Configure CORS
├── Setup middleware (logger, error handler)
├── Mount routes
│   ├── /api/articles (articlesRoutes.js)
│   ├── /api/automation (automationRoutes.js)
│   └── Other existing routes
└── Setup error handling
```

### 3. Services Layer

#### Content Generation (`src/services/contentGenerator.js`)
```
generateArticle(category, articleType)
├── Step 1: Story Discovery
│   └── Gemini Call #1: Find headline
├── Step 2: Research & Draft
│   └── Gemini Call #2: Write article (1500-1800 words)
├── Step 3: Final Editing & SEO
│   └── Gemini Call #3: Polish & extract SEO data
├── Generate cover image
├── Save to database
└── Update sitemap
```

**Key Features:**
- Rate limiting (1.5s between calls)
- Zod validation for output
- Automatic retry on failure
- Comprehensive logging

#### Automation Controller (`src/services/automationController.js`)
```
runDailyAutomation()
├── Process failed jobs (retry up to 3 times)
├── Generate 16 articles (2 per category)
│   ├── 1 Trending article
│   └── 1 Evergreen article
├── Update statistics
└── Log results
```

**Scheduling:**
- Cron expression: `0 0 * * *` (00:00 UTC daily)
- Configurable via `scheduleDailyAutomation(cronExpression)`
- Non-blocking execution

### 4. Data Management

#### Data Manager (`src/utils/dataManager.js`)
```
DataManager Class
├── Articles Management
│   ├── readArticles()
│   ├── addArticle(article)
│   ├── getArticleBySlug(slug)
│   ├── getArticlesByCategory(category)
│   ├── getArticlesByTag(tag)
│   └── getArticlesPaginated(page, limit)
├── Pending Jobs Management
│   ├── readPendingJobs()
│   ├── addPendingJob(job)
│   ├── updatePendingJob(jobId, updates)
│   ├── removePendingJob(jobId)
│   ├── getFailedJobs()
│   └── getJobsCount()
└── Archive Management
    └── archiveOldArticles(monthsOld)
```

#### Data Files
```
backend/
├── articles-data.json      # All published articles
├── pending-jobs.json       # Failed jobs for retry
└── categories.json         # Category definitions
```

### 5. Utilities

#### Schemas (`src/utils/schemas.js`)
```
Zod Schemas
├── ArticleOutputSchema     # Validates article structure
├── SEOPackageSchema        # Validates SEO data
└── PendingJobSchema        # Validates job structure
```

#### Image Generator (`src/utils/imageGenerator.js`)
```
generateArticleCoverImage(title, categoryId, icon)
├── Get category colors
├── Select background pattern
├── Render conceptual icon
├── Add title text
└── Convert to Base64 SVG
```

**Patterns:**
- Gradient, Waves, Dots, Grid, Spiral, Hexagons, Lines, Circles

#### Sitemap Generator (`src/utils/sitemapGenerator.js`)
```
updateSitemap()
├── Read all articles
├── Generate XML entries
├── Include priority & frequency
└── Write to sitemap.xml
```

### 6. Routes

#### Articles Routes (`src/routes/articlesRoutes.js`)
```
GET  /api/articles                  # List all (paginated)
GET  /api/articles/:slug            # Get single article
GET  /api/articles/category/:id     # Filter by category
GET  /api/articles/tag/:tag         # Filter by tag
GET  /api/articles/search?q=query   # Full-text search
```

#### Automation Routes (`src/routes/automationRoutes.js`)
```
POST /api/automation/run            # Trigger automation
GET  /api/automation/status         # Get status
```

## Frontend Architecture

### 1. Entry Point: `src/main.tsx`
```
main.tsx
├── Import React & styles
├── Render App component
└── Mount to DOM
```

### 2. App Router: `src/App.tsx`
```
App.tsx (React Router)
├── Home (/)
├── Search (/search)
├── Category (/category/:id)
├── Article (/article/:slug)
├── Archive (/archive)
├── About (/about)
├── Contact (/contact)
├── Privacy (/privacy)
└── Terms (/terms)
```

### 3. Pages

#### Home Page
- Featured articles
- Latest articles
- Category showcase
- Call-to-action

#### Search Page
- Full-text search
- Live suggestions
- Filter by category/tag
- Pagination

#### Article Page
- Full article content
- Table of contents
- Social sharing buttons
- Author card
- Related articles
- Read time estimate

#### Archive Page
- Browse all articles
- Filter by year/category
- Pagination
- Search within archive

### 4. Components

```
src/components/
├── Header.tsx              # Navigation & logo
├── Footer.tsx              # Footer with links
├── ArticleCard.tsx         # Article preview card
├── SearchBar.tsx           # Search input
├── TableOfContents.tsx     # Article TOC
├── ShareButtons.tsx        # Social sharing
├── AuthorCard.tsx          # Author info
├── RelatedArticles.tsx     # Related articles
└── ui/                     # Shadcn/ui components
```

### 5. Styling

- **Tailwind CSS**: Utility-first CSS framework
- **Responsive Design**: Mobile-first approach
- **Color System**: Category-based color palette
- **Dark Mode**: Ready for implementation

### 6. State Management

- **Local State**: React hooks (useState, useContext)
- **URL State**: React Router (search params)
- **Browser Storage**: localStorage for preferences
- **API State**: Fetch with error handling

## Data Flow

### Article Creation Flow
```
Automation Trigger (00:00 UTC)
    ↓
runDailyAutomation()
    ↓
For each category:
    ├── generateArticle(category, 'trending')
    │   ├── Step 1: Get headline (Gemini)
    │   ├── Step 2: Write draft (Gemini)
    │   ├── Step 3: Finalize (Gemini)
    │   ├── Generate image
    │   └── Save to articles-data.json
    │
    └── generateArticle(category, 'evergreen')
        └── Same process
    ↓
updateSitemap()
    ↓
Log results
```

### Article Retrieval Flow
```
Frontend Request: GET /api/articles
    ↓
articlesRoutes.js
    ↓
dataManager.readArticles()
    ↓
Parse articles-data.json
    ↓
Apply filters (pagination, search, etc.)
    ↓
Return JSON response
    ↓
Frontend renders articles
```

## Error Handling

### Backend
```
Try-Catch Blocks
├── Gemini API calls
├── File I/O operations
├── Data validation
└── Route handlers

Failed Jobs
├── Capture error details
├── Store in pending-jobs.json
├── Retry up to 3 times
└── Log final failure
```

### Frontend
```
Error Boundaries
├── Catch rendering errors
├── Display fallback UI
└── Log to console

API Error Handling
├── Check response status
├── Display user-friendly messages
└── Retry on network errors
```

## Performance Considerations

### Backend
- **Rate Limiting**: 1.5s between Gemini API calls
- **Pagination**: Limit articles per request
- **Caching**: Potential Redis integration
- **Async Operations**: Non-blocking I/O

### Frontend
- **Code Splitting**: Lazy load routes
- **Image Optimization**: SVG format
- **Memoization**: React.memo for components
- **Debouncing**: Search input debouncing

## Security Considerations

### Backend
- **Environment Variables**: Sensitive data in .env
- **Input Validation**: Zod schemas
- **CORS**: Configured for frontend domain
- **Error Messages**: Sanitized for production

### Frontend
- **XSS Prevention**: React auto-escaping
- **CSRF Protection**: Token in requests
- **Secure Headers**: Content-Security-Policy
- **API Key**: Never exposed in frontend

## Scalability

### Current Architecture
- Suitable for: 100-1000 daily users
- Articles per day: 16
- Articles per month: ~480
- Articles per year: ~5,840

### Future Improvements
- **Database**: Replace JSON with MongoDB/PostgreSQL
- **Caching**: Add Redis for performance
- **CDN**: Distribute static assets
- **Microservices**: Separate content generation service
- **Load Balancing**: Handle multiple instances
- **Message Queue**: For async job processing

## Deployment Architecture

### Vercel Deployment
```
GitHub Repository
    ↓
Push to main branch
    ↓
Vercel Webhook Trigger
    ↓
Build Backend & Frontend
    ↓
Deploy to Vercel Edge Network
    ↓
Live at https://your-domain.com
```

### Environment Setup
```
Production (.env)
├── GEMINI_API_KEY
├── NODE_ENV=production
├── SITE_URL=https://domain.com
└── PORT=3001

Development (.env.local)
├── GEMINI_API_KEY
├── NODE_ENV=development
├── SITE_URL=http://localhost:3001
└── VITE_API_URL=http://localhost:3001/api
```

## Monitoring & Logging

### Backend Logs
- Startup messages
- Article generation progress
- API request logs
- Error stack traces
- Automation execution results

### Frontend Logs
- Console errors
- API response times
- User interactions
- Performance metrics

## Future Architecture Enhancements

1. **User Authentication**: JWT-based auth
2. **Database**: Persistent data storage
3. **Message Queue**: Background job processing
4. **Search Engine**: Elasticsearch integration
5. **Analytics**: User behavior tracking
6. **Caching Layer**: Redis for performance
7. **CDN**: Static asset distribution
8. **Monitoring**: Sentry/DataDog integration

---

**Last Updated**: 2024
**Version**: 1.0.0
