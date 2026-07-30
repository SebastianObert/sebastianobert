"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Snowfall from "react-snowfall";
import ScrollElement from "./ScrollElement";
import TypeWriter from "./TypeWriter";
import FallingLeaves from "./FallingLeaves";
import { api, Profile } from "../../lib/api";
import { useTheme } from "../../lib/theme";

interface HeroSectionProps {
  expandedSocial: string | null;
  setExpandedSocial: (social: string | null) => void;
  setSelectedImage: (image: { src: string; alt: string } | null) => void;
}

export default function HeroSection({ expandedSocial, setExpandedSocial, setSelectedImage }: HeroSectionProps) {
  const { sunset } = useTheme();
  const [ripples, setRipples] = useState<number[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    api.getProfile().then(setProfile);
  }, []);

  if (!profile) return null;

  return (
    <section id="about" className="container mx-auto px-6 pt-40 pb-20 relative z-10">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{
        WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)',
        maskImage: 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)'
      }}>
          {!sunset ? (
          <Snowfall 
            style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 0 }}
            snowflakeCount={80}
            color="#ffffff"
            radius={[0.5, 2.5]} 
            speed={[0.5, 2.0]}
            wind={[-0.5, 1.0]}
            opacity={[0.3, 0.7]}
          />
          ) : (
          <FallingLeaves />
          )}
      </div>

      <ScrollElement animation="slide-fade" duration={0.9}>
        <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-20">
          <div className="flex-1 text-center md:text-left space-y-6">
            <h2 className={`font-medium text-lg tracking-wide ${sunset ? 'text-amber-400' : 'text-cyan-400'}`}>{profile.greeting}</h2>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              I&apos;m <span className={`text-transparent bg-clip-text bg-gradient-to-r ${sunset ? 'from-amber-400 to-orange-600' : 'from-cyan-400 to-blue-600'}`}>{profile.name}</span>
            </h1>
            
            <div className="space-y-4">
              <p className="text-lg md:text-xl font-medium text-slate-300">
                {profile.tagline.split('Informatics').length > 1 ? (
                  <>A third-year <span className="font-bold text-white">Informatics</span> student at Multimedia Nusantara University.</>
                ) : (
                  profile.tagline
                )}
              </p>
              <p className="text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto md:mx-0">
                {profile.description.split('end-to-end digital solutions').length > 1 ? (
                  <>I build <span className={`font-medium ${sunset ? 'text-amber-300' : 'text-cyan-300'}`}>end-to-end digital solutions</span>, from 
                  Android applications and interactive web platforms to backend systems. 
                  Specialized in <span className={`font-medium ${sunset ? 'text-amber-300' : 'text-cyan-300'}`}>cross-platform development</span> with a 
                  user-centric design approach and <span className={`font-medium ${sunset ? 'text-amber-300' : 'text-cyan-300'}`}>security-first</span> mindset.</>
                ) : (
                  profile.description
                )}
              </p>
              <div className="min-h-[4.5rem] md:min-h-[4.5rem] min-h-[7rem] flex items-start">
                <p className="text-base text-slate-500 leading-relaxed max-w-2xl mx-auto md:mx-0">
                  Currently focused on continuous learning and practical implementation in{' '}
                  <TypeWriter 
                    text={profile.focusText.replace('Currently focused on continuous learning and practical implementation in ', '')}
                    speed={40}
                    delay={800}
                    loop={true}
                  />
                </p>
              </div>
              <div className="mt-2 flex items-center justify-center md:justify-start gap-3 text-slate-400">
                <div className="keyboard-anim" aria-hidden="true">
                  <svg viewBox="0 0 120 60" role="img" focusable="false">
                    <rect x="4" y="10" width="112" height="40" rx="8" className="kb-shell" />
                    <rect x="12" y="18" width="12" height="8" rx="2" className="kb-key kb-key-1" />
                    <rect x="28" y="18" width="12" height="8" rx="2" className="kb-key kb-key-2" />
                    <rect x="44" y="18" width="12" height="8" rx="2" className="kb-key kb-key-3" />
                    <rect x="60" y="18" width="12" height="8" rx="2" className="kb-key kb-key-4" />
                    <rect x="76" y="18" width="12" height="8" rx="2" className="kb-key kb-key-5" />
                    <rect x="92" y="18" width="12" height="8" rx="2" className="kb-key kb-key-6" />
                    <rect x="12" y="30" width="16" height="8" rx="2" className="kb-key kb-key-3" />
                    <rect x="32" y="30" width="16" height="8" rx="2" className="kb-key kb-key-1" />
                    <rect x="52" y="30" width="16" height="8" rx="2" className="kb-key kb-key-5" />
                    <rect x="72" y="30" width="16" height="8" rx="2" className="kb-key kb-key-2" />
                    <rect x="92" y="30" width="12" height="8" rx="2" className="kb-key kb-key-4" />
                    <rect x="28" y="42" width="64" height="6" rx="3" className="kb-key kb-space" />
                  </svg>
                </div>
                <div className="mouse-anim" aria-hidden="true">
                  <svg viewBox="0 0 36 54" role="img" focusable="false">
                    <rect x="6" y="4" width="24" height="46" rx="12" className="mouse-shell" />
                    <rect x="17" y="12" width="2" height="10" rx="1" className="mouse-wheel" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-6 justify-center md:justify-start">
               <a 
                 href={profile.githubUrl} 
                 target="_blank"
                 onClick={(e) => {
                   if (window.innerWidth < 768 && expandedSocial !== 'github') {
                     e.preventDefault();
                     e.stopPropagation();
                     setExpandedSocial('github');
                   }
                 }}
                 className={`group relative flex items-center gap-2 px-6 sm:px-8 py-3 rounded-full bg-slate-800 border border-slate-700 ${sunset ? 'hover:border-amber-400' : 'hover:border-cyan-400'} transition-all duration-300 overflow-hidden ${
                   expandedSocial === 'github' ? 'min-w-[180px]' : 'min-w-[72px]'
                 }`}
               >
                 <svg className="w-6 h-6 fill-current text-slate-400 group-hover:text-white transition flex-shrink-0" viewBox="0 0 24 24">
                   <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.896-.014 3.293 0 .319.22.694.825.576C20.566 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                 </svg>
                 <span className={`overflow-hidden whitespace-nowrap text-slate-400 group-hover:text-white font-medium transition-all duration-300 text-sm sm:text-base ${
                   expandedSocial === 'github' ? 'max-w-[100px]' : 'max-w-0 group-hover:max-w-[100px]'
                 }`}>
                   GitHub
                 </span>
               </a>
              
               <a 
                 href="#projects" 
                 className={`w-[180px] sm:w-[200px] py-3 text-white rounded-full font-bold transition shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base ${sunset ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-500/30' : 'bg-cyan-600 hover:bg-cyan-700 shadow-cyan-500/30'}`}
              >
                View My Works
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
              </a>

               <a 
                 href="#contact" 
                 className={`w-[180px] sm:w-[200px] py-3 border border-slate-600 rounded-full font-medium transition flex items-center justify-center gap-2 text-sm sm:text-base ${sunset ? 'hover:border-amber-400 hover:text-amber-400' : 'hover:border-cyan-400 hover:text-cyan-400'}`}
              >
                Contact Me
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
              </a>
            </div>
          </div>

          <div className="flex-1 flex justify-center relative group">
            <div className={`absolute inset-0 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition duration-500 ${sunset ? 'bg-amber-500' : 'bg-cyan-500'}`}></div>
            
            {ripples.map((rippleId) => (
              <div key={rippleId} className="absolute inset-0 flex items-center justify-center z-0">
                <div className={`absolute w-48 h-48 md:w-60 md:h-60 rounded-full border-4 animate-ripple ${sunset ? 'border-amber-400' : 'border-cyan-400'}`}></div>
                <div className={`absolute w-48 h-48 md:w-60 md:h-60 rounded-full border-4 animate-ripple ${sunset ? 'border-amber-400' : 'border-cyan-400'}`} style={{ animationDelay: '0.7s' }}></div>
                <div className={`absolute w-48 h-48 md:w-60 md:h-60 rounded-full border-4 animate-ripple ${sunset ? 'border-amber-400' : 'border-cyan-400'}`} style={{ animationDelay: '1.4s' }}></div>
              </div>
            ))}
            
            <div 
              className="relative w-48 h-48 md:w-60 md:h-60 rounded-full overflow-hidden border-4 border-slate-800 shadow-2xl z-10 cursor-pointer active:scale-95 transition-transform"
              onClick={() => {
                const rippleId = Date.now();
                setRipples(prev => [...prev, rippleId]);
                setTimeout(() => {
                  setRipples(prev => prev.filter(id => id !== rippleId));
                }, 2500);
              }}
            >
              <Image src={profile.profileImage} alt={profile.name} fill className="object-cover" priority />
            </div>
          </div>
        </div>
      </ScrollElement>
    </section>
  );
}
