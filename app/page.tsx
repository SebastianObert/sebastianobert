"use client";

import Image from "next/image";
import { useState } from "react"; // Import useState untuk menu HP
import Snowfall from "react-snowfall";
import ScrollElement from "./components/ScrollElement";
import TypeWriter from "./components/TypeWriter";

export default function Home() {
  // State untuk Mobile Menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // State untuk expanded social button di mobile
  const [expandedSocial, setExpandedSocial] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-slate-900 text-slate-200 selection:bg-cyan-500 selection:text-white relative overflow-hidden">
      
      {/* --- EFEK SALJU (SNOW) --- */}
      <Snowfall 
        style={{ position: 'fixed', width: '100vw', height: '100vh', zIndex: 0 }}
        snowflakeCount={80}
        color="#ffffff"
        radius={[0.5, 2.5]} 
        speed={[0.5, 2.0]}
        wind={[-0.5, 1.0]}
        opacity={[0.3, 0.7]} 
      />

      {/* --- NAVBAR RESPONSIVE --- */}
      <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-md z-50 border-b border-slate-800 transition-all duration-300">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <h1 className="text-xl font-bold text-white tracking-tighter cursor-pointer z-50" onClick={() => window.scrollTo(0,0)}>
              So<span className="text-cyan-400">C</span>
            </h1>

            {/* DESKTOP MENU (Hidden di HP) */}
            <div className="hidden md:flex items-center gap-1 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <NavLink href="#about">About</NavLink>
              <NavLink href="#projects">Projects</NavLink>
              <NavLink href="#organization">Organization</NavLink>
            </div>

            {/* MOBILE MENU BUTTON (Hamburger) */}
            <button 
              className="md:hidden text-slate-300 focus:outline-none z-50"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                // Icon X (Close)
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                // Icon Hamburger (Menu)
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>

          {/* MOBILE MENU DROPDOWN */}
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 w-full bg-slate-900/95 border-b border-slate-800 p-4 flex flex-col items-center gap-4 shadow-2xl animate-fadeIn">
              <MobileNavLink href="#about" onClick={() => setIsMobileMenuOpen(false)}>About</MobileNavLink>
              <MobileNavLink href="#projects" onClick={() => setIsMobileMenuOpen(false)}>Projects</MobileNavLink>
              <MobileNavLink href="#organization" onClick={() => setIsMobileMenuOpen(false)}>Organization</MobileNavLink>
            </div>
          )}
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section id="about" className="container mx-auto px-6 pt-40 pb-20 relative z-10">
        <ScrollElement animation="slide-fade" duration={0.9}>
        <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-20">
          <div className="flex-1 text-center md:text-left space-y-6">
            <h2 className="text-cyan-400 font-medium text-lg tracking-wide">HELLO, FOLKS! 👋</h2>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Sebastian Obert</span>
            </h1>
            
            {/* 🎯 UPDATED SECTION - More Professional & Descriptive */}
            <div className="space-y-4">
              <p className="text-lg md:text-xl font-medium text-slate-300">
                A third-year <span className="font-bold text-white">Informatics</span> student at Multimedia Nusantara University.
              </p>
              <p className="text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto md:mx-0">
                I build <span className="text-cyan-300 font-medium">end-to-end digital solutions</span>, from 
                Android applications and interactive web platforms to backend systems. 
                Specialized in <span className="text-cyan-300 font-medium">cross-platform development</span> with a 
                user-centric design approach and <span className="text-cyan-300 font-medium">security-first</span> mindset.
              </p>
              <div className="min-h-[4.5rem] flex items-start">
                <p className="text-base text-slate-500 leading-relaxed max-w-2xl mx-auto md:mx-0">
                  <TypeWriter 
                    text="Currently exploring mobile development, game design, and cybersecurity while continuously learning new frameworks and best practices."
                    speed={30}
                    delay={800}
                    loop={true}
                  />
                </p>
              </div>
            </div>
            
            {/* --- SOCIAL LINKS & ACTION BUTTONS (Combined & Aligned) --- */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-6 justify-center md:justify-start">
               {/* Github Icon with Expandable Text */}
               <a 
                 href="https://github.com/SebastianObert" 
                 target="_blank"
                 onClick={(e) => {
                   if (window.innerWidth < 768 && expandedSocial !== 'github') {
                     e.preventDefault();
                     setExpandedSocial('github');
                   }
                 }}
                 className={`group relative flex items-center gap-2 px-6 sm:px-8 py-3 rounded-full bg-slate-800 border border-slate-700 hover:border-cyan-400 transition-all duration-300 overflow-hidden ${
                   expandedSocial === 'github' ? '' : ''
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
              
              {/* View My Works Button */}
              <a 
                href="#projects" 
                className="w-[180px] sm:w-[200px] py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-full font-bold transition shadow-lg shadow-cyan-500/30 flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                View My Works
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
              </a>

              {/* Contact Me Button */}
              <a 
                href="#contact" 
                className="w-[180px] sm:w-[200px] py-3 border border-slate-600 hover:border-cyan-400 hover:text-cyan-400 rounded-full font-medium transition flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                Contact Me
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
              </a>

            </div>
          </div>
          {/* Foto Profil */}
          <div className="flex-1 flex justify-center relative group">
            <div className="absolute inset-0 bg-cyan-500 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition duration-500"></div>
            
            {/*  
                w-48 h-48 (Mobile)
                md:w-60 md:h-60 (Desktop) 
            */}
            <div className="relative w-48 h-48 md:w-60 md:h-60 rounded-full overflow-hidden border-4 border-slate-800 shadow-2xl z-10">
              <Image src="/profil_sebas.jpg" alt="Sebastian Obert" fill className="object-cover" priority />
            </div>
          </div>
        </div>
        </ScrollElement>
      </section>

{/* --- SKILLS SECTION (Updated with Security Tools) --- */}
      <section id="skills" className="bg-slate-800/30 py-24 border-y border-slate-800 relative z-10">
        <div className="container mx-auto px-6">
          <ScrollElement animation="fade-down" duration={0.7}>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Tech Stack</h2>
            <p className="text-slate-400">Tools and technologies I have used in various projects</p>
          </div>
          </ScrollElement>
          
          <ScrollElement animation="zoom-in" delay={0.2} duration={0.7}>
          <div className="grid grid-cols-2 gap-3 md:flex md:flex-wrap md:justify-center md:gap-4 max-w-5xl mx-auto">
            
            {/* Mobile & Game */}
            <SkillBadge icon="https://cdn.simpleicons.org/kotlin/7F52FF" name="Kotlin" />
            <SkillBadge icon="https://cdn.simpleicons.org/android/3DDC84" name="Android" />
            <SkillBadge icon="https://cdn.simpleicons.org/unity/white" name="Unity" />
            <div className="skill-pill">
                <svg viewBox="0 0 128 128" className="w-6 h-6 flex-shrink-0"><path fill="#9B4F96" d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64 64-28.7 64-64S99.3 0 64 0zm27.4 86.2h-7.3v8.3h-8.1v-8.3h-7.6v-8.1h7.6v-7.6h8.1v7.6h7.3v8.1zm-42.6 7c-13.8 0-21.6-9.6-21.6-26.6s7.8-26.6 21.6-26.6c6.8 0 12.1 2.3 15.6 6.3l-6.8 6.5c-2.3-2.3-5.3-3.8-8.6-3.8-8.1 0-11.9 6.3-11.9 17.6s3.8 17.6 11.9 17.6c3.5 0 6.3-1.5 8.8-4l6.8 6.3c-3.8 4.6-9.1 6.8-15.8 6.8zm42.6-25.1h-7.3v8.3h-8.1v-8.3h-7.6v-8.1h7.6v-7.6h8.1v7.6h7.3v8.1z"/></svg>
                <span>C#</span>
            </div>

            {/* Web Frontend */}
            <SkillBadge icon="https://cdn.simpleicons.org/nextdotjs/white" name="Next.js" />
            <SkillBadge icon="https://cdn.simpleicons.org/react/61DAFB" name="React" />
            <SkillBadge icon="https://cdn.simpleicons.org/typescript/3178C6" name="TypeScript" />
            <SkillBadge icon="https://cdn.simpleicons.org/javascript/F7DF1E" name="JavaScript" />
            <SkillBadge icon="https://cdn.simpleicons.org/tailwindcss/06B6D4" name="Tailwind" />
            
            {/* Backend & DB */}
            <SkillBadge icon="https://cdn.simpleicons.org/firebase/FFCA28" name="Firebase" />
            <SkillBadge icon="https://cdn.simpleicons.org/php/777BB4" name="PHP" />
            <SkillBadge icon="https://cdn.simpleicons.org/laravel/FF2D20" name="Laravel" />
            <SkillBadge icon="https://cdn.simpleicons.org/mysql/4479A1" name="MySQL" />
            
            {/* Data & Design */}
            <SkillBadge icon="https://cdn.simpleicons.org/python/3776AB" name="Python" />
            <SkillBadge icon="/rstudio.webp" name="RStudio" /> 
            <SkillBadge icon="/tableau.jpg" name="Tableau" />
            <SkillBadge icon="https://cdn.simpleicons.org/figma/F24E1E" name="Figma" />
            
            {/* Infrastructure & Security */}
            <SkillBadge icon="https://cdn.simpleicons.org/linux/FCC624" name="Linux" />
            <SkillBadge icon="https://cdn.simpleicons.org/kalilinux/557C94" name="Kali Linux" /> 
            <SkillBadge icon="https://cdn.simpleicons.org/snort/EC1C24" name="Snort" /> 
            <SkillBadge icon="https://cdn.simpleicons.org/vmware/white" name="VMware" />

          </div>
          </ScrollElement>
        </div>
      </section>  

      {/* --- PROJECTS SECTION --- */}
      <section id="projects" className="container mx-auto px-6 py-24 relative z-10">
        <ScrollElement animation="glitch" duration={0.7}>
        <h2 className="text-3xl font-bold text-white mb-12">Featured Projects</h2>
        </ScrollElement>
        
        <ScrollElement animation="scale-blur" delay={0} duration={0.7} triggerMargin="0px 0px 100px 0px">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* 1. AEGIS CALL (Wide Card - Span 2) */}
          <a 
            href="https://www.figma.com/proto/qLd5xU8g1rZm0nehm53wqV/UAS-HCI?node-id=605-4407&t=ZrwxJHFBdqvFLnBZ-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=52%3A363" // GANTI LINK INI
            target="_blank" 
            rel="noopener noreferrer"
            className="group md:col-span-2 bg-slate-800 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-orange-500/10 transition duration-300 border border-slate-700 flex flex-col md:flex-row cursor-pointer"
          >
            {/* Image Container */}
            <div className="md:w-1/2 h-64 md:h-auto relative overflow-hidden">
               <Image 
                 src="/aegis.png" 
                 alt="Aegis Call UI" 
                 fill 
                 className="object-cover group-hover:scale-105 transition duration-500"
               />
            </div>
            {/* Content */}
            <div className="p-8 md:w-1/2 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-orange-400 transition">Aegis Call</h3>
              <p className="text-slate-400 mb-6 text-sm leading-relaxed">
                Aegis Call is an integrated emergency response application prototype designed using a User-Centered Design approach to ensure ease of use, speed, and clarity in critical situations. The application consolidates multiple emergency services into a single platform, featuring direct emergency calls, media-based incident reporting, and real-time assistance tracking. With a strong focus on usability, accessibility, and user experience under extreme conditions, Aegis Call aims to reduce user panic and enable faster, more accurate, and well-coordinated emergency responses.
              </p>
               <div className="flex flex-wrap gap-2">
                 <span className="badge bg-orange-900/30 text-orange-300">Figma</span>
                 <span className="badge bg-orange-900/30 text-orange-300">UI/UX</span>
              </div>
            </div>
          </a>

          {/* 2. JEBS (Narrow Card - Span 1) */}
          <a 
            href="https://drive.google.com/drive/folders/1A8fhJf-ewu6nw2PLgsoxEmFnadou6D0v" // GANTI LINK INI
            target="_blank" 
            rel="noopener noreferrer"
            className="group md:col-span-1 bg-slate-800 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-purple-500/10 transition duration-300 border border-slate-700 flex flex-col cursor-pointer"
          >
            {/* Image Container */}
            <div className="h-56 relative overflow-hidden">
               <Image 
                 src="/jebs.png" 
                 alt="JEBS Game" 
                 fill 
                 className="object-cover group-hover:scale-105 transition duration-500"
               />
            </div>
            {/* Content */}
            <div className="p-6 flex-1">
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition">JEBS</h3>
              <p className="text-slate-400 text-sm mb-4">
                JEBS is a third-person Action-RPG combat prototype that successfully delivers an intense, skill-based sword-fighting experience. The game emphasizes timing, precision, and mastery of defensive mechanics, particularly parry and posture management—over traditional health-based combat.
              </p>
               <div className="flex flex-wrap gap-2 mt-auto">
                 <span className="badge bg-purple-900/30 text-purple-300">Unity</span>
                 <span className="badge bg-purple-900/30 text-purple-300">C#</span>
              </div>
            </div>
          </a>

          {/* 3. GROW COMMUNITY (Narrow Card - Span 1) */}
          <a 
            href="https://children.growcommunity.church/" // GANTI LINK INI
            target="_blank" 
            rel="noopener noreferrer"
            className="group md:col-span-1 bg-slate-800 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-500/10 transition duration-300 border border-slate-700 flex flex-col cursor-pointer"
          >
            {/* Image Container */}
            <div className="h-56 relative overflow-hidden">
               <Image 
                 src="/grow_church.png" 
                 alt="Grow Community" 
                 fill 
                 className="object-cover group-hover:scale-105 transition duration-500"
               />
            </div>
            {/* Content */}
            <div className="p-6 flex-1">
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition">Grow Community</h3>
              <p className="text-slate-400 text-sm mb-4">
                This application provides an integrated, secure, and efficient solution for managing children’s check-in and check-out activities in a church environment. By replacing manual processes with a centralized web-based system, it improves accuracy, enhances child safety through identity verification, and enables real-time attendance monitoring. The system streamlines operations for administrators and staff while offering transparency and peace of mind for parents, ultimately supporting a more organized, reliable, and trustworthy church activity management experience.
              </p>
               <div className="flex flex-wrap gap-2 mt-auto">
                 <span className="badge bg-blue-900/30 text-blue-300">PHP</span>
                 <span className="badge bg-blue-900/30 text-blue-300">MySQL</span>
              </div>
            </div>
          </a>

          {/* 4. AIRCARE (Wide Card - Span 2) */}
          <a 
            href="https://github.com/SebastianObert/AirCare" // GANTI LINK INI
            target="_blank" 
            rel="noopener noreferrer"
            className="group md:col-span-2 bg-slate-800 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-cyan-500/10 transition duration-300 border border-slate-700 flex flex-col md:flex-row-reverse cursor-pointer"
          >
            {/* Image Container */}
            <div className="md:w-1/2 h-64 md:h-auto relative overflow-hidden">
               <Image 
                 src="/aircare_mobile.png" 
                 alt="AirCare App" 
                 fill 
                 className="object-cover group-hover:scale-105 transition duration-500"
               />
            </div>
            {/* Content */}
            <div className="p-8 md:w-1/2 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition">AirCare Mobile App</h3>
              <p className="text-slate-400 mb-6 text-sm leading-relaxed">
                AirCare is a mobile application designed to help users monitor and understand air quality around them in real time, with the main goal of supporting healthier daily decisions. By providing accurate AQI data based on the user’s location, storing air quality history, delivering smart notifications during hazardous conditions, and offering health recommendations, AirCare aims to increase environmental awareness and reduce health risks caused by air pollution. The application focuses on personal tracking, accessibility, and clarity, making air quality information easy to interpret and practically useful for everyday activities, especially for users living in urban environments.
              </p>
               <div className="flex flex-wrap gap-2">
                 <span className="badge">Kotlin</span>
                 <span className="badge">Firebase</span>
              </div>
            </div>
          </a>

          {/* 5. AL-JATIM (Full Width - Span 3) */}
          <a 
            href="https://all-jatim.vercel.app/" // GANTI LINK INI
            target="_blank" 
            rel="noopener noreferrer"
            className="group md:col-span-3 bg-slate-800 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-teal-500/10 transition duration-300 border border-slate-700 relative cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-teal-900/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
            <div className="flex flex-col md:flex-row">
                {/* Image Container */}
                <div className="md:w-2/5 h-64 md:h-auto relative overflow-hidden">
                    <Image 
                      src="/aljatim.png" 
                      alt="Al-Jatim Web Platform" 
                      fill 
                      className="object-cover group-hover:scale-105 transition duration-500"
                    />
                </div>
                {/* Content */}
                <div className="p-8 md:w-3/5 relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-teal-400 transition">Al-Jatim Web Platform</h3>
                    <p className="text-slate-400 mb-6 leading-relaxed">
                       Al-Jatim is a web-based application designed to introduce and showcase East Java (Jawa Timur) through an informative and visually engaging digital platform. The main goal of this website is to provide users with clear and structured information about East Java’s geography, tourist destinations, cultural heritage, traditional cuisine, and iconic symbols in one accessible place. Built using React.js, the application aims to promote regional knowledge and cultural appreciation while delivering a modern, interactive, and user-friendly browsing experience.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <span className="badge bg-teal-900/30 text-teal-300">React.js</span>
                        <span className="badge bg-teal-900/30 text-teal-300">Tailwind CSS</span>
                        <span className="badge bg-teal-900/30 text-teal-300">Interactive</span>
                    </div>
                </div>
            </div>
          </a>
         {/* 6. PROJECT: SNORT IDS */}
          <div 
            className="group md:col-span-3 bg-slate-800 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-red-500/10 transition duration-300 border border-slate-700 relative"
          >
            {/* Background Gradient Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 z-10 pointer-events-none"></div>
            
            <div className="flex flex-col md:flex-row">
                {/* VIDEO CONTAINER */}
                <div className="md:w-2/5 h-auto min-h-[300px] relative bg-black z-20">
                    <video 
                      controls // <--- INI KUNCINYA: Memunculkan tombol play/pause/durasi
                      className="w-full h-full object-cover"
                    >
                      {/* Pastikan file video ada di folder public */}
                      <source src="/snort_demo.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                </div>

                {/* Content */}
                <div className="p-8 md:w-3/5 relative z-20 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                        <h3 className="text-2xl font-bold text-white group-hover:text-red-400 transition">SSH Brute Force Detection</h3>
                    </div>
                    
                    <p className="text-slate-400 mb-6 leading-relaxed text-sm">
                        An experimental cybersecurity project analyzing the effectiveness of Snort IDS in detecting SSH brute force attacks within a controlled local network. The simulation involved using Hydra on Kali Linux to attack an Ubuntu Server, utilizing custom Snort rules to identify and alert on suspicious login patterns in real-time.
                    </p>
                    
                    <div className="flex flex-wrap gap-3">
                        <span className="badge bg-red-900/30 text-red-300">Snort IDS</span>
                        <span className="badge bg-red-900/30 text-red-300">Kali Linux</span>
                        <span className="badge bg-red-900/30 text-red-300">Cybersecurity</span>
                    </div>
                </div>
            </div>
          </div>

        </div>
        </ScrollElement>
      </section>

      {/* --- ORGANIZATION & EXPERIENCE --- */}
      <section id="organization" className="container mx-auto px-6 py-8 relative z-10 border-t border-slate-800/50">
        <ScrollElement animation="parallax" duration={0.8}>
        <div className="mb-12 text-center max-w-3xl mx-auto">
           <h2 className="text-3xl font-bold text-white mb-6">Organization & Experience</h2>
           <p className="text-slate-400 text-lg">Through the many organizations and events I've been a part of, I learned many new skills and got to know a lot of people.</p>
        </div>
        </ScrollElement>

        {/* LIST ORGANISASI */}
        <ScrollElement animation="slide-fade" delay={0.2} duration={0.8}>
        <div className="space-y-6 max-w-4xl mx-auto mb-20">
           {/* Card KSPM */}
           <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-cyan-500 hover:scale-105 transition-all duration-300 flex flex-col md:flex-row gap-6 cursor-pointer">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center overflow-hidden border-2 border-slate-600">
                   <Image src="/kspm.jpg" alt="Logo KSPM" width={64} height={64} className="object-cover" /> 
                </div>
              </div>
              <div className="flex-1">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
                   <div><h3 className="text-xl font-bold text-white">KSPM UMN</h3><p className="text-cyan-400 font-medium">Member of Internal Education</p></div>
                   <div className="text-slate-400 text-sm mt-2 md:mt-0 font-mono bg-slate-900/50 px-3 py-1 rounded-lg border border-slate-700">Apr 2025 - Present</div>
                </div>
                <p className="text-slate-400 leading-relaxed text-sm">Developed weekly investment-related educational content and delivered capital market presentations while simplifying complex financial concepts into practical insights for members.</p>
              </div>
           </div>
           
           {/* Card COMMFEST */}
           <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-cyan-500 hover:scale-105 transition-all duration-300 flex flex-col md:flex-row gap-6 cursor-pointer">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center overflow-hidden border-2 border-slate-600">
                   <Image src="/commfest.jpg" alt="Logo COMMFEST" width={64} height={64} className="object-cover" /> 
                </div>
              </div>
              <div className="flex-1">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
                   <div><h3 className="text-xl font-bold text-white">COMMFEST UMN</h3><p className="text-cyan-400 font-medium">Member of Hansel (Equipment)</p></div>
                   <div className="text-slate-400 text-sm mt-2 md:mt-0 font-mono bg-slate-900/50 px-3 py-1 rounded-lg border border-slate-700">Mar 2025 - Nov 2025</div>
                </div>
                <p className="text-slate-400 leading-relaxed text-sm">Managed event equipment and logistics to support operational needs and ensure the smooth execution of the festival.</p>
              </div>
           </div>

           {/* Card UMN Fest */}
           <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-cyan-500 hover:scale-105 transition-all duration-300 flex flex-col md:flex-row gap-6 cursor-pointer">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center overflow-hidden border-2 border-slate-600">
                   <Image src="/ufest.jpg" alt="Logo UMN Fest" width={64} height={64} className="object-cover" /> 
                </div>
              </div>
              <div className="flex-1">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
                   <div><h3 className="text-xl font-bold text-white">UMN Festival 2024</h3><p className="text-cyan-400 font-medium">Volunteer of Milan (Competition)</p></div>
                   <div className="text-slate-400 text-sm mt-2 md:mt-0 font-mono bg-slate-900/50 px-3 py-1 rounded-lg border border-slate-700">Oct 2024 - Dec 2024</div>
                </div>
                <p className="text-slate-400 leading-relaxed text-sm">Supported sports competition operations by assisting with match administration and on-field coordination.</p>
              </div>
           </div>
        </div>
        </ScrollElement>
      </section>

      {/* --- ORGANIZATION & EXPERIENCE SECTION CONTINUED --- */}
      <section id="organization-continued" className="container mx-auto px-6 pt-12 pb-12 relative z-10 border-t border-slate-800">
        {/* --- PHOTO GALLERY (MARQUEE) --- */}
        <div className="max-w-6xl mx-auto">
            <ScrollElement animation="glitch" duration={0.6}>
            <h3 className="text-2xl font-bold text-white mb-8 text-center">Documentation & Activities</h3>
            </ScrollElement>
            <ScrollElement animation="parallax" delay={0.2} duration={0.8}>
            <div className="flex overflow-hidden w-full relative group">
                <div className="flex gap-6 animate-scroll group-hover:pause-on-hover w-max">
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="flex gap-6">
                      <div className="w-72 h-48 relative rounded-xl overflow-hidden border-2 border-slate-700"><Image src="/spm.jpg" alt="Event 1" fill className="object-cover hover:scale-110 transition duration-500" /><div className="absolute bottom-0 w-full bg-black/60 p-2 text-xs text-center text-white">Sekolah Pasar Modal</div></div>
                      <div className="w-72 h-48 relative rounded-xl overflow-hidden border-2 border-slate-700"><Image src="/closingcommfest.jpg" alt="Event 2" fill className="object-cover hover:scale-110 transition duration-500" /><div className="absolute bottom-0 w-full bg-black/60 p-2 text-xs text-center text-white">COMMFEST 2025</div></div>
                      <div className="w-72 h-48 relative rounded-xl overflow-hidden border-2 border-slate-700"><Image src="/ufestt.jpg" alt="Event 3" fill className="object-cover hover:scale-110 transition duration-500" /><div className="absolute bottom-0 w-full bg-black/60 p-2 text-xs text-center text-white">UMN Festival 2024</div></div>
                      <div className="w-72 h-48 relative rounded-xl overflow-hidden border-2 border-slate-700"><Image src="/state.jpg" alt="Event 4" fill className="object-cover hover:scale-110 transition duration-500" /><div className="absolute bottom-0 w-full bg-black/60 p-2 text-xs text-center text-white">STATE KSPM</div></div>
                      <div className="w-72 h-48 relative rounded-xl overflow-hidden border-2 border-slate-700"><Image src="/pkm.jpg" alt="Event 4" fill className="object-cover hover:scale-110 transition duration-500" /><div className="absolute bottom-0 w-full bg-black/60 p-2 text-xs text-center text-white">PKM</div></div>
                    </div>
                  ))}
                </div>
                <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none"></div>
                <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none"></div>
            </div>
            </ScrollElement>
        </div>
      </section>
      
      {/* --- CONTACT SECTION (NEW) --- */}
      <section id="contact" className="container mx-auto px-6 pt-24 pb-12 relative z-10 border-t border-slate-800/50">
        <ScrollElement animation="scale-blur" duration={0.9}>
        <div className="text-center max-w-2xl mx-auto">
           <h2 className="text-3xl font-bold text-white mb-6">Let's Connect</h2>
           <p className="text-slate-400 mb-8">
             Interested in collaborating or just want to say hello? Feel free to reach out to me through the platforms below.
           </p>

           {/* Social Media Links */}
           <div className="flex flex-wrap justify-center gap-6">
              
              {/* 1. INSTAGRAM */}
              <a 
                href="https://instagram.com/sebasobet" 
                target="_blank" 
                onClick={(e) => {
                  if (window.innerWidth < 768 && expandedSocial !== 'instagram') {
                    e.preventDefault();
                    setExpandedSocial('instagram');
                  }
                }}
                className={`group relative flex items-center justify-center py-2.5 rounded-full bg-slate-800 border border-slate-700 hover:border-pink-500 hover:shadow-lg hover:shadow-pink-500/20 transition-all duration-300 overflow-hidden ${
                  expandedSocial === 'instagram' ? 'w-[130px]' : 'w-[50px] hover:w-[130px]'
                }`}
              >
                <div className={`absolute left-1/2 -translate-x-1/2 transition-all duration-300 ${
                  expandedSocial === 'instagram' ? 'left-4 translate-x-0' : 'group-hover:left-4 group-hover:translate-x-0'
                }`}>
                  <img src="https://cdn.simpleicons.org/instagram/E4405F" alt="Instagram" className="w-6 h-6" />
                </div>
                <span className={`ml-auto pr-4 whitespace-nowrap text-slate-400 group-hover:text-pink-400 font-medium transition-all duration-300 text-sm ${
                  expandedSocial === 'instagram' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                }`}>
                  Instagram
                </span>
              </a>

              {/* 2. WHATSAPP */}
              <a 
                href="https://wa.me/6281314412184"
                target="_blank" 
                onClick={(e) => {
                  if (window.innerWidth < 768 && expandedSocial !== 'whatsapp') {
                    e.preventDefault();
                    setExpandedSocial('whatsapp');
                  }
                }}
                className={`group relative flex items-center justify-center py-2.5 rounded-full bg-slate-800 border border-slate-700 hover:border-green-500 hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300 overflow-hidden ${
                  expandedSocial === 'whatsapp' ? 'w-[135px]' : 'w-[50px] hover:w-[135px]'
                }`}
              >
                <div className={`absolute left-1/2 -translate-x-1/2 transition-all duration-300 ${
                  expandedSocial === 'whatsapp' ? 'left-4 translate-x-0' : 'group-hover:left-4 group-hover:translate-x-0'
                }`}>
                  <img src="https://cdn.simpleicons.org/whatsapp/25D366" alt="WhatsApp" className="w-6 h-6" />
                </div>
                <span className={`ml-auto pr-4 whitespace-nowrap text-slate-400 group-hover:text-green-400 font-medium transition-all duration-300 text-sm ${
                  expandedSocial === 'whatsapp' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                }`}>
                  WhatsApp
                </span>
              </a>

              {/* 3. LINE */}
              <a 
                href="https://line.me/ti/p/~sebastianobert" 
                target="_blank" 
                onClick={(e) => {
                  if (window.innerWidth < 768 && expandedSocial !== 'line') {
                    e.preventDefault();
                    setExpandedSocial('line');
                  }
                }}
                className={`group relative flex items-center justify-center py-2.5 rounded-full bg-slate-800 border border-slate-700 hover:border-green-400 hover:shadow-lg hover:shadow-green-400/20 transition-all duration-300 overflow-hidden ${
                  expandedSocial === 'line' ? 'w-[95px]' : 'w-[50px] hover:w-[95px]'
                }`}
              >
                <div className={`absolute left-1/2 -translate-x-1/2 transition-all duration-300 ${
                  expandedSocial === 'line' ? 'left-4 translate-x-0' : 'group-hover:left-4 group-hover:translate-x-0'
                }`}>
                  <img src="https://cdn.simpleicons.org/line/00C300" alt="LINE" className="w-6 h-6" />
                </div>
                <span className={`ml-auto pr-4 whitespace-nowrap text-slate-400 group-hover:text-green-300 font-medium transition-all duration-300 text-sm ${
                  expandedSocial === 'line' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                }`}>
                  LINE
                </span>
              </a>

              {/* 4. LINKEDIN */}
              <a 
                href="https://www.linkedin.com/in/sebastian-obert-cen/" 
                target="_blank" 
                onClick={(e) => {
                  if (window.innerWidth < 768 && expandedSocial !== 'linkedin') {
                    e.preventDefault();
                    setExpandedSocial('linkedin');
                  }
                }}
                className={`group relative flex items-center justify-center py-2.5 rounded-full bg-slate-800 border border-slate-700 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 overflow-hidden ${
                  expandedSocial === 'linkedin' ? 'w-[120px]' : 'w-[50px] hover:w-[120px]'
                }`}
              >
                <div className={`absolute left-1/2 -translate-x-1/2 transition-all duration-300 ${
                  expandedSocial === 'linkedin' ? 'left-4 translate-x-0' : 'group-hover:left-4 group-hover:translate-x-0'
                }`}>
                  <svg 
                    role="img" 
                    viewBox="0 0 24 24" 
                    className="w-6 h-6 fill-[#0A66C2]" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 21.227.792 22 1.771 22h20.451C23.2 22 24 21.227 24 20.271V1.729C24 .774 23.2 0 22.225 0z"/>
                  </svg>
                </div>
                <span className={`ml-auto pr-4 whitespace-nowrap text-slate-400 group-hover:text-blue-400 font-medium transition-all duration-300 text-sm ${
                  expandedSocial === 'linkedin' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                }`}>
                  LinkedIn
                </span>
              </a>

           </div>
        </div>
        </ScrollElement>
      </section>
      
      {/* --- FOOTER --- */}
      <footer className="bg-slate-950 py-12 border-t border-slate-900 text-center relative z-10">
        {/* Motto */}
        <p className="text-slate-300 font-medium text-lg mb-4 tracking-wide italic">
          "In Progress, Always."
        </p>
        
        {/* Copyright */}
        <p className="text-slate-600 text-sm">
        </p>
      </footer>
    </main>
  );
}

// --- HELPER COMPONENTS ---
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="px-4 py-2 rounded-full text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-all duration-300">
      {children}
    </a>
  );
}

function MobileNavLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <a 
      href={href} 
      onClick={onClick}
      className="w-full text-center py-3 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
    >
      {children}
    </a>
  );
}

function SkillBadge({ icon, name }: { icon: string; name: string }) {
  return (
    <div className="skill-pill">
      <img src={icon} alt={name} className="w-6 h-6" />
      <span>{name}</span>
    </div>
  );
}