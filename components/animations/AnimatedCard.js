'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { formatDate } from '@/lib/utils';

export default function AnimatedCard({ title, description, date, slug }) {
  const cardRef = useRef(null);
  const titleRef = useRef(null);
  
  // Log để debug
  console.log('AnimatedCard props:', { title, description, date, slug });
  
  // Hiệu ứng hover
  useEffect(() => {
    const card = cardRef.current;
    const titleEl = titleRef.current;
    
    if (!card) return;
    
    // Hiệu ứng khi hover vào card
    const hoverIn = () => {
      gsap.to(card, {
        y: -5,
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 5px 10px -5px rgba(0, 0, 0, 0.05)',
        duration: 0.3,
        ease: 'power2.out'
      });
      
      if (titleEl) {
        gsap.to(titleEl, {
          color: '#8B5CF6',
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    };
    
    // Hiệu ứng khi hover ra
    const hoverOut = () => {
      gsap.to(card, {
        y: 0,
        boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)',
        duration: 0.3,
        ease: 'power2.out'
      });
      
      if (titleEl) {
        gsap.to(titleEl, {
          color: 'currentColor',
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    };
    
    card.addEventListener('mouseenter', hoverIn);
    card.addEventListener('mouseleave', hoverOut);
    
    // Cleanup event listeners
    return () => {
      card.removeEventListener('mouseenter', hoverIn);
      card.removeEventListener('mouseleave', hoverOut);
    };
  }, []);
  
  return (
    <Link href={`/blog/${slug}`}>
      <article 
        ref={cardRef}
        className="group p-4 rounded-lg transition-all duration-300 hover:bg-gray-50 dark:hover:bg-neutral-900 cursor-pointer"
      >
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-center">
            <h2 
              ref={titleRef}
              className="text-xl font-medium tracking-tight"
            >
              {title || 'Untitled Post'}
            </h2>
            <time 
              className="text-sm text-neutral-500 dark:text-neutral-400"
            >
              {date ? formatDate(date) : 'No date'}
            </time>
          </div>
          <p 
            className="text-neutral-600 dark:text-neutral-400 line-clamp-2"
          >
            {description || 'No description available'}
          </p>
          <div className="flex items-center mt-2">
            <span className="text-purple-500 text-sm font-medium transition-all duration-300 group-hover:translate-x-1">
              Read more
              <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1">→</span>
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
} 