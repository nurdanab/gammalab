import Image from 'next/image';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { getHomepageCategories, getFeaturedHomepageCategory, getHomepageReviews, getFeaturedNewsFromCMS, getHeroCarousels, type HomepageCategory, type Review, type NewsItem } from '@/lib/data';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';
import CategoriesSection from '@/components/CategoriesSection';
import HeroCarousel from '@/components/HeroCarousel';
import MissionAccordion from '@/components/MissionAccordion';
import ServicesSection from '@/components/ServicesSection';

type Props = {
  params: Promise<{ locale: string }>;
};


export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Home');

  // Fetch data from CMS
  const [categories, featuredCategory, reviews, news, heroSlides] = await Promise.all([
    getHomepageCategories(),
    getFeaturedHomepageCategory(),
    getHomepageReviews(),
    getFeaturedNewsFromCMS(3),
    getHeroCarousels(),
  ]);

  return (
    <div className="flex flex-col">
      {/* Hero Carousel */}
      <HeroCarousel slides={heroSlides} locale={locale} />

      {/* Mission Section with Accordion */}
      <MissionAccordion locale={locale} />

      {/* Services Section with Animations */}
      <ServicesSection locale={locale} />

      {/* Testimonials Section */}
      {reviews.length > 0 && (
        <TestimonialsSection reviews={reviews} locale={locale} />
      )}

      {/* News Section */}
      {news.length > 0 && (
        <NewsSection news={news} locale={locale} />
      )}

      {/* Quick Search Section */}
      <QuickSearchSection locale={locale} />
    </div>
  );
}


// Testimonials Section Component
function TestimonialsSection({ reviews, locale }: { reviews: Review[]; locale: string }) {
  // Prepare avatar positions for decoration with animations
  const avatarPositions = [
    { top: '0', left: '50%', transform: 'translateX(-50%)', size: 'w-16 h-16 sm:w-20 sm:h-20 lg:w-[90px] lg:h-[90px]', animation: 'float-1 4s ease-in-out infinite' },
    { top: '70px', left: '20px', size: 'w-12 h-12 sm:w-14 sm:h-14 lg:w-[70px] lg:h-[70px]', animation: 'float-2 5s ease-in-out infinite 0.5s' },
    { top: '50px', right: '30px', size: 'w-14 h-14 sm:w-16 sm:h-16 lg:w-[80px] lg:h-[80px]', animation: 'float-3 6s ease-in-out infinite 1s' },
    { bottom: '30px', left: '50px', size: 'w-12 h-12 sm:w-14 sm:h-14 lg:w-[75px] lg:h-[75px]', animation: 'float-2 4.5s ease-in-out infinite 0.3s' },
    { bottom: '10px', right: '60px', size: 'w-10 h-10 sm:w-12 sm:h-12 lg:w-[65px] lg:h-[65px]', animation: 'float-1 5.5s ease-in-out infinite 0.7s' },
  ];

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #EEF6F6 0%, #E8F4F4 100%)' }}
    >
      {/* Background decorative circle with pulse */}
      <div
        className="absolute -right-24 top-1/2 w-[250px] sm:w-[300px] lg:w-[400px] h-[250px] sm:h-[300px] lg:h-[400px] rounded-full border-2 border-[rgba(32,157,167,0.15)]"
        style={{ animation: 'pulse-circle 3s ease-in-out infinite' }}
      />

      <div className="container-main py-10 sm:py-12 lg:py-20">
        <div className="relative flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
        {/* Left - Photos decoration */}
        <div className="relative w-full sm:w-[280px] lg:w-[350px] h-[180px] sm:h-[220px] lg:h-[300px] hidden sm:block flex-shrink-0">
          {reviews.slice(0, 5).map((review, index) => {
            const pos = avatarPositions[index];
            return (
              <div
                key={review.id}
                className={`absolute overflow-hidden rounded-full border-[3px] border-white shadow-lg ${pos.size}`}
                style={{
                  top: pos.top,
                  left: pos.left,
                  right: pos.right,
                  bottom: pos.bottom,
                  transform: pos.transform,
                  animation: pos.animation,
                }}
              >
                {review.photo ? (
                  <Image src={review.photo} alt="" fill className="object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#209DA7] to-[#1a7d85] flex items-center justify-center text-white text-base sm:text-lg font-semibold">
                    {review.name.charAt(0)}
                  </div>
                )}
              </div>
            );
          })}
        </div>

          {/* Right - Testimonial carousel */}
          <TestimonialsCarousel reviews={reviews} locale={locale} />
        </div>
      </div>
    </section>
  );
}

// News Section Component
function NewsSection({ news, locale }: { news: NewsItem[]; locale: string }) {
  const getTitle = (item: NewsItem) => {
    return locale === 'kz' ? item.titleKz : locale === 'en' ? item.titleEn : item.title;
  };

  const getExcerpt = (item: NewsItem) => {
    return locale === 'kz' ? item.excerptKz : locale === 'en' ? item.excerptEn : item.excerpt;
  };

  const sectionTexts = {
    ru: { title: 'Наши последние новости', readMore: 'Читать далее', allNews: 'Все новости' },
    kz: { title: 'Біздің соңғы жаңалықтар', readMore: 'Толығырақ оқу', allNews: 'Барлық жаңалықтар' },
    en: { title: 'Our latest news', readMore: 'Read more', allNews: 'All news' },
  };

  const t = sectionTexts[locale as keyof typeof sectionTexts] || sectionTexts.ru;

  return (
    <section className="bg-white">
      <div className="container-main py-12 lg:py-20">
        <h2 className="text-xl sm:text-2xl lg:text-[28px] font-semibold mb-8 lg:mb-10 text-[#091D33]">
          {t.title}
      </h2>

      {/* News Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 mb-10 lg:mb-12">
        {news.map((item) => (
          <Link key={item.id} href={`/news/${item.slug}`} className="group">
            <div className="relative mb-4 lg:mb-5 overflow-hidden rounded-lg h-[160px] lg:h-[180px]">
              <Image
                src={item.image}
                alt={getTitle(item)}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="text-sm lg:text-[15px] font-semibold mb-2 text-[#091D33] group-hover:text-[#209DA7] transition-colors line-clamp-2">
              {getTitle(item)}
            </h3>
            <p className="text-xs lg:text-[13px] leading-[1.7] mb-3 lg:mb-4 text-gray-400 line-clamp-2">
              {getExcerpt(item)}
            </p>
            <span className="text-xs lg:text-[13px] font-medium text-[#209DA7]">
              {t.readMore}
            </span>
          </Link>
        ))}
      </div>

        {/* Button */}
        <div className="text-center">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider border border-[#209DA7] text-[#209DA7] px-6 lg:px-7 py-3 rounded-md bg-transparent hover:bg-[#209DA7] hover:text-white transition-colors"
          >
            {t.allNews}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

// Quick Search Section Component
function QuickSearchSection({ locale }: { locale: string }) {
  const content = {
    ru: { label: 'Быстрый поиск', title1: 'Найдите нужный', title2: 'анализ быстро', placeholder: 'Введите название анализа', button: 'Найти' },
    kz: { label: 'Жылдам іздеу', title1: 'Қажетті анализді', title2: 'тез табыңыз', placeholder: 'Анализ атауын енгізіңіз', button: 'Табу' },
    en: { label: 'Quick search', title1: 'Find the right', title2: 'test quickly', placeholder: 'Enter test name', button: 'Find' },
  };

  const t = content[locale as keyof typeof content] || content.ru;

  return (
    <section className="relative overflow-hidden bg-[#209DA7]">
      {/* Background decoration */}
      <div className="absolute -left-24 top-1/2 -translate-y-1/2 w-[300px] lg:w-[400px] h-[300px] lg:h-[400px] rounded-full bg-white/5" />

      <div className="container-main py-12 lg:py-[70px]">
        <div className="relative flex flex-col lg:flex-row items-center lg:justify-between gap-6 lg:gap-8">
          {/* Left - Text */}
          <div className="text-center lg:text-left">
            <p className="text-[10px] lg:text-[11px] uppercase tracking-widest mb-2 lg:mb-3 text-white/70">
              {t.label}
            </p>
            <h2 className="text-2xl sm:text-[28px] lg:text-[32px] font-semibold text-white leading-[1.3]">
              {t.title1}
              <br className="hidden lg:block" />{' '}
              {t.title2}
            </h2>
          </div>

          {/* Right - Search Input */}
          <form
            action={`/${locale}/analyses`}
            method="get"
            className="flex items-center w-full lg:w-auto bg-white/15 rounded-full p-1.5 lg:p-1.5 pl-5 lg:pl-7 min-w-0 lg:min-w-[420px]"
          >
            <input
              type="text"
              name="search"
              placeholder={t.placeholder}
              className="flex-1 bg-transparent outline-none text-sm text-white placeholder:text-white/60 min-w-0"
            />
            <button
              type="submit"
              className="text-xs font-medium uppercase tracking-wider bg-white text-[#091D33] px-5 lg:px-7 py-3 lg:py-3.5 rounded-full hover:bg-gray-100 transition-colors whitespace-nowrap"
            >
              {t.button}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
