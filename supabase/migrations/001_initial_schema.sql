-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============ CATEGORIES ============
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  name_kz TEXT NOT NULL,
  name_en TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============ NEWS ============
CREATE TYPE news_category AS ENUM ('news', 'promotion', 'article');

CREATE TABLE IF NOT EXISTS news (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  title_kz TEXT NOT NULL,
  title_en TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  excerpt_kz TEXT NOT NULL,
  excerpt_en TEXT NOT NULL,
  content TEXT NOT NULL,
  content_kz TEXT NOT NULL,
  content_en TEXT NOT NULL,
  image TEXT NOT NULL,
  category news_category NOT NULL DEFAULT 'news',
  published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============ ANALYSES ============
CREATE TABLE IF NOT EXISTS analyses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  name_kz TEXT NOT NULL,
  name_en TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  description_kz TEXT NOT NULL DEFAULT '',
  description_en TEXT NOT NULL DEFAULT '',
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  price DECIMAL(10, 2) NOT NULL DEFAULT 0,
  collection_price DECIMAL(10, 2) NOT NULL DEFAULT 0,
  deadline TEXT NOT NULL DEFAULT '',
  deadline_kz TEXT NOT NULL DEFAULT '',
  deadline_en TEXT NOT NULL DEFAULT '',
  biomaterial TEXT NOT NULL DEFAULT '',
  biomaterial_kz TEXT NOT NULL DEFAULT '',
  biomaterial_en TEXT NOT NULL DEFAULT '',
  preparation TEXT NOT NULL DEFAULT '',
  preparation_kz TEXT NOT NULL DEFAULT '',
  preparation_en TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============ SUBMISSIONS ============
CREATE TYPE submission_type AS ENUM ('contact', 'booking');

CREATE TABLE IF NOT EXISTS submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type submission_type NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT,
  email TEXT,
  phone TEXT NOT NULL,
  message TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  analysis_id UUID REFERENCES analyses(id) ON DELETE SET NULL,
  analysis_name TEXT,
  preferred_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============ HOMEPAGE SERVICES ============
CREATE TABLE IF NOT EXISTS homepage_services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  title_kz TEXT NOT NULL,
  title_en TEXT NOT NULL,
  description TEXT NOT NULL,
  description_kz TEXT NOT NULL,
  description_en TEXT NOT NULL,
  icon TEXT NOT NULL,
  "order" INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============ REVIEWS ============
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  name_kz TEXT NOT NULL,
  name_en TEXT NOT NULL,
  text TEXT NOT NULL,
  text_kz TEXT NOT NULL,
  text_en TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  photo TEXT,
  show_on_homepage BOOLEAN DEFAULT FALSE,
  "order" INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============ HOMEPAGE CATEGORIES ============
CREATE TABLE IF NOT EXISTS homepage_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  name_kz TEXT NOT NULL,
  name_en TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  description_kz TEXT NOT NULL DEFAULT '',
  description_en TEXT NOT NULL DEFAULT '',
  description2 TEXT NOT NULL DEFAULT '',
  description2_kz TEXT NOT NULL DEFAULT '',
  description2_en TEXT NOT NULL DEFAULT '',
  tags TEXT[] NOT NULL DEFAULT '{}',
  tags_kz TEXT[] NOT NULL DEFAULT '{}',
  tags_en TEXT[] NOT NULL DEFAULT '{}',
  "order" INTEGER NOT NULL DEFAULT 0,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============ INDEXES ============
CREATE INDEX IF NOT EXISTS idx_news_slug ON news(slug);
CREATE INDEX IF NOT EXISTS idx_news_category ON news(category);
CREATE INDEX IF NOT EXISTS idx_news_published_at ON news(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_news_featured ON news(featured) WHERE featured = TRUE;

CREATE INDEX IF NOT EXISTS idx_analyses_slug ON analyses(slug);
CREATE INDEX IF NOT EXISTS idx_analyses_category ON analyses(category_id);

CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);

CREATE INDEX IF NOT EXISTS idx_submissions_type ON submissions(type);
CREATE INDEX IF NOT EXISTS idx_submissions_created_at ON submissions(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_homepage_services_order ON homepage_services("order");
CREATE INDEX IF NOT EXISTS idx_reviews_order ON reviews("order");
CREATE INDEX IF NOT EXISTS idx_reviews_homepage ON reviews(show_on_homepage) WHERE show_on_homepage = TRUE;
CREATE INDEX IF NOT EXISTS idx_homepage_categories_order ON homepage_categories("order");
CREATE INDEX IF NOT EXISTS idx_homepage_categories_featured ON homepage_categories(featured) WHERE featured = TRUE;

-- ============ ROW LEVEL SECURITY ============
-- Enable RLS on all tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE homepage_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE homepage_categories ENABLE ROW LEVEL SECURITY;

-- Public read access for content tables
CREATE POLICY "Public read access for categories" ON categories
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Public read access for news" ON news
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Public read access for analyses" ON analyses
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Public read access for homepage_services" ON homepage_services
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Public read access for reviews" ON reviews
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Public read access for homepage_categories" ON homepage_categories
  FOR SELECT TO anon, authenticated USING (true);

-- Allow anonymous users to create submissions (contact forms, bookings)
CREATE POLICY "Public insert for submissions" ON submissions
  FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Authenticated users can read submissions
CREATE POLICY "Authenticated read for submissions" ON submissions
  FOR SELECT TO authenticated USING (true);

-- Full access for service role (admin operations)
CREATE POLICY "Service role full access for categories" ON categories
  FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access for news" ON news
  FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access for analyses" ON analyses
  FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access for submissions" ON submissions
  FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access for homepage_services" ON homepage_services
  FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access for reviews" ON reviews
  FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access for homepage_categories" ON homepage_categories
  FOR ALL TO service_role USING (true) WITH CHECK (true);
