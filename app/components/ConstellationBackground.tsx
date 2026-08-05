"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "../../lib/theme";

interface Node {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  size: number;
  phase: number;
}

const LINK_DIST = 120;
const CURSOR_LINK_DIST = 170;

export default function ConstellationBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { sunset } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let raf = 0;
    const mouse = { x: -9999, y: -9999, inside: false };

    const color = sunset ? "245,158,11" : "34,211,238";

    const createNode = (): Node => {
      const x = Math.random() * width;
      const y = Math.random() * height;
      return {
        x,
        y,
        baseX: x,
        baseY: y,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: 1 + Math.random() * 1.5,
        phase: Math.random() * Math.PI * 2,
      };
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(90, Math.max(40, Math.round((width * height) / 18000)));
      nodes = Array.from({ length: count }, () => createNode());
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x >= 0 && y >= 0 && x <= rect.width && y <= rect.height) {
        mouse.x = x;
        mouse.y = y;
        mouse.inside = true;
      } else {
        mouse.inside = false;
      }
    };

    const onMouseLeave = () => {
      mouse.inside = false;
    };

    const loop = () => {
      ctx.clearRect(0, 0, width, height);
      const t = performance.now() * 0.001;

      for (const n of nodes) {
        n.baseX += n.vx;
        n.baseY += n.vy;
        if (n.baseX < 0 || n.baseX > width) n.vx *= -1;
        if (n.baseY < 0 || n.baseY > height) n.vy *= -1;
        n.x = n.baseX + Math.sin(t * 0.5 + n.phase) * 14;
        n.y = n.baseY + Math.cos(t * 0.4 + n.phase * 1.3) * 14;
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < LINK_DIST) {
            const alpha = (1 - d / LINK_DIST) * 0.35;
            ctx.strokeStyle = `rgba(${color}, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      if (mouse.inside) {
        for (const n of nodes) {
          const dx = n.x - mouse.x;
          const dy = n.y - mouse.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < CURSOR_LINK_DIST) {
            const alpha = (1 - d / CURSOR_LINK_DIST) * 0.7;
            ctx.strokeStyle = `rgba(${color}, ${alpha})`;
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
        ctx.fillStyle = `rgba(${color}, 0.9)`;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      for (const n of nodes) {
        ctx.fillStyle = `rgba(${color}, 0.7)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(loop);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    canvas.parentElement?.addEventListener("mouseleave", onMouseLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      canvas.parentElement?.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [sunset]);

  return <canvas ref={canvasRef} className="constellation-canvas" aria-hidden />;
}
