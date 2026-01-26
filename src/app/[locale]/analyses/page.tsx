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

type Locale = 'ru' | 'kz' | 'en';

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
  name: string;
  nameKz: string;
  nameEn: string;
  slug: string;
}

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

  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedAnalysis, setExpandedAnalysis] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(10);
  const [showTuberculosisModal, setShowTuberculosisModal] = useState(false);
  const [showOncogeneticsModal, setShowOncogeneticsModal] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  // Fetch data from API
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/analyses');
        if (res.ok) {
          const data = await res.json();
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

  // Update searchQuery when URL param changes
  useEffect(() => {
    const search = searchParams.get('search') || '';
    if (search !== searchQuery) {
      setSearchQuery(search);
    }
  }, [searchParams]);

  // Helper function to get analyses by category
  const getAnalysesByCategory = (categoryId: string) => {
    return analyses.filter(a => a.categoryId === categoryId);
  };

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
      ? analyses.filter(a => a.categoryId === selectedCategory)
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
  }, [selectedCategory, searchQuery, locale, analyses]);

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

  // Tuberculosis Modal Translations
  const tbModalTexts = {
    ru: {
      title: 'Диагностика туберкулеза',
      description: 'Тест T-SPOT.TB – это анализ крови, также известный как «тест высвобождения гамма-интерферона» (IGRA), иммунологический тест для диагностики инфицирования микобактериями туберкулеза.',
      advantagesTitle: 'ПРЕИМУЩЕСТВА ТЕСТА T-SPOT.TB',
      accuracy: 'Точность:',
      accuracyText: 'T-SPOT.TB - единственный тест для диагностики туберкулеза, чувствительность и специфичность которого по данным основных клинических исследований превышают 95%.',
      reliability: 'Достоверность:',
      reliabilityText: 'T-SPOT.TB позволяет выявить инфицированных микобактериями туберкулеза даже среди «проблемных» популяций пациентов, включая иммигрантов и иммунокомпрометированных больных, не имеет перекрестных реакций с вакциной БЦЖ.',
      simplicity: 'Простота:',
      simplicityText: 'Тестирование методом T-SPOT.TB требует всего одного визита к врачу и одной пробирки крови. Все этапы теста контролирует лаборатория.',
      benefitsTitle: 'Преимущества теста T-SPOT.TB',
      benefits: [
        'Обладает чувствительностью даже у пациентов с иммуносупрессией (ВИЧ-инфицированные)',
        'Для всех групп населения (дети, подростки, взрослые, беременные)',
        'Определяет инфекцию, вне зависимости от ее локализации (легкие, кости и т. д.)',
        'Не имеет противопоказаний и ограничений',
        'На результаты анализа не влияют индивидуальные особенности пациента (наличие аллергий, соматических заболеваний, кожных патологий, прием лекарственных препаратов, вакцинация BCG в прошлом)',
        'Выявляет любую форму туберкулеза (скрытую или активную)',
        'Безопасность и отсутствие побочных реакций',
        'Тест выбора при наличии противопоказаний к проведению кожных проб'
      ],
      casesTitle: 'СЛУЧАИ ПРЕДПОЧТИТЕЛЬНОГО ИСПОЛЬЗОВАНИЯ Т-СПОТ:',
      cases: [
        'у детей, привитых БЦЖ, у которых выявлена ложноположительная реакция Манту. В этом случае ценно сделать это малоинвазивное исследование до рентгенографии легких;',
        'у лиц с аллергическими и аутоиммунными заболеваниями;',
        'у медицинских работников, людей, которые много путешествуют, военных, беременных;',
        'у заключенных или прибывших из мест заключения; у больных наркоманиями;',
        'у лиц, контактирующих с туберкулезными больными;',
        'у пациентов, проходящих терапию подавляющую иммунитет, как например, глюкостероидная или лучевая терапия, лечение с замещением функции почек;',
        'при наличии хронических заболеваний, сопровождающихся снижением или истощением иммунитета, как например, сахарный диабет, уже упоминавшийся ВИЧ, или пневмокониозы;',
        'при подозрении на внелегочные формы туберкулеза.'
      ]
    },
    kz: {
      title: 'Туберкулез диагностикасы',
      description: 'T-SPOT.TB тесті – бұл қан анализі, «гамма-интерферон шығару тесті» (IGRA) деп те аталады, туберкулез микобактерияларымен инфекцияны диагностикалауға арналған иммунологиялық тест.',
      advantagesTitle: 'T-SPOT.TB ТЕСТІНІҢ АРТЫҚШЫЛЫҚТАРЫ',
      accuracy: 'Дәлдік:',
      accuracyText: 'T-SPOT.TB - негізгі клиникалық зерттеулер деректері бойынша сезімталдығы мен ерекшелігі 95%-дан асатын туберкулезді диагностикалауға арналған жалғыз тест.',
      reliability: 'Сенімділік:',
      reliabilityText: 'T-SPOT.TB иммигранттар мен иммунитеті төмендеген науқастарды қоса алғанда, «проблемалы» науқастар популяцияларының арасында да туберкулез микобактерияларымен инфекцияланғандарды анықтауға мүмкіндік береді, БЦЖ вакцинасымен айқас реакциялары жоқ.',
      simplicity: 'Қарапайымдылық:',
      simplicityText: 'T-SPOT.TB әдісімен тестілеу дәрігерге бір рет баруды және бір пробирка қанды ғана талап етеді. Тесттің барлық кезеңдерін зертхана бақылайды.',
      benefitsTitle: 'T-SPOT.TB тестінің артықшылықтары',
      benefits: [
        'Иммуносупрессиясы бар науқастарда да (АИТВ-инфекциясы бар) сезімталдыққа ие',
        'Барлық халық топтары үшін (балалар, жасөспірімдер, ересектер, жүкті әйелдер)',
        'Инфекцияны оның орналасуына қарамастан анықтайды (өкпе, сүйектер және т.б.)',
        'Қарсы көрсетілімдері мен шектеулері жоқ',
        'Талдау нәтижелеріне науқастың жеке ерекшеліктері әсер етпейді (аллергиялардың, соматикалық аурулардың, тері патологияларының болуы, дәрілік препараттарды қабылдау, бұрын BCG вакцинациясы)',
        'Туберкулездің кез келген түрін анықтайды (жасырын немесе белсенді)',
        'Қауіпсіздік және жанама реакциялардың болмауы',
        'Тері сынамаларын жүргізуге қарсы көрсетілімдер болған кезде таңдау тесті'
      ],
      casesTitle: 'Т-СПОТ ҚОЛДАНУДЫҢ АРТЫҚШЫЛЫҚТЫ ЖАҒДАЙЛАРЫ:',
      cases: [
        'БЦЖ егілген балаларда, жалған оң Манту реакциясы анықталған. Бұл жағдайда өкпенің рентгенографиясына дейін осы аз инвазивті зерттеуді жүргізу құнды;',
        'аллергиялық және аутоиммунды аурулары бар адамдарда;',
        'медицина қызметкерлерінде, көп саяхаттайтын адамдарда, әскери қызметкерлерде, жүкті әйелдерде;',
        'сотталғандарда немесе түрмеден келгендерде; нашақорлармен ауыратындарда;',
        'туберкулезбен ауыратындармен байланыста болған адамдарда;',
        'иммунитетті басатын терапиядан өтіп жатқан науқастарда, мысалы, глюкокортикоидты немесе сәулелік терапия, бүйрек функциясын алмастыру емі;',
        'иммунитеттің төмендеуімен немесе сарқылуымен бірге жүретін созылмалы аурулар болған кезде, мысалы, қант диабеті, жоғарыда айтылған АИТВ немесе пневмокониоздар;',
        'өкпеден тыс туберкулез түрлеріне күдік болған кезде.'
      ]
    },
    en: {
      title: 'Tuberculosis Diagnostics',
      description: 'The T-SPOT.TB test is a blood test, also known as the "interferon-gamma release assay" (IGRA), an immunological test for diagnosing infection with Mycobacterium tuberculosis.',
      advantagesTitle: 'ADVANTAGES OF T-SPOT.TB TEST',
      accuracy: 'Accuracy:',
      accuracyText: 'T-SPOT.TB is the only test for tuberculosis diagnosis with sensitivity and specificity exceeding 95% according to major clinical studies.',
      reliability: 'Reliability:',
      reliabilityText: 'T-SPOT.TB can detect those infected with Mycobacterium tuberculosis even among "problem" patient populations, including immigrants and immunocompromised patients, and has no cross-reactions with the BCG vaccine.',
      simplicity: 'Simplicity:',
      simplicityText: 'Testing with T-SPOT.TB requires only one visit to the doctor and one tube of blood. All stages of the test are controlled by the laboratory.',
      benefitsTitle: 'Benefits of T-SPOT.TB test',
      benefits: [
        'Sensitive even in patients with immunosuppression (HIV-infected)',
        'For all population groups (children, adolescents, adults, pregnant women)',
        'Detects infection regardless of its localization (lungs, bones, etc.)',
        'Has no contraindications or restrictions',
        'Test results are not affected by individual patient characteristics (allergies, somatic diseases, skin pathologies, medications, past BCG vaccination)',
        'Detects any form of tuberculosis (latent or active)',
        'Safety and absence of side effects',
        'Test of choice when there are contraindications to skin tests'
      ],
      casesTitle: 'PREFERRED USE CASES FOR T-SPOT:',
      cases: [
        'in children vaccinated with BCG who have a false-positive Mantoux reaction. In this case, it is valuable to perform this minimally invasive test before chest X-ray;',
        'in people with allergic and autoimmune diseases;',
        'in healthcare workers, people who travel frequently, military personnel, pregnant women;',
        'in prisoners or those released from prison; in drug addicts;',
        'in people in contact with tuberculosis patients;',
        'in patients undergoing immunosuppressive therapy, such as glucocorticoid or radiation therapy, renal replacement therapy;',
        'in the presence of chronic diseases accompanied by decreased or depleted immunity, such as diabetes mellitus, the already mentioned HIV, or pneumoconiosis;',
        'when extrapulmonary forms of tuberculosis are suspected.'
      ]
    }
  };

  // Oncogenetics Modal Translations
  const oncoModalTexts = {
    ru: {
      title: 'Онкогенетика',
      p1: 'Диагностическая лаборатория «Gammalab (ГаммаЛаб)» - это современная молекулярно-генетическая лаборатория - это объединение профессионалов, сплочённая команда, решающая ряд перспективных научно-практических задач, связанных с различными направлениями современных технологий в области диагностики заболеваний.',
      p2: 'Основной целью работы лаборатории является научно-исследовательская деятельность по перспективным направлениям в сфере лабораторной диагностики, а также внедрение новых решений, связанных с молекулярным профилированием опухоли, обеспечивая первую ступень персонифицированной медицины.',
      p3: 'Лаборатория оснащена самым современным оборудованием, позволяющим проводить исследования на уровне, соответствующим международным стандартам.',
      lungCancer: 'Рак легкого:',
      breastCancer: 'Рак молочной железы:',
      ovarianCancer: 'Рак яичников:',
      colorectalCancer: 'Колоректальный рак:',
      melanoma: 'Меланома:'
    },
    kz: {
      title: 'Онкогенетика',
      p1: '«Gammalab (ГаммаЛаб)» диагностикалық зертханасы – бұл заманауи молекулярлық-генетикалық зертхана – бұл аурулар диагностикасы саласындағы заманауи технологиялардың әртүрлі бағыттарына байланысты бірқатар перспективалық ғылыми-практикалық міндеттерді шешетін кәсіпқойлар бірлестігі, топтасқан команда.',
      p2: 'Зертхананың негізгі мақсаты – зертханалық диагностика саласындағы перспективалық бағыттар бойынша ғылыми-зерттеу қызметі, сондай-ақ дербес медицинаның бірінші сатысын қамтамасыз ете отырып, ісіктің молекулярлық профильдеуімен байланысты жаңа шешімдерді енгізу.',
      p3: 'Зертхана халықаралық стандарттарға сәйкес деңгейде зерттеулер жүргізуге мүмкіндік беретін ең заманауи жабдықтармен жабдықталған.',
      lungCancer: 'Өкпе обыры:',
      breastCancer: 'Сүт безі обыры:',
      ovarianCancer: 'Аналық без обыры:',
      colorectalCancer: 'Колоректальды обыр:',
      melanoma: 'Меланома:'
    },
    en: {
      title: 'Oncogenetics',
      p1: 'Diagnostic Laboratory "Gammalab" is a modern molecular genetic laboratory - a union of professionals, a cohesive team solving a number of promising scientific and practical tasks related to various areas of modern technologies in the field of disease diagnostics.',
      p2: 'The main goal of the laboratory is research activities in promising areas of laboratory diagnostics, as well as the implementation of new solutions related to molecular tumor profiling, providing the first step of personalized medicine.',
      p3: 'The laboratory is equipped with the most modern equipment, allowing research at a level that meets international standards.',
      lungCancer: 'Lung cancer:',
      breastCancer: 'Breast cancer:',
      ovarianCancer: 'Ovarian cancer:',
      colorectalCancer: 'Colorectal cancer:',
      melanoma: 'Melanoma:'
    }
  };

  const tbTexts = tbModalTexts[locale] || tbModalTexts.ru;
  const oncoTexts = oncoModalTexts[locale] || oncoModalTexts.ru;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU').format(price);
  };

  if (loading) {
    return <AnalysesPageSkeleton />;
  }

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

        {/* Search and Quick Access Buttons */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-6">
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

          {/* Quick Access Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowTuberculosisModal(true)}
              className="transition-opacity hover:opacity-90"
              style={{
                backgroundColor: '#EC910C',
                color: 'white',
                fontSize: '13px',
                fontWeight: '500',
                padding: '10px 18px',
                borderRadius: '25px',
                whiteSpace: 'nowrap'
              }}
            >
              {locale === 'kz' ? 'Туберкулез диагностикасы' : locale === 'en' ? 'Tuberculosis Diagnostics' : 'Диагностика туберкулеза'}
            </button>
            <button
              onClick={() => setShowOncogeneticsModal(true)}
              className="transition-opacity hover:opacity-90"
              style={{
                backgroundColor: '#EC910C',
                color: 'white',
                fontSize: '13px',
                fontWeight: '500',
                padding: '10px 18px',
                borderRadius: '25px',
                whiteSpace: 'nowrap'
              }}
            >
              {locale === 'kz' ? 'Онкогенетика' : locale === 'en' ? 'Oncogenetics' : 'Онкогенетика'}
            </button>
          </div>
        </div>
      </div>

      {/* Tuberculosis Modal */}
      {showTuberculosisModal && (
        <div
          onClick={() => setShowTuberculosisModal(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px',
            overflowY: 'auto'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '20px',
              maxWidth: '900px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              position: 'relative'
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowTuberculosisModal(false)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: '#f3f4f6',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10
              }}
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            {/* Modal Content */}
            <div style={{ padding: '40px' }}>
              {/* Header */}
              <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#091D33', marginBottom: '16px' }}>
                  {tbTexts.title}
                </h2>
                <p style={{ fontSize: '14px', lineHeight: '1.7', color: '#6B7280', maxWidth: '700px', margin: '0 auto' }}>
                  {tbTexts.description}
                </p>
              </div>

              {/* Advantages Section */}
              <div style={{ marginBottom: '30px' }}>
                <h3 style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#209DA7',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  marginBottom: '20px',
                  textAlign: 'center'
                }}>
                  {tbTexts.advantagesTitle}
                </h3>

                {/* Three Columns */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
                  <div style={{ backgroundColor: '#E0F2F4', borderRadius: '12px', padding: '20px' }}>
                    <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#209DA7', marginBottom: '12px' }}>{tbTexts.accuracy}</h4>
                    <p style={{ fontSize: '13px', lineHeight: '1.6', color: '#4B5563' }}>
                      {tbTexts.accuracyText}
                    </p>
                  </div>
                  <div style={{ backgroundColor: '#E0F2F4', borderRadius: '12px', padding: '20px' }}>
                    <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#209DA7', marginBottom: '12px' }}>{tbTexts.reliability}</h4>
                    <p style={{ fontSize: '13px', lineHeight: '1.6', color: '#4B5563' }}>
                      {tbTexts.reliabilityText}
                    </p>
                  </div>
                  <div style={{ backgroundColor: '#E0F2F4', borderRadius: '12px', padding: '20px' }}>
                    <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#209DA7', marginBottom: '12px' }}>{tbTexts.simplicity}</h4>
                    <p style={{ fontSize: '13px', lineHeight: '1.6', color: '#4B5563' }}>
                      {tbTexts.simplicityText}
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div style={{
                  borderTop: '2px solid #EC910C',
                  margin: '30px 0',
                  position: 'relative'
                }}>
                  <span style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: 'white',
                    padding: '0 16px',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: '#EC910C',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    whiteSpace: 'nowrap'
                  }}>
                    {tbTexts.benefitsTitle}
                  </span>
                </div>

                {/* Benefits Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
                  {tbTexts.benefits.map((item, idx) => (
                    <div key={idx} style={{ backgroundColor: '#E0F2F4', borderRadius: '10px', padding: '14px', fontSize: '12px', lineHeight: '1.5', color: '#4B5563' }}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Cases Section */}
              <div style={{ backgroundColor: '#FEF3C7', borderRadius: '12px', padding: '20px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#D97706', marginBottom: '14px' }}>
                  {tbTexts.casesTitle}
                </h3>
                <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13px', lineHeight: '1.8', color: '#4B5563' }}>
                  {tbTexts.cases.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Oncogenetics Modal */}
      {showOncogeneticsModal && (
        <div
          onClick={() => setShowOncogeneticsModal(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px',
            overflowY: 'auto'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '20px',
              maxWidth: '900px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              position: 'relative'
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowOncogeneticsModal(false)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: '#f3f4f6',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10
              }}
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            {/* Modal Content */}
            <div style={{ padding: '40px' }}>
              {/* Header */}
              <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#091D33', marginBottom: '20px' }}>
                  {oncoTexts.title}
                </h2>
                <p style={{ fontSize: '14px', lineHeight: '1.7', color: '#6B7280', marginBottom: '12px' }}>
                  {oncoTexts.p1}
                </p>
                <p style={{ fontSize: '14px', lineHeight: '1.7', color: '#6B7280', marginBottom: '12px' }}>
                  {oncoTexts.p2}
                </p>
                <p style={{ fontSize: '14px', lineHeight: '1.7', color: '#6B7280' }}>
                  {oncoTexts.p3}
                </p>
              </div>

              {/* Cancer Types Table */}
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                  <tbody>
                    {/* Рак легкого */}
                    <tr>
                      <td style={{
                        padding: '12px 16px',
                        backgroundColor: '#209DA7',
                        color: 'white',
                        fontWeight: '500',
                        borderRadius: '8px 0 0 8px',
                        width: '160px'
                      }}>
                        {oncoTexts.lungCancer}
                      </td>
                      <td style={{ padding: '8px', backgroundColor: '#f8f9fa' }}>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          {['EGFR (T790M)', 'KRAS NRAS', 'ALK', 'ROS1', 'PD-L1', 'BRAF'].map((marker, idx) => (
                            <span key={idx} style={{
                              backgroundColor: '#E0F2F4',
                              color: '#209DA7',
                              padding: '6px 12px',
                              borderRadius: '20px',
                              fontSize: '12px',
                              fontWeight: '500'
                            }}>
                              {marker}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                    {/* Spacer */}
                    <tr><td colSpan={2} style={{ height: '8px' }}></td></tr>
                    {/* Рак молочной железы */}
                    <tr>
                      <td style={{
                        padding: '12px 16px',
                        backgroundColor: '#209DA7',
                        color: 'white',
                        fontWeight: '500',
                        borderRadius: '8px 0 0 8px',
                        width: '160px'
                      }}>
                        {oncoTexts.breastCancer}
                      </td>
                      <td style={{ padding: '8px', backgroundColor: '#f8f9fa' }}>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          {['BRCA1/2', 'PD-L1', 'HER2/neu', 'PIK3CA'].map((marker, idx) => (
                            <span key={idx} style={{
                              backgroundColor: '#E0F2F4',
                              color: '#209DA7',
                              padding: '6px 12px',
                              borderRadius: '20px',
                              fontSize: '12px',
                              fontWeight: '500'
                            }}>
                              {marker}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                    {/* Spacer */}
                    <tr><td colSpan={2} style={{ height: '8px' }}></td></tr>
                    {/* Рак яичников */}
                    <tr>
                      <td style={{
                        padding: '12px 16px',
                        backgroundColor: '#209DA7',
                        color: 'white',
                        fontWeight: '500',
                        borderRadius: '8px 0 0 8px',
                        width: '160px'
                      }}>
                        {oncoTexts.ovarianCancer}
                      </td>
                      <td style={{ padding: '8px', backgroundColor: '#f8f9fa' }}>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          {['BRCA1/2'].map((marker, idx) => (
                            <span key={idx} style={{
                              backgroundColor: '#E0F2F4',
                              color: '#209DA7',
                              padding: '6px 12px',
                              borderRadius: '20px',
                              fontSize: '12px',
                              fontWeight: '500'
                            }}>
                              {marker}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                    {/* Spacer */}
                    <tr><td colSpan={2} style={{ height: '8px' }}></td></tr>
                    {/* Колоректальный рак */}
                    <tr>
                      <td style={{
                        padding: '12px 16px',
                        backgroundColor: '#209DA7',
                        color: 'white',
                        fontWeight: '500',
                        borderRadius: '8px 0 0 8px',
                        width: '160px'
                      }}>
                        {oncoTexts.colorectalCancer}
                      </td>
                      <td style={{ padding: '8px', backgroundColor: '#f8f9fa' }}>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          {['KRAS, NRAS', 'BRAF'].map((marker, idx) => (
                            <span key={idx} style={{
                              backgroundColor: '#E0F2F4',
                              color: '#209DA7',
                              padding: '6px 12px',
                              borderRadius: '20px',
                              fontSize: '12px',
                              fontWeight: '500'
                            }}>
                              {marker}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                    {/* Spacer */}
                    <tr><td colSpan={2} style={{ height: '8px' }}></td></tr>
                    {/* Меланома */}
                    <tr>
                      <td style={{
                        padding: '12px 16px',
                        backgroundColor: '#209DA7',
                        color: 'white',
                        fontWeight: '500',
                        borderRadius: '8px 0 0 8px',
                        width: '160px'
                      }}>
                        {oncoTexts.melanoma}
                      </td>
                      <td style={{ padding: '8px', backgroundColor: '#f8f9fa' }}>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          {['BRAF', 'KRAS, NRAS'].map((marker, idx) => (
                            <span key={idx} style={{
                              backgroundColor: '#E0F2F4',
                              color: '#209DA7',
                              padding: '6px 12px',
                              borderRadius: '20px',
                              fontSize: '12px',
                              fontWeight: '500'
                            }}>
                              {marker}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

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
