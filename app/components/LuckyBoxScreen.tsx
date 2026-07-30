"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { useAuth } from "../../lib/auth";
import { fetchInventory, addToInventory, recordSpin, fetchSpinHistory } from "../../lib/luckybox";
import type { InventoryItem, SpinRecord } from "../../lib/luckybox";

export type Rarity = "Common" | "Rare" | "Epic" | "Legendary" | "Mythic";
type Phase = "idle" | "spinning" | "reveal" | "catalogue" | "inventory";

interface LuckyBoxScreenProps {
  onBack: () => void;
  isFullscreen?: boolean;
}

interface ItemDef {
  name: string;
  rarity: Rarity;
}

const ITEM_POOL: ItemDef[] = [
  { name: "The Seeker", rarity: "Common" },
  { name: "The Observer", rarity: "Common" },
  { name: "The Drifter", rarity: "Common" },
  { name: "The Scholar", rarity: "Common" },
  { name: "The Wanderer", rarity: "Common" },
  { name: "The Rebel", rarity: "Rare" },
  { name: "The Survivor", rarity: "Rare" },
  { name: "The Challenger", rarity: "Rare" },
  { name: "The Outcast", rarity: "Rare" },
  { name: "Those Who Adapt", rarity: "Rare" },
  { name: "The Artificial", rarity: "Legendary" },
  { name: "The Awakened One", rarity: "Epic" },
  { name: "Those Who Remain", rarity: "Epic" },
  { name: "The Catalyst", rarity: "Epic" },
  { name: "The Vanguard", rarity: "Epic" },
  { name: "The Visionary", rarity: "Epic" },
  { name: "The King", rarity: "Legendary" },
  { name: "The Chosen One", rarity: "Legendary" },
  { name: "Divine General", rarity: "Legendary" },
  { name: "The Mastermind", rarity: "Legendary" },
  { name: "The Emperor", rarity: "Legendary" },
  { name: "\u2605 The Absolute \u2605", rarity: "Mythic" },
  { name: "\u2605 The Anomaly \u2605", rarity: "Mythic" },
  { name: "\u2605 The Singularity \u2605", rarity: "Mythic" },
  { name: "\u2605 The Origin \u2605", rarity: "Mythic" },
];

const DAILY_SPIN_LIMIT = 3;
const SPIN_COOLDOWN_HOURS = 24;

function pickByRarity(): ItemDef {
  const r = Math.random() * 100;
  let pool: ItemDef[];
  if (r < 50) pool = ITEM_POOL.filter((i) => i.rarity === "Common");
  else if (r < 80) pool = ITEM_POOL.filter((i) => i.rarity === "Rare");
  else if (r < 94) pool = ITEM_POOL.filter((i) => i.rarity === "Epic");
  else if (r < 99) pool = ITEM_POOL.filter((i) => i.rarity === "Legendary");
  else pool = ITEM_POOL.filter((i) => i.rarity === "Mythic");
  return pool[Math.floor(Math.random() * pool.length)];
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickWheelItems(result: ItemDef, count: number): ItemDef[] {
  const others = ITEM_POOL.filter((i) => i.name !== result.name);
  const shuffled = shuffle(others);
  const picked = [result, ...shuffled.slice(0, count - 1)];
  return shuffle(picked);
}

const RARITY_COLORS: Record<Rarity, string> = {
  Common: "#64748b",
  Rare: "#3b82f6",
  Epic: "#a855f7",
  Legendary: "#f59e0b",
  Mythic: "#ef4444",
};

const RARITY_STROKES: Record<Rarity, string> = {
  Common: "#475569",
  Rare: "#2563eb",
  Epic: "#9333ea",
  Legendary: "#d97706",
  Mythic: "#dc2626",
};

interface RarityEffectConfig {
  particleCount: number;
  particleSize: string;
  rays: boolean;
  shake: boolean;
  flash: boolean;
  flashColor: string;
  glowPulse: boolean;
  zoomPunch: boolean;
}

const RARITY_EFFECTS: Record<Rarity, RarityEffectConfig> = {
  Common:    { particleCount: 6,  particleSize: "w-1 h-1",     rays: false, shake: false, flash: false, flashColor: "",                    glowPulse: false, zoomPunch: false },
  Rare:      { particleCount: 10, particleSize: "w-1.5 h-1.5", rays: false, shake: false, flash: true,  flashColor: "rgba(59,130,246,0.25)", glowPulse: true,  zoomPunch: false },
  Epic:      { particleCount: 16, particleSize: "w-1.5 h-1.5", rays: false, shake: false, flash: true,  flashColor: "rgba(168,85,247,0.3)",  glowPulse: true,  zoomPunch: true  },
  Legendary: { particleCount: 22, particleSize: "w-2 h-2",     rays: true,  shake: true,  flash: true,  flashColor: "rgba(245,158,11,0.35)", glowPulse: true,  zoomPunch: true  },
  Mythic:    { particleCount: 30, particleSize: "w-2 h-2",     rays: true,  shake: true,  flash: true,  flashColor: "rgba(239,68,68,0.4)",   glowPulse: true,  zoomPunch: true  },
};

const CX = 100;
const CY = 100;
const R = 86;
const DEG = Math.PI / 180;

function buildSegments(items: ItemDef[]) {
  const n = items.length;
  const span = 360 / n;
  const segs: {
    path: string; color: string; stroke: string; item: ItemDef;
    midAngle: number; label: string; labelR: number; labelSize: number; span: number;
  }[] = [];
  let angle = -90;
  for (const item of items) {
    const start = angle;
    const end = angle + span;
    const x1 = CX + R * Math.cos(start * DEG);
    const y1 = CY + R * Math.sin(start * DEG);
    const x2 = CX + R * Math.cos(end * DEG);
    const y2 = CY + R * Math.sin(end * DEG);
    const largeArc = span > 180 ? 1 : 0;
    const path = `M${CX} ${CY} L${x1} ${y1} A${R} ${R} 0 ${largeArc} 1 ${x2} ${y2} Z`;
    const midAngle = start + span / 2;
    const shortName = item.name.replace(/[\u2605]/g, "").trim();
    const parts = shortName.split(" ");
    const label = parts.length > 1 ? parts[0] : shortName;
    const labelR = R * 0.55;
    const labelSize = span > 50 ? 8 : span > 30 ? 7 : 6;
    segs.push({ path, color: RARITY_COLORS[item.rarity], stroke: RARITY_STROKES[item.rarity], item, midAngle, label, labelR, labelSize, span });
    angle = end;
  }
  return segs;
}

function WheelSvg({ items, isFullscreen }: { items: ItemDef[]; isFullscreen?: boolean }) {
  const segs = useMemo(() => buildSegments(items), [items]);
  return (
    <svg viewBox="0 0 200 200" className={`${isFullscreen ? "w-80 h-80" : "w-48 h-48"}`} style={{ display: "block" }}>
      {segs.map((seg, i) => (
        <path key={i} d={seg.path} fill={seg.color} stroke={seg.stroke} strokeWidth="1.5" />
      ))}
      {segs.map((seg, i) => {
        const rad = seg.midAngle * DEG;
        const lx = CX + seg.labelR * Math.cos(rad);
        const ly = CY + seg.labelR * Math.sin(rad);
        return (
          <text
            key={`l${i}`}
            x={lx}
            y={ly}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="white"
            fontSize={seg.labelSize}
            fontWeight="bold"
            fontFamily="monospace"
            transform={`rotate(${seg.midAngle}, ${lx}, ${ly})`}
            className="pointer-events-none select-none"
          >
            {seg.label}
          </text>
        );
      })}
      <circle cx={CX} cy={CY} r="14" fill="#1e293b" stroke="#475569" strokeWidth="2" />
      <circle cx={CX} cy={CY} r="6" fill="#94a3b8" />
    </svg>
  );
}

function Pointer() {
  return (
    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1.5 z-10">
      <svg width="20" height="26" viewBox="0 0 20 26">
        <polygon points="10,26 0,0 20,0" fill="#f59e0b" stroke="#d97706" strokeWidth="1.5" />
        <polygon points="10,22 3,3 17,3" fill="#fbbf24" />
      </svg>
    </div>
  );
}

function SparkleBurst({ color, count = 12, size = "w-1.5 h-1.5" }: { color: string; count?: number; size?: string }) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * 360;
        return (
          <div
            key={i}
            className={`absolute ${size} rounded-full`}
            style={{
              backgroundColor: color,
              top: "50%",
              left: "50%",
              transform: `rotate(${angle}deg)`,
              animation: `sparkle-fade 0.7s ease-out ${i * (0.5 / count)}s forwards`,
              opacity: 0,
            }}
          />
        );
      })}
    </div>
  );
}

function RadialRays({ color, size = 220 }: { color: string; size?: number }) {
  const rayCount = 16;
  return (
    <svg
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      width={size}
      height={size}
      viewBox="0 0 200 200"
      style={{ animation: "rays-spin 6s linear infinite", opacity: 0.35 }}
    >
      {Array.from({ length: rayCount }, (_, i) => {
        const angle = (i / rayCount) * 360;
        return <rect key={i} x="99" y="0" width="2" height="100" fill={color} transform={`rotate(${angle}, 100, 100)`} />;
      })}
    </svg>
  );
}

function ScreenFlash({ color }: { color: string }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none z-20"
      style={{ backgroundColor: color, animation: "flash-fade 0.5s ease-out forwards" }}
    />
  );
}

function GlowPulseRing({ color }: { color: string }) {
  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: 220,
        height: 220,
        border: `2px solid ${color}`,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        animation: "ring-pulse 1s ease-out",
      }}
    />
  );
}

export default function LuckyBoxScreen({ onBack, isFullscreen }: LuckyBoxScreenProps) {
  const { user } = useAuth();
  const [phase, setPhase] = useState<Phase>("idle");
  const [result, setResult] = useState<ItemDef | null>(null);
  const [rotation, setRotation] = useState(0);
  const [wheelItems, setWheelItems] = useState<ItemDef[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [spinHistory, setSpinHistory] = useState<SpinRecord[]>([]);
  const [key, setKey] = useState(0);

  const todaySpins = useMemo(() => {
    const since = Date.now() - SPIN_COOLDOWN_HOURS * 60 * 60 * 1000;
    return spinHistory.filter((h) => new Date(h.spun_at).getTime() > since).length;
  }, [spinHistory]);
  const remainingSpins = Math.max(0, DAILY_SPIN_LIMIT - todaySpins);

  const hasNextSpin = !user || remainingSpins > 0;
  const nextSpinTime = useMemo(() => {
    if (remainingSpins > 0 || spinHistory.length === 0) return null;
    const sorted = [...spinHistory].sort((a, b) => new Date(b.spun_at).getTime() - new Date(a.spun_at).getTime());
    const oldest = new Date(sorted[Math.min(DAILY_SPIN_LIMIT - 1, sorted.length - 1)]?.spun_at || 0);
    return new Date(oldest.getTime() + SPIN_COOLDOWN_HOURS * 60 * 60 * 1000);
  }, [spinHistory]);

  useEffect(() => {
    if (!user) return;
    fetchInventory(user.id).then(setInventory);
    fetchSpinHistory(user.id).then(setSpinHistory);
  }, [user]);

  useEffect(() => {
    if (phase !== "spinning" || !result || wheelItems.length === 0) return;
    const idx = wheelItems.findIndex((i) => i.name === result.name);
    if (idx < 0) return;
    const n = wheelItems.length;
    const span = 360 / n;
    const mid = -90 + idx * span + span / 2;

    const targetMod = ((-90 - mid) % 360 + 360) % 360;
    const fullSpins = 5 + Math.floor(Math.random() * 3);
    const jitter = (Math.random() - 0.5) * (span * 0.6);
    const addRotation = fullSpins * 360 + targetMod + jitter;

    const rotTimer = setTimeout(() => {
      setRotation((prev) => prev + addRotation);
    }, 50);

    const revealTimer = setTimeout(() => setPhase("reveal"), 3600);

    return () => { clearTimeout(rotTimer); clearTimeout(revealTimer); };
  }, [phase, result, wheelItems]);

  const spin = useCallback(() => {
    if (phase !== "idle") return;
    const rolled = pickByRarity();
    const count = 9 + Math.floor(Math.random() * 4);
    const items = pickWheelItems(rolled, count);
    setResult(rolled);
    setWheelItems(items);
    setKey((prev) => prev + 1);
    setRotation(0);
    setPhase("spinning");
  }, [phase]);

  const collect = () => {
    if (result) {
      if (user) {
        addToInventory(user.id, result.name, result.rarity);
        recordSpin(user.id, result.name, result.rarity, true);
        fetchInventory(user.id).then(setInventory);
        fetchSpinHistory(user.id).then(setSpinHistory);
      }
      setResult(null);
      setWheelItems([]);
      setKey((prev) => prev + 1);
    }
    setPhase("idle");
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-900 overflow-hidden relative min-h-0">
      <div className="px-3 py-2 border-b border-slate-700 flex items-center gap-2">
        <button onClick={phase === "catalogue" || phase === "inventory" ? () => setPhase("idle") : onBack} className="p-1 rounded hover:bg-slate-700 transition" aria-label="Back">
          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <h3 className="text-white font-semibold text-[11px]">Lucky Box</h3>
        {phase === "idle" && (
          <>
            <button onClick={() => setPhase("catalogue")} className="ml-auto p-1 rounded bg-blue-500/15 hover:bg-blue-500/30 transition" aria-label="Catalogue" title="All Items">
              <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
            </button>
            <button onClick={() => setPhase("inventory")} className="p-1 rounded bg-emerald-500/15 hover:bg-emerald-500/30 transition" aria-label="Inventory" title="My Items">
              <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
            </button>
          </>
        )}
        {phase === "catalogue" && <span className="text-[9px] text-slate-500 ml-auto">Catalogue</span>}
        {phase === "inventory" && <span className="text-[9px] text-slate-500 ml-auto">Inventory</span>}
      </div>

      <div className="flex-1 flex flex-col px-4 relative min-h-0">
        {phase === "idle" && (
          <>
            <div className="w-full pt-2 flex flex-wrap gap-x-2.5 gap-y-0.5 justify-end">
              <span className="text-[7px] text-slate-600 font-semibold tracking-wide uppercase mr-0.5 self-center">Rarity</span>
              {(["Common", "Rare", "Epic", "Legendary", "Mythic"] as const).map((r) => (
                <span key={r} className="inline-flex items-center gap-1 text-[8px] leading-tight">
                  <span className="w-1.5 h-1.5 rounded-full inline-block flex-shrink-0" style={{ backgroundColor: RARITY_COLORS[r] }} />
                  <span className="text-slate-500">{r}</span>
                  <span className="text-slate-600">{r === "Common" ? "50%" : r === "Rare" ? "30%" : r === "Epic" ? "14%" : r === "Legendary" ? "5%" : "1%"}</span>
                </span>
              ))}
            </div>
          <div className="flex-1 flex flex-col items-center justify-center gap-5">
            <div className={`${isFullscreen ? "w-32 h-32" : "w-20 h-20"} bg-gradient-to-br from-amber-800 to-amber-950 rounded-2xl border-2 border-amber-500/60 shadow-lg shadow-amber-600/30 flex items-center justify-center relative`}>
              <svg viewBox="0 0 64 64" className={`${isFullscreen ? "w-16 h-16" : "w-11 h-11"}`}>
                <defs>
                  <linearGradient id="boxBody" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fbbf24" />
                    <stop offset="100%" stopColor="#f59e0b" />
                  </linearGradient>
                  <linearGradient id="boxLid" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fcd34d" />
                    <stop offset="100%" stopColor="#f59e0b" />
                  </linearGradient>
                  <linearGradient id="ribbon" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="100%" stopColor="#dc2626" />
                  </linearGradient>
                  <linearGradient id="bow" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#f87171" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="1.5" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>
                <rect x="14" y="30" width="36" height="26" rx="3" fill="url(#boxBody)" />
                <rect x="10" y="24" width="44" height="8" rx="3" fill="url(#boxLid)" />
                <rect x="30" y="24" width="4" height="32" rx="1" fill="url(#ribbon)" />
                <rect x="14" y="30" width="4" height="26" rx="1" fill="url(#ribbon)" />
                <rect x="46" y="30" width="4" height="26" rx="1" fill="url(#ribbon)" />
                <ellipse cx="32" cy="24" rx="8" ry="5" fill="url(#bow)" />
                <ellipse cx="27" cy="22" rx="5" ry="4" fill="url(#bow)" transform="rotate(-20 27 22)" />
                <ellipse cx="37" cy="22" rx="5" ry="4" fill="url(#bow)" transform="rotate(20 37 22)" />
                <circle cx="32" cy="22" r="2.5" fill="#b91c1c" />
                <text x="32" y="49" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold" fontFamily="monospace" filter="url(#glow)">?</text>
                <circle cx="50" cy="18" r="1.5" fill="#fde68a" opacity="0.8" />
                <circle cx="14" cy="14" r="1" fill="#fde68a" opacity="0.6" />
                <circle cx="56" cy="36" r="1.2" fill="#fde68a" opacity="0.5" />
                <circle cx="8" cy="40" r="1.3" fill="#fde68a" opacity="0.7" />
                <circle cx="52" cy="50" r="1" fill="#fde68a" opacity="0.4" />
                <circle cx="12" cy="52" r="0.8" fill="#fde68a" opacity="0.5" />
              </svg>
            </div>
            <p className="text-[11px] text-slate-400 text-center max-w-[180px]">
              Pull a random item from the box. Each spin has a different set of prizes!
            </p>
            {user && (
              <div className="text-[9px] text-slate-500 flex items-center gap-2">
                <span>Spins today: <span className={remainingSpins > 0 ? "text-amber-400 font-semibold" : "text-red-400 font-semibold"}>{remainingSpins}</span>/{DAILY_SPIN_LIMIT}</span>
                <span className="text-slate-700">·</span>
                <span>{SPIN_COOLDOWN_HOURS}h cooldown</span>
              </div>
            )}
            <button
              onClick={spin}
              disabled={!hasNextSpin}
              className={`${isFullscreen ? "px-10 py-3.5 text-[16px]" : "px-6 py-2.5 text-[12px]"} text-white font-bold rounded-xl shadow-lg transition-all active:scale-95 ${
                hasNextSpin
                  ? "bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 shadow-amber-700/30 border border-amber-500/50"
                  : "bg-slate-700 cursor-not-allowed shadow-slate-800/30 border border-slate-600"
              }`}
            >
              {!hasNextSpin ? "HABIS" : "PULL"}
            </button>
            {!user && (
              <p className="text-[9px] text-slate-500 -mt-3">Unlimited spin · Not saved to inventory</p>
            )}
          </div>
          </>
        )}

        {(phase === "spinning" || phase === "reveal") && wheelItems.length > 0 && (
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="relative" key={key}>
              <Pointer />
              <div
                className="transition-transform duration-[3500ms] will-change-transform"
                style={{ transform: `rotate(${rotation}deg)`, marginTop: "10px", transitionTimingFunction: "cubic-bezier(0.1, 0.7, 0.25, 1)" }}
              >
                <WheelSvg items={wheelItems} isFullscreen={isFullscreen} />
              </div>
            </div>
            {phase === "spinning" && (
              <p className="mt-2 text-[10px] text-slate-500 animate-pulse">Spinning...</p>
            )}
            {phase === "reveal" && result && (() => {
              const fx = RARITY_EFFECTS[result.rarity];
              return (
                <div className={`mt-2 flex flex-col items-center gap-2 animate-fadeIn relative ${fx.shake ? "animate-shake" : ""}`}>
                  {fx.flash && <ScreenFlash color={fx.flashColor} />}
                  {fx.rays && <RadialRays color={RARITY_COLORS[result.rarity]} size={result.rarity === "Mythic" ? 260 : 220} />}
                  {fx.glowPulse && <GlowPulseRing color={RARITY_COLORS[result.rarity]} />}
                  <SparkleBurst color={RARITY_COLORS[result.rarity]} count={fx.particleCount} size={fx.particleSize} />
                  <span className={`text-[10px] font-bold tracking-widest ${
                    result.rarity === "Mythic" ? "text-red-300" :
                    result.rarity === "Legendary" ? "text-yellow-300" :
                    result.rarity === "Epic" ? "text-purple-300" :
                    result.rarity === "Rare" ? "text-blue-300" : "text-slate-300"
                  }`}>
                    {result.rarity.toUpperCase()}
                  </span>
                  <p className={`text-white font-bold text-center ${fx.zoomPunch ? "animate-zoomPunch" : ""} ${isFullscreen ? "text-[20px]" : "text-[14px]"}`}>
                    {result.name}
                  </p>
                  <button
                    onClick={collect}
                    className="px-5 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-[11px] font-medium rounded-lg border border-slate-600 hover:border-cyan-500 transition active:scale-95"
                  >
                    Collect
                  </button>
                </div>
              );
            })()}
          </div>
        )}

        {phase === "catalogue" && (
          <div className="flex-1 overflow-y-auto py-2 px-1 scrollbar-thin min-h-0">
            <div className="text-[9px] text-slate-500 px-1 mb-2">Collected {inventory.length} items</div>
            {(["Common", "Rare", "Epic", "Legendary", "Mythic"] as const).map((rarity) => {
              const items = ITEM_POOL.filter((i) => i.rarity === rarity);
              const collected = inventory.filter((inv) => inv.rarity === rarity);
              return (
                <div key={rarity} className="mb-3">
                  <div className="flex items-center gap-1.5 mb-1.5 px-1">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: RARITY_COLORS[rarity] }} />
                    <span className="text-[10px] font-semibold tracking-wide" style={{ color: RARITY_COLORS[rarity] }}>{rarity}</span>
                    <span className="text-[8px] text-slate-600 ml-auto">{collected.length}/{items.length} · {rarity === "Common" ? "50%" : rarity === "Rare" ? "30%" : rarity === "Epic" ? "14%" : rarity === "Legendary" ? "5%" : "1%"}</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    {items.map((item) => {
                      const owned = inventory.some((inv) => inv.item_name === item.name);
                      return (
                        <div key={item.name} className={`flex items-center gap-2 px-2 py-1 rounded transition ${owned ? "bg-slate-800/40" : "hover:bg-slate-800/20 opacity-60"}`}>
                          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${owned ? "shadow-sm" : "opacity-40"}`} style={{ backgroundColor: RARITY_COLORS[rarity] }} />
                          <span className={`text-[10px] ${owned ? "text-slate-200" : "text-slate-500"}`}>{item.name}</span>
                          {owned && <svg className="w-2.5 h-2.5 ml-auto text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {phase === "inventory" && (
          <div className="flex-1 overflow-y-auto py-2 px-1 scrollbar-thin min-h-0">
            {inventory.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <svg className="w-8 h-8 text-slate-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                <p className="text-[11px] text-slate-500">Belum ada item</p>
                <p className="text-[9px] text-slate-600 mt-1">Pull item dari Lucky Box untuk mulai koleksi</p>
              </div>
            ) : (
              ["Common", "Rare", "Epic", "Legendary", "Mythic"].map((rarity) => {
                const items = inventory.filter((i) => i.rarity === rarity);
                if (items.length === 0) return null;
                return (
                  <div key={rarity} className="mb-3">
                    <div className="flex items-center gap-1.5 mb-1.5 px-1">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: RARITY_COLORS[rarity as Rarity] }} />
                      <span className="text-[10px] font-semibold tracking-wide" style={{ color: RARITY_COLORS[rarity as Rarity] }}>{rarity}</span>
                      <span className="text-[8px] text-slate-600 ml-auto">{items.length}</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      {items.map((item) => (
                        <div key={item.id} className="flex items-center gap-2 px-2 py-1 rounded bg-slate-800/40">
                          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: RARITY_COLORS[item.rarity] }} />
                          <span className="text-[10px] text-slate-200">{item.item_name}</span>
                          <span className="text-[7px] text-slate-600 ml-auto">{new Date(item.collected_at).toLocaleDateString("id-ID")}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>

      {phase !== "catalogue" && phase !== "inventory" && spinHistory.length > 0 && (
        <div className="border-t border-slate-700 px-3 py-2 max-h-20 overflow-y-auto">
          <p className="text-[9px] text-slate-500 mb-1">History</p>
          <div className="flex flex-wrap gap-1">
            {spinHistory.slice(0, 20).map((h) => (
              <span key={h.id} className={`text-[8px] px-1.5 py-0.5 rounded-full ${
                h.rarity === "Mythic" ? "text-red-300" :
                h.rarity === "Legendary" ? "text-yellow-300" :
                h.rarity === "Epic" ? "text-purple-300" :
                h.rarity === "Rare" ? "text-blue-300" : "text-slate-300"
              } bg-slate-800 border border-slate-700 truncate max-w-[100px]`}>
                {h.item_name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
