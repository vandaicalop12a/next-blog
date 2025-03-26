'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Đăng ký ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function AnimatedFooter() {
  const footerRef = useRef(null);
  const dividerRef = useRef(null);
  const linksRef = useRef(null);
  const copyrightRef = useRef(null);

  useEffect(() => {
    const footer = footerRef.current;
    const divider = dividerRef.current;
    const links = linksRef.current;
    const copyright = copyrightRef.current;
    const linkElements = links.querySelectorAll('.footer-link');

    // Tạo scroll trigger cho footer
    ScrollTrigger.create({
      trigger: footer,
      start: 'top 90%',
      onEnter: () => {
        const tl = gsap.timeline();
        
        // Animation cho divider
        tl.fromTo(divider,
          { scaleX: 0, transformOrigin: 'left' },
          { scaleX: 1, duration: 0.8, ease: 'power3.inOut' }
        );
        
        // Animation cho các links
        tl.fromTo(linkElements,
          { y: 20, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            stagger: 0.1, 
            duration: 0.5, 
            ease: 'back.out(1.7)' 
          },
          '-=0.4'
        );
        
        // Animation cho copyright text
        tl.fromTo(copyright,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          '-=0.3'
        );
      },
      once: true
    });

    // Hiệu ứng hover cho các links
    linkElements.forEach(link => {
      link.addEventListener('mouseenter', () => {
        gsap.to(link, {
          y: -3,
          color: '#8B5CF6',
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      link.addEventListener('mouseleave', () => {
        gsap.to(link, {
          y: 0,
          color: '#6B7280',
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === footer) {
          trigger.kill();
        }
      });

      linkElements.forEach(link => {
        link.removeEventListener('mouseenter', null);
        link.removeEventListener('mouseleave', null);
      });
    };
  }, []);

  return (
    <footer 
      ref={footerRef} 
      className="footer-animate mt-20 pt-8 pb-10 border-t border-neutral-200 dark:border-neutral-800"
    >
      <div 
        ref={dividerRef} 
        className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded mb-8"
      />
      
      <div ref={linksRef} className="flex items-center space-x-4 mb-4">
        <Link 
          href="/rss.xml" 
          className="footer-link flex items-center gap-1 text-neutral-500 hover:text-purple-500"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="3.5" cy="20.5" r="1.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M5 15C8.58985 15 11.5 17.9101 11.5 21.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M2 9C10.8365 9 18 16.1635 18 25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span>RSS</span>
        </Link>
        
        <Link 
          href="https://github.com" 
          className="footer-link flex items-center gap-1 text-neutral-500 hover:text-purple-500"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.477 2 2 6.477 2 12C2 16.419 4.865 20.166 8.84 21.489C9.34 21.581 9.5 21.278 9.5 21.017C9.5 20.756 9.5 20.175 9.5 19.388C6.73 19.987 6.14 18.047 6.14 18.047C5.68 17.017 5.03 16.725 5.03 16.725C4.12 16.18 5.1 16.199 5.1 16.199C6.1 16.267 6.63 17.136 6.63 17.136C7.5 18.559 8.97 18.091 9.54 17.839C9.63 17.195 9.89 16.759 10.17 16.489C7.95 16.22 5.62 15.426 5.62 11.598C5.62 10.521 6.01 9.641 6.65 8.958C6.55 8.719 6.2 7.766 6.75 6.326C6.75 6.326 7.59 6.064 9.5 7.42C10.29 7.199 11.15 7.089 12 7.089C12.85 7.089 13.71 7.199 14.5 7.42C16.41 6.064 17.25 6.326 17.25 6.326C17.8 7.766 17.45 8.719 17.35 8.958C17.99 9.641 18.38 10.521 18.38 11.598C18.38 15.437 16.04 16.22 13.82 16.48C14.17 16.787 14.5 17.429 14.5 18.391C14.5 19.747 14.5 20.674 14.5 21.017C14.5 21.278 14.66 21.581 15.17 21.488C19.135 20.165 22 16.418 22 12C22 6.477 17.523 2 12 2Z" fill="currentColor"/>
          </svg>
          <span>GitHub</span>
        </Link>
        
        <Link 
          href="#" 
          className="footer-link flex items-center gap-1 text-neutral-500 hover:text-purple-500"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 18L22 12L16 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 6L2 12L8 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>View Source</span>
        </Link>
      </div>
      
      <p 
        ref={copyrightRef} 
        className="text-neutral-500 dark:text-neutral-400"
      >
        © {new Date().getFullYear()} MIT Licensed
      </p>
    </footer>
  );
} 