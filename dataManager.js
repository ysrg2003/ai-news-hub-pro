const fs = require('fs').promises;
const path = require('path');

const ARTICLES_DATA_PATH = path.join(__dirname, '../../articles-data.json');
const PENDING_JOBS_PATH = path.join(__dirname, '../../pending-jobs.json');

class DataManager {
  // Articles Management
  async readArticles() {
    try {
      const data = await fs.readFile(ARTICLES_DATA_PATH, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading articles data:', error);
      return [];
    }
  }

  async writeArticles(articles) {
    try {
      await fs.writeFile(ARTICLES_DATA_PATH, JSON.stringify(articles, null, 2), 'utf-8');
      return true;
    } catch (error) {
      console.error('Error writing articles data:', error);
      return false;
    }
  }

  async addArticle(article) {
    const articles = await this.readArticles();
    articles.unshift(article); // Add to the beginning for newest first
    return await this.writeArticles(articles);
  }

  async getArticleBySlug(slug) {
    const articles = await this.readArticles();
    return articles.find(article => article.slug === slug);
  }

  async getArticlesByCategory(category) {
    const articles = await this.readArticles();
    return articles.filter(article => article.category === category);
  }

  async getArticlesByType(articleType) {
    const articles = await this.readArticles();
    return articles.filter(article => article.articleType === articleType);
  }

  async getArticlesByTag(tag) {
    const articles = await this.readArticles();
    return articles.filter(article => article.tags.includes(tag));
  }

  async getArticlesCount() {
    const articles = await this.readArticles();
    return articles.length;
  }

  // Pagination
  async getArticlesPaginated(page = 1, limit = 10) {
    const articles = await this.readArticles();
    const start = (page - 1) * limit;
    const end = start + limit;
    return {
      articles: articles.slice(start, end),
      total: articles.length,
      page,
      limit,
      totalPages: Math.ceil(articles.length / limit),
    };
  }

  // Pending Jobs Management
  async readPendingJobs() {
    try {
      const data = await fs.readFile(PENDING_JOBS_PATH, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading pending jobs data:', error);
      return [];
    }
  }

  async writePendingJobs(jobs) {
    try {
      await fs.writeFile(PENDING_JOBS_PATH, JSON.stringify(jobs, null, 2), 'utf-8');
      return true;
    } catch (error) {
      console.error('Error writing pending jobs data:', error);
      return false;
    }
  }

  async addPendingJob(job) {
    const jobs = await this.readPendingJobs();
    jobs.push(job);
    return await this.writePendingJobs(jobs);
  }

  async updatePendingJob(jobId, updates) {
    const jobs = await this.readPendingJobs();
    const index = jobs.findIndex(job => job.jobId === jobId);
    if (index !== -1) {
      jobs[index] = { ...jobs[index], ...updates };
      return await this.writePendingJobs(jobs);
    }
    return false;
  }

  async removePendingJob(jobId) {
    const jobs = await this.readPendingJobs();
    const filteredJobs = jobs.filter(job => job.jobId !== jobId);
    return await this.writePendingJobs(filteredJobs);
  }

  async getPendingJobsByStatus(status) {
    const jobs = await this.readPendingJobs();
    return jobs.filter(job => job.status === status);
  }

  async getFailedJobs() {
    const jobs = await this.readPendingJobs();
    return jobs.filter(job => job.status.startsWith('failed') && job.attempts < 3);
  }

  async getJobsCount() {
    const jobs = await this.readPendingJobs();
    return jobs.length;
  }

  // Archive Management
  async archiveOldArticles(monthsOld = 12) {
    const articles = await this.readArticles();
    const cutoffDate = new Date();
    cutoffDate.setMonth(cutoffDate.getMonth() - monthsOld);

    const recentArticles = [];
    const archivedArticles = [];

    for (const article of articles) {
      const articleDate = new Date(article.createdAt);
      if (articleDate < cutoffDate) {
        archivedArticles.push(article);
      } else {
        recentArticles.push(article);
      }
    }

    if (archivedArticles.length > 0) {
      // Save archived articles to archive file
      const year = new Date(archivedArticles[0].createdAt).getFullYear();
      const archivePath = path.join(__dirname, `../../archive-${year}.json`);
      
      try {
        let existingArchive = [];
        try {
          const data = await fs.readFile(archivePath, 'utf-8');
          existingArchive = JSON.parse(data);
        } catch {
          // Archive file doesn't exist yet
        }

        const allArchived = [...existingArchive, ...archivedArticles];
        await fs.writeFile(archivePath, JSON.stringify(allArchived, null, 2), 'utf-8');
        
        // Update main articles file
        await this.writeArticles(recentArticles);
        
        console.log(`Archived ${archivedArticles.length} articles to archive-${year}.json`);
        return true;
      } catch (error) {
        console.error('Error archiving articles:', error);
        return false;
      }
    }

    return true;
  }
}

module.exports = new DataManager();
