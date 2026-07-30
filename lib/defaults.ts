export interface Profile {
  greeting: string;
  name: string;
  tagline: string;
  description: string;
  focusText: string;
  profileImage: string;
  brandName: string;
  githubUrl: string;
}

export interface Project {
  slug: string;
  name: string;
  description: string;
  image: string | null;
  imageAlt: string | null;
  videoSrc: string | null;
  videoPoster: string | null;
  projectUrl: string | null;
  githubUrl?: string | null;
  accentColor: string;
  gridSpan: string;
  layoutDirection: string;
  hasImageClick: boolean;
  sortOrder: number;
  tags: string[];
}

export interface Skill {
  name: string;
  icon: string;
  iconType: string;
  category: string;
  sortOrder: number;
}

export interface Organization {
  slug: string;
  name: string;
  fullName: string;
  logo: string | null;
  logoAlt: string | null;
  role: string;
  dateRange: string;
  description: string;
  sortOrder: number;
}

export interface GalleryItem {
  image: string;
  alt: string;
  caption: string | null;
  sortOrder: number;
}

export interface SocialLink {
  platform: string;
  url: string;
  iconType: string;
  iconUrl: string | null;
  hoverColor: string | null;
  sortOrder: number;
}

export interface NavLink {
  label: string;
  href: string;
  sortOrder: number;
}

export interface SeoMetadata {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string | null;
  canonicalUrl: string | null;
}

export interface ChatResponse {
  reply: string;
  sessionId: string;
  chips: string[];
  limitReached?: boolean;
}

export interface SessionDto {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messageCount: number;
}

export interface MessageDto {
  id: string;
  role: string;
  content: string;
  createdAt: string;
}

export const DEFAULT_PROFILE: Profile = {
  greeting: "HELLO, FOLKS! 👋",
  name: "Sebastian Obert",
  tagline: "A third-year Informatics student at Multimedia Nusantara University.",
  description: "I build end-to-end digital solutions, from Android applications and interactive web platforms to backend systems. Specialized in cross-platform development with a user-centric design approach and security-first mindset.",
  focusText: "Currently focused on continuous learning and practical implementation in mobile development, game logic, and AI/Machine Learning.",
  profileImage: "/profil_sebastian.jpeg",
  brandName: "SoC",
  githubUrl: "https://github.com/SebastianObert",
};

export const DEFAULT_PROJECTS: Project[] = [
  { slug: "nexbuy", name: "NexBuy", description: "Developed an AI-enhanced marketplace focused on secure group buy campaigns, enabling creators and collectors to manage projects with AI-powered prediction, anomaly detection, and transparent escrow workflows.", image: "/nexbuy.jpeg", imageAlt: "NexBuy Platform", videoSrc: null, videoPoster: null, projectUrl: "https://nexbuy-platform.vercel.app", githubUrl: "https://github.com/SebastianObert/nexbuy-platform", accentColor: "cyan", gridSpan: "md:col-span-3", layoutDirection: "flex-row", hasImageClick: true, sortOrder: 0, tags: ["Next.js", "Python", "TypeScript", "Tailwind CSS"] },
  { slug: "aegis", name: "Aegis Call", description: "Aegis Call is an integrated emergency response application prototype designed using a User-Centered Design approach to ensure ease of use, speed, and clarity in critical situations.", image: "/aegis.png", imageAlt: "Aegis Call UI", videoSrc: null, videoPoster: null, projectUrl: "https://www.figma.com/proto/qLd5xU8g1rZm0nehm53wqV/UAS-HCI?node-id=605-4407", accentColor: "orange", gridSpan: "md:col-span-1", layoutDirection: "column", hasImageClick: true, sortOrder: 1, tags: ["Figma", "UI/UX"] },
  { slug: "jebs", name: "JEBS", description: "JEBS is a third-person Action-RPG combat prototype that successfully delivers an intense, skill-based sword-fighting experience.", image: null, imageAlt: null, videoSrc: "/trailer.mp4", videoPoster: "/jebs.png", projectUrl: "https://sebastian-obert-95634.itch.io/jebs-umn", accentColor: "purple", gridSpan: "md:col-span-1", layoutDirection: "column", hasImageClick: false, sortOrder: 2, tags: ["Unity", "C#"] },
  { slug: "grow", name: "Grow Community", description: "This application provides an integrated, secure, and efficient solution for managing children's check-in and check-out activities in a church environment.", image: "/grow_church.png", imageAlt: "Grow Community", videoSrc: null, videoPoster: null, projectUrl: "https://share.google/r5Mqn1b554MBURZj2", accentColor: "blue", gridSpan: "md:col-span-1", layoutDirection: "column", hasImageClick: true, sortOrder: 3, tags: ["PHP", "Laravel", "MySQL"] },
  { slug: "aircare", name: "AirCare Mobile App", description: "AirCare is a mobile application designed to help users monitor and understand air quality around them in real time.", image: "/aircare_mobile.png", imageAlt: "AirCare App", videoSrc: null, videoPoster: null, projectUrl: "https://github.com/SebastianObert/AirCare", accentColor: "cyan", gridSpan: "md:col-span-1", layoutDirection: "column", hasImageClick: true, sortOrder: 4, tags: ["Kotlin", "Firebase"] },
  { slug: "aljatim", name: "Al-Jatim Web Platform", description: "Al-Jatim is a web-based application designed to introduce and showcase East Java through an informative and visually engaging digital platform.", image: "/aljatim.png", imageAlt: "Al-Jatim Web Platform", videoSrc: null, videoPoster: null, projectUrl: "https://all-jatim.vercel.app/", accentColor: "teal", gridSpan: "md:col-span-3", layoutDirection: "flex-row", hasImageClick: true, sortOrder: 5, tags: ["React.js", "Tailwind CSS", "Interactive"] },
  { slug: "dataviz", name: "Air Quality Data Visualization of Jakarta", description: "Analyzes air quality trends in DKI Jakarta (2016-2023) using Tableau.", image: "/datviz.png", imageAlt: "Air Quality Data Visualization", videoSrc: null, videoPoster: null, projectUrl: "https://public.tableau.com/app/profile/sebastian.obert/viz/dashboard1_17651964590990/", accentColor: "pink", gridSpan: "md:col-span-3", layoutDirection: "flex-row", hasImageClick: true, sortOrder: 6, tags: ["Tableau", "Data Visualization"] },
  { slug: "indotext", name: "Indo-Text Classification", description: "A Natural Language Processing project that analyzes Indonesian forum discussions for sentiment analysis, emotion detection, and toxicity classification.", image: "/machinelearning.png", imageAlt: "Indo-Text Classification", videoSrc: null, videoPoster: null, projectUrl: "https://github.com/SebastianObert/indo-text-classification", accentColor: "emerald", gridSpan: "md:col-span-3", layoutDirection: "flex-row", hasImageClick: true, sortOrder: 7, tags: ["Python", "Scikit-learn", "NLP", "Machine Learning"] },
  { slug: "attendance", name: "Digital Attendance System", description: "Developed a desktop-based Digital Attendance System that streamlines class management, attendance tracking, and attendance reporting for teachers and students using ADO.NET, LINQ, SQL Server, and Crystal Reports.", image: "/attendance.jpeg", imageAlt: "Digital Attendance System", videoSrc: null, videoPoster: null, projectUrl: "https://github.com/MATYUS05/DigitalAttendanceSystem", accentColor: "blue", gridSpan: "md:col-span-3", layoutDirection: "flex-row", hasImageClick: true, sortOrder: 8, tags: ["C#", "ADO.NET", "LINQ", "SQL Server"] },
  { slug: "snort", name: "SSH Brute Force Detection", description: "An experimental cybersecurity project analyzing the effectiveness of Snort IDS in detecting SSH brute force attacks.", image: null, imageAlt: null, videoSrc: "/snort_demo.mp4", videoPoster: null, projectUrl: null, accentColor: "red", gridSpan: "md:col-span-3", layoutDirection: "flex-row", hasImageClick: false, sortOrder: 9, tags: ["Snort IDS", "Kali Linux", "Cybersecurity"] },
];

export const DEFAULT_SKILLS: Skill[] = [
  { name: "Kotlin", icon: "https://cdn.simpleicons.org/kotlin/7F52FF", iconType: "simpleicons_url", category: "Mobile Development", sortOrder: 1 },
  { name: "Unity", icon: "https://cdn.simpleicons.org/unity/white", iconType: "simpleicons_url", category: "Game Development", sortOrder: 2 },
  { name: "C#", icon: "/csharp.svg", iconType: "local_image", category: "Backend & Database", sortOrder: 3 },
  { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs/white", iconType: "simpleicons_url", category: "Web Frontend", sortOrder: 4 },
  { name: "React", icon: "https://cdn.simpleicons.org/react/61DAFB", iconType: "simpleicons_url", category: "Web Frontend", sortOrder: 5 },
  { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript/3178C6", iconType: "simpleicons_url", category: "Web Frontend", sortOrder: 6 },
  { name: "Tailwind", icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4", iconType: "simpleicons_url", category: "Web Frontend", sortOrder: 7 },
  { name: "Java", icon: "/java.png", iconType: "local_image", category: "Backend & Database", sortOrder: 8 },
  { name: "Firebase", icon: "https://cdn.simpleicons.org/firebase/FFCA28", iconType: "simpleicons_url", category: "Backend & Database", sortOrder: 9 },
  { name: "PHP", icon: "https://cdn.simpleicons.org/php/777BB4", iconType: "simpleicons_url", category: "Backend & Database", sortOrder: 10 },
  { name: "Laravel", icon: "https://cdn.simpleicons.org/laravel/FF2D20", iconType: "simpleicons_url", category: "Backend & Database", sortOrder: 11 },
  { name: "MySQL", icon: "https://cdn.simpleicons.org/mysql/4479A1", iconType: "simpleicons_url", category: "Backend & Database", sortOrder: 12 },
  { name: "Python", icon: "https://cdn.simpleicons.org/python/3776AB", iconType: "simpleicons_url", category: "Data Analysis", sortOrder: 13 },
  { name: "RStudio", icon: "/rstudio.webp", iconType: "local_image", category: "Data Analysis", sortOrder: 14 },
  { name: "Tableau", icon: "/tableau.jpg", iconType: "local_image", category: "Data Visualization", sortOrder: 15 },
  { name: "Figma", icon: "https://cdn.simpleicons.org/figma/F24E1E", iconType: "simpleicons_url", category: "UI/UX Design", sortOrder: 16 },
  { name: "Kali Linux", icon: "https://cdn.simpleicons.org/kalilinux/557C94", iconType: "simpleicons_url", category: "Cybersecurity", sortOrder: 17 },
  { name: "Snort", icon: "https://cdn.simpleicons.org/snort/EC1C24", iconType: "simpleicons_url", category: "Cybersecurity", sortOrder: 18 },
];

export const DEFAULT_ORGANIZATIONS: Organization[] = [
  { slug: "ahm", name: "AHM", fullName: "PT Astra Honda Motor", logo: "/ahm.jpeg", logoAlt: "Logo AHM", role: "IT Application Developer", dateRange: "Jun 2026 - Present", description: "Developing and maintaining internal web applications to support business operations. Collaborating with cross-functional teams to deliver scalable IT solutions that improve workflow efficiency and data management.", sortOrder: 0 },
  { slug: "kspm", name: "KSPM UMN", fullName: "Kelompok Studi Pasar Modal", logo: "/kspm.jpg", logoAlt: "Logo KSPM", role: "Internal Education", dateRange: "Apr 2025 - Dec 2025", description: "Developed weekly investment-related educational content and delivered capital market presentations while simplifying complex financial concepts into practical insights for members.", sortOrder: 1 },
  { slug: "commfest", name: "COMMFEST UMN 2025", fullName: "Communication Festival", logo: "/commfest.jpg", logoAlt: "Logo COMMFEST", role: "Equipment", dateRange: "Mar 2025 - Nov 2025", description: "Managed event equipment and logistics to support operational needs and ensure the smooth execution of the festival.", sortOrder: 2 },
  { slug: "umnfest", name: "UFEST 2024", fullName: "UMN Festival", logo: "/ufest.jpg", logoAlt: "Logo UMN Fest", role: "Competition", dateRange: "Oct 2024 - Dec 2024", description: "Supported sports competition operations by assisting with match administration and on-field coordination.", sortOrder: 3 },
];

export const DEFAULT_GALLERY: GalleryItem[] = [
  { image: "/spm.jpg", alt: "Event 1", caption: "Sekolah Pasar Modal", sortOrder: 1 },
  { image: "/closingcommfest.jpg", alt: "Event 2", caption: "COMMFEST 2025", sortOrder: 2 },
  { image: "/ufestt.jpg", alt: "Event 3", caption: "UMN Festival 2024", sortOrder: 3 },
  { image: "/state.jpg", alt: "Event 4", caption: "STATE KSPM", sortOrder: 4 },
  { image: "/pkm.jpg", alt: "Event 5", caption: "PKM", sortOrder: 5 },
];

export const DEFAULT_CONTACT: SocialLink[] = [
  { platform: "Instagram", url: "https://instagram.com/sebasobet", iconType: "simpleicons_url", iconUrl: "https://cdn.simpleicons.org/instagram/E4405F", hoverColor: "#E4405F", sortOrder: 1 },
  { platform: "WhatsApp", url: "https://wa.me/6281314412184", iconType: "simpleicons_url", iconUrl: "https://cdn.simpleicons.org/whatsapp/25D366", hoverColor: "#25D366", sortOrder: 2 },
  { platform: "LINE", url: "https://line.me/ti/p/~sebastianobert", iconType: "simpleicons_url", iconUrl: "https://cdn.simpleicons.org/line/00C300", hoverColor: "#00C300", sortOrder: 3 },
  { platform: "LinkedIn", url: "https://www.linkedin.com/in/sebastian-obert-cen/", iconType: "inline_svg", iconUrl: null, hoverColor: "#0A66C2", sortOrder: 4 },
];

export const DEFAULT_NAV: NavLink[] = [
  { label: "About", href: "#about", sortOrder: 1 },
  { label: "Projects", href: "#projects", sortOrder: 2 },
  { label: "Experience", href: "#experience", sortOrder: 3 },
  { label: "Ask AI", href: "#ask-ai", sortOrder: 4 },
];

export const DEFAULT_SEO: SeoMetadata = {
  title: "Sebastian Obert | Portfolio",
  description: "Portfolio of Sebastian Obert - Informatics student at Multimedia Nusantara University. Specialized in cross-platform development with a user-centric design approach.",
  keywords: ["Sebastian Obert", "portfolio", "web developer", "mobile developer", "Next.js", "React", "TypeScript", "Kotlin", "UMN", "Informatics"],
  ogImage: "/og-image.png",
  canonicalUrl: "https://sebastianobert.vercel.app",
};

export const CHAT_BASE_LIMIT = 3;

export const RARITY_COIN_VALUE: Record<string, number> = {
  Common: 1,
  Rare: 3,
  Epic: 7,
  Legendary: 15,
  Mythic: 30,
};

export const ENERGY_PACKS = [
  { amount: 1, price: 2, label: "1 Energy" },
  { amount: 5, price: 8, label: "5 Energy" },
  { amount: 10, price: 15, label: "10 Energy" },
  { amount: 25, price: 30, label: "25 Energy" },
];

export interface PremiumBg {
  id: string;
  name: string;
  value: string;
  thumb: string;
  price: number;
}

export const PREMIUM_BGS: PremiumBg[] = [
  { id: "sunset",   name: "Sunset",   value: "bg-gradient-to-br from-orange-950 via-orange-700 to-orange-400",   thumb: "linear-gradient(135deg, #431407, #c2410c, #fb923c)", price: 5 },
  { id: "ocean",    name: "Ocean",    value: "bg-gradient-to-br from-cyan-950 via-cyan-700 to-cyan-400",         thumb: "linear-gradient(135deg, #083344, #0e7490, #22d3ee)", price: 5 },
  { id: "forest",   name: "Forest",   value: "bg-gradient-to-br from-emerald-950 via-emerald-700 to-emerald-400",thumb: "linear-gradient(135deg, #022c22, #047857, #34d399)", price: 8 },
  { id: "midnight", name: "Midnight", value: "bg-gradient-to-br from-indigo-950 via-indigo-700 to-indigo-400",   thumb: "linear-gradient(135deg, #1e1b4b, #4338ca, #818cf8)", price: 8 },
  { id: "aurora",   name: "Aurora",   value: "bg-gradient-to-br from-teal-950 via-teal-700 to-teal-400",         thumb: "linear-gradient(135deg, #042f2e, #0f766e, #2dd4bf)", price: 10 },
  { id: "cherry",   name: "Cherry",   value: "bg-gradient-to-br from-pink-950 via-pink-700 to-pink-400",         thumb: "linear-gradient(135deg, #500724, #be185d, #f472b6)", price: 10 },
  { id: "neon",     name: "Neon",     value: "bg-gradient-to-br from-fuchsia-950 via-fuchsia-700 to-fuchsia-400",thumb: "linear-gradient(135deg, #4a044e, #a21caf, #e879f9)", price: 12 },
  { id: "golden",   name: "Golden",   value: "bg-gradient-to-br from-yellow-950 via-yellow-700 to-yellow-400",   thumb: "linear-gradient(135deg, #422006, #a16207, #facc15)", price: 15 },
];
