import { supabase } from "./supabase";

export interface EconomyData {
  coins: number;
  energy: number;
}

export interface ChatUsageData {
  messages_sent: number;
}

export interface UserBg {
  id: number;
  bg_id: string;
  bg_value: string;
}

// ── Economy (coins + energy) ──

export async function fetchEconomy(userId: string): Promise<EconomyData | null> {
  if (!supabase) return null;
  const { data } = await supabase
    .from("user_economy")
    .select("coins, energy")
    .eq("user_id", userId)
    .single();
  return data;
}

export async function upsertEconomy(
  userId: string,
  coins: number,
  energy: number
): Promise<void> {
  if (!supabase) return;
  await supabase.from("user_economy").upsert(
    { user_id: userId, coins, energy, updated_at: new Date().toISOString() },
    { onConflict: "user_id" }
  );
}

export async function updateCoins(userId: string, amount: number): Promise<EconomyData | null> {
  if (!supabase) return null;
  const { data } = await supabase
    .from("user_economy")
    .select("coins, energy")
    .eq("user_id", userId)
    .single();

  if (!data) {
    const coins = Math.max(0, amount);
    await upsertEconomy(userId, coins, 0);
    return { coins, energy: 0 };
  }

  const newCoins = Math.max(0, data.coins + amount);
  await supabase
    .from("user_economy")
    .update({ coins: newCoins, updated_at: new Date().toISOString() })
    .eq("user_id", userId);
  return { coins: newCoins, energy: data.energy };
}

export async function updateEnergy(userId: string, amount: number): Promise<EconomyData | null> {
  if (!supabase) return null;
  const { data } = await supabase
    .from("user_economy")
    .select("coins, energy")
    .eq("user_id", userId)
    .single();

  if (!data) {
    const energy = Math.max(0, amount);
    await upsertEconomy(userId, 0, energy);
    return { coins: 0, energy };
  }

  const newEnergy = Math.max(0, data.energy + amount);
  await supabase
    .from("user_economy")
    .update({ energy: newEnergy, updated_at: new Date().toISOString() })
    .eq("user_id", userId);
  return { coins: data.coins, energy: newEnergy };
}

// ── Chat Usage (daily limit) ──

export async function fetchChatUsage(userId: string): Promise<number> {
  if (!supabase) return 0;
  const today = new Date().toISOString().slice(0, 10);
  const { data } = await supabase
    .from("user_chat_usage")
    .select("messages_sent")
    .eq("user_id", userId)
    .eq("date", today)
    .maybeSingle();
  return data?.messages_sent ?? 0;
}

export async function incrementChatUsage(userId: string): Promise<void> {
  if (!supabase) return;
  const today = new Date().toISOString().slice(0, 10);

  const { data } = await supabase
    .from("user_chat_usage")
    .select("messages_sent")
    .eq("user_id", userId)
    .eq("date", today)
    .maybeSingle();

  if (data) {
    await supabase
      .from("user_chat_usage")
      .update({ messages_sent: data.messages_sent + 1 })
      .eq("user_id", userId)
      .eq("date", today);
  } else {
    await supabase
      .from("user_chat_usage")
      .insert({ user_id: userId, date: today, messages_sent: 1 });
  }
}

// ── Premium Backgrounds ──

export async function fetchBgs(userId: string): Promise<UserBg[]> {
  if (!supabase) return [];
  const { data } = await supabase
    .from("user_bgs")
    .select("id, bg_id, bg_value")
    .eq("user_id", userId);
  return data ?? [];
}

export async function addBg(userId: string, bgId: string, bgValue: string): Promise<void> {
  if (!supabase) return;
  await supabase
    .from("user_bgs")
    .insert({ user_id: userId, bg_id: bgId, bg_value: bgValue });
}
