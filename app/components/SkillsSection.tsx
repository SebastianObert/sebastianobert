"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import ScrollElement from "./ScrollElement";
import SkillBadge from "./SkillBadge";
import ConstellationBackground from "./ConstellationBackground";
import { api, Skill } from "../../lib/api";

export default function SkillsSection() {
  const [clickedSkill, setClickedSkill] = useState<string | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    api.getSkills().then(setSkills);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (clickedSkill && !target.closest("[data-skill-badge]")) {
        setClickedSkill(null);
      }
    };
    if (clickedSkill) {
      document.addEventListener("click", handleClickOutside);
      return () =>
        document.removeEventListener("click", handleClickOutside);
    }
  }, [clickedSkill]);

  const vignetteMask =
    "radial-gradient(ellipse 62% 62% at 50% 50%, black 19%, rgba(0,0,0,0.78) 42%, rgba(0,0,0,0.42) 58%, rgba(0,0,0,0.14) 75%, transparent 100%)";

  return (
    <section
      id="skills"
      className="relative z-10 overflow-hidden border-y border-slate-800 bg-slate-800/30 py-24"
    >
      <ConstellationBackground />
      <div className="container mx-auto px-6 relative z-10">
        {/* Title - centered */}
        <ScrollElement animation="fade-down" duration={0.7}>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Tech Stack</h2>
            <p className="text-slate-400">Tools and technologies I have used in various projects</p>
          </div>
        </ScrollElement>

        {/* Mobile: no image, centered badges (original) */}
        <div className="md:hidden">
          <ScrollElement animation="zoom-in" delay={0.2} duration={0.7}>
            <div className="grid grid-cols-2 gap-3 justify-items-center max-w-lg mx-auto">
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

        {/* Desktop: image left, content right */}
        <div className="hidden md:flex md:flex-row md:items-center -mt-36 relative z-0">
          <div className="w-[52%]">
            <div
              className="relative aspect-[4/3]"
              style={{
                WebkitMaskImage: vignetteMask,
                maskImage: vignetteMask,
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskSize: "100% 100%",
                maskSize: "100% 100%",
              }}
            >
              <Image
                src="/view1.jpeg"
                alt="Tech workspace"
                fill
                priority
                className="object-cover"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `
                    radial-gradient(ellipse 60% 60% at 50% 50%, transparent 26%, rgba(var(--bg-color-rgb),0.87) 100%),
                    radial-gradient(ellipse 110% 110% at 0% 0%, rgba(var(--bg-color-rgb),0.337) 0%, transparent 54%),
                    radial-gradient(ellipse 110% 110% at 100% 0%, rgba(var(--bg-color-rgb),0.337) 0%, transparent 54%),
                    radial-gradient(ellipse 110% 110% at 0% 100%, rgba(var(--bg-color-rgb),0.337) 0%, transparent 54%),
                    radial-gradient(ellipse 110% 110% at 100% 100%, rgba(var(--bg-color-rgb),0.337) 0%, transparent 54%),
                    linear-gradient(to bottom, rgba(var(--bg-color-rgb),0.86) 0%, transparent 34%),
                    linear-gradient(to top, rgba(var(--bg-color-rgb),0.86) 0%, transparent 34%),
                    linear-gradient(to right, rgba(var(--bg-color-rgb),0.38) 0%, transparent 22%),
                    linear-gradient(to left, rgba(var(--bg-color-rgb),0.38) 0%, transparent 22%)
                  `,
                }}
              />
            </div>
          </div>
          <div className="relative z-10 w-[56%] -ml-[8%]">
            <div className="pl-6">
              <ScrollElement animation="zoom-in" delay={0.2} duration={0.7}>
                <div className="flex flex-wrap gap-3">
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
          </div>
        </div>
      </div>
    </section>
  );
}
