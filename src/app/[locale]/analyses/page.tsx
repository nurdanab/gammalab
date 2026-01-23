'use client';

import { useState, useMemo, useRef, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import {
  Search,
  ChevronDown,
  ChevronUp,
  Clock,
  FlaskConical,
  Droplets,
  FileText,
  AlertCircle,
  Printer,
  X
} from 'lucide-react';
import { categories, analyses, getAnalysesByCategory, type Category, type Analysis } from '@/data/analyses';

type Locale = 'ru' | 'kz' | 'en';

function getCategoryName(category: Category, locale: Locale): string {
  switch (locale) {
    case 'kz': return category.nameKz;
    case 'en': return category.nameEn;
    default: return category.name;
  }
}

function getAnalysisName(analysis: Analysis, locale: Locale): string {
  switch (locale) {
    case 'kz': return analysis.nameKz;
    case 'en': return analysis.nameEn;
    default: return analysis.name;
  }
}

function getAnalysisDescription(analysis: Analysis, locale: Locale): string {
  switch (locale) {
    case 'kz': return analysis.descriptionKz;
    case 'en': return analysis.descriptionEn;
    default: return analysis.description;
  }
}

function getAnalysisDeadline(analysis: Analysis, locale: Locale): string {
  switch (locale) {
    case 'kz': return analysis.deadlineKz;
    case 'en': return analysis.deadlineEn;
    default: return analysis.deadline;
  }
}

function getAnalysisBiomaterial(analysis: Analysis, locale: Locale): string {
  switch (locale) {
    case 'kz': return analysis.biomaterialKz;
    case 'en': return analysis.biomaterialEn;
    default: return analysis.biomaterial;
  }
}

function getAnalysisPreparation(analysis: Analysis, locale: Locale): string {
  switch (locale) {
    case 'kz': return analysis.preparationKz;
    case 'en': return analysis.preparationEn;
    default: return analysis.preparation;
  }
}

export default function AnalysesPage() {
  return (
    <Suspense fallback={<AnalysesPageSkeleton />}>
      <AnalysesPageContent />
    </Suspense>
  );
}

function AnalysesPageSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-[140px] sm:pt-[160px] px-5 sm:px-8 md:px-12 lg:px-20 pb-10" style={{ backgroundColor: '#209DA7' }}>
        <div className="h-8 w-48 bg-white/20 rounded mb-6" />
        <div className="h-12 w-full max-w-[400px] bg-white/20 rounded mb-8" />
        <div className="h-14 w-full max-w-[600px] bg-white/10 rounded-full" />
      </div>
    </div>
  );
}

function AnalysesPageContent() {
  const locale = useLocale() as Locale;
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedAnalysis, setExpandedAnalysis] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(10);
  const printRef = useRef<HTMLDivElement>(null);

  // Update searchQuery when URL param changes
  useEffect(() => {
    const search = searchParams.get('search') || '';
    if (search !== searchQuery) {
      setSearchQuery(search);
    }
  }, [searchParams]);

  const toggleAnalysis = (analysisId: string) => {
    setExpandedAnalysis(prev => prev === analysisId ? null : analysisId);
  };

  const toggleCategory = (categoryId: string) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(categoryId);
    }
    setVisibleCount(10);
  };

  const handleShowMore = () => {
    setVisibleCount(prev => prev + 10);
  };

  useEffect(() => {
    setVisibleCount(10);
  }, [searchQuery]);

  const filteredAnalyses = useMemo(() => {
    let result = selectedCategory
      ? getAnalysesByCategory(selectedCategory)
      : analyses;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(analysis => {
        const name = getAnalysisName(analysis, locale);
        const description = getAnalysisDescription(analysis, locale);
        return name.toLowerCase().includes(query) || description.toLowerCase().includes(query);
      });
    }

    return result;
  }, [selectedCategory, searchQuery, locale]);

  const handlePrint = (analysis: Analysis) => {
    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${getAnalysisName(analysis, locale)} - GammaLab</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            padding: 40px;
            color: #091D33;
            line-height: 1.6;
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            border-bottom: 2px solid #209DA7;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          .logo {
            font-size: 24px;
            font-weight: bold;
            color: #209DA7;
          }
          .logo span { color: #EC910C; }
          .date {
            color: #6B7280;
            font-size: 12px;
          }
          .category {
            display: inline-block;
            background: #EEF6F6;
            color: #209DA7;
            padding: 6px 14px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 500;
            text-transform: uppercase;
            margin-bottom: 16px;
          }
          h1 {
            font-size: 24px;
            margin-bottom: 24px;
            color: #091D33;
          }
          .price-box {
            background: #F6F7F9;
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 30px;
            display: flex;
            gap: 40px;
          }
          .price-item label {
            font-size: 11px;
            text-transform: uppercase;
            color: #9CA3AF;
            display: block;
            margin-bottom: 4px;
          }
          .price-item .value {
            font-size: 20px;
            font-weight: 600;
            color: #209DA7;
          }
          .price-item .value.secondary {
            font-size: 16px;
            color: #091D33;
          }
          .section {
            margin-bottom: 24px;
          }
          .section h2 {
            font-size: 14px;
            font-weight: 600;
            color: #209DA7;
            margin-bottom: 8px;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .section p {
            color: #4B5563;
            font-size: 14px;
          }
          .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #E5E7EB;
            font-size: 12px;
            color: #9CA3AF;
            text-align: center;
          }
          @media print {
            body { padding: 20px; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">Gamma<span>Lab</span></div>
          <div class="date">${new Date().toLocaleDateString(locale === 'en' ? 'en-US' : locale === 'kz' ? 'kk-KZ' : 'ru-RU')}</div>
        </div>

        <div class="category">${getCategoryName(categories.find(c => c.id === analysis.categoryId)!, locale)}</div>

        <h1>${getAnalysisName(analysis, locale)}</h1>

        <div class="price-box">
          <div class="price-item">
            <label>${locale === 'kz' ? 'Баға' : locale === 'en' ? 'Price' : 'Цена'}</label>
            <div class="value">${formatPrice(analysis.price)} ₸</div>
          </div>
          ${analysis.collectionPrice > 0 ? `
          <div class="price-item">
            <label>${locale === 'kz' ? 'Алу бағасы' : locale === 'en' ? 'Collection' : 'Цена забора'}</label>
            <div class="value secondary">${formatPrice(analysis.collectionPrice)} ₸</div>
          </div>
          ` : ''}
          <div class="price-item">
            <label>${locale === 'kz' ? 'Мерзім' : locale === 'en' ? 'Deadline' : 'Срок'}</label>
            <div class="value secondary">${getAnalysisDeadline(analysis, locale)}</div>
          </div>
        </div>

        <div class="section">
          <h2>${locale === 'kz' ? 'Сипаттама' : locale === 'en' ? 'Description' : 'Описание'}</h2>
          <p>${getAnalysisDescription(analysis, locale)}</p>
        </div>

        <div class="section">
          <h2>${locale === 'kz' ? 'Биоматериал' : locale === 'en' ? 'Biomaterial' : 'Биоматериал'}</h2>
          <p>${getAnalysisBiomaterial(analysis, locale)}</p>
        </div>

        <div class="section">
          <h2>${locale === 'kz' ? 'Зерттеуге дайындық' : locale === 'en' ? 'Preparation' : 'Подготовка к исследованию'}</h2>
          <p>${getAnalysisPreparation(analysis, locale)}</p>
        </div>

        <div class="footer">
          GammaLab - ${locale === 'kz' ? 'Диагностикалық зертхана' : locale === 'en' ? 'Diagnostic Laboratory' : 'Диагностическая лаборатория'}<br>
          +7-705-100-03-33 | Salem@Gammalab.kz
        </div>
      </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.onload = () => {
        printWindow.print();
      };
    }
  };

  const getPageTitle = () => {
    switch (locale) {
      case 'kz': return 'Талдаулар мен бағалар';
      case 'en': return 'Tests and Prices';
      default: return 'Анализы и цены';
    }
  };

  const getSearchPlaceholder = () => {
    switch (locale) {
      case 'kz': return 'Талдауларды іздеу';
      case 'en': return 'Search tests';
      default: return 'Поиск по анализам';
    }
  };

  const getCategoriesTitle = () => {
    switch (locale) {
      case 'kz': return 'Бөлімдер бойынша талдаулар';
      case 'en': return 'Tests by category';
      default: return 'Анализы по разделам';
    }
  };

  const getLabels = () => {
    switch (locale) {
      case 'kz':
        return {
          price: 'Баға',
          collection: 'Алу бағасы',
          deadline: 'Мерзім',
          description: 'Сипаттама',
          biomaterial: 'Биоматериал',
          preparation: 'Зерттеуге дайындық',
          print: 'Басып шығару',
          back: 'Артқа',
          showMore: 'Көбірек көрсету',
          noResults: 'Талдаулар табылмады',
        };
      case 'en':
        return {
          price: 'Price',
          collection: 'Collection',
          deadline: 'Deadline',
          description: 'Description',
          biomaterial: 'Biomaterial',
          preparation: 'Preparation',
          print: 'Print',
          back: 'Back',
          showMore: 'Show more',
          noResults: 'No tests found',
        };
      default:
        return {
          price: 'Цена',
          collection: 'Цена забора',
          deadline: 'Срок',
          description: 'Описание',
          biomaterial: 'Биоматериал',
          preparation: 'Подготовка к исследованию',
          print: 'Распечатать',
          back: 'Назад',
          showMore: 'Показать еще',
          noResults: 'Анализы не найдены',
        };
    }
  };

  const labels = getLabels();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU').format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="pt-[140px] sm:pt-[160px] px-5 sm:px-8 md:px-12 lg:px-20 pb-10 lg:pb-12" style={{ backgroundColor: '#209DA7' }}>
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-white/70 text-[13px] mb-6">
          <Link href="/" className="hover:text-white transition-colors">
            {locale === 'kz' ? 'Басты бет' : locale === 'en' ? 'Home' : 'Главная'}
          </Link>
          <span>/</span>
          <span className="text-white">{getPageTitle()}</span>
        </div>

        <h1 className="text-[28px] sm:text-[32px] lg:text-[36px] font-semibold text-white mb-6 lg:mb-8">
          {getPageTitle()}
        </h1>

        {/* Search */}
        <div
          className="flex items-center bg-white w-full max-w-[600px]"
          style={{
            borderRadius: '50px',
            padding: '6px 6px 6px 20px',
          }}
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={getSearchPlaceholder()}
            className="flex-1 outline-none text-[14px]"
            style={{ color: '#091D33' }}
          />
          <button
            className="flex items-center justify-center"
            style={{
              backgroundColor: '#209DA7',
              width: '44px',
              height: '44px',
              borderRadius: '50%'
            }}
          >
            <Search className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row px-5 sm:px-8 md:px-12 lg:px-20 py-10 lg:py-16 gap-8 lg:gap-12">
        {/* Sidebar */}
        <aside className="w-full lg:w-[280px] xl:w-[320px] lg:flex-shrink-0">
          <h2 className="text-[16px] font-semibold mb-6" style={{ color: '#091D33' }}>
            {getCategoriesTitle()}
          </h2>

          <nav className="flex flex-col">
            {categories.map((category) => {
              const isSelected = selectedCategory === category.id;
              const categoryAnalyses = getAnalysesByCategory(category.id);

              return (
                <div key={category.id} className="border-b border-gray-100">
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="w-full flex items-center justify-between text-left transition-colors hover:text-primary"
                    style={{
                      padding: '16px 0',
                      color: isSelected ? '#209DA7' : '#091D33',
                      fontWeight: isSelected ? 500 : 400
                    }}
                  >
                    <span className="text-[14px]">{getCategoryName(category, locale)}</span>
                    <span className="text-[12px] text-gray-400">
                      {categoryAnalyses.length}
                    </span>
                  </button>
                </div>
              );
            })}
          </nav>

          {selectedCategory && (
            <button
              onClick={() => setSelectedCategory(null)}
              className="flex items-center gap-2 mt-6 text-[14px] transition-colors hover:opacity-70"
              style={{ color: '#209DA7' }}
            >
              <span style={{ fontSize: '18px' }}>←</span>
              {labels.back}
            </button>
          )}
        </aside>

        {/* Analysis Cards */}
        <main className="flex-1">
          {selectedCategory && (
            <div className="flex items-center gap-2 mb-6">
              <button
                onClick={() => setSelectedCategory(null)}
                className="text-[14px] transition-colors hover:opacity-70"
                style={{ color: '#209DA7' }}
              >
                ← {labels.back}
              </button>
            </div>
          )}

          <div className="flex flex-col gap-4">
            {filteredAnalyses.slice(0, visibleCount).map((analysis) => {
              const category = categories.find(c => c.id === analysis.categoryId);
              const isExpanded = expandedAnalysis === analysis.id;

              return (
                <div
                  key={analysis.id}
                  className="bg-white rounded-xl overflow-hidden transition-shadow hover:shadow-lg"
                >
                  {/* Card Header - Always Visible */}
                  <button
                    onClick={() => toggleAnalysis(analysis.id)}
                    className="w-full text-left p-4 lg:p-6"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:gap-8">
                      {/* Left - Category Tag and Name */}
                      <div className="flex-1">
                        {category && (
                          <span
                            className="inline-block text-[11px] font-medium uppercase tracking-wider mb-2 lg:mb-3"
                            style={{ color: '#209DA7' }}
                          >
                            {getCategoryName(category, locale)}
                          </span>
                        )}
                        <h3 className="text-[15px] lg:text-[16px] font-medium" style={{ color: '#091D33' }}>
                          {getAnalysisName(analysis, locale)}
                        </h3>
                      </div>

                      {/* Right - Price and Details */}
                      <div className="flex items-center justify-between lg:justify-end gap-4 lg:gap-8 flex-wrap">
                        {/* Price */}
                        <div className="text-left lg:text-center">
                          <div className="text-[10px] lg:text-[11px] uppercase text-gray-400 mb-1">
                            {labels.price}
                          </div>
                          <div className="text-[16px] lg:text-[18px] font-semibold" style={{ color: '#091D33' }}>
                            {formatPrice(analysis.price)} ₸
                          </div>
                        </div>

                        {/* Collection Price - hidden on mobile */}
                        <div className="hidden sm:block text-center">
                          <div className="text-[11px] uppercase text-gray-400 mb-1">
                            {labels.collection}
                          </div>
                          <div className="text-[16px] font-medium" style={{ color: '#6B7280' }}>
                            {analysis.collectionPrice > 0 ? `${formatPrice(analysis.collectionPrice)} ₸` : '—'}
                          </div>
                        </div>

                        {/* Deadline */}
                        <div className="text-left lg:text-center">
                          <div className="text-[10px] lg:text-[11px] uppercase text-gray-400 mb-1">
                            {labels.deadline}
                          </div>
                          <div className="flex items-center justify-start lg:justify-center gap-1">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="text-[13px] lg:text-[14px]" style={{ color: '#6B7280' }}>
                              {getAnalysisDeadline(analysis, locale)}
                            </span>
                          </div>
                        </div>

                        {/* Expand Icon */}
                        <div
                          className="flex items-center justify-center transition-transform flex-shrink-0"
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            backgroundColor: isExpanded ? '#209DA7' : '#F3F4F6',
                            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'
                          }}
                        >
                          <ChevronDown
                            className="w-4 h-4"
                            style={{ color: isExpanded ? 'white' : '#6B7280' }}
                          />
                        </div>
                      </div>
                    </div>
                  </button>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div
                      className="border-t border-gray-100 p-5 lg:p-7"
                      style={{ backgroundColor: '#FAFBFC' }}
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Description */}
                        <div className="lg:col-span-2">
                          <div className="flex items-center gap-2 mb-3">
                            <FileText className="w-4 h-4" style={{ color: '#209DA7' }} />
                            <h4 className="text-[14px] font-semibold" style={{ color: '#091D33' }}>
                              {labels.description}
                            </h4>
                          </div>
                          <p className="text-[14px] leading-[1.7] mb-6" style={{ color: '#6B7280' }}>
                            {getAnalysisDescription(analysis, locale)}
                          </p>

                          {/* Biomaterial */}
                          <div className="flex items-center gap-2 mb-3">
                            <Droplets className="w-4 h-4" style={{ color: '#209DA7' }} />
                            <h4 className="text-[14px] font-semibold" style={{ color: '#091D33' }}>
                              {labels.biomaterial}
                            </h4>
                          </div>
                          <p className="text-[14px] leading-[1.7] mb-6" style={{ color: '#6B7280' }}>
                            {getAnalysisBiomaterial(analysis, locale)}
                          </p>

                          {/* Preparation */}
                          <div className="flex items-center gap-2 mb-3">
                            <AlertCircle className="w-4 h-4" style={{ color: '#209DA7' }} />
                            <h4 className="text-[14px] font-semibold" style={{ color: '#091D33' }}>
                              {labels.preparation}
                            </h4>
                          </div>
                          <p className="text-[14px] leading-[1.7]" style={{ color: '#6B7280' }}>
                            {getAnalysisPreparation(analysis, locale)}
                          </p>
                        </div>

                        {/* Price Card & Actions */}
                        <div>
                          <div
                            className="bg-white rounded-xl"
                            style={{ padding: '24px', border: '1px solid #E5E7EB' }}
                          >
                            {/* Price */}
                            <div className="mb-4">
                              <div className="text-[11px] uppercase text-gray-400 mb-1">
                                {labels.price}
                              </div>
                              <div className="text-[28px] font-bold" style={{ color: '#209DA7' }}>
                                {formatPrice(analysis.price)} ₸
                              </div>
                            </div>

                            {/* Collection Price */}
                            {analysis.collectionPrice > 0 && (
                              <div className="mb-4 pb-4 border-b border-gray-100">
                                <div className="text-[11px] uppercase text-gray-400 mb-1">
                                  {labels.collection}
                                </div>
                                <div className="text-[16px] font-medium" style={{ color: '#091D33' }}>
                                  {formatPrice(analysis.collectionPrice)} ₸
                                </div>
                              </div>
                            )}

                            {/* Deadline */}
                            <div className="mb-6">
                              <div className="text-[11px] uppercase text-gray-400 mb-1">
                                {labels.deadline}
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" style={{ color: '#209DA7' }} />
                                <span className="text-[14px] font-medium" style={{ color: '#091D33' }}>
                                  {getAnalysisDeadline(analysis, locale)}
                                </span>
                              </div>
                            </div>

                            {/* Print Button */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePrint(analysis);
                              }}
                              className="w-full flex items-center justify-center gap-2 text-[14px] font-medium transition-colors hover:opacity-90"
                              style={{
                                backgroundColor: '#209DA7',
                                color: 'white',
                                padding: '14px 20px',
                                borderRadius: '10px'
                              }}
                            >
                              <Printer className="w-4 h-4" />
                              {labels.print}
                            </button>

                            {/* Phone */}
                            <a
                              href="tel:+77051000333"
                              onClick={(e) => e.stopPropagation()}
                              className="w-full flex items-center justify-center gap-2 text-[14px] font-medium mt-3 transition-colors hover:opacity-70"
                              style={{
                                border: '1px solid #209DA7',
                                color: '#209DA7',
                                padding: '14px 20px',
                                borderRadius: '10px'
                              }}
                            >
                              +7-705-100-03-33
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {filteredAnalyses.length === 0 && (
            <div className="text-center py-16">
              <FlaskConical className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-[16px] text-gray-500">
                {labels.noResults}
              </p>
            </div>
          )}

          {filteredAnalyses.length > visibleCount && (
            <div className="flex justify-center" style={{ marginTop: '40px' }}>
              <button
                onClick={handleShowMore}
                className="flex items-center gap-2 text-[14px] font-medium transition-colors hover:opacity-90"
                style={{
                  backgroundColor: '#209DA7',
                  color: 'white',
                  padding: '14px 32px',
                  borderRadius: '50px'
                }}
              >
                <span>{labels.showMore}</span>
                <span className="text-white/70">
                  ({filteredAnalyses.length - visibleCount})
                </span>
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
