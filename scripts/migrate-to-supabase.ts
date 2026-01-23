// Script to generate SQL for migrating JSON data to Supabase
// Run with: npx tsx scripts/migrate-to-supabase.ts

import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

const dataDir = path.join(__dirname, '../src/data/json');
const outputFile = path.join(__dirname, '../supabase/migrations/003_seed_data.sql');

// Generate deterministic UUID from string (so we can run migration multiple times)
function stringToUUID(str: string): string {
  const hash = crypto.createHash('md5').update(str).digest('hex');
  return `${hash.slice(0, 8)}-${hash.slice(8, 12)}-${hash.slice(12, 16)}-${hash.slice(16, 20)}-${hash.slice(20, 32)}`;
}

function escapeString(str: string): string {
  if (!str) return '';
  return str.replace(/'/g, "''").replace(/\\/g, '\\\\');
}

function generateSQL(): string {
  let sql = '-- Seed data migration\n-- Generated from JSON files\n\n';

  // Create mapping for category IDs (old string ID -> new UUID)
  const categoryIdMap: Record<string, string> = {};

  // Categories
  const categories = JSON.parse(fs.readFileSync(path.join(dataDir, 'categories.json'), 'utf-8'));
  sql += '-- ============ CATEGORIES ============\n';
  for (const cat of categories) {
    const uuid = stringToUUID(`category_${cat.id}`);
    categoryIdMap[cat.id] = uuid;
    sql += `INSERT INTO categories (id, slug, name, name_kz, name_en) VALUES (
  '${uuid}',
  '${escapeString(cat.slug)}',
  '${escapeString(cat.name)}',
  '${escapeString(cat.nameKz)}',
  '${escapeString(cat.nameEn)}'
) ON CONFLICT (id) DO NOTHING;\n\n`;
  }

  // Homepage Services
  const services = JSON.parse(fs.readFileSync(path.join(dataDir, 'homepage-services.json'), 'utf-8'));
  sql += '\n-- ============ HOMEPAGE SERVICES ============\n';
  for (const svc of services) {
    const uuid = stringToUUID(`service_${svc.id}`);
    sql += `INSERT INTO homepage_services (id, title, title_kz, title_en, description, description_kz, description_en, icon, "order") VALUES (
  '${uuid}',
  '${escapeString(svc.title)}',
  '${escapeString(svc.titleKz)}',
  '${escapeString(svc.titleEn)}',
  '${escapeString(svc.description)}',
  '${escapeString(svc.descriptionKz)}',
  '${escapeString(svc.descriptionEn)}',
  '${escapeString(svc.icon)}',
  ${svc.order}
) ON CONFLICT (id) DO NOTHING;\n\n`;
  }

  // Reviews
  const reviews = JSON.parse(fs.readFileSync(path.join(dataDir, 'reviews.json'), 'utf-8'));
  sql += '\n-- ============ REVIEWS ============\n';
  for (const rev of reviews) {
    const uuid = stringToUUID(`review_${rev.id}`);
    sql += `INSERT INTO reviews (id, name, name_kz, name_en, text, text_kz, text_en, rating, date, photo, show_on_homepage, "order") VALUES (
  '${uuid}',
  '${escapeString(rev.name)}',
  '${escapeString(rev.nameKz)}',
  '${escapeString(rev.nameEn)}',
  '${escapeString(rev.text)}',
  '${escapeString(rev.textKz)}',
  '${escapeString(rev.textEn)}',
  ${rev.rating},
  '${rev.date}',
  ${rev.photo ? `'${escapeString(rev.photo)}'` : 'NULL'},
  ${rev.showOnHomepage},
  ${rev.order}
) ON CONFLICT (id) DO NOTHING;\n\n`;
  }

  // Homepage Categories
  const homepageCategories = JSON.parse(fs.readFileSync(path.join(dataDir, 'homepage-categories.json'), 'utf-8'));
  sql += '\n-- ============ HOMEPAGE CATEGORIES ============\n';
  for (const hcat of homepageCategories) {
    const uuid = stringToUUID(`hcat_${hcat.id}`);
    sql += `INSERT INTO homepage_categories (id, name, name_kz, name_en, description, description_kz, description_en, description2, description2_kz, description2_en, tags, tags_kz, tags_en, "order", featured) VALUES (
  '${uuid}',
  '${escapeString(hcat.name)}',
  '${escapeString(hcat.nameKz)}',
  '${escapeString(hcat.nameEn)}',
  '${escapeString(hcat.description)}',
  '${escapeString(hcat.descriptionKz)}',
  '${escapeString(hcat.descriptionEn)}',
  '${escapeString(hcat.description2)}',
  '${escapeString(hcat.description2Kz)}',
  '${escapeString(hcat.description2En)}',
  ARRAY[${(hcat.tags || []).map((t: string) => `'${escapeString(t)}'`).join(', ')}],
  ARRAY[${(hcat.tagsKz || []).map((t: string) => `'${escapeString(t)}'`).join(', ')}],
  ARRAY[${(hcat.tagsEn || []).map((t: string) => `'${escapeString(t)}'`).join(', ')}],
  ${hcat.order},
  ${hcat.featured}
) ON CONFLICT (id) DO NOTHING;\n\n`;
  }

  // News
  const news = JSON.parse(fs.readFileSync(path.join(dataDir, 'news.json'), 'utf-8'));
  sql += '\n-- ============ NEWS ============\n';
  for (const item of news) {
    const uuid = stringToUUID(`news_${item.id}`);
    sql += `INSERT INTO news (id, slug, title, title_kz, title_en, excerpt, excerpt_kz, excerpt_en, content, content_kz, content_en, image, category, published_at, featured) VALUES (
  '${uuid}',
  '${escapeString(item.slug)}',
  '${escapeString(item.title)}',
  '${escapeString(item.titleKz)}',
  '${escapeString(item.titleEn)}',
  '${escapeString(item.excerpt)}',
  '${escapeString(item.excerptKz)}',
  '${escapeString(item.excerptEn)}',
  '${escapeString(item.content)}',
  '${escapeString(item.contentKz)}',
  '${escapeString(item.contentEn)}',
  '${escapeString(item.image)}',
  '${item.category}',
  '${item.publishedAt}',
  ${item.featured}
) ON CONFLICT (id) DO NOTHING;\n\n`;
  }

  // Analyses
  const analyses = JSON.parse(fs.readFileSync(path.join(dataDir, 'analyses.json'), 'utf-8'));
  sql += '\n-- ============ ANALYSES ============\n';
  for (const analysis of analyses) {
    const uuid = stringToUUID(`analysis_${analysis.id}`);
    const categoryUuid = categoryIdMap[analysis.categoryId] || null;
    sql += `INSERT INTO analyses (id, slug, name, name_kz, name_en, description, description_kz, description_en, category_id, price, collection_price, deadline, deadline_kz, deadline_en, biomaterial, biomaterial_kz, biomaterial_en, preparation, preparation_kz, preparation_en) VALUES (
  '${uuid}',
  '${escapeString(analysis.slug)}',
  '${escapeString(analysis.name)}',
  '${escapeString(analysis.nameKz)}',
  '${escapeString(analysis.nameEn)}',
  '${escapeString(analysis.description || '')}',
  '${escapeString(analysis.descriptionKz || '')}',
  '${escapeString(analysis.descriptionEn || '')}',
  ${categoryUuid ? `'${categoryUuid}'` : 'NULL'},
  ${analysis.price || 0},
  ${analysis.collectionPrice || 0},
  '${escapeString(analysis.deadline || '')}',
  '${escapeString(analysis.deadlineKz || '')}',
  '${escapeString(analysis.deadlineEn || '')}',
  '${escapeString(analysis.biomaterial || '')}',
  '${escapeString(analysis.biomaterialKz || '')}',
  '${escapeString(analysis.biomaterialEn || '')}',
  '${escapeString(analysis.preparation || '')}',
  '${escapeString(analysis.preparationKz || '')}',
  '${escapeString(analysis.preparationEn || '')}'
) ON CONFLICT (id) DO NOTHING;\n\n`;
  }

  // Submissions - note: analysis_id is set to NULL as old IDs don't match new UUIDs
  const submissions = JSON.parse(fs.readFileSync(path.join(dataDir, 'submissions.json'), 'utf-8'));
  sql += '\n-- ============ SUBMISSIONS ============\n';
  for (const sub of submissions) {
    const uuid = stringToUUID(`submission_${sub.id}`);
    sql += `INSERT INTO submissions (id, type, first_name, last_name, email, phone, message, rating, analysis_id, analysis_name, preferred_date, created_at) VALUES (
  '${uuid}',
  '${sub.type}',
  '${escapeString(sub.firstName)}',
  ${sub.lastName ? `'${escapeString(sub.lastName)}'` : 'NULL'},
  ${sub.email ? `'${escapeString(sub.email)}'` : 'NULL'},
  '${escapeString(sub.phone)}',
  ${sub.message ? `'${escapeString(sub.message)}'` : 'NULL'},
  ${sub.rating || 'NULL'},
  NULL,
  ${sub.analysisName ? `'${escapeString(sub.analysisName)}'` : 'NULL'},
  ${sub.preferredDate ? `'${sub.preferredDate}'` : 'NULL'},
  '${sub.createdAt}'
) ON CONFLICT (id) DO NOTHING;\n\n`;
  }

  return sql;
}

// Run
const sql = generateSQL();
fs.writeFileSync(outputFile, sql);
console.log(`SQL migration file generated: ${outputFile}`);
console.log(`Total size: ${(sql.length / 1024).toFixed(2)} KB`);
