"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import ScrollElement from "./ScrollElement";
import { api, Organization, GalleryItem } from "../../lib/api";

interface OrganizationSectionProps {
  setSelectedImage: (image: { src: string; alt: string } | null) => void;
}

const vignetteMask =
  "radial-gradient(ellipse 78% 78% at 50% 50%, black 30%, rgba(0,0,0,0.55) 62%, rgba(0,0,0,0.12) 85%, transparent 100%)";

export default function OrganizationSection({ setSelectedImage }: OrganizationSectionProps) {
  const [expandedOrg, setExpandedOrg] = useState<string | null>(null);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);

  useEffect(() => {
    api.getOrganizations().then(setOrganizations);
    api.getGallery().then(setGallery);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (expandedOrg && !target.closest('[data-org-card]')) {
        setExpandedOrg(null);
      }
    };

    if (expandedOrg) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [expandedOrg]);

  return (
    <>
      <section id="experience" className="bg-slate-800/30 py-24 border-y border-slate-800 relative z-10 overflow-hidden">
        <div className="container mx-auto px-6">
          {/* Title - centered */}
          <ScrollElement animation="parallax" duration={0.8}>
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-4">Organization & Experience</h2>
              <p className="text-slate-400 text-lg">Through the many organizations and events I&apos;ve been a part of, I learned many new skills and got to know a lot of people.</p>
            </div>
          </ScrollElement>

          {/* Mobile: original layout, no image */}
          <div className="md:hidden">
            <ScrollElement animation="slide-fade" delay={0.2} duration={0.8}>
              <div className="space-y-6 max-w-4xl mx-auto">
                {organizations.map((org) => (
                  <div key={org.slug}
                    data-org-card
                    onClick={() => { if (window.innerWidth < 768) setExpandedOrg(expandedOrg === org.slug ? null : org.slug); }}
                    className="group bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-cyan-500 hover:scale-105 transition-all duration-300 flex flex-col md:flex-row gap-6 cursor-pointer"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center overflow-hidden border-2 border-slate-600">
                        {org.logo && <Image src={org.logo} alt={org.logoAlt || org.name} width={64} height={64} className="object-cover" />}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-white relative">
                            <span className={`transition-opacity duration-300 ${expandedOrg === org.slug ? 'opacity-0' : 'group-hover:opacity-0'}`}>{org.name}</span>
                            <span className={`absolute left-0 top-0 transition-opacity duration-300 whitespace-nowrap ${expandedOrg === org.slug ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>{org.fullName}</span>
                          </h3>
                          <p className="text-cyan-400 font-medium">{org.role}</p>
                        </div>
                        <div className="text-slate-400 text-sm mt-2 md:mt-0 font-mono bg-slate-900/50 px-3 py-1 rounded-lg border border-slate-700">{org.dateRange}</div>
                      </div>
                      <p className="text-slate-400 leading-relaxed text-sm">{org.description}</p>
                    </div>
                    <div className="flex w-24 h-16 md:w-28 md:h-20 items-center justify-center">
                      {org.slug === "ahm" && (
                        <svg viewBox="0 0 120 80" role="img" focusable="false">
                          <rect x="28" y="14" width="64" height="42" rx="4" fill="rgba(56,189,248,0.12)" stroke="rgba(56,189,248,0.6)" strokeWidth="2" />
                          <rect x="28" y="14" width="64" height="10" rx="4" fill="rgba(56,189,248,0.2)" />
                          <circle cx="34" cy="19" r="2" fill="rgba(56,189,248,0.6)" />
                          <circle cx="40" cy="19" r="2" fill="rgba(56,189,248,0.6)" />
                          <circle cx="46" cy="19" r="2" fill="rgba(56,189,248,0.6)" />
                          <rect x="34" y="30" width="22" height="3" rx="1.5" fill="rgba(56,189,248,0.5)" />
                          <rect x="34" y="37" width="16" height="3" rx="1.5" fill="rgba(56,189,248,0.35)" />
                          <rect x="34" y="44" width="28" height="3" rx="1.5" fill="rgba(56,189,248,0.25)" />
                          <rect x="62" y="30" width="24" height="17" rx="3" fill="rgba(56,189,248,0.15)" stroke="rgba(56,189,248,0.4)" strokeWidth="1.5" />
                          <path d="M52 56L44 68H76L68 56Z" fill="rgba(56,189,248,0.18)" stroke="rgba(56,189,248,0.5)" strokeWidth="2" strokeLinejoin="round" />
                          <path d="M60 68V62" stroke="rgba(56,189,248,0.6)" strokeWidth="2" strokeLinecap="round" />
                          <path d="M56 58L60 62L64 58" fill="none" stroke="rgba(56,189,248,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                      {org.slug === "kspm" && (
                        <svg viewBox="0 0 120 80" role="img" focusable="false">
                          <path d="M12 60H108" stroke="rgba(148,163,184,0.4)" strokeWidth="2" />
                          <path d="M12 40H108" stroke="rgba(148,163,184,0.2)" strokeWidth="2" />
                          <path d="M18 58L38 42L56 48L74 30L96 36" fill="none" stroke="rgba(56,189,248,0.8)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                          <rect x="24" y="50" width="8" height="10" fill="rgba(56,189,248,0.5)" />
                          <rect x="44" y="46" width="8" height="14" fill="rgba(56,189,248,0.35)" />
                          <rect x="64" y="38" width="8" height="22" fill="rgba(56,189,248,0.45)" />
                          <rect x="84" y="34" width="8" height="26" fill="rgba(56,189,248,0.55)" />
                        </svg>
                      )}
                      {org.slug === "commfest" && (
                        <svg viewBox="0 0 120 80" role="img" focusable="false">
                          <rect x="12" y="22" width="30" height="20" rx="3" fill="rgba(56,189,248,0.35)" stroke="rgba(56,189,248,0.7)" strokeWidth="2" />
                          <rect x="78" y="22" width="30" height="20" rx="3" fill="rgba(56,189,248,0.25)" stroke="rgba(56,189,248,0.6)" strokeWidth="2" />
                          <rect x="34" y="48" width="52" height="18" rx="4" fill="rgba(56,189,248,0.18)" stroke="rgba(56,189,248,0.55)" strokeWidth="2" />
                          <path d="M42 32H72" stroke="rgba(56,189,248,0.8)" strokeWidth="3" strokeLinecap="round" />
                          <path d="M68 28L76 32L68 36" fill="none" stroke="rgba(56,189,248,0.8)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M56 42V48" stroke="rgba(56,189,248,0.6)" strokeWidth="3" strokeLinecap="round" />
                        </svg>
                      )}
                      {org.slug === "umnfest" && (
                        <svg viewBox="0 0 120 80" role="img" focusable="false">
                          <circle cx="60" cy="40" r="20" fill="rgba(56,189,248,0.22)" />
                          <circle cx="60" cy="40" r="18" fill="rgba(56,189,248,0.12)" />
                          <path d="M60 28L70 34L66 46L54 46L50 34Z" fill="rgba(125,211,252,0.85)" />
                          <circle cx="44" cy="40" r="3" fill="rgba(125,211,252,0.55)" />
                          <circle cx="76" cy="40" r="3" fill="rgba(125,211,252,0.55)" />
                          <circle cx="60" cy="24" r="3" fill="rgba(125,211,252,0.55)" />
                          <circle cx="60" cy="56" r="3" fill="rgba(125,211,252,0.55)" />
                        </svg>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollElement>
          </div>

          {/* Desktop: content left, image right */}
          <div className="hidden md:flex md:flex-row md:items-center">
            <div className="relative z-10 w-[56%]">
              <ScrollElement animation="slide-fade" delay={0.2} duration={0.8}>
                <div className="space-y-6 pr-6">
                  {organizations.map((org) => (
                    <div key={org.slug}
                      data-org-card
                      onClick={() => { if (window.innerWidth < 768) setExpandedOrg(expandedOrg === org.slug ? null : org.slug); }}
                      className="group bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-cyan-500 hover:scale-105 transition-all duration-300 flex flex-col md:flex-row gap-6 cursor-pointer"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center overflow-hidden border-2 border-slate-600">
                          {org.logo && <Image src={org.logo} alt={org.logoAlt || org.name} width={64} height={64} className="object-cover" />}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
                          <div>
                            <h3 className="text-xl font-bold text-white relative">
                              <span className={`transition-opacity duration-300 ${expandedOrg === org.slug ? 'opacity-0' : 'group-hover:opacity-0'}`}>{org.name}</span>
                              <span className={`absolute left-0 top-0 transition-opacity duration-300 whitespace-nowrap ${expandedOrg === org.slug ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>{org.fullName}</span>
                            </h3>
                            <p className="text-cyan-400 font-medium">{org.role}</p>
                          </div>
                          <div className="text-slate-400 text-sm mt-2 md:mt-0 font-mono bg-slate-900/50 px-3 py-1 rounded-lg border border-slate-700">{org.dateRange}</div>
                        </div>
                        <p className="text-slate-400 leading-relaxed text-sm">{org.description}</p>
                      </div>
                      <div className="flex w-24 h-16 md:w-28 md:h-20 items-center justify-center">
                        {org.slug === "ahm" && (
                          <svg viewBox="0 0 120 80" role="img" focusable="false">
                            <rect x="28" y="14" width="64" height="42" rx="4" fill="rgba(56,189,248,0.12)" stroke="rgba(56,189,248,0.6)" strokeWidth="2" />
                            <rect x="28" y="14" width="64" height="10" rx="4" fill="rgba(56,189,248,0.2)" />
                            <circle cx="34" cy="19" r="2" fill="rgba(56,189,248,0.6)" />
                            <circle cx="40" cy="19" r="2" fill="rgba(56,189,248,0.6)" />
                            <circle cx="46" cy="19" r="2" fill="rgba(56,189,248,0.6)" />
                            <rect x="34" y="30" width="22" height="3" rx="1.5" fill="rgba(56,189,248,0.5)" />
                            <rect x="34" y="37" width="16" height="3" rx="1.5" fill="rgba(56,189,248,0.35)" />
                            <rect x="34" y="44" width="28" height="3" rx="1.5" fill="rgba(56,189,248,0.25)" />
                            <rect x="62" y="30" width="24" height="17" rx="3" fill="rgba(56,189,248,0.15)" stroke="rgba(56,189,248,0.4)" strokeWidth="1.5" />
                            <path d="M52 56L44 68H76L68 56Z" fill="rgba(56,189,248,0.18)" stroke="rgba(56,189,248,0.5)" strokeWidth="2" strokeLinejoin="round" />
                            <path d="M60 68V62" stroke="rgba(56,189,248,0.6)" strokeWidth="2" strokeLinecap="round" />
                            <path d="M56 58L60 62L64 58" fill="none" stroke="rgba(56,189,248,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                        {org.slug === "kspm" && (
                          <svg viewBox="0 0 120 80" role="img" focusable="false">
                            <path d="M12 60H108" stroke="rgba(148,163,184,0.4)" strokeWidth="2" />
                            <path d="M12 40H108" stroke="rgba(148,163,184,0.2)" strokeWidth="2" />
                            <path d="M18 58L38 42L56 48L74 30L96 36" fill="none" stroke="rgba(56,189,248,0.8)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                            <rect x="24" y="50" width="8" height="10" fill="rgba(56,189,248,0.5)" />
                            <rect x="44" y="46" width="8" height="14" fill="rgba(56,189,248,0.35)" />
                            <rect x="64" y="38" width="8" height="22" fill="rgba(56,189,248,0.45)" />
                            <rect x="84" y="34" width="8" height="26" fill="rgba(56,189,248,0.55)" />
                          </svg>
                        )}
                        {org.slug === "commfest" && (
                          <svg viewBox="0 0 120 80" role="img" focusable="false">
                            <rect x="12" y="22" width="30" height="20" rx="3" fill="rgba(56,189,248,0.35)" stroke="rgba(56,189,248,0.7)" strokeWidth="2" />
                            <rect x="78" y="22" width="30" height="20" rx="3" fill="rgba(56,189,248,0.25)" stroke="rgba(56,189,248,0.6)" strokeWidth="2" />
                            <rect x="34" y="48" width="52" height="18" rx="4" fill="rgba(56,189,248,0.18)" stroke="rgba(56,189,248,0.55)" strokeWidth="2" />
                            <path d="M42 32H72" stroke="rgba(56,189,248,0.8)" strokeWidth="3" strokeLinecap="round" />
                            <path d="M68 28L76 32L68 36" fill="none" stroke="rgba(56,189,248,0.8)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M56 42V48" stroke="rgba(56,189,248,0.6)" strokeWidth="3" strokeLinecap="round" />
                          </svg>
                        )}
                        {org.slug === "umnfest" && (
                          <svg viewBox="0 0 120 80" role="img" focusable="false">
                            <circle cx="60" cy="40" r="20" fill="rgba(56,189,248,0.22)" />
                            <circle cx="60" cy="40" r="18" fill="rgba(56,189,248,0.12)" />
                            <path d="M60 28L70 34L66 46L54 46L50 34Z" fill="rgba(125,211,252,0.85)" />
                            <circle cx="44" cy="40" r="3" fill="rgba(125,211,252,0.55)" />
                            <circle cx="76" cy="40" r="3" fill="rgba(125,211,252,0.55)" />
                            <circle cx="60" cy="24" r="3" fill="rgba(125,211,252,0.55)" />
                            <circle cx="60" cy="56" r="3" fill="rgba(125,211,252,0.55)" />
                          </svg>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollElement>
            </div>
            <div className="w-[52%] -ml-[8%]">
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
                <Image src="/view2.jpeg" alt="Organization workspace" fill priority className="object-cover" />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `
                      radial-gradient(ellipse 65% 65% at 50% 50%, transparent 35%, rgba(var(--bg-color-rgb),0.75) 100%),
                      radial-gradient(ellipse 110% 110% at 0% 0%, rgba(var(--bg-color-rgb),0.85) 0%, transparent 55%),
                      radial-gradient(ellipse 110% 110% at 100% 0%, rgba(var(--bg-color-rgb),0.85) 0%, transparent 55%),
                      radial-gradient(ellipse 110% 110% at 0% 100%, rgba(var(--bg-color-rgb),0.85) 0%, transparent 55%),
                      radial-gradient(ellipse 110% 110% at 100% 100%, rgba(var(--bg-color-rgb),0.85) 0%, transparent 55%),
                      linear-gradient(to bottom, rgba(var(--bg-color-rgb),0.75) 0%, transparent 22%),
                      linear-gradient(to top, rgba(var(--bg-color-rgb),0.75) 0%, transparent 22%),
                      linear-gradient(to right, rgba(var(--bg-color-rgb),0.35) 0%, transparent 14%),
                      linear-gradient(to left, rgba(var(--bg-color-rgb),0.35) 0%, transparent 14%)
                    `,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="organization-continued" className="container mx-auto px-6 pt-12 pb-12 relative z-10 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
            <ScrollElement animation="glitch" duration={0.6}>
              <h3 className="text-2xl font-bold text-white mb-8 text-center">Documentation & Activities</h3>
            </ScrollElement>
            <ScrollElement animation="parallax" delay={0.2} duration={0.8}>
              <div className="flex overflow-hidden w-full relative group">
                  <div className="flex gap-6 animate-scroll group-hover:pause-on-hover w-max">
                    {[...Array(2)].map((_, i) => (
                      <div key={i} className="flex gap-6">
                        {gallery.map((item, idx) => (
                          <div key={`${i}-${idx}`}
                            className="w-72 h-48 relative rounded-xl overflow-hidden border-2 border-slate-700 cursor-pointer"
                            onClick={() => setSelectedImage({ src: item.image, alt: item.alt })}
                          >
                            <Image src={item.image} alt={item.alt} fill className="object-cover hover:scale-110 transition duration-500" />
                            {item.caption && <div className="absolute bottom-0 w-full bg-black/60 p-2 text-xs text-center text-white">{item.caption}</div>}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                  <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none" />
                  <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none" />
              </div>
            </ScrollElement>
        </div>
      </section>
    </>
  );
}
