-- Patients page sections
CREATE TABLE IF NOT EXISTS patients_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_ru TEXT NOT NULL,
  title_kz TEXT,
  title_en TEXT,
  slug TEXT UNIQUE NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Patients page blocks within sections
CREATE TABLE IF NOT EXISTS patients_blocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id UUID REFERENCES patients_sections(id) ON DELETE CASCADE,
  block_type TEXT NOT NULL CHECK (block_type IN ('text', 'colored_block', 'list', 'cards', 'faq', 'table', 'contact_block')),
  title_ru TEXT,
  title_kz TEXT,
  title_en TEXT,
  content_ru JSONB DEFAULT '{}',
  content_kz JSONB DEFAULT '{}',
  content_en JSONB DEFAULT '{}',
  settings JSONB DEFAULT '{}',
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_patients_sections_order ON patients_sections(order_index);
CREATE INDEX IF NOT EXISTS idx_patients_blocks_section ON patients_blocks(section_id);
CREATE INDEX IF NOT EXISTS idx_patients_blocks_order ON patients_blocks(order_index);

-- Enable RLS
ALTER TABLE patients_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients_blocks ENABLE ROW LEVEL SECURITY;

-- Policies for public read access
CREATE POLICY "Allow public read patients_sections" ON patients_sections FOR SELECT USING (true);
CREATE POLICY "Allow public read patients_blocks" ON patients_blocks FOR SELECT USING (true);

-- Insert default sections based on current page structure
INSERT INTO patients_sections (title_ru, title_kz, title_en, slug, order_index) VALUES
  ('Подготовка к анализам', 'Талдауларға дайындық', 'Test Preparation', 'preparation', 0),
  ('Правила сдачи биоматериала', 'Биоматериал тапсыру ережелері', 'Biomaterial Collection Rules', 'rules', 1),
  ('Сроки выполнения', 'Орындау мерзімдері', 'Turnaround Times', 'deadlines', 2),
  ('Часто задаваемые вопросы', 'Жиі қойылатын сұрақтар', 'FAQ', 'faq', 3),
  ('Права пациентов', 'Пациенттердің құқықтары', 'Patient Rights', 'rights', 4);
