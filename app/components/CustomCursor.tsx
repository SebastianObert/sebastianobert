"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "../../lib/theme";

const HOVER_SELECTOR =
  'a, button, input, textarea, select, [role="button"], [data-cursor], .cursor-pointer';

export default function CustomCursor() {
  const { sunset } = useTheme();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    setEnabled(fine.matches);
    const onChange = (e: MediaQueryListEvent) => setEnabled(e.matches);
    fine.addEventListener("change", onChange);
    return () => fine.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      setVisible(true);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setHovering(!!target.closest(HOVER_SELECTOR));
    };

    const onLeave = () => setVisible(false);

    const loop = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.15;
      ring.current.y += (pos.current.y - ring.current.y) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%, -50%)`;
      }
      raf.current = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    raf.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      className={`cursor-layer ${visible ? "opacity-100" : "opacity-0"}`}
      style={{ "--cursor-color": sunset ? "#f59e0b" : "#22d3ee" } as React.CSSProperties}
      aria-hidden
    >
      <div ref={dotRef} className={`cursor-dot ${hovering ? "cursor-dot--active" : ""}`} />
      <div ref={ringRef} className={`cursor-ring ${hovering ? "cursor-ring--active" : ""}`} />
    </div>
  );
}
