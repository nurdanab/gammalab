'use client';

import { Link } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import {
  MapPin,
  Phone,
  Clock,
  ExternalLink,
} from 'lucide-react';

const translations: Record<string, Record<string, string>> = {
  ru: {
    home: 'Главная',
    title: 'Где пройти тест?',
    subtitle: 'Посетите наш филиал GammaLab для сдачи анализов.',
    ourBranch: 'Наш филиал',
    address: 'Адрес',
    addressValue: 'г. Алматы, ул. Ходжанова, д. 55а',
    openIn2gis: 'Открыть в 2ГИС',
    phone: 'Телефон',
    workingHours: 'Режим работы',
    weekdays: 'Пн-Пт',
    weekend: 'Сб-Вс',
    closed: 'выходной',
    tspotCollection: 'Забор на T-SPOT',
    otherMaterials: 'Прием материалов',
    onlineBooking: 'Онлайн-запись',
    onlineBookingDesc: 'Запишитесь на удобное время онлайн и избегайте очередей. Экономьте своё время.',
    book: 'Записаться',
    hotline: 'Горячая линия',
    hotlineDesc: 'Позвоните нам для консультации или уточнения информации о наших услугах.',
  },
  kz: {
    home: 'Басты бет',
    title: 'Тестті қайда тапсыруға болады?',
    subtitle: 'Анализ тапсыру үшін GammaLab филиалына келіңіз.',
    ourBranch: 'Біздің филиал',
    address: 'Мекенжай',
    addressValue: 'Алматы қ., Ходжанов к., 55а үй',
    openIn2gis: '2ГИС-те ашу',
    phone: 'Телефон',
    workingHours: 'Жұмыс уақыты',
    weekdays: 'Дс-Жм',
    weekend: 'Сб-Жс',
    closed: 'демалыс',
    tspotCollection: 'T-SPOT алу',
    otherMaterials: 'Материалдар қабылдау',
    onlineBooking: 'Онлайн жазылу',
    onlineBookingDesc: 'Ыңғайлы уақытқа онлайн жазылыңыз және кезекте тұрмаңыз. Уақытыңызды үнемдеңіз.',
    book: 'Жазылу',
    hotline: 'Ыстық желі',
    hotlineDesc: 'Кеңес алу немесе қызметтеріміз туралы ақпарат алу үшін бізге қоңырау шалыңыз.',
  },
  en: {
    home: 'Home',
    title: 'Where to get tested?',
    subtitle: 'Visit our GammaLab branch for testing.',
    ourBranch: 'Our branch',
    address: 'Address',
    addressValue: 'Almaty, Khodzhanov St., 55a',
    openIn2gis: 'Open in 2GIS',
    phone: 'Phone',
    workingHours: 'Working hours',
    weekdays: 'Mon-Fri',
    weekend: 'Sat-Sun',
    closed: 'closed',
    tspotCollection: 'T-SPOT collection',
    otherMaterials: 'Materials reception',
    onlineBooking: 'Online booking',
    onlineBookingDesc: 'Book a convenient time online and avoid queues. Save your time.',
    book: 'Book now',
    hotline: 'Hotline',
    hotlineDesc: 'Call us for consultation or more information about our services.',
  },
};

export default function TestLocationsPage() {
  const locale = useLocale() as 'ru' | 'kz' | 'en';
  const t = translations[locale] || translations.ru;

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section
        className="relative pt-[100px] sm:pt-[110px] lg:pt-[120px] pb-8 lg:pb-10"
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

      {/* Branch Section */}
      <section className="bg-white px-5 sm:px-8 md:px-12 lg:px-20 py-10 lg:py-16">
        <div className="max-w-[900px] mx-auto">
          <h2
            className="text-[20px] sm:text-[24px] font-semibold mb-6"
            style={{ color: '#091D33' }}
          >
            {t.ourBranch}
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Map - 2GIS Widget */}
            <a
              href="https://go.2gis.com/D23Va"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                backgroundColor: 'white',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'box-shadow 0.2s',
              }}
              className="hover:shadow-lg"
            >
              <div style={{ position: 'relative' }}>
                <iframe
                  src="https://www.openstreetmap.org/export/embed.html?bbox=76.86%2C43.20%2C76.89%2C43.22&layer=mapnik&marker=43.2077%2C76.8730"
                  width="100%"
                  height="280"
                  style={{ border: 0, pointerEvents: 'none' }}
                  loading="lazy"
                  title="GammaLab - Ходжанова 55а"
                />
                {/* Clickable overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'transparent',
                  }}
                />
              </div>
              <div style={{ padding: '16px', borderTop: '1px solid #f0f0f0' }}>
                <p style={{ fontSize: '14px', fontWeight: '500', color: '#091D33', marginBottom: '4px' }}>
                  {t.addressValue}
                </p>
                <span
                  className="inline-flex items-center gap-2"
                  style={{
                    fontSize: '13px',
                    color: '#209DA7',
                    fontWeight: '500',
                  }}
                >
                  <ExternalLink size={14} />
                  {t.openIn2gis}
                </span>
              </div>
            </a>

            {/* Branch Info */}
            <div
              style={{
                backgroundColor: '#F9FAFB',
                borderRadius: '16px',
                padding: '24px',
              }}
            >
              <h3
                className="text-[18px] font-semibold mb-5"
                style={{ color: '#091D33' }}
              >
                GammaLab
              </h3>

              <div className="flex flex-col gap-4">
                {/* Address */}
                <div className="flex items-start gap-3">
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: '#e8f5f6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <MapPin size={16} style={{ color: '#209DA7' }} />
                  </div>
                  <div>
                    <p style={{ fontSize: '13px', fontWeight: '600', color: '#091D33', marginBottom: '2px' }}>
                      {t.address}
                    </p>
                    <p style={{ fontSize: '14px', color: '#6B7280' }}>
                      {t.addressValue}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3">
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: '#e8f5f6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Phone size={16} style={{ color: '#209DA7' }} />
                  </div>
                  <div>
                    <p style={{ fontSize: '13px', fontWeight: '600', color: '#091D33', marginBottom: '2px' }}>
                      {t.phone}
                    </p>
                    <a
                      href="tel:+77051000333"
                      style={{ fontSize: '14px', color: '#209DA7', textDecoration: 'none' }}
                    >
                      +7-705-100-03-33
                    </a>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-3">
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: '#e8f5f6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Clock size={16} style={{ color: '#209DA7' }} />
                  </div>
                  <div>
                    <p style={{ fontSize: '13px', fontWeight: '600', color: '#091D33', marginBottom: '4px' }}>
                      {t.workingHours}
                    </p>
                    <div className="flex flex-col gap-1">
                      <p style={{ fontSize: '13px', color: '#6B7280' }}>
                        {t.weekdays}: <span style={{ color: '#209DA7', fontWeight: '500' }}>09:00 - 18:00</span>
                      </p>
                      <p style={{ fontSize: '13px', color: '#6B7280' }}>
                        {t.tspotCollection}: <span style={{ color: '#209DA7', fontWeight: '500' }}>09:00 - 12:00</span>
                      </p>
                      <p style={{ fontSize: '13px', color: '#6B7280' }}>
                        {t.otherMaterials}: <span style={{ color: '#209DA7', fontWeight: '500' }}>09:00 - 17:00</span>
                      </p>
                      <p style={{ fontSize: '13px', color: '#6B7280' }}>
                        {t.weekend}: <span style={{ color: '#209DA7', fontWeight: '500' }}>{t.closed}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info Cards Section */}
      <section className="bg-white px-5 sm:px-8 md:px-12 lg:px-20 pb-12 lg:pb-20">
        <div className="max-w-[900px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Card 1 - Online Booking */}
            <div
              style={{
                backgroundColor: '#F9FAFB',
                borderRadius: '16px',
                padding: '24px',
              }}
            >
              <div
                className="flex items-center justify-center mb-5"
                style={{
                  width: '50px',
                  height: '50px',
                  backgroundColor: '#EC910C',
                  borderRadius: '12px',
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <h3
                className="text-[16px] sm:text-[18px] font-semibold mb-3"
                style={{ color: '#091D33' }}
              >
                {t.onlineBooking}
              </h3>
              <p className="text-[12px] sm:text-[13px] leading-[1.7]" style={{ color: '#6B7280' }}>
                {t.onlineBookingDesc}
              </p>
              <button
                className="text-[12px] sm:text-[13px] font-medium mt-4 inline-flex items-center gap-2"
                style={{ color: '#EC910C' }}
              >
                {t.book}
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
              </button>
            </div>

            {/* Card 2 - Hotline */}
            <div
              style={{
                backgroundColor: '#F9FAFB',
                borderRadius: '16px',
                padding: '24px',
              }}
            >
              <div
                className="flex items-center justify-center mb-5"
                style={{
                  width: '50px',
                  height: '50px',
                  backgroundColor: '#091D33',
                  borderRadius: '12px',
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <h3
                className="text-[16px] sm:text-[18px] font-semibold mb-3"
                style={{ color: '#091D33' }}
              >
                {t.hotline}
              </h3>
              <p className="text-[12px] sm:text-[13px] leading-[1.7]" style={{ color: '#6B7280' }}>
                {t.hotlineDesc}
              </p>
              <a
                href="tel:+77051000333"
                className="text-[12px] sm:text-[13px] font-medium mt-4 inline-flex items-center gap-2"
                style={{ color: '#091D33' }}
              >
                +7-705-100-03-33
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
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
