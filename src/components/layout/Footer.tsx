'use client';

import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { MapPin, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white">
      {/* Main Footer */}
      <div style={{ padding: '100px 120px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1.2fr', gap: '80px' }}>
          {/* Column 1 - Logo & Info */}
          <div>
            <Link href="/" className="inline-block mb-7">
              <Image
                src="/images/logo.png"
                alt="GammaLab"
                width={180}
                height={65}
                className="h-14 w-auto"
              />
            </Link>

            <p className="text-[13px] leading-[1.9] text-[#6B7280] mb-8 max-w-[260px]">
              Современная медицинская лаборатория с высокоточным оборудованием для качественной диагностики.
            </p>

            {/* Contact Info */}
            <div className="flex flex-col gap-4 mb-8">
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 flex-shrink-0" style={{ color: '#209DA7' }} />
                <span className="text-[13px]" style={{ color: '#6B7280' }}>
                  8-й Микрорайон, 37/1, Алматы
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 flex-shrink-0" style={{ color: '#209DA7' }} />
                <a
                  href="mailto:Salem@Gammalab.kz"
                  className="text-[13px] hover:opacity-70 transition-opacity"
                  style={{ color: '#6B7280' }}
                >
                  Salem@Gammalab.kz
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 flex-shrink-0" style={{ color: '#209DA7' }} />
                <a
                  href="tel:+77273468525"
                  className="text-[13px] hover:opacity-70 transition-opacity"
                  style={{ color: '#6B7280' }}
                >
                  +7 727 346 8525
                </a>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2">
              {[
                { href: '#', icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
                { href: '#', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
                { href: '#', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
                { href: '#', icon: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="flex items-center justify-center transition-all hover:border-[#209DA7]"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    border: '1px solid #E5E7EB'
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#209DA7">
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="text-[14px] font-semibold text-[#091D33] mb-7">
              Быстрые ссылки
            </h3>
            <div className="flex flex-col gap-4">
              <Link href="/" className="text-[13px] hover:opacity-70 transition-opacity" style={{ color: '#209DA7' }}>
                Главная
              </Link>
              <Link href="/about" className="text-[13px] hover:opacity-70 transition-opacity" style={{ color: '#6B7280' }}>
                О нас
              </Link>
              <Link href="/analyses" className="text-[13px] hover:opacity-70 transition-opacity" style={{ color: '#6B7280' }}>
                Услуги
              </Link>
              <Link href="/doctors" className="text-[13px] hover:opacity-70 transition-opacity" style={{ color: '#6B7280' }}>
                Врачи
              </Link>
              <Link href="/news" className="text-[13px] hover:opacity-70 transition-opacity" style={{ color: '#6B7280' }}>
                Новости
              </Link>
            </div>
          </div>

          {/* Column 3 - More Links */}
          <div>
            <h3 className="text-[14px] font-semibold text-[#091D33] mb-7">
              Информация
            </h3>
            <div className="flex flex-col gap-4">
              <Link href="/prices" className="text-[13px] hover:opacity-70 transition-opacity" style={{ color: '#6B7280' }}>
                Цены
              </Link>
              <Link href="/contacts" className="text-[13px] hover:opacity-70 transition-opacity" style={{ color: '#6B7280' }}>
                Контакты
              </Link>
              <Link href="/careers" className="text-[13px] hover:opacity-70 transition-opacity" style={{ color: '#6B7280' }}>
                Карьера
              </Link>
              <Link href="/faq" className="text-[13px] hover:opacity-70 transition-opacity" style={{ color: '#6B7280' }}>
                FAQ
              </Link>
              <Link href="/privacy" className="text-[13px] hover:opacity-70 transition-opacity" style={{ color: '#6B7280' }}>
                Конфиденциальность
              </Link>
            </div>
          </div>

          {/* Column 4 - Opening Hours */}
          <div>
            <h3 className="text-[14px] font-semibold text-[#091D33] mb-7">
              Часы работы
            </h3>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="text-[13px]" style={{ color: '#6B7280' }}>Пн - Чт</span>
                <span className="text-[13px] font-medium" style={{ color: '#209DA7' }}>8:00 - 18:00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[13px]" style={{ color: '#6B7280' }}>Пт - Сб</span>
                <span className="text-[13px] font-medium" style={{ color: '#209DA7' }}>10:00 - 16:00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[13px]" style={{ color: '#6B7280' }}>Воскресенье</span>
                <span className="text-[13px] font-medium" style={{ color: '#209DA7' }}>Экстренно</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[13px]" style={{ color: '#6B7280' }}>Забор анализов</span>
                <span className="text-[13px] font-medium" style={{ color: '#209DA7' }}>7:00 - 11:00</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#F3F4F6]" style={{ padding: '32px 120px' }}>
        <div className="flex justify-between items-center">
          <p className="text-[12px] text-[#9CA3AF]">
            © 2024 GammaLab - Все права защищены
          </p>
          <p className="text-[12px] text-[#9CA3AF]">
            Разработано с заботой о здоровье
          </p>
        </div>
      </div>
    </footer>
  );
}
