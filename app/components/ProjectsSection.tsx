"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import ScrollElement from "./ScrollElement";
import { api, Project } from "../../lib/api";

interface ProjectsSectionProps {
  setSelectedImage: (image: { src: string; alt: string } | null) => void;
}

const ACCENT_MAP: Record<string, { hover: string; gradient: string; badge: string; badgeText: string; btn: string }> = {
  orange: { hover: "group-hover:text-orange-400", gradient: "from-orange-900/20 to-transparent", badge: "bg-orange-900/30 text-orange-300", badgeText: "text-orange-400", btn: "bg-orange-600 hover:bg-orange-700" },
  purple: { hover: "group-hover:text-purple-400", gradient: "from-purple-900/20 to-transparent", badge: "bg-purple-900/30 text-purple-300", badgeText: "text-purple-400", btn: "bg-purple-600 hover:bg-purple-700" },
  blue: { hover: "group-hover:text-blue-400", gradient: "from-blue-900/20 to-transparent", badge: "bg-blue-900/30 text-blue-300", badgeText: "text-blue-400", btn: "bg-blue-600 hover:bg-blue-700" },
  cyan: { hover: "group-hover:text-cyan-400", gradient: "from-cyan-900/20 to-transparent", badge: "", badgeText: "text-cyan-400", btn: "bg-cyan-600 hover:bg-cyan-700" },
  teal: { hover: "group-hover:text-teal-400", gradient: "from-teal-900/20 to-transparent", badge: "bg-teal-900/30 text-teal-300", badgeText: "text-teal-400", btn: "bg-teal-600 hover:bg-teal-700" },
  pink: { hover: "group-hover:text-pink-300", gradient: "from-pink-700/20 to-transparent", badge: "bg-pink-800/30 text-pink-200", badgeText: "text-pink-400", btn: "bg-pink-500 hover:bg-pink-600" },
  emerald: { hover: "group-hover:text-emerald-400", gradient: "from-emerald-900/20 to-transparent", badge: "bg-emerald-900/30 text-emerald-300", badgeText: "text-emerald-400", btn: "bg-emerald-600 hover:bg-emerald-700" },
  red: { hover: "group-hover:text-red-400", gradient: "from-red-900/20 to-transparent", badge: "bg-red-900/30 text-red-300", badgeText: "text-red-400", btn: "bg-red-600 hover:bg-red-700" },
};

const HOVER_SHADOW: Record<string, string> = {
  orange: "hover:shadow-orange-500/10", purple: "hover:shadow-purple-500/10", blue: "hover:shadow-blue-500/10",
  cyan: "hover:shadow-cyan-500/10", teal: "hover:shadow-teal-500/10", pink: "hover:shadow-pink-400/10",
  emerald: "hover:shadow-emerald-500/10", red: "hover:shadow-red-500/10",
};

function getPreview(text: string) {
  if (!text) return '';
  const firstPeriod = text.indexOf('.');
  if (firstPeriod !== -1 && firstPeriod < 120) return text.slice(0, firstPeriod + 1);
  const words = text.split(/\s+/).slice(0, 18).join(' ');
  return words + (words.length < text.length ? '...' : '');
}

function ProjectCard({ project, expandedProject, setExpandedProject, setSelectedImage }: {
  project: Project; expandedProject: string | null;
  setExpandedProject: (s: string | null) => void;
  setSelectedImage: (i: { src: string; alt: string } | null) => void;
}) {
  const a = ACCENT_MAP[project.accentColor] || ACCENT_MAP.cyan;
  const shadow = HOVER_SHADOW[project.accentColor] || "";
  const isExpanded = expandedProject === project.slug;
  const colSpan = project.gridSpan || "md:col-span-3";
  const isRow = project.layoutDirection === "flex-row" || project.layoutDirection === "flex-row-reverse";

  const imageBlock = project.image && (
    <div
      className={isRow ? "md:w-1/2 h-64 md:h-auto relative overflow-hidden cursor-pointer z-20" : "h-48 md:h-56 relative bg-black z-20 -mx-[1px] -mt-[1px]"}
      onClick={project.hasImageClick ? () => setSelectedImage({ src: project.image!, alt: project.imageAlt || project.name }) : undefined}
    >
      <Image src={project.image} alt={project.imageAlt || project.name} fill className={`object-cover group-hover:scale-105 transition duration-500 ${!isRow ? "rounded-t-2xl" : ""}`} />
    </div>
  );

  const videoBlock = project.videoSrc && (
    <div className={isRow ? "md:w-2/5 w-full h-64 md:h-auto md:min-h-[300px] relative bg-black z-20" : "h-48 md:h-56 relative bg-black z-20 -mx-[1px] -mt-[1px]"}>
      <video controls preload="metadata" playsInline poster={project.videoPoster || undefined}
        onEnded={(e) => { e.currentTarget.currentTime = 0; e.currentTarget.load(); }}
        className={`w-full h-full ${isRow ? "object-contain" : "object-cover rounded-t-2xl"}`}>
        <source src={project.videoSrc} type="video/mp4" />
      </video>
    </div>
  );

  const contentBlock = (
    <div className={`${isRow ? `p-8 ${project.layoutDirection === "flex-row-reverse" ? "md:w-1/2" : "md:w-1/2"} flex flex-col justify-center` : "p-6 flex-1 flex flex-col"} relative z-20`}>
      <h3 className={`${isRow ? "text-2xl" : "text-xl"} font-bold text-white mb-3 ${a.hover} transition`}>{project.name}</h3>
      {!isRow && (
        <>
          <p className="text-slate-400 mb-2 text-sm leading-relaxed md:hidden">
            {isExpanded ? '' : getPreview(project.description)}
          </p>
          <div className={`collapsible md:block ${isExpanded ? 'open' : ''}`}>
            <p className="text-slate-400 text-sm mb-4">{project.description}</p>
          </div>
          <button onClick={() => setExpandedProject(isExpanded ? null : project.slug)} className={`md:hidden ${a.badgeText} text-xs mb-4 text-left hover:underline`}>
            {isExpanded ? 'Show less' : 'Read more'}
          </button>
        </>
      )}
      {isRow && (
        <p className={`text-slate-400 ${isRow ? "mb-6" : "mb-4"} text-sm leading-relaxed`}>{project.description}</p>
      )}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map((tag) => (
          <span key={tag} className={`badge ${a.badge}`}>{tag}</span>
        ))}
      </div>
      {project.projectUrl && (
        <a href={project.projectUrl} target="_blank" rel="noopener noreferrer"
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 ${a.btn} text-white rounded-lg text-[10px] md:text-xs font-medium transition w-fit`}>
          View Project
          <svg className="w-3 h-3 md:w-3.5 md:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
        </a>
      )}
    </div>
  );

  return (
    <div className={`group ${colSpan} bg-slate-800 rounded-2xl overflow-hidden hover:shadow-2xl ${shadow} transition duration-300 border border-slate-700 flex ${isRow ? `flex-col ${project.layoutDirection === "flex-row-reverse" ? "md:flex-row-reverse" : "md:flex-row"}` : "flex-col"} relative`}>
      <div className={`absolute inset-0 bg-gradient-to-r ${a.gradient} opacity-0 group-hover:opacity-100 transition duration-500 z-10 pointer-events-none`} />
      {project.image && imageBlock}
      {project.videoSrc && videoBlock}
      {contentBlock}
    </div>
  );
}

export default function ProjectsSection({ setSelectedImage }: ProjectsSectionProps) {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    api.getProjects().then(setProjects);
  }, []);

  return (
    <section id="projects" className="container mx-auto px-6 py-24 relative z-10">
      <ScrollElement animation="glitch" duration={0.7}>
        <h2 className="text-3xl font-bold text-white mb-12">Featured Projects</h2>
      </ScrollElement>
      <ScrollElement animation="scale-blur" delay={0} duration={0.7} triggerMargin="0px 0px -100px 0px" disableOnMobile={true}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} expandedProject={expandedProject} setExpandedProject={setExpandedProject} setSelectedImage={setSelectedImage} />
          ))}
        </div>
      </ScrollElement>
      <div className="text-center mt-12">
        <p className="text-slate-400 text-sm italic">More projects are coming soon as I continue exploring new technologies.</p>
      </div>
    </section>
  );
}
