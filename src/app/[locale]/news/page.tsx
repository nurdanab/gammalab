'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Link } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import type { NewsItem } from '@/lib/data';

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

const translations: Record<string, Record<string, string>> = {
  ru: {
    home: 'Главная',
    title: 'Новости и акции',
    subtitle: 'Будьте в курсе последних новостей нашей лаборатории, специальных предложений и полезных советов для вашего здоровья.',
    promotions: 'Актуальные акции',
    latestNews: 'Последние новости',
    readMore: 'Читать далее',
    loadMore: 'Загрузить ещё',
    validUntil: 'Действует до:',
    promotion: 'Акция',
  },
  kz: {
    home: 'Басты бет',
    title: 'Жаңалықтар мен акциялар',
    subtitle: 'Біздің зертхананың соңғы жаңалықтарынан, арнайы ұсыныстардан және денсаулығыңызға пайдалы кеңестерден хабардар болыңыз.',
    promotions: 'Өзекті акциялар',
    latestNews: 'Соңғы жаңалықтар',
    readMore: 'Толығырақ оқу',
    loadMore: 'Тағы жүктеу',
    validUntil: 'Әрекет ету мерзімі:',
    promotion: 'Акция',
  },
  en: {
    home: 'Home',
    title: 'News & Promotions',
    subtitle: 'Stay updated with the latest news from our laboratory, special offers, and useful tips for your health.',
    promotions: 'Current Promotions',
    latestNews: 'Latest News',
    readMore: 'Read more',
    loadMore: 'Load more',
    validUntil: 'Valid until:',
    promotion: 'Promotion',
  },
};

const promoColors = ['#209DA7', '#EC910C', '#091D33', '#209DA7', '#EC910C', '#091D33'];

export default function NewsPage() {
  const locale = useLocale() as 'ru' | 'kz' | 'en';
  const t = translations[locale] || translations.ru;

  const [news, setNews] = useState<NewsItem[]>([]);
  const [promotions, setPromotions] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/news');
        if (res.ok) {
          const data = await res.json();
          setNews(data.news || []);
          setPromotions(data.promotions || []);
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Only show news items (not promotions)
  const newsOnly = news.filter(n => n.category === 'news');
  const visibleNews = newsOnly.slice(0, visibleCount);
  const hasMore = visibleCount < newsOnly.length;

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
        {/* Hero Section */}
        <section
          className="relative pt-[140px] sm:pt-[160px] lg:pt-[180px] pb-12 lg:pb-20"
          style={{ backgroundColor: '#EEF6F6' }}
        >
          <div className="px-5 sm:px-8 md:px-12 lg:px-20">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-[13px]" style={{ color: '#9CA3AF' }}>{t.home}</span>
              <span className="text-[13px]" style={{ color: '#9CA3AF' }}>/</span>
              <span className="text-[13px]" style={{ color: '#209DA7' }}>{t.title}</span>
            </div>
            <h1 className="text-[28px] sm:text-[36px] lg:text-[42px] font-semibold mb-4" style={{ color: '#091D33' }}>
              {t.title}
            </h1>
            <p className="text-[15px] leading-[1.8] max-w-[600px]" style={{ color: '#6B7280' }}>
              {t.subtitle}
            </p>
          </div>
        </section>
        <section className="bg-white px-5 sm:px-8 md:px-12 lg:px-20 py-12 lg:py-20">
          <div className="flex justify-center">
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
        </section>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section
        className="relative pt-[140px] sm:pt-[160px] lg:pt-[180px] pb-12 lg:pb-20"
        style={{ backgroundColor: '#EEF6F6' }}
      >
        <div className="px-5 sm:px-8 md:px-12 lg:px-20">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 mb-6">
            <Link href="/" className="text-[13px]" style={{ color: '#9CA3AF' }}>
              {t.home}
            </Link>
            <span className="text-[13px]" style={{ color: '#9CA3AF' }}>/</span>
            <span className="text-[13px]" style={{ color: '#209DA7' }}>
              {t.title}
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-[28px] sm:text-[36px] lg:text-[42px] font-semibold mb-4"
            style={{ color: '#091D33' }}
          >
            {t.title}
          </h1>
          <p
            className="text-[15px] leading-[1.8] max-w-[600px]"
            style={{ color: '#6B7280' }}
          >
            {t.subtitle}
          </p>
        </div>
      </section>

      {/* Promotions Section */}
      {promotions.length > 0 && (
        <section className="bg-white px-5 sm:px-8 md:px-12 lg:px-20 py-12 lg:py-20">
          <h2
            className="text-xl sm:text-2xl lg:text-[28px] font-semibold mb-6 lg:mb-8"
            style={{ color: '#091D33' }}
          >
            {t.promotions}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {promotions.map((promo, index) => (
              <Link
                key={promo.id}
                href={`/news/${promo.slug}`}
                className="relative overflow-hidden block hover:opacity-95 transition-opacity"
                style={{
                  backgroundColor: promoColors[index % promoColors.length],
                  borderRadius: '16px',
                  padding: '32px',
                  minHeight: '200px',
                }}
              >
                {/* Decorative circle */}
                <div
                  className="absolute"
                  style={{
                    width: '150px',
                    height: '150px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    right: '-30px',
                    bottom: '-30px',
                  }}
                />

                <div className="relative">
                  <span
                    className="inline-block text-[11px] uppercase tracking-wider mb-4"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      padding: '6px 12px',
                      borderRadius: '20px',
                    }}
                  >
                    {t.promotion}
                  </span>
                  <h3
                    className="text-[20px] font-semibold text-white mb-3"
                    style={{ lineHeight: '1.3' }}
                  >
                    {getTitle(promo)}
                  </h3>
                  <p
                    className="text-[13px] mb-4"
                    style={{ color: 'rgba(255, 255, 255, 0.85)' }}
                  >
                    {getExcerpt(promo)}
                  </p>
                  <p
                    className="text-[12px]"
                    style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                  >
                    {formatDate(promo.publishedAt, locale)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* News Section */}
      <section className="bg-white px-5 sm:px-8 md:px-12 lg:px-20 py-12 lg:py-20">
        <h2
          className="text-xl sm:text-2xl lg:text-[28px] font-semibold mb-6 lg:mb-8"
          style={{ color: '#091D33' }}
        >
          {t.latestNews}
        </h2>

        {/* News Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleNews.map((item) => (
            <Link
              key={item.id}
              href={`/news/${item.slug}`}
              className="group cursor-pointer block"
            >
              <div
                className="relative mb-5 overflow-hidden"
                style={{ borderRadius: '12px', height: '200px' }}
              >
                <Image
                  src={item.image}
                  alt={getTitle(item)}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Date */}
              <p className="text-[12px] mb-2" style={{ color: '#9CA3AF' }}>
                {formatDate(item.publishedAt, locale)}
              </p>

              {/* Title */}
              <h3
                className="text-[17px] font-semibold mb-3 group-hover:text-[#209DA7] transition-colors"
                style={{ color: '#091D33', lineHeight: '1.4' }}
              >
                {getTitle(item)}
              </h3>

              {/* Excerpt */}
              <p
                className="text-[13px] leading-[1.7] mb-4"
                style={{ color: '#6B7280' }}
              >
                {getExcerpt(item)}
              </p>

              {/* Read more */}
              <span
                className="text-[13px] font-medium inline-flex items-center gap-2 group-hover:gap-3 transition-all"
                style={{ color: '#209DA7' }}
              >
                {t.readMore}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="text-center" style={{ marginTop: '50px' }}>
            <button
              onClick={() => setVisibleCount(prev => prev + 6)}
              className="inline-flex items-center gap-2 text-[13px] font-medium hover:bg-[#209DA7] hover:text-white transition-colors"
              style={{
                border: '1px solid #209DA7',
                color: '#209DA7',
                padding: '14px 32px',
                borderRadius: '8px',
                backgroundColor: 'transparent',
              }}
            >
              {t.loadMore}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </button>
          </div>
        )}
      </section>

    </div>
  );
}
