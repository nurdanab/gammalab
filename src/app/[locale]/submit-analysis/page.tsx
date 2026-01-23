'use client';

import { useState, useEffect } from 'react';
import { Link } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import {
  Search,
  ChevronRight,
  Clock,
  Calendar,
  User,
  Phone,
  X,
} from 'lucide-react';
import { formatPhoneNumber } from '@/utils/phoneFormat';
import { useReCaptcha } from '@/components/ReCaptchaProvider';

interface Analysis {
  id: string;
  slug: string;
  name: string;
  nameKz: string;
  nameEn: string;
  description: string;
  descriptionKz: string;
  descriptionEn: string;
  categoryId: string;
  price: number;
  collectionPrice: number;
  deadline: string;
  deadlineKz: string;
  deadlineEn: string;
  biomaterial: string;
  biomaterialKz: string;
  biomaterialEn: string;
  preparation: string;
  preparationKz: string;
  preparationEn: string;
}

interface Category {
  id: string;
  slug: string;
  name: string;
  nameKz: string;
  nameEn: string;
}

const translations: Record<string, Record<string, string>> = {
  ru: {
    home: 'Главная',
    title: 'Сдать анализ',
    subtitle: 'Выберите необходимый анализ из каталога и запишитесь на сдачу в удобное для вас время.',
    categories: 'Категории',
    allAnalyses: 'Все анализы',
    bloodTests: 'Анализы крови',
    biochemistry: 'Биохимия',
    hormones: 'Гормоны',
    infections: 'Инфекции',
    allergology: 'Аллергология',
    urology: 'Урология',
    preparation: 'Подготовка к анализам',
    preparationNote: 'Большинство анализов крови сдаётся натощак, утром с 7:00 до 11:00.',
    moreInfo: 'Подробнее',
    searchPlaceholder: 'Поиск анализа...',
    found: 'Найдено',
    analyses: 'анализов',
    popular: 'Популярный',
    duration: 'Срок',
    book: 'Записаться',
    bookingTitle: 'Запись на анализ',
    bookingSubtitle: 'Заполните форму, и мы свяжемся с вами для подтверждения',
    yourName: 'Ваше имя',
    enterName: 'Введите имя',
    phone: 'Телефон',
    preferredDate: 'Желаемая дата',
    cancel: 'Отмена',
    submit: 'Отправить заявку',
  },
  kz: {
    home: 'Басты бет',
    title: 'Анализ тапсыру',
    subtitle: 'Каталогтан қажетті анализді таңдап, ыңғайлы уақытта тапсыруға жазылыңыз.',
    categories: 'Санаттар',
    allAnalyses: 'Барлық анализдер',
    bloodTests: 'Қан анализдері',
    biochemistry: 'Биохимия',
    hormones: 'Гормондар',
    infections: 'Инфекциялар',
    allergology: 'Аллергология',
    urology: 'Урология',
    preparation: 'Анализге дайындық',
    preparationNote: 'Қан анализдерінің көпшілігі ашқарынға, таңғы 7:00-ден 11:00-ге дейін тапсырылады.',
    moreInfo: 'Толығырақ',
    searchPlaceholder: 'Анализ іздеу...',
    found: 'Табылды',
    analyses: 'анализ',
    popular: 'Танымал',
    duration: 'Мерзімі',
    book: 'Жазылу',
    bookingTitle: 'Анализге жазылу',
    bookingSubtitle: 'Форманы толтырыңыз, біз сізбен растау үшін байланысамыз',
    yourName: 'Сіздің атыңыз',
    enterName: 'Атыңызды енгізіңіз',
    phone: 'Телефон',
    preferredDate: 'Қалаған күні',
    cancel: 'Болдырмау',
    submit: 'Өтінім жіберу',
  },
  en: {
    home: 'Home',
    title: 'Submit Analysis',
    subtitle: 'Select the required analysis from the catalog and book a time convenient for you.',
    categories: 'Categories',
    allAnalyses: 'All tests',
    bloodTests: 'Blood tests',
    biochemistry: 'Biochemistry',
    hormones: 'Hormones',
    infections: 'Infections',
    allergology: 'Allergology',
    urology: 'Urology',
    preparation: 'Test Preparation',
    preparationNote: 'Most blood tests are taken on an empty stomach, in the morning from 7:00 to 11:00.',
    moreInfo: 'Learn more',
    searchPlaceholder: 'Search analysis...',
    found: 'Found',
    analyses: 'analyses',
    popular: 'Popular',
    duration: 'Duration',
    book: 'Book',
    bookingTitle: 'Book Analysis',
    bookingSubtitle: 'Fill out the form and we will contact you for confirmation',
    yourName: 'Your name',
    enterName: 'Enter your name',
    phone: 'Phone',
    preferredDate: 'Preferred date',
    cancel: 'Cancel',
    submit: 'Submit request',
  },
};

export default function SubmitAnalysisPage() {
  const locale = useLocale() as 'ru' | 'kz' | 'en';
  const t = translations[locale] || translations.ru;

  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAnalysis, setSelectedAnalysis] = useState<Analysis | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const { executeRecaptcha } = useReCaptcha();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/analyses');
        if (response.ok) {
          const data = await response.json();
          setAnalyses(data.analyses || []);
          setCategories(data.categories || []);
        }
      } catch (error) {
        console.error('Error fetching analyses:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const getAnalysisName = (analysis: Analysis) => {
    return locale === 'kz' ? analysis.nameKz : locale === 'en' ? analysis.nameEn : analysis.name;
  };

  const getAnalysisDescription = (analysis: Analysis) => {
    return locale === 'kz' ? analysis.descriptionKz : locale === 'en' ? analysis.descriptionEn : analysis.description;
  };

  const getAnalysisDeadline = (analysis: Analysis) => {
    return locale === 'kz' ? analysis.deadlineKz : locale === 'en' ? analysis.deadlineEn : analysis.deadline;
  };

  const getCategoryName = (category: Category) => {
    return locale === 'kz' ? category.nameKz : locale === 'en' ? category.nameEn : category.name;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(formatPhoneNumber(e.target.value));
  };

  const handleCloseModal = () => {
    setSelectedAnalysis(null);
    setPhoneNumber('');
    setFirstName('');
    setPreferredDate('');
    setSubmitSuccess(false);
    setSubmitError('');
  };

  const handleSubmit = async () => {
    if (!firstName.trim() || !phoneNumber.trim()) {
      setSubmitError(locale === 'ru' ? 'Заполните все обязательные поля' :
                     locale === 'kz' ? 'Барлық міндетті өрістерді толтырыңыз' :
                     'Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Получаем токен reCAPTCHA
      const recaptchaToken = await executeRecaptcha('booking_form');

      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          phone: phoneNumber,
          analysisId: selectedAnalysis?.id,
          analysisName: selectedAnalysis ? getAnalysisName(selectedAnalysis) : '',
          preferredDate,
          recaptchaToken,
        }),
      });

      if (response.ok) {
        setSubmitSuccess(true);
      } else {
        const data = await response.json();
        setSubmitError(data.error || 'Ошибка отправки');
      }
    } catch {
      setSubmitError(locale === 'ru' ? 'Ошибка сети' :
                     locale === 'kz' ? 'Желі қатесі' :
                     'Network error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Build categories with counts from the data
  const categoryList = [
    { id: 'all', name: t.allAnalyses, count: analyses.length },
    ...categories.map(cat => ({
      id: cat.id,
      name: getCategoryName(cat),
      count: analyses.filter(a => a.categoryId === cat.id).length,
    })).filter(cat => cat.count > 0),
  ];

  const filteredAnalyses = analyses.filter((analysis) => {
    const matchesCategory = activeCategory === 'all' || analysis.categoryId === activeCategory;
    const name = getAnalysisName(analysis);
    const matchesSearch = name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div
          style={{
            width: '40px',
            height: '40px',
            border: '3px solid #E5E7EB',
            borderTopColor: '#209DA7',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section
        className="relative pt-[140px] sm:pt-[160px] lg:pt-[180px] pb-10 lg:pb-[60px]"
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

      {/* Main Content */}
      <section className="bg-white px-5 sm:px-8 md:px-12 lg:px-20 py-8 lg:py-10 pb-12 lg:pb-20">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Left Sidebar - Categories */}
          <div className="w-full lg:w-[260px] lg:flex-shrink-0">
            <h3
              className="text-[16px] font-semibold mb-4"
              style={{ color: '#091D33' }}
            >
              {t.categories}
            </h3>
            <div className="flex flex-wrap lg:flex-col gap-2 lg:gap-1">
              {categoryList.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className="flex items-center justify-between text-left transition-colors"
                  style={{
                    padding: '10px 14px',
                    borderRadius: '10px',
                    backgroundColor: activeCategory === category.id ? '#EEF6F6' : 'transparent',
                    color: activeCategory === category.id ? '#209DA7' : '#6B7280',
                  }}
                >
                  <span className="text-[13px] sm:text-[14px] font-medium">{category.name}</span>
                  <span
                    className="text-[12px] ml-2"
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
              className="mt-6 hidden lg:block"
              style={{
                backgroundColor: '#FFF7ED',
                borderRadius: '12px',
                padding: '20px',
                border: '1px solid #FED7AA',
              }}
            >
              <Clock className="mb-3" style={{ color: '#EC910C', width: '24px', height: '24px' }} />
              <h4 className="text-[14px] font-semibold mb-2" style={{ color: '#091D33' }}>
                {t.preparation}
              </h4>
              <p className="text-[12px] leading-[1.6]" style={{ color: '#6B7280' }}>
                {t.preparationNote}
              </p>
              <Link
                href="/patients"
                className="text-[12px] font-medium mt-3 inline-flex items-center gap-1"
                style={{ color: '#EC910C' }}
              >
                {t.moreInfo}
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
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent outline-none text-[14px] ml-3"
                style={{ color: '#091D33' }}
              />
            </div>

            {/* Results count */}
            <p className="text-[13px] mb-4" style={{ color: '#9CA3AF' }}>
              {t.found}: {filteredAnalyses.length} {t.analyses}
            </p>

            {/* Analyses Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredAnalyses.map((analysis) => (
                <div
                  key={analysis.id}
                  className="relative transition-all hover:shadow-md"
                  style={{
                    backgroundColor: '#F9FAFB',
                    borderRadius: '14px',
                    padding: '20px',
                  }}
                >
                  <h4
                    className="text-[14px] sm:text-[15px] font-semibold mb-2"
                    style={{ color: '#091D33', lineHeight: '1.4' }}
                  >
                    {getAnalysisName(analysis)}
                  </h4>
                  <p
                    className="text-[12px] leading-[1.6] mb-4 line-clamp-2"
                    style={{ color: '#6B7280' }}
                  >
                    {getAnalysisDescription(analysis)}
                  </p>

                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-[13px]" style={{ color: '#9CA3AF' }}>
                      {t.duration}: {getAnalysisDeadline(analysis)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span
                      className="text-[18px] sm:text-[20px] font-semibold"
                      style={{ color: '#209DA7' }}
                    >
                      {analysis.price.toLocaleString()} ₸
                    </span>
                    <button
                      onClick={() => setSelectedAnalysis(analysis)}
                      className="text-[12px] sm:text-[13px] font-medium transition-colors"
                      style={{
                        backgroundColor: '#209DA7',
                        color: 'white',
                        padding: '10px 16px',
                        borderRadius: '10px',
                      }}
                    >
                      {t.book}
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
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onClick={handleCloseModal}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full"
            style={{ padding: '24px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3
                  className="text-[20px] sm:text-[24px] font-semibold mb-2"
                  style={{ color: '#091D33' }}
                >
                  {t.bookingTitle}
                </h3>
                <p className="text-[14px]" style={{ color: '#6B7280' }}>
                  {t.bookingSubtitle}
                </p>
              </div>
              <button
                onClick={handleCloseModal}
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
                {getAnalysisName(selectedAnalysis)}
              </p>
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-[13px]" style={{ color: '#6B7280' }}>
                  {t.duration}: {getAnalysisDeadline(selectedAnalysis)}
                </span>
                <span className="text-[18px] font-semibold" style={{ color: '#209DA7' }}>
                  {selectedAnalysis.price.toLocaleString()} ₸
                </span>
              </div>
            </div>

            {submitSuccess ? (
              <div className="text-center py-8">
                <div
                  className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: '#E0F2F4' }}
                >
                  <svg className="w-8 h-8" style={{ color: '#209DA7' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-[18px] font-semibold mb-2" style={{ color: '#091D33' }}>
                  {locale === 'ru' ? 'Заявка отправлена!' :
                   locale === 'kz' ? 'Өтінім жіберілді!' :
                   'Request sent!'}
                </h4>
                <p className="text-[14px] mb-6" style={{ color: '#6B7280' }}>
                  {locale === 'ru' ? 'Мы свяжемся с вами в ближайшее время для подтверждения записи.' :
                   locale === 'kz' ? 'Жазылуды растау үшін жақын арада сізбен байланысамыз.' :
                   'We will contact you shortly to confirm your appointment.'}
                </p>
                <button
                  onClick={handleCloseModal}
                  className="text-[14px] font-medium text-white transition-colors"
                  style={{
                    backgroundColor: '#209DA7',
                    padding: '14px 32px',
                    borderRadius: '12px',
                  }}
                >
                  {locale === 'ru' ? 'Закрыть' : locale === 'kz' ? 'Жабу' : 'Close'}
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {/* Error message */}
                {submitError && (
                  <div
                    className="text-[13px] text-center"
                    style={{
                      backgroundColor: '#FEF2F2',
                      color: '#EF4444',
                      padding: '10px 16px',
                      borderRadius: '8px',
                    }}
                  >
                    {submitError}
                  </div>
                )}

                {/* Name */}
                <div>
                  <label className="text-[13px] font-medium mb-2 block" style={{ color: '#091D33' }}>
                    {t.yourName} *
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
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder={t.enterName}
                      className="flex-1 bg-transparent outline-none text-[14px] ml-3"
                      style={{ color: '#091D33' }}
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="text-[13px] font-medium mb-2 block" style={{ color: '#091D33' }}>
                    {t.phone} *
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
                      value={phoneNumber}
                      onChange={handlePhoneChange}
                      placeholder="+7 700 123 45 67"
                      className="flex-1 bg-transparent outline-none text-[14px] ml-3"
                      style={{ color: '#091D33' }}
                    />
                  </div>
                </div>

                {/* Date */}
                <div>
                  <label className="text-[13px] font-medium mb-2 block" style={{ color: '#091D33' }}>
                    {t.preferredDate}
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
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="flex-1 bg-transparent outline-none text-[14px] ml-3"
                      style={{ color: '#091D33' }}
                    />
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 mt-2">
                  <button
                    onClick={handleCloseModal}
                    className="flex-1 text-[14px] font-medium transition-colors"
                    style={{
                      backgroundColor: '#F3F4F6',
                      color: '#6B7280',
                      padding: '14px 24px',
                      borderRadius: '12px',
                    }}
                  >
                    {t.cancel}
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex-1 text-[14px] font-medium text-white transition-colors"
                    style={{
                      backgroundColor: '#209DA7',
                      padding: '14px 24px',
                      borderRadius: '12px',
                      opacity: isSubmitting ? 0.6 : 1,
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    }}
                  >
                    {isSubmitting
                      ? (locale === 'ru' ? 'Отправка...' : locale === 'kz' ? 'Жіберілуде...' : 'Sending...')
                      : t.submit}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
