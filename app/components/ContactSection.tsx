"use client";

import { useState, useEffect } from "react";
import ScrollElement from "./ScrollElement";
import { api, SocialLink } from "../../lib/api";

interface ContactSectionProps {
  expandedSocial: string | null;
  setExpandedSocial: (social: string | null) => void;
}

const HOVER_COLORS: Record<string, { border: string; shadow: string; text: string; iconColor: string }> = {
  Instagram: { border: "hover:border-pink-500", shadow: "hover:shadow-pink-500/20", text: "group-hover:text-pink-400", iconColor: "E4405F" },
  WhatsApp: { border: "hover:border-green-500", shadow: "hover:shadow-green-500/20", text: "group-hover:text-green-400", iconColor: "25D366" },
  LINE: { border: "hover:border-green-400", shadow: "hover:shadow-green-400/20", text: "group-hover:text-green-300", iconColor: "00C300" },
  LinkedIn: { border: "hover:border-blue-500", shadow: "hover:shadow-blue-500/20", text: "group-hover:text-blue-400", iconColor: "0A66C2" },
};

const WIDTHS: Record<string, string> = {
  Instagram: "w-[130px] min-w-[130px]",
  WhatsApp: "w-[135px] min-w-[135px]",
  LINE: "w-[95px] min-w-[95px]",
  LinkedIn: "w-[120px]",
};

function LinkedInSvg() {
  return (
    <svg role="img" viewBox="0 0 24 24" className="w-6 h-6 fill-[#0A66C2]" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 21.227.792 22 1.771 22h20.451C23.2 22 24 21.227 24 20.271V1.729C24 .774 23.2 0 22.225 0z"/>
    </svg>
  );
}

export default function ContactSection({ expandedSocial, setExpandedSocial }: ContactSectionProps) {
  const [socials, setSocials] = useState<SocialLink[]>([]);

  useEffect(() => {
    api.getContact().then(setSocials);
  }, []);

  return (
    <section id="contact" className="container mx-auto px-6 pt-24 pb-12 relative z-10 border-t border-slate-800/50">
      <ScrollElement animation="scale-blur" duration={0.9}>
        <div className="text-center max-w-2xl mx-auto">
           <h2 className="text-3xl font-bold text-white mb-6">Let&apos;s Connect</h2>
           <p className="text-slate-400 mb-8">
             Interested in collaborating or just want to say hello? Feel free to reach out to me through the platforms below.
           </p>

           <div className="flex flex-wrap justify-center gap-6">
             {socials.map((social) => {
               const hc = HOVER_COLORS[social.platform] || HOVER_COLORS.Instagram;
               const widthClass = WIDTHS[social.platform] || "w-[130px] min-w-[130px]";
               const isExpanded = expandedSocial === social.platform;
               const closedWidth = social.platform === "LinkedIn" ? "w-[50px] hover:w-[120px]" : "w-[50px] min-w-[50px] hover:w-[130px]";

               return (
                 <a key={social.platform}
                   data-social-icon
                   href={social.url}
                   target="_blank"
                   onClick={(e) => {
                     if (window.innerWidth < 768 && expandedSocial !== social.platform) {
                       e.preventDefault();
                       e.stopPropagation();
                       setExpandedSocial(social.platform);
                     }
                   }}
                   className={`group relative flex items-center justify-center py-2.5 rounded-full bg-slate-800 border border-slate-700 ${hc.border} hover:shadow-lg ${hc.shadow} transition-all duration-300 overflow-hidden ${isExpanded ? widthClass : closedWidth}`}
                 >
                   <div className={`absolute left-1/2 -translate-x-1/2 transition-all duration-300 ${isExpanded ? 'left-4 translate-x-0' : 'group-hover:left-4 group-hover:translate-x-0'}`}>
                     {social.iconType === "inline_svg" ? (
                       <LinkedInSvg />
                     ) : social.iconUrl ? (
                       <img src={social.iconUrl} alt={social.platform} className="w-6 h-6" />
                     ) : null}
                   </div>
                   <span className={`ml-auto pr-4 whitespace-nowrap text-slate-400 ${hc.text} font-medium transition-all duration-300 text-sm ${isExpanded ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                     {social.platform}
                   </span>
                 </a>
               );
             })}
           </div>
        </div>
      </ScrollElement>
    </section>
  );
}
