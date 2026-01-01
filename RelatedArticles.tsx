import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  readTime: number;
  tags: string[];
}

interface RelatedArticlesProps {
  currentArticleTags: string[];
  currentArticleId: string;
  limit?: number;
}

export const RelatedArticles: React.FC<RelatedArticlesProps> = ({
  currentArticleTags,
  currentArticleId,
  limit = 3,
}) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedArticles = async () => {
      try {
        setLoading(true);
        // Fetch articles with related tags
        const tagQueries = currentArticleTags.slice(0, 3).map(tag =>
          fetch(`/api/articles/tag/${tag}?limit=5`)
        );

        const responses = await Promise.all(tagQueries);
        const allArticles: Article[] = [];
        const seenIds = new Set([currentArticleId]);

        for (const response of responses) {
          const data = await response.json();
          if (data.results) {
            for (const article of data.results) {
              if (!seenIds.has(article.id)) {
                allArticles.push(article);
                seenIds.add(article.id);
              }
            }
          }
        }

        setArticles(allArticles.slice(0, limit));
      } catch (error) {
        console.error('Error fetching related articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedArticles();
  }, [currentArticleTags, currentArticleId, limit]);

  if (loading) {
    return (
      <div className="py-8">
        <p className="text-gray-600">Loading related articles...</p>
      </div>
    );
  }

  if (articles.length === 0) {
    return null;
  }

  return (
    <div className="py-12 border-t border-gray-200">
      <h2 className="text-2xl font-bold mb-8 text-gray-900">Related Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map(article => (
          <article
            key={article.id}
            className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition duration-200"
          >
            <div className="p-6">
              <h3 className="text-lg font-bold mb-2 line-clamp-2">
                <Link
                  to={`/article/${article.slug}`}
                  className="text-blue-600 hover:text-blue-800"
                >
                  {article.title}
                </Link>
              </h3>

              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {article.excerpt}
              </p>

              <div className="flex justify-between items-center text-xs text-gray-500 mb-4">
                <span>{new Date(article.date).toLocaleDateString()}</span>
                <span>{article.readTime} min read</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {article.tags.slice(0, 2).map(tag => (
                  <span
                    key={tag}
                    className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <Link
                to={`/article/${article.slug}`}
                className="inline-block text-blue-600 hover:text-blue-800 font-medium text-sm"
              >
                Read More →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
