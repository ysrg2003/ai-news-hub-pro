import React, { useEffect, useState } from 'react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ content }) => {
  const [headings, setHeadings] = useState<Heading[]>([]);

  useEffect(() => {
    // Parse headings from HTML content
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const headingElements = doc.querySelectorAll('h2, h3');

    const extractedHeadings: Heading[] = [];
    headingElements.forEach((heading, index) => {
      const level = parseInt(heading.tagName[1]);
      const text = heading.textContent || '';
      const id = `heading-${index}`;

      // Add ID to heading if it doesn't have one
      heading.id = id;

      extractedHeadings.push({
        id,
        text,
        level,
      });
    });

    setHeadings(extractedHeadings);
  }, [content]);

  if (headings.length === 0) {
    return null;
  }

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
      <h3 className="text-lg font-bold mb-4 text-gray-900">Table of Contents</h3>
      <nav className="space-y-2">
        {headings.map(heading => (
          <button
            key={heading.id}
            onClick={() => handleScroll(heading.id)}
            className={`block w-full text-left transition-colors hover:text-blue-600 ${
              heading.level === 2
                ? 'text-gray-700 font-medium'
                : 'text-gray-600 pl-4'
            }`}
          >
            {heading.text}
          </button>
        ))}
      </nav>
    </div>
  );
};
