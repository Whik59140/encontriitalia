'use client';

import React from 'react';

export interface Heading { 
  id: string;
  text: string;
  level: number; 
}

interface PostTableOfContentsProps {
  headings: Heading[];
}

export function PostTableOfContents({ headings }: PostTableOfContentsProps) {
  // Filter only H2 headings for the main TOC
  const mainHeadings = headings.filter(h => h.level === 2);

  if (mainHeadings.length === 0) {
    return null; // Don't render TOC if no H2s found
  }

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      // Scroll to the element with an offset to account for sticky headers, etc.
      const offset = 100; // Adjust as needed
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="mb-10 p-6 border rounded-lg bg-gray-50 dark:bg-gray-800 sticky top-24">
      <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">Sommario</h2>
      <ul className="space-y-2">
        {mainHeadings.map((heading) => (
          <li key={heading.id}>
            <a 
              href={`#${heading.id}`}
              onClick={(e) => handleClick(e, heading.id)}
              className="text-primary hover:underline text-sm dark:text-primary-light"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
} 