import Image from 'next/image';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { getHomepageCategories, getFeaturedHomepageCategory, getHomepageReviews, getFeaturedNewsFromCMS, type HomepageCategory, type Review, type NewsItem } from '@/lib/data';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';
import CategoriesSection from '@/components/CategoriesSection';

type Props = {
  params: Promise<{ locale: string }>;
};

// Service icons mapping
const serviceIcons: Record<string, React.ReactNode> = {
  flask: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 3h6v6l4 8H5l4-8V3z"/>
      <path d="M9 3h6"/>
    </svg>
  ),
  clock: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  calendar: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ),
  home: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
  microscope: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 18h8"/>
      <path d="M3 22h18"/>
      <path d="M14 22a7 7 0 1 0 0-14h-1"/>
      <path d="M9 14h2"/>
      <path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z"/>
      <path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"/>
    </svg>
  ),
  users: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Home');

  // Fetch data from CMS
  const [categories, featuredCategory, reviews, news] = await Promise.all([
    getHomepageCategories(),
    getFeaturedHomepageCategory(),
    getHomepageReviews(),
    getFeaturedNewsFromCMS(3),
  ]);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <HeroSection locale={locale} />

      {/* Stats Section */}
      <StatsSection locale={locale} />

      {/* Mission Section */}
      <MissionSection locale={locale} />

      {/* Services Section */}
      <ServicesSection locale={locale} />

      {/* About Section */}
      <AboutSection locale={locale} />

      {/* Popular Analysis Section - временно отключено */}
      {/* {categories.length > 0 && featuredCategory && (
        <CategoriesSection
          categories={categories}
          featuredCategory={featuredCategory}
          locale={locale}
        />
      )} */}

      {/* Testimonials Section */}
      {reviews.length > 0 && (
        <TestimonialsSection reviews={reviews} locale={locale} />
      )}

      {/* News Section */}
      {news.length > 0 && (
        <NewsSection news={news} locale={locale} />
      )}

      {/* Quick Search Section */}
      <QuickSearchSection locale={locale} />
    </div>
  );
}

// Hero Section Component
function HeroSection({ locale }: { locale: string }) {
  const texts = {
    ru: {
      badge: 'Медицинская лаборатория',
      title1: 'Мы заботимся',
      title2: 'о вашем здоровье',
      description: 'Современная диагностическая лаборатория с высокоточным оборудованием. Мы предоставляем узкий спектр лабораторных исследований для точной диагностики.',
      cta: 'Связаться с нами',
    },
    kz: {
      badge: 'Медициналық зертхана',
      title1: 'Біз сіздің',
      title2: 'денсаулығыңызға қамқорлық жасаймыз',
      description: 'Жоғары дәлдіктегі жабдықтармен жабдықталған заманауи диагностикалық зертхана. Дәл диагностика үшін зертханалық зерттеулердің тар спектрін ұсынамыз.',
      cta: 'Бізбен байланысыңыз',
    },
    en: {
      badge: 'Medical Laboratory',
      title1: 'We care',
      title2: 'about your health',
      description: 'Modern diagnostic laboratory with high-precision equipment. We provide a narrow range of laboratory tests for accurate diagnostics.',
      cta: 'Contact us',
    },
  };

  const t = texts[locale as keyof typeof texts] || texts.ru;

  return (
    <section className="relative min-h-[500px] sm:min-h-[550px] lg:min-h-[700px]">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-doctor.png"
          alt="GammaLab Laboratory"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      <div className="absolute inset-0 flex items-center">
        <div className="container-main" style={{ paddingTop: '60px' }}>
          <div className="max-w-lg">
            <div
              className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm mb-4"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#209DA7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
              </svg>
              <span className="text-xs font-medium text-gray-700">
                {t.badge}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[44px] font-semibold leading-[1.2] text-[#091D33] mb-2 lg:mb-3">
              {t.title1}
              <br />
              {t.title2}
            </h1>

            <p className="text-sm lg:text-[15px] leading-[1.8] text-gray-700 mb-6 lg:mb-10 max-w-[500px]">
              {t.description}
            </p>

            <Link
              href="/contacts"
              className="inline-block text-white hover:opacity-90 transition-all text-sm font-medium bg-[#EC910C] px-6 lg:px-8 py-3 rounded-full"
            >
              {t.cta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// Stats Section Component
function StatsSection({ locale }: { locale: string }) {
  const stats = {
    ru: [
      { value: '+15 000', label: 'Довольных пациентов' },
      { value: '+30 000', label: 'Проведенных исследований' },
      { value: '+5', label: 'Лет опыта' },
    ],
    kz: [
      { value: '+15 000', label: 'Қанағаттанған пациенттер' },
      { value: '+30 000', label: 'Жүргізілген зерттеулер' },
      { value: '+5', label: 'Жыл тәжірибе' },
    ],
    en: [
      { value: '+15,000', label: 'Satisfied patients' },
      { value: '+30,000', label: 'Tests conducted' },
      { value: '+5', label: 'Years of experience' },
    ],
  };

  const items = stats[locale as keyof typeof stats] || stats.ru;

  return (
    <section className="bg-white">
      <div className="container-main py-12 lg:py-20">
        <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-0">
        {items.map((stat, index) => (
          <div key={index} className="flex items-center">
            <div className="text-center px-4 sm:px-8 lg:px-12 xl:px-16">
              <div className="text-3xl sm:text-4xl lg:text-[48px] font-semibold text-[#209DA7]">
                {stat.value}
              </div>
              <div className="text-xs lg:text-sm text-gray-500">{stat.label}</div>
            </div>
            {index < items.length - 1 && (
              <div className="hidden lg:block w-px h-14 bg-gray-200" />
            )}
          </div>
        ))}
        </div>
      </div>
    </section>
  );
}

// Mission Section Component
function MissionSection({ locale }: { locale: string }) {
  const content = {
    ru: {
      goal: {
        title: 'Цель',
        text: 'Внедрять инновации, развивать медицинскую науку и способствовать общественному здоровью в Казахстане, а также сделать доступными для населения редкие виды анализов.',
      },
      vision: {
        title: 'Видение',
        text: '"GammaLab" видит будущее здравоохранения в Казахстане как сферу, где каждый человек может получить доступ к высокоточной медицинской диагностике. Мы стремимся стать ведущим отечественным инновационным центром, предоставляя современные методы исследований, которые играют ключевую роль в раннем выявлении заболеваний и управлении здоровьем.',
      },
      mission: {
        title: 'Миссия',
        text: '"GammaLab" — предоставить современные, высокотехнологичные методы молекулярно-генетической диагностики. Мы стремимся активно участвовать в прогрессе здравоохранения в Казахстане, внедряя инновационные подходы и технологии, способствуя росту уровня общественного здоровья и благополучия граждан Казахстана.',
      },
    },
    kz: {
      goal: {
        title: 'Мақсат',
        text: 'Инновацияларды енгізу, медициналық ғылымды дамыту және Қазақстандағы қоғамдық денсаулықты нығайту, сондай-ақ сирек кездесетін талдау түрлерін халыққа қолжетімді ету.',
      },
      vision: {
        title: 'Көзқарас',
        text: '"GammaLab" Қазақстандағы денсаулық сақтаудың болашағын әр адам жоғары дәлдіктегі медициналық диагностикаға қол жеткізе алатын сала ретінде көреді. Біз аурулардың ерте анықтауда және денсаулықты басқаруда шешуші рөл атқаратын заманауи зерттеу әдістерін ұсына отырып, жетекші отандық инновациялық орталыққа айналуға ұмтыламыз.',
      },
      mission: {
        title: 'Миссия',
        text: '"GammaLab" — заманауи, жоғары технологиялық молекулярлық-генетикалық диагностика әдістерін ұсыну. Біз инновациялық тәсілдер мен технологияларды енгізе отырып, Қазақстан азаматтарының қоғамдық денсаулығы мен әл-ауқатының өсуіне ықпал ете отырып, Қазақстандағы денсаулық сақтау прогресіне белсенді қатысуға ұмтыламыз.',
      },
    },
    en: {
      goal: {
        title: 'Goal',
        text: 'To implement innovations, develop medical science and promote public health in Kazakhstan, as well as make rare types of tests accessible to the population.',
      },
      vision: {
        title: 'Vision',
        text: '"GammaLab" sees the future of healthcare in Kazakhstan as a sphere where every person can access high-precision medical diagnostics. We strive to become a leading domestic innovation center, providing modern research methods that play a key role in early disease detection and health management.',
      },
      mission: {
        title: 'Mission',
        text: '"GammaLab" — to provide modern, high-tech methods of molecular genetic diagnostics. We strive to actively participate in the progress of healthcare in Kazakhstan, implementing innovative approaches and technologies, contributing to the growth of public health and well-being of Kazakhstan citizens.',
      },
    },
  };

  const t = content[locale as keyof typeof content] || content.ru;

  const items = [
    { icon: 'goal', ...t.goal },
    { icon: 'vision', ...t.vision },
    { icon: 'mission', ...t.mission },
  ];

  const icons: Record<string, React.ReactNode> = {
    goal: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <circle cx="12" cy="12" r="6"/>
        <circle cx="12" cy="12" r="2"/>
      </svg>
    ),
    vision: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
    mission: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
  };

  return (
    <section className="bg-white">
      <div className="container-main py-12 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-center w-14 h-14 lg:w-16 lg:h-16 rounded-xl bg-[#EC910C]/10 text-[#EC910C] mb-5 lg:mb-6">
                {icons[item.icon]}
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-[#091D33] mb-3 lg:mb-4">
                {item.title}
              </h3>
              <p className="text-sm leading-[1.8] text-gray-500">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Services Section Component
function ServicesSection({ locale }: { locale: string }) {
  const content = {
    ru: {
      title1: 'Основные услуги',
      title2: 'Gammalab',
            services: [
        { icon: 'flask', title: 'Лабораторные анализы', description: 'Узкий профиль персонифицированной диагностики, внедряя современные молекулярно-генетические и иммуногистохимические методы исследований' },
        { icon: 'clock', title: 'Быстрые результаты', description: 'Скорость выдачи результатов исследований от 3-14 рабочих дней в зависимости от профиля проводимого исследования' },
        { icon: 'calendar', title: 'Результаты онлайн', description: 'В соответствии с политикой конфиденциальности результаты исследований поступают на электронную почту, указанную при формировании направления и оплаты услуг' },
        { icon: 'microscope', title: 'Контроль качества', description: 'Ежегодно и ежеквартально проводится внутренняя и внешняя оценка качества проводимых исследований' },
      ],
    },
    kz: {
      title1: 'Негізгі қызметтер',
      title2: 'Gammalab',
            services: [
        { icon: 'flask', title: 'Зертханалық талдаулар', description: 'Заманауи молекулалық-генетикалық және иммуногистохимиялық зерттеу әдістерін енгізе отырып, дербес диагностиканың тар профилі' },
        { icon: 'clock', title: 'Жылдам нәтижелер', description: 'Жүргізілетін зерттеу профиліне байланысты зерттеу нәтижелерін беру жылдамдығы 3-14 жұмыс күні' },
        { icon: 'calendar', title: 'Онлайн нәтижелер', description: 'Құпиялылық саясатына сәйкес зерттеу нәтижелері бағытты қалыптастыру және қызметтерді төлеу кезінде көрсетілген электрондық поштаға жіберіледі' },
        { icon: 'microscope', title: 'Сапа бақылауы', description: 'Жүргізілетін зерттеулердің сапасын ішкі және сыртқы бағалау жыл сайын және тоқсан сайын жүргізіледі' },
      ],
    },
    en: {
      title1: 'Main services',
      title2: 'Gammalab',
            services: [
        { icon: 'flask', title: 'Laboratory Tests', description: 'Narrow profile of personalized diagnostics, implementing modern molecular-genetic and immunohistochemical research methods' },
        { icon: 'clock', title: 'Fast Results', description: 'Research results delivery speed from 3-14 working days depending on the research profile' },
        { icon: 'calendar', title: 'Online Results', description: 'In accordance with the privacy policy, research results are sent to the email address specified when creating the referral and paying for services' },
        { icon: 'microscope', title: 'Quality Control', description: 'Internal and external quality assessment of research is conducted annually and quarterly' },
      ],
    },
  };

  const t = content[locale as keyof typeof content] || content.ru;

  return (
    <section className="bg-white">
      <div className="container-main py-10 lg:py-16 pb-16 lg:pb-24">
        {/* Main container with circles */}
        <div
          className="relative overflow-hidden bg-[#209DA7] rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-10 pb-28 sm:pb-32 lg:pb-36"
        >
        {/* Decorative circles */}
        <div className="absolute -top-24 -left-12 w-72 h-72 rounded-full border-[120px] lg:border-[150px] border-[rgba(9,29,51,0.08)]" />
        <div className="absolute top-8 left-72 w-40 h-40 rounded-full border-[80px] lg:border-[100px] border-[rgba(236,145,12,0.1)] hidden lg:block" />
        <div className="absolute -bottom-28 -right-20 w-80 h-80 rounded-full border-[160px] lg:border-[200px] border-[rgba(9,29,51,0.06)]" />
        <div className="absolute bottom-24 right-40 w-48 h-48 rounded-full border-[80px] lg:border-[100px] border-[rgba(236,145,12,0.08)] hidden lg:block" />

        {/* Header */}
        <div className="relative flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 lg:gap-8">
          <h2 className="text-2xl sm:text-[28px] lg:text-[32px] font-semibold text-white leading-[1.2]">
            {t.title1}
            <br />
            {t.title2}
          </h2>
                  </div>
      </div>

        {/* Service Cards */}
        <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 -mt-16 sm:-mt-20 lg:-mt-20 z-10 mx-4 sm:mx-8 lg:mx-12">
          {t.services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-xl lg:rounded-2xl text-center shadow-lg p-4 sm:p-5 lg:p-6"
            >
              <div className="flex justify-center mb-4 lg:mb-6 text-[#209DA7]">
                {serviceIcons[service.icon] || serviceIcons.flask}
              </div>
              <h3 className="text-sm lg:text-base font-semibold mb-2 lg:mb-3 text-[#091D33] line-clamp-2">
                {service.title}
              </h3>
              <p className="text-[11px] lg:text-xs leading-[1.7] text-gray-500 line-clamp-3">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// About Section Component
function AboutSection({ locale }: { locale: string }) {
  const content = {
    ru: {
      label: 'О нас',
      title: 'Удобные и быстрые анализы',
      description: '«Будьте здоровы!» — как часто мы говорим и слышим эти слова. Однако одного пожелания мало. За здоровьем необходимо следить. Ключевую роль в этом играет качественная лабораторная диагностика.',
      features: [
        { title: 'Быстро', subtitle: 'Экономия времени и скорость' },
        { title: 'Качественно', subtitle: 'Качество и достоверность' },
        { title: 'Точно', subtitle: 'Профессионализм и технологичность' },
        { title: 'Удобно', subtitle: 'Удобство и комфорт' },
      ],
    },
    kz: {
      label: 'Біз туралы',
      title: 'Ыңғайлы және жылдам анализдер',
      description: '«Дені сау болыңыз!» — біз бұл сөздерді жиі айтамыз және естиміз. Бірақ бір тілек жеткіліксіз. Денсаулықты қадағалау керек. Сапалы зертханалық диагностика бұнда шешуші рөл атқарады.',
      features: [
        { title: 'Жылдам', subtitle: 'Уақытты үнемдеу және жылдамдық' },
        { title: 'Сапалы', subtitle: 'Сапа және дәлдік' },
        { title: 'Дәл', subtitle: 'Кәсіпқойлық және технологиялық' },
        { title: 'Ыңғайлы', subtitle: 'Ыңғайлылық және жайлылық' },
      ],
    },
    en: {
      label: 'About us',
      title: 'Convenient and fast tests',
      description: '"Be healthy!" - how often we say and hear these words. However, one wish is not enough. Health needs to be monitored. Quality laboratory diagnostics plays a key role in this.',
      features: [
        { title: 'Fast', subtitle: 'Time saving and speed' },
        { title: 'Quality', subtitle: 'Quality and reliability' },
        { title: 'Accurate', subtitle: 'Professionalism and technology' },
        { title: 'Convenient', subtitle: 'Convenience and comfort' },
      ],
    },
  };

  const t = content[locale as keyof typeof content] || content.ru;

  const featureIcons = [
    <svg key="clock" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    <svg key="check" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
    <svg key="thumb" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>,
    <svg key="smile" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>,
  ];

  return (
    <section className="relative bg-white overflow-hidden">
      {/* Background decorative circles */}
      <div className="absolute top-[5%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] lg:w-[500px] h-[300px] lg:h-[500px] rounded-full border-[3px] border-gray-200/30" />
      <div className="absolute top-[5%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] lg:w-[300px] h-[180px] lg:h-[300px] rounded-full border-[3px] border-gray-200/30" />

      <div className="container-main py-12 lg:py-20">
        <div className="relative text-center max-w-[700px] mx-auto mb-10 lg:mb-16">
          <p className="text-xs uppercase tracking-widest mb-3 lg:mb-4 text-gray-400">
            {t.label}
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-4 lg:mb-6 text-[#091D33]">
            {t.title}
          </h2>
          <p className="text-sm leading-[1.8] text-gray-500">
            {t.description}
          </p>
        </div>

        {/* Features */}
        <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {t.features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4 lg:mb-6">
                <div className="pulse-icon flex items-center justify-center w-14 h-14 lg:w-[70px] lg:h-[70px] rounded-[10%] bg-[#209DA7]">
                  {featureIcons[index]}
                </div>
              </div>
              <h3 className="text-base lg:text-lg font-semibold mb-2 lg:mb-3 text-[#091D33]">
                {feature.title}
              </h3>
              <p className="text-xs lg:text-sm text-gray-500">{feature.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Testimonials Section Component
function TestimonialsSection({ reviews, locale }: { reviews: Review[]; locale: string }) {
  // Prepare avatar positions for decoration with animations
  const avatarPositions = [
    { top: '0', left: '50%', transform: 'translateX(-50%)', size: 'w-16 h-16 sm:w-20 sm:h-20 lg:w-[90px] lg:h-[90px]', animation: 'float-1 4s ease-in-out infinite' },
    { top: '70px', left: '20px', size: 'w-12 h-12 sm:w-14 sm:h-14 lg:w-[70px] lg:h-[70px]', animation: 'float-2 5s ease-in-out infinite 0.5s' },
    { top: '50px', right: '30px', size: 'w-14 h-14 sm:w-16 sm:h-16 lg:w-[80px] lg:h-[80px]', animation: 'float-3 6s ease-in-out infinite 1s' },
    { bottom: '30px', left: '50px', size: 'w-12 h-12 sm:w-14 sm:h-14 lg:w-[75px] lg:h-[75px]', animation: 'float-2 4.5s ease-in-out infinite 0.3s' },
    { bottom: '10px', right: '60px', size: 'w-10 h-10 sm:w-12 sm:h-12 lg:w-[65px] lg:h-[65px]', animation: 'float-1 5.5s ease-in-out infinite 0.7s' },
  ];

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #EEF6F6 0%, #E8F4F4 100%)' }}
    >
      {/* Background decorative circle with pulse */}
      <div
        className="absolute -right-24 top-1/2 w-[250px] sm:w-[300px] lg:w-[400px] h-[250px] sm:h-[300px] lg:h-[400px] rounded-full border-2 border-[rgba(32,157,167,0.15)]"
        style={{ animation: 'pulse-circle 3s ease-in-out infinite' }}
      />

      <div className="container-main py-10 sm:py-12 lg:py-20">
        <div className="relative flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
        {/* Left - Photos decoration */}
        <div className="relative w-full sm:w-[280px] lg:w-[350px] h-[180px] sm:h-[220px] lg:h-[300px] hidden sm:block flex-shrink-0">
          {reviews.slice(0, 5).map((review, index) => {
            const pos = avatarPositions[index];
            return (
              <div
                key={review.id}
                className={`absolute overflow-hidden rounded-full border-[3px] border-white shadow-lg ${pos.size}`}
                style={{
                  top: pos.top,
                  left: pos.left,
                  right: pos.right,
                  bottom: pos.bottom,
                  transform: pos.transform,
                  animation: pos.animation,
                }}
              >
                {review.photo ? (
                  <Image src={review.photo} alt="" fill className="object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#209DA7] to-[#1a7d85] flex items-center justify-center text-white text-base sm:text-lg font-semibold">
                    {review.name.charAt(0)}
                  </div>
                )}
              </div>
            );
          })}
        </div>

          {/* Right - Testimonial carousel */}
          <TestimonialsCarousel reviews={reviews} locale={locale} />
        </div>
      </div>
    </section>
  );
}

// News Section Component
function NewsSection({ news, locale }: { news: NewsItem[]; locale: string }) {
  const getTitle = (item: NewsItem) => {
    return locale === 'kz' ? item.titleKz : locale === 'en' ? item.titleEn : item.title;
  };

  const getExcerpt = (item: NewsItem) => {
    return locale === 'kz' ? item.excerptKz : locale === 'en' ? item.excerptEn : item.excerpt;
  };

  const sectionTexts = {
    ru: { title: 'Наши последние новости', readMore: 'Читать далее', allNews: 'Все новости' },
    kz: { title: 'Біздің соңғы жаңалықтар', readMore: 'Толығырақ оқу', allNews: 'Барлық жаңалықтар' },
    en: { title: 'Our latest news', readMore: 'Read more', allNews: 'All news' },
  };

  const t = sectionTexts[locale as keyof typeof sectionTexts] || sectionTexts.ru;

  return (
    <section className="bg-white">
      <div className="container-main py-12 lg:py-20">
        <h2 className="text-xl sm:text-2xl lg:text-[28px] font-semibold mb-8 lg:mb-10 text-[#091D33]">
          {t.title}
      </h2>

      {/* News Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 mb-10 lg:mb-12">
        {news.map((item) => (
          <Link key={item.id} href={`/news/${item.slug}`} className="group">
            <div className="relative mb-4 lg:mb-5 overflow-hidden rounded-lg h-[160px] lg:h-[180px]">
              <Image
                src={item.image}
                alt={getTitle(item)}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="text-sm lg:text-[15px] font-semibold mb-2 text-[#091D33] group-hover:text-[#209DA7] transition-colors line-clamp-2">
              {getTitle(item)}
            </h3>
            <p className="text-xs lg:text-[13px] leading-[1.7] mb-3 lg:mb-4 text-gray-400 line-clamp-2">
              {getExcerpt(item)}
            </p>
            <span className="text-xs lg:text-[13px] font-medium text-[#209DA7]">
              {t.readMore}
            </span>
          </Link>
        ))}
      </div>

        {/* Button */}
        <div className="text-center">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider border border-[#209DA7] text-[#209DA7] px-6 lg:px-7 py-3 rounded-md bg-transparent hover:bg-[#209DA7] hover:text-white transition-colors"
          >
            {t.allNews}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

// Quick Search Section Component
function QuickSearchSection({ locale }: { locale: string }) {
  const content = {
    ru: { label: 'Быстрый поиск', title1: 'Найдите нужный', title2: 'анализ быстро', placeholder: 'Введите название анализа', button: 'Найти' },
    kz: { label: 'Жылдам іздеу', title1: 'Қажетті анализді', title2: 'тез табыңыз', placeholder: 'Анализ атауын енгізіңіз', button: 'Табу' },
    en: { label: 'Quick search', title1: 'Find the right', title2: 'test quickly', placeholder: 'Enter test name', button: 'Find' },
  };

  const t = content[locale as keyof typeof content] || content.ru;

  return (
    <section className="relative overflow-hidden bg-[#209DA7]">
      {/* Background decoration */}
      <div className="absolute -left-24 top-1/2 -translate-y-1/2 w-[300px] lg:w-[400px] h-[300px] lg:h-[400px] rounded-full bg-white/5" />

      <div className="container-main py-12 lg:py-[70px]">
        <div className="relative flex flex-col lg:flex-row items-center lg:justify-between gap-6 lg:gap-8">
          {/* Left - Text */}
          <div className="text-center lg:text-left">
            <p className="text-[10px] lg:text-[11px] uppercase tracking-widest mb-2 lg:mb-3 text-white/70">
              {t.label}
            </p>
            <h2 className="text-2xl sm:text-[28px] lg:text-[32px] font-semibold text-white leading-[1.3]">
              {t.title1}
              <br className="hidden lg:block" />{' '}
              {t.title2}
            </h2>
          </div>

          {/* Right - Search Input */}
          <form
            action={`/${locale}/analyses`}
            method="get"
            className="flex items-center w-full lg:w-auto bg-white/15 rounded-full p-1.5 lg:p-1.5 pl-5 lg:pl-7 min-w-0 lg:min-w-[420px]"
          >
            <input
              type="text"
              name="search"
              placeholder={t.placeholder}
              className="flex-1 bg-transparent outline-none text-sm text-white placeholder:text-white/60 min-w-0"
            />
            <button
              type="submit"
              className="text-xs font-medium uppercase tracking-wider bg-white text-[#091D33] px-5 lg:px-7 py-3 lg:py-3.5 rounded-full hover:bg-gray-100 transition-colors whitespace-nowrap"
            >
              {t.button}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
