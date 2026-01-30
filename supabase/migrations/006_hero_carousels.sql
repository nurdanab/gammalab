-- Hero Carousels table for homepage slider
-- Only stores image, title and description (badge and button are static)
CREATE TABLE hero_carousels (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  title_kz TEXT NOT NULL DEFAULT '',
  title_en TEXT NOT NULL DEFAULT '',
  description TEXT DEFAULT '',
  description_kz TEXT DEFAULT '',
  description_en TEXT DEFAULT '',
  image TEXT NOT NULL,
  "order" INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE hero_carousels ENABLE ROW LEVEL SECURITY;

-- Policy for public read (only active slides)
CREATE POLICY "Allow public read active hero carousels" ON hero_carousels
  FOR SELECT USING (is_active = true);

-- Policy for service role (admin) full access
CREATE POLICY "Allow service role full access to hero_carousels" ON hero_carousels
  FOR ALL USING (true) WITH CHECK (true);

-- Index for ordering
CREATE INDEX idx_hero_carousels_order ON hero_carousels("order");
CREATE INDEX idx_hero_carousels_active ON hero_carousels(is_active);

-- Insert sample data
INSERT INTO hero_carousels (title, title_kz, title_en, description, description_kz, description_en, image, "order", is_active) VALUES
(
  'Мы заботимся о вашем здоровье',
  'Біз сіздің денсаулығыңыз туралы қамқорлық жасаймыз',
  'We care about your health',
  'Современная лаборатория с высокоточным оборудованием для качественной диагностики',
  'Сапалы диагностика үшін жоғары дәлдіктегі жабдықтары бар заманауи зертхана',
  'Modern laboratory with high-precision equipment for quality diagnostics',
  '/images/hero-doctor.png',
  0,
  true
);
