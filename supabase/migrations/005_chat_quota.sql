-- Add user_id to tr_chat_session for session isolation
ALTER TABLE tr_chat_session ADD COLUMN IF NOT EXISTS user_id UUID;
CREATE INDEX IF NOT EXISTS idx_chat_session_user_id ON tr_chat_session(user_id);

-- Add user_id to tr_chat_message for per-user quota tracking
ALTER TABLE tr_chat_message ADD COLUMN IF NOT EXISTS user_id UUID;
CREATE INDEX IF NOT EXISTS idx_chat_message_user_id ON tr_chat_message(user_id);
