'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Đăng ký plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const BlocksRendererComponent = ({ content }) => {
  const containerRef = useRef(null);
  
  useGSAP(() => {
    // Animation context
    const ctx = gsap.context(() => {
      // Animation cho các tiêu đề với staggered effect
      gsap.from('.heading-anim', {
        scrollTrigger: {
          trigger: '.heading-anim',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
      });

      // Animation cho đoạn văn với reveal nhẹ nhàng
      gsap.from('.paragraph-anim', {
        scrollTrigger: {
          trigger: '.paragraph-anim',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out'
      });

      // Animation cho danh sách với fade-in
      gsap.from('.list-anim', {
        scrollTrigger: {
          trigger: '.list-anim',
          start: 'top 88%'
        },
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
      });

      // Animation cho từng item trong danh sách với stagger
      gsap.from('.list-item-anim', {
        scrollTrigger: {
          trigger: '.list-item-anim',
          start: 'top 88%',
          toggleActions: 'play none none reverse'
        },
        x: -20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'back.out(1.2)'
      });

      // Animation nâng cao cho hình ảnh
      const imageElements = gsap.utils.toArray('.image-anim');
      
      imageElements.forEach(image => {
        // Tạo reveal effect cho image
        gsap.fromTo(image, 
          { opacity: 0, scale: 0.9, y: 30 },
          { 
            scrollTrigger: {
              trigger: image,
              start: 'top 85%',
              end: 'bottom 15%',
              toggleActions: 'play none none reverse'
            },
            opacity: 1, 
            scale: 1, 
            y: 0, 
            duration: 1,
            ease: 'power2.out',
          }
        );
        
        // Thêm hiệu ứng hover cho image
        image.addEventListener('mouseenter', () => {
          gsap.to(image, {
            scale: 1.03,
            boxShadow: '0 16px 30px rgba(0,0,0,0.15)',
            duration: 0.4,
            ease: 'power1.out'
          });
        });
        
        image.addEventListener('mouseleave', () => {
          gsap.to(image, {
            scale: 1,
            boxShadow: '0 0 0 rgba(0,0,0,0)',
            duration: 0.4,
            ease: 'power1.out'
          });
        });
      });

      // Animation cho blockquote với slide từ phải
      gsap.from('.blockquote-anim', {
        scrollTrigger: {
          trigger: '.blockquote-anim',
          start: 'top 85%'
        },
        opacity: 0,
        x: 30,
        duration: 0.8,
        ease: 'power2.out'
      });
      
      // Hiệu ứng parallax cho một số thành phần
      gsap.utils.toArray('.parallax-element').forEach(element => {
        gsap.to(element, {
          scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
          },
          y: -50,
          ease: 'none'
        });
      });
    }, containerRef);

    // Cleanup
    return () => ctx.revert();
  }, { scope: containerRef });

  if (!content) return null;

  // Các component tùy chỉnh cho các block khác nhau
  const renderers = {
    paragraph: ({ children }) => (
      <p className="paragraph-anim mb-4" style={{ fontSize: '16px' }}>
        {children}
      </p>
    ),
    heading: ({ children, level }) => {
      const HeadingTag = `h${level}`;
      const sizeClasses = {
        1: 'text-3xl font-bold mb-5 text-purple-700 dark:text-purple-400',
        2: 'text-2xl font-semibold mb-4 text-purple-600 dark:text-purple-300',
        3: 'text-xl font-medium mb-3 text-purple-500 dark:text-purple-300',
        4: 'text-lg font-medium mb-2',
        5: 'text-base font-medium mb-1',
        6: 'text-sm font-medium mb-1',
      };
      
      return (
        <HeadingTag className={`heading-anim ${sizeClasses[level] || ''} parallax-element`}>
          {children}
        </HeadingTag>
      );
    },
    list: {
      unordered: ({ children }) => (
        <ul className="list-anim mb-6" style={{ fontSize: '16px', listStyleType: 'disc', paddingLeft: '1.5rem' }}>
          {children}
        </ul>
      ),
      ordered: ({ children }) => (
        <ol className="list-anim mb-6" style={{ fontSize: '16px', listStyleType: 'decimal', paddingLeft: '1.5rem' }}>
          {children}
        </ol>
      ),
    },
    listItem: ({ children }) => (
      <li className="list-item-anim" style={{ fontSize: '16px', marginBottom: '0.75rem' }}>
        {children}
      </li>
    ),
    link: ({ children, url }) => (
      <a 
        href={url} 
        className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 transition-all duration-300 border-b border-b-purple-200 dark:border-b-purple-800 hover:border-b-purple-600 dark:hover:border-b-purple-500" 
        style={{ fontSize: '16px' }}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
    bold: ({ children }) => <strong className="font-bold text-neutral-900 dark:text-white">{children}</strong>,
    italic: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => <u className="underline decoration-purple-300 underline-offset-2">{children}</u>,
    code: ({ children }) => (
      <code 
        className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded font-mono text-sm text-purple-700 dark:text-purple-300"
        style={{ fontSize: '0.9em' }}
      >
        {children}
      </code>
    ),
    blockquote: ({ children }) => (
      <blockquote className="blockquote-anim border-l-4 border-purple-400 dark:border-purple-600 pl-4 py-1 my-6 italic text-gray-700 dark:text-gray-300">
        {children}
      </blockquote>
    ),
    image: ({ image }) => (
      <div className="image-anim my-8 relative w-full overflow-hidden rounded-lg shadow-md dark:shadow-purple-900/20">
        <Image 
          src={image.url} 
          alt={image.alternativeText || ''} 
          width={image.width || 1200} 
          height={image.height || 800}
          style={{ maxWidth: '100%', height: 'auto' }}
          className="rounded-lg transition-all duration-300 transform-gpu"
          priority={true}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
      </div>
    ),
  };

  return (
    <div ref={containerRef} className="prose prose-purple lg:prose-lg dark:prose-invert max-w-none">
      <BlocksRenderer content={content} renderers={renderers} />
    </div>
  );
};

export default BlocksRendererComponent; 