"use client";

import Image from "next/image";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useLayoutEffect, useRef, useState, type MutableRefObject } from "react";
import { createPortal } from "react-dom";
import * as THREE from "three";
import { api, type Project } from "../../lib/api";

interface ProjectsSectionProps {
  setSelectedImage: (image: { src: string; alt: string } | null) => void;
  onOpenLinks?: (project: Project) => void;
}

const HUES = {
  orange: { a: "#f97316", b: "#fb923c" },
  purple: { a: "#a855f7", b: "#c084fc" },
  blue: { a: "#3b82f6", b: "#60a5fa" },
  cyan: { a: "#06b6d4", b: "#22d3ee" },
  teal: { a: "#14b8a6", b: "#2dd4bf" },
  pink: { a: "#ec4899", b: "#f472b6" },
  emerald: { a: "#10b981", b: "#34d399" },
  red: { a: "#ef4444", b: "#f87171" },
};

const ORBIT_NODES = [
  [-2.1, 0.2, 0.1], [1.8, 1.25, -0.3], [1.9, -1.35, 0.2],
  [-1.45, -1.6, -0.2], [0.1, 2.05, 0.1], [-0.4, -2.15, 0.3],
] as const;

type KineticLayout = {
  card: { x: number; y: number; scale: number };
  core: { x: number; y: number; scale: number };
};

// Each project gets a deliberate composition instead of a static left/right split.
const KINETIC_LAYOUTS: KineticLayout[] = [
  { card: { x: 24, y: 55, scale: 1.02 }, core: { x: 77, y: 47, scale: 1.14 } },
  { card: { x: 76, y: 45, scale: 0.98 }, core: { x: 24, y: 53, scale: 1.08 } },
  { card: { x: 23, y: 30, scale: 0.92 }, core: { x: 78, y: 73, scale: 1.32 } },
  { card: { x: 77, y: 62, scale: 0.92 }, core: { x: 24, y: 26, scale: 1.02 } },
  { card: { x: 24, y: 64, scale: 0.94 }, core: { x: 79, y: 25, scale: 1.28 } },
  { card: { x: 77, y: 28, scale: 0.98 }, core: { x: 23, y: 75, scale: 1.1 } },
];

function getHue(project: Project) {
  return HUES[project.accentColor as keyof typeof HUES] || HUES.cyan;
}

function DigitalCore({ progress, color, outroScale }: {
  progress: MutableRefObject<number>;
  color: string;
  outroScale: MutableRefObject<number>;
}) {
  const core = useRef<THREE.Group>(null);
  const shell = useRef<THREE.Mesh>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const material = useRef<THREE.MeshPhysicalMaterial>(null);
  const targetColor = useRef(new THREE.Color(color));
  const smoothProgress = useRef(progress.current);
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    targetColor.current.set(color);
    invalidate();
  }, [color, invalidate]);

  useFrame((_, delta) => {
    const target = progress.current;
    const next = THREE.MathUtils.damp(smoothProgress.current, target, 5, delta);
    const isSettled = Math.abs(next - target) < 0.0001;

    smoothProgress.current = isSettled ? target : next;
    const p = smoothProgress.current;

    if (core.current) {
      core.current.rotation.x = p * Math.PI * 1.4;
      core.current.rotation.y = p * Math.PI * 3.2;
      core.current.position.y = (p - 0.5) * 0.3;
      core.current.scale.setScalar(outroScale.current);
    }
    if (shell.current) shell.current.rotation.z = -p * Math.PI;
    if (ringA.current) ringA.current.rotation.z = p * Math.PI * 2;
    if (ringB.current) ringB.current.rotation.x = -p * Math.PI * 1.5;
    if (material.current) material.current.color.copy(targetColor.current);

    // Keep demand rendering alive only while the core is gliding to its target.
    if (!isSettled) invalidate();
  });

  return (
    <group ref={core}>
      <mesh>
        <icosahedronGeometry args={[1.18, 4]} />
        <meshPhysicalMaterial
          ref={material}
          color={color}
          roughness={0.18}
          metalness={0.35}
          transmission={0.15}
          emissive={color}
          emissiveIntensity={0.18}
          clearcoat={1}
        />
      </mesh>

      <mesh ref={shell} scale={1.18}>
        <icosahedronGeometry args={[1.18, 2]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.22} />
      </mesh>

      {/*
       * Orbit tracks are a UI treatment, not a physical object. Render them after
       * the core and ignore its depth so the complete path remains visible.
       */}
      <mesh ref={ringA} rotation={[1.1, 0.2, 0.25]} renderOrder={2}>
        <torusGeometry args={[1.78, 0.018, 8, 160]} />
        <meshBasicMaterial color={color} transparent opacity={0.6} depthTest={false} depthWrite={false} />
      </mesh>
      <mesh ref={ringB} rotation={[0.25, 0.55, 1.2]} renderOrder={2}>
        <torusGeometry args={[2.08, 0.012, 8, 160]} />
        <meshBasicMaterial color="#94a3b8" transparent opacity={0.32} depthTest={false} depthWrite={false} />
      </mesh>

      {ORBIT_NODES.map((position, index) => (
        <mesh key={index} position={position} scale={index % 2 === 0 ? 1 : 0.72}>
          <octahedronGeometry args={[0.07, 0]} />
          <meshBasicMaterial color={index % 2 === 0 ? color : "#e2e8f0"} />
        </mesh>
      ))}
    </group>
  );
}

function ProjectScene({ progress, color, invalidateRef, outroScale }: {
  progress: MutableRefObject<number>;
  color: string;
  invalidateRef: MutableRefObject<(() => void) | null>;
  outroScale: MutableRefObject<number>;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.6], fov: 54 }}
      dpr={[1, 1.5]}
      frameloop="demand"
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      onCreated={(state) => { invalidateRef.current = state.invalidate; }}
    >
      <ambientLight intensity={0.7} />
      <pointLight position={[3, 3, 4]} intensity={22} color={color} />
      <pointLight position={[-4, -2, 2]} intensity={12} color="#334155" />
      <DigitalCore progress={progress} color={color} outroScale={outroScale} />
    </Canvas>
  );
}

function ActiveProject({ project, index, total, onOpenLinks, setSelectedImage }: {
  project: Project;
  index: number;
  total: number;
  onOpenLinks: (project: Project) => void;
  setSelectedImage: ProjectsSectionProps["setSelectedImage"];
}) {
  const hue = getHue(project);

  return (
    <article className="project-story-card" style={{ boxShadow: `0 18px 60px ${hue.a}13` }}>
      <div className="project-story-media">
        {project.image ? (
          <button type="button" className="absolute inset-0" onClick={() => project.hasImageClick && setSelectedImage({ src: project.image!, alt: project.imageAlt || project.name })} aria-label={`Preview ${project.name}`}>
            <Image src={project.image} alt={project.imageAlt || project.name} fill className="object-cover" sizes="(max-width: 768px) 90vw, 46vw" />
          </button>
        ) : project.videoSrc ? (
          <video className="h-full w-full object-cover" controls preload="metadata" playsInline poster={project.videoPoster || undefined}>
            <source src={project.videoSrc} type="video/mp4" />
          </video>
        ) : (
          <div className="flex h-full items-center justify-center" style={{ background: `radial-gradient(circle, ${hue.a}38, transparent 65%)` }}>
            <svg className="h-12 w-12" style={{ color: hue.a }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" /></svg>
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/15 to-transparent" />
        <div className="absolute bottom-3 left-4 flex items-center gap-3">
          <span className="font-mono text-[10px] tracking-[0.22em]" style={{ color: hue.b }}>
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          <span className="h-px w-8" style={{ backgroundColor: `${hue.a}90` }} />
          <span className="text-[9px] uppercase tracking-[0.18em] text-slate-300">Selected work</span>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <h3 className="mb-3 text-2xl font-bold leading-none tracking-[-0.035em] text-white sm:text-3xl">{project.name}</h3>
        <p className="mb-5 line-clamp-2 text-xs leading-relaxed text-slate-400 sm:text-sm">{project.description}</p>
        <div className="mb-5 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-full border px-2.5 py-1 text-[9px] font-medium uppercase tracking-wider" style={{ color: hue.b, borderColor: `${hue.a}35`, backgroundColor: `${hue.a}0d` }}>{tag}</span>
          ))}
        </div>
        {(project.projectUrl || project.githubUrl || project.videoSrc) && (
          <button type="button" onClick={() => onOpenLinks(project)} className="group inline-flex items-center gap-2 text-xs font-semibold text-white">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border transition-transform duration-300 group-hover:scale-110" style={{ borderColor: `${hue.a}70`, backgroundColor: `${hue.a}16`, color: hue.a }}>
              <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M5 12h14m-5-5 5 5-5 5" /></svg>
            </span>
            Open project
          </button>
        )}
      </div>
    </article>
  );
}

function MobileProjectCard({ project, onOpenLinks, setSelectedImage }: {
  project: Project;
  onOpenLinks: (project: Project) => void;
  setSelectedImage: ProjectsSectionProps["setSelectedImage"];
}) {
  const hue = getHue(project);

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900" style={{ boxShadow: `0 12px 36px ${hue.a}0d` }}>
      <div className="relative aspect-video bg-slate-950">
        {project.image ? (
          <button type="button" className="absolute inset-0" onClick={() => project.hasImageClick && setSelectedImage({ src: project.image!, alt: project.imageAlt || project.name })} aria-label={`Preview ${project.name}`}>
            <Image src={project.image} alt={project.imageAlt || project.name} fill className="object-cover" sizes="100vw" />
          </button>
        ) : project.videoSrc ? (
          <video className="h-full w-full object-cover" controls preload="metadata" playsInline poster={project.videoPoster || undefined}>
            <source src={project.videoSrc} type="video/mp4" />
          </video>
        ) : (
          <div className="flex h-full items-center justify-center" style={{ background: `radial-gradient(circle, ${hue.a}30, transparent 65%)` }}>
            <svg className="h-10 w-10" style={{ color: hue.a }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" /></svg>
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="mb-2 text-xl font-bold text-white">{project.name}</h3>
        <p className="mb-4 text-sm leading-relaxed text-slate-400">{project.description}</p>
        <div className="mb-5 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-full border px-2.5 py-1 text-[9px] font-medium uppercase tracking-wider" style={{ color: hue.b, borderColor: `${hue.a}35`, backgroundColor: `${hue.a}0d` }}>{tag}</span>
          ))}
        </div>
        {(project.projectUrl || project.githubUrl || project.videoSrc) && (
          <button type="button" onClick={() => onOpenLinks(project)} className="inline-flex items-center gap-2 text-xs font-semibold" style={{ color: hue.a }}>
            Open project
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-5-5 5 5-5 5" /></svg>
          </button>
        )}
      </div>
    </article>
  );
}

function AllProjectsPanel({ projects, onClose, setSelectedImage }: {
  projects: Project[];
  onClose: () => void;
  setSelectedImage: ProjectsSectionProps["setSelectedImage"];
}) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return createPortal(
    <div className="fixed inset-0 z-[110] overflow-y-auto overscroll-contain bg-slate-950 animate-project-list-in">
      <div className="container mx-auto px-6 py-8 md:py-12">
        <div className="mb-10 flex items-end justify-between gap-6 border-b border-slate-800 pb-6">
          <div>
            <p className="mb-2 text-[10px] uppercase tracking-[0.3em] text-cyan-400">Project archive</p>
            <h2 className="text-3xl font-bold text-white md:text-5xl">All projects</h2>
          </div>
          <button type="button" onClick={onClose} className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-700 text-slate-300 transition hover:border-cyan-500 hover:text-white" aria-label="Close project list">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m6 6 12 12M18 6 6 18" /></svg>
          </button>
        </div>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-slate-800 bg-slate-800 md:grid-cols-2">
          {projects.map((project, index) => {
            const hue = getHue(project);
            return (
              <article key={project.slug} className="group relative min-h-64 overflow-hidden bg-slate-950 p-6 md:p-8">
                {project.image && (
                  <button type="button" className="absolute inset-0 opacity-10 transition duration-700 group-hover:scale-105 group-hover:opacity-20" onClick={() => project.hasImageClick && setSelectedImage({ src: project.image!, alt: project.imageAlt || project.name })}>
                    <Image src={project.image} alt="" fill className="object-cover" loading="lazy" />
                  </button>
                )}
                <div className="relative z-10 flex h-full flex-col">
                  <span className="mb-10 font-mono text-xs" style={{ color: hue.a }}>{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="mb-3 text-2xl font-bold text-white">{project.name}</h3>
                  <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-slate-400">{project.description}</p>
                  <div className="mt-auto flex items-center justify-between gap-4">
                    <span className="text-[10px] uppercase tracking-widest text-slate-600">{project.tags.slice(0, 2).join(" / ")}</span>
                    {(project.projectUrl || project.githubUrl || project.videoSrc) && (
                      <button type="button" onClick={() => setSelectedProject(project)} className="text-xs font-semibold" style={{ color: hue.a }}>Open project</button>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        {selectedProject && <LinkModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      </div>
    </div>,
    document.body,
  );
}

export function LinkModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const hue = getHue(project);

  const links = [
    project.projectUrl && { url: project.projectUrl, label: project.projectUrl.includes("figma.com") ? "Figma" : "View Project" },
    project.githubUrl && { url: project.githubUrl, label: "GitHub" },
  ].filter((link): link is { url: string; label: string } => Boolean(link));

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/70 p-6 backdrop-blur-sm animate-fadeIn" onClick={onClose}>
      <div className="w-full max-w-sm rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl animate-zoomPunch" onClick={(event) => event.stopPropagation()}>
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="mb-1 text-[10px] uppercase tracking-[0.24em]" style={{ color: hue.a }}>Open project</p>
            <h3 className="font-semibold text-white">{project.name}</h3>
          </div>
          <button type="button" onClick={onClose} className="p-2 text-slate-400 transition hover:text-white" aria-label="Close">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m6 6 12 12M18 6 6 18" /></svg>
          </button>
        </div>
        <div className="space-y-2">
          {project.videoSrc && (
            <div className="overflow-hidden rounded-xl border border-slate-700 bg-black">
              <video className="aspect-video w-full" controls autoPlay playsInline poster={project.videoPoster || undefined}>
                <source src={project.videoSrc} type="video/mp4" />
              </video>
            </div>
          )}
          {links.map((link) => (
            <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" onClick={onClose} className="flex items-center justify-between rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm font-medium text-slate-200 transition hover:border-slate-500">
              {link.label}
              <svg className="h-4 w-4" style={{ color: hue.a }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5h5v5m0-5L10 14m8 0v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4" /></svg>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection({ setSelectedImage, onOpenLinks }: ProjectsSectionProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardStageRef = useRef<HTMLDivElement>(null);
  const sceneStageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const progress = useRef(0);
  const outroScale = useRef(1);
  const invalidateScene = useRef<(() => void) | null>(null);
  const activeIndexRef = useRef(0);

  useEffect(() => {
    api.getProjects().then(setProjects);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const featuredProjects = projects.slice(0, 6);
  const featuredProjectCount = featuredProjects.length;

  useLayoutEffect(() => {
    if (isMobile || !sectionRef.current || featuredProjectCount === 0) return;

    if (!stageRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const cards = cardRefs.current.filter((card): card is HTMLDivElement => Boolean(card));
      const layouts = KINETIC_LAYOUTS.slice(0, featuredProjectCount);
      const cardComposition = (layout: KineticLayout) => ({
        left: `${layout.card.x}%`,
        top: `${layout.card.y}%`,
        scale: layout.card.scale,
        xPercent: -50,
        yPercent: -50,
      });
      const coreComposition = (layout: KineticLayout) => ({
        left: `${layout.core.x}%`,
        top: `${layout.core.y}%`,
        scale: layout.core.scale,
        xPercent: -50,
        yPercent: -50,
      });
      const centerComposition = {
        left: "50%",
        top: "50%",
        x: 0,
        y: 0,
        scale: 1,
        xPercent: -50,
        yPercent: -50,
        transformOrigin: "50% 50%",
      };
      const introUnits = 1.15;
      const projectUnits = Math.max(1, featuredProjectCount - 1) * 1.15;
      const outroUnits = 1.15;
      const totalUnits = introUnits + projectUnits + outroUnits;

      gsap.set(cards, { autoAlpha: 0, scale: 0.97, pointerEvents: "none", force3D: true });
      gsap.set(cards[0], { autoAlpha: 0, scale: 0.97, pointerEvents: "none" });
      outroScale.current = 1;
      if (cardStageRef.current) gsap.set(cardStageRef.current, cardComposition(layouts[0]));
      if (sceneStageRef.current) gsap.set(sceneStageRef.current, centerComposition);

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * totalUnits}`,
          pin: stageRef.current,
          pinReparent: true,
          scrub: 1.05,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            progress.current = self.progress;
            invalidateScene.current?.();
            const projectProgress = THREE.MathUtils.clamp(
              (self.progress * totalUnits - introUnits) / projectUnits,
              0,
              1,
            );
            const nextIndex = Math.min(featuredProjectCount - 1, Math.floor(projectProgress * (featuredProjectCount - 1)));
            if (nextIndex !== activeIndexRef.current) {
              cards.forEach((card, index) => {
                card.style.pointerEvents = index === nextIndex ? "auto" : "none";
              });
              activeIndexRef.current = nextIndex;
              setActiveIndex(nextIndex);
            }
          },
        },
      });

      timeline
        .to(sceneStageRef.current, { ...coreComposition(layouts[0]), duration: 0.82, ease: "sine.inOut" })
        .to(cards[0], { autoAlpha: 1, scale: 1, pointerEvents: "auto", duration: 0.35, ease: "power2.out" }, "<0.54");

      Array.from({ length: featuredProjectCount - 1 }).forEach((_, index) => {
        const outgoing = cards[index];
        const incoming = cards[index + 1];
        const nextLayout = layouts[index + 1];
        timeline
          .to(outgoing, { autoAlpha: 0, y: -28, duration: 0.32, ease: "power2.in" })
          .to(cardStageRef.current, { ...cardComposition(nextLayout), duration: 0.82, ease: "sine.inOut" })
          .to(sceneStageRef.current, { ...coreComposition(nextLayout), duration: 0.82, ease: "sine.inOut" }, "<")
          .to(incoming, { autoAlpha: 1, y: 0, duration: 0.42, ease: "power2.out" }, "<0.32");
      });

      const lastCard = cards[cards.length - 1];
      timeline
        .to({}, { duration: 0.42 })
        .to(lastCard, {
          autoAlpha: 0,
          scale: 0.92,
          pointerEvents: "none",
          duration: 0.44,
          ease: "power2.inOut",
        })
        .to(sceneStageRef.current, {
          left: "50%",
          top: "50%",
          x: 0,
          y: 0,
          scale: 1,
          xPercent: -50,
          yPercent: -50,
          transformOrigin: "50% 50%",
          duration: 0.92,
          ease: "sine.inOut",
        }, "<0.08")
        .to(outroScale, {
          current: 1.3,
          duration: 0.52,
          ease: "sine.inOut",
          onUpdate: () => invalidateScene.current?.(),
        })
        .to({}, { duration: 0.18 });

      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, sectionRef);

    return () => context.revert();
  }, [featuredProjectCount, isMobile]);

  if (projects.length === 0) return null;

  const activeProject = featuredProjects[activeIndex];
  const activeHue = getHue(activeProject);
  const handleOpenLinks = onOpenLinks || (() => {});

  return (
    <>
      {isMobile ? (
        <section id="projects" className="relative z-10 px-6 py-20">
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-[10px] uppercase tracking-[0.28em] text-cyan-400">Selected work</p>
              <h2 className="text-3xl font-bold tracking-tight text-white">Projects</h2>
            </div>
            <button type="button" onClick={() => setShowAll(true)} className="text-[10px] font-medium uppercase tracking-[0.18em] text-slate-400">See all projects</button>
          </div>
          <div className="space-y-5">
            {projects.map((project) => <MobileProjectCard key={project.slug} project={project} onOpenLinks={handleOpenLinks} setSelectedImage={setSelectedImage} />)}
          </div>
        </section>
      ) : (
        <section
          id="projects"
          ref={sectionRef}
          className="project-scroll-section relative z-10"
        >
        <div ref={stageRef} className="project-sticky-stage">
          <div className="project-atmosphere" style={{ "--project-accent": activeHue.a } as React.CSSProperties} />
          <div className="container relative z-10 mx-auto flex h-full flex-col px-6 pb-7 pt-20 md:pb-10 md:pt-24">
            <header className="flex items-center justify-between border-b border-slate-800/80 pb-4">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: activeHue.a, boxShadow: `0 0 18px ${activeHue.a}` }} />
                <h2 className="text-sm font-semibold uppercase tracking-[0.24em] text-white">Projects</h2>
              </div>
              <button type="button" onClick={() => setShowAll(true)} className="group flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400 transition hover:text-white">
                See all projects
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-5-5 5 5-5 5" /></svg>
              </button>
            </header>

            <div className="project-kinetic-stage relative min-h-0 flex-1 overflow-hidden">
              <div ref={cardStageRef} className="project-card-stage z-20">
                {featuredProjects.map((project, index) => (
                  <div
                    key={project.slug}
                    ref={(element) => { cardRefs.current[index] = element; }}
                    className="project-story-slide"
                  >
                    <ActiveProject project={project} index={index} total={featuredProjects.length} onOpenLinks={handleOpenLinks} setSelectedImage={setSelectedImage} />
                  </div>
                ))}
              </div>

              <div ref={sceneStageRef} className="project-canvas-shell project-core-stage">
                {!showAll && <ProjectScene progress={progress} color={activeHue.a} invalidateRef={invalidateScene} outroScale={outroScale} />}
              </div>
            </div>

            <footer className="flex items-center gap-4 border-t border-slate-800/80 pt-4">
              <div className="flex flex-1 gap-2">
                {featuredProjects.map((project, index) => (
                  <div key={project.slug} className="h-px flex-1 bg-slate-800">
                    <div className="h-full origin-left transition-transform duration-500" style={{ backgroundColor: activeHue.a, transform: `scaleX(${index <= activeIndex ? 1 : 0})` }} />
                  </div>
                ))}
              </div>
              <span className="hidden text-[9px] uppercase tracking-[0.2em] text-slate-600 sm:block">Keep scrolling</span>
            </footer>
          </div>
        </div>
        </section>
      )}

      {showAll && (
        <AllProjectsPanel
          projects={projects}
          onClose={() => setShowAll(false)}
          setSelectedImage={setSelectedImage}
        />
      )}
    </>
  );
}
