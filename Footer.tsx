import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Mail } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

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
    { path: '/about', label: 'About Us' },
    { path: '/contact', label: 'Contact' },
    { path: '/archive', label: 'Archive' },
    { path: '/privacy', label: 'Privacy Policy' },
    { path: '/terms', label: 'Terms of Service' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-white font-bold mb-4">AI News Hub</h3>
            <p className="text-sm text-gray-400">
              Your daily source for the latest AI news, research, and developments. Stay informed about the future of artificial intelligence.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              {categories.slice(0, 4).map(cat => (
                <li key={cat.id}>
                  <Link
                    to={`/category/${cat.id}`}
                    className="text-sm text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More Categories */}
          <div>
            <h4 className="text-white font-semibold mb-4">More</h4>
            <ul className="space-y-2">
              {categories.slice(4).map(cat => (
                <li key={cat.id}>
                  <Link
                    to={`/category/${cat.id}`}
                    className="text-sm text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.map(link => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Copyright */}
          <div className="text-sm text-gray-400 mb-4 md:mb-0">
            <p>&copy; {currentYear} AI News Hub. All rights reserved.</p>
          </div>

          {/* Social Links */}
          <div className="flex space-x-4">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:contact@ai-news-hub.com"
              className="text-gray-400 hover:text-blue-400 transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
