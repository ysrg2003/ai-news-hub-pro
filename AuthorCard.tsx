import React from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';

interface AuthorCardProps {
  author: string;
  date: string;
  readTime: number;
}

export const AuthorCard: React.FC<AuthorCardProps> = ({ author, date, readTime }) => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 mb-8">
      <div className="flex items-start space-x-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 text-white font-bold text-lg">
            {author.charAt(0)}
          </div>
        </div>

        {/* Author Info */}
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 mb-1">About the Author</h3>
          <Link
            to="/about"
            className="text-blue-600 hover:text-blue-800 font-semibold mb-3 inline-block"
          >
            {author}
          </Link>
          <p className="text-gray-700 text-sm mb-4">
            AI News Hub is your trusted source for the latest developments in artificial intelligence. Our team of experts brings you daily insights into the world of AI.
          </p>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
            <div className="flex items-center space-x-1">
              <span className="font-medium">Published:</span>
              <span>{new Date(date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="font-medium">Read Time:</span>
              <span>{readTime} min</span>
            </div>
          </div>

          {/* Contact Button */}
          <a
            href="mailto:contact@ai-news-hub.com"
            className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            <Mail className="w-4 h-4" />
            <span>Contact Author</span>
          </a>
        </div>
      </div>
    </div>
  );
};
