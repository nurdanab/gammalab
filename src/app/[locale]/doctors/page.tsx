'use client';

import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Construction } from 'lucide-react';

type Locale = 'ru' | 'kz' | 'en';

const translations = {
  ru: {
    home: 'Главная',
    title: 'Врачам',
    subtitle: 'Страница в разработке',
    description: 'Мы работаем над этим разделом. Скоро здесь появится полезная информация для врачей.',
    backHome: 'Вернуться на главную',
  },
  kz: {
    home: 'Басты бет',
    title: 'Дәрігерлерге',
    subtitle: 'Бет әзірлену үстінде',
    description: 'Біз бұл бөлім үстінде жұмыс істеп жатырмыз. Жақында мұнда дәрігерлер үшін пайдалы ақпарат пайда болады.',
    backHome: 'Басты бетке оралу',
  },
  en: {
    home: 'Home',
    title: 'For Doctors',
    subtitle: 'Page under development',
    description: 'We are working on this section. Useful information for doctors will appear here soon.',
    backHome: 'Back to home',
  },
};

export default function DoctorsPage() {
  const locale = useLocale() as Locale;
  const t = translations[locale] || translations.ru;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section
        className="relative pt-[100px] sm:pt-[110px] lg:pt-[120px] pb-8 lg:pb-10"
        style={{ backgroundColor: '#EEF6F6' }}
      >
        <div className="container-main">
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
            className="text-[28px] sm:text-[36px] lg:text-[42px] font-semibold"
            style={{ color: '#091D33' }}
          >
            {t.title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white flex-1 py-16 lg:py-24">
        <div className="container-main">
          <div className="flex flex-col items-center justify-center text-center max-w-[500px] mx-auto">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
              style={{ backgroundColor: '#EEF6F6' }}
            >
              <Construction size={40} style={{ color: '#209DA7' }} />
            </div>

            <h2
              className="text-[24px] sm:text-[28px] font-semibold mb-4"
              style={{ color: '#091D33' }}
            >
              {t.subtitle}
            </h2>

            <p
              className="text-[15px] leading-[1.8] mb-8"
              style={{ color: '#6B7280' }}
            >
              {t.description}
            </p>

            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[14px] font-medium transition-colors"
              style={{
                backgroundColor: '#209DA7',
                color: 'white',
              }}
            >
              {t.backHome}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
