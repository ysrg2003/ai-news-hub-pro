import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Newspaper, Home, Search, User, Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";

export const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesOpen, setcategoriesOpen] = useState(false);
  
  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/search', icon: Search, label: 'Search' },
    { path: '/personalized', icon: User, label: 'For You' },
  ];

  const categories = [
    { id: 'machine-learning', name: 'Machine Learning' },
    { id: 'nlp', name: 'Natural Language Processing' },
    { id: 'computer-vision', name: 'Computer Vision' },
    { id: 'robotics', name: 'Robotics' },
    { id: 'generative-ai', name: 'Generative AI' },
    { id: 'ai-applications', name: 'AI Applications' },
    { id: 'ai-research', name: 'AI Research' },
    { id: 'ai-ethics', name: 'AI Ethics' },
  ];

  const footerLinks = [
    { path: '/about', label: 'About' },
    { path: '/archive', label: 'Archive' },
    { path: '/contact', label: 'Contact' },
    { path: '/privacy', label: 'Privacy' },
    { path: '/terms', label: 'Terms' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 group">
          <Newspaper className="h-8 w-8 text-blue-600 group-hover:text-blue-700 transition-colors" />
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-gray-900">
              AI News Hub
            </h1>
            <p className="text-xs text-gray-500 -mt-1">Stay informed, stay ahead</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2">
          {navItems.map(({ path, icon: Icon, label }) => (
            <Button
              key={path}
              variant={isActive(path) ? 'default' : 'ghost'}
              size="sm"
              asChild
              className={isActive(path) 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }
            >
              <Link to={path}>
                <Icon className="w-4 h-4 mr-2" />
                {label}
              </Link>
            </Button>
          ))}

          {/* Categories Dropdown */}
          <div className="relative group">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              Categories
              <ChevronDown className="w-4 h-4 ml-1" />
            </Button>
            <div className="absolute left-0 mt-0 w-56 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              {categories.map(cat => (
                <Link
                  key={cat.id}
                  to={`/category/${cat.id}`}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 first:rounded-t-lg last:rounded-b-lg"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Archive Link */}
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <Link to="/archive">Archive</Link>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden text-gray-600 hover:text-gray-900"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </Button>

        {/* Right side - Date */}
        <div className="hidden md:flex items-center space-x-4">
          <span className="text-sm text-gray-500">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'short', 
              month: 'short', 
              day: 'numeric' 
            })}
          </span>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <nav className="container mx-auto px-4 py-4 space-y-2">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
                  isActive(path)
                    ? 'bg-blue-50 text-blue-700 font-medium'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </Link>
            ))}

            {/* Mobile Categories */}
            <div className="py-2 border-t border-gray-100">
              <button
                onClick={() => setcategoriesOpen(!categoriesOpen)}
                className="w-full flex items-center justify-between px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
              >
                <span>Categories</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${categoriesOpen ? 'rotate-180' : ''}`} />
              </button>
              {categoriesOpen && (
                <div className="pl-6 space-y-1">
                  {categories.map(cat => (
                    <Link
                      key={cat.id}
                      to={`/category/${cat.id}`}
                      className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-700 hover:bg-blue-50 rounded-md"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Footer Links */}
            <div className="py-2 border-t border-gray-100 space-y-1">
              {footerLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="pt-2 mt-4 border-t border-gray-100">
              <div className="px-3 py-2 text-sm text-gray-500">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric',
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
