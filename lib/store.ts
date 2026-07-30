import { fetchEconomy, updateCoins, updateEnergy, fetchChatUsage, incrementChatUsage, fetchBgs, addBg } from "./economy";

const prefix = (userId?: string | null) => `store_${userId || "guest"}`;

// ── Coins ──

export async function syncCoinsFromServer(userId: string): Promise<number> {
  const data = await fetchEconomy(userId);
  if (data) {
    localStorage.setItem(`${prefix(userId)}_coins`, String(data.coins));
    return data.coins;
  }
  const local = getCoins(userId);
  return local;
}

export function getCoins(userId?: string | null): number {
  if (typeof window === "undefined") return 0;
  return parseInt(localStorage.getItem(`${prefix(userId)}_coins`) || "0", 10);
}

export async function addCoins(userId: string, amount: number): Promise<number> {
  const current = getCoins(userId);
  const total = current + amount;
  localStorage.setItem(`${prefix(userId)}_coins`, String(total));
  if (userId) await updateCoins(userId, amount);
  return total;
}

export async function spendCoins(userId: string, amount: number): Promise<boolean> {
  const current = getCoins(userId);
  if (current < amount) return false;
  localStorage.setItem(`${prefix(userId)}_coins`, String(current - amount));
  if (userId) await updateCoins(userId, -amount);
  return true;
}

// ── Energy ──

export async function syncEnergyFromServer(userId: string): Promise<number> {
  const data = await fetchEconomy(userId);
  if (data) {
    localStorage.setItem(`${prefix(userId)}_energy`, String(data.energy));
    return data.energy;
  }
  const local = getEnergy(userId);
  return local;
}

export function getEnergy(userId?: string | null): number {
  if (typeof window === "undefined") return 0;
  return parseInt(localStorage.getItem(`${prefix(userId)}_energy`) || "0", 10);
}

export async function addEnergy(userId: string, amount: number): Promise<number> {
  const current = getEnergy(userId);
  const total = current + amount;
  localStorage.setItem(`${prefix(userId)}_energy`, String(total));
  if (userId) await updateEnergy(userId, amount);
  return total;
}

export function useEnergy(userId: string | null | undefined, count: number): number {
  const current = getEnergy(userId);
  const used = Math.min(current, count);
  localStorage.setItem(`${prefix(userId)}_energy`, String(current - used));
  return current - used;
}

export async function syncEnergyAfterUse(userId: string): Promise<void> {
  if (userId) {
    const local = getEnergy(userId);
    await updateEnergy(userId, local - 0); // flush current local as authoritative
  }
}

// ── Chat Usage ──

export async function syncChatUsageFromServer(userId: string): Promise<number> {
  const serverCount = await fetchChatUsage(userId);
  const today = new Date().toISOString().slice(0, 10);
  const key = `chat_usage_${userId}_${today}`;
  localStorage.setItem(key, String(serverCount));
  return serverCount;
}

export function getChatUsage(userId: string): number {
  const today = new Date().toISOString().slice(0, 10);
  return parseInt(localStorage.getItem(`chat_usage_${userId}_${today}`) || "0", 10);
}

export async function incrementChatUsageLocal(userId: string): Promise<void> {
  const today = new Date().toISOString().slice(0, 10);
  const key = `chat_usage_${userId}_${today}`;
  const stored = parseInt(localStorage.getItem(key) || "0", 10);
  localStorage.setItem(key, String(stored + 1));
  await incrementChatUsage(userId);
}

// ── Premium Backgrounds ──

export async function syncBgsFromServer(userId: string): Promise<string[]> {
  const bgs = await fetchBgs(userId);
  const values = bgs.map((b) => b.bg_value);
  localStorage.setItem(`${prefix(userId)}_bg`, JSON.stringify(values));
  return values;
}

export function getPurchasedBgs(userId?: string | null): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(`${prefix(userId)}_bg`) || "[]");
  } catch { return []; }
}

export async function purchaseBg(userId: string, bgId: string, bgValue: string): Promise<void> {
  const current = getPurchasedBgs(userId);
  if (!current.includes(bgValue)) {
    current.push(bgValue);
    localStorage.setItem(`${prefix(userId)}_bg`, JSON.stringify(current));
  }
  if (userId) await addBg(userId, bgId, bgValue);
}

export function isBgPurchased(userId: string | null | undefined, bgClass: string): boolean {
  return getPurchasedBgs(userId).includes(bgClass);
}
