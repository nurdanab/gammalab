import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://gammalab.kz';
  const locales = ['ru', 'kz', 'en'];

  const pages = [
    '',
    '/about',
    '/analyses',
    '/contacts',
    '/news',
    '/patients',
    '/privacy',
    '/test-locations',
    '/submit-analysis',
    '/doctors',
  ];

  const sitemap: MetadataRoute.Sitemap = [];

  // Добавляем все страницы для каждой локали
  for (const locale of locales) {
    for (const page of pages) {
      sitemap.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'daily' : 'weekly',
        priority: page === '' ? 1 : 0.8,
      });
    }
  }

  return sitemap;
}
