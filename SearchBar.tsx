import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';

interface SearchResult {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
}

export const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const searchArticles = async () => {
      if (query.trim().length < 2) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(`/api/articles/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        setResults(data.results?.slice(0, 5) || []);
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchArticles, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setShowResults(false);
    }
  };

  const handleResultClick = (slug: string) => {
    navigate(`/article/${slug}`);
    setQuery('');
    setShowResults(false);
  };

  return (
    <div className="relative w-full max-w-md">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative flex items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowResults(true);
            }}
            onFocus={() => setShowResults(true)}
            placeholder="Search articles..."
            className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setResults([]);
                setShowResults(false);
              }}
              className="absolute right-3 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          {!query && (
            <Search className="absolute right-3 w-4 h-4 text-gray-400" />
          )}
        </div>

        {/* Search Results Dropdown */}
        {showResults && (query.trim().length > 0) && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            {loading ? (
              <div className="p-4 text-center text-gray-500">
                <p>Searching...</p>
              </div>
            ) : results.length > 0 ? (
              <div className="max-h-96 overflow-y-auto">
                {results.map(result => (
                  <button
                    key={result.id}
                    onClick={() => handleResultClick(result.slug)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
                  >
                    <h4 className="font-semibold text-gray-900 line-clamp-1">
                      {result.title}
                    </h4>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {result.excerpt}
                    </p>
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-gray-500">
                <p>No articles found</p>
              </div>
            )}
            <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 text-center">
              <button
                onClick={handleSearch}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                View all results
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};
