'use client';

import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { FlaskConical, Microscope, Shield, Clock, CheckCircle, FileText, Beaker } from 'lucide-react';

type Locale = 'ru' | 'kz' | 'en';

const translations = {
  ru: {
    home: 'Главная',
    title: 'Врачам',
    subtitle: 'Информация для специалистов',

    // About section
    aboutTitle: 'О лаборатории GammaLab',
    aboutText: 'Диагностическая лаборатория «GammaLab» (ГаммаЛаб) — это современная молекулярно-генетическая лаборатория, объединение профессионалов, сплочённая команда, решающая ряд перспективных научно-практических задач, связанных с различными направлениями современных технологий в области диагностики заболеваний.',

    // Advantages
    advantagesTitle: 'Преимущества лаборатории',
    adv1Title: 'Современное оборудование',
    adv1Desc: 'Лаборатория оснащена новейшим оборудованием, позволяющим проводить исследования на уровне международных стандартов',
    adv2Title: 'Квалифицированный персонал',
    adv2Desc: 'Специалисты лаборатории — авторы публикаций в казахстанских и зарубежных научных журналах',
    adv3Title: 'Высокое качество',
    adv3Desc: 'Многоуровневая система контроля качества обеспечивает достоверность результатов',
    adv4Title: 'Комплексный подход',
    adv4Desc: 'Полный цикл диагностики от забора материала до выдачи результатов',

    // Directions
    directionsTitle: 'Направления исследований',
    oncoTitle: 'Онкогенетика',
    oncoDesc: 'Молекулярно-генетические исследования для выявления мутаций в генах и подбора таргетной терапии',
    tspotTitle: 'Диагностика туберкулеза',
    tspotDesc: 'Тест T-SPOT.TB — современный иммунологический метод диагностики туберкулезной инфекции',

    // Oncogenetics section
    oncoSectionTitle: 'Онкогенетика',
    oncoSectionDesc: 'Лаборатория «GammaLab» предлагает различные виды исследований для выявления мутаций в генах',

    // Cancer types table
    cancerType: 'Тип рака',
    mutations: 'Исследуемые мутации',
    lungCancer: 'Рак легкого',
    breastCancer: 'Рак молочной железы',
    ovarianCancer: 'Рак яичников',
    colorectalCancer: 'Колоректальный рак',
    melanomaCancer: 'Меланома',

    // Materials
    materialsTitle: 'Материалы для исследования',
    material1: 'Парафиновый блок опухолевой ткани, фиксированной формалином',
    material2: 'Плазма крови',
    material3: 'Стекло-оттпечаток (для ИГХ)',

    // Deadlines
    deadlinesTitle: 'Сроки выполнения',
    deadline1: '5-7 рабочих дней — ПЦР исследования',
    deadline2: '5-14 рабочих дней — ИГХ исследования',
    deadline3: 'до 14 рабочих дней — Жидкостная биопсия',

    // T-SPOT section
    tspotSectionTitle: 'Диагностика туберкулеза методом T-SPOT.TB',
    tspotSectionDesc: 'T-SPOT.TB — это анализ крови, также известный как «тест высвобождения гамма-интерферона» (IGRA), иммунологический тест для диагностики инфицирования микобактериями туберкулеза.',

    // T-SPOT advantages
    tspotAdvTitle: 'Преимущества теста T-SPOT.TB',
    tspotAdv1: 'Чувствительность теста — 98,8%',
    tspotAdv2: 'Специфичность теста свыше 99%',
    tspotAdv3: 'Не зависит от вакцинации БЦЖ',
    tspotAdv4: 'Превосходит по клинической эффективности туберкулиновую кожную пробу (ТКП)',
    tspotAdv5: 'Требуется только один визит пациента',
    tspotAdv6: 'Подходит для всех групп населения (дети, взрослые, беременные)',
    tspotAdv7: 'Определяет инфекцию вне зависимости от локализации',
    tspotAdv8: 'Не имеет противопоказаний и ограничений',

    // T-SPOT indications
    tspotIndicTitle: 'Показания к применению T-SPOT.TB',
    tspotIndic1: 'Дети, привитые БЦЖ, с ложноположительной реакцией Манту',
    tspotIndic2: 'Лица с аллергическими и аутоиммунными заболеваниями',
    tspotIndic3: 'Медицинские работники, военные, беременные',
    tspotIndic4: 'Лица, контактирующие с туберкулезными больными',
    tspotIndic5: 'Пациенты на иммуносупрессивной терапии',
    tspotIndic6: 'Пациенты с хроническими заболеваниями (диабет, ВИЧ)',
    tspotIndic7: 'Подозрение на внелегочные формы туберкулеза',

    // Requirements
    requirementsTitle: 'Требования к отправляемому материалу',
    reqGeneral: 'Общие требования',
    req1: 'Образцы биологического материала должны быть промаркированы врачом',
    req2: 'Маркировка должна быть водостойкой и стойкой к истиранию',
    req3: 'Номер гистологического блока должен совпадать с номером на стекле-оттпечатке',

    reqHistoTitle: 'Гистологический материал',
    reqHisto1: 'Материал — парафиновый гистологический блок (фиксированный в формалине)',
    reqHisto2: 'Температура плавления парафина не должна превышать 60°C',
    reqHisto3: 'Материал должен фиксироваться в 10%-ном нейтральном забуференном формалине',
    reqHisto4: 'Фиксация материала должна быть начата не более чем через 1 час после взятия ткани',
    reqHisto5: 'Содержание опухолевых клеток в препарате должно быть не менее 20%',

    // Contact
    contactTitle: 'Контакты для сотрудничества',
    contactDesc: 'Для получения дополнительной информации или оформления сотрудничества свяжитесь с нами',

    learnMore: 'Подробнее',
    downloadPdf: 'Скачать PDF',
  },
  kz: {
    home: 'Басты бет',
    title: 'Дәрігерлерге',
    subtitle: 'Мамандарға арналған ақпарат',

    aboutTitle: 'GammaLab зертханасы туралы',
    aboutText: '«GammaLab» (ГаммаЛаб) диагностикалық зертханасы — бұл заманауи молекулярлық-генетикалық зертхана, аурулардың диагностикасы саласындағы заманауи технологиялардың әртүрлі бағыттарымен байланысты бірқатар перспективалық ғылыми-практикалық міндеттерді шешетін кәсіпқойлар бірлестігі.',

    advantagesTitle: 'Зертхананың артықшылықтары',
    adv1Title: 'Заманауи жабдық',
    adv1Desc: 'Зертхана халықаралық стандарттар деңгейінде зерттеулер жүргізуге мүмкіндік беретін жаңа жабдықтармен жабдықталған',
    adv2Title: 'Білікті персонал',
    adv2Desc: 'Зертхана мамандары — қазақстандық және шетелдік ғылыми журналдардағы жарияланымдардың авторлары',
    adv3Title: 'Жоғары сапа',
    adv3Desc: 'Көп деңгейлі сапаны бақылау жүйесі нәтижелердің дұрыстығын қамтамасыз етеді',
    adv4Title: 'Кешенді тәсіл',
    adv4Desc: 'Материал алудан нәтижелерді беруге дейінгі толық диагностика циклі',

    directionsTitle: 'Зерттеу бағыттары',
    oncoTitle: 'Онкогенетика',
    oncoDesc: 'Гендердегі мутацияларды анықтау және таргетті терапияны таңдау үшін молекулярлық-генетикалық зерттеулер',
    tspotTitle: 'Туберкулезді диагностикалау',
    tspotDesc: 'T-SPOT.TB тесті — туберкулез инфекциясын диагностикалаудың заманауи иммунологиялық әдісі',

    oncoSectionTitle: 'Онкогенетика',
    oncoSectionDesc: '«GammaLab» зертханасы гендердегі мутацияларды анықтау үшін әртүрлі зерттеулер ұсынады',

    cancerType: 'Рак түрі',
    mutations: 'Зерттелетін мутациялар',
    lungCancer: 'Өкпе рагі',
    breastCancer: 'Сүт безі рагі',
    ovarianCancer: 'Аналық без рагі',
    colorectalCancer: 'Колоректальды рак',
    melanomaCancer: 'Меланома',

    materialsTitle: 'Зерттеуге арналған материалдар',
    material1: 'Формалинмен бекітілген ісік тінінің парафин блогы',
    material2: 'Қан плазмасы',
    material3: 'Шыны-бедер (ИГХ үшін)',

    deadlinesTitle: 'Орындау мерзімдері',
    deadline1: '5-7 жұмыс күні — ПТР зерттеулері',
    deadline2: '5-14 жұмыс күні — ИГХ зерттеулері',
    deadline3: '14 жұмыс күніне дейін — Сұйық биопсия',

    tspotSectionTitle: 'T-SPOT.TB әдісімен туберкулезді диагностикалау',
    tspotSectionDesc: 'T-SPOT.TB — бұл «гамма-интерферон босату тесті» (IGRA) деп те белгілі қан анализі, микобактериялармен туберкулез инфекциясын диагностикалауға арналған иммунологиялық тест.',

    tspotAdvTitle: 'T-SPOT.TB тестінің артықшылықтары',
    tspotAdv1: 'Тест сезімталдығы — 98,8%',
    tspotAdv2: 'Тест спецификалығы 99%-дан жоғары',
    tspotAdv3: 'БЦЖ вакцинациясына тәуелді емес',
    tspotAdv4: 'Туберкулинді тері сынамасынан (ТТС) клиникалық тиімділігі жоғары',
    tspotAdv5: 'Пациенттің тек бір рет келуі қажет',
    tspotAdv6: 'Барлық топтарға жарамды (балалар, ересектер, жүкті әйелдер)',
    tspotAdv7: 'Инфекцияны локализациясына қарамастан анықтайды',
    tspotAdv8: 'Қарсы көрсетулері мен шектеулері жоқ',

    tspotIndicTitle: 'T-SPOT.TB қолдану көрсеткіштері',
    tspotIndic1: 'БЦЖ егілген, Манту жалған оң реакциясы бар балалар',
    tspotIndic2: 'Аллергиялық және аутоиммундық аурулары бар адамдар',
    tspotIndic3: 'Медицина қызметкерлері, әскерилер, жүкті әйелдер',
    tspotIndic4: 'Туберкулезбен ауыратын науқастармен байланысатын адамдар',
    tspotIndic5: 'Иммуносупрессивті терапиядағы пациенттер',
    tspotIndic6: 'Созылмалы аурулары бар пациенттер (диабет, АИТВ)',
    tspotIndic7: 'Өкпеден тыс туберкулез формаларына күдік',

    requirementsTitle: 'Жіберілетін материалға қойылатын талаптар',
    reqGeneral: 'Жалпы талаптар',
    req1: 'Биологиялық материал үлгілері дәрігермен таңбалануы керек',
    req2: 'Таңбалау суға төзімді және тозуға төзімді болуы керек',
    req3: 'Гистологиялық блок нөмірі шыны-бедердегі нөмірмен сәйкес келуі керек',

    reqHistoTitle: 'Гистологиялық материал',
    reqHisto1: 'Материал — парафинді гистологиялық блок (формалинде бекітілген)',
    reqHisto2: 'Парафиннің балқу температурасы 60°C-тан аспауы керек',
    reqHisto3: 'Материал 10%-дық бейтарап буферленген формалинде бекітілуі керек',
    reqHisto4: 'Материалды бекіту тінді алғаннан кейін 1 сағаттан кешіктірмей басталуы керек',
    reqHisto5: 'Препараттағы ісік жасушаларының мөлшері кемінде 20% болуы керек',

    contactTitle: 'Ынтымақтастық үшін байланыстар',
    contactDesc: 'Қосымша ақпарат алу немесе ынтымақтастықты рәсімдеу үшін бізбен байланысыңыз',

    learnMore: 'Толығырақ',
    downloadPdf: 'PDF жүктеу',
  },
  en: {
    home: 'Home',
    title: 'For Doctors',
    subtitle: 'Information for specialists',

    aboutTitle: 'About GammaLab Laboratory',
    aboutText: 'Diagnostic Laboratory "GammaLab" is a modern molecular genetic laboratory, an association of professionals, a cohesive team solving a number of promising scientific and practical tasks related to various areas of modern technologies in the field of disease diagnostics.',

    advantagesTitle: 'Laboratory advantages',
    adv1Title: 'Modern equipment',
    adv1Desc: 'The laboratory is equipped with the latest equipment that allows research at international standards level',
    adv2Title: 'Qualified personnel',
    adv2Desc: 'Laboratory specialists are authors of publications in Kazakhstani and foreign scientific journals',
    adv3Title: 'High quality',
    adv3Desc: 'Multi-level quality control system ensures the reliability of results',
    adv4Title: 'Comprehensive approach',
    adv4Desc: 'Full diagnostic cycle from material collection to results delivery',

    directionsTitle: 'Research directions',
    oncoTitle: 'Oncogenetics',
    oncoDesc: 'Molecular genetic studies for detecting gene mutations and selecting targeted therapy',
    tspotTitle: 'Tuberculosis diagnostics',
    tspotDesc: 'T-SPOT.TB test — modern immunological method for tuberculosis infection diagnosis',

    oncoSectionTitle: 'Oncogenetics',
    oncoSectionDesc: 'GammaLab laboratory offers various types of research for detecting gene mutations',

    cancerType: 'Cancer type',
    mutations: 'Studied mutations',
    lungCancer: 'Lung cancer',
    breastCancer: 'Breast cancer',
    ovarianCancer: 'Ovarian cancer',
    colorectalCancer: 'Colorectal cancer',
    melanomaCancer: 'Melanoma',

    materialsTitle: 'Materials for research',
    material1: 'Formalin-fixed paraffin-embedded tumor tissue block',
    material2: 'Blood plasma',
    material3: 'Glass slide (for IHC)',

    deadlinesTitle: 'Execution deadlines',
    deadline1: '5-7 working days — PCR studies',
    deadline2: '5-14 working days — IHC studies',
    deadline3: 'up to 14 working days — Liquid biopsy',

    tspotSectionTitle: 'Tuberculosis diagnosis by T-SPOT.TB method',
    tspotSectionDesc: 'T-SPOT.TB is a blood test, also known as "interferon-gamma release assay" (IGRA), an immunological test for diagnosing mycobacterium tuberculosis infection.',

    tspotAdvTitle: 'Advantages of T-SPOT.TB test',
    tspotAdv1: 'Test sensitivity — 98.8%',
    tspotAdv2: 'Test specificity over 99%',
    tspotAdv3: 'Independent of BCG vaccination',
    tspotAdv4: 'Superior clinical effectiveness compared to tuberculin skin test (TST)',
    tspotAdv5: 'Only one patient visit required',
    tspotAdv6: 'Suitable for all population groups (children, adults, pregnant women)',
    tspotAdv7: 'Detects infection regardless of localization',
    tspotAdv8: 'No contraindications or limitations',

    tspotIndicTitle: 'Indications for T-SPOT.TB',
    tspotIndic1: 'BCG-vaccinated children with false-positive Mantoux reaction',
    tspotIndic2: 'People with allergic and autoimmune diseases',
    tspotIndic3: 'Healthcare workers, military personnel, pregnant women',
    tspotIndic4: 'People in contact with tuberculosis patients',
    tspotIndic5: 'Patients on immunosuppressive therapy',
    tspotIndic6: 'Patients with chronic diseases (diabetes, HIV)',
    tspotIndic7: 'Suspected extrapulmonary tuberculosis',

    requirementsTitle: 'Requirements for submitted material',
    reqGeneral: 'General requirements',
    req1: 'Biological material samples must be labeled by a doctor',
    req2: 'Labeling must be waterproof and abrasion resistant',
    req3: 'Histological block number must match the number on the glass slide',

    reqHistoTitle: 'Histological material',
    reqHisto1: 'Material — paraffin histological block (formalin-fixed)',
    reqHisto2: 'Paraffin melting temperature should not exceed 60°C',
    reqHisto3: 'Material must be fixed in 10% neutral buffered formalin',
    reqHisto4: 'Material fixation must begin no later than 1 hour after tissue collection',
    reqHisto5: 'Tumor cell content in the preparation must be at least 20%',

    contactTitle: 'Contacts for cooperation',
    contactDesc: 'For additional information or cooperation arrangements, please contact us',

    learnMore: 'Learn more',
    downloadPdf: 'Download PDF',
  },
};

const cancerData = [
  { type: 'lungCancer', mutations: ['EGFR (T790M)', 'KRAS', 'NRAS', 'ALK', 'ROS1', 'PD-L1', 'BRAF'] },
  { type: 'breastCancer', mutations: ['BRCA1/2', 'PD-L1', 'HER2/neu', 'PIK3CA'] },
  { type: 'ovarianCancer', mutations: ['BRCA1/2'] },
  { type: 'colorectalCancer', mutations: ['KRAS', 'NRAS', 'BRAF'] },
  { type: 'melanomaCancer', mutations: ['BRAF', 'KRAS', 'NRAS'] },
];

export default function DoctorsPage() {
  const locale = useLocale() as Locale;
  const t = translations[locale] || translations.ru;

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
              {t.home}
            </Link>
            <span className="text-[13px]" style={{ color: '#9CA3AF' }}>/</span>
            <span className="text-[13px]" style={{ color: '#209DA7' }}>
              {t.title}
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-[28px] sm:text-[36px] lg:text-[42px] font-semibold mb-3"
            style={{ color: '#091D33' }}
          >
            {t.title}
          </h1>
          <p className="text-[16px] lg:text-[18px]" style={{ color: '#6B7280' }}>
            {t.subtitle}
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-white py-12 lg:py-16">
        <div className="container-main">
          <h2
            className="text-[24px] sm:text-[28px] lg:text-[32px] font-semibold mb-6"
            style={{ color: '#091D33' }}
          >
            {t.aboutTitle}
          </h2>
          <p
            className="text-[15px] lg:text-[16px] leading-[1.8] max-w-[900px]"
            style={{ color: '#4B5563' }}
          >
            {t.aboutText}
          </p>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-12 lg:py-16" style={{ backgroundColor: '#F9FAFB' }}>
        <div className="container-main">
          <h2
            className="text-[24px] sm:text-[28px] lg:text-[32px] font-semibold mb-8"
            style={{ color: '#091D33' }}
          >
            {t.advantagesTitle}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Microscope, title: t.adv1Title, desc: t.adv1Desc },
              { icon: Shield, title: t.adv2Title, desc: t.adv2Desc },
              { icon: CheckCircle, title: t.adv3Title, desc: t.adv3Desc },
              { icon: FlaskConical, title: t.adv4Title, desc: t.adv4Desc },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm"
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: '#EEF6F6' }}
                >
                  <item.icon size={24} style={{ color: '#209DA7' }} />
                </div>
                <h3
                  className="text-[16px] font-semibold mb-2"
                  style={{ color: '#091D33' }}
                >
                  {item.title}
                </h3>
                <p className="text-[14px] leading-[1.6]" style={{ color: '#6B7280' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Directions Section */}
      <section className="bg-white py-12 lg:py-16">
        <div className="container-main">
          <h2
            className="text-[24px] sm:text-[28px] lg:text-[32px] font-semibold mb-8"
            style={{ color: '#091D33' }}
          >
            {t.directionsTitle}
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Oncogenetics Card */}
            <div
              className="rounded-xl p-6 lg:p-8"
              style={{ backgroundColor: '#FFF7ED', border: '1px solid #FDBA74' }}
            >
              <div
                className="w-14 h-14 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: '#F97316' }}
              >
                <FlaskConical size={28} style={{ color: 'white' }} />
              </div>
              <h3
                className="text-[20px] lg:text-[22px] font-semibold mb-3"
                style={{ color: '#091D33' }}
              >
                {t.oncoTitle}
              </h3>
              <p className="text-[15px] leading-[1.7]" style={{ color: '#4B5563' }}>
                {t.oncoDesc}
              </p>
            </div>

            {/* T-SPOT Card */}
            <div
              className="rounded-xl p-6 lg:p-8"
              style={{ backgroundColor: '#EEF6F6', border: '1px solid #209DA7' }}
            >
              <div
                className="w-14 h-14 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: '#209DA7' }}
              >
                <Beaker size={28} style={{ color: 'white' }} />
              </div>
              <h3
                className="text-[20px] lg:text-[22px] font-semibold mb-3"
                style={{ color: '#091D33' }}
              >
                {t.tspotTitle}
              </h3>
              <p className="text-[15px] leading-[1.7]" style={{ color: '#4B5563' }}>
                {t.tspotDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Oncogenetics Section */}
      <section id="oncogenetics" className="py-12 lg:py-16" style={{ backgroundColor: '#FFF7ED' }}>
        <div className="container-main">
          <h2
            className="text-[24px] sm:text-[28px] lg:text-[32px] font-semibold mb-4"
            style={{ color: '#091D33' }}
          >
            {t.oncoSectionTitle}
          </h2>
          <p className="text-[15px] lg:text-[16px] mb-8" style={{ color: '#4B5563' }}>
            {t.oncoSectionDesc}
          </p>

          {/* Cancer Types Table */}
          <div className="bg-white rounded-xl overflow-hidden shadow-sm mb-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ backgroundColor: '#F97316' }}>
                    <th className="text-left px-6 py-4 text-white font-semibold text-[14px]">
                      {t.cancerType}
                    </th>
                    <th className="text-left px-6 py-4 text-white font-semibold text-[14px]">
                      {t.mutations}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cancerData.map((item, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                      style={{ verticalAlign: 'top' }}
                    >
                      <td
                        className="px-6 py-4 text-[14px] font-medium"
                        style={{ color: '#091D33' }}
                      >
                        {t[item.type as keyof typeof t]}
                      </td>
                      <td
                        className="px-6 py-4 text-[14px]"
                        style={{ color: '#4B5563' }}
                      >
                        <div className="flex flex-col gap-1">
                          {item.mutations.map((mutation, idx) => (
                            <span key={idx}>{mutation}</span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Materials and Deadlines */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Materials */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <FileText size={24} style={{ color: '#F97316' }} />
                <h3
                  className="text-[18px] font-semibold"
                  style={{ color: '#091D33' }}
                >
                  {t.materialsTitle}
                </h3>
              </div>
              <ul className="space-y-3">
                {[t.material1, t.material2, t.material3].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle size={18} className="mt-0.5 flex-shrink-0" style={{ color: '#F97316' }} />
                    <span className="text-[14px]" style={{ color: '#4B5563' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Deadlines */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Clock size={24} style={{ color: '#F97316' }} />
                <h3
                  className="text-[18px] font-semibold"
                  style={{ color: '#091D33' }}
                >
                  {t.deadlinesTitle}
                </h3>
              </div>
              <ul className="space-y-3">
                {[t.deadline1, t.deadline2, t.deadline3].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle size={18} className="mt-0.5 flex-shrink-0" style={{ color: '#F97316' }} />
                    <span className="text-[14px]" style={{ color: '#4B5563' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* T-SPOT Section */}
      <section id="tspot" className="py-12 lg:py-16" style={{ backgroundColor: '#EEF6F6' }}>
        <div className="container-main">
          <h2
            className="text-[24px] sm:text-[28px] lg:text-[32px] font-semibold mb-4"
            style={{ color: '#091D33' }}
          >
            {t.tspotSectionTitle}
          </h2>
          <p className="text-[15px] lg:text-[16px] mb-8 max-w-[900px]" style={{ color: '#4B5563' }}>
            {t.tspotSectionDesc}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Advantages */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3
                className="text-[18px] font-semibold mb-4"
                style={{ color: '#091D33' }}
              >
                {t.tspotAdvTitle}
              </h3>
              <ul className="space-y-3">
                {[
                  t.tspotAdv1, t.tspotAdv2, t.tspotAdv3, t.tspotAdv4,
                  t.tspotAdv5, t.tspotAdv6, t.tspotAdv7, t.tspotAdv8
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle size={18} className="mt-0.5 flex-shrink-0" style={{ color: '#209DA7' }} />
                    <span className="text-[14px]" style={{ color: '#4B5563' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Indications */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3
                className="text-[18px] font-semibold mb-4"
                style={{ color: '#091D33' }}
              >
                {t.tspotIndicTitle}
              </h3>
              <ul className="space-y-3">
                {[
                  t.tspotIndic1, t.tspotIndic2, t.tspotIndic3, t.tspotIndic4,
                  t.tspotIndic5, t.tspotIndic6, t.tspotIndic7
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle size={18} className="mt-0.5 flex-shrink-0" style={{ color: '#209DA7' }} />
                    <span className="text-[14px]" style={{ color: '#4B5563' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="bg-white py-12 lg:py-16">
        <div className="container-main">
          <h2
            className="text-[24px] sm:text-[28px] lg:text-[32px] font-semibold mb-8"
            style={{ color: '#091D33' }}
          >
            {t.requirementsTitle}
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* General Requirements */}
            <div
              className="rounded-xl p-6"
              style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB' }}
            >
              <h3
                className="text-[18px] font-semibold mb-4"
                style={{ color: '#091D33' }}
              >
                {t.reqGeneral}
              </h3>
              <ul className="space-y-3">
                {[t.req1, t.req2, t.req3].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle size={18} className="mt-0.5 flex-shrink-0" style={{ color: '#209DA7' }} />
                    <span className="text-[14px]" style={{ color: '#4B5563' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Histological Requirements */}
            <div
              className="rounded-xl p-6"
              style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB' }}
            >
              <h3
                className="text-[18px] font-semibold mb-4"
                style={{ color: '#091D33' }}
              >
                {t.reqHistoTitle}
              </h3>
              <ul className="space-y-3">
                {[t.reqHisto1, t.reqHisto2, t.reqHisto3, t.reqHisto4, t.reqHisto5].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle size={18} className="mt-0.5 flex-shrink-0" style={{ color: '#209DA7' }} />
                    <span className="text-[14px]" style={{ color: '#4B5563' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 lg:py-16" style={{ backgroundColor: '#091D33' }}>
        <div className="container-main text-center">
          <h2
            className="text-[24px] sm:text-[28px] lg:text-[32px] font-semibold mb-4 text-white"
          >
            {t.contactTitle}
          </h2>
          <p className="text-[15px] lg:text-[16px] mb-8 text-gray-300 max-w-[600px] mx-auto">
            {t.contactDesc}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:+77051000333"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-[15px] font-medium transition-colors"
              style={{ backgroundColor: '#209DA7', color: 'white' }}
            >
              +7 (705) 1000-333
            </a>
            <a
              href="mailto:info@gammalab.kz"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-[15px] font-medium transition-colors border border-white/30 text-white hover:bg-white/10"
            >
              info@gammalab.kz
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
