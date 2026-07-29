"use client";

import { useState, useEffect } from "react";
import LoadingScreen from "./components/LoadingScreen";
import ImageModal from "./components/ImageModal";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import SkillsSection from "./components/SkillsSection";
import ProjectsSection from "./components/ProjectsSection";
import OrganizationSection from "./components/OrganizationSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import ChatWidget from "./components/ChatWidget";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [expandedSocial, setExpandedSocial] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<{src: string, alt: string} | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (expandedSocial && !target.closest('[data-social-icon]')) {
        setExpandedSocial(null);
      }
    };

    if (expandedSocial) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [expandedSocial]);

  useEffect(() => {
    let lockTimeout: number | null = null;

    const lockOrientation = async () => {
      try {
        if ((screen as any)?.orientation?.lock) await (screen as any).orientation.lock('landscape');
      } catch {}
    };

    const onFullscreenChange = () => {
      const elem = document.fullscreenElement as HTMLElement | null;
      const isVideo = elem?.tagName === 'VIDEO' || !!elem?.querySelector?.('video');
      if (isVideo && window.innerWidth < 768) {
        if (lockTimeout) window.clearTimeout(lockTimeout);
        lockTimeout = window.setTimeout(lockOrientation, 350);
      } else {
        if (lockTimeout) { window.clearTimeout(lockTimeout); lockTimeout = null; }
        if ((screen as any)?.orientation?.unlock) { try { (screen as any).orientation.unlock(); } catch {} }
      }
    };

    document.addEventListener('fullscreenchange', onFullscreenChange);
    document.addEventListener('webkitfullscreenchange', onFullscreenChange as EventListener);

    return () => {
      document.removeEventListener('fullscreenchange', onFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', onFullscreenChange as EventListener);
      if (lockTimeout) window.clearTimeout(lockTimeout);
    };
  }, []);

  return (
    <>
      <ImageModal 
        selectedImage={selectedImage} 
        onClose={() => setSelectedImage(null)} 
      />

      {isLoading && <LoadingScreen />}

      <Navbar />

      <main className={`min-h-screen relative overflow-hidden ${!isLoading ? 'animate-zoomIn' : 'opacity-0'}`} style={{ color: "var(--text-secondary)" }}>
        <HeroSection 
          expandedSocial={expandedSocial}
          setExpandedSocial={setExpandedSocial}
          setSelectedImage={setSelectedImage}
        />

        <SkillsSection />

        <ProjectsSection setSelectedImage={setSelectedImage} />

        <OrganizationSection setSelectedImage={setSelectedImage} />

        <ContactSection 
          expandedSocial={expandedSocial}
          setExpandedSocial={setExpandedSocial}
        />

        <Footer />
      </main>

      <ChatWidget />
    </>
  );
}
