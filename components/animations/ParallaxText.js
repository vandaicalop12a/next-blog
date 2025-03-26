'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Đăng ký ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function ParallaxText({ 
  children, 
  speed = 0.5, 
  className = "", 
  as: Tag = "h1",
  direction = "up" // "up" hoặc "down"
}) {
  const textRef = useRef(null);

  useEffect(() => {
    const text = textRef.current;

    // Tạo hiệu ứng parallax cho text
    gsap.fromTo(
      text,
      { 
        y: direction === "up" ? 100 : -100, 
        opacity: 0 
      },
      {
        scrollTrigger: {
          trigger: text,
          start: "top 85%",
          end: "top 15%",
          scrub: true,
          toggleActions: "play none none reverse"
        },
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power2.out"
      }
    );

    // Hiệu ứng chữ nhấp nháy nhẹ theo mouse position
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      // Tính toán giá trị offset dựa trên vị trí chuột
      const moveX = ((clientX - windowWidth / 2) / windowWidth) * speed * 15;
      const moveY = ((clientY - windowHeight / 2) / windowHeight) * speed * 15;
      
      // Áp dụng transform cho text
      gsap.to(text, {
        x: moveX,
        y: moveY,
        duration: 1.5,
        ease: "power2.out",
        overwrite: "auto"
      });
    };

    // Chỉ đăng ký sự kiện mouse move nếu thiết bị không phải là mobile
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    if (isDesktop) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    // Cleanup
    return () => {
      if (isDesktop) {
        window.removeEventListener("mousemove", handleMouseMove);
      }
      
      // Đảm bảo ScrollTrigger được kill
      const triggers = ScrollTrigger.getAll();
      triggers.forEach(trigger => {
        if (trigger.vars.trigger === text) {
          trigger.kill();
        }
      });
    };
  }, [speed, direction]);

  return (
    <Tag
      ref={textRef}
      className={`parallax-text transition-all ${className}`}
      style={{ 
        overflow: 'visible', 
        transformStyle: 'preserve-3d',
        willChange: 'transform' 
      }}
    >
      {children}
    </Tag>
  );
} 