import { Link } from '@/i18n/routing';
import { getPageById, type Page } from '@/lib/data';

// Disable caching for this page to always show latest data
export const dynamic = 'force-dynamic';

type Locale = 'ru' | 'kz' | 'en';

interface Props {
  params: Promise<{ locale: Locale }>;
}

// Static translations for UI elements
const uiTranslations = {
  ru: {
    home: 'Главная',
    lastUpdatedPrefix: 'Последнее обновление: ',
  },
  kz: {
    home: 'Басты бет',
    lastUpdatedPrefix: 'Соңғы жаңарту: ',
  },
  en: {
    home: 'Home',
    lastUpdatedPrefix: 'Last updated: ',
  },
};

// Fallback data in case database is not available
const fallbackData = {
  title: 'Политика конфиденциальности',
  titleKz: 'Құпиялылық саясаты',
  titleEn: 'Privacy Policy',
  lastUpdated: 'Январь 2024',
  lastUpdatedKz: 'Қаңтар 2024',
  lastUpdatedEn: 'January 2024',
  sections: [
    { title: '1. Общие положения', content: 'Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных пользователей сайта GammaLab.' },
  ],
  sectionsKz: [
    { title: '1. Жалпы ережелер', content: 'Осы Құпиялылық саясаты GammaLab сайты пайдаланушыларының дербес деректерін өңдеу және қорғау тәртібін анықтайды.' },
  ],
  sectionsEn: [
    { title: '1. General Provisions', content: 'This Privacy Policy defines the procedure for processing and protecting personal data of users of the GammaLab website.' },
  ],
};

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  const ui = uiTranslations[locale] || uiTranslations.ru;

  // Fetch page data from database
  let pageData: Page | null = null;
  try {
    pageData = await getPageById('privacy');
  } catch (error) {
    console.error('Error fetching privacy page:', error);
  }

  // Get localized content
  const title = pageData
    ? (locale === 'kz' ? pageData.titleKz : locale === 'en' ? pageData.titleEn : pageData.title)
    : (locale === 'kz' ? fallbackData.titleKz : locale === 'en' ? fallbackData.titleEn : fallbackData.title);

  const lastUpdated = pageData
    ? (locale === 'kz' ? pageData.lastUpdatedKz : locale === 'en' ? pageData.lastUpdatedEn : pageData.lastUpdated)
    : (locale === 'kz' ? fallbackData.lastUpdatedKz : locale === 'en' ? fallbackData.lastUpdatedEn : fallbackData.lastUpdated);

  const sections = pageData
    ? (locale === 'kz' ? pageData.sectionsKz : locale === 'en' ? pageData.sectionsEn : pageData.sections)
    : (locale === 'kz' ? fallbackData.sectionsKz : locale === 'en' ? fallbackData.sectionsEn : fallbackData.sections);

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
              {ui.home}
            </Link>
            <span className="text-[13px]" style={{ color: '#9CA3AF' }}>/</span>
            <span className="text-[13px]" style={{ color: '#209DA7' }}>
              {title}
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-[28px] sm:text-[36px] lg:text-[42px] font-semibold mb-3"
            style={{ color: '#091D33' }}
          >
            {title}
          </h1>
          <p className="text-[14px]" style={{ color: '#6B7280' }}>
            {ui.lastUpdatedPrefix}{lastUpdated}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-10 lg:py-16">
        <div className="container-main">
          <div className="max-w-[800px]">
            {sections.map((section, index) => (
              <div key={index} className="mb-8">
                <h2
                  className="text-[18px] lg:text-[20px] font-semibold mb-4"
                  style={{ color: '#091D33' }}
                >
                  {section.title}
                </h2>
                <div
                  className="text-[14px] lg:text-[15px] leading-[1.8] whitespace-pre-line"
                  style={{ color: '#6B7280' }}
                >
                  {section.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
