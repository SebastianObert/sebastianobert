"use client";

import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";

type ScrollProps = {
  children: React.ReactNode;
  className?: string;
  animation?: "fade-up" | "fade-down" | "fade-left" | "fade-right" | "zoom-in" | "flip" | "slide-fade" | "scale-blur" | "reveal" | "glitch" | "parallax" | "stagger"; 
  delay?: number;
  duration?: number;
  triggerMargin?: string;
  disableOnMobile?: boolean;
};

export default function ScrollElement({ 
  children, 
  className = "", 
  animation = "fade-up", 
  delay = 0,
  duration = 0.5,
  triggerMargin = "0px 0px 0px 0px",
  disableOnMobile = false
}: ScrollProps) {

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const variants = {
    "fade-up": { hidden: { opacity: 0, y: 75 }, visible: { opacity: 1, y: 0 } },
    "fade-down": { hidden: { opacity: 0, y: -75 }, visible: { opacity: 1, y: 0 } },
    "fade-left": { hidden: { opacity: 0, x: 75 }, visible: { opacity: 1, x: 0 } },
    "fade-right": { hidden: { opacity: 0, x: -75 }, visible: { opacity: 1, x: 0 } },
    "zoom-in": { hidden: { opacity: 0, scale: 0.7 }, visible: { opacity: 1, scale: 1 } },
    "flip": { hidden: { opacity: 0, rotateX: 90 }, visible: { opacity: 1, rotateX: 0 } },
    "slide-fade": { 
      hidden: { opacity: 0, x: -100, y: 50 }, 
      visible: { opacity: 1, x: 0, y: 0 } 
    },
    "scale-blur": { 
      hidden: { opacity: 0, scale: 0.8, filter: "blur(10px)" }, 
      visible: { opacity: 1, scale: 1, filter: "blur(0px)" } 
    },
    "reveal": { 
      hidden: { opacity: 0, clipPath: "inset(0 100% 0 0)" }, 
      visible: { opacity: 1, clipPath: "inset(0 0% 0 0)" } 
    },
    "glitch": { 
      hidden: { opacity: 0, x: -20, skewX: 20 }, 
      visible: { opacity: 1, x: 0, skewX: 0 } 
    },
    "parallax": { 
      hidden: { opacity: 0, y: 100, scale: 0.9 }, 
      visible: { opacity: 1, y: 0, scale: 1 } 
    },
    "stagger": { 
      hidden: { opacity: 0, y: 30, rotateZ: -5 }, 
      visible: { opacity: 1, y: 0, rotateZ: 0 } 
    },
  };

  // If disableOnMobile is true and we're on mobile, just return children without animation
  if (disableOnMobile && isMobile) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={variants[animation]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0, margin: triggerMargin }}
      transition={{ 
        duration: duration, 
        delay: delay, 
        ease: animation === "glitch" ? [0.43, 0.13, 0.23, 0.96] : "easeOut",
        type: animation === "parallax" ? "spring" : "tween",
        stiffness: animation === "parallax" ? 100 : undefined,
        damping: animation === "parallax" ? 20 : undefined,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}