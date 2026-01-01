# AI News Hub - Automated AI News Platform

An intelligent, fully automated news platform that generates high-quality AI news articles daily using advanced AI technology. The platform features a sophisticated content generation system, SEO optimization, and a beautiful, responsive user interface.

## 🌟 Features

### Core Features
- **Automated Daily Content Generation**: Generates 16 high-quality articles daily (2 per category, 8 categories)
- **Dual Content Strategy**: Produces both trending and evergreen content
- **AI-Powered Writing**: Uses Gemini API with a sophisticated 3-step process for content creation
- **Smart Image Generation**: Creates unique SVG cover images for each article
- **SEO Optimization**: Automatic meta tags, sitemap generation, and schema markup
- **Content Quality Assurance**: Strict validation using Zod schemas

### Content Categories
- Machine Learning
- Natural Language Processing
- Computer Vision
- Robotics
- Generative AI
- AI Applications
- AI Research
- AI Ethics

### User Features
- **Table of Contents**: Interactive navigation within articles
- **Social Sharing**: Share articles on Twitter, Facebook, LinkedIn, and via email
- **Article Search**: Real-time search functionality with live suggestions
- **Category Browsing**: Browse articles by category with pagination
- **Article Archive**: Complete archive of all published articles
- **Related Articles**: Intelligent recommendations based on article tags
- **Author Information**: Detailed author cards with publication metadata
- **Responsive Design**: Fully responsive across all devices

### Technical Features
- **Job Queue System**: Reliable retry mechanism for failed content generation
- **Data Persistence**: JSON-based data storage with automatic archiving
- **Dynamic Sitemap**: Automatically updated XML sitemap for search engines
- **Rate Limiting**: Intelligent throttling to respect API limits
- **Error Handling**: Comprehensive error tracking and recovery

## 🏗️ Architecture

### Backend Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **AI Integration**: Google Gemini API (gemini-2.5-flash)
- **Data Storage**: JSON files (articles-data.json, pending-jobs.json)
- **Validation**: Zod schema validation
- **Scheduling**: node-cron for automated tasks

### Frontend Stack
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Custom components + shadcn/ui
- **Routing**: React Router v6
- **HTTP Client**: Fetch API

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Google Gemini API key

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/ysrg2003/ai-news-hub-pro.git
cd ai-news-hub-pro
```

2. **Backend Setup**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env and add your Gemini API key
```

3. **Frontend Setup**
```bash
cd ../frontend
npm install --force
cp .env.example .env.local
```

### Configuration

#### Backend (.env)
```env
GEMINI_API_KEY=your_api_key_here
PORT=3001
SITE_URL=https://ai-news-hub.com
SITE_NAME=AI News Hub
```

#### Frontend (.env.local)
```env
VITE_API_URL=http://localhost:3001/api
```

### Running the Application

**Development Mode:**

Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

**Production Mode:**

Backend:
```bash
cd backend
npm start
```

Frontend:
```bash
cd frontend
npm run build
npm run preview
```

## 📝 Content Generation Process

### The 3-Step Gemini Process

#### Step 1: Story Discovery
- Searches for trending topics and recent developments
- Identifies compelling narrative angles
- Generates catchy, journalistic headlines

#### Step 2: Research & Draft
- Conducts in-depth research using Google Search
- Writes comprehensive 1500-1800 word articles
- Applies editorial principles for quality assurance
- Performs self-review and refinement

#### Step 3: Final Editing & SEO
- Polishes article for clarity and impact
- Adds rich media elements (lists, blockquotes)
- Extracts conceptual icons for visual identity
- Generates internal linking strategy
- Creates SEO package (meta tags, descriptions)
- Suggests future article topics

### Daily Automation

The system runs automatically at 00:00 UTC daily:
1. Processes any failed jobs from previous runs (up to 3 retry attempts)
2. Generates 16 new articles (2 per category)
3. Creates unique SVG cover images
4. Updates sitemap.xml
5. Logs performance metrics

## 🔍 API Endpoints

### Articles
- `GET /api/articles` - Get all articles with pagination
- `GET /api/articles/:slug` - Get single article
- `GET /api/articles/category/:categoryId` - Get articles by category
- `GET /api/articles/tag/:tag` - Get articles by tag
- `GET /api/articles/search?q=query` - Search articles

### Automation
- `POST /api/automation/run` - Manually trigger daily automation
- `GET /api/automation/status` - Get automation status

## 📊 Data Models

### Article Object
```javascript
{
  id: "uuid",
  title: "Article Title",
  content: "<html>...</html>",
  excerpt: "Brief excerpt",
  category: "machine-learning",
  articleType: "trending|evergreen",
  author: "AI News Hub",
  date: "2024-01-01T00:00:00Z",
  readTime: 8,
  image: "data:image/svg+xml;base64,...",
  seo: {
    metaTitle: "...",
    metaDescription: "...",
    imageAltText: "...",
    tags: ["tag1", "tag2"]
  },
  tags: ["tag1", "tag2"],
  conceptualIcon: "network",
  slug: "article-slug",
  createdAt: "2024-01-01T00:00:00Z",
  updatedAt: "2024-01-01T00:00:00Z"
}
```

### Pending Job Object
```javascript
{
  jobId: "uuid",
  category: "machine-learning",
  articleType: "trending",
  status: "pending|failed_at_step_1|...",
  attempts: 1,
  lastAttempted: "2024-01-01T00:00:00Z",
  error: "Error message",
  createdAt: "2024-01-01T00:00:00Z"
}
```

## 📄 Pages

- **Home** (`/`) - Featured articles and latest content
- **Search** (`/search`) - Full-text search with filters
- **Category** (`/category/:id`) - Articles by category
- **Article** (`/article/:slug`) - Full article view with TOC, sharing, and related articles
- **Archive** (`/archive`) - Complete article archive with filters
- **About** (`/about`) - About the platform
- **Contact** (`/contact`) - Contact form
- **Privacy** (`/privacy`) - Privacy policy
- **Terms** (`/terms`) - Terms of service

## 🛠️ Development

### Adding a New Feature

1. Create feature branch: `git checkout -b feature/new-feature`
2. Make changes
3. Test thoroughly
4. Commit: `git commit -m "Add new feature"`
5. Push: `git push origin feature/new-feature`
6. Create Pull Request

## 📦 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables
4. Deploy

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support, email support@ai-news-hub.com or visit our [contact page](https://ai-news-hub.com/contact).

---

**Built with ❤️ using AI and modern web technologies**
