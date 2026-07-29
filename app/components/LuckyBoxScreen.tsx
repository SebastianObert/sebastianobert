"use client";

import { useState, useCallback, useEffect, useMemo } from "react";

type Rarity = "Common" | "Rare" | "Epic" | "Legendary" | "Mythic";
type Phase = "idle" | "spinning" | "reveal";

interface LuckyBoxScreenProps {
  onBack: () => void;
}

interface ItemDef {
  name: string;
  rarity: Rarity;
}

const ITEM_POOL: ItemDef[] = [
  { name: "Bronze Cog", rarity: "Common" },
  { name: "Steel Byte", rarity: "Common" },
  { name: "Iron Pixel", rarity: "Common" },
  { name: "Tin Frame", rarity: "Common" },
  { name: "Copper Wire", rarity: "Common" },
  { name: "Silver Circuit", rarity: "Rare" },
  { name: "Cyan Shard", rarity: "Rare" },
  { name: "Neon Coil", rarity: "Rare" },
  { name: "Crystal Node", rarity: "Rare" },
  { name: "Plasma Core", rarity: "Rare" },
  { name: "Golden Core", rarity: "Epic" },
  { name: "Mystic Orb", rarity: "Epic" },
  { name: "Ruby Heart", rarity: "Epic" },
  { name: "Void Gem", rarity: "Epic" },
  { name: "Thunder Pearl", rarity: "Epic" },
  { name: "Dragon's Eye", rarity: "Legendary" },
  { name: "Celestial Wings", rarity: "Legendary" },
  { name: "Eternal Code", rarity: "Legendary" },
  { name: "Phoenix Crest", rarity: "Legendary" },
  { name: "Titan Soul", rarity: "Legendary" },
  { name: "\u2605 Naga \u2605", rarity: "Mythic" },
  { name: "\u2605 Cosmic Soul \u2605", rarity: "Mythic" },
  { name: "\u2605 Phoenix \u2605", rarity: "Mythic" },
  { name: "\u2605 Leviathan \u2605", rarity: "Mythic" },
];

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

function WheelSvg({ items }: { items: ItemDef[] }) {
  const segs = useMemo(() => buildSegments(items), [items]);
  return (
    <svg viewBox="0 0 200 200" className="w-48 h-48" style={{ display: "block" }}>
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

function SparkleBurst({ color }: { color: string }) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i / 12) * 360;
        return (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full"
            style={{
              backgroundColor: color,
              top: "50%",
              left: "50%",
              transform: `rotate(${angle}deg)`,
              animation: `sparkle-fade 0.7s ease-out ${i * 0.04}s forwards`,
              opacity: 0,
            }}
          />
        );
      })}
    </div>
  );
}

export default function LuckyBoxScreen({ onBack }: LuckyBoxScreenProps) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [result, setResult] = useState<ItemDef | null>(null);
  const [rotation, setRotation] = useState(0);
  const [wheelItems, setWheelItems] = useState<ItemDef[]>([]);
  const [history, setHistory] = useState<ItemDef[]>([]);
  const [key, setKey] = useState(0);

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

    const revealTimer = setTimeout(() => setPhase("reveal"), 3200);

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
    if (result) setHistory((prev) => [result, ...prev]);
    setPhase("idle");
    setResult(null);
    setWheelItems([]);
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-900 overflow-hidden relative">
      <div className="px-3 py-2 border-b border-slate-700 flex items-center gap-2">
        <button onClick={onBack} className="p-1 rounded hover:bg-slate-700 transition" aria-label="Back">
          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <h3 className="text-white font-semibold text-[11px]">Lucky Box</h3>
        <span className="text-[9px] text-slate-500 ml-auto">Free Roll</span>
      </div>

      <div className="flex-1 flex flex-col px-4 relative">
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
            <div className="w-20 h-20 bg-gradient-to-br from-amber-800 to-amber-950 rounded-2xl border-2 border-amber-600/50 shadow-lg shadow-amber-700/30 flex items-center justify-center">
              <svg className="w-10 h-10 text-amber-400/80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
            </div>
            <p className="text-[11px] text-slate-400 text-center max-w-[180px]">
              Pull a random item from the box. Each spin has a different set of prizes!
            </p>
            <button
              onClick={spin}
              className="px-6 py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white text-[12px] font-bold rounded-xl shadow-lg shadow-amber-700/30 border border-amber-500/50 active:scale-95 transition-all"
            >
              PULL
            </button>
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
                <WheelSvg items={wheelItems} />
              </div>
            </div>
            {phase === "spinning" && (
              <p className="mt-2 text-[10px] text-slate-500 animate-pulse">Spinning...</p>
            )}
            {phase === "reveal" && result && (
              <div className="mt-2 flex flex-col items-center gap-2 animate-fadeIn">
                <SparkleBurst color={RARITY_COLORS[result.rarity]} />
                <span className={`text-[10px] font-bold tracking-widest ${
                  result.rarity === "Mythic" ? "text-red-300" :
                  result.rarity === "Legendary" ? "text-yellow-300" :
                  result.rarity === "Epic" ? "text-purple-300" :
                  result.rarity === "Rare" ? "text-blue-300" : "text-slate-300"
                }`}>
                  {result.rarity.toUpperCase()}
                </span>
                <p className="text-white text-[14px] font-bold text-center">{result.name}</p>
                <button
                  onClick={collect}
                  className="px-5 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-[11px] font-medium rounded-lg border border-slate-600 hover:border-cyan-500 transition active:scale-95"
                >
                  Collect
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {history.length > 0 && (
        <div className="border-t border-slate-700 px-3 py-2 max-h-20 overflow-y-auto">
          <p className="text-[9px] text-slate-500 mb-1">History</p>
          <div className="flex flex-wrap gap-1">
            {history.map((h, i) => (
              <span key={i} className={`text-[8px] px-1.5 py-0.5 rounded-full ${
                h.rarity === "Mythic" ? "text-red-300" :
                h.rarity === "Legendary" ? "text-yellow-300" :
                h.rarity === "Epic" ? "text-purple-300" :
                h.rarity === "Rare" ? "text-blue-300" : "text-slate-300"
              } bg-slate-800 border border-slate-700 truncate max-w-[100px]`}>
                {h.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
