"use client";

interface PhoneHomeScreenProps {
  onOpenChat: () => void;
  onOpenLuckyBox: () => void;
  onOpenStore: () => void;
  onOpenSettings: () => void;
  bgColor?: string;
}

function AppIcon({ icon }: { icon: string }) {
  switch (icon) {
    case "chat":
      return (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
      );
    case "whatsapp":
      return (
        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      );
    case "instagram":
      return (
        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
      );
    case "linkedin":
      return (
        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 21.227.792 22 1.771 22h20.451C23.2 22 24 21.227 24 20.271V1.729C24 .774 23.2 0 22.225 0z"/></svg>
      );
    case "phone":
      return (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
      );
    case "camera":
      return (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
      );
    case "gallery":
      return (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
      );
    case "luckybox":
      return (
        <svg viewBox="0 0 64 64" className="w-7 h-7">
          <rect x="14" y="30" width="36" height="26" rx="3" fill="#f59e0b" />
          <rect x="10" y="24" width="44" height="8" rx="3" fill="#fbbf24" />
          <rect x="30" y="24" width="4" height="32" rx="1" fill="#ef4444" />
          <rect x="14" y="30" width="4" height="26" rx="1" fill="#ef4444" />
          <rect x="46" y="30" width="4" height="26" rx="1" fill="#ef4444" />
          <ellipse cx="32" cy="24" rx="7" ry="4.5" fill="#f87171" />
          <ellipse cx="27" cy="22" rx="4.5" ry="3.5" fill="#f87171" transform="rotate(-20 27 22)" />
          <ellipse cx="37" cy="22" rx="4.5" ry="3.5" fill="#f87171" transform="rotate(20 37 22)" />
          <circle cx="32" cy="22" r="2" fill="#b91c1c" />
          <text x="32" y="48" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" fontFamily="monospace">?</text>
        </svg>
      );
    case "store":
      return (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" /></svg>
      );
    case "settings":
      return (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
      );
    case "calendar":
      return (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
      );
    case "maps":
      return (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
      );
    case "notes":
      return (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
      );
    case "clock":
      return (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      );
    case "weather":
      return (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>
      );
    case "calculator":
      return (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
      );
    case "email":
      return (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
      );
    case "music":
      return (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg>
      );
    case "photos":
      return (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
      );
    default:
      return null;
  }
}

const MAIN_APPS: { name: string; icon: string; color: string; action: string; url?: string }[] = [
  { name: "WhatsApp", icon: "whatsapp", color: "bg-green-500", action: "link", url: "https://wa.me/6281314412184" },
  { name: "Instagram", icon: "instagram", color: "bg-gradient-to-br from-pink-500 via-purple-500 to-orange-400", action: "link", url: "https://instagram.com/sebasobet" },
  { name: "Calendar", icon: "calendar", color: "bg-red-500", action: "none" },
  { name: "Maps", icon: "maps", color: "bg-emerald-600", action: "none" },
  { name: "LinkedIn", icon: "linkedin", color: "bg-blue-600", action: "link", url: "https://www.linkedin.com/in/sebastian-obert-cen/" },
  { name: "Notes", icon: "notes", color: "bg-yellow-600", action: "none" },
  { name: "Clock", icon: "clock", color: "bg-blue-500", action: "none" },
  { name: "Weather", icon: "weather", color: "bg-sky-400", action: "none" },
  { name: "Calculator", icon: "calculator", color: "bg-gray-600", action: "none" },
  { name: "Email", icon: "email", color: "bg-indigo-500", action: "none" },
  { name: "Music", icon: "music", color: "bg-rose-500", action: "none" },
  { name: "Photos", icon: "photos", color: "bg-violet-500", action: "none" },
  { name: "Lucky Box", icon: "luckybox", color: "bg-amber-800/70", action: "luckybox" },
  { name: "Store", icon: "store", color: "bg-cyan-700/80", action: "store" },
  { name: "Chat", icon: "chat", color: "bg-emerald-500", action: "chat" },
];

const DOCK_APPS: { name: string; icon: string; color: string; action: string; url?: string }[] = [
  { name: "Settings", icon: "settings", color: "bg-slate-500", action: "settings" },
  { name: "Phone", icon: "phone", color: "bg-green-600", action: "none" },
  { name: "Camera", icon: "camera", color: "bg-slate-600", action: "none" },
];

export default function PhoneHomeScreen({ onOpenChat, onOpenLuckyBox, onOpenStore, onOpenSettings, bgColor }: PhoneHomeScreenProps) {
  return (
    <div className={`flex-1 flex flex-col min-h-0 ${bgColor || ""}`}>
      <div className="flex-1 overflow-y-auto py-3 px-4 scrollbar-thin min-h-0">
        <div className="grid grid-cols-4 gap-x-3 gap-y-4">
          {MAIN_APPS.map((app) => {
            const isClickable = app.action === "chat" || app.action === "luckybox" || app.action === "store" || app.action === "link";
            return (
              <button
                key={app.name}
                onClick={() => {
                  if (app.action === "chat") onOpenChat();
                  else if (app.action === "luckybox") onOpenLuckyBox();
                  else if (app.action === "store") onOpenStore();
                  else if (app.action === "link" && app.url) window.open(app.url, "_blank");
                }}
                disabled={!isClickable}
                className={`flex flex-col items-center gap-1 ${isClickable ? "cursor-pointer active:scale-90 transition-transform" : "opacity-30 pointer-events-none"}`}
              >
                <div className={`w-12 h-12 rounded-[14px] ${app.color} flex items-center justify-center shadow-lg`}>
                  <AppIcon icon={app.icon} />
                </div>
                <span className="text-[10px] text-slate-300 leading-tight text-center">{app.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dock — bottom */}
      <div className="flex items-center justify-center gap-5 pt-3 pb-1 flex-shrink-0">
        {DOCK_APPS.map((app) => {
          const isClickable = app.action === "chat" || app.action === "link" || app.action === "settings";
          return (
            <button
              key={app.name}
              onClick={() => {
                if (app.action === "chat") onOpenChat();
                else if (app.action === "settings") onOpenSettings();
                else if (app.action === "link" && app.url) window.open(app.url, "_blank");
              }}
              disabled={!isClickable}
              className={`flex flex-col items-center gap-1 ${isClickable ? "cursor-pointer active:scale-90 transition-transform" : "opacity-30 pointer-events-none"}`}
            >
              <div className={`w-12 h-12 rounded-[14px] ${app.color} flex items-center justify-center shadow-lg`}>
                <AppIcon icon={app.icon} />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
