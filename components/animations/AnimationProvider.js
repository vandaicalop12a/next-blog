'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Đăng ký ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function AnimationProvider({ children }) {
  const containerRef = useRef(null);

  useEffect(() => {
    // Đảm bảo rằng ScrollTrigger luôn được cập nhật khi các element thay đổi
    const resizeObserver = new ResizeObserver(() => {
      ScrollTrigger.refresh();
    });

    const ctx = gsap.context(() => {
      // Animation cho page fade-in khi load
      gsap.fromTo(
        'body', 
        { opacity: 0 }, 
        { opacity: 1, duration: 0.8, ease: 'power2.out' }
      );

      // Animation cho header
      gsap.fromTo(
        '.header-animate', 
        { y: -50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      );

      // Animation cho navigation items với stagger
      gsap.fromTo(
        '.nav-item', 
        { opacity: 0, y: -20 }, 
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.1, 
          duration: 0.5, 
          ease: 'back.out(1.7)' 
        }
      );

      // Animation cho main content
      gsap.fromTo(
        '.content-animate', 
        { opacity: 0, y: 20 }, 
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          delay: 0.3, 
          ease: 'power2.out' 
        }
      );

      // Scroll animations cho các section heading
      gsap.utils.toArray('.section-title').forEach(title => {
        gsap.fromTo(
          title,
          { opacity: 0, y: 30 },
          {
            scrollTrigger: {
              trigger: title,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            },
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out'
          }
        );
      });

      // Scroll animations cho các section content
      gsap.utils.toArray('.section-content').forEach(section => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 30 },
          {
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            },
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            delay: 0.2
          }
        );
      });

      // Animation cho footer
      gsap.fromTo(
        '.footer-animate', 
        { opacity: 0, y: 30 }, 
        {
          scrollTrigger: {
            trigger: '.footer-animate',
            start: 'top 95%',
            toggleActions: 'play none none none'
          },
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: 'power2.out' 
        }
      );

      // Đăng ký resize listener để đảm bảo ScrollTrigger luôn hoạt động đúng
      window.addEventListener('resize', () => ScrollTrigger.refresh());

      // Observe container để đảm bảo ScrollTrigger được refresh khi DOM thay đổi
      if (containerRef.current) {
        resizeObserver.observe(containerRef.current);
      }
    }, containerRef);

    // Cleanup function khi component unmount
    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
      window.removeEventListener('resize', () => ScrollTrigger.refresh());
      ctx.revert(); // Revert all GSAP animations
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="animation-container">
      {children}
    </div>
  );
} 