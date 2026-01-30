-- NGS Content table for doctors page
CREATE TABLE IF NOT EXISTS ngs_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL DEFAULT 'Next-generation sequencing (NGS)',
  title_kz TEXT NOT NULL DEFAULT 'Next-generation sequencing (NGS)',
  title_en TEXT NOT NULL DEFAULT 'Next-generation sequencing (NGS)',
  description TEXT NOT NULL DEFAULT '',
  description_kz TEXT NOT NULL DEFAULT '',
  description_en TEXT NOT NULL DEFAULT '',
  sections JSONB NOT NULL DEFAULT '[]',
  sections_kz JSONB NOT NULL DEFAULT '[]',
  sections_en JSONB NOT NULL DEFAULT '[]',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default row
INSERT INTO ngs_content (title, description, sections)
VALUES (
  'Next-generation sequencing (NGS)',
  '',
  '[]'
) ON CONFLICT DO NOTHING;

-- Trigger to update updated_at
CREATE OR REPLACE FUNCTION update_ngs_content_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER ngs_content_updated_at
  BEFORE UPDATE ON ngs_content
  FOR EACH ROW
  EXECUTE FUNCTION update_ngs_content_updated_at();
