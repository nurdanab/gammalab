'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Cookie } from 'lucide-react';

const translations = {
  ru: {
    message: 'Мы используем cookies для улучшения работы сайта.',
    privacy: 'Политика конфиденциальности',
    accept: 'Принять',
  },
  kz: {
    message: 'Біз сайт жұмысын жақсарту үшін cookies пайдаланамыз.',
    privacy: 'Құпиялылық саясаты',
    accept: 'Қабылдау',
  },
  en: {
    message: 'We use cookies to improve your experience.',
    privacy: 'Privacy Policy',
    accept: 'Accept',
  },
};

export default function CookieConsent() {
  const locale = useLocale() as 'ru' | 'kz' | 'en';
  const t = translations[locale] || translations.ru;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Проверяем, было ли уже согласие
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Показываем баннер с небольшой задержкой
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up"
      style={{
        backgroundColor: 'rgba(9, 29, 51, 0.95)',
        backdropFilter: 'blur(8px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <div className="px-5 sm:px-8 md:px-12 lg:px-20 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Message */}
          <div className="flex items-center gap-3 text-center sm:text-left">
            <Cookie
              className="hidden sm:block flex-shrink-0"
              size={20}
              style={{ color: '#209DA7' }}
            />
            <p className="text-[13px] sm:text-[14px] text-white/90">
              {t.message}{' '}
              <Link
                href="/privacy"
                className="underline hover:text-[#209DA7] transition-colors"
                style={{ color: '#209DA7' }}
              >
                {t.privacy}
              </Link>
            </p>
          </div>

          {/* Accept Button */}
          <button
            onClick={handleAccept}
            className="flex-shrink-0 text-[13px] sm:text-[14px] font-medium transition-all hover:opacity-90"
            style={{
              backgroundColor: '#209DA7',
              color: 'white',
              padding: '10px 24px',
              borderRadius: '8px',
            }}
          >
            {t.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
