'use client';

import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { MapPin, Mail, Phone } from 'lucide-react';

const translations: Record<string, Record<string, string>> = {
  ru: {
    description: 'Современная медицинская лаборатория с высокоточным оборудованием для качественной диагностики.',
    address: 'г. Алматы, ул. Ходжанова, 55а',
    quickLinks: 'Быстрые ссылки',
    home: 'Главная',
    about: 'О нас',
    services: 'Услуги и анализы',
    patients: 'Пациентам',
    news: 'Новости',
    contacts: 'Контакты',
    privacy: 'Политика конфиденциальности',
    workingHours: 'Часы работы',
    weekdays: 'Пн - Пт',
    weekend: 'Сб - Вс',
    closed: 'выходной',
    tspotCollection: 'Забор на T-SPOT',
    otherMaterials: 'Прием материалов',
    copyright: '© 2026 GammaLab - Все права защищены',
    madeWith: 'Разработано с заботой о здоровье',
  },
  kz: {
    description: 'Сапалы диагностика үшін жоғары дәлдіктегі жабдықтары бар заманауи медициналық зертхана.',
    address: 'Алматы қ., Ходжанов к., 55а',
    quickLinks: 'Жылдам сілтемелер',
    home: 'Басты бет',
    about: 'Біз туралы',
    services: 'Қызметтер мен анализдер',
    patients: 'Пациенттерге',
    news: 'Жаңалықтар',
    contacts: 'Байланыс',
    privacy: 'Құпиялылық саясаты',
    workingHours: 'Жұмыс уақыты',
    weekdays: 'Дс - Жм',
    weekend: 'Сб - Жс',
    closed: 'демалыс',
    tspotCollection: 'T-SPOT алу',
    otherMaterials: 'Материалдар қабылдау',
    copyright: '© 2026 GammaLab - Барлық құқықтар қорғалған',
    madeWith: 'Денсаулыққа қамқорлықпен жасалған',
  },
  en: {
    description: 'Modern medical laboratory with high-precision equipment for quality diagnostics.',
    address: 'Almaty, Khodzhanov St., 55a',
    quickLinks: 'Quick Links',
    home: 'Home',
    about: 'About',
    services: 'Services & Tests',
    patients: 'For Patients',
    news: 'News',
    contacts: 'Contacts',
    privacy: 'Privacy Policy',
    workingHours: 'Working Hours',
    weekdays: 'Mon - Fri',
    weekend: 'Sat - Sun',
    closed: 'closed',
    tspotCollection: 'T-SPOT Collection',
    otherMaterials: 'Materials Reception',
    copyright: '© 2026 GammaLab - All rights reserved',
    madeWith: 'Made with care for health',
  },
};

export default function Footer() {
  const locale = useLocale() as 'ru' | 'kz' | 'en';
  const t = translations[locale] || translations.ru;

  return (
    <footer className="bg-white">
      {/* Main Footer */}
      <div className="container-main pt-10 sm:pt-12 lg:pt-16 pb-8 lg:pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-6 lg:gap-12">
          {/* Column 1 - Logo & Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block mb-5">
              <Image
                src="/images/logo.png"
                alt="GammaLab"
                width={160}
                height={55}
                className="h-12 w-auto"
              />
            </Link>

            <p className="text-[13px] leading-[1.8] text-[#6B7280] mb-6 max-w-[300px]">
              {t.description}
            </p>

            {/* Contact Info */}
            <div className="flex flex-col gap-3 mb-6">
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 flex-shrink-0" style={{ color: '#209DA7' }} />
                <span className="text-[13px]" style={{ color: '#6B7280' }}>
                  {t.address}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 flex-shrink-0" style={{ color: '#209DA7' }} />
                <a
                  href="mailto:salem@gammalab.kz"
                  className="text-[13px] hover:opacity-70 transition-opacity"
                  style={{ color: '#6B7280' }}
                >
                  salem@gammalab.kz
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 flex-shrink-0" style={{ color: '#209DA7' }} />
                <a
                  href="tel:+77051000333"
                  className="text-[13px] hover:opacity-70 transition-opacity"
                  style={{ color: '#6B7280' }}
                >
                  +7-705-100-03-33
                </a>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2">
              {[
                { href: 'https://wa.me/77051000333', icon: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z' },
                { href: 'https://t.me/+77051000333', icon: 'M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z' },
                { href: 'https://www.instagram.com/gammalab_kz?igsh=aTU4dDZmYjF2MXli', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target={social.href !== '#' ? '_blank' : undefined}
                  rel={social.href !== '#' ? 'noopener noreferrer' : undefined}
                  className="flex items-center justify-center transition-all hover:border-[#209DA7] hover:bg-[#209DA7] hover:bg-opacity-10"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    border: '1px solid #E5E7EB'
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#209DA7">
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="text-[14px] font-semibold text-[#091D33] mb-5">
              {t.quickLinks}
            </h3>
            <div className="flex flex-col gap-3">
              <Link href="/" className="text-[13px] hover:text-[#209DA7] transition-colors" style={{ color: '#6B7280' }}>
                {t.home}
              </Link>
              <Link href="/analyses" className="text-[13px] hover:text-[#209DA7] transition-colors" style={{ color: '#6B7280' }}>
                {t.services}
              </Link>
              <Link href="/patients" className="text-[13px] hover:text-[#209DA7] transition-colors" style={{ color: '#6B7280' }}>
                {t.patients}
              </Link>
              <Link href="/contacts" className="text-[13px] hover:text-[#209DA7] transition-colors" style={{ color: '#6B7280' }}>
                {t.contacts}
              </Link>
              <Link href="/about" className="text-[13px] hover:text-[#209DA7] transition-colors" style={{ color: '#6B7280' }}>
                {t.about}
              </Link>
              <Link href="/news" className="text-[13px] hover:text-[#209DA7] transition-colors" style={{ color: '#6B7280' }}>
                {t.news}
              </Link>
              <Link href="/privacy" className="text-[13px] hover:text-[#209DA7] transition-colors" style={{ color: '#6B7280' }}>
                {t.privacy}
              </Link>
            </div>
          </div>

          {/* Column 3 - Opening Hours */}
          <div>
            <h3 className="text-[14px] font-semibold text-[#091D33] mb-5">
              {t.workingHours}
            </h3>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center gap-3">
                <span className="text-[13px]" style={{ color: '#6B7280' }}>{t.weekdays}</span>
                <span className="text-[13px] font-medium" style={{ color: '#209DA7' }}>09:00 - 18:00</span>
              </div>
              <div className="flex justify-between items-center gap-3">
                <span className="text-[13px]" style={{ color: '#6B7280' }}>{t.weekend}</span>
                <span className="text-[13px] font-medium" style={{ color: '#209DA7' }}>{t.closed}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#F3F4F6]">
        <div className="container-main py-5 lg:py-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-[12px] text-[#9CA3AF]">
            {t.copyright}
          </p>
          <p className="text-[12px] text-[#9CA3AF]">
            {t.madeWith}
          </p>
        </div>
      </div>
    </footer>
  );
}
