const express = require('express');
const router = express.Router();
const dataManager = require('../utils/dataManager');

/**
 * GET /api/articles
 * Get all articles with pagination
 */
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const result = await dataManager.getArticlesPaginated(page, limit);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/articles/search
 * Search articles by query
 */
router.get('/search', async (req, res) => {
  try {
    const query = req.query.q?.toLowerCase() || '';
    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const articles = await dataManager.readArticles();
    const results = articles.filter(article =>
      article.title.toLowerCase().includes(query) ||
      article.excerpt.toLowerCase().includes(query) ||
      article.tags.some(tag => tag.toLowerCase().includes(query))
    );

    res.json({
      query,
      results,
      count: results.length,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/articles/category/:categoryId
 * Get articles by category with pagination
 */
router.get('/category/:categoryId', async (req, res) => {
  try {
    const { categoryId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const articles = await dataManager.getArticlesByCategory(categoryId);
    const start = (page - 1) * limit;
    const end = start + limit;

    res.json({
      category: categoryId,
      articles: articles.slice(start, end),
      total: articles.length,
      page,
      limit,
      totalPages: Math.ceil(articles.length / limit),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/articles/tag/:tag
 * Get articles by tag with pagination
 */
router.get('/tag/:tag', async (req, res) => {
  try {
    const { tag } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const articles = await dataManager.getArticlesByTag(tag);
    const start = (page - 1) * limit;
    const end = start + limit;

    res.json({
      tag,
      articles: articles.slice(start, end),
      total: articles.length,
      page,
      limit,
      totalPages: Math.ceil(articles.length / limit),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/articles/:slug
 * Get a single article by slug
 */
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const article = await dataManager.getArticleBySlug(slug);

    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    res.json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
