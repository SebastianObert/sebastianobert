import { supabase } from "./supabase";
import type { Rarity } from "../app/components/LuckyBoxScreen";

export interface InventoryItem {
  id: number;
  item_name: string;
  rarity: Rarity;
  collected_at: string;
}

export interface SpinRecord {
  id: number;
  item_name: string;
  rarity: Rarity;
  spun_at: string;
}

export async function fetchInventory(userId: string): Promise<InventoryItem[]> {
  if (!supabase) return [];
  const { data } = await supabase
    .from("user_inventory")
    .select("id, item_name, rarity, collected_at")
    .eq("user_id", userId)
    .order("collected_at", { ascending: false });
  return data ?? [];
}

export async function addToInventory(userId: string, itemName: string, rarity: Rarity): Promise<void> {
  if (!supabase) return;
  await supabase.from("user_inventory").insert({ user_id: userId, item_name: itemName, rarity });
}

export async function fetchSpinHistory(userId: string): Promise<SpinRecord[]> {
  if (!supabase) return [];
  const { data } = await supabase
    .from("spin_history")
    .select("id, item_name, rarity, spun_at")
    .eq("user_id", userId)
    .order("spun_at", { ascending: false });
  return data ?? [];
}

export async function recordSpin(userId: string, itemName: string, rarity: Rarity, collected: boolean): Promise<void> {
  if (!supabase) return;
  await supabase.from("spin_history").insert({ user_id: userId, item_name: itemName, rarity, collected });
}
