-- ============ STORAGE BUCKET ============
-- Create a public bucket for images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'images',
  'images',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
) ON CONFLICT (id) DO NOTHING;

-- ============ STORAGE POLICIES ============
-- Anyone can view images (public bucket)
CREATE POLICY "Public read access for images"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'images');

-- Anyone can upload images (for forms)
CREATE POLICY "Public upload for images"
ON storage.objects FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'images');

-- Service role can delete images (for cleanup)
CREATE POLICY "Service role can delete images"
ON storage.objects FOR DELETE
TO service_role
USING (bucket_id = 'images');

-- ============ IMAGE TRACKING TABLE ============
-- Track which images are used and when
CREATE TABLE IF NOT EXISTS image_usage (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  storage_path TEXT NOT NULL UNIQUE,
  used_in_table TEXT, -- 'news', 'reviews', etc.
  used_in_id UUID,
  uploaded_at TIMESTAMPTZ DEFAULT NOW(),
  last_used_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_image_usage_path ON image_usage(storage_path);
CREATE INDEX IF NOT EXISTS idx_image_usage_last_used ON image_usage(last_used_at);

-- RLS for image_usage
ALTER TABLE image_usage ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public insert for image_usage" ON image_usage
  FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Public read for image_usage" ON image_usage
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Service role full access for image_usage" ON image_usage
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- ============ CLEANUP FUNCTION ============
-- Function to find and delete unused images older than X days
CREATE OR REPLACE FUNCTION cleanup_unused_images(days_old INTEGER DEFAULT 7)
RETURNS TABLE(deleted_path TEXT)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Return paths of images that will be deleted
  -- Images are considered unused if:
  -- 1. Not referenced in image_usage with a valid used_in_id
  -- 2. Older than specified days
  RETURN QUERY
  WITH unused_images AS (
    SELECT iu.storage_path
    FROM image_usage iu
    WHERE iu.used_in_id IS NULL
    AND iu.uploaded_at < NOW() - (days_old || ' days')::INTERVAL
  )
  SELECT ui.storage_path as deleted_path
  FROM unused_images ui;

  -- Delete from image_usage table
  DELETE FROM image_usage
  WHERE used_in_id IS NULL
  AND uploaded_at < NOW() - (days_old || ' days')::INTERVAL;
END;
$$;

-- ============ AUTO-UPDATE FUNCTION ============
-- Function to mark image as used when content is saved
CREATE OR REPLACE FUNCTION update_image_usage()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
  image_path TEXT;
BEGIN
  -- Extract image path from the new row
  IF TG_TABLE_NAME = 'news' THEN
    image_path := NEW.image;
  ELSIF TG_TABLE_NAME = 'reviews' THEN
    image_path := NEW.photo;
  END IF;

  -- Update image_usage if path exists
  IF image_path IS NOT NULL AND image_path != '' THEN
    INSERT INTO image_usage (storage_path, used_in_table, used_in_id, last_used_at)
    VALUES (image_path, TG_TABLE_NAME, NEW.id, NOW())
    ON CONFLICT (storage_path)
    DO UPDATE SET
      used_in_table = TG_TABLE_NAME,
      used_in_id = NEW.id,
      last_used_at = NOW();
  END IF;

  RETURN NEW;
END;
$$;

-- Create triggers for tables with images
DROP TRIGGER IF EXISTS news_image_usage ON news;
CREATE TRIGGER news_image_usage
  AFTER INSERT OR UPDATE ON news
  FOR EACH ROW
  EXECUTE FUNCTION update_image_usage();

DROP TRIGGER IF EXISTS reviews_image_usage ON reviews;
CREATE TRIGGER reviews_image_usage
  AFTER INSERT OR UPDATE ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_image_usage();

-- ============ CLEANUP ON DELETE ============
-- When content is deleted, mark image as unused
CREATE OR REPLACE FUNCTION mark_image_unused()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
  image_path TEXT;
BEGIN
  IF TG_TABLE_NAME = 'news' THEN
    image_path := OLD.image;
  ELSIF TG_TABLE_NAME = 'reviews' THEN
    image_path := OLD.photo;
  END IF;

  IF image_path IS NOT NULL AND image_path != '' THEN
    UPDATE image_usage
    SET used_in_id = NULL, used_in_table = NULL
    WHERE storage_path = image_path;
  END IF;

  RETURN OLD;
END;
$$;

DROP TRIGGER IF EXISTS news_image_cleanup ON news;
CREATE TRIGGER news_image_cleanup
  BEFORE DELETE ON news
  FOR EACH ROW
  EXECUTE FUNCTION mark_image_unused();

DROP TRIGGER IF EXISTS reviews_image_cleanup ON reviews;
CREATE TRIGGER reviews_image_cleanup
  BEFORE DELETE ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION mark_image_unused();
