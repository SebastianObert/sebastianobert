"use client";

import Image from "next/image";
import { useState } from "react"; // Import useState untuk menu HP
import Snowfall from "react-snowfall";

export default function Home() {
  // State untuk Mobile Menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
              Sebastian<span className="text-cyan-400">.dev</span>
            </h1>

            {/* DESKTOP MENU (Hidden di HP) */}
            <div className="hidden md:flex items-center gap-1 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <NavLink href="#about">About</NavLink>
              <NavLink href="#skills">Skills</NavLink>
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
              <MobileNavLink href="#skills" onClick={() => setIsMobileMenuOpen(false)}>Skills</MobileNavLink>
              <MobileNavLink href="#projects" onClick={() => setIsMobileMenuOpen(false)}>Projects</MobileNavLink>
              <MobileNavLink href="#organization" onClick={() => setIsMobileMenuOpen(false)}>Organization</MobileNavLink>
            </div>
          )}
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section id="about" className="container mx-auto px-6 pt-40 pb-20 relative z-10">
        <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-20">
          <div className="flex-1 text-center md:text-left space-y-6">
            <h2 className="text-cyan-400 font-medium text-lg tracking-wide">HELLO, FOLKS! 👋</h2>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Sebastian Obert</span>
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto md:mx-0">
            <b>an Informatics Engineering student passionate about Android apps, games, and modern web development</b>.
            </p>
            <div className="flex gap-6 mt-6 justify-center md:justify-start">
               {/* Github & LinkedIn Icons (Sama seperti sebelumnya) */}
               <a href="https://github.com/USERNAME_GITHUB_KAMU" target="_blank" className="text-slate-400 hover:text-white hover:scale-110 transition"><svg className="w-8 h-8 fill-current" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.896-.014 3.293 0 .319.22.694.825.576C20.566 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg></a>
               <a href="https://linkedin.com/in/USERNAME_LINKEDIN_KAMU" target="_blank" className="text-slate-400 hover:text-blue-500 hover:scale-110 transition"><svg className="w-8 h-8 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 21.227.792 22 1.771 22h20.451C23.2 22 24 21.227 24 20.271V1.729C24 .774 23.2 0 22.225 0z"/></svg></a>
            </div>
            <div className="flex gap-4 justify-center md:justify-start pt-6">
              <button className="px-8 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-full font-bold transition shadow-lg shadow-cyan-500/30">View My Works</button>
              <button className="px-8 py-3 border border-slate-600 hover:border-cyan-400 hover:text-cyan-400 rounded-full font-medium transition">Contact Me</button>
            </div>
          </div>
          <div className="flex-1 flex justify-center relative group">
            <div className="absolute inset-0 bg-cyan-500 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition duration-500"></div>
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-slate-800 shadow-2xl z-10">
              <Image src="/profil_sebas.jpg" alt="Sebastian Obert" fill className="object-cover" priority />
            </div>
          </div>
        </div>
      </section>

      {/* --- SKILLS SECTION --- */}
      <section id="skills" className="bg-slate-800/30 py-24 border-y border-slate-800 relative z-10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Tech Stack</h2>
            <p className="text-slate-400">Teknologi yang sering saya gunakan dalam berkarya</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
            <SkillBadge icon="https://cdn.simpleicons.org/kotlin/7F52FF" name="Kotlin" />
            <SkillBadge icon="https://cdn.simpleicons.org/android/3DDC84" name="Android" />
            <SkillBadge icon="https://cdn.simpleicons.org/unity/white" name="Unity" />
            <div className="skill-pill"><svg viewBox="0 0 128 128" className="w-6 h-6"><path fill="#9B4F96" d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64 64-28.7 64-64S99.3 0 64 0zm27.4 86.2h-7.3v8.3h-8.1v-8.3h-7.6v-8.1h7.6v-7.6h8.1v7.6h7.3v8.1zm-42.6 7c-13.8 0-21.6-9.6-21.6-26.6s7.8-26.6 21.6-26.6c6.8 0 12.1 2.3 15.6 6.3l-6.8 6.5c-2.3-2.3-5.3-3.8-8.6-3.8-8.1 0-11.9 6.3-11.9 17.6s3.8 17.6 11.9 17.6c3.5 0 6.3-1.5 8.8-4l6.8 6.3c-3.8 4.6-9.1 6.8-15.8 6.8zm42.6-25.1h-7.3v8.3h-8.1v-8.3h-7.6v-8.1h7.6v-7.6h8.1v7.6h7.3v8.1z"/></svg><span>C#</span></div>
            <SkillBadge icon="https://cdn.simpleicons.org/nextdotjs/white" name="Next.js" />
            <SkillBadge icon="https://cdn.simpleicons.org/react/61DAFB" name="React" />
            <SkillBadge icon="https://cdn.simpleicons.org/tailwindcss/06B6D4" name="Tailwind" />
            <SkillBadge icon="https://cdn.simpleicons.org/firebase/FFCA28" name="Firebase" />
            <SkillBadge icon="https://cdn.simpleicons.org/php/777BB4" name="PHP" />
            <SkillBadge icon="https://cdn.simpleicons.org/laravel/FF2D20" name="Laravel" />
            <SkillBadge icon="https://cdn.simpleicons.org/mysql/4479A1" name="MySQL" />
            <SkillBadge icon="https://cdn.simpleicons.org/python/3776AB" name="Python" />
            <SkillBadge icon="https://cdn.simpleicons.org/figma/F24E1E" name="Figma" />
            <SkillBadge icon="https://cdn.simpleicons.org/javascript/F7DF1E" name="JavaScript" />
          </div>
        </div>
      </section>

      {/* --- PROJECTS SECTION --- */}
      <section id="projects" className="container mx-auto px-6 py-24 relative z-10">
        <h2 className="text-3xl font-bold text-white mb-12">Featured Projects</h2>
        
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
                UI/UX Design untuk aplikasi darurat yang aksesibel. Dirancang dengan empati untuk situasi kritis.
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
                Game duel 1vs1 intens dengan mekanik pertahanan berbasis waktu.
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
                Sistem manajemen data jemaat yang efisien dan terstruktur.
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
                 src="/aircare.png" 
                 alt="AirCare App" 
                 fill 
                 className="object-cover group-hover:scale-105 transition duration-500"
               />
            </div>
            {/* Content */}
            <div className="p-8 md:w-1/2 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition">AirCare Mobile App</h3>
              <p className="text-slate-400 mb-6 text-sm leading-relaxed">
                Aplikasi monitoring kualitas udara realtime. Solusi cerdas untuk kesehatan lingkungan berbasis Android.
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
                        Platform web modern yang interaktif untuk informasi regional Jawa Timur. Dibangun dengan ekosistem React modern untuk performa tinggi.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <span className="badge bg-teal-900/30 text-teal-300">React.js</span>
                        <span className="badge bg-teal-900/30 text-teal-300">Tailwind CSS</span>
                        <span className="badge bg-teal-900/30 text-teal-300">Interactive</span>
                    </div>
                </div>
            </div>
          </a>

        </div>
      </section>

      {/* --- ORGANIZATION & EXPERIENCE --- */}
      <section id="organization" className="container mx-auto px-6 py-24 relative z-10 border-t border-slate-800/50">
        <div className="mb-12 text-center max-w-3xl mx-auto">
           <h2 className="text-3xl font-bold text-white mb-6">Organization & Experience</h2>
           <p className="text-slate-400 text-lg">Through the many organizations and events I've been a part of, I learned many new skills and got to know a lot of people.</p>
        </div>

        {/* LIST ORGANISASI */}
        <div className="space-y-6 max-w-4xl mx-auto mb-20">
           {/* Card KSPM */}
           <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-cyan-500 transition duration-300 flex flex-col md:flex-row gap-6">
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
                <p className="text-slate-400 leading-relaxed text-sm">Aktif berkontribusi dalam divisi edukasi internal. Bertanggung jawab dalam menyusun kurikulum pembelajaran pasar modal.</p>
              </div>
           </div>
           
           {/* Card COMMFEST */}
           <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-cyan-500 transition duration-300 flex flex-col md:flex-row gap-6">
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
                <p className="text-slate-400 leading-relaxed text-sm">Mengelola kebutuhan logistik dan perlengkapan acara untuk mendukung kelancaran festival.</p>
              </div>
           </div>

           {/* Card UMN Fest */}
           <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-cyan-500 transition duration-300 flex flex-col md:flex-row gap-6">
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
                <p className="text-slate-400 leading-relaxed text-sm">Menjadi sukarelawan dalam divisi lomba, membantu koordinasi peserta dan pengawasan kompetisi.</p>
              </div>
           </div>
        </div>

        {/* --- PHOTO GALLERY (MARQUEE) --- */}
        <div className="max-w-6xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">Documentation & Activities</h3>
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
        </div>
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