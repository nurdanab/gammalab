-- NGS Content table for analyses page (separate from doctors page NGS)
CREATE TABLE IF NOT EXISTS analyses_ngs_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL DEFAULT 'Next-Generation Sequencing (NGS)',
  title_kz TEXT NOT NULL DEFAULT 'Next-Generation Sequencing (NGS)',
  title_en TEXT NOT NULL DEFAULT 'Next-Generation Sequencing (NGS)',
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
INSERT INTO analyses_ngs_content (title, title_kz, title_en, description, description_kz, description_en, sections)
VALUES (
  'Next-Generation Sequencing (NGS)',
  'Next-Generation Sequencing (NGS)',
  'Next-Generation Sequencing (NGS)',
  'NGS (Next-Generation Sequencing) — это современная технология, позволяющая секвенировать миллионы фрагментов ДНК одновременно. Этот метод помогает выявить генетические отклонения, риски наследственных заболеваний и чувствительность к лекарственным препаратам.',
  'NGS (Next-Generation Sequencing) — бұл бір уақытта миллиондаған ДНҚ фрагменттерін секвенирлеуге мүмкіндік беретін заманауи технология. Бұл әдіс генетикалық ауытқуларды, тұқым қуалайтын аурулардың қаупін және дәрі-дәрмектерге сезімталдықты анықтауға көмектеседі.',
  'NGS (Next-Generation Sequencing) is a modern technology that allows sequencing millions of DNA fragments simultaneously. This method helps identify genetic abnormalities, hereditary disease risks, and drug sensitivity.',
  '[]'
) ON CONFLICT DO NOTHING;

-- Trigger to update updated_at
CREATE OR REPLACE FUNCTION update_analyses_ngs_content_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER analyses_ngs_content_updated_at
  BEFORE UPDATE ON analyses_ngs_content
  FOR EACH ROW
  EXECUTE FUNCTION update_analyses_ngs_content_updated_at();
