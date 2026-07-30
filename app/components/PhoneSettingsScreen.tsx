"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../lib/auth";
import { isBgPurchased } from "../../lib/store";
import { PREMIUM_BGS } from "../../lib/defaults";

const FREE_COLORS = [
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
  const { user } = useAuth();
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

      <div className="flex-1 overflow-y-auto px-3 py-3 scrollbar-thin space-y-4">
        <div>
          <p className="text-[9px] text-slate-500 uppercase tracking-wide mb-2">Free Backgrounds</p>
          <div className="grid grid-cols-7 gap-2">
            {FREE_COLORS.map((c) => (
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
          <p className="text-[9px] text-slate-600 mt-1 text-center">{FREE_COLORS.find((c) => c.value === selected)?.name}</p>
        </div>

        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <svg className="w-3 h-3 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            <p className="text-[9px] text-slate-500 uppercase tracking-wide">Premium Backgrounds</p>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {PREMIUM_BGS.map((bg) => {
              const owned = user ? isBgPurchased(user.id, bg.value) : false;
              return (
                <button
                  key={bg.id}
                  onClick={() => owned && setSelected(bg.value)}
                  disabled={!owned}
                  className={`relative w-full aspect-square rounded-lg border-2 transition-all active:scale-90 ${
                    !owned
                      ? "border-slate-700 opacity-60 cursor-not-allowed"
                      : selected === bg.value
                        ? "border-cyan-400 scale-105 shadow-sm shadow-cyan-400/30"
                        : "border-slate-600 hover:border-slate-500"
                  }`}
                  title={owned ? bg.name : `${bg.name} (Locked)`}
                >
                  <div className={`w-full h-full rounded-[5px] ${bg.value}`} />
                  {!owned && (
                    <div className="absolute inset-0 bg-black/50 rounded-[5px] flex items-center justify-center">
                      <svg className="w-3 h-3 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
          <p className="text-[9px] text-slate-600 mt-1 text-center">
            {(() => {
              const current = PREMIUM_BGS.find((bg) => bg.value === selected);
              return current ? current.name : "Buy in Store to unlock";
            })()}
          </p>
        </div>
      </div>
    </div>
  );
}
