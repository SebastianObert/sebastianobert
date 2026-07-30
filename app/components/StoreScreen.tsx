"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../lib/auth";
import { fetchInventory, removeFromInventory, type InventoryItem } from "../../lib/luckybox";
import { getCoins, addCoins, spendCoins, getEnergy, addEnergy, getPurchasedBgs, purchaseBg } from "../../lib/store";
import { RARITY_COIN_VALUE, ENERGY_PACKS, CHAT_BASE_LIMIT, PREMIUM_BGS } from "../../lib/defaults";
import type { Rarity } from "./LuckyBoxScreen";

interface StoreScreenProps {
  onBack: () => void;
}

const RARITY_COLORS: Record<Rarity, string> = {
  Common: "#94a3b8",
  Rare: "#60a5fa",
  Epic: "#a78bfa",
  Legendary: "#fbbf24",
  Mythic: "#ef4444",
};

type Tab = "shop" | "convert";

export default function StoreScreen({ onBack }: StoreScreenProps) {
  const { user } = useAuth();
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [coins, setCoins] = useState(0);
  const [energy, setEnergy] = useState(0);
  const [tab, setTab] = useState<Tab>("shop");
  const [purchasedBgs, setPurchasedBgs] = useState<string[]>([]);

  const refresh = (uid?: string | null) => {
    setCoins(getCoins(uid));
    setEnergy(getEnergy(uid));
    setPurchasedBgs(getPurchasedBgs(uid));
    if (uid) fetchInventory(uid).then(setInventory);
  };

  useEffect(() => {
    refresh(user?.id);
  }, [user]);

  const convertItem = async (item: InventoryItem) => {
    const value = RARITY_COIN_VALUE[item.rarity] || 0;
    addCoins(user?.id, value);
    setCoins(getCoins(user?.id));
    setInventory((prev) => prev.filter((i) => i.id !== item.id));
    await removeFromInventory(item.id);
  };

  const buyEnergy = (price: number, amount: number) => {
    if (!spendCoins(user?.id, price)) return;
    addEnergy(user?.id, amount);
    setCoins(getCoins(user?.id));
    setEnergy(getEnergy(user?.id));
  };

  const buyBg = (bg: typeof PREMIUM_BGS[number]) => {
    if (!spendCoins(user?.id, bg.price)) return;
    purchaseBg(user?.id, bg.value);
    setCoins(getCoins(user?.id));
    setPurchasedBgs(getPurchasedBgs(user?.id));
  };

  if (!user) {
    return (
      <div className="flex-1 flex flex-col bg-slate-900 overflow-hidden min-h-0">
        <div className="px-3 py-2 border-b border-slate-700 flex items-center gap-2">
          <button onClick={onBack} className="p-1 rounded hover:bg-slate-700 transition" aria-label="Back">
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <h3 className="text-white font-semibold text-[11px]">Store</h3>
        </div>

        <div className="flex border-b border-slate-700 text-[10px]">
          <button onClick={() => setTab("shop")} className={`flex-1 py-2 text-center font-medium transition ${tab === "shop" ? "text-cyan-400 border-b-2 border-cyan-400" : "text-slate-500 hover:text-slate-300"}`}>Shop</button>
        </div>

        <div className="flex-1 overflow-y-auto py-3 px-3 scrollbar-thin min-h-0 space-y-4">
          <section>
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-3.5 h-3.5 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              <h4 className="text-[10px] text-slate-300 font-semibold tracking-wide uppercase">Energy</h4>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {ENERGY_PACKS.map((pack) => (
                <div key={pack.price}
                  className="relative flex flex-col items-center gap-1 px-2 py-3 rounded-xl border bg-slate-800/30 border-slate-700/30 opacity-60 cursor-not-allowed"
                >
                  <span className="text-[13px] font-bold text-cyan-300">{pack.amount}x</span>
                  <span className="text-[8px] text-slate-500">Energy</span>
                  <div className="flex items-center gap-1 mt-1">
                    <svg className="w-2.5 h-2.5 text-amber-400" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" /></svg>
                    <span className="text-[9px] text-slate-400 font-medium">{pack.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-3.5 h-3.5 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              <h4 className="text-[10px] text-slate-300 font-semibold tracking-wide uppercase">Backgrounds</h4>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {PREMIUM_BGS.map((bg) => (
                <div key={bg.id}
                  className="relative flex flex-col rounded-xl overflow-hidden border border-slate-700/50"
                >
                  <div className={`h-14 ${bg.value} flex items-center justify-center`} />
                  <div className="px-2 py-1.5 bg-slate-800/80 flex items-center justify-between">
                    <span className="text-[9px] text-slate-300 font-medium truncate">{bg.name}</span>
                    <span className="flex items-center gap-0.5 px-1.5 py-0.5 text-[8px] font-medium bg-slate-700 text-slate-600 border border-slate-600 rounded">
                      <svg className="w-2 h-2" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" /></svg>
                      {bg.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-slate-900 overflow-hidden min-h-0">
      <div className="px-3 py-2 border-b border-slate-700 flex items-center gap-2">
        <button onClick={onBack} className="p-1 rounded hover:bg-slate-700 transition" aria-label="Back">
          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <h3 className="text-white font-semibold text-[11px]">Store</h3>
        <div className="ml-auto flex items-center gap-3 text-[10px]">
          <span className="flex items-center gap-1 text-amber-400 font-semibold">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" /></svg>
            {coins}
          </span>
          <span className="flex items-center gap-1 text-cyan-400 font-semibold">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            {energy}
          </span>
        </div>
      </div>

      <div className="flex border-b border-slate-700 text-[10px]">
        <button onClick={() => setTab("shop")} className={`flex-1 py-2 text-center font-medium transition ${tab === "shop" ? "text-cyan-400 border-b-2 border-cyan-400" : "text-slate-500 hover:text-slate-300"}`}>Shop</button>
        <button onClick={() => setTab("convert")} className={`flex-1 py-2 text-center font-medium transition ${tab === "convert" ? "text-cyan-400 border-b-2 border-cyan-400" : "text-slate-500 hover:text-slate-300"}`}>Convert</button>
      </div>

      <div className="flex-1 overflow-y-auto py-3 px-3 scrollbar-thin min-h-0 space-y-4">
        {tab === "shop" && (
          <>
            <section>
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-3.5 h-3.5 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                <h4 className="text-[10px] text-slate-300 font-semibold tracking-wide uppercase">Energy</h4>
                <span className="text-[8px] text-slate-600 ml-auto">Balance: {energy}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {ENERGY_PACKS.map((pack) => {
                  const canBuy = coins >= pack.price;
                  return (
                    <button
                      key={pack.price}
                      onClick={() => buyEnergy(pack.price, pack.amount)}
                      disabled={!canBuy}
                      className={`relative flex flex-col items-center gap-1 px-2 py-3 rounded-xl border transition active:scale-95 ${
                        canBuy
                          ? "bg-slate-800/60 border-slate-600/50 hover:border-cyan-500/50 hover:bg-slate-700/60"
                          : "bg-slate-800/30 border-slate-700/30 opacity-50 cursor-not-allowed"
                      }`}
                    >
                      <span className="text-[13px] font-bold text-cyan-300">{pack.amount}x</span>
                      <span className="text-[8px] text-slate-500">Energy</span>
                      <div className="flex items-center gap-1 mt-1">
                        <svg className="w-2.5 h-2.5 text-amber-400" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" /></svg>
                        <span className="text-[9px] text-slate-400 font-medium">{pack.price}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
              <div className="mt-1 text-[8px] text-slate-600 text-center">Limit hari ini: {CHAT_BASE_LIMIT + energy} ({CHAT_BASE_LIMIT} base + {energy} energy)</div>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-3.5 h-3.5 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                <h4 className="text-[10px] text-slate-300 font-semibold tracking-wide uppercase">Backgrounds</h4>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {PREMIUM_BGS.map((bg) => {
                  const owned = purchasedBgs.includes(bg.value);
                  const canBuy = coins >= bg.price;
                  return (
                    <div
                      key={bg.id}
                      className={`relative flex flex-col rounded-xl overflow-hidden border transition ${
                        owned ? "border-emerald-500/40" : "border-slate-700/50"
                      }`}
                    >
                      <div className={`h-14 ${bg.value} flex items-center justify-center`}>
                        {owned && (
                          <span className="text-[9px] font-bold text-white bg-emerald-600/70 px-2 py-0.5 rounded-full">OWNED</span>
                        )}
                      </div>
                      <div className="px-2 py-1.5 bg-slate-800/80 flex items-center justify-between">
                        <span className="text-[9px] text-slate-300 font-medium truncate">{bg.name}</span>
                        {owned ? (
                          <span className="text-[8px] text-emerald-400 font-semibold">&#10003;</span>
                        ) : (
                          <button
                            onClick={() => buyBg(bg)}
                            disabled={!canBuy}
                            className={`flex items-center gap-0.5 px-1.5 py-0.5 text-[8px] font-medium rounded transition active:scale-95 ${
                              canBuy
                                ? "bg-amber-600/20 text-amber-400 hover:bg-amber-600/40 border border-amber-600/30"
                                : "bg-slate-700 text-slate-600 cursor-not-allowed border border-slate-600"
                            }`}
                          >
                            <svg className="w-2 h-2" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" /></svg>
                            {bg.price}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </>
        )}

        {tab === "convert" && (
          <>
            <p className="text-[9px] text-slate-500">Convert inventory items to coins</p>
            {inventory.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-10">
                <svg className="w-8 h-8 text-slate-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                <p className="text-[11px] text-slate-500">Belum ada item</p>
                <p className="text-[9px] text-slate-600 mt-1">Dapatkan item dari Lucky Box dulu</p>
              </div>
            ) : (
              (["Mythic", "Legendary", "Epic", "Rare", "Common"] as const).map((rarity) => {
                const items = inventory.filter((i) => i.rarity === rarity);
                if (items.length === 0) return null;
                return (
                  <div key={rarity} className="mb-3">
                    <div className="flex items-center gap-1.5 mb-1.5 px-1">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: RARITY_COLORS[rarity] }} />
                      <span className="text-[10px] font-semibold tracking-wide" style={{ color: RARITY_COLORS[rarity] }}>{rarity}</span>
                      <span className="text-[8px] text-slate-600 ml-auto">{RARITY_COIN_VALUE[rarity]} coins each</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      {items.map((item) => (
                        <div key={item.id} className="flex items-center gap-2 px-2 py-1.5 rounded bg-slate-800/40">
                          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: RARITY_COLORS[item.rarity] }} />
                          <span className="text-[10px] text-slate-200 flex-1">{item.item_name}</span>
                          <button
                            onClick={() => convertItem(item)}
                            className="px-2 py-0.5 text-[9px] font-medium rounded bg-amber-600/20 text-amber-400 hover:bg-amber-600/40 border border-amber-600/30 transition active:scale-95"
                          >
                            +{RARITY_COIN_VALUE[item.rarity]}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })
            )}
          </>
        )}
      </div>
    </div>
  );
}
