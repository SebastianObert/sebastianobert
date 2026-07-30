-- Portfolio Database Schema for Sebastian Obert
-- Supabase PostgreSQL

-- =============================================
-- 1. ms_profile (1 row — bio, name, tagline)
-- =============================================
CREATE TABLE ms_profile (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  greeting TEXT NOT NULL,
  name TEXT NOT NULL,
  tagline TEXT NOT NULL,
  description TEXT NOT NULL,
  focus_text TEXT,
  profile_image TEXT,
  brand_name TEXT,
  motto TEXT,
  github_url TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- =============================================
-- 2. ms_social_link (4 rows)
-- =============================================
CREATE TABLE ms_social_link (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform TEXT UNIQUE NOT NULL,
  url TEXT NOT NULL,
  icon_type TEXT NOT NULL CHECK (icon_type IN ('simpleicons_url', 'inline_svg', 'local_image')),
  icon_url TEXT,
  hover_color TEXT,
  sort_order INT NOT NULL DEFAULT 0
);

-- =============================================
-- 3. ms_project (8 rows)
-- =============================================
CREATE TABLE ms_project (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT,
  image_alt TEXT,
  video_src TEXT,
  video_poster TEXT,
  project_url TEXT,
  accent_color TEXT NOT NULL,
  grid_span TEXT NOT NULL DEFAULT 'md:col-span-1',
  layout_direction TEXT NOT NULL DEFAULT 'column',
  has_image_click BOOLEAN NOT NULL DEFAULT false,
  sort_order INT NOT NULL DEFAULT 0
);

-- =============================================
-- 4. ms_project_tag (18 rows)
-- =============================================
CREATE TABLE ms_project_tag (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES ms_project(id) ON DELETE CASCADE,
  tag_name TEXT NOT NULL
);

-- =============================================
-- 5. ms_skill (18 rows)
-- =============================================
CREATE TABLE ms_skill (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  icon TEXT NOT NULL,
  icon_type TEXT NOT NULL CHECK (icon_type IN ('simpleicons_url', 'inline_svg', 'local_image')),
  category TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0
);

-- =============================================
-- 6. ms_organization (3 rows)
-- =============================================
CREATE TABLE ms_organization (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  full_name TEXT NOT NULL,
  logo TEXT,
  logo_alt TEXT,
  role TEXT NOT NULL,
  date_range TEXT NOT NULL,
  description TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0
);

-- =============================================
-- 7. ms_gallery_item (5 rows)
-- =============================================
CREATE TABLE ms_gallery_item (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image TEXT NOT NULL,
  alt TEXT NOT NULL,
  caption TEXT,
  sort_order INT NOT NULL DEFAULT 0
);

-- =============================================
-- 8. ms_nav_link (3 rows)
-- =============================================
CREATE TABLE ms_nav_link (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label TEXT NOT NULL,
  href TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0
);

-- =============================================
-- 9. ms_seo_metadata (1 row)
-- =============================================
CREATE TABLE ms_seo_metadata (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  keywords TEXT[] DEFAULT '{}',
  og_image TEXT,
  canonical_url TEXT
);

-- =============================================
-- 10. tr_chat_session
-- =============================================
CREATE TABLE tr_chat_session (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL DEFAULT 'New Chat',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- =============================================
-- 11. tr_chat_message
-- =============================================
CREATE TABLE tr_chat_message (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES tr_chat_session(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- =============================================
-- Indexes
-- =============================================
CREATE INDEX idx_project_tag_project_id ON ms_project_tag(project_id);
CREATE INDEX idx_chat_message_session_id ON tr_chat_message(session_id);
CREATE INDEX idx_chat_message_created_at ON tr_chat_message(created_at);
