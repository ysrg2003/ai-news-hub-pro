import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  slug: string;
  readTime: number;
}

export default function Archive() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch articles from API
    const fetchArticles = async () => {
      try {
        const response = await fetch('/api/articles?limit=1000');
        const data = await response.json();
        setArticles(data.articles || []);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  useEffect(() => {
    let filtered = articles;

    if (selectedYear !== 'all') {
      filtered = filtered.filter(article => {
        const year = new Date(article.date).getFullYear().toString();
        return year === selectedYear;
      });
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }

    setFilteredArticles(filtered);
  }, [articles, selectedYear, selectedCategory]);

  const years = Array.from(new Set(articles.map(a => new Date(a.date).getFullYear().toString()))).sort().reverse();
  const categories = Array.from(new Set(articles.map(a => a.category)));

  return (
    <>
      <Helmet>
        <title>Archive - AI News Hub</title>
        <meta name="description" content="Browse our complete archive of AI news articles organized by date and category." />
        <meta property="og:title" content="Archive - AI News Hub" />
        <meta property="og:description" content="Browse our complete archive of AI news articles organized by date and category." />
      </Helmet>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Article Archive</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Year</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Years</option>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading articles...</p>
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No articles found for the selected filters.</p>
          </div>
        ) : (
          <div className="space-y-6">
            <p className="text-gray-600 mb-6">
              Showing {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''}
            </p>

            {filteredArticles.map(article => (
              <article
                key={article.id}
                className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition duration-200"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">
                      <a href={`/article/${article.slug}`} className="text-blue-600 hover:text-blue-800">
                        {article.title}
                      </a>
                    </h2>
                  </div>
                  <span className="text-sm bg-gray-100 px-3 py-1 rounded-full text-gray-700 whitespace-nowrap ml-4">
                    {article.category}
                  </span>
                </div>

                <p className="text-gray-600 mb-4">{article.excerpt}</p>

                <div className="flex justify-between items-center text-sm text-gray-500">
                  <div className="flex space-x-4">
                    <span>{new Date(article.date).toLocaleDateString()}</span>
                    <span>{article.readTime} min read</span>
                  </div>
                  <a
                    href={`/article/${article.slug}`}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Read More →
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
