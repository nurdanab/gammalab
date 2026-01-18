'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { locales, Locale } from '@/i18n/config';
import { useLocale } from 'next-intl';
import {
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  ChevronDown,
  Search,
} from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = useLocale() as Locale;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const moreMenuItems = [
    { href: '/news', label: 'Новости и акции' },
    { href: '/test-locations', label: 'Где пройти тест?' },
    { href: '/submit-analysis', label: 'Сдать анализ' },
  ];

  const handleLocaleChange = (locale: Locale) => {
    router.replace(pathname, { locale });
  };

  const localeNames: Record<Locale, string> = {
    ru: 'РУ',
    kz: 'ҚЗ',
    en: 'EN',
  };

  const navItems = [
    { href: '/', label: 'Главная' },
    { href: '/about', label: 'О нас' },
    { href: '/analyses', label: 'Услуги и анализы' },
    { href: '/patients', label: 'Пациентам' },
    { href: '/contacts', label: 'Контакты' },
    { href: '/more', label: 'Еще', hasDropdown: true },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      {/* Top Bar */}
      <div className="bg-white">
        <div style={{ paddingLeft: '80px', paddingRight: '80px', paddingBottom: '40px' }}>
          <div className="flex items-center justify-between" style={{ height: '70px' }}>
            {/* Logo - Left */}
            <Link href="/" className="flex items-center shrink-0">
              <Image
                src="/images/logo-gammalab.png"
                alt="GammaLab"
                width={140}
                height={55}
                className="h-10 w-auto"
                priority
              />
            </Link>

            {/* Right side - Contacts + Login + Language */}
            <div className="hidden lg:flex items-center gap-6">
              {/* Contact Info */}
              <a
                href="mailto:Salem@Gammalab.kz"
                className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors text-[13px] font-light"
              >
                <Mail className="h-3.5 w-3.5 text-primary" />
                <span>Salem@Gammalab.kz</span>
              </a>
              <span className="flex items-center gap-2 text-gray-500 text-[13px] font-light">
                <MapPin className="h-3.5 w-3.5 text-primary" />
                <span>8-й Микрорайон, 37/1</span>
              </span>
              <a
                href="tel:+77273468525"
                className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors text-[13px] font-light"
              >
                <Phone className="h-3.5 w-3.5 text-primary" />
                <span>+7 727 346 8525</span>
              </a>

              {/* Language Switcher */}
              <div className="relative">
                <button
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="flex items-center cursor-pointer"
                >
                  <span className="text-gray-500 text-[13px] font-light">{localeNames[currentLocale]}</span>
                  <ChevronDown className="h-3 w-3 text-gray-400 ml-1" />
                </button>
                {isLangOpen && (
                  <div className="absolute right-0 top-full mt-2 bg-white border border-gray-100 rounded-xl shadow-lg min-w-[140px] z-50" style={{ padding: '8px 0' }}>
                    {locales.map((locale) => (
                      <button
                        key={locale}
                        onClick={() => {
                          handleLocaleChange(locale);
                          setIsLangOpen(false);
                        }}
                        className={`block w-full text-left hover:bg-gray-50 transition-colors text-[13px] ${
                          currentLocale === locale ? 'text-primary font-normal' : 'text-gray-500 font-light'
                        }`}
                        style={{ padding: '10px 20px' }}
                      >
                        {locale === 'ru' && 'Русский'}
                        {locale === 'kz' && 'Қазақша'}
                        {locale === 'en' && 'English'}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Mobile: Login + Language + Menu */}
            <div className="flex items-center gap-4 lg:hidden">
              <div className="hidden md:flex items-center gap-4">
                <Link
                  href="/login"
                  className="border border-primary text-primary px-7 py-2 rounded-full text-[13px] font-normal"
                >
                  Войти
                </Link>
                <div className="flex items-center cursor-pointer">
                  <span className="text-gray-500 text-[13px] font-light">{localeNames[currentLocale]}</span>
                  <ChevronDown className="h-3 w-3 text-gray-400 ml-1" />
                </div>
              </div>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-500 hover:text-primary transition-colors"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar - Floating */}
      <div className="relative hidden md:block" style={{ paddingLeft: '250px', paddingRight: '250px' }}>
        <div
          className="bg-white"
          style={{
            borderRadius: '8px',
            transform: 'translateY(-50%)',
            position: 'relative',
            zIndex: 40,
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.06)'
          }}
        >
          <div className="flex items-center justify-center" style={{ height: '64px', padding: '0 40px' }}>
            {/* Nav Links with dividers */}
            <div className="flex items-center">
              {navItems.map((item, index) => (
                <div key={item.href} className="flex items-center">
                  {item.hasDropdown ? (
                    <div className="relative">
                      <button
                        onClick={() => setIsMoreOpen(!isMoreOpen)}
                        className="flex items-center gap-1 text-[14px] transition-colors hover:opacity-70 cursor-pointer"
                        style={{
                          color: isMoreOpen ? '#209DA7' : '#091D33',
                          fontWeight: 400,
                          padding: '10px 24px'
                        }}
                      >
                        {item.label}
                        <ChevronDown className={`h-3 w-3 transition-transform ${isMoreOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isMoreOpen && (
                        <div
                          className="absolute left-1/2 -translate-x-1/2 top-full mt-3 bg-white rounded-xl shadow-lg z-50"
                          style={{
                            minWidth: '220px',
                            padding: '8px 0',
                            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.12)'
                          }}
                        >
                          {moreMenuItems.map((menuItem) => (
                            <Link
                              key={menuItem.href}
                              href={menuItem.href}
                              className="block text-[14px] text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors"
                              style={{ padding: '12px 20px' }}
                              onClick={() => setIsMoreOpen(false)}
                            >
                              {menuItem.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="flex items-center gap-1 text-[14px] transition-colors hover:opacity-70"
                      style={{
                        color: isActive(item.href) ? '#209DA7' : '#091D33',
                        fontWeight: isActive(item.href) ? 500 : 400,
                        padding: '10px 24px'
                      }}
                    >
                      {item.label}
                    </Link>
                  )}
                  {index < navItems.length - 1 && (
                    <div style={{ width: '1px', height: '14px', backgroundColor: '#DCDCDC' }} />
                  )}
                </div>
              ))}

              {/* Divider before Search */}
              {/* <div style={{ width: '1px', height: '14px', backgroundColor: '#DCDCDC' }} /> */}

              {/* Search */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="flex items-center gap-2 transition-colors text-[14px] hover:opacity-70"
                style={{ padding: '12px 24px' }}
              >
                <Search className="h-4 w-4" style={{ color: '#209DA7' }} />
                <span style={{ color: '#091D33', fontStyle: 'italic' }}>Поиск</span>
              </button>
            </div>
          </div>
        </div>

        {/* Search Modal */}
        {isSearchOpen && (
          <div
            className="absolute left-0 right-0 bg-white shadow-2xl"
            style={{
              marginLeft: '80px',
              marginRight: '80px',
              marginTop: '8px',
              borderRadius: '16px',
              padding: '24px 32px',
              zIndex: 50
            }}
          >
            <div className="flex items-center gap-4">
              <Search className="h-5 w-5" style={{ color: '#209DA7' }} />
              <input
                type="text"
                placeholder="Введите название анализа или услуги..."
                className="flex-1 text-[16px] outline-none"
                style={{ color: '#091D33' }}
                autoFocus
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-gray-400" />
              </button>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-[12px] text-gray-400 mb-3">Популярные запросы:</p>
              <div className="flex flex-wrap gap-2">
                {['Общий анализ крови', 'Биохимия', 'Гормоны', 'ПЦР тесты', 'УЗИ'].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 bg-gray-50 rounded-full text-[13px] cursor-pointer hover:bg-gray-100 transition-colors"
                    style={{ color: '#091D33' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="mx-auto max-w-7xl px-4 py-4">
            {/* Mobile Contact */}
            <div className="flex flex-col gap-3 pb-4 border-b border-gray-100 mb-4">
              <a
                href="mailto:Salem@Gammalab.kz"
                className="flex items-center gap-2 text-text text-sm"
              >
                <Mail className="h-4 w-4 text-primary" />
                <span>Salem@Gammalab.kz</span>
              </a>
              <a
                href="tel:+77273468525"
                className="flex items-center gap-2 text-text text-sm"
              >
                <Phone className="h-4 w-4 text-primary" />
                <span>+7 727 346 8525</span>
              </a>
            </div>

            {/* Mobile Nav */}
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                item.hasDropdown ? (
                  <div key={item.href}>
                    <button
                      onClick={() => setIsMoreOpen(!isMoreOpen)}
                      className={`py-2 font-medium flex items-center gap-1 w-full text-left ${
                        isMoreOpen ? 'text-primary' : 'text-text'
                      }`}
                    >
                      {item.label}
                      <ChevronDown className={`h-4 w-4 transition-transform ${isMoreOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isMoreOpen && (
                      <div className="pl-4 flex flex-col gap-1 mt-1">
                        {moreMenuItems.map((menuItem) => (
                          <Link
                            key={menuItem.href}
                            href={menuItem.href}
                            className="py-2 text-sm text-gray-600 hover:text-primary"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {menuItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`py-2 font-medium ${
                      isActive(item.href) ? 'text-primary' : 'text-text'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              ))}
            </nav>

            {/* Mobile Language & Login */}
            <div className="flex flex-col gap-3 pt-4 mt-4 border-t border-gray-100">
              <div className="flex items-center gap-2">
                {locales.map((locale) => (
                  <button
                    key={locale}
                    onClick={() => {
                      handleLocaleChange(locale);
                      setIsMenuOpen(false);
                    }}
                    className={`px-3 py-1 rounded text-sm ${
                      currentLocale === locale
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-text'
                    }`}
                  >
                    {localeNames[locale]}
                  </button>
                ))}
              </div>
              <Link
                href="/login"
                className="border-2 border-primary text-primary px-6 py-3 rounded-full text-center font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Войти
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
