'use client';

import { useState } from 'react';
import { Link } from '@/i18n/routing';
import {
  Search,
  ChevronRight,
  Clock,
  Calendar,
  User,
  Phone,
  X,
} from 'lucide-react';

const categories = [
  { id: 'all', name: 'Все анализы', count: 156 },
  { id: 'blood', name: 'Анализы крови', count: 45 },
  { id: 'biochemistry', name: 'Биохимия', count: 32 },
  { id: 'hormones', name: 'Гормоны', count: 28 },
  { id: 'infections', name: 'Инфекции', count: 24 },
  { id: 'allergology', name: 'Аллергология', count: 18 },
  { id: 'urology', name: 'Урология', count: 9 },
];

const analyses = [
  {
    id: 1,
    name: 'Общий анализ крови (ОАК)',
    description: 'Комплексное исследование клеточного состава крови',
    price: 2500,
    duration: '1 день',
    category: 'blood',
    popular: true,
  },
  {
    id: 2,
    name: 'Биохимический анализ крови (базовый)',
    description: 'Оценка работы внутренних органов: печень, почки, поджелудочная',
    price: 5800,
    duration: '1-2 дня',
    category: 'biochemistry',
    popular: true,
  },
  {
    id: 3,
    name: 'Гормоны щитовидной железы (ТТГ, Т3, Т4)',
    description: 'Комплексная оценка функции щитовидной железы',
    price: 4200,
    duration: '2 дня',
    category: 'hormones',
    popular: true,
  },
  {
    id: 4,
    name: 'Глюкоза крови',
    description: 'Определение уровня сахара в крови натощак',
    price: 800,
    duration: '1 день',
    category: 'biochemistry',
    popular: false,
  },
  {
    id: 5,
    name: 'Холестерин общий',
    description: 'Оценка риска сердечно-сосудистых заболеваний',
    price: 1200,
    duration: '1 день',
    category: 'biochemistry',
    popular: false,
  },
  {
    id: 6,
    name: 'ПЦР на COVID-19',
    description: 'Выявление РНК вируса SARS-CoV-2 методом ПЦР',
    price: 3500,
    duration: '1 день',
    category: 'infections',
    popular: true,
  },
  {
    id: 7,
    name: 'Аллергопанель (20 аллергенов)',
    description: 'Определение IgE к основным пищевым и бытовым аллергенам',
    price: 12000,
    duration: '3-5 дней',
    category: 'allergology',
    popular: false,
  },
  {
    id: 8,
    name: 'Витамин D (25-OH)',
    description: 'Оценка уровня витамина D в организме',
    price: 3800,
    duration: '2 дня',
    category: 'biochemistry',
    popular: true,
  },
  {
    id: 9,
    name: 'Ферритин',
    description: 'Оценка запасов железа в организме',
    price: 2200,
    duration: '1-2 дня',
    category: 'blood',
    popular: false,
  },
  {
    id: 10,
    name: 'Гемоглобин гликированный (HbA1c)',
    description: 'Средний уровень сахара в крови за 3 месяца',
    price: 2800,
    duration: '2 дня',
    category: 'biochemistry',
    popular: false,
  },
  {
    id: 11,
    name: 'Тестостерон общий',
    description: 'Определение уровня мужского полового гормона',
    price: 2400,
    duration: '2 дня',
    category: 'hormones',
    popular: false,
  },
  {
    id: 12,
    name: 'Общий анализ мочи',
    description: 'Комплексное исследование физико-химических свойств мочи',
    price: 1500,
    duration: '1 день',
    category: 'urology',
    popular: true,
  },
];

type Analysis = typeof analyses[0];

export default function SubmitAnalysisPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAnalysis, setSelectedAnalysis] = useState<Analysis | null>(null);

  const filteredAnalyses = analyses.filter((analysis) => {
    const matchesCategory = activeCategory === 'all' || analysis.category === activeCategory;
    const matchesSearch = analysis.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section
        className="relative"
        style={{
          backgroundColor: '#EEF6F6',
          paddingTop: '180px',
          paddingBottom: '60px',
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
              Сдать анализ
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-[42px] font-semibold mb-4"
            style={{ color: '#091D33' }}
          >
            Сдать анализ
          </h1>
          <p
            className="text-[15px] leading-[1.8] max-w-[600px]"
            style={{ color: '#6B7280' }}
          >
            Выберите необходимый анализ из каталога и запишитесь на сдачу
            в удобное для вас время.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-white" style={{ padding: '40px 80px 80px' }}>
        <div className="flex gap-8">
          {/* Left Sidebar - Categories */}
          <div style={{ width: '260px', flexShrink: 0 }}>
            <h3
              className="text-[16px] font-semibold mb-4"
              style={{ color: '#091D33' }}
            >
              Категории
            </h3>
            <div className="flex flex-col gap-1">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className="flex items-center justify-between text-left transition-colors"
                  style={{
                    padding: '12px 16px',
                    borderRadius: '10px',
                    backgroundColor: activeCategory === category.id ? '#EEF6F6' : 'transparent',
                    color: activeCategory === category.id ? '#209DA7' : '#6B7280',
                  }}
                >
                  <span className="text-[14px] font-medium">{category.name}</span>
                  <span
                    className="text-[12px]"
                    style={{
                      backgroundColor: activeCategory === category.id ? '#209DA7' : '#E5E7EB',
                      color: activeCategory === category.id ? 'white' : '#9CA3AF',
                      padding: '2px 8px',
                      borderRadius: '10px',
                    }}
                  >
                    {category.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Info Box */}
            <div
              className="mt-6"
              style={{
                backgroundColor: '#FFF7ED',
                borderRadius: '12px',
                padding: '20px',
                border: '1px solid #FED7AA',
              }}
            >
              <Clock className="mb-3" style={{ color: '#EC910C', width: '24px', height: '24px' }} />
              <h4 className="text-[14px] font-semibold mb-2" style={{ color: '#091D33' }}>
                Подготовка к анализам
              </h4>
              <p className="text-[12px] leading-[1.6]" style={{ color: '#6B7280' }}>
                Большинство анализов крови сдаётся натощак, утром с 7:00 до 11:00.
              </p>
              <Link
                href="/patients"
                className="text-[12px] font-medium mt-3 inline-flex items-center gap-1"
                style={{ color: '#EC910C' }}
              >
                Подробнее
                <ChevronRight className="h-3 w-3" />
              </Link>
            </div>
          </div>

          {/* Center - Analyses List */}
          <div className="flex-1">
            {/* Search */}
            <div
              className="flex items-center mb-6"
              style={{
                backgroundColor: '#F9FAFB',
                borderRadius: '12px',
                padding: '14px 20px',
              }}
            >
              <Search className="h-5 w-5" style={{ color: '#9CA3AF' }} />
              <input
                type="text"
                placeholder="Поиск анализа..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent outline-none text-[14px] ml-3"
                style={{ color: '#091D33' }}
              />
            </div>

            {/* Results count */}
            <p className="text-[13px] mb-4" style={{ color: '#9CA3AF' }}>
              Найдено: {filteredAnalyses.length} анализов
            </p>

            {/* Analyses Grid */}
            <div className="grid grid-cols-2 gap-4">
              {filteredAnalyses.map((analysis) => (
                <div
                  key={analysis.id}
                  className="relative transition-all hover:shadow-md"
                  style={{
                    backgroundColor: '#F9FAFB',
                    borderRadius: '14px',
                    padding: '24px',
                  }}
                >
                  {analysis.popular && (
                    <span
                      className="absolute top-4 right-4 text-[10px] uppercase tracking-wider font-medium"
                      style={{
                        backgroundColor: '#EC910C',
                        color: 'white',
                        padding: '4px 10px',
                        borderRadius: '12px',
                      }}
                    >
                      Популярный
                    </span>
                  )}

                  <h4
                    className="text-[15px] font-semibold mb-2 pr-20"
                    style={{ color: '#091D33', lineHeight: '1.4' }}
                  >
                    {analysis.name}
                  </h4>
                  <p
                    className="text-[12px] leading-[1.6] mb-4"
                    style={{ color: '#6B7280' }}
                  >
                    {analysis.description}
                  </p>

                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-[13px]" style={{ color: '#9CA3AF' }}>
                      Срок: {analysis.duration}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span
                      className="text-[20px] font-semibold"
                      style={{ color: '#209DA7' }}
                    >
                      {analysis.price.toLocaleString()} ₸
                    </span>
                    <button
                      onClick={() => setSelectedAnalysis(analysis)}
                      className="text-[13px] font-medium transition-colors"
                      style={{
                        backgroundColor: '#209DA7',
                        color: 'white',
                        padding: '10px 20px',
                        borderRadius: '10px',
                      }}
                    >
                      Записаться
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      {selectedAnalysis && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onClick={() => setSelectedAnalysis(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full mx-4"
            style={{ padding: '32px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3
                  className="text-[24px] font-semibold mb-2"
                  style={{ color: '#091D33' }}
                >
                  Запись на анализ
                </h3>
                <p className="text-[14px]" style={{ color: '#6B7280' }}>
                  Заполните форму, и мы свяжемся с вами для подтверждения
                </p>
              </div>
              <button
                onClick={() => setSelectedAnalysis(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5" style={{ color: '#9CA3AF' }} />
              </button>
            </div>

            {/* Selected Analysis Info */}
            <div
              className="mb-6"
              style={{
                backgroundColor: '#EEF6F6',
                borderRadius: '12px',
                padding: '16px',
              }}
            >
              <p className="text-[14px] font-semibold mb-1" style={{ color: '#091D33' }}>
                {selectedAnalysis.name}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-[13px]" style={{ color: '#6B7280' }}>
                  Срок: {selectedAnalysis.duration}
                </span>
                <span className="text-[18px] font-semibold" style={{ color: '#209DA7' }}>
                  {selectedAnalysis.price.toLocaleString()} ₸
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {/* Name */}
              <div>
                <label className="text-[13px] font-medium mb-2 block" style={{ color: '#091D33' }}>
                  Ваше имя
                </label>
                <div
                  className="flex items-center"
                  style={{
                    backgroundColor: '#F9FAFB',
                    borderRadius: '10px',
                    padding: '12px 16px',
                  }}
                >
                  <User className="h-5 w-5" style={{ color: '#9CA3AF' }} />
                  <input
                    type="text"
                    placeholder="Введите имя"
                    className="flex-1 bg-transparent outline-none text-[14px] ml-3"
                    style={{ color: '#091D33' }}
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="text-[13px] font-medium mb-2 block" style={{ color: '#091D33' }}>
                  Телефон
                </label>
                <div
                  className="flex items-center"
                  style={{
                    backgroundColor: '#F9FAFB',
                    borderRadius: '10px',
                    padding: '12px 16px',
                  }}
                >
                  <Phone className="h-5 w-5" style={{ color: '#9CA3AF' }} />
                  <input
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
                    className="flex-1 bg-transparent outline-none text-[14px] ml-3"
                    style={{ color: '#091D33' }}
                  />
                </div>
              </div>

              {/* Date */}
              <div>
                <label className="text-[13px] font-medium mb-2 block" style={{ color: '#091D33' }}>
                  Желаемая дата
                </label>
                <div
                  className="flex items-center"
                  style={{
                    backgroundColor: '#F9FAFB',
                    borderRadius: '10px',
                    padding: '12px 16px',
                  }}
                >
                  <Calendar className="h-5 w-5" style={{ color: '#9CA3AF' }} />
                  <input
                    type="date"
                    className="flex-1 bg-transparent outline-none text-[14px] ml-3"
                    style={{ color: '#091D33' }}
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-2">
                <button
                  onClick={() => setSelectedAnalysis(null)}
                  className="flex-1 text-[14px] font-medium transition-colors"
                  style={{
                    backgroundColor: '#F3F4F6',
                    color: '#6B7280',
                    padding: '14px 24px',
                    borderRadius: '12px',
                  }}
                >
                  Отмена
                </button>
                <button
                  className="flex-1 text-[14px] font-medium text-white transition-colors"
                  style={{
                    backgroundColor: '#209DA7',
                    padding: '14px 24px',
                    borderRadius: '12px',
                  }}
                >
                  Отправить заявку
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
