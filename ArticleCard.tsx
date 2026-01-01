import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Bookmark } from 'lucide-react';

interface ArticleCardProps {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  slug: string;
  readTime: number;
  image?: string;
  articleType?: 'trending' | 'evergreen';
  tags?: string[];
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  excerpt,
  date,
  category,
  slug,
  readTime,
  image,
  articleType,
  tags,
}) => {
  const articleBadge = articleType === 'trending' ? '🔥' : '📖';

  return (
    <article className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Image */}
      {image && (
        <div className="h-48 bg-gray-200 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {/* Category and Badge */}
        <div className="flex items-center justify-between mb-3">
          <span className="inline-block text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            {category}
          </span>
          {articleType && (
            <span className="text-lg" title={articleType}>
              {articleBadge}
            </span>
          )}
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold mb-3 line-clamp-2">
          <Link
            to={`/article/${slug}`}
            className="text-gray-900 hover:text-blue-600 transition-colors"
          >
            {title}
          </Link>
        </h2>

        {/* Excerpt */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {excerpt}
        </p>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.slice(0, 3).map(tag => (
              <Link
                key={tag}
                to={`/articles/tag/${tag}`}
                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-gray-200 transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        )}

        {/* Meta Information */}
        <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-4">
            <span>{new Date(date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}</span>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{readTime} min</span>
            </div>
          </div>
          <button className="text-gray-400 hover:text-blue-600 transition-colors">
            <Bookmark className="w-4 h-4" />
          </button>
        </div>

        {/* Read More Link */}
        <div className="mt-4">
          <Link
            to={`/article/${slug}`}
            className="inline-block text-blue-600 hover:text-blue-800 font-semibold text-sm"
          >
            Read Article →
          </Link>
        </div>
      </div>
    </article>
  );
};
