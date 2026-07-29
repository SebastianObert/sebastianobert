"use client";

import { useState, useEffect } from "react";

const COLORS = [
  { name: "Default Dark", value: "bg-slate-900", thumb: "#0f172a" },
  { name: "Navy", value: "bg-slate-800", thumb: "#1e293b" },
  { name: "Slate", value: "bg-slate-700", thumb: "#334155" },
  { name: "Zinc", value: "bg-zinc-800", thumb: "#27272a" },
  { name: "Stone", value: "bg-stone-800", thumb: "#292524" },
  { name: "Neutral", value: "bg-neutral-800", thumb: "#262626" },
  { name: "Gray", value: "bg-gray-800", thumb: "#1f2937" },
  { name: "Cyan", value: "bg-cyan-900", thumb: "#164e63" },
  { name: "Teal", value: "bg-teal-900", thumb: "#134e4a" },
  { name: "Emerald", value: "bg-emerald-900", thumb: "#064e3b" },
  { name: "Indigo", value: "bg-indigo-900", thumb: "#1e1b4b" },
  { name: "Purple", value: "bg-purple-900", thumb: "#3b0764" },
  { name: "Rose", value: "bg-rose-900", thumb: "#881337" },
  { name: "Amber", value: "bg-amber-900", thumb: "#78350f" },
];

function getSavedBg(): string {
  if (typeof window === "undefined") return "bg-slate-900";
  return localStorage.getItem("phoneBg") || "bg-slate-900";
}

function saveBg(val: string) {
  localStorage.setItem("phoneBg", val);
}

interface PhoneSettingsScreenProps {
  onBack: () => void;
  onBgChange: (bg: string) => void;
  bgColor?: string;
}

export default function PhoneSettingsScreen({ onBack, onBgChange, bgColor }: PhoneSettingsScreenProps) {
  const [selected, setSelected] = useState(getSavedBg);

  useEffect(() => {
    saveBg(selected);
    onBgChange(selected);
  }, [selected, onBgChange]);

  return (
    <div className={`flex-1 flex flex-col overflow-hidden min-h-0 ${bgColor || ""}`}>
      <div className="px-3 py-2 border-b border-slate-700 flex items-center gap-2">
        <button onClick={onBack} className="p-1 rounded hover:bg-slate-700 transition" aria-label="Back">
          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <h3 className="text-white font-semibold text-[11px]">Settings</h3>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-3 scrollbar-thin">
        <p className="text-[9px] text-slate-500 uppercase tracking-wide mb-2">Background Home Screen</p>
        <div className="grid grid-cols-7 gap-2">
          {COLORS.map((c) => (
            <button
              key={c.value}
              onClick={() => setSelected(c.value)}
              className={`w-full aspect-square rounded-lg border-2 transition-all active:scale-90 ${
                selected === c.value ? "border-cyan-400 scale-105 shadow-sm shadow-cyan-400/30" : "border-slate-600 hover:border-slate-500"
              }`}
              style={{ backgroundColor: c.thumb }}
              title={c.name}
            />
          ))}
        </div>
        <p className="text-[9px] text-slate-600 mt-2 text-center">{COLORS.find((c) => c.value === selected)?.name}</p>
      </div>
    </div>
  );
}
