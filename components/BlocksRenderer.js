'use client';

import React from 'react';
import Image from 'next/image';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

const BlocksRendererComponent = ({ content }) => {
  if (!content) return null;

  // Các component tùy chỉnh cho các block khác nhau
  const renderers = {
    paragraph: ({ children }) => <p style={{ fontSize: '16px' }}>{children}</p>,
    heading: ({ children, level }) => {
      const HeadingTag = `h${level}`;
      const sizeClasses = {
        1: 'text-2xl font-bold mb-4',
        2: 'text-xl font-semibold mb-3',
        3: 'text-lg font-medium mb-2',
        4: 'text-base font-medium mb-2',
        5: 'text-sm font-medium mb-1',
        6: 'text-xs font-medium mb-1',
      };
      
      return (
        <HeadingTag className={sizeClasses[level] || ''}>
          {children}
        </HeadingTag>
      );
    },
    list: {
      unordered: ({ children }) => <ul style={{ fontSize: '16px', listStyleType: 'disc', paddingLeft: '1rem' }}>{children}</ul>,
      ordered: ({ children }) => <ol style={{ fontSize: '16px', listStyleType: 'decimal', paddingLeft: '1rem' }}>{children}</ol>,
    },
    listItem: ({ children }) => <li style={{ fontSize: '16px', marginBottom: '0.5rem' }}>{children}</li>,
    link: ({ children, url }) => <a href={url} className="text-blue-600 hover:underline" style={{ fontSize: '16px' }}>{children}</a>,
    bold: ({ children }) => <strong>{children}</strong>,
    italic: ({ children }) => <em>{children}</em>,
    underline: ({ children }) => <u>{children}</u>,
    code: ({ children }) => <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded" style={{ fontSize: '16px' }}>{children}</code>,
    blockquote: ({ children }) => <blockquote className="border-l-4 border-gray-300 dark:border-gray-700 pl-4 italic">{children}</blockquote>,
    image: ({ image }) => (
      <div className="my-4 relative w-full max-w-full">
        <Image 
          src={image.url} 
          alt={image.alternativeText || ''} 
          width={image.width || 1200} 
          height={image.height || 800}
          style={{ maxWidth: '100%', height: 'auto' }}
          className="rounded-md"
          priority={true}
        />
      </div>
    ),
  };

  return (
    <div className="prose md:prose-lg dark:prose-invert">
      <BlocksRenderer content={content} renderers={renderers} />
    </div>
  );
};

export default BlocksRendererComponent; 