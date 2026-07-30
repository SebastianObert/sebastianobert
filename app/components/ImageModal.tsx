"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

interface ImageModalProps {
  selectedImage: { src: string; alt: string } | null;
  onClose: () => void;
}

export default function ImageModal({ selectedImage, onClose }: ImageModalProps) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [transformOrigin, setTransformOrigin] = useState({ x: 50, y: 50 });

  useEffect(() => {
    if (!selectedImage) {
      setZoomLevel(1);
      setTransformOrigin({ x: 50, y: 50 });
    }
  }, [selectedImage]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (selectedImage) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [selectedImage, handleKeyDown]);

  if (!selectedImage) return null;

  return (
    <div 
      className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4 cursor-pointer"
      onClick={onClose}
    >
      <div className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center">
        <div 
          className="relative inline-block cursor-default"
          onMouseMove={(e) => {
            if (zoomLevel >= 1) {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = ((e.clientX - rect.left) / rect.width) * 100;
              const y = ((e.clientY - rect.top) / rect.height) * 100;
              setTransformOrigin({ x, y });
            }
          }}
          onWheel={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setZoomLevel(prev => {
              const delta = e.deltaY > 0 ? -0.1 : 0.1;
              const newZoom = prev + delta;
              return Math.min(Math.max(newZoom, 0.5), 3);
            });
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div 
            className="relative transition-transform duration-200"
            style={{ 
              transform: `scale(${zoomLevel})`,
              transformOrigin: zoomLevel >= 1 ? `${transformOrigin.x}% ${transformOrigin.y}%` : '50% 50%'
            }}
          >
            <Image 
              src={selectedImage.src}
              alt={selectedImage.alt}
              width={1200}
              height={800}
              className="object-contain max-h-[90vh]"
            />
          </div>
        </div>
        <button 
          className="absolute top-4 right-4 w-10 h-10 bg-slate-800/80 hover:bg-slate-700 rounded-full flex items-center justify-center text-white transition z-10"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-800/80 px-4 py-2 rounded-full text-white text-sm pointer-events-none">
          {Math.round(zoomLevel * 100)}%
        </div>
      </div>
    </div>
  );
}
