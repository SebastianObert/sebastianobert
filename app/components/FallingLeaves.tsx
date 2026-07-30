"use client";

import { useEffect, useRef } from "react";

interface Leaf {
  x: number;
  y: number;
  size: number;
  rotation: number;
  speed: number;
  drift: number;
  delay: number;
  color: string;
  type: number;
}

const COLORS = ["#f59e0b", "#d97706", "#b45309", "#92400e", "#78350f"];
const TYPES = ["M12 2L2 12h20L12 2z", "M12 2C6 6 2 12 2 12s4 6 10 10 10-6 10-10-4-6-10-10z", "M12 2L2 10l4 8h12l4-8L12 2z"];

export default function FallingLeaves() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let leaves: Leaf[] = [];
    const LEAF_COUNT = 25;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < LEAF_COUNT; i++) {
      leaves.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 8 + Math.random() * 12,
        rotation: Math.random() * 360,
        speed: 0.15 + Math.random() * 0.35,
        drift: (Math.random() - 0.5) * 0.4,
        delay: Math.random() * 200,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        type: Math.floor(Math.random() * TYPES.length),
      });
    }

    let frame = 0;
    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 0.6;

      for (const leaf of leaves) {
        const progress = (frame + leaf.delay) * 0.008;
        leaf.y += leaf.speed;
        leaf.x += Math.sin(progress) * 0.5 + leaf.drift;
        leaf.rotation += 0.3 + leaf.drift * 0.3;

        if (leaf.y > canvas.height + 20) {
          leaf.y = -20;
          leaf.x = Math.random() * canvas.width;
        }
        if (leaf.x < -30) leaf.x = canvas.width + 20;
        if (leaf.x > canvas.width + 30) leaf.x = -20;

        ctx.save();
        ctx.translate(leaf.x, leaf.y);
        ctx.rotate((leaf.rotation * Math.PI) / 180);
        ctx.scale(leaf.size / 24, leaf.size / 24);
        ctx.fillStyle = leaf.color;
        ctx.beginPath();
        const d = TYPES[leaf.type];
        const path = new Path2D(d);
        ctx.fill(path);
        ctx.restore();
      }

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}
