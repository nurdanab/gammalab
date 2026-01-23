'use client';

import { useState } from 'react';
import { useRouter } from '@/i18n/routing';
import { useLocale } from 'next-intl';

const translations = {
  ru: {
    quickSearch: 'Быстрый поиск',
    findAnalysis: 'Найдите нужный',
    analysisFast: 'анализ быстро',
    placeholder: 'Введите название анализа',
    search: 'Найти',
  },
  kz: {
    quickSearch: 'Жылдам іздеу',
    findAnalysis: 'Қажетті анализді',
    analysisFast: 'тез табыңыз',
    placeholder: 'Анализ атауын енгізіңіз',
    search: 'Табу',
  },
  en: {
    quickSearch: 'Quick Search',
    findAnalysis: 'Find the right',
    analysisFast: 'analysis quickly',
    placeholder: 'Enter analysis name',
    search: 'Search',
  },
};

export default function SearchAnalyses() {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const locale = useLocale() as 'ru' | 'kz' | 'en';
  const t = translations[locale] || translations.ru;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/analyses?search=${encodeURIComponent(query.trim())}`);
    } else {
      router.push('/analyses');
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#209DA7] px-5 sm:px-8 md:px-12 lg:px-20 py-12 lg:py-20">
      {/* Subtle background decoration */}
      <div className="hidden md:block absolute w-[400px] h-[400px] rounded-full bg-white/[0.03] -left-[100px] top-1/2 -translate-y-1/2" />

      <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-12">
        {/* Left - Text */}
        <div className="text-center lg:text-left">
          <p className="text-[11px] uppercase tracking-widest mb-2 text-white/70">
            {t.quickSearch}
          </p>
          <h2 className="text-2xl sm:text-[28px] lg:text-[32px] font-semibold text-white leading-[1.3]">
            {t.findAnalysis}
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            {t.analysisFast}
          </h2>
        </div>

        {/* Right - Search Input */}
        <form
          onSubmit={handleSearch}
          className="flex items-center bg-white/15 rounded-full p-1.5 pl-5 sm:pl-7 w-full lg:w-auto lg:min-w-[420px]"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.placeholder}
            className="flex-1 bg-transparent outline-none text-sm placeholder-white/60 text-white min-w-0"
          />
          <button
            type="submit"
            className="text-xs font-medium uppercase tracking-wider hover:bg-gray-100 transition-colors bg-white text-[#091D33] px-5 sm:px-7 py-3 sm:py-3.5 rounded-full whitespace-nowrap"
          >
            {t.search}
          </button>
        </form>
      </div>
    </section>
  );
}
