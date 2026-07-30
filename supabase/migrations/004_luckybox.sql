-- Migration 004: Lucky Box — inventory & spin history
-- Requires 003_auth.sql (profiles table)

CREATE TABLE public.user_inventory (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  item_name TEXT NOT NULL,
  rarity TEXT NOT NULL CHECK (rarity IN ('Common','Rare','Epic','Legendary','Mythic')),
  collected_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.spin_history (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  item_name TEXT NOT NULL,
  rarity TEXT NOT NULL CHECK (rarity IN ('Common','Rare','Epic','Legendary','Mythic')),
  collected BOOLEAN DEFAULT true,
  spun_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.user_inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.spin_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own inventory"
  ON public.user_inventory FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own inventory"
  ON public.user_inventory FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read own spin history"
  ON public.spin_history FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own spin history"
  ON public.spin_history FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX idx_user_inventory_user ON public.user_inventory(user_id);
CREATE INDEX idx_spin_history_user ON public.spin_history(user_id);
