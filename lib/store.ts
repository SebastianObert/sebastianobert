const prefix = (userId?: string | null) => `store_${userId || "guest"}`;

export function getCoins(userId?: string | null): number {
  if (typeof window === "undefined") return 0;
  return parseInt(localStorage.getItem(`${prefix(userId)}_coins`) || "0", 10);
}

export function addCoins(userId: string | null | undefined, amount: number): number {
  const current = getCoins(userId);
  const total = current + amount;
  localStorage.setItem(`${prefix(userId)}_coins`, String(total));
  return total;
}

export function spendCoins(userId: string | null | undefined, amount: number): boolean {
  const current = getCoins(userId);
  if (current < amount) return false;
  localStorage.setItem(`${prefix(userId)}_coins`, String(current - amount));
  return true;
}

export function getEnergy(userId?: string | null): number {
  if (typeof window === "undefined") return 0;
  return parseInt(localStorage.getItem(`${prefix(userId)}_energy`) || "0", 10);
}

export function addEnergy(userId: string | null | undefined, amount: number): number {
  const current = getEnergy(userId);
  const total = current + amount;
  localStorage.setItem(`${prefix(userId)}_energy`, String(total));
  return total;
}

export function useEnergy(userId: string | null | undefined, count: number): number {
  const current = getEnergy(userId);
  const used = Math.min(current, count);
  localStorage.setItem(`${prefix(userId)}_energy`, String(current - used));
  return current - used;
}

export function getPurchasedBgs(userId?: string | null): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(`${prefix(userId)}_bg`) || "[]");
  } catch { return []; }
}

export function purchaseBg(userId: string | null | undefined, bgClass: string): void {
  const current = getPurchasedBgs(userId);
  if (!current.includes(bgClass)) {
    current.push(bgClass);
    localStorage.setItem(`${prefix(userId)}_bg`, JSON.stringify(current));
  }
}

export function isBgPurchased(userId: string | null | undefined, bgClass: string): boolean {
  return getPurchasedBgs(userId).includes(bgClass);
}
