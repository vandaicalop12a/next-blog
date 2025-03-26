'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';

export default function AnimatedNav() {
  const navRef = useRef(null);
  const indicatorRef = useRef(null);
  const pathname = usePathname();
  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog' },
  ];

  useEffect(() => {
    const activeNavItemIndex = navItems.findIndex(item => item.href === pathname);
    const navLinks = navRef.current.querySelectorAll('a');
    const indicator = indicatorRef.current;

    // Animation ban đầu
    gsap.fromTo(
      navLinks,
      { y: -20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.5,
        delay: 0.5,
        ease: 'power3.out',
        onComplete: updateIndicator
      }
    );

    // Cập nhật vị trí indicator
    function updateIndicator() {
      if (activeNavItemIndex !== -1 && navLinks[activeNavItemIndex]) {
        const activeItem = navLinks[activeNavItemIndex];
        const rect = activeItem.getBoundingClientRect();
        const navRect = navRef.current.getBoundingClientRect();

        gsap.to(indicator, {
          width: rect.width,
          x: rect.left - navRect.left,
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out'
        });
      } else {
        gsap.to(indicator, {
          opacity: 0,
          duration: 0.2
        });
      }
    }

    // Hiệu ứng hover
    navLinks.forEach((link) => {
      link.addEventListener('mouseenter', () => {
        gsap.to(link, {
          y: -3,
          color: '#8B5CF6',
          scale: 1.05,
          fontWeight: 600,
          duration: 0.3,
          ease: 'power1.out'
        });
      });

      link.addEventListener('mouseleave', () => {
        const isActive = link.getAttribute('data-active') === 'true';
        gsap.to(link, {
          y: 0,
          scale: 1,
          color: isActive ? '#8B5CF6' : 'currentColor',
          fontWeight: isActive ? 600 : 400,
          duration: 0.3,
          ease: 'power1.out'
        });
      });
    });

    // Update indicator khi resize
    window.addEventListener('resize', updateIndicator);

    // Cleanup
    return () => {
      window.removeEventListener('resize', updateIndicator);
      navLinks.forEach((link) => {
        link.removeEventListener('mouseenter', null);
        link.removeEventListener('mouseleave', null);
      });
    };
  }, [pathname, navItems]);

  return (
    <nav className="relative flex space-x-6" ref={navRef}>
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`nav-item py-1 px-1 text-base font-normal transition-all ${
              isActive ? 'text-purple-500 font-semibold' : 'text-neutral-600 dark:text-neutral-300'
            }`}
            data-active={isActive}
          >
            {item.name}
          </Link>
        );
      })}
      {/* Indiciator line for active nav item */}
      <div
        ref={indicatorRef}
        className="absolute -bottom-2 h-0.5 bg-purple-500 opacity-0 transition-all duration-300"
      />
    </nav>
  );
} 