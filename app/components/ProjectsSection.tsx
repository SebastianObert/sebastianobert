"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import ScrollElement from "./ScrollElement";
import { api, Project } from "../../lib/api";

interface ProjectsSectionProps {
  setSelectedImage: (image: { src: string; alt: string } | null) => void;
  onOpenLinks?: (project: Project) => void;
}

const HUES = {
  orange: { a: "#f97316", b: "#fb923c", c: "orange" },
  purple: { a: "#a855f7", b: "#c084fc", c: "purple" },
  blue: { a: "#3b82f6", b: "#60a5fa", c: "blue" },
  cyan: { a: "#06b6d4", b: "#22d3ee", c: "cyan" },
  teal: { a: "#14b8a6", b: "#2dd4bf", c: "teal" },
  pink: { a: "#ec4899", b: "#f472b6", c: "pink" },
  emerald: { a: "#10b981", b: "#34d399", c: "emerald" },
  red: { a: "#ef4444", b: "#f87171", c: "red" },
};

function ProjectCard({ project, setSelectedImage, onOpenLinks }: {
  project: Project;
  setSelectedImage: (i: { src: string; alt: string } | null) => void;
  onOpenLinks?: (project: Project) => void;
}) {
  const c = HUES[project.accentColor as keyof typeof HUES] || HUES.cyan;
  const [isExpanded, setIsExpanded] = useState(false);
  const hasUrl = !!(project.projectUrl || project.githubUrl);
  const hasImage = !!project.image && project.hasImageClick;

  return (
    <div
      className="group relative bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-slate-700 transition-all duration-500 flex flex-col"
      style={{ boxShadow: `0 0 0 1px ${c.a}15, 0 4px 20px ${c.a}08` }}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: project.videoSrc ? "16/10" : "4/3" }}>
        {project.image && (
          <div
            className="absolute inset-0 cursor-pointer z-10"
            onClick={() => hasImage && setSelectedImage({ src: project.image!, alt: project.imageAlt || project.name })}
          >
            <Image src={project.image} alt={project.imageAlt || project.name} fill className="object-cover transition-all duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
          </div>
        )}
        {project.videoSrc && (
          <div className="absolute inset-0 bg-black">
            <video controls preload="metadata" playsInline poster={project.videoPoster || undefined}
              onEnded={(e) => { e.currentTarget.currentTime = 0; e.currentTarget.load(); }}
              className="w-full h-full object-cover">
              <source src={project.videoSrc} type="video/mp4" />
            </video>
          </div>
        )}

        <div className="absolute bottom-3 left-3 z-20 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 2).map((t) => (
            <span key={t} className="px-2 py-0.5 text-[10px] font-semibold rounded-md bg-slate-900/70 backdrop-blur-sm text-slate-300 border border-slate-700/50">
              {t}
            </span>
          ))}
          {project.tags.length > 2 && (
            <span className="px-2 py-0.5 text-[10px] font-semibold rounded-md bg-slate-900/70 backdrop-blur-sm text-slate-500">
              +{project.tags.length - 2}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col flex-1 p-4 md:p-5 gap-2">
        <h3 className="text-sm md:text-base font-bold text-white leading-tight tracking-tight">{project.name}</h3>

        <div className="flex-1">
          <p className="text-xs md:text-sm text-slate-400 leading-relaxed line-clamp-2 md:line-clamp-3">
            {isExpanded ? project.description : project.description.split('.').slice(0, 2).join('.') + '.'}
          </p>
          {project.description.length > 120 && (
            <button onClick={() => setIsExpanded(!isExpanded)} className="md:hidden text-[11px] mt-1 font-medium hover:underline"
              style={{ color: c.a }}>
              {isExpanded ? 'Show less' : 'Read more'}
            </button>
          )}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-800/50">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 3).map((t) => (
              <span key={t} className="px-1.5 py-0.5 text-[9px] font-medium rounded"
                style={{ backgroundColor: `${c.a}12`, color: c.b, borderColor: `${c.a}25` }}>
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {hasUrl && (
              <button onClick={() => onOpenLinks?.(project)}
                className="w-7 h-7 flex items-center justify-center rounded-full transition-colors hover:bg-slate-800 group/btn"
                style={{ color: c.a }}>
                <svg className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            )}
            {hasImage && (
              <button onClick={() => setSelectedImage({ src: project.image!, alt: project.imageAlt || project.name })}
                className="w-7 h-7 flex items-center justify-center rounded-full text-slate-600 hover:text-slate-400 hover:bg-slate-800 transition-colors">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function FeaturedCard({ project, setSelectedImage, onOpenLinks }: {
  project: Project;
  setSelectedImage: (i: { src: string; alt: string } | null) => void;
  onOpenLinks?: (project: Project) => void;
}) {
  const c = HUES[project.accentColor as keyof typeof HUES] || HUES.cyan;
  const hasImage = !!project.image && project.hasImageClick;

  return (
    <div
      className="group relative bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-slate-700 transition-all duration-500"
      style={{ boxShadow: `0 0 0 1px ${c.a}15, 0 4px 24px ${c.a}06` }}
    >
      <div className="flex flex-col md:flex-row min-h-[260px]">
        <div className="md:w-[45%] relative min-h-[200px] md:min-h-[260px] overflow-hidden">
          {project.image && (
            <div className="absolute inset-0 cursor-pointer z-10"
              onClick={() => hasImage && setSelectedImage({ src: project.image!, alt: project.imageAlt || project.name })}>
              <Image src={project.image} alt={project.imageAlt || project.name} fill className="object-cover transition-all duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900/60 via-slate-900/10 to-transparent opacity-40 group-hover:opacity-60 transition-opacity" />
            </div>
          )}
          {project.videoSrc && (
            <div className="absolute inset-0 bg-black">
              <video controls preload="metadata" playsInline poster={project.videoPoster || undefined}
                onEnded={(e) => { e.currentTarget.currentTime = 0; e.currentTarget.load(); }}
                className="w-full h-full object-cover">
                <source src={project.videoSrc} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900/60 via-transparent to-transparent pointer-events-none" />
            </div>
          )}
        </div>

        <div className="md:w-[55%] p-5 md:p-7 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1 h-5 rounded-full" style={{ backgroundColor: c.a }} />
            <h3 className="text-base md:text-lg font-bold text-white">{project.name}</h3>
          </div>

          <p className="text-xs md:text-sm text-slate-400 leading-relaxed mb-4 line-clamp-3 md:line-clamp-4">{project.description}</p>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tags.map((t) => (
              <span key={t} className="px-2.5 py-0.5 text-[10px] font-medium rounded-full border"
                style={{ backgroundColor: `${c.a}10`, color: c.b, borderColor: `${c.a}20` }}>
                {t}
              </span>
            ))}
          </div>

          {(project.projectUrl || project.githubUrl) && (
            <button onClick={() => onOpenLinks?.(project)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors w-fit group/btn"
              style={{ color: c.a }}>
              <span>View Project</span>
              <svg className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function LinkModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const c = HUES[project.accentColor as keyof typeof HUES] || HUES.cyan;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  function getLinkInfo(url: string) {
    const u = url.toLowerCase();
    if (u.includes("github.com")) return { label: "GitHub", icon: "github", hoverBorder: "hover:border-slate-500" };
    if (u.includes("figma.com")) return { label: "Figma", icon: "figma", hoverBorder: "hover:border-purple-500/50" };
    if (u.includes("vercel.app")) return { label: "Website", icon: "web", hoverBorder: "hover:border-cyan-500/50" };
    return { label: "View Project", icon: "web", hoverBorder: "hover:border-cyan-500/50" };
  }

  const links: { url: string; info: ReturnType<typeof getLinkInfo> }[] = [];
  if (project.projectUrl) links.push({ url: project.projectUrl, info: getLinkInfo(project.projectUrl) });
  if (project.githubUrl) links.push({ url: project.githubUrl, info: getLinkInfo(project.githubUrl) });

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn" onClick={onClose}>
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-72 mx-4 p-5 shadow-2xl animate-zoomPunch" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-white font-semibold text-sm">Open Project</h3>
            <p className="text-[10px] text-slate-500 mt-0.5">{project.name}</p>
          </div>
          <button onClick={onClose} className="p-1 rounded hover:bg-slate-700 transition">
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="flex flex-col gap-2">
          {links.map(({ url, info }) => (
            <a key={url} href={url} target="_blank" rel="noopener noreferrer"
              onClick={onClose}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm text-slate-200 font-medium transition border border-slate-700 ${info.hoverBorder}`}
              style={{ color: c.a }}>
              {info.icon === "github" ? (
                <svg className="w-4 h-4 text-slate-300 flex-shrink-0" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" /></svg>
              ) : info.icon === "figma" ? (
                <svg className="w-4 h-4 text-slate-300 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.354-3.019-3.019-3.019h-3.117V7.51zm0 8.462h-4.588c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM9.618 8.962c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V8.962H9.618zm3.117 8.461H8.147c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 15.416c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49-4.49-2.014-4.49-4.49 2.014-4.49 4.49-4.49z"/></svg>
              ) : (
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              )}
              <span className="flex-1 text-slate-200">{info.label}</span>
              <svg className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection({ setSelectedImage, onOpenLinks }: ProjectsSectionProps) {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    api.getProjects().then(setProjects);
  }, []);

  if (projects.length === 0) return null;

  const [nexbuy, aegis, jebs, grow, aircare, aljatim, dataviz, indotext, attendance, snort] = projects;

  const handleOpenLinks = onOpenLinks || (() => {});

  return (
    <section id="projects" className="container mx-auto px-6 py-24 relative z-10">
      <ScrollElement animation="glitch" duration={0.7}>
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">Projects</h2>
          <p className="text-slate-500 text-sm max-w-lg">A curated selection of things I&apos;ve built — across mobile, web, game, and security.</p>
        </div>
      </ScrollElement>

      <ScrollElement animation="scale-blur" delay={0} duration={0.7} triggerMargin="0px 0px 250px 0px" disableOnMobile={true}>
          <div className="space-y-5 md:space-y-6">
            {nexbuy && <FeaturedCard project={nexbuy} setSelectedImage={setSelectedImage} onOpenLinks={handleOpenLinks} />}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {aegis && <ProjectCard project={aegis} setSelectedImage={setSelectedImage} onOpenLinks={handleOpenLinks} />}
            {jebs && <ProjectCard project={jebs} setSelectedImage={setSelectedImage} onOpenLinks={handleOpenLinks} />}
            {grow && <ProjectCard project={grow} setSelectedImage={setSelectedImage} onOpenLinks={handleOpenLinks} />}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {aircare && <FeaturedCard project={aircare} setSelectedImage={setSelectedImage} onOpenLinks={handleOpenLinks} />}
            {aljatim && <FeaturedCard project={aljatim} setSelectedImage={setSelectedImage} onOpenLinks={handleOpenLinks} />}
          </div>

          {dataviz && <FeaturedCard project={dataviz} setSelectedImage={setSelectedImage} onOpenLinks={handleOpenLinks} />}
          {indotext && <FeaturedCard project={indotext} setSelectedImage={setSelectedImage} onOpenLinks={handleOpenLinks} />}
          {attendance && <FeaturedCard project={attendance} setSelectedImage={setSelectedImage} onOpenLinks={handleOpenLinks} />}
          {snort && <FeaturedCard project={snort} setSelectedImage={setSelectedImage} onOpenLinks={handleOpenLinks} />}
        </div>
      </ScrollElement>

      <div className="text-center mt-16">
        <p className="text-slate-600 text-xs">More projects are coming soon as I continue exploring new technologies.</p>
      </div>
    </section>
  );
}
