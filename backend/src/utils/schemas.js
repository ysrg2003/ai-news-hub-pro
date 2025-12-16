const { z } = require('zod');

// Schema for the final article output from Gemini's third call
const ArticleOutputSchema = z.object({
  finalTitle: z.string().min(5).max(200),
  finalContent: z.string().min(500),
  excerpt: z.string().min(50).max(300),
  seo: z.object({
    metaTitle: z.string().min(30).max(60),
    metaDescription: z.string().min(100).max(160),
    imageAltText: z.string().min(10).max(200),
    tags: z.array(z.string()).min(5).max(7),
  }),
  tags: z.array(z.string()).min(5).max(7),
  conceptualIcon: z.string().min(1).max(50),
  futureArticleSuggestions: z.array(z.string()).length(2),
});

// Schema for a stored article in articles-data.json
const StoredArticleSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  excerpt: z.string(),
  category: z.string(),
  articleType: z.enum(['trending', 'evergreen']),
  author: z.string(),
  date: z.string().datetime(),
  readTime: z.number().positive(),
  image: z.string().optional(), // Base64 SVG or URL
  seo: z.object({
    metaTitle: z.string(),
    metaDescription: z.string(),
    imageAltText: z.string(),
    tags: z.array(z.string()),
  }),
  tags: z.array(z.string()),
  conceptualIcon: z.string(),
  internalLinks: z.array(z.object({
    text: z.string(),
    slug: z.string(),
  })).optional(),
  futureArticleSuggestions: z.array(z.string()),
  slug: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// Schema for a job in pending-jobs.json
const PendingJobSchema = z.object({
  jobId: z.string(),
  category: z.string(),
  articleType: z.enum(['trending', 'evergreen']),
  status: z.string(), // e.g., 'pending', 'failed_at_step_1_story_discovery', 'failed_at_step_2_writing', 'failed_at_step_3_validation'
  attempts: z.number().positive().max(3),
  lastAttempted: z.string().datetime().optional(),
  intermediateData: z.object({
    headline: z.string().optional(),
    draftTitle: z.string().optional(),
    draftContent: z.string().optional(),
  }).optional(),
  error: z.string().optional(),
  createdAt: z.string().datetime(),
});

module.exports = {
  ArticleOutputSchema,
  StoredArticleSchema,
  PendingJobSchema,
};
