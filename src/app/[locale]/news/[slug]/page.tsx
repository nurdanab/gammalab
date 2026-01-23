'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { useState, useEffect } from 'react';
import type { NewsItem } from '@/lib/data';

const translations: Record<string, Record<string, string>> = {
  ru: {
    home: 'Главная',
    news: 'Новости',
    backToNews: 'Назад к новостям',
    share: 'Поделиться',
    relatedNews: 'Читайте также',
    readMore: 'Читать далее',
  },
  kz: {
    home: 'Басты бет',
    news: 'Жаңалықтар',
    backToNews: 'Жаңалықтарға оралу',
    share: 'Бөлісу',
    relatedNews: 'Сондай-ақ оқыңыз',
    readMore: 'Толығырақ оқу',
  },
  en: {
    home: 'Home',
    news: 'News',
    backToNews: 'Back to news',
    share: 'Share',
    relatedNews: 'Related articles',
    readMore: 'Read more',
  },
};

const categoryLabels: Record<string, Record<NewsItem['category'], string>> = {
  ru: { news: 'Новости', promotion: 'Акция', article: 'Статья' },
  kz: { news: 'Жаңалық', promotion: 'Акция', article: 'Мақала' },
  en: { news: 'News', promotion: 'Promotion', article: 'Article' },
};

function formatDate(dateString: string, locale: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  const localeMap: Record<string, string> = {
    ru: 'ru-RU',
    kz: 'kk-KZ',
    en: 'en-US',
  };
  return date.toLocaleDateString(localeMap[locale] || 'ru-RU', options);
}

export default function NewsDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const locale = useLocale() as 'ru' | 'kz' | 'en';
  const t = translations[locale] || translations.ru;
  const catLabels = categoryLabels[locale] || categoryLabels.ru;

  const [newsItem, setNewsItem] = useState<NewsItem | null>(null);
  const [relatedNews, setRelatedNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFoundState, setNotFoundState] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/news');
        if (res.ok) {
          const data = await res.json();
          const allNews = data.news || [];
          const found = allNews.find((n: NewsItem) => n.slug === slug);
          if (found) {
            setNewsItem(found);
            setRelatedNews(allNews.filter((n: NewsItem) => n.slug !== slug).slice(0, 3));
          } else {
            setNotFoundState(true);
          }
        }
      } catch (error) {
        console.error('Error fetching news:', error);
        setNotFoundState(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  const getTitle = (item: NewsItem) => {
    return locale === 'kz' ? item.titleKz : locale === 'en' ? item.titleEn : item.title;
  };

  const getExcerpt = (item: NewsItem) => {
    return locale === 'kz' ? item.excerptKz : locale === 'en' ? item.excerptEn : item.excerpt;
  };

  const getContent = (item: NewsItem) => {
    return locale === 'kz' ? item.contentKz : locale === 'en' ? item.contentEn : item.content;
  };

  if (loading) {
    return (
      <div className="flex flex-col">
        <section
          className="relative pt-[140px] sm:pt-[160px] lg:pt-[180px] pb-10 lg:pb-[60px]"
          style={{ backgroundColor: '#EEF6F6' }}
        >
          <div className="px-5 sm:px-8 md:px-12 lg:px-20">
            <div className="flex justify-center py-20">
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  border: '3px solid #E5E7EB',
                  borderTopColor: '#209DA7',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                }}
              />
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (notFoundState || !newsItem) {
    return (
      <div className="flex flex-col">
        <section
          className="relative pt-[140px] sm:pt-[160px] lg:pt-[180px] pb-10 lg:pb-[60px]"
          style={{ backgroundColor: '#EEF6F6' }}
        >
          <div className="px-5 sm:px-8 md:px-12 lg:px-20 text-center py-20">
            <h1 className="text-2xl font-semibold mb-4" style={{ color: '#091D33' }}>
              {locale === 'kz' ? 'Жаңалық табылмады' : locale === 'en' ? 'News not found' : 'Новость не найдена'}
            </h1>
            <Link href="/news" className="text-[#209DA7] hover:underline">
              {t.backToNews}
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section
        className="relative pt-[140px] sm:pt-[160px] lg:pt-[180px] pb-10 lg:pb-[60px]"
        style={{ backgroundColor: '#EEF6F6' }}
      >
        <div className="px-5 sm:px-8 md:px-12 lg:px-20">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 mb-6">
            <Link href="/" className="text-[13px]" style={{ color: '#9CA3AF' }}>
              {t.home}
            </Link>
            <span className="text-[13px]" style={{ color: '#9CA3AF' }}>/</span>
            <Link href="/news" className="text-[13px]" style={{ color: '#9CA3AF' }}>
              {t.news}
            </Link>
            <span className="text-[13px]" style={{ color: '#9CA3AF' }}>/</span>
            <span className="text-[13px]" style={{ color: '#209DA7' }}>
              {getTitle(newsItem)}
            </span>
          </div>

          {/* Back link */}
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-[13px] font-medium mb-6 hover:gap-3 transition-all"
            style={{ color: '#209DA7' }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            {t.backToNews}
          </Link>

          {/* Category & Date */}
          <div className="flex items-center gap-4 mb-4">
            <span
              className="text-[11px] uppercase tracking-wider font-medium"
              style={{
                backgroundColor: '#209DA7',
                color: 'white',
                padding: '6px 12px',
                borderRadius: '20px',
              }}
            >
              {catLabels[newsItem.category]}
            </span>
            <span className="text-[13px]" style={{ color: '#6B7280' }}>
              {formatDate(newsItem.publishedAt, locale)}
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-2xl sm:text-[30px] lg:text-[36px] font-semibold mb-4 max-w-[800px]"
            style={{ color: '#091D33', lineHeight: '1.3' }}
          >
            {getTitle(newsItem)}
          </h1>

          {/* Excerpt */}
          <p
            className="text-[16px] leading-[1.8] max-w-[700px]"
            style={{ color: '#6B7280' }}
          >
            {getExcerpt(newsItem)}
          </p>
        </div>
      </section>

      {/* Image Section */}
      <section className="bg-white px-5 sm:px-8 md:px-12 lg:px-20 py-6 lg:py-10">
        <div
          className="relative overflow-hidden h-[250px] sm:h-[350px] lg:h-[450px]"
          style={{ borderRadius: '16px', maxWidth: '1000px' }}
        >
          <Image
            src={newsItem.image}
            alt={getTitle(newsItem)}
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* Content Section */}
      <section className="bg-white px-5 sm:px-8 md:px-12 lg:px-20 pb-12 lg:pb-20">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          {/* Main Content */}
          <div className="flex-1 lg:max-w-[700px]">
            <div
              className="prose prose-lg"
              style={{
                color: '#3D3D3D',
                fontSize: '15px',
                lineHeight: '1.9',
              }}
              dangerouslySetInnerHTML={{ __html: getContent(newsItem) }}
            />

            {/* Share */}
            <div
              className="flex items-center gap-4 mt-12 pt-8"
              style={{ borderTop: '1px solid #E5E7EB' }}
            >
              <span className="text-[13px] font-medium" style={{ color: '#6B7280' }}>
                {t.share}:
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="#"
                  className="flex items-center justify-center hover:opacity-80 transition-opacity"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: '#F3F4F6',
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#6B7280">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="flex items-center justify-center hover:opacity-80 transition-opacity"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: '#F3F4F6',
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#6B7280">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="flex items-center justify-center hover:opacity-80 transition-opacity"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: '#F3F4F6',
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#6B7280">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Sidebar - Related News */}
          <div className="w-full lg:w-[320px] lg:flex-shrink-0">
            <h3
              className="text-[18px] font-semibold mb-6"
              style={{ color: '#091D33' }}
            >
              {t.relatedNews}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
              {relatedNews.map((item) => (
                <Link
                  key={item.id}
                  href={`/news/${item.slug}`}
                  className="group block"
                >
                  <div
                    className="relative mb-3 overflow-hidden"
                    style={{ borderRadius: '8px', height: '120px' }}
                  >
                    <Image
                      src={item.image}
                      alt={getTitle(item)}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <p className="text-[11px] mb-1" style={{ color: '#9CA3AF' }}>
                    {formatDate(item.publishedAt, locale)}
                  </p>
                  <h4
                    className="text-[14px] font-medium group-hover:text-[#209DA7] transition-colors"
                    style={{ color: '#091D33', lineHeight: '1.4' }}
                  >
                    {getTitle(item)}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
