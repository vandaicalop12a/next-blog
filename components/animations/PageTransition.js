'use client';

import React, { useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';

export default function PageTransition({ children }) {
  const pathname = usePathname();
  const pageRef = useRef(null);
  const overlayRef = useRef(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    // Bỏ qua hiệu ứng chuyển trang khi component được mount lần đầu
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // Timeline cho hiệu ứng chuyển trang
    const tl = gsap.timeline();

    // Hiệu ứng chuyển trang
    tl.to(overlayRef.current, {
      scaleY: 1,
      transformOrigin: 'bottom',
      duration: 0.4,
      ease: 'power2.inOut',
    })
      .to(pageRef.current, {
        opacity: 0,
        y: -40,
        duration: 0.3,
        ease: 'power1.in',
      }, "<")
      .to(overlayRef.current, {
        scaleY: 0,
        transformOrigin: 'top',
        duration: 0.4,
        ease: 'power2.inOut',
        delay: 0.1,
      })
      .fromTo(
        pageRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        "-=0.3"
      );
  }, [pathname]);

  return (
    <>
      <div className="page-content" ref={pageRef}>
        {children}
      </div>
      
      {/* Overlay cho hiệu ứng chuyển trang */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 z-50 transform scale-y-0 pointer-events-none"
        style={{ transformOrigin: "bottom" }}
      />
    </>
  );
} 