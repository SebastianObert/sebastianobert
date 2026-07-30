-- Create user_economy table (coins + energy per user)
CREATE TABLE IF NOT EXISTS user_economy (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  coins INTEGER NOT NULL DEFAULT 0,
  energy INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create user_chat_usage table (daily chat counter)
CREATE TABLE IF NOT EXISTS user_chat_usage (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  messages_sent INTEGER NOT NULL DEFAULT 0,
  UNIQUE(user_id, date)
);

-- Create user_bgs table (purchased premium backgrounds)
CREATE TABLE IF NOT EXISTS user_bgs (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  bg_id TEXT NOT NULL,
  bg_value TEXT NOT NULL,
  purchased_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, bg_id)
);

-- Enable Row Level Security
ALTER TABLE user_economy ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_chat_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_bgs ENABLE ROW LEVEL SECURITY;

-- RLS: users can only read/update their own economy
CREATE POLICY "user_economy_select_own" ON user_economy FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "user_economy_insert_own" ON user_economy FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "user_economy_update_own" ON user_economy FOR UPDATE USING (auth.uid() = user_id);

-- RLS: users can only read/insert their own chat usage
CREATE POLICY "user_chat_usage_select_own" ON user_chat_usage FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "user_chat_usage_insert_own" ON user_chat_usage FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "user_chat_usage_update_own" ON user_chat_usage FOR UPDATE USING (auth.uid() = user_id);

-- RLS: users can only read/insert their own backgrounds
CREATE POLICY "user_bgs_select_own" ON user_bgs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "user_bgs_insert_own" ON user_bgs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "user_bgs_delete_own" ON user_bgs FOR DELETE USING (auth.uid() = user_id);
