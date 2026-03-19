-- Initial schema for I Am Visible Today
-- Tables: stories, submissions
-- RLS: public read for stories, anyone can submit
-- Idempotent: safe to run on existing databases

-- ============================================
-- STORIES TABLE (published, curated content)
-- ============================================
CREATE TABLE IF NOT EXISTS stories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  text_content TEXT,
  photo_caption TEXT,
  photo_url TEXT,
  voice_url TEXT,
  content_type TEXT NOT NULL CHECK (content_type IN ('text', 'photo', 'voice', 'combined')),
  author_name TEXT,
  has_content_warning BOOLEAN NOT NULL DEFAULT FALSE,
  warning_text TEXT,
  view_count INTEGER NOT NULL DEFAULT 0,
  seen_count INTEGER NOT NULL DEFAULT 0,
  relate_count INTEGER NOT NULL DEFAULT 0,
  published_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  meta_description TEXT
);

-- Add seen_count and relate_count if they don't exist (for existing databases)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'stories' AND column_name = 'seen_count') THEN
    ALTER TABLE stories ADD COLUMN seen_count INTEGER NOT NULL DEFAULT 0;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'stories' AND column_name = 'relate_count') THEN
    ALTER TABLE stories ADD COLUMN relate_count INTEGER NOT NULL DEFAULT 0;
  END IF;
END $$;

-- Indexes
CREATE INDEX IF NOT EXISTS idx_stories_slug ON stories (slug);
CREATE INDEX IF NOT EXISTS idx_stories_published_date ON stories (published_date DESC);
CREATE INDEX IF NOT EXISTS idx_stories_content_type ON stories (content_type);
CREATE INDEX IF NOT EXISTS idx_stories_search ON stories USING gin (
  to_tsvector('english', COALESCE(title, '') || ' ' || COALESCE(text_content, ''))
);

-- ============================================
-- SUBMISSIONS TABLE (moderation queue)
-- ============================================
CREATE TABLE IF NOT EXISTS submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  text_content TEXT,
  photo_caption TEXT,
  photo_url TEXT,
  voice_url TEXT,
  has_photo BOOLEAN NOT NULL DEFAULT FALSE,
  has_voice BOOLEAN NOT NULL DEFAULT FALSE,
  author_name TEXT,
  author_email TEXT,
  include_face BOOLEAN NOT NULL DEFAULT FALSE,
  strip_exif BOOLEAN NOT NULL DEFAULT TRUE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  moderator_notes TEXT,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ,
  ip_address INET,
  user_agent TEXT
);

CREATE INDEX IF NOT EXISTS idx_submissions_status ON submissions (status, submitted_at DESC);

-- ============================================
-- ROW LEVEL SECURITY (idempotent with DROP IF EXISTS)
-- ============================================

ALTER TABLE stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Stories are publicly readable" ON stories;
CREATE POLICY "Stories are publicly readable"
  ON stories FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Anyone can submit" ON submissions;
CREATE POLICY "Anyone can submit"
  ON submissions FOR INSERT
  WITH CHECK (true);

-- ============================================
-- RPC FUNCTIONS (atomic counter increments)
-- ============================================

CREATE OR REPLACE FUNCTION increment_view_count(story_slug TEXT)
RETURNS VOID AS $$
BEGIN
  UPDATE stories SET view_count = view_count + 1 WHERE slug = story_slug;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION increment_seen_count(story_slug TEXT)
RETURNS VOID AS $$
BEGIN
  UPDATE stories SET seen_count = seen_count + 1 WHERE slug = story_slug;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION increment_relate_count(story_slug TEXT)
RETURNS VOID AS $$
BEGIN
  UPDATE stories SET relate_count = relate_count + 1 WHERE slug = story_slug;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- STORAGE BUCKETS
-- ============================================

INSERT INTO storage.buckets (id, name, public)
VALUES ('photos', 'photos', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public)
VALUES ('voice-notes', 'voice-notes', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies (idempotent)
DROP POLICY IF EXISTS "Anyone can upload photos" ON storage.objects;
CREATE POLICY "Anyone can upload photos"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'photos');

DROP POLICY IF EXISTS "Photos are publicly accessible" ON storage.objects;
CREATE POLICY "Photos are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'photos');

DROP POLICY IF EXISTS "Anyone can upload voice notes" ON storage.objects;
CREATE POLICY "Anyone can upload voice notes"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'voice-notes');

DROP POLICY IF EXISTS "Voice notes are publicly accessible" ON storage.objects;
CREATE POLICY "Voice notes are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'voice-notes');

-- ============================================
-- UPDATED_AT TRIGGER
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS stories_updated_at ON stories;
CREATE TRIGGER stories_updated_at
  BEFORE UPDATE ON stories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
