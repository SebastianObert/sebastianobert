"use client";

import { useState, useEffect } from "react";
import ScrollElement from "./ScrollElement";
import SkillBadge from "./SkillBadge";
import { api, Skill } from "../../lib/api";

export default function SkillsSection() {
  const [clickedSkill, setClickedSkill] = useState<string | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    api.getSkills().then(setSkills);
  }, []);

  return (
    <section id="skills" className="bg-slate-800/30 py-24 border-y border-slate-800 relative z-10">
      <div className="skills-clouds" aria-hidden="true">
        <div className="skills-cloud cloud-1">
          <svg viewBox="0 0 64 40" role="img" focusable="false">
            <path className="cloud-fill" d="M22 34h26a10 10 0 0 0 0-20c-.8 0-1.6.1-2.4.3A14 14 0 0 0 13 20a9 9 0 0 0 9 14z" />
            <path className="cloud-lightning" d="M30 26l-6 10h6l-2 8 8-12h-6l2-6z" />
          </svg>
        </div>
        <div className="skills-cloud cloud-2">
          <svg viewBox="0 0 64 40" role="img" focusable="false">
            <path className="cloud-fill" d="M20 34h28a9 9 0 0 0 0-18c-.9 0-1.8.1-2.6.4A12 12 0 0 0 16 22a8 8 0 0 0 4 12z" />
            <path className="cloud-lightning" d="M32 25l-5 9h5l-2 7 7-10h-5l2-6z" />
          </svg>
        </div>
        <div className="skills-cloud cloud-3">
          <svg viewBox="0 0 64 40" role="img" focusable="false">
            <path className="cloud-fill" d="M18 34h30a9 9 0 0 0 0-18c-1 0-2 .2-3 .5A13 13 0 0 0 14 22a8 8 0 0 0 4 12z" />
            <path className="cloud-lightning" d="M28 26l-6 10h6l-2 8 8-12h-6l2-6z" />
          </svg>
        </div>
        <div className="skills-cloud cloud-4 cloud-soft">
          <svg viewBox="0 0 64 40" role="img" focusable="false">
            <path className="cloud-fill-soft" d="M20 34h28a9 9 0 0 0 0-18c-1 0-2 .2-3 .5A12 12 0 0 0 16 22a8 8 0 0 0 4 12z" />
          </svg>
        </div>
        <div className="skills-cloud cloud-5 cloud-soft">
          <svg viewBox="0 0 64 40" role="img" focusable="false">
            <path className="cloud-fill-soft" d="M18 34h30a9 9 0 0 0 0-18c-1 0-2 .2-3 .5A13 13 0 0 0 14 22a8 8 0 0 0 4 12z" />
          </svg>
        </div>
        <div className="skills-cloud cloud-6 cloud-soft">
          <svg viewBox="0 0 64 40" role="img" focusable="false">
            <path className="cloud-fill-soft" d="M22 34h26a10 10 0 0 0 0-20c-.8 0-1.6.1-2.4.3A14 14 0 0 0 13 20a9 9 0 0 0 9 14z" />
          </svg>
        </div>
        <div className="skills-cloud cloud-7 cloud-soft">
          <svg viewBox="0 0 64 40" role="img" focusable="false">
            <path className="cloud-fill-soft" d="M21 34h27a9 9 0 0 0 0-18c-.9 0-1.8.1-2.6.4A12 12 0 0 0 16 22a8 8 0 0 0 5 12z" />
          </svg>
        </div>
      </div>
      <div className="skills-skyline skills-skyline-left" aria-hidden="true">
        <svg viewBox="0 0 420 220" role="img" focusable="false">
          <path className="skyline-fill" d="M8 210L8 70L60 70L60 40L110 40L110 22L150 22L150 80L210 80L210 48L250 48L250 90L300 90L300 30L340 30L340 210Z" />
          <path className="skyline-fill-secondary" d="M36 210L36 96L84 96L84 68L138 68L138 46L184 46L184 92L238 92L238 62L282 62L282 110L326 110L326 52L370 52L370 210Z" />
          <path className="skyline-side" d="M340 30L370 52L370 210L340 210Z" />
          <path className="skyline-side" d="M300 90L326 110L326 210L300 210Z" />
          <path className="skyline-side" d="M250 48L282 62L282 210L250 210Z" />
          <path className="skyline-side" d="M110 40L138 68L138 210L110 210Z" />
          <path className="skyline-roof" d="M110 40L138 68L150 68L122 40Z" />
          <path className="skyline-roof" d="M250 48L282 62L292 62L260 48Z" />
        </svg>
      </div>
      <div className="skills-skyline skills-skyline-right" aria-hidden="true">
        <svg viewBox="0 0 420 220" role="img" focusable="false">
          <path className="skyline-fill" d="M412 210L412 60L366 60L366 26L314 26L314 50L258 50L258 18L210 18L210 68L160 68L160 40L110 40L110 94L70 94L70 210Z" />
          <path className="skyline-fill-secondary" d="M384 210L384 86L340 86L340 46L280 46L280 26L226 26L226 78L170 78L170 50L120 50L120 112L80 112L80 210Z" />
          <path className="skyline-side" d="M314 26L340 46L340 210L314 210Z" />
          <path className="skyline-side" d="M258 50L280 46L280 210L258 210Z" />
          <path className="skyline-side" d="M160 68L170 78L170 210L160 210Z" />
          <path className="skyline-roof" d="M314 26L340 46L352 46L326 26Z" />
          <path className="skyline-roof" d="M210 18L226 26L240 26L224 18Z" />
        </svg>
      </div>
      <div className="container mx-auto px-6">
        <ScrollElement animation="fade-down" duration={0.7}>
          <div className="text-center mb-16 relative">
            <div className="skills-title-icons" aria-hidden="true">
              <span className="skills-icon">
                <svg viewBox="0 0 24 24" role="img" focusable="false">
                  <path d="M4 6h16M4 12h16M4 18h16" className="skills-icon-stroke" />
                  <circle cx="6" cy="6" r="1" className="skills-icon-dot" />
                </svg>
              </span>
              <span className="skills-icon">
                <svg viewBox="0 0 24 24" role="img" focusable="false">
                  <rect x="5" y="5" width="14" height="14" rx="2" className="skills-icon-stroke" />
                  <path d="M9 9h6v6H9z" className="skills-icon-fill" />
                </svg>
              </span>
              <span className="skills-icon">
                <svg viewBox="0 0 24 24" role="img" focusable="false">
                  <path d="M7 8l-3 4 3 4M17 8l3 4-3 4" className="skills-icon-stroke" />
                </svg>
              </span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Tech Stack</h2>
            <p className="text-slate-400">Tools and technologies I have used in various projects</p>
            <div className="skills-scanline" aria-hidden="true"></div>
          </div>
        </ScrollElement>
        
        <ScrollElement animation="zoom-in" delay={0.2} duration={0.7}>
          <div className="grid grid-cols-2 gap-3 md:flex md:flex-wrap md:justify-center md:gap-4 max-w-5xl mx-auto">
            {skills.map((skill) => (
              <SkillBadge 
                key={skill.name}
                icon={skill.icon} 
                name={skill.name} 
                category={skill.category} 
                clickedSkill={clickedSkill} 
                setClickedSkill={setClickedSkill} 
              />
            ))}
          </div>
        </ScrollElement>
      </div>
    </section>  
  );
}
