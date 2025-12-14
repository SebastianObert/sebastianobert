"use client";

import { useState, useEffect } from "react";

type TypeWriterProps = {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
  loop?: boolean;
  pauseDuration?: number;
};

export default function TypeWriter({ 
  text, 
  delay = 0, 
  speed = 30,
  className = "",
  loop = false,
  pauseDuration = 2000
}: TypeWriterProps) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setIsStarted(true);
    }, delay);

    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!isStarted) return;

    // Typing phase
    if (!isDeleting && currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    }

    // Pause before deleting
    if (!isDeleting && currentIndex === text.length && loop) {
      const pauseTimer = setTimeout(() => {
        setIsDeleting(true);
      }, pauseDuration);

      return () => clearTimeout(pauseTimer);
    }

    // Deleting phase
    if (isDeleting && currentIndex > 0) {
      const timer = setTimeout(() => {
        setDisplayText((prev) => prev.slice(0, -1));
        setCurrentIndex((prev) => prev - 1);
      }, speed / 2);

      return () => clearTimeout(timer);
    }

    // Reset to start typing again
    if (isDeleting && currentIndex === 0) {
      setIsDeleting(false);
    }
  }, [currentIndex, text, speed, isStarted, isDeleting, loop, pauseDuration]);

  return (
    <span className={className}>
      {displayText}
      {(currentIndex < text.length || isDeleting) && (
        <span className="animate-pulse text-cyan-400">|</span>
      )}
    </span>
  );
}
