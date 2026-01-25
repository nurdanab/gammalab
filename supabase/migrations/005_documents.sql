-- ============ DOCUMENTS (for licenses, certificates, etc.) ============
CREATE TABLE IF NOT EXISTS documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  title_kz TEXT,
  title_en TEXT,
  description TEXT,
  description_kz TEXT,
  description_en TEXT,
  file_url TEXT NOT NULL,
  file_name TEXT,
  file_type TEXT NOT NULL DEFAULT 'license', -- 'license', 'certificate', 'other'
  "order" INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for ordering and filtering
CREATE INDEX IF NOT EXISTS idx_documents_order ON documents("order");
CREATE INDEX IF NOT EXISTS idx_documents_type ON documents(file_type);
CREATE INDEX IF NOT EXISTS idx_documents_active ON documents(is_active);

-- Enable RLS
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Public read access for active documents
CREATE POLICY "Public read access for active documents" ON documents
  FOR SELECT TO anon, authenticated USING (is_active = true);

-- Service role full access
CREATE POLICY "Service role full access for documents" ON documents
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Create storage bucket for documents if not exists
INSERT INTO storage.buckets (id, name, public)
VALUES ('documents', 'documents', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for documents bucket
CREATE POLICY "Public read access for documents bucket" ON storage.objects
  FOR SELECT TO anon, authenticated USING (bucket_id = 'documents');

CREATE POLICY "Service role upload for documents bucket" ON storage.objects
  FOR INSERT TO service_role WITH CHECK (bucket_id = 'documents');

CREATE POLICY "Service role delete for documents bucket" ON storage.objects
  FOR DELETE TO service_role USING (bucket_id = 'documents');
