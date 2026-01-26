'use client';

import { useState, useEffect } from 'react';
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

const translations: Record<string, Record<string, string>> = {
  ru: {
    home: 'Главная',
    about: 'О нас',
    services: 'Услуги и анализы',
    patients: 'Пациентам',
    doctors: 'Врачам',
    contacts: 'Контакты',
    more: 'Еще',
    news: 'Новости',
    testLocations: 'Где пройти тест?',
    submitAnalysis: 'Сдать анализ',
    login: 'Войти',
    search: 'Поиск',
    searchPlaceholder: 'Введите название анализа или услуги...',
    find: 'Найти',
    popularQueries: 'Популярные запросы:',
    tag1: 'Общий анализ крови',
    tag2: 'Биохимия',
    tag3: 'Гормоны',
    tag4: 'ПЦР тесты',
    tag5: 'Аллергология',
    address: 'Ходжанова, д. 55а',
    phone: '+7-705-100-03-33',
  },
  kz: {
    home: 'Басты бет',
    about: 'Біз туралы',
    services: 'Қызметтер мен анализдер',
    patients: 'Пациенттерге',
    doctors: 'Дәрігерлерге',
    contacts: 'Байланыс',
    more: 'Тағы',
    news: 'Жаңалықтар',
    testLocations: 'Тест қайда тапсыруға болады?',
    submitAnalysis: 'Анализ тапсыру',
    login: 'Кіру',
    search: 'Іздеу',
    searchPlaceholder: 'Анализ немесе қызмет атауын енгізіңіз...',
    find: 'Табу',
    popularQueries: 'Танымал сұраулар:',
    tag1: 'Жалпы қан анализі',
    tag2: 'Биохимия',
    tag3: 'Гормондар',
    tag4: 'ПТР тесттер',
    tag5: 'Аллергология',
    address: 'Ходжанов к., 55а үй',
    phone: '+7-705-100-03-33',
  },
  en: {
    home: 'Home',
    about: 'About',
    services: 'Services & Tests',
    patients: 'For Patients',
    doctors: 'For Doctors',
    contacts: 'Contacts',
    more: 'More',
    news: 'News',
    testLocations: 'Where to get tested?',
    submitAnalysis: 'Submit Analysis',
    login: 'Login',
    search: 'Search',
    searchPlaceholder: 'Enter analysis or service name...',
    find: 'Find',
    popularQueries: 'Popular queries:',
    tag1: 'Complete Blood Count',
    tag2: 'Biochemistry',
    tag3: 'Hormones',
    tag4: 'PCR Tests',
    tag5: 'Allergology',
    address: 'Khodzhanov St., 55a',
    phone: '+7-705-100-03-33',
  },
};

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = useLocale() as Locale;
  const t = translations[currentLocale] || translations.ru;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setIsLangOpen(false);
      setIsMoreOpen(false);
    };

    if (isLangOpen || isMoreOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isLangOpen, isMoreOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/analyses?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleTagSearch = (tag: string) => {
    router.push(`/analyses?search=${encodeURIComponent(tag)}`);
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  const moreMenuItems = [
    { href: '/news', label: t.news },
    { href: '/test-locations', label: t.testLocations },
    { href: '/submit-analysis', label: t.submitAnalysis },
  ];

  const handleLocaleChange = (locale: Locale) => {
    router.replace(pathname, { locale });
    setIsLangOpen(false);
  };

  const localeNames: Record<Locale, string> = {
    ru: 'РУ',
    kz: 'ҚЗ',
    en: 'EN',
  };

  const navItems = [
    { href: '/', label: t.home },
    { href: '/about', label: t.about },
    { href: '/analyses', label: t.services },
    { href: '/patients', label: t.patients },
    { href: '/doctors', label: t.doctors },
    { href: '/contacts', label: t.contacts },
    { href: '/more', label: t.more, hasDropdown: true },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-50">
      {/* Top Bar - белый фон */}
      <div className="bg-white">
        <div className="container-main pb-10 lg:pb-14">
          <div className="flex items-center justify-between h-[60px] lg:h-[70px]">
            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0">
              <Image
                src="/images/logo-gammalab.png"
                alt="GammaLab"
                width={160}
                height={60}
                className="h-9 sm:h-10 lg:h-11 w-auto"
                priority
              />
            </Link>

            {/* Desktop: Contacts + Language */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              <div className="flex items-center gap-2 text-[13px]">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <a
                  href="mailto:info@gammalab.kz"
                  className="text-gray-500 hover:text-primary transition-colors"
                >
                  info@gammalab.kz
                </a>
                <span className="text-gray-300">|</span>
                <a
                  href="mailto:Salem@Gammalab.kz"
                  className="text-gray-500 hover:text-primary transition-colors"
                >
                  Salem@Gammalab.kz
                </a>
              </div>
              <span className="flex items-center gap-2 text-gray-500 text-[13px]">
                <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                <span>{t.address}</span>
              </span>
              <a
                href="tel:+77051000333"
                className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors text-[13px]"
              >
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <span>{t.phone}</span>
              </a>

              {/* Language Switcher */}
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsLangOpen(!isLangOpen);
                  }}
                  className="flex items-center gap-1 text-gray-500 hover:text-primary transition-colors"
                >
                  <span className="text-[13px]">{localeNames[currentLocale]}</span>
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
                </button>
                {isLangOpen && (
                  <div className="absolute right-0 top-full mt-2 bg-white border border-gray-100 rounded-xl shadow-lg min-w-[140px] py-2 z-50">
                    {locales.map((locale) => (
                      <button
                        key={locale}
                        onClick={() => handleLocaleChange(locale)}
                        className={`block w-full text-left px-5 py-2.5 text-[13px] hover:bg-gray-50 transition-colors ${
                          currentLocale === locale ? 'text-primary font-medium' : 'text-gray-600'
                        }`}
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

            {/* Mobile/Tablet: Menu Button */}
            <div className="flex items-center gap-3 lg:hidden">
              {/* Language - visible on tablet */}
              <div className="hidden sm:block relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsLangOpen(!isLangOpen);
                  }}
                  className="flex items-center gap-1 text-gray-500 text-[13px]"
                >
                  <span>{localeNames[currentLocale]}</span>
                  <ChevronDown className={`h-3 w-3 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
                </button>
                {isLangOpen && (
                  <div className="absolute right-0 top-full mt-2 bg-white border border-gray-100 rounded-lg shadow-lg min-w-[130px] py-1 z-50">
                    {locales.map((locale) => (
                      <button
                        key={locale}
                        onClick={() => handleLocaleChange(locale)}
                        className={`block w-full text-left px-4 py-2 text-[13px] hover:bg-gray-50 transition-colors ${
                          currentLocale === locale ? 'text-primary font-medium' : 'text-gray-600'
                        }`}
                      >
                        {locale === 'ru' && 'Русский'}
                        {locale === 'kz' && 'Қазақша'}
                        {locale === 'en' && 'English'}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-600 hover:text-primary transition-colors"
                aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Navigation Bar - только для desktop и tablet */}
      <div className="hidden lg:block relative">
        <div className="container-main">
          {/* Плавающая панель навигации */}
          <div
            className="absolute left-1/2 -translate-x-1/2 bg-white rounded-xl z-40"
            style={{
              top: '-36px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)',
            }}
          >
            <div className="flex items-center justify-center h-[72px] px-8 xl:px-10">
              <nav className="flex items-center">
                {navItems.map((item, index) => (
                  <div key={item.href} className="flex items-center">
                    {item.hasDropdown ? (
                      <div className="relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsMoreOpen(!isMoreOpen);
                          }}
                          className={`flex items-center gap-1.5 px-5 xl:px-6 py-2.5 text-[14px] transition-colors hover:text-primary whitespace-nowrap ${
                            isMoreOpen ? 'text-primary' : 'text-[#091D33]'
                          }`}
                        >
                          {item.label}
                          <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isMoreOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isMoreOpen && (
                          <div
                            className="absolute left-1/2 -translate-x-1/2 top-full mt-3 bg-white rounded-xl shadow-lg border border-gray-100 min-w-[220px] py-2 z-50"
                            style={{ boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)' }}
                          >
                            {moreMenuItems.map((menuItem) => (
                              <Link
                                key={menuItem.href}
                                href={menuItem.href}
                                className="block px-5 py-3 text-[14px] text-gray-600 hover:text-primary hover:bg-gray-50 transition-colors"
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
                        className={`px-5 xl:px-6 py-2.5 text-[14px] transition-colors hover:text-primary whitespace-nowrap ${
                          isActive(item.href) ? 'text-primary font-medium' : 'text-[#091D33]'
                        }`}
                      >
                        {item.label}
                      </Link>
                    )}
                    {index < navItems.length - 1 && (
                      <div className="w-px h-[14px] bg-gray-200" />
                    )}
                  </div>
                ))}

                {/* Divider before Search */}
                <div className="w-px h-[14px] bg-gray-200" />

                {/* Search Button */}
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="flex items-center gap-2 px-5 xl:px-6 py-2.5 text-[14px] text-[#091D33] hover:text-primary transition-colors whitespace-nowrap"
                >
                  <Search className="h-4 w-4 text-primary" />
                  <span className="italic">{t.search}</span>
                </button>
              </nav>
            </div>

            {/* Search Dropdown */}
            {isSearchOpen && (
              <div className="border-t border-gray-100 px-6 py-5">
                <form onSubmit={handleSearch} className="flex items-center gap-4">
                  <Search className="h-5 w-5 text-primary flex-shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t.searchPlaceholder}
                    className="flex-1 text-[15px] outline-none bg-transparent text-[#091D33]"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-primary text-white rounded-full text-[14px] font-medium hover:bg-primary-dark transition-colors"
                  >
                    {t.find}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery('');
                    }}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="h-5 w-5 text-gray-400" />
                  </button>
                </form>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-[12px] text-gray-400 mb-3">{t.popularQueries}</p>
                  <div className="flex flex-wrap gap-2">
                    {[t.tag1, t.tag2, t.tag3, t.tag4, t.tag5].map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => handleTagSearch(tag)}
                        className="px-4 py-2 bg-gray-50 hover:bg-primary hover:text-white rounded-full text-[13px] text-[#091D33] transition-colors"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile Menu - Slide Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-[280px] sm:w-[320px] bg-white z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <Link href="/" onClick={() => setIsMenuOpen(false)}>
              <Image
                src="/images/logo-gammalab.png"
                alt="GammaLab"
                width={120}
                height={45}
                className="h-8 w-auto"
              />
            </Link>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 text-gray-500 hover:text-primary transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Mobile Menu Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Contact Info */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex flex-col gap-3">
                <a
                  href="tel:+77051000333"
                  className="flex items-center gap-3 text-gray-600 text-sm"
                >
                  <Phone className="h-4 w-4 text-primary" />
                  <span>{t.phone}</span>
                </a>
                <a
                  href="mailto:info@gammalab.kz"
                  className="flex items-center gap-3 text-gray-600 text-sm"
                >
                  <Mail className="h-4 w-4 text-primary" />
                  <span>info@gammalab.kz</span>
                </a>
                <a
                  href="mailto:Salem@Gammalab.kz"
                  className="flex items-center gap-3 text-gray-600 text-sm"
                >
                  <Mail className="h-4 w-4 text-primary" />
                  <span>Salem@Gammalab.kz</span>
                </a>
                <span className="flex items-center gap-3 text-gray-600 text-sm">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>{t.address}</span>
                </span>
              </div>
            </div>

            {/* Navigation */}
            <nav className="p-4">
              <div className="flex flex-col gap-1">
                {navItems.map((item) => (
                  item.hasDropdown ? (
                    <div key={item.href}>
                      <button
                        onClick={() => setIsMoreOpen(!isMoreOpen)}
                        className={`flex items-center justify-between w-full py-3 text-[15px] font-medium ${
                          isMoreOpen ? 'text-primary' : 'text-gray-700'
                        }`}
                      >
                        {item.label}
                        <ChevronDown className={`h-4 w-4 transition-transform ${isMoreOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isMoreOpen && (
                        <div className="pl-4 pb-2 flex flex-col gap-1">
                          {moreMenuItems.map((menuItem) => (
                            <Link
                              key={menuItem.href}
                              href={menuItem.href}
                              className="py-2 text-[14px] text-gray-500 hover:text-primary transition-colors"
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
                      className={`py-3 text-[15px] font-medium transition-colors ${
                        isActive(item.href) ? 'text-primary' : 'text-gray-700 hover:text-primary'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )
                ))}
              </div>
            </nav>
          </div>

          {/* Mobile Menu Footer */}
          <div className="p-4 border-t border-gray-100">
            {/* Language Switcher */}
            <div className="flex items-center gap-2 mb-4 sm:hidden">
              {locales.map((locale) => (
                <button
                  key={locale}
                  onClick={() => {
                    handleLocaleChange(locale);
                    setIsMenuOpen(false);
                  }}
                  className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                    currentLocale === locale
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {localeNames[locale]}
                </button>
              ))}
            </div>

            {/* Login Button */}
            <Link
              href="/login"
              className="block w-full py-3 text-center border-2 border-primary text-primary rounded-full font-medium hover:bg-primary hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t.login}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
