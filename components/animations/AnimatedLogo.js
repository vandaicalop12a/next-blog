'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';

export default function AnimatedLogo() {
  const logoRef = useRef(null);
  const svgRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const logoEl = logoRef.current;
    const svgEl = svgRef.current;
    const textEl = textRef.current;

    // Animation ban đầu
    const logoTl = gsap.timeline();
    logoTl.fromTo(svgEl, 
      { rotate: -15, scale: 0.7, opacity: 0 },
      { rotate: 0, scale: 1, opacity: 1, duration: 0.8, ease: "elastic.out(1, 0.5)" }
    );
    logoTl.fromTo(textEl,
      { x: -10, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
      "-=0.4"
    );

    // Hiệu ứng hover
    if (logoEl) {
      const hoverInAnimation = () => {
        gsap.to(svgEl, {
          rotate: 5,
          scale: 1.1,
          duration: 0.4,
          ease: "power2.out"
        });
        gsap.to(textEl, {
          x: 3,
          color: "#8B5CF6",
          fontWeight: 700,
          duration: 0.3,
          ease: "power2.out"
        });
      };

      const hoverOutAnimation = () => {
        gsap.to(svgEl, {
          rotate: 0,
          scale: 1,
          duration: 0.4,
          ease: "power2.out"
        });
        gsap.to(textEl, {
          x: 0,
          color: "currentColor",
          fontWeight: 600,
          duration: 0.3,
          ease: "power2.out"
        });
      };

      logoEl.addEventListener('mouseenter', hoverInAnimation);
      logoEl.addEventListener('mouseleave', hoverOutAnimation);

      // Cleanup
      return () => {
        logoEl.removeEventListener('mouseenter', hoverInAnimation);
        logoEl.removeEventListener('mouseleave', hoverOutAnimation);
      };
    }
  }, []);

  return (
    <Link href="/">
      <div 
        ref={logoRef} 
        className="flex items-center gap-2 cursor-pointer"
      >
        <svg
          ref={svgRef}
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transform-gpu will-change-transform"
        >
          <path
            d="M12 3L20 7.5L12 12L4 7.5L12 3Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="rgba(139, 92, 246, 0.1)"
          />
          <path
            d="M4 16.5L12 21L20 16.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 12L12 16.5L20 12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span 
          ref={textRef} 
          className="text-lg font-semibold tracking-wide"
        >
          My Blog
        </span>
      </div>
    </Link>
  );
} 