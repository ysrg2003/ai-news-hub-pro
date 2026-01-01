import React from 'react';
import { Facebook, Twitter, Linkedin, Mail, Link2, Copy } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
  url: string;
  excerpt?: string;
}

export const ShareButtons: React.FC<ShareButtonsProps> = ({ title, url, excerpt }) => {
  const [copied, setCopied] = React.useState(false);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(excerpt || title)}\n\n${url}`,
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center space-x-4 py-6 border-y border-gray-200">
      <span className="text-sm font-medium text-gray-700">Share:</span>
      
      <a
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
        aria-label="Share on Twitter"
      >
        <Twitter className="w-5 h-5" />
      </a>

      <a
        href={shareLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
        aria-label="Share on Facebook"
      >
        <Facebook className="w-5 h-5" />
      </a>

      <a
        href={shareLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="w-5 h-5" />
      </a>

      <a
        href={shareLinks.email}
        className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
        aria-label="Share via Email"
      >
        <Mail className="w-5 h-5" />
      </a>

      <button
        onClick={handleCopyLink}
        className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
        aria-label="Copy link"
        title="Copy link to clipboard"
      >
        {copied ? (
          <span className="text-xs font-medium">✓</span>
        ) : (
          <Copy className="w-5 h-5" />
        )}
      </button>
    </div>
  );
};
