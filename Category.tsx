import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  readTime: number;
  image?: string;
}

interface CategoryInfo {
  id: string;
  name: string;
  description: string;
}

const CATEGORIES: Record<string, CategoryInfo> = {
  'machine-learning': {
    id: 'machine-learning',
    name: 'Machine Learning',
    description: 'Explore the latest developments in machine learning algorithms, models, and applications.',
  },
  'nlp': {
    id: 'nlp',
    name: 'Natural Language Processing',
    description: 'Discover breakthroughs in language understanding, generation, and processing.',
  },
  'computer-vision': {
    id: 'computer-vision',
    name: 'Computer Vision',
    description: 'Learn about image recognition, object detection, and visual AI technologies.',
  },
  'robotics': {
    id: 'robotics',
    name: 'Robotics',
    description: 'Follow the evolution of robotic systems, automation, and autonomous machines.',
  },
  'generative-ai': {
    id: 'generative-ai',
    name: 'Generative AI',
    description: 'Explore the frontier of AI that creates content, images, and code.',
  },
  'ai-applications': {
    id: 'ai-applications',
    name: 'AI Applications',
    description: 'See how AI is transforming industries and solving real-world problems.',
  },
  'ai-research': {
    id: 'ai-research',
    name: 'AI Research',
    description: 'Dive into cutting-edge research papers and scientific discoveries.',
  },
  'ai-ethics': {
    id: 'ai-ethics',
    name: 'AI Ethics',
    description: 'Understand the ethical implications and responsible development of AI.',
  },
};

export default function Category() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const category = categoryId ? CATEGORIES[categoryId] : null;

  useEffect(() => {
    const fetchArticles = async () => {
      if (!categoryId) return;

      try {
        setLoading(true);
        const response = await fetch(`/api/articles/category/${categoryId}?page=${page}&limit=10`);
        const data = await response.json();
        setArticles(data.articles || []);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [categoryId, page]);

  if (!category) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Category not found</h1>
        <p className="text-gray-600">The category you're looking for doesn't exist.</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{category.name} - AI News Hub</title>
        <meta name="description" content={category.description} />
        <meta property="og:title" content={`${category.name} - AI News Hub`} />
        <meta property="og:description" content={category.description} />
      </Helmet>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">{category.name}</h1>
          <p className="text-lg text-gray-600">{category.description}</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading articles...</p>
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No articles found in this category yet.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {articles.map(article => (
                <article
                  key={article.id}
                  className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition duration-200"
                >
                  {article.image && (
                    <div className="h-48 bg-gray-200 overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-2 line-clamp-2">
                      <a href={`/article/${article.slug}`} className="text-blue-600 hover:text-blue-800">
                        {article.title}
                      </a>
                    </h2>

                    <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>

                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <span>{new Date(article.date).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{article.readTime} min</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-4">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-100"
                >
                  Previous
                </button>

                <div className="flex space-x-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`px-3 py-2 rounded-lg ${
                        p === page
                          ? 'bg-blue-600 text-white'
                          : 'border border-gray-300 hover:bg-gray-100'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-100"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
