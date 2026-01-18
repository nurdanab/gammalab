import Image from 'next/image';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function NewsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <NewsContent />;
}

const newsItems = [
  {
    id: 1,
    title: '10 продуктов для здоровья сердца',
    excerpt: 'Узнайте какие продукты помогут сохранить здоровье вашей сердечно-сосудистой системы.',
    image: '/images/news-1.jpg',
    date: '15 января 2026',
    category: 'Здоровье',
  },
  {
    id: 2,
    title: 'Как справиться со стрессом',
    excerpt: 'Эффективные методы релаксации и управления стрессом в повседневной жизни.',
    image: '/images/news-2.jpg',
    date: '12 января 2026',
    category: 'Советы',
  },
  {
    id: 3,
    title: 'Укрепление иммунитета',
    excerpt: 'Лучшие способы укрепить иммунную систему и защитить организм от инфекций.',
    image: '/images/news-3.jpg',
    date: '10 января 2026',
    category: 'Здоровье',
  },
  {
    id: 4,
    title: 'Новое оборудование в лаборатории',
    excerpt: 'Мы обновили парк диагностического оборудования для более точных результатов.',
    image: '/images/news-1.jpg',
    date: '8 января 2026',
    category: 'Новости',
  },
  {
    id: 5,
    title: 'Скидка 20% на комплексные анализы',
    excerpt: 'Только до конца месяца действует специальное предложение на комплексные обследования.',
    image: '/images/news-2.jpg',
    date: '5 января 2026',
    category: 'Акции',
  },
  {
    id: 6,
    title: 'Важность регулярных обследований',
    excerpt: 'Почему важно проходить профилактические обследования минимум раз в год.',
    image: '/images/news-3.jpg',
    date: '3 января 2026',
    category: 'Советы',
  },
];

const promoItems = [
  {
    id: 1,
    title: 'Скидка 20% на все анализы',
    description: 'При первом посещении получите скидку 20% на любой анализ',
    validUntil: '31 января 2026',
    bgColor: '#209DA7',
  },
  {
    id: 2,
    title: 'Комплекс "Здоровое сердце"',
    description: 'Полное обследование сердечно-сосудистой системы со скидкой 30%',
    validUntil: '28 февраля 2026',
    bgColor: '#EC910C',
  },
  {
    id: 3,
    title: 'Бесплатная консультация',
    description: 'Запишитесь на бесплатную консультацию к терапевту',
    validUntil: '15 февраля 2026',
    bgColor: '#091D33',
  },
];

function NewsContent() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section
        className="relative"
        style={{
          backgroundColor: '#EEF6F6',
          paddingTop: '180px',
          paddingBottom: '80px',
        }}
      >
        <div style={{ paddingLeft: '80px', paddingRight: '80px' }}>
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 mb-6">
            <Link href="/" className="text-[13px]" style={{ color: '#9CA3AF' }}>
              Главная
            </Link>
            <span className="text-[13px]" style={{ color: '#9CA3AF' }}>/</span>
            <span className="text-[13px]" style={{ color: '#209DA7' }}>
              Новости и акции
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-[42px] font-semibold mb-4"
            style={{ color: '#091D33' }}
          >
            Новости и акции
          </h1>
          <p
            className="text-[15px] leading-[1.8] max-w-[600px]"
            style={{ color: '#6B7280' }}
          >
            Будьте в курсе последних новостей нашей лаборатории, специальных
            предложений и полезных советов для вашего здоровья.
          </p>
        </div>
      </section>

      {/* Promotions Section */}
      <section className="bg-white" style={{ padding: '60px 80px' }}>
        <h2
          className="text-[28px] font-semibold mb-8"
          style={{ color: '#091D33' }}
        >
          Актуальные акции
        </h2>

        <div className="grid grid-cols-3 gap-6">
          {promoItems.map((promo) => (
            <div
              key={promo.id}
              className="relative overflow-hidden"
              style={{
                backgroundColor: promo.bgColor,
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
                  Акция
                </span>
                <h3
                  className="text-[20px] font-semibold text-white mb-3"
                  style={{ lineHeight: '1.3' }}
                >
                  {promo.title}
                </h3>
                <p
                  className="text-[13px] mb-4"
                  style={{ color: 'rgba(255, 255, 255, 0.85)' }}
                >
                  {promo.description}
                </p>
                <p
                  className="text-[12px]"
                  style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                >
                  Действует до: {promo.validUntil}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* News Section */}
      <section className="bg-white" style={{ padding: '40px 80px 80px' }}>
        <div className="flex items-center justify-between mb-8">
          <h2
            className="text-[28px] font-semibold"
            style={{ color: '#091D33' }}
          >
            Последние новости
          </h2>

          {/* Filter Tags */}
          <div className="flex items-center gap-3">
            <button
              className="text-[13px] font-medium"
              style={{
                backgroundColor: '#209DA7',
                color: 'white',
                padding: '8px 20px',
                borderRadius: '20px',
              }}
            >
              Все
            </button>
            <button
              className="text-[13px] font-medium"
              style={{
                backgroundColor: '#F3F4F6',
                color: '#6B7280',
                padding: '8px 20px',
                borderRadius: '20px',
              }}
            >
              Новости
            </button>
            <button
              className="text-[13px] font-medium"
              style={{
                backgroundColor: '#F3F4F6',
                color: '#6B7280',
                padding: '8px 20px',
                borderRadius: '20px',
              }}
            >
              Акции
            </button>
            <button
              className="text-[13px] font-medium"
              style={{
                backgroundColor: '#F3F4F6',
                color: '#6B7280',
                padding: '8px 20px',
                borderRadius: '20px',
              }}
            >
              Советы
            </button>
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-3 gap-6">
          {newsItems.map((news) => (
            <div
              key={news.id}
              className="group cursor-pointer"
            >
              <div
                className="relative mb-5 overflow-hidden"
                style={{ borderRadius: '12px', height: '200px' }}
              >
                <Image
                  src={news.image}
                  alt={news.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Category badge */}
                <span
                  className="absolute top-4 left-4 text-[11px] uppercase tracking-wider font-medium"
                  style={{
                    backgroundColor: 'white',
                    color: '#209DA7',
                    padding: '6px 12px',
                    borderRadius: '20px',
                  }}
                >
                  {news.category}
                </span>
              </div>

              {/* Date */}
              <p className="text-[12px] mb-2" style={{ color: '#9CA3AF' }}>
                {news.date}
              </p>

              {/* Title */}
              <h3
                className="text-[17px] font-semibold mb-3 group-hover:text-primary transition-colors"
                style={{ color: '#091D33', lineHeight: '1.4' }}
              >
                {news.title}
              </h3>

              {/* Excerpt */}
              <p
                className="text-[13px] leading-[1.7] mb-4"
                style={{ color: '#6B7280' }}
              >
                {news.excerpt}
              </p>

              {/* Read more */}
              <span
                className="text-[13px] font-medium inline-flex items-center gap-2 group-hover:gap-3 transition-all"
                style={{ color: '#209DA7' }}
              >
                Читать далее
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
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center" style={{ marginTop: '50px' }}>
          <button
            className="inline-flex items-center gap-2 text-[13px] font-medium"
            style={{
              border: '1px solid #209DA7',
              color: '#209DA7',
              padding: '14px 32px',
              borderRadius: '8px',
              backgroundColor: 'transparent',
            }}
          >
            Загрузить ещё
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
      </section>

      {/* Subscribe Section */}
      <section
        className="relative overflow-hidden"
        style={{
          backgroundColor: '#209DA7',
          padding: '70px 80px',
        }}
      >
        {/* Background decoration */}
        <div
          className="absolute"
          style={{
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            left: '-100px',
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        />
        <div
          className="absolute"
          style={{
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            right: '-50px',
            bottom: '-100px',
          }}
        />

        <div className="relative flex items-center justify-between">
          {/* Left - Text */}
          <div>
            <p
              className="text-[11px] uppercase tracking-widest mb-3"
              style={{ color: 'rgba(255, 255, 255, 0.7)' }}
            >
              Подписка на новости
            </p>
            <h2 className="text-[32px] font-semibold text-white leading-[1.3]">
              Будьте в курсе
              <br />
              наших новостей
            </h2>
          </div>

          {/* Right - Email Input */}
          <div
            className="flex items-center"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              borderRadius: '50px',
              padding: '6px 6px 6px 28px',
              minWidth: '420px',
            }}
          >
            <input
              type="email"
              placeholder="Введите ваш email"
              className="flex-1 bg-transparent outline-none text-[14px] placeholder-white/60"
              style={{ color: 'white' }}
            />
            <button
              className="text-[12px] font-medium uppercase tracking-wider"
              style={{
                backgroundColor: 'white',
                color: '#091D33',
                padding: '14px 28px',
                borderRadius: '50px',
              }}
            >
              Подписаться
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
