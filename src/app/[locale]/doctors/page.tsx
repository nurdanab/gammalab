'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import {
  User,
  Phone,
  Briefcase,
  MapPin,
  ChevronDown,
  CheckCircle2,
  Target,
  Zap,
  Shield,
  Users,
} from 'lucide-react';

type Locale = 'ru' | 'kz' | 'en';

const STORAGE_KEY = 'gammalab_doctor_registered';

// =============================================
// TRANSLATIONS
// =============================================

const heroTranslations = {
  ru: { home: 'Главная', title: 'Врачам', subtitle: 'Информация для специалистов' },
  kz: { home: 'Басты бет', title: 'Дәрігерлерге', subtitle: 'Мамандарға арналған ақпарат' },
  en: { home: 'Home', title: 'For Doctors', subtitle: 'Information for specialists' },
};

const formTranslations = {
  ru: {
    formTitle: 'Заполните анкету',
    formSubtitle: 'Для доступа к материалам, пожалуйста, заполните форму',
    fullName: 'ФИО',
    fullNamePlaceholder: 'ФИО',
    phone: 'Номер телефона',
    phonePlaceholder: '+7 (___) ___-__-__',
    workplace: 'Место работы',
    workplacePlaceholder: 'Название медицинского учреждения',
    profession: 'Профессия',
    professionPlaceholder: 'Выберите профессию',
    professions: ['Врач', 'Медсестра', 'Фельдшер', 'Фармацевт', 'Лаборант', 'Другое'],
    submit: 'Получить доступ',
    sending: 'Отправка...',
    error: 'Произошла ошибка. Попробуйте ещё раз.',
    required: 'Обязательное поле',
  },
  kz: {
    formTitle: 'Сауалнаманы толтырыңыз',
    formSubtitle: 'Материалдарға қол жеткізу үшін форманы толтырыңыз',
    fullName: 'Аты-жөні',
    fullNamePlaceholder: 'ФИО',
    phone: 'Телефон нөмірі',
    phonePlaceholder: '+7 (___) ___-__-__',
    workplace: 'Жұмыс орны',
    workplacePlaceholder: 'Медициналық мекеменің атауы',
    profession: 'Мамандық',
    professionPlaceholder: 'Мамандықты таңдаңыз',
    professions: ['Дәрігер', 'Медбике', 'Фельдшер', 'Фармацевт', 'Лаборант', 'Басқа'],
    submit: 'Қол жеткізу',
    sending: 'Жіберілуде...',
    error: 'Қате орын алды. Қайталап көріңіз.',
    required: 'Міндетті өріс',
  },
  en: {
    formTitle: 'Fill out the form',
    formSubtitle: 'To access the materials, please fill out the form',
    fullName: 'Full name',
    fullNamePlaceholder: 'John Smith',
    phone: 'Phone number',
    phonePlaceholder: '+7 (___) ___-__-__',
    workplace: 'Workplace',
    workplacePlaceholder: 'Name of medical institution',
    profession: 'Profession',
    professionPlaceholder: 'Select profession',
    professions: ['Doctor', 'Nurse', 'Paramedic', 'Pharmacist', 'Lab technician', 'Other'],
    submit: 'Get access',
    sending: 'Sending...',
    error: 'An error occurred. Please try again.',
    required: 'Required field',
  },
};

const contentTranslations = {
  ru: {
    // Hero features
    feat1: 'Современное оборудование',
    feat2: 'Квалифицированный персонал',
    feat3: 'Высокое качество',
    feat4: 'Комплексный подход',
    // About
    aboutTitle: 'О КОМПАНИИ',
    aboutText: 'Диагностическая лаборатория «GammaLab (ГаммаЛаб)» — это современная молекулярно-генетическая лаборатория — объединение профессионалов, сплочённая команда, решающая ряд перспективных научно-практических задач, связанных с различными направлениями современных технологий в области диагностики заболеваний.',
    directionsTitle: 'Направления',
    dir1: 'Онкогенетика',
    dir2: 'Диагностика туберкулеза метод T-SPOT',
    dir3: 'Нутригенетика',
    // Goal
    goalTitle: 'Цель GL | ONCO',
    goalText: 'Основная цель диагностической лаборатории «GammaLab» является деятельность по перспективным направлениям в сфере лабораторной диагностики, а также внедрение новых решений, связанные с исследованием мутаций в опухолевой ткани для подбора таргетной терапии.',
    therapy1: 'Иммуно\nтерапия',
    therapy2: 'Химио\nтерапия',
    therapy3: 'Таргетная\nтерапия',
    therapy4: 'Лучевая терапия /\nрадиочастотная абляция',
    therapy5: 'Хирургическая\nоперация',
    // Process
    processTitle: 'Процесс GL | ONCO',
    step1: 'Прием и стабилизация образцов',
    step1d1: 'Ручные и автоматизированные решения',
    step1d2: 'Нано-спектрофотометрия',
    step1d3: 'Условия для заморозки на 80С',
    step2: 'Выделение нуклеиновых кислот',
    step2d1: 'Ручные и автоматизированные решения',
    step2d2: 'Нано-спектрофотометрия',
    step2d3: 'Условия для заморозки на 80С',
    step3: 'Поиск мутаций',
    step3d1: 'Прибор Rotor-Gene Q 5plex HRM',
    step3d2: 'Циклы оценки образца для проверки качества ДНК',
    step3d3: 'Циклы для детекции мутации',
    step4: 'Анализ и интерпретация',
    step4d1: 'Программное обеспечение Rotor-Gene Q 5plex HRM',
    processNote: 'Нам доверяют крупнейшие государственные учреждения здравоохранения и частные медицинские центры.',
    processNote2: 'Лаборатория обеспечивает комплексный подход при лабораторной диагностике и осуществляет круглосуточную поддержку своих клиентов.',
    // Research table
    researchTitle: 'Исследования | ONCO',
    researchSubtitle: 'Диагностическая лаборатория «GammaLab» предлагает различные виды исследований для выявления мутаций в генах:',
    lungCancer: 'Рак легкого:',
    breastCancer: 'Рак молочной железы:',
    ovarianCancer: 'Рак яичников:',
    colorectalCancer: 'Колоректальный рак:',
    urothelialCancer: 'Уротелиальный рак:',
    melanoma: 'Меланома:',
    glioblastoma: 'Глиобластома:',
    // Detailed analysis list
    analysisTitle: 'Наименование анализов GL | ONCO',
    catPredisposition: 'Генетические маркеры предрасположенности к развитию рака молочной железы и рака яичников',
    predItems: [
      'Комплекс: определение 5 мутаций в гене BRCA1 (4153delA, 185delAG, Cys61Gly, 5382insC, BRCA2 (6174delT)) методом ПЦР',
    ],
    catSensitivity: 'Генетические маркеры чувствительности/устойчивости к таргетным и противоопухолевым препаратам',
    sensItems: [
      'Определение мутации гена KRAS (7) G12A, G12C, G12D, G12R, G12S, G12V, G13D',
      'Определение мутаций гена NRAS методом ПЦР',
      'Определение комплекса исследуемых мутаций гена KRAS (7) гена NRAS методом ПЦР',
      'Определение множественных мутаций в гене EGFR (78 мутаций) методом ПЦР',
      'Определение мутации V600E в гене BRAF методом ПЦР',
      'Определение делеции гена HER2/neu в тканях (ДНК) с использованием ПЦР в режиме реального времени',
      'Анализ из 4 мутаций при опухоли мочевого пузыря (FGFR2 и FGFR3) методом ОТ-ПЦР в режиме реального времени',
      'Определение мутаций PIK3CA методом полимеразной цепной реакции (ПЦР)',
      'Определение мутаций генов IDH1, IDH2 методом полимеразной цепной реакции (ПЦР)',
    ],
    catLiquidBiopsy: 'Жидкостная биопсия',
    liquidItems: [
      'Комплексное исследование определение содержания циркулирующих опухолевых клеток (ЦОК) в периферической крови',
    ],
    catIHC: 'Иммуногистохимическое исследование (ИГХ)',
    ihcItems: [
      'Определение мутации гена ALK в биоптате опухолевой ткани ИГХ методом',
      'Определение PD-L1 в биоптате опухолевой ткани ИГХ методом',
      'Определение ИГХ определения статуса рецепторов стероидных гормонов при раке молочной железы (PR, ER, Ki67, C-erbB-2 (HER2/neu))',
      'Определение гена Her2/neu в биоптате опухолевой ткани ИГХ методом',
      'Определение гена ROS1 в биоптате опухолевой ткани ИГХ методом',
      'Определение рецепторов Ki-67 из биоптата опухолевой ткани ИГХ методом',
      'Болезнь 5100 из биоптата опухолевой ткани ИГХ методом',
      'Определение ИГХ для дифференциальной диагностики мезотелиомы (AE1/AE3, Vimentin, цитокератин 20, цитокератин 7)',
      'Определение антигена ассоциированного с меланомой (ECA) CD45 ИГХ методом',
    ],
    catCytogenetic: 'Цитогенетическое исследование',
    cytoItems: [
      'Цитогенетический анализ клеток костного мозга (кариотип)',
    ],
    catPathohistological: 'Патогистологическое исследование',
    pathoItems: [
      'Гистохимическое исследование операционно-биопсийного материала',
      '1-2-3-4 категории сложности (1 блок-препарат)',
      'Перезаливка блоков с изготовлением 1-го гистологического препарата',
      'Пересмотр готовых гистологических стёклопрепаратов',
    ],
    // T-SPOT
    tspotTitle: 'GL | T-SPOT.TB',
    tspotSubtitle: 'В диагностической лаборатории «GammaLab» можно пройти тест T-SPOT.TB',
    tspotDesc: 'T-SPOT.TB — метод диагностики скрытого (латентного) или активного туберкулеза у детей и взрослых. Тест определяет наличие микобактерий туберкулеза по реакции на них иммунной системы организма. Исследование позволяет диагностировать с вероятностью 99,9% особенно внелегочные формы туберкулёза (мочеполовых органов, костей, суставов, глаз, мозговых оболочек, кожи и др.) в короткие сроки.',
    tspotCard1: 'Мы сотрудничаем непосредственно с производителем реактивов.',
    tspotCard2: 'В нашей лаборатории работает большая команда специалистов высокого уровня.',
    tspotCard3: 'За годы работы ГаммаЛаб зарекомендовала себя, как уникальных и высококачественных исследований, соответствующий высоким международным стандартам.',
    tspotCard4: 'Нам доверяет более 30 партнеров по всей РК.',
    tspotNote: 'T-SPOT.TB давно и успешно применяется в Европейских странах и одобрен многими контролирующими организациями (FDA с 2008 г.).',
    // Nutrigenetics
    nutriTitle: 'GL | НУТРИГЕНЕТИКА',
    nutriSubtitle: 'В диагностической лаборатории «GammaLab» можно пройти тест Нутригенетика',
    nutriDesc: 'Нутригенетика — тест для определения пяти однонуклеотидных замен (SNP) в четырех полиморфных генах, продукты которых влияют на эффективность уменьшения избыточного веса.',
    nutriMethod: 'Анализ выполняется методом аллель - специфической полимеразной цепной реакции в режиме реального времени. Метод обладает очень высокой чувствительностью, позволяет анализировать однонуклеотидные полиморфизмы в нескольких нанограммах геномной ДНК.',
    // SNP Table
    snpIntro: 'В ходе анализа определяются SNP в генах, кодирующих белки, участвующие в процессах усвоения и обмена жиров.',
    snpColGene: 'Символ гена и название кодируемого белка',
    snpColSNP: 'Однонуклеотидные полиморфизмы и определяемые им изоформы',
    snpColFunc: 'Локализация и функция белка',
    snpRows: [
      { gene: 'FABP2', desc: 'Белок, связывающий жирные кислоты 2', snp: 'Rs1799883', poly: 'ACT → GCT\nThr54Ala', func: 'Функционирует в эпителиальных клетках тонкого кишечника. Играет важную роль в усвоении, внутриклеточном метаболизме и транспорте жирных кислот.' },
      { gene: 'PPARG2', desc: 'Рецептор, активируемый пролифератором пероксисом, типа гамма 2', snp: 'Rs1801282', poly: 'CCC → GCC\nPro12Ala', func: 'Вырабатывается в жировых клетках. Через этот рецептор активируется пролиферация пероксисом (органелл, осуществляющих окисление жирных кислот) и дифференцировка жировых клеток.' },
      { gene: 'ADRB2', desc: 'Бета-адренергический рецептор 2 (Beta-2 adrenergic receptor)', snp: 'Rs1042713', poly: 'AGA → GGA\nArg16Gly', func: 'Вырабатывается в жировых клетках. Участвует в регуляции процесса превращения жира в энергию под действием адреналина, норадреналина и дофамина.' },
      { gene: 'ADRB2', desc: 'Бета-адренергический рецептор 2 (Beta-2 adrenergic receptor)', snp: 'Rs1042714', poly: 'CAA → GAA\nGln27Glu', func: 'Вырабатывается в жировых клетках. Участвует в регуляции процесса превращения жира в энергию под действием катехоламинов: адреналина, норадреналина и дофамина.' },
      { gene: 'ADRB3', desc: 'Бета-адренергический рецептор 3 (Beta-3 adrenergic receptor)', snp: 'Rs4994', poly: 'TGG → CGG\nTrp64Arg', func: 'Вырабатывается главным образом в жировой ткани. Участвует в регуляции процессов липолиза и термогенеза.' },
    ],
    // Nutri conclusion
    nutriConclusion: 'Уже сегодня знание генетического статуса конкретного пациента, имеющего избыточный вес, позволяет подобрать диету или комплекс физических упражнений, с помощью которых можно максимально эффективно уменьшить избыточный вес.',
    // Conferences
    confTitle: 'Участие в конференциях | Авторские статьи',
    confSubtitle: 'Наши специалисты активно участвуют в мировых медицинских конференциях, представляя передовые исследования и технологии, а также являются авторами статей в ведущих мировых медицинских журналах, представляя результаты наших исследований.',
    conf1: 'Барселона, Испания',
    conf1date: '8–12 сентября 2018',
    conf2: 'Базель, Швейцария',
    conf2date: '3–7 сентября 2022',
    conf3: 'Монпелье, Франция',
    conf3date: '1–4 июля 2023',
    // Why GammaLab
    whyTitle: 'Почему GammaLab?',
    whySubtitle: 'Лаборатория GammaLab персонально работает с пациентом/врачом/заказчиком в формате:',
    whyStep1: 'Согласование услуги',
    whyStep2: 'Забор образца биоматериала со всех регионов РК',
    whyStep3: 'Самостоятельная доставка в лабораторию',
    whyStep4: 'Производство',
    whyStep5: 'Выдача результата анализа',
    whyStep6: 'Послетестовое консультирование специалиста',
    // Advantages
    advTitle: 'Наши преимущества',
    adv1: 'Лабораторная информационная система и штрихкодирование образца в месте взятия пробы',
    adv2: 'Высококвалифицированные специалисты, имеющие большой опыт работы в многопрофильной лаборатории',
    adv3: 'Максимальная автоматизация всех рабочих процессов',
    adv4: 'Предоставление курьера и транспортировка образцов с соблюдением требований преаналитического этапа',
    adv5: 'Оборудование и реагенты ведущих мировых производителей',
    adv6: 'Участие в системах внешнего контроля качества',
    adv7: 'Обучение персонала правилам преаналитического этапа',
    // Final
    finalTitle: 'Диагностическая лаборатория GammaLab — это современная молекулярно-генетическая лаборатория',
    finalText: '— это объединение профессионалов, сплочённая команда, решающая ряд перспективных научно-практических задач, связанных с различными направлениями современных технологий в области диагностики заболеваний.',
  },
  kz: {
    feat1: 'Заманауи жабдық',
    feat2: 'Білікті персонал',
    feat3: 'Жоғары сапа',
    feat4: 'Кешенді тәсіл',
    aboutTitle: 'КОМПАНИЯ ТУРАЛЫ',
    aboutText: '«GammaLab (ГаммаЛаб)» диагностикалық зертханасы — бұл заманауи молекулярлық-генетикалық зертхана, аурулардың диагностикасы саласындағы заманауи технологиялардың әртүрлі бағыттарымен байланысты бірқатар перспективалық ғылыми-практикалық міндеттерді шешетін кәсіпқойлар бірлестігі.',
    directionsTitle: 'Бағыттар',
    dir1: 'Онкогенетика',
    dir2: 'Туберкулез диагностикасы T-SPOT әдісі',
    dir3: 'Нутригенетика',
    goalTitle: 'GL | ONCO мақсаты',
    goalText: '«GammaLab» диагностикалық зертханасының негізгі мақсаты — таргеттік терапияны таңдау үшін ісік тінінің мутацияларын зерттеумен байланысты жаңа шешімдерді енгізу.',
    therapy1: 'Иммуно\nтерапия',
    therapy2: 'Химио\nтерапия',
    therapy3: 'Таргеттік\nтерапия',
    therapy4: 'Сәулелік терапия /\nрадиожиілікті абляция',
    therapy5: 'Хирургиялық\nоперация',
    processTitle: 'GL | ONCO процесі',
    step1: 'Үлгілерді қабылдау және тұрақтандыру',
    step1d1: 'Қолмен және автоматтандырылған шешімдер',
    step1d2: 'Нано-спектрофотометрия',
    step1d3: '80С-та мұздату шарттары',
    step2: 'Нуклеин қышқылдарын бөліп алу',
    step2d1: 'Қолмен және автоматтандырылған шешімдер',
    step2d2: 'Нано-спектрофотометрия',
    step2d3: '80С-та мұздату шарттары',
    step3: 'Мутацияларды іздеу',
    step3d1: 'Rotor-Gene Q 5plex HRM құрылғысы',
    step3d2: 'ДНҚ сапасын тексеру үшін үлгіні бағалау циклдері',
    step3d3: 'Мутацияны анықтау циклдері',
    step4: 'Талдау және интерпретация',
    step4d1: 'Rotor-Gene Q 5plex HRM бағдарламалық қамтамасыздандыру',
    processNote: 'Бізге ірі мемлекеттік денсаулық сақтау мекемелері мен жеке медициналық орталықтар сенеді.',
    processNote2: 'Зертхана зертханалық диагностикада кешенді тәсілді қамтамасыз етеді және клиенттерге тәулік бойы қолдау көрсетеді.',
    researchTitle: 'Зерттеулер | ONCO',
    researchSubtitle: '«GammaLab» диагностикалық зертханасы гендердегі мутацияларды анықтау үшін зерттеулердің әртүрлі түрлерін ұсынады:',
    lungCancer: 'Өкпе рагі:',
    breastCancer: 'Сүт безі рагі:',
    ovarianCancer: 'Аналық без рагі:',
    colorectalCancer: 'Колоректальды рак:',
    urothelialCancer: 'Уротелиальды рак:',
    melanoma: 'Меланома:',
    glioblastoma: 'Глиобластома:',
    analysisTitle: 'Талдаулар тізімі GL | ONCO',
    catPredisposition: 'Сүт безі рагі мен аналық без рагына бейімділіктің генетикалық маркерлері',
    predItems: [
      'Кешен: BRCA1 генінде 5 мутацияны анықтау (4153delA, 185delAG, Cys61Gly, 5382insC, BRCA2 (6174delT)) ПТР әдісімен',
    ],
    catSensitivity: 'Таргеттік және ісікке қарсы препараттарға сезімталдық/төзімділіктің генетикалық маркерлері',
    sensItems: [
      'KRAS генінің мутациясын анықтау (7) G12A, G12C, G12D, G12R, G12S, G12V, G13D',
      'NRAS генінің мутацияларын ПТР әдісімен анықтау',
      'KRAS (7) генінің NRAS генінің зерттелетін мутациялар кешенін анықтау',
      'EGFR геніндегі көптеген мутацияларды анықтау (78 мутация) ПТР әдісімен',
      'BRAF генінде V600E мутациясын анықтау ПТР әдісімен',
      'Тіндердегі HER2/neu генінің делециясын анықтау',
      'Қуық ісігіне 4 мутацияны талдау (FGFR2 және FGFR3)',
      'PIK3CA мутацияларын ПТР әдісімен анықтау',
      'IDH1, IDH2 гендерінің мутацияларын ПТР әдісімен анықтау',
    ],
    catLiquidBiopsy: 'Сұйық биопсия',
    liquidItems: [
      'Перифериялық қандағы циркуляциялық ісік жасушаларын (ЦІЖ) кешенді зерттеу',
    ],
    catIHC: 'Иммуногистохимиялық зерттеу (ИГХ)',
    ihcItems: [
      'ALK генінің мутациясын ісік тінінің биоптатында ИГХ әдісімен анықтау',
      'PD-L1-ді ісік тінінің биоптатында ИГХ әдісімен анықтау',
      'Сүт безі рагі кезінде стероидті гормондар рецепторлары статусын ИГХ анықтау',
      'Her2/neu генін ісік тінінің биоптатында ИГХ әдісімен анықтау',
      'ROS1 генін ісік тінінің биоптатында ИГХ әдісімен анықтау',
      'Ki-67 рецепторларын ісік тінінің биоптатынан ИГХ әдісімен анықтау',
      '5100 ауруын ісік тінінің биоптатынан ИГХ әдісімен анықтау',
      'Мезотелиоманы дифференциалды диагностикалау үшін ИГХ',
      'Меланомамен байланысты антигенді (ECA) CD45 ИГХ әдісімен анықтау',
    ],
    catCytogenetic: 'Цитогенетикалық зерттеу',
    cytoItems: [
      'Сүйек кемігі жасушаларының цитогенетикалық талдауы (кариотип)',
    ],
    catPathohistological: 'Патогистологиялық зерттеу',
    pathoItems: [
      'Операциялық-биопсиялық материалды гистохимиялық зерттеу',
      '1-2-3-4 күрделілік санаты (1 блок-препарат)',
      '1 гистологиялық препаратты дайындау',
      'Дайын гистологиялық шыны препараттарды қайта қарау',
    ],
    tspotTitle: 'GL | T-SPOT.TB',
    tspotSubtitle: '«GammaLab» диагностикалық зертханасында T-SPOT.TB тестін тапсыруға болады',
    tspotDesc: 'T-SPOT.TB — балалар мен ересектерде жасырын (латентті) немесе белсенді туберкулезді диагностикалау әдісі. Тест ағзаның иммундық жүйесінің реакциясы бойынша туберкулез микобактерияларының болуын анықтайды. Зерттеу 99,9% ықтималдықпен, әсіресе өкпеден тыс туберкулез нысандарын қысқа мерзімде диагностикалауға мүмкіндік береді.',
    tspotCard1: 'Біз реагенттер өндірушісімен тікелей ынтымақтасамыз.',
    tspotCard2: 'Біздің зертханада жоғары деңгейлі мамандардың үлкен командасы жұмыс істейді.',
    tspotCard3: 'ГаммаЛаб жылдар бойы жоғары халықаралық стандарттарға сай бірегей және жоғары сапалы зерттеулерімен танылды.',
    tspotCard4: 'Бізге бүкіл ҚР бойынша 30-дан астам серіктес сенеді.',
    tspotNote: 'T-SPOT.TB Еуропа елдерінде сәтті қолданылады және көптеген бақылау ұйымдарымен мақұлданған (FDA 2008 ж. бастап).',
    nutriTitle: 'GL | НУТРИГЕНЕТИКА',
    nutriSubtitle: '«GammaLab» диагностикалық зертханасында Нутригенетика тестін тапсыруға болады',
    nutriDesc: 'Нутригенетика — артық салмақты азайту тиімділігіне әсер ететін төрт полиморфты гендегі бес бір нуклеотидті алмасуды (SNP) анықтауға арналған тест.',
    nutriMethod: 'Талдау нақты уақыт режіміндегі аллель-спецификалық полимеразды тізбекті реакция әдісімен орындалады. Әдіс өте жоғары сезімталдыққа ие, геномдық ДНҚ-ның бірнеше нанограммдарындағы бір нуклеотидті полиморфизмдерді талдауға мүмкіндік береді.',
    snpIntro: 'Талдау барысында май засімдеу мен алмасу процестеріне қатысатын ақуыздарды кодтайтын гендердегі SNP анықталады.',
    snpColGene: 'Ген белгісі және кодталатын ақуыз атауы',
    snpColSNP: 'Бір нуклеотидті полиморфизмдер',
    snpColFunc: 'Ақуыздың орналасуы мен функциясы',
    snpRows: [
      { gene: 'FABP2', desc: 'Май қышқылдарын байланыстыратын ақуыз 2', snp: 'Rs1799883', poly: 'ACT → GCT\nThr54Ala', func: 'Жіңішке ішектің эпителиальды жасушаларында жұмыс істейді. Май қышқылдарын сіңіру, жасушаішілік метаболизм мен тасымалдауда маңызды рөл атқарады.' },
      { gene: 'PPARG2', desc: 'Пероксисом пролифераторымен белсендірілетін рецептор, гамма 2 түрі', snp: 'Rs1801282', poly: 'CCC → GCC\nPro12Ala', func: 'Май жасушаларында өндіріледі. Осы рецептор арқылы пероксисомалар пролиферациясы белсендіріледі.' },
      { gene: 'ADRB2', desc: 'Бета-адренергиялық рецептор 2', snp: 'Rs1042713', poly: 'AGA → GGA\nArg16Gly', func: 'Май жасушаларында өндіріледі. Адреналин, норадреналин және дофамин әсерінен майды энергияға айналдыру процесін реттеуге қатысады.' },
      { gene: 'ADRB2', desc: 'Бета-адренергиялық рецептор 2', snp: 'Rs1042714', poly: 'CAA → GAA\nGln27Glu', func: 'Май жасушаларында өндіріледі. Катехоламиндер әсерінен майды энергияға айналдыру процесін реттеуге қатысады.' },
      { gene: 'ADRB3', desc: 'Бета-адренергиялық рецептор 3', snp: 'Rs4994', poly: 'TGG → CGG\nTrp64Arg', func: 'Негізінен май тінінде өндіріледі. Липолиз және термогенез процестерін реттеуге қатысады.' },
    ],
    nutriConclusion: 'Бүгінгі таңда артық салмағы бар нақты пациенттің генетикалық мәртебесін білу диета немесе дене жаттығулары кешенін таңдауға мүмкіндік береді.',
    confTitle: 'Конференцияларға қатысу | Авторлық мақалалар',
    confSubtitle: 'Біздің мамандар әлемдік медициналық конференцияларға белсенді қатысады, алдыңғы қатарлы зерттеулер мен технологияларды ұсынады, сондай-ақ жетекші медициналық журналдарда мақалалар жариялайды.',
    conf1: 'Барселона, Испания',
    conf1date: '2018 ж. 8–12 қыркүйек',
    conf2: 'Базель, Швейцария',
    conf2date: '2022 ж. 3–7 қыркүйек',
    conf3: 'Монпелье, Франция',
    conf3date: '2023 ж. 1–4 шілде',
    whyTitle: 'Неге GammaLab?',
    whySubtitle: 'GammaLab зертханасы пациентпен/дәрігермен/тапсырыс берушімен жеке жұмыс істейді:',
    whyStep1: 'Қызметті келісу',
    whyStep2: 'ҚР-ның барлық аймақтарынан биоматериал үлгісін алу',
    whyStep3: 'Зертханаға дербес жеткізу',
    whyStep4: 'Өндіру',
    whyStep5: 'Талдау нәтижесін беру',
    whyStep6: 'Тесттен кейінгі маман кеңесі',
    advTitle: 'Біздің артықшылықтар',
    adv1: 'Зертханалық ақпараттық жүйе және сынама алу орнында үлгіні штрих-кодтау',
    adv2: 'Көп бейінді зертханада үлкен тәжірибесі бар жоғары білікті мамандар',
    adv3: 'Барлық жұмыс процестерін максималды автоматтандыру',
    adv4: 'Курьер қызметін ұсыну және преаналитикалық кезең талаптарын сақтай отырып үлгілерді тасымалдау',
    adv5: 'Жетекші әлемдік өндірушілердің жабдықтары мен реагенттері',
    adv6: 'Сапаны сыртқы бақылау жүйелеріне қатысу',
    adv7: 'Персоналды преаналитикалық кезең ережелеріне оқыту',
    finalTitle: 'GammaLab диагностикалық зертханасы — заманауи молекулярлық-генетикалық зертхана',
    finalText: '— бұл кәсіпқойлар бірлестігі, аурулардың диагностикасы саласындағы заманауи технологиялардың бағыттарымен байланысты перспективалық ғылыми-практикалық міндеттерді шешетін команда.',
  },
  en: {
    feat1: 'Modern equipment',
    feat2: 'Qualified personnel',
    feat3: 'High quality',
    feat4: 'Comprehensive approach',
    aboutTitle: 'ABOUT THE COMPANY',
    aboutText: 'Diagnostic laboratory "GammaLab" is a modern molecular genetic laboratory — an association of professionals, a cohesive team solving a number of promising scientific and practical tasks related to various areas of modern technologies in the field of disease diagnostics.',
    directionsTitle: 'Directions',
    dir1: 'Oncogenetics',
    dir2: 'Tuberculosis diagnostics T-SPOT method',
    dir3: 'Nutrigenetics',
    goalTitle: 'Goal GL | ONCO',
    goalText: 'The main goal of the diagnostic laboratory "GammaLab" is to work in promising areas of laboratory diagnostics, as well as to implement new solutions related to the study of mutations in tumor tissue for the selection of targeted therapy.',
    therapy1: 'Immuno\ntherapy',
    therapy2: 'Chemo\ntherapy',
    therapy3: 'Targeted\ntherapy',
    therapy4: 'Radiation therapy /\nradiofrequency ablation',
    therapy5: 'Surgical\noperation',
    processTitle: 'Process GL | ONCO',
    step1: 'Sample reception and stabilization',
    step1d1: 'Manual and automated solutions',
    step1d2: 'Nano-spectrophotometry',
    step1d3: 'Conditions for freezing at 80°C',
    step2: 'Nucleic acid extraction',
    step2d1: 'Manual and automated solutions',
    step2d2: 'Nano-spectrophotometry',
    step2d3: 'Conditions for freezing at 80°C',
    step3: 'Mutation search',
    step3d1: 'Rotor-Gene Q 5plex HRM device',
    step3d2: 'Sample evaluation cycles for DNA quality',
    step3d3: 'Mutation detection cycles',
    step4: 'Analysis and interpretation',
    step4d1: 'Rotor-Gene Q 5plex HRM software',
    processNote: 'The largest state healthcare institutions and private medical centers trust us.',
    processNote2: 'The laboratory provides a comprehensive approach to laboratory diagnostics and provides round-the-clock support to its clients.',
    researchTitle: 'Research | ONCO',
    researchSubtitle: 'Diagnostic laboratory "GammaLab" offers various types of research to identify gene mutations:',
    lungCancer: 'Lung cancer:',
    breastCancer: 'Breast cancer:',
    ovarianCancer: 'Ovarian cancer:',
    colorectalCancer: 'Colorectal cancer:',
    urothelialCancer: 'Urothelial cancer:',
    melanoma: 'Melanoma:',
    glioblastoma: 'Glioblastoma:',
    analysisTitle: 'Analysis List GL | ONCO',
    catPredisposition: 'Genetic markers of predisposition to breast and ovarian cancer',
    predItems: [
      'Complex: detection of 5 mutations in BRCA1 gene (4153delA, 185delAG, Cys61Gly, 5382insC, BRCA2 (6174delT)) by PCR',
    ],
    catSensitivity: 'Genetic markers of sensitivity/resistance to targeted and antitumor drugs',
    sensItems: [
      'Detection of KRAS gene mutation (7) G12A, G12C, G12D, G12R, G12S, G12V, G13D',
      'Detection of NRAS gene mutations by PCR',
      'Complex of KRAS (7) and NRAS gene mutations detection by PCR',
      'Detection of multiple EGFR gene mutations (78 mutations) by PCR',
      'Detection of V600E mutation in BRAF gene by PCR',
      'Detection of HER2/neu gene deletion in tissue using real-time PCR',
      'Analysis of 4 mutations in bladder tumors (FGFR2 and FGFR3) by RT-PCR',
      'Detection of PIK3CA mutations by PCR',
      'Detection of IDH1, IDH2 gene mutations by PCR',
    ],
    catLiquidBiopsy: 'Liquid biopsy',
    liquidItems: [
      'Comprehensive study of circulating tumor cells (CTCs) in peripheral blood',
    ],
    catIHC: 'Immunohistochemical study (IHC)',
    ihcItems: [
      'Detection of ALK gene mutation in tumor tissue biopsy by IHC',
      'Detection of PD-L1 in tumor tissue biopsy by IHC',
      'IHC determination of steroid hormone receptor status in breast cancer (PR, ER, Ki67, C-erbB-2 (HER2/neu))',
      'Detection of Her2/neu gene in tumor tissue biopsy by IHC',
      'Detection of ROS1 gene in tumor tissue biopsy by IHC',
      'Detection of Ki-67 receptors from tumor tissue biopsy by IHC',
      'Disease 5100 from tumor tissue biopsy by IHC',
      'IHC for differential diagnosis of mesothelioma',
      'Detection of melanoma-associated antigen (ECA) CD45 by IHC',
    ],
    catCytogenetic: 'Cytogenetic study',
    cytoItems: [
      'Cytogenetic analysis of bone marrow cells (karyotype)',
    ],
    catPathohistological: 'Pathohistological study',
    pathoItems: [
      'Histochemical study of surgical-biopsy material',
      '1-2-3-4 complexity categories (1 block preparation)',
      'Re-embedding blocks with preparation of 1 histological specimen',
      'Review of prepared histological glass preparations',
    ],
    tspotTitle: 'GL | T-SPOT.TB',
    tspotSubtitle: 'At the diagnostic laboratory "GammaLab" you can take the T-SPOT.TB test',
    tspotDesc: 'T-SPOT.TB is a method for diagnosing latent or active tuberculosis in children and adults. The test detects the presence of mycobacterium tuberculosis by the immune system response. The study allows diagnosis with 99.9% probability, especially extrapulmonary forms of tuberculosis (urogenital organs, bones, joints, eyes, meninges, skin, etc.) in a short time.',
    tspotCard1: 'We cooperate directly with reagent manufacturers.',
    tspotCard2: 'Our laboratory employs a large team of high-level specialists.',
    tspotCard3: 'Over the years, GammaLab has established itself as a provider of unique and high-quality research meeting high international standards.',
    tspotCard4: 'More than 30 partners across Kazakhstan trust us.',
    tspotNote: 'T-SPOT.TB has been successfully used in European countries and approved by many regulatory organizations (FDA since 2008).',
    nutriTitle: 'GL | NUTRIGENETICS',
    nutriSubtitle: 'At the diagnostic laboratory "GammaLab" you can take the Nutrigenetics test',
    nutriDesc: 'Nutrigenetics is a test for determining five single nucleotide polymorphisms (SNP) in four polymorphic genes whose products affect the effectiveness of weight reduction.',
    nutriMethod: 'The analysis is performed by allele-specific polymerase chain reaction in real-time mode. The method has very high sensitivity, allowing analysis of single nucleotide polymorphisms in several nanograms of genomic DNA.',
    snpIntro: 'During the analysis, SNPs are determined in genes encoding proteins involved in fat absorption and metabolism.',
    snpColGene: 'Gene symbol and encoded protein name',
    snpColSNP: 'Single nucleotide polymorphisms and isoforms',
    snpColFunc: 'Protein localization and function',
    snpRows: [
      { gene: 'FABP2', desc: 'Fatty acid-binding protein 2', snp: 'Rs1799883', poly: 'ACT → GCT\nThr54Ala', func: 'Functions in epithelial cells of the small intestine. Plays an important role in absorption, intracellular metabolism and transport of fatty acids.' },
      { gene: 'PPARG2', desc: 'Peroxisome proliferator-activated receptor gamma 2', snp: 'Rs1801282', poly: 'CCC → GCC\nPro12Ala', func: 'Produced in fat cells. Through this receptor, peroxisome proliferation is activated and fat cell differentiation occurs.' },
      { gene: 'ADRB2', desc: 'Beta-2 adrenergic receptor', snp: 'Rs1042713', poly: 'AGA → GGA\nArg16Gly', func: 'Produced in fat cells. Participates in regulation of fat-to-energy conversion under the action of adrenaline, noradrenaline and dopamine.' },
      { gene: 'ADRB2', desc: 'Beta-2 adrenergic receptor', snp: 'Rs1042714', poly: 'CAA → GAA\nGln27Glu', func: 'Produced in fat cells. Participates in regulation of fat-to-energy conversion under the action of catecholamines.' },
      { gene: 'ADRB3', desc: 'Beta-3 adrenergic receptor', snp: 'Rs4994', poly: 'TGG → CGG\nTrp64Arg', func: 'Produced mainly in adipose tissue. Participates in regulation of lipolysis and thermogenesis.' },
    ],
    nutriConclusion: 'Today, knowledge of the genetic status of a specific overweight patient allows selecting a diet or exercise program to most effectively reduce excess weight.',
    confTitle: 'Conference Participation | Published Articles',
    confSubtitle: 'Our specialists actively participate in global medical conferences, presenting cutting-edge research and technologies, and publish articles in leading medical journals.',
    conf1: 'Barcelona, Spain',
    conf1date: 'September 8–12, 2018',
    conf2: 'Basel, Switzerland',
    conf2date: 'September 3–7, 2022',
    conf3: 'Montpellier, France',
    conf3date: 'July 1–4, 2023',
    whyTitle: 'Why GammaLab?',
    whySubtitle: 'GammaLab laboratory works personally with patients/doctors/clients in the following format:',
    whyStep1: 'Service coordination',
    whyStep2: 'Biomaterial sample collection from all regions of Kazakhstan',
    whyStep3: 'Independent delivery to laboratory',
    whyStep4: 'Production',
    whyStep5: 'Analysis result delivery',
    whyStep6: 'Post-test specialist consultation',
    advTitle: 'Our Advantages',
    adv1: 'Laboratory information system and sample barcoding at collection point',
    adv2: 'Highly qualified specialists with extensive experience in multidisciplinary laboratory',
    adv3: 'Maximum automation of all work processes',
    adv4: 'Courier service and sample transportation meeting preanalytical stage requirements',
    adv5: 'Equipment and reagents from leading global manufacturers',
    adv6: 'Participation in external quality control systems',
    adv7: 'Staff training on preanalytical stage rules',
    finalTitle: 'Diagnostic Laboratory GammaLab — a modern molecular genetic laboratory',
    finalText: '— an association of professionals, a cohesive team solving promising scientific and practical tasks related to various areas of modern technologies in disease diagnostics.',
  },
};

// =============================================
// MAIN COMPONENT
// =============================================

export default function DoctorsPage() {
  const locale = useLocale() as Locale;
  const [isRegistered, setIsRegistered] = useState<boolean | null>(null);

  useEffect(() => {
    const registered = localStorage.getItem(STORAGE_KEY);
    setIsRegistered(registered === 'true');
  }, []);

  const handleRegistrationComplete = () => {
    localStorage.setItem(STORAGE_KEY, 'true');
    setIsRegistered(true);
  };

  const hero = heroTranslations[locale] || heroTranslations.ru;

  // Loading
  if (isRegistered === null) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <section
          className="relative pt-[100px] sm:pt-[110px] lg:pt-[120px] pb-8 lg:pb-10"
          style={{ backgroundColor: '#EEF6F6' }}
        >
          <div className="container-main">
            <div className="flex items-center gap-2 mb-6">
              <Link href="/" className="text-[13px]" style={{ color: '#9CA3AF' }}>{hero.home}</Link>
              <span className="text-[13px]" style={{ color: '#9CA3AF' }}>/</span>
              <span className="text-[13px]" style={{ color: '#209DA7' }}>{hero.title}</span>
            </div>
            <h1 className="text-[28px] sm:text-[36px] lg:text-[42px] font-semibold mb-3" style={{ color: '#091D33' }}>
              {hero.title}
            </h1>
          </div>
        </section>
      </div>
    );
  }

  // Not registered — show form
  if (!isRegistered) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <section
          className="relative pt-[100px] sm:pt-[110px] lg:pt-[120px] pb-8 lg:pb-10"
          style={{ backgroundColor: '#EEF6F6' }}
        >
          <div className="container-main">
            <div className="flex items-center gap-2 mb-6">
              <Link href="/" className="text-[13px]" style={{ color: '#9CA3AF' }}>{hero.home}</Link>
              <span className="text-[13px]" style={{ color: '#9CA3AF' }}>/</span>
              <span className="text-[13px]" style={{ color: '#209DA7' }}>{hero.title}</span>
            </div>
            <h1 className="text-[28px] sm:text-[36px] lg:text-[42px] font-semibold mb-3" style={{ color: '#091D33' }}>
              {hero.title}
            </h1>
            <p className="text-[16px] lg:text-[18px]" style={{ color: '#6B7280' }}>
              {hero.subtitle}
            </p>
          </div>
        </section>

        <section className="bg-white px-5 sm:px-8 md:px-12 lg:px-20 py-12 lg:py-20">
          <RegistrationForm locale={locale} onSuccess={handleRegistrationComplete} />
        </section>
      </div>
    );
  }

  // Registered — show presentation-style content
  return <DoctorsContent locale={locale} />;
}

// =============================================
// DOCTORS CONTENT — Presentation-style sections
// =============================================

function DoctorsContent({ locale }: { locale: Locale }) {
  const t = contentTranslations[locale] || contentTranslations.ru;

  return (
    <div className="flex flex-col min-h-screen">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.95); opacity: 0.7; }
          50% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(0.95); opacity: 0.7; }
        }
        .doc-section { animation: fadeInUp 0.6s ease-out both; }
        .doc-float { animation: float 6s ease-in-out infinite; }
        .doc-pulse { animation: pulse-ring 3s ease-in-out infinite; }
        .doc-feature-card {
          backdrop-filter: blur(10px);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .doc-feature-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(32,157,167,0.15);
        }
        .doc-direction-btn {
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .doc-direction-btn:hover {
          transform: translateX(8px);
          box-shadow: 0 4px 20px rgba(236,145,12,0.2);
        }
        .doc-therapy-node {
          transition: all 0.3s ease;
        }
        .doc-therapy-node:hover {
          transform: scale(1.08);
          box-shadow: 0 8px 30px rgba(32,157,167,0.25);
        }
        .doc-step-card {
          transition: all 0.3s ease;
        }
        .doc-step-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 30px rgba(0,0,0,0.1);
        }
        .doc-gene-tag {
          transition: all 0.2s ease;
        }
        .doc-gene-tag:hover {
          transform: scale(1.05);
          box-shadow: 0 2px 10px rgba(32,157,167,0.2);
        }
      `}</style>

      {/* ============================================= */}
      {/* SECTION 1: HERO / COVER */}
      {/* ============================================= */}
      <section
        className="doc-section relative overflow-hidden"
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #FFFFFF 0%, #F0F9FA 40%, #E0F2F4 100%)',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Background decorative elements */}
        <div
          className="doc-float"
          style={{
            position: 'absolute',
            top: '10%',
            right: '-5%',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(32,157,167,0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '5%',
            left: '-3%',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(236,145,12,0.05) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div className="container-main w-full" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Left: Text */}
            <div className="flex-1 max-w-xl">
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 16px',
                  borderRadius: '50px',
                  backgroundColor: 'rgba(32,157,167,0.1)',
                  marginBottom: '24px',
                }}
              >
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#209DA7' }} />
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#209DA7', letterSpacing: '0.5px' }}>
                  GammaLab
                </span>
              </div>

              <h1
                style={{
                  fontSize: 'clamp(36px, 5vw, 56px)',
                  fontWeight: '800',
                  lineHeight: '1.1',
                  color: '#091D33',
                  marginBottom: '16px',
                }}
              >
                GammaLab
              </h1>
              <p
                style={{
                  fontSize: 'clamp(16px, 2vw, 20px)',
                  color: '#6B7280',
                  marginBottom: '48px',
                  lineHeight: '1.6',
                }}
              >
                Диагностическая лаборатория
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: Zap, text: t.feat1 },
                  { icon: Users, text: t.feat2 },
                  { icon: Shield, text: t.feat3 },
                  { icon: Target, text: t.feat4 },
                ].map((feat, i) => {
                  const Icon = feat.icon;
                  return (
                    <div
                      key={i}
                      className="doc-feature-card"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '14px',
                        padding: '18px 20px',
                        borderRadius: '14px',
                        backgroundColor: 'rgba(255,255,255,0.8)',
                        border: '1px solid rgba(32,157,167,0.12)',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                      }}
                    >
                      <div
                        style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: '12px',
                          background: 'linear-gradient(135deg, #209DA7, #1a8690)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <Icon size={20} color="white" />
                      </div>
                      <span style={{ fontSize: '14px', fontWeight: '600', color: '#091D33' }}>
                        {feat.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: DNA visual / Image placeholder */}
            <div className="flex-1 flex justify-center">
              <div
                className="doc-float"
                style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: '460px',
                  aspectRatio: '1',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(32,157,167,0.08) 0%, rgba(236,145,12,0.05) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Image
                  src="/images/hero-doctor.png"
                  alt="GammaLab"
                  width={400}
                  height={400}
                  style={{ objectFit: 'contain', maxWidth: '85%', height: 'auto' }}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================= */}
      {/* SECTION 2: ABOUT COMPANY */}
      {/* ============================================= */}
      <section
        className="doc-section"
        style={{
          padding: 'clamp(60px, 8vw, 120px) 0',
          backgroundColor: '#FFFFFF',
        }}
      >
        <div className="container-main">
          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 42px)',
              fontWeight: '800',
              color: '#091D33',
              marginBottom: '48px',
              textAlign: 'center',
            }}
          >
            <span style={{ color: '#EC910C' }}>
              {t.aboutTitle.split(' ')[0]}
            </span>{' '}
            {t.aboutTitle.split(' ').slice(1).join(' ')}
          </h2>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
            {/* Photo Grid */}
            <div className="w-full lg:w-1/2">
              <div
                className="grid grid-cols-2 gap-3"
                style={{ borderRadius: '16px', overflow: 'hidden' }}
              >
                {['1about.png', '2about.png', '3about.png', 'about.png'].map((img, i) => (
                  <div
                    key={i}
                    style={{
                      position: 'relative',
                      aspectRatio: i === 0 || i === 3 ? '4/3' : '4/3',
                      borderRadius: '12px',
                      overflow: 'hidden',
                    }}
                  >
                    <Image
                      src={`/images/${img}`}
                      alt={`Laboratory ${i + 1}`}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Text + Directions */}
            <div className="w-full lg:w-1/2">
              <p
                style={{
                  fontSize: '16px',
                  lineHeight: '1.8',
                  color: '#3D3D3D',
                  marginBottom: '40px',
                }}
              >
                {t.aboutText}
              </p>

              <h3
                style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: '#091D33',
                  marginBottom: '20px',
                }}
              >
                {t.directionsTitle}
              </h3>

              <div className="flex flex-col gap-3">
                {[t.dir1, t.dir2, t.dir3].map((dir, i) => (
                  <div
                    key={i}
                    className="doc-direction-btn"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '18px 24px',
                      borderRadius: '14px',
                      border: '2px solid #EC910C',
                      backgroundColor: i === 0 ? 'rgba(236,145,12,0.06)' : 'white',
                      cursor: 'default',
                    }}
                  >
                    <span style={{ fontSize: '15px', fontWeight: '600', color: '#091D33' }}>
                      {dir}
                    </span>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
                      <path d="M7 4l6 6-6 6" stroke="#EC910C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================= */}
      {/* SECTION 3: GOAL GL|ONCO */}
      {/* ============================================= */}
      <section
        className="doc-section"
        style={{
          padding: 'clamp(60px, 8vw, 120px) 0',
          background: 'linear-gradient(180deg, #F8FDFD 0%, #F0F9FA 100%)',
        }}
      >
        <div className="container-main">
          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 42px)',
              fontWeight: '800',
              color: '#091D33',
              marginBottom: '60px',
              textAlign: 'center',
            }}
          >
            <span style={{ color: '#EC910C' }}>{t.goalTitle.split(' ')[0]}</span>{' '}
            {t.goalTitle.split(' ').slice(1).join(' ')}
          </h2>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
            {/* Therapy diagram */}
            <div className="w-full lg:w-1/2 flex justify-center">
              <div style={{ position: 'relative', width: '100%', maxWidth: '440px' }}>
                {/* Central node */}
                <div
                  className="doc-pulse"
                  style={{
                    width: '140px',
                    height: '140px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #209DA7, #1a8690)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto',
                    boxShadow: '0 8px 40px rgba(32,157,167,0.3)',
                    position: 'relative',
                    zIndex: 2,
                  }}
                >
                  <span style={{ color: 'white', fontWeight: '700', fontSize: '13px', textAlign: 'center', lineHeight: '1.3', padding: '10px' }}>
                    {t.therapy3.split('\n').map((line, i) => (
                      <span key={i}>{line}<br /></span>
                    ))}
                  </span>
                </div>

                {/* Surrounding nodes */}
                <div
                  className="grid grid-cols-2 gap-4"
                  style={{ marginTop: '-30px', position: 'relative', zIndex: 1 }}
                >
                  {[t.therapy1, t.therapy2, t.therapy4, t.therapy5].map((therapy, i) => (
                    <div
                      key={i}
                      className="doc-therapy-node"
                      style={{
                        padding: '20px 16px',
                        borderRadius: '16px',
                        backgroundColor: 'white',
                        border: '2px solid rgba(32,157,167,0.15)',
                        textAlign: 'center',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                      }}
                    >
                      <span style={{ fontSize: '13px', fontWeight: '600', color: '#091D33', lineHeight: '1.4', whiteSpace: 'pre-line' }}>
                        {therapy}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Goal text */}
            <div className="w-full lg:w-1/2">
              <p
                style={{
                  fontSize: '17px',
                  lineHeight: '1.9',
                  color: '#3D3D3D',
                }}
              >
                {t.goalText}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================= */}
      {/* SECTION 4: PROCESS GL|ONCO */}
      {/* ============================================= */}
      <section
        className="doc-section"
        style={{
          padding: 'clamp(60px, 8vw, 120px) 0',
          backgroundColor: '#FFFFFF',
        }}
      >
        <div className="container-main">
          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 42px)',
              fontWeight: '800',
              color: '#091D33',
              marginBottom: '60px',
              textAlign: 'center',
            }}
          >
            <span style={{ color: '#EC910C' }}>{t.processTitle.split(' ')[0]}</span>{' '}
            {t.processTitle.split(' ').slice(1).join(' ')}
          </h2>

          {/* Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { num: '01', title: t.step1, details: [t.step1d1, t.step1d2, t.step1d3] },
              { num: '02', title: t.step2, details: [t.step2d1, t.step2d2, t.step2d3] },
              { num: '03', title: t.step3, details: [t.step3d1, t.step3d2, t.step3d3] },
              { num: '04', title: t.step4, details: [t.step4d1] },
            ].map((step, i) => (
              <div
                key={i}
                className="doc-step-card"
                style={{
                  padding: '28px 24px',
                  borderRadius: '16px',
                  backgroundColor: i === 3 ? '#209DA7' : '#F8FDFD',
                  border: i === 3 ? 'none' : '1px solid rgba(32,157,167,0.12)',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div
                  style={{
                    fontSize: '32px',
                    fontWeight: '800',
                    color: i === 3 ? 'rgba(255,255,255,0.3)' : 'rgba(32,157,167,0.2)',
                    marginBottom: '16px',
                    lineHeight: '1',
                  }}
                >
                  {step.num}
                </div>
                <h3
                  style={{
                    fontSize: '15px',
                    fontWeight: '700',
                    color: i === 3 ? 'white' : '#091D33',
                    marginBottom: '16px',
                    lineHeight: '1.4',
                  }}
                >
                  {step.title}
                </h3>
                <div style={{ flex: 1 }}>
                  {step.details.map((d, j) => (
                    <div
                      key={j}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '8px',
                        marginBottom: '8px',
                        fontSize: '13px',
                        color: i === 3 ? 'rgba(255,255,255,0.85)' : '#6B7280',
                        lineHeight: '1.5',
                      }}
                    >
                      <CheckCircle2
                        size={14}
                        style={{
                          color: i === 3 ? 'rgba(255,255,255,0.6)' : '#209DA7',
                          marginTop: '2px',
                          flexShrink: 0,
                        }}
                      />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Note */}
          <div
            style={{
              padding: '32px 40px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, rgba(32,157,167,0.06) 0%, rgba(236,145,12,0.04) 100%)',
              border: '1px solid rgba(32,157,167,0.1)',
              textAlign: 'center',
            }}
          >
            <p style={{ fontSize: '15px', color: '#091D33', fontWeight: '600', marginBottom: '8px' }}>
              {t.processNote}
            </p>
            <p style={{ fontSize: '14px', color: '#6B7280' }}>
              {t.processNote2}
            </p>
          </div>
        </div>
      </section>

      {/* ============================================= */}
      {/* SECTION 5: RESEARCH TABLE */}
      {/* ============================================= */}
      <section
        className="doc-section"
        style={{
          padding: 'clamp(60px, 8vw, 120px) 0',
          background: 'linear-gradient(180deg, #F8FDFD 0%, #F0F9FA 100%)',
        }}
      >
        <div className="container-main">
          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 42px)',
              fontWeight: '800',
              color: '#091D33',
              marginBottom: '16px',
              textAlign: 'center',
            }}
          >
            <span style={{ color: '#EC910C' }}>
              {t.researchTitle.split(' ')[0]}
            </span>{' '}
            {t.researchTitle.split(' ').slice(1).join(' ')}
          </h2>
          <p
            style={{
              fontSize: '16px',
              color: '#6B7280',
              textAlign: 'center',
              marginBottom: '48px',
              maxWidth: '700px',
              margin: '0 auto 48px',
              lineHeight: '1.7',
            }}
          >
            {t.researchSubtitle}
          </p>

          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 4px 30px rgba(0,0,0,0.06)',
            }}
          >
            {[
              { label: t.lungCancer, genes: ['EGFR (T790M)', 'KRAS, NRAS', 'ALK', 'ROS1', 'PD-L1', 'BRAF'] },
              { label: t.breastCancer, genes: ['BRCA1/2', 'PD-L1', 'CHEK2', 'HER2/neu', 'PIK3CA'] },
              { label: t.ovarianCancer, genes: ['BRCA1/2', 'CHEK2'] },
              { label: t.colorectalCancer, genes: ['KRAS, NRAS', 'BRAF'] },
              { label: t.urothelialCancer, genes: ['FGFR', 'PD-L1'] },
              { label: t.melanoma, genes: ['BRAF', 'KRAS, NRAS'] },
              { label: t.glioblastoma, genes: ['IDH 1,2'] },
            ].map((row, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: '20px 28px',
                  borderBottom: i < 6 ? '1px solid #F3F4F6' : 'none',
                  gap: '16px',
                  flexWrap: 'wrap',
                }}
              >
                <div
                  style={{
                    minWidth: '200px',
                    fontWeight: '700',
                    fontSize: '15px',
                    color: '#EC910C',
                    flexShrink: 0,
                  }}
                >
                  {row.label}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', flex: 1 }}>
                  {row.genes.map((gene, j) => (
                    <span
                      key={j}
                      className="doc-gene-tag"
                      style={{
                        display: 'inline-block',
                        padding: '6px 16px',
                        borderRadius: '50px',
                        backgroundColor: '#F0F9FA',
                        border: '1px solid rgba(32,157,167,0.15)',
                        fontSize: '13px',
                        fontWeight: '600',
                        color: '#209DA7',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {gene}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================= */}
      {/* SECTION 6: DETAILED ANALYSIS LIST */}
      {/* ============================================= */}
      <section
        className="doc-section"
        style={{
          padding: 'clamp(60px, 8vw, 120px) 0',
          backgroundColor: '#FFFFFF',
        }}
      >
        <div className="container-main">
          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 42px)',
              fontWeight: '800',
              color: '#091D33',
              marginBottom: '48px',
              textAlign: 'center',
            }}
          >
            <span style={{ color: '#EC910C' }}>
              {t.analysisTitle.split(' ')[0]}
            </span>{' '}
            {t.analysisTitle.split(' ').slice(1).join(' ')}
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left column */}
            <div className="flex flex-col gap-6">
              <AnalysisCategory title={t.catPredisposition} items={t.predItems} color="#EC910C" />
              <AnalysisCategory title={t.catSensitivity} items={t.sensItems} color="#209DA7" />
              <AnalysisCategory title={t.catLiquidBiopsy} items={t.liquidItems} color="#EC910C" />
            </div>
            {/* Right column */}
            <div className="flex flex-col gap-6">
              <AnalysisCategory title={t.catIHC} items={t.ihcItems} color="#209DA7" />
              <AnalysisCategory title={t.catCytogenetic} items={t.cytoItems} color="#EC910C" />
              <AnalysisCategory title={t.catPathohistological} items={t.pathoItems} color="#209DA7" />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================= */}
      {/* SECTION 7: T-SPOT.TB */}
      {/* ============================================= */}
      <section
        className="doc-section"
        style={{
          padding: 'clamp(60px, 8vw, 120px) 0',
          background: 'linear-gradient(180deg, #F8FDFD 0%, #F0F9FA 100%)',
        }}
      >
        <div className="container-main">
          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 42px)',
              fontWeight: '800',
              color: '#091D33',
              marginBottom: '16px',
              textAlign: 'center',
            }}
          >
            <span style={{ color: '#EC910C' }}>GL</span> | T-SPOT.TB
          </h2>
          <p
            style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#091D33',
              textAlign: 'center',
              marginBottom: '24px',
            }}
          >
            {t.tspotSubtitle}
          </p>
          <p
            style={{
              fontSize: '15px',
              lineHeight: '1.8',
              color: '#3D3D3D',
              textAlign: 'center',
              maxWidth: '900px',
              margin: '0 auto 48px',
            }}
          >
            {t.tspotDesc}
          </p>

          {/* 4 Feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {[t.tspotCard1, t.tspotCard2, t.tspotCard3, t.tspotCard4].map((card, i) => (
              <div
                key={i}
                className="doc-step-card"
                style={{
                  padding: '24px 20px',
                  borderRadius: '16px',
                  backgroundColor: 'white',
                  border: '2px solid #EC910C',
                  textAlign: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '140px',
                }}
              >
                <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#3D3D3D', fontWeight: '500' }}>
                  {card}
                </p>
              </div>
            ))}
          </div>

          {/* Note */}
          <div
            style={{
              padding: '24px 32px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, rgba(236,145,12,0.08) 0%, rgba(236,145,12,0.03) 100%)',
              border: '1px solid rgba(236,145,12,0.15)',
              textAlign: 'center',
            }}
          >
            <p style={{ fontSize: '14px', color: '#3D3D3D', fontStyle: 'italic' }}>
              {t.tspotNote}
            </p>
          </div>
        </div>
      </section>

      {/* ============================================= */}
      {/* SECTION 8: NUTRIGENETICS */}
      {/* ============================================= */}
      <section
        className="doc-section"
        style={{
          padding: 'clamp(60px, 8vw, 120px) 0',
          backgroundColor: '#FFFFFF',
        }}
      >
        <div className="container-main">
          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 42px)',
              fontWeight: '800',
              color: '#091D33',
              marginBottom: '16px',
              textAlign: 'center',
            }}
          >
            <span style={{ color: '#EC910C' }}>GL</span> | {t.nutriTitle.split('| ')[1]}
          </h2>
          <p
            style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#091D33',
              textAlign: 'center',
              marginBottom: '24px',
            }}
          >
            {t.nutriSubtitle}
          </p>
          <p
            style={{
              fontSize: '15px',
              lineHeight: '1.8',
              color: '#3D3D3D',
              textAlign: 'center',
              maxWidth: '900px',
              margin: '0 auto 32px',
            }}
          >
            {t.nutriDesc}
          </p>

          <div
            style={{
              padding: '32px 40px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, rgba(32,157,167,0.06) 0%, rgba(236,145,12,0.04) 100%)',
              border: '1px solid rgba(32,157,167,0.1)',
              maxWidth: '800px',
              margin: '0 auto',
            }}
          >
            <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#3D3D3D', textAlign: 'center' }}>
              {t.nutriMethod}
            </p>
          </div>
        </div>
      </section>

      {/* ============================================= */}
      {/* SECTION 9: SNP TABLE */}
      {/* ============================================= */}
      <section
        className="doc-section"
        style={{
          padding: 'clamp(60px, 8vw, 100px) 0',
          background: 'linear-gradient(180deg, #F8FDFD 0%, #F0F9FA 100%)',
        }}
      >
        <div className="container-main">
          <p
            style={{
              fontSize: '16px',
              lineHeight: '1.7',
              color: '#091D33',
              fontWeight: '600',
              textAlign: 'center',
              maxWidth: '800px',
              margin: '0 auto 40px',
            }}
          >
            {t.snpIntro}
          </p>

          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              overflow: 'auto',
              boxShadow: '0 4px 30px rgba(0,0,0,0.06)',
            }}
          >
            <div style={{ minWidth: '700px' }}>
              {/* Header */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1.5fr',
                  backgroundColor: '#209DA7',
                  color: 'white',
                  fontSize: '13px',
                  fontWeight: '700',
                }}
              >
                <div style={{ padding: '14px 20px', borderRight: '1px solid rgba(255,255,255,0.2)' }}>{t.snpColGene}</div>
                <div style={{ padding: '14px 20px', borderRight: '1px solid rgba(255,255,255,0.2)' }}>{t.snpColSNP}</div>
                <div style={{ padding: '14px 20px' }}>{t.snpColFunc}</div>
              </div>
              {t.snpRows.map((row: { gene: string; desc: string; snp: string; poly: string; func: string }, i: number) => (
                <div
                  key={i}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1.5fr',
                    borderBottom: i < t.snpRows.length - 1 ? '1px solid #F3F4F6' : 'none',
                    fontSize: '13px',
                    color: '#3D3D3D',
                  }}
                >
                  <div style={{ padding: '14px 20px', borderRight: '1px solid #F3F4F6' }}>
                    <span style={{ fontWeight: '700', color: '#091D33', display: 'block' }}>{row.gene}</span>
                    <span style={{ fontSize: '12px', color: '#6B7280' }}>{row.desc}</span>
                  </div>
                  <div style={{ padding: '14px 20px', borderRight: '1px solid #F3F4F6' }}>
                    <span style={{ fontWeight: '600', color: '#209DA7', display: 'block' }}>{row.snp}</span>
                    <span style={{ fontSize: '12px', color: '#6B7280', whiteSpace: 'pre-line' }}>{row.poly}</span>
                  </div>
                  <div style={{ padding: '14px 20px', lineHeight: '1.5' }}>{row.func}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================= */}
      {/* SECTION 10: NUTRI CONCLUSION */}
      {/* ============================================= */}
      <section
        className="doc-section"
        style={{
          padding: 'clamp(60px, 8vw, 100px) 0',
          backgroundColor: '#FFFFFF',
        }}
      >
        <div className="container-main">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '24px',
                marginBottom: '40px',
                flexWrap: 'wrap',
              }}
            >
              {['🧑', '→', '🧪', '→', '📖'].map((icon, i) => (
                <div
                  key={i}
                  style={{
                    width: i % 2 === 1 ? 'auto' : '70px',
                    height: i % 2 === 1 ? 'auto' : '70px',
                    borderRadius: '50%',
                    backgroundColor: i % 2 === 1 ? 'transparent' : '#F0F0F0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: i % 2 === 1 ? '24px' : '30px',
                    color: i % 2 === 1 ? '#9CA3AF' : undefined,
                  }}
                >
                  {icon}
                </div>
              ))}
            </div>
            <p style={{ fontSize: '17px', lineHeight: '1.8', color: '#3D3D3D', fontStyle: 'italic' }}>
              {t.nutriConclusion}
            </p>
          </div>
        </div>
      </section>

      {/* ============================================= */}
      {/* SECTION 11: CONFERENCES */}
      {/* ============================================= */}
      <section
        className="doc-section"
        style={{
          padding: 'clamp(60px, 8vw, 120px) 0',
          background: 'linear-gradient(135deg, #F8FDFD 0%, #FFF9F0 100%)',
        }}
      >
        <div className="container-main">
          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 42px)',
              fontWeight: '800',
              color: '#091D33',
              marginBottom: '20px',
              textAlign: 'center',
            }}
          >
            <span style={{ color: '#EC910C' }}>{t.confTitle.split(' | ')[0]}</span>
            {' | '}
            {t.confTitle.split(' | ')[1]}
          </h2>
          <p
            style={{
              fontSize: '15px',
              lineHeight: '1.8',
              color: '#6B7280',
              textAlign: 'center',
              maxWidth: '800px',
              margin: '0 auto 48px',
              fontStyle: 'italic',
            }}
          >
            {t.confSubtitle}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { city: t.conf1, date: t.conf1date },
              { city: t.conf2, date: t.conf2date },
              { city: t.conf3, date: t.conf3date },
            ].map((conf, i) => (
              <div
                key={i}
                className="doc-step-card"
                style={{
                  padding: '32px 24px',
                  borderRadius: '16px',
                  backgroundColor: 'white',
                  border: '1px solid rgba(236,145,12,0.2)',
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: 'linear-gradient(90deg, #EC910C, #209DA7)',
                  }}
                />
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(236,145,12,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                    fontSize: '24px',
                  }}
                >
                  📄
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#091D33', marginBottom: '8px' }}>
                  {conf.city}
                </h3>
                <p style={{ fontSize: '13px', color: '#6B7280' }}>{conf.date}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================= */}
      {/* SECTION 12: WHY GAMMALAB */}
      {/* ============================================= */}
      <section
        className="doc-section"
        style={{
          padding: 'clamp(60px, 8vw, 120px) 0',
          backgroundColor: '#FFFFFF',
        }}
      >
        <div className="container-main">
          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 42px)',
              fontWeight: '800',
              color: '#091D33',
              marginBottom: '16px',
              textAlign: 'center',
            }}
          >
            <span style={{ color: '#EC910C' }}>GL</span> | {t.whyTitle}
          </h2>
          <p
            style={{
              fontSize: '16px',
              color: '#3D3D3D',
              textAlign: 'center',
              maxWidth: '700px',
              margin: '0 auto 48px',
              lineHeight: '1.7',
            }}
          >
            {t.whySubtitle}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 max-w-[800px] mx-auto">
            {[t.whyStep1, t.whyStep2, t.whyStep3, t.whyStep4, t.whyStep5, t.whyStep6].map((step, i) => (
              <div
                key={i}
                className="doc-step-card"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '20px',
                  borderRadius: '14px',
                  backgroundColor: '#F8FDFD',
                  border: '1px solid rgba(32,157,167,0.12)',
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #EC910C, #d4820a)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: '800',
                    fontSize: '16px',
                    flexShrink: 0,
                  }}
                >
                  {i + 1}
                </div>
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#091D33', lineHeight: '1.4' }}>
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================= */}
      {/* SECTION 13: ADVANTAGES */}
      {/* ============================================= */}
      <section
        className="doc-section"
        style={{
          padding: 'clamp(60px, 8vw, 120px) 0',
          background: 'linear-gradient(180deg, #F8FDFD 0%, #F0F9FA 100%)',
        }}
      >
        <div className="container-main">
          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 42px)',
              fontWeight: '800',
              color: '#091D33',
              marginBottom: '48px',
              textAlign: 'center',
            }}
          >
            <span style={{ color: '#EC910C' }}>GL</span> | {t.advTitle}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[900px] mx-auto">
            {[t.adv1, t.adv2, t.adv3, t.adv4, t.adv5, t.adv6, t.adv7].map((adv, i) => (
              <div
                key={i}
                className="doc-feature-card"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '20px 24px',
                  borderRadius: '14px',
                  backgroundColor: 'white',
                  border: '2px solid #EC910C',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                }}
              >
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #EC910C, #d4820a)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <CheckCircle2 size={22} color="white" />
                </div>
                <span style={{ fontSize: '14px', fontWeight: '500', color: '#091D33', lineHeight: '1.5' }}>
                  {adv}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================= */}
      {/* SECTION 14: FINAL */}
      {/* ============================================= */}
      <section
        className="doc-section"
        style={{
          padding: 'clamp(80px, 10vw, 140px) 0',
          background: 'linear-gradient(135deg, #FFFFFF 0%, #F0F9FA 40%, #E0F2F4 100%)',
          textAlign: 'center',
        }}
      >
        <div className="container-main" style={{ maxWidth: '700px' }}>
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #209DA7, #1a8690)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
            }}
          >
            <span style={{ color: 'white', fontWeight: 'bold', fontSize: '24px' }}>G</span>
          </div>
          <h2
            style={{
              fontSize: 'clamp(24px, 3.5vw, 36px)',
              fontWeight: '800',
              color: '#EC910C',
              lineHeight: '1.3',
              marginBottom: '16px',
            }}
          >
            {t.finalTitle}
          </h2>
          <p style={{ fontSize: '17px', lineHeight: '1.8', color: '#3D3D3D' }}>
            {t.finalText}
          </p>
        </div>
      </section>
    </div>
  );
}

// =============================================
// ANALYSIS CATEGORY COMPONENT
// =============================================

function AnalysisCategory({ title, items, color }: { title: string; items: string[]; color: string }) {
  return (
    <div
      style={{
        borderRadius: '16px',
        overflow: 'hidden',
        border: `1px solid ${color}20`,
        backgroundColor: 'white',
        boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
      }}
    >
      <div
        style={{
          padding: '16px 20px',
          backgroundColor: `${color}10`,
          borderBottom: `2px solid ${color}`,
        }}
      >
        <h3 style={{ fontSize: '14px', fontWeight: '700', color, lineHeight: '1.4' }}>
          {title}
        </h3>
      </div>
      <div style={{ padding: '16px 20px' }}>
        {items.map((item, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
              padding: '8px 0',
              borderBottom: i < items.length - 1 ? '1px solid #F3F4F6' : 'none',
            }}
          >
            <div
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: color,
                marginTop: '7px',
                flexShrink: 0,
              }}
            />
            <span style={{ fontSize: '13px', color: '#3D3D3D', lineHeight: '1.6' }}>
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// =============================================
// REGISTRATION FORM
// =============================================

function RegistrationForm({ locale, onSuccess }: { locale: Locale; onSuccess: () => void }) {
  const t = formTranslations[locale] || formTranslations.ru;

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('+7 ');
  const [workplace, setWorkplace] = useState('');

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    let digits = input.replace(/\D/g, '');
    if (digits.length === 0) {
      setPhone('+7 ');
      return;
    }
    if (digits[0] === '8') digits = '7' + digits.slice(1);
    if (digits[0] !== '7') digits = '7' + digits;
    digits = digits.slice(0, 11);

    let formatted = '+7';
    if (digits.length > 1) formatted += ' (' + digits.slice(1, 4);
    if (digits.length >= 4) formatted += ') ';
    if (digits.length > 4) formatted += digits.slice(4, 7);
    if (digits.length > 7) formatted += '-' + digits.slice(7, 9);
    if (digits.length > 9) formatted += '-' + digits.slice(9, 11);

    setPhone(formatted);
  };

  const isPhoneComplete = phone.replace(/\D/g, '').length === 11;
  const [profession, setProfession] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [touched, setTouched] = useState({
    fullName: false,
    phone: false,
    workplace: false,
    profession: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ fullName: true, phone: true, workplace: true, profession: true });

    if (!fullName.trim() || !isPhoneComplete || !workplace.trim() || !profession) {
      return;
    }

    setSending(true);
    setError('');

    try {
      const res = await fetch('/api/doctors/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: fullName.trim(),
          phone: phone.trim(),
          workplace: workplace.trim(),
          profession,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed');
      }

      onSuccess();
    } catch {
      setError(t.error);
      setSending(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px 16px 14px 46px',
    borderRadius: '10px',
    border: '1.5px solid #E5E7EB',
    fontSize: '15px',
    color: '#091D33',
    backgroundColor: 'white',
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  const inputErrorStyle: React.CSSProperties = {
    ...inputStyle,
    borderColor: '#EF4444',
  };

  const iconStyle: React.CSSProperties = {
    position: 'absolute',
    left: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#9CA3AF',
    pointerEvents: 'none',
  };

  return (
    <div className="max-w-[500px] mx-auto">
      <div
        style={{
          backgroundColor: '#e8f5f6',
          borderRadius: '16px',
          padding: '40px 32px',
        }}
      >
        <div className="text-center mb-8">
          <div
            className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
            style={{ backgroundColor: '#209DA7' }}
          >
            <User size={28} color="white" />
          </div>
          <h2
            className="text-[22px] sm:text-[26px] font-semibold mb-2"
            style={{ color: '#091D33' }}
          >
            {t.formTitle}
          </h2>
          <p className="text-[14px]" style={{ color: '#6B7280' }}>
            {t.formSubtitle}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* ФИО */}
          <div>
            <label className="block text-[13px] font-medium mb-1.5" style={{ color: '#374151' }}>
              {t.fullName} <span style={{ color: '#EF4444' }}>*</span>
            </label>
            <div style={{ position: 'relative' }}>
              <User size={18} style={iconStyle} />
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                onBlur={() => setTouched((p) => ({ ...p, fullName: true }))}
                placeholder={t.fullNamePlaceholder}
                style={touched.fullName && !fullName.trim() ? inputErrorStyle : inputStyle}
                onFocus={(e) => (e.target.style.borderColor = '#209DA7')}
              />
            </div>
            {touched.fullName && !fullName.trim() && (
              <p className="text-[12px] mt-1" style={{ color: '#EF4444' }}>{t.required}</p>
            )}
          </div>

          {/* Телефон */}
          <div>
            <label className="block text-[13px] font-medium mb-1.5" style={{ color: '#374151' }}>
              {t.phone} <span style={{ color: '#EF4444' }}>*</span>
            </label>
            <div style={{ position: 'relative' }}>
              <Phone size={18} style={iconStyle} />
              <input
                type="tel"
                value={phone}
                onChange={handlePhoneChange}
                onBlur={() => setTouched((p) => ({ ...p, phone: true }))}
                placeholder={t.phonePlaceholder}
                style={touched.phone && !isPhoneComplete ? inputErrorStyle : inputStyle}
                onFocus={(e) => {
                  e.target.style.borderColor = '#209DA7';
                  if (!phone) setPhone('+7 ');
                }}
              />
            </div>
            {touched.phone && !isPhoneComplete && (
              <p className="text-[12px] mt-1" style={{ color: '#EF4444' }}>{t.required}</p>
            )}
          </div>

          {/* Место работы */}
          <div>
            <label className="block text-[13px] font-medium mb-1.5" style={{ color: '#374151' }}>
              {t.workplace} <span style={{ color: '#EF4444' }}>*</span>
            </label>
            <div style={{ position: 'relative' }}>
              <MapPin size={18} style={iconStyle} />
              <input
                type="text"
                value={workplace}
                onChange={(e) => setWorkplace(e.target.value)}
                onBlur={() => setTouched((p) => ({ ...p, workplace: true }))}
                placeholder={t.workplacePlaceholder}
                style={touched.workplace && !workplace.trim() ? inputErrorStyle : inputStyle}
                onFocus={(e) => (e.target.style.borderColor = '#209DA7')}
              />
            </div>
            {touched.workplace && !workplace.trim() && (
              <p className="text-[12px] mt-1" style={{ color: '#EF4444' }}>{t.required}</p>
            )}
          </div>

          {/* Профессия */}
          <div>
            <label className="block text-[13px] font-medium mb-1.5" style={{ color: '#374151' }}>
              {t.profession} <span style={{ color: '#EF4444' }}>*</span>
            </label>
            <div style={{ position: 'relative' }}>
              <Briefcase size={18} style={iconStyle} />
              <select
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
                onBlur={() => setTouched((p) => ({ ...p, profession: true }))}
                style={{
                  ...(touched.profession && !profession ? inputErrorStyle : inputStyle),
                  appearance: 'none',
                  paddingRight: '42px',
                  color: profession ? '#091D33' : '#9CA3AF',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#209DA7')}
              >
                <option value="" disabled>{t.professionPlaceholder}</option>
                {t.professions.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
              <ChevronDown
                size={18}
                style={{
                  position: 'absolute',
                  right: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#9CA3AF',
                  pointerEvents: 'none',
                }}
              />
            </div>
            {touched.profession && !profession && (
              <p className="text-[12px] mt-1" style={{ color: '#EF4444' }}>{t.required}</p>
            )}
          </div>

          {/* Error */}
          {error && (
            <p className="text-[13px] text-center" style={{ color: '#EF4444' }}>{error}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={sending}
            className="w-full py-3.5 rounded-full text-[15px] font-medium transition-opacity"
            style={{
              backgroundColor: '#209DA7',
              color: 'white',
              opacity: sending ? 0.7 : 1,
              cursor: sending ? 'not-allowed' : 'pointer',
              marginTop: '8px',
            }}
          >
            {sending ? t.sending : t.submit}
          </button>
        </form>
      </div>
    </div>
  );
}
