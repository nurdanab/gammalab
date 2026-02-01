'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import {
  User,
  Phone,
  CheckCircle2,
  MessageCircle,
  X,
  MessageSquare,
  ChevronDown,
} from 'lucide-react';

type Locale = 'ru' | 'kz' | 'en';

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
    formTitle: 'Связаться с нами',
    formSubtitle: 'Оставьте свои контакты и мы свяжемся с вами',
    fullName: 'ФИО',
    fullNamePlaceholder: 'Введите ваше имя',
    phone: 'Номер телефона',
    phonePlaceholder: '+7 (___) ___-__-__',
    comment: 'Комментарий',
    commentPlaceholder: 'Ваш вопрос или комментарий (необязательно)',
    submit: 'Отправить',
    sending: 'Отправка...',
    error: 'Произошла ошибка. Попробуйте ещё раз.',
    success: 'Спасибо! Мы свяжемся с вами.',
    floatingButton: 'Связаться',
  },
  kz: {
    formTitle: 'Бізбен байланысу',
    formSubtitle: 'Байланыс деректеріңізді қалдырыңыз, біз сізбен хабарласамыз',
    fullName: 'Аты-жөні',
    fullNamePlaceholder: 'Атыңызды енгізіңіз',
    phone: 'Телефон нөмірі',
    phonePlaceholder: '+7 (___) ___-__-__',
    comment: 'Пікір',
    commentPlaceholder: 'Сұрағыңыз немесе пікіріңіз (міндетті емес)',
    submit: 'Жіберу',
    sending: 'Жіберілуде...',
    error: 'Қате орын алды. Қайталап көріңіз.',
    success: 'Рахмет! Біз сізбен хабарласамыз.',
    floatingButton: 'Байланысу',
  },
  en: {
    formTitle: 'Contact Us',
    formSubtitle: 'Leave your contact details and we will get back to you',
    fullName: 'Full name',
    fullNamePlaceholder: 'Enter your name',
    phone: 'Phone number',
    phonePlaceholder: '+7 (___) ___-__-__',
    comment: 'Comment',
    commentPlaceholder: 'Your question or comment (optional)',
    submit: 'Submit',
    sending: 'Sending...',
    error: 'An error occurred. Please try again.',
    success: 'Thank you! We will contact you.',
    floatingButton: 'Contact',
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
    dir3: 'Next-generation sequencing (NGS)',
    contactBtn: 'Связаться с нами',
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
    dir3: 'Next-generation sequencing (NGS)',
    contactBtn: 'Бізбен байланысу',
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
    dir3: 'Next-generation sequencing (NGS)',
    contactBtn: 'Contact Us',
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
  return <DoctorsContent locale={locale} />;
}

// =============================================
// DOCTORS CONTENT — Simplified
// =============================================

// Custom SVG Icons (outline style, orange on dark blue)
const TestTubeIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#EC910C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 6h18" />
    <path d="M17 6v24c0 6-3 10-3 10h20s-3-4-3-10V6" />
    <path d="M17 20h14" />
    <path d="M17 26h14" />
    <circle cx="21" cy="34" r="2" fill="#EC910C" />
    <circle cx="27" cy="32" r="1.5" fill="#EC910C" />
  </svg>
);

const ShieldCheckIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#EC910C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M24 4L6 12v12c0 11 8 18 18 22 10-4 18-11 18-22V12L24 4z" />
    <path d="M16 24l6 6 10-12" />
  </svg>
);

const DNAHelixIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#EC910C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 6c0 8 6 12 12 12s12 4 12 12" />
    <path d="M36 6c0 8-6 12-12 12S12 22 12 30" />
    <path d="M12 30c0 6 6 12 12 12" />
    <path d="M36 30c0 6-6 12-12 12" />
    <line x1="14" y1="12" x2="34" y2="12" />
    <line x1="14" y1="18" x2="34" y2="18" />
    <line x1="14" y1="30" x2="34" y2="30" />
    <line x1="14" y1="36" x2="34" y2="36" />
  </svg>
);

interface NgsSection {
  title: string;
  items: string[];
}

interface NgsContent {
  description: string;
  descriptionKz: string;
  descriptionEn: string;
  sections: NgsSection[];
  sectionsKz: NgsSection[];
  sectionsEn: NgsSection[];
}

function DoctorsContent({ locale }: { locale: Locale }) {
  const t = contentTranslations[locale] || contentTranslations.ru;
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const [ngsContent, setNgsContent] = useState<NgsContent | null>(null);

  useEffect(() => {
    const fetchNgsContent = async () => {
      try {
        const res = await fetch('/api/ngs-content');
        if (res.ok) {
          const data = await res.json();
          if (data) {
            setNgsContent(data);
          }
        }
      } catch (error) {
        console.error('Error fetching NGS content:', error);
      }
    };
    fetchNgsContent();
  }, []);

  const tspotText = locale === 'ru'
    ? 'Иммунологическое исследование для диагностики туберкулеза методом T-SPOT.TB — это анализ крови, также известный как «тест высвобождения гамма-интерферона» (IGRA), тест для диагностики инфицирования микобактериями туберкулеза.'
    : locale === 'kz'
    ? 'T-SPOT.TB әдісімен туберкулезді диагностикалауға арналған иммунологиялық зерттеу — бұл қан анализі, «гамма-интерферон шығару тесті» (IGRA) деп те аталады.'
    : 'T-SPOT.TB immunological test for tuberculosis diagnosis is a blood test, also known as "Interferon Gamma Release Assay" (IGRA), a test for diagnosing infection with Mycobacterium tuberculosis.';

  const tspotDetails = locale === 'ru'
    ? [
        'В ЧЕМ СУТЬ МЕТОДИКИ ВЫПОЛНЕНИЯ ТЕСТА T-SPOT.TB?',
        'Тестирование T-SPOT.TB проводится «in vitro». При этом выявляется процесс продуцирования гамма-интерферонов Т-лимфоцитами при его встрече с белками ESAT6 и CFP-10 микобактерий туберкулеза.',
        'Наличие заболевания выявляется по числу Т-клеток, реагирующих на присутствие соответствующих туберкулезной палочке антигенов.',
      ]
    : locale === 'kz'
    ? [
        'T-SPOT.TB ТЕСТІН ОРЫНДАУ ӘДІСТЕМЕСІНІҢ МӘНІ НЕДЕ?',
        'T-SPOT.TB тестілеуі «in vitro» жүргізіледі. Бұл кезде Т-лимфоциттердің туберкулез микобактерияларының ESAT6 және CFP-10 ақуыздарымен кездескенде гамма-интерферондарды өндіру процесі анықталады.',
        'Аурудың болуы туберкулез таяқшасына сәйкес антигендердің болуына жауап беретін Т-жасушалардың саны бойынша анықталады.',
      ]
    : [
        'WHAT IS THE ESSENCE OF THE T-SPOT.TB TEST METHODOLOGY?',
        'T-SPOT.TB testing is performed "in vitro". It detects the process of gamma-interferon production by T-lymphocytes when they encounter ESAT6 and CFP-10 proteins of Mycobacterium tuberculosis.',
        'The presence of the disease is detected by the number of T-cells responding to the presence of antigens corresponding to the tuberculosis bacillus.',
      ];

  // Get NGS content based on locale
  const getNgsDescription = () => {
    if (!ngsContent) {
      return locale === 'ru'
        ? 'Информация скоро будет добавлена.'
        : locale === 'kz'
        ? 'Ақпарат жақында қосылады.'
        : 'Information coming soon.';
    }
    if (locale === 'kz') return ngsContent.descriptionKz || ngsContent.description;
    if (locale === 'en') return ngsContent.descriptionEn || ngsContent.description;
    return ngsContent.description;
  };

  const getNgsSections = (): NgsSection[] => {
    if (!ngsContent) return [];
    if (locale === 'kz') return ngsContent.sectionsKz?.length ? ngsContent.sectionsKz : ngsContent.sections || [];
    if (locale === 'en') return ngsContent.sectionsEn?.length ? ngsContent.sectionsEn : ngsContent.sections || [];
    return ngsContent.sections || [];
  };

  const oncoSectionsRu = [
    {
      title: 'ГЕНЕТИЧЕСКИЕ МАРКЕРЫ ПРЕДРАСПОЛОЖЕННОСТИ К РАЗВИТИЮ РАКА МОЛОЧНОЙ ЖЕЛЕЗЫ И РАКА ЯИЧНИКОВ',
      items: [
        'Комплекс: определение 16 герминальных мутаций в генах BRCA1 и BRCA2 методом ПЦР',
      ],
    },
    {
      title: 'ГЕНЕТИЧЕСКИЕ МАРКЕРЫ ЧУВСТВИТЕЛЬНОСТИ/УСТОЙЧИВОСТИ К ТАРГЕТНЫМ ПРОТИВООПУХОЛЕВЫМ ПРЕПАРАТАМ',
      items: [
        'Определение мутации гена KRAS методом ПЦР',
        'Определение мутаций гена NRAS методом ПЦР',
        'Определение комплекса исследований мутаций гена KRAS гена NRAS методом ПЦР',
        'Определение комплекса мутаций в гене EGFR методом ПЦР',
        'Определение мутации V600E в гене BRAF методом ПЦР',
        'Определение дозы гена HER2/neu в геномной ДНК человека с использованием ПЦР в режиме реального времени',
        'Определение мутаций гена PIK3CA методом полимеразной цепной реакции (ПЦР)',
        'Определение мутаций гена IDH1, IDH2 методом полимеразной цепной реакции (ПЦР)',
      ],
    },
    {
      title: 'ИММУНОГИСТОХИМИЧЕСКИЕ ИССЛЕДОВАНИЕ (ИГХ)',
      items: [
        'Определение мутации гена ALK из биоптата опухолевой ткани ИГХ методом',
        'Определение рецептора PD-L1 из биоптата опухолевой ткани ИГХ методом',
        'Стандартизованное ИГХ исследование: рецепторный статус при раке молочной железы (PR, ER, ki67, C-erbB-2 (HER2/neu)',
        'Определение экспрессии белка при транслокации гена ROS1 из биоптата опухолевой ткани ИГХ методом',
        'Определение экспрессии Her2/neu из биоптата опухолевой ткани ИГХ методом',
        'Определение экспрессии Ki-67 из биоптата опухолевой ткани ИГХ методом',
        'Определение белка S100 из биоптата опухолевой ткани ИГХ методом',
        'Определение рецепторов андрогенов (AR) иммуногистохимическим методом',
      ],
    },
    {
      title: 'ЖИДКОСТНАЯ БИОПСИЯ',
      items: [
        'Комплексное исследование по определению содержания циркулирующих опухолевых клеток (ЦОК) в периферической крови',
      ],
    },
  ];

  const oncoSectionsKz = [
    {
      title: 'СҮТ БЕЗІ ЖӘНЕ АНАЛЫҚ БЕЗІ ҚАТЕРЛІ ІСІГІНІҢ ДАМУЫНА БЕЙІМДІЛІКТІҢ ГЕНЕТИКАЛЫҚ МАРКЕРЛЕРІ',
      items: [
        'Кешен: ПТР әдісімен BRCA1 және BRCA2 гендеріндегі 16 герминалды мутацияны анықтау',
      ],
    },
    {
      title: 'ТАРГЕТТІК ҚАТЕРЛІ ІСІККЕ ҚАРСЫ ПРЕПАРАТТАРҒА СЕЗІМТАЛДЫҚ/ТӨЗІМДІЛІКТІҢ ГЕНЕТИКАЛЫҚ МАРКЕРЛЕРІ',
      items: [
        'ПТР әдісімен KRAS генінің мутациясын анықтау',
        'ПТР әдісімен NRAS генінің мутацияларын анықтау',
        'ПТР әдісімен KRAS гені мен NRAS генінің мутацияларын кешенді зерттеу',
        'ПТР әдісімен EGFR геніндегі мутациялар кешенін анықтау',
        'ПТР әдісімен BRAF геніндегі V600E мутациясын анықтау',
        'Нақты уақыт режиміндегі ПТР көмегімен адам геномдық ДНҚ-сындағы HER2/neu генінің дозасын анықтау',
        'Полимеразды тізбекті реакция (ПТР) әдісімен PIK3CA генінің мутацияларын анықтау',
        'Полимеразды тізбекті реакция (ПТР) әдісімен IDH1, IDH2 гендерінің мутацияларын анықтау',
      ],
    },
    {
      title: 'ИММУНОГИСТОХИМИЯЛЫҚ ЗЕРТТЕУ (ИГХ)',
      items: [
        'ИГХ әдісімен ісік тінінің биоптатынан ALK генінің мутациясын анықтау',
        'ИГХ әдісімен ісік тінінің биоптатынан PD-L1 рецепторын анықтау',
        'Стандартталған ИГХ зерттеу: сүт безі қатерлі ісігіндегі рецепторлық статус (PR, ER, ki67, C-erbB-2 (HER2/neu)',
        'ИГХ әдісімен ісік тінінің биоптатынан ROS1 генінің транслокациясындағы ақуыз экспрессиясын анықтау',
        'ИГХ әдісімен ісік тінінің биоптатынан Her2/neu экспрессиясын анықтау',
        'ИГХ әдісімен ісік тінінің биоптатынан Ki-67 экспрессиясын анықтау',
        'ИГХ әдісімен ісік тінінің биоптатынан S100 ақуызын анықтау',
        'Иммуногистохимиялық әдіспен андроген рецепторларын (AR) анықтау',
      ],
    },
    {
      title: 'СҰЙЫҚ БИОПСИЯ',
      items: [
        'Перифериялық қандағы айналымдағы ісік жасушаларының (АІЖ) құрамын анықтау бойынша кешенді зерттеу',
      ],
    },
  ];

  const oncoSectionsEn = [
    {
      title: 'GENETIC MARKERS OF PREDISPOSITION TO BREAST AND OVARIAN CANCER',
      items: [
        'Complex: detection of 16 germline mutations in BRCA1 and BRCA2 genes by PCR method',
      ],
    },
    {
      title: 'GENETIC MARKERS OF SENSITIVITY/RESISTANCE TO TARGETED ANTICANCER DRUGS',
      items: [
        'Detection of KRAS gene mutation by PCR method',
        'Detection of NRAS gene mutations by PCR method',
        'Complex detection of KRAS and NRAS gene mutations by PCR method',
        'Detection of EGFR gene mutation complex by PCR method',
        'Detection of V600E mutation in BRAF gene by PCR method',
        'Detection of HER2/neu gene dose in human genomic DNA using real-time PCR',
        'Detection of PIK3CA gene mutations by polymerase chain reaction (PCR)',
        'Detection of IDH1, IDH2 gene mutations by polymerase chain reaction (PCR)',
      ],
    },
    {
      title: 'IMMUNOHISTOCHEMISTRY (IHC)',
      items: [
        'Detection of ALK gene mutation from tumor tissue biopsy by IHC method',
        'Detection of PD-L1 receptor from tumor tissue biopsy by IHC method',
        'Standardized IHC study: receptor status in breast cancer (PR, ER, ki67, C-erbB-2 (HER2/neu)',
        'Detection of protein expression in ROS1 gene translocation from tumor tissue biopsy by IHC method',
        'Detection of Her2/neu expression from tumor tissue biopsy by IHC method',
        'Detection of Ki-67 expression from tumor tissue biopsy by IHC method',
        'Detection of S100 protein from tumor tissue biopsy by IHC method',
        'Detection of androgen receptors (AR) by immunohistochemistry method',
      ],
    },
    {
      title: 'LIQUID BIOPSY',
      items: [
        'Comprehensive study for detection of circulating tumor cells (CTC) content in peripheral blood',
      ],
    },
  ];

  const getOncoSections = () => {
    if (locale === 'kz') return oncoSectionsKz;
    if (locale === 'en') return oncoSectionsEn;
    return oncoSectionsRu;
  };

  const directions = [
    {
      title: t.dir1,
      icon: TestTubeIcon,
      description: '',
      details: [],
      sections: getOncoSections(),
    },
    {
      title: t.dir2,
      icon: ShieldCheckIcon,
      description: tspotText,
      details: tspotDetails,
      sections: [],
    },
    {
      title: t.dir3,
      icon: DNAHelixIcon,
      description: getNgsDescription(),
      details: [],
      sections: getNgsSections(),
    },
  ];

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .accordion-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s ease, padding 0.4s ease;
        }
        .accordion-content.open {
          max-height: 1200px;
        }
        .accordion-card {
          transition: all 0.3s ease;
        }
        .accordion-card:hover {
          transform: translateY(-4px);
        }
        .chevron-icon {
          transition: transform 0.3s ease;
        }
        .chevron-icon.open {
          transform: rotate(180deg);
        }
      `}</style>

      {/* Fixed Background */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/images/hero-about.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#091D33]/50 via-[#091D33]/30 to-[#091D33]/50" />
      </div>

      {/* Hero Section */}
      <section
        className="relative"
        style={{
          paddingTop: '140px',
          paddingBottom: '80px',
        }}
      >

        <div className="relative z-10 px-5 sm:px-8 md:px-12 lg:px-20">
          <div className="text-center max-w-4xl mx-auto mb-12" style={{ animation: 'fadeInUp 0.6s ease-out' }}>
            {/* Title */}
            <h1
              style={{
                fontSize: 'clamp(32px, 5vw, 48px)',
                fontWeight: '700',
                lineHeight: '1.2',
                color: 'white',
                marginBottom: '16px',
                textShadow: '0 2px 20px rgba(0,0,0,0.3)',
              }}
            >
              {t.directionsTitle}
            </h1>

            {/* Subtitle */}
            <p
              style={{
                fontSize: 'clamp(15px, 2vw, 18px)',
                color: 'rgba(255,255,255,0.85)',
                lineHeight: '1.6',
                maxWidth: '600px',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              Диагностическая лаборатория GammaLab
            </p>
          </div>

          {/* Accordion Cards */}
          <div className="max-w-4xl mx-auto flex flex-col gap-4">
            {directions.map((dir, i) => {
              const Icon = dir.icon;
              const isOpen = openAccordion === i;
              return (
                <div
                  key={i}
                  className="accordion-card"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.95)',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
                  }}
                >
                  {/* Header - clickable */}
                  <button
                    onClick={() => toggleAccordion(i)}
                    className="w-full flex items-center gap-5 text-left"
                    style={{
                      padding: '24px 28px',
                    }}
                  >
                    {/* Icon */}
                    <div
                      style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '14px',
                        backgroundColor: '#091D33',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Icon />
                    </div>

                    {/* Title */}
                    <div className="flex-1">
                      <h3
                        style={{
                          fontSize: '20px',
                          fontWeight: '600',
                          color: '#091D33',
                          lineHeight: '1.3',
                        }}
                      >
                        {dir.title}
                      </h3>
                      <p
                        style={{
                          fontSize: '14px',
                          color: '#6B7280',
                          marginTop: '6px',
                        }}
                      >
                        {locale === 'ru' ? 'Подробнее' : locale === 'kz' ? 'Толығырақ' : 'Read more'} →
                      </p>
                    </div>

                    {/* Chevron */}
                    <ChevronDown
                      size={24}
                      color="#209DA7"
                      className={`chevron-icon ${isOpen ? 'open' : ''}`}
                    />
                  </button>

                  {/* Content - expandable */}
                  <div className={`accordion-content ${isOpen ? 'open' : ''}`}>
                    <div
                      style={{
                        padding: isOpen ? '0 28px 28px 28px' : '0 28px',
                        borderTop: '1px solid #E5E7EB',
                      }}
                    >
                      {/* For sections (oncogenetics) */}
                      {dir.sections && dir.sections.length > 0 ? (
                        <div style={{ marginTop: '20px' }}>
                          {dir.sections.map((section, si) => (
                            <div key={si} style={{ marginBottom: '24px' }}>
                              <h4
                                style={{
                                  fontSize: '14px',
                                  fontWeight: '600',
                                  color: '#209DA7',
                                  marginBottom: '12px',
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.5px',
                                }}
                              >
                                {section.title}
                              </h4>
                              <ul style={{ margin: 0, paddingLeft: '20px' }}>
                                {section.items.map((item, ii) => (
                                  <li
                                    key={ii}
                                    style={{
                                      fontSize: '14px',
                                      color: '#374151',
                                      lineHeight: '1.6',
                                      marginBottom: '8px',
                                    }}
                                  >
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <>
                          {dir.description && (
                            <p
                              style={{
                                fontSize: '15px',
                                color: '#374151',
                                lineHeight: '1.7',
                                marginTop: '20px',
                                marginBottom: '16px',
                              }}
                            >
                              {dir.description}
                            </p>
                          )}
                          {dir.details.length > 0 && (
                            <ul style={{ margin: 0, paddingLeft: '20px' }}>
                              {dir.details.map((detail, j) => (
                                <li
                                  key={j}
                                  style={{
                                    fontSize: '14px',
                                    color: '#4B5563',
                                    lineHeight: '1.6',
                                    marginBottom: '8px',
                                  }}
                                >
                                  {detail}
                                </li>
                              ))}
                            </ul>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Contact Button */}
          <div className="text-center mt-10">
            <button
              onClick={() => setIsPopupOpen(true)}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-[16px] transition-all hover:scale-105 hover:shadow-xl"
              style={{
                backgroundColor: '#EC910C',
                color: 'white',
                boxShadow: '0 8px 30px rgba(236,145,12,0.4)',
              }}
            >
              <MessageCircle size={22} />
              {t.contactBtn}
            </button>
          </div>
        </div>
      </section>

      {/* Popup */}
      {isPopupOpen && (
        <ContactFormPopup locale={locale} onClose={() => setIsPopupOpen(false)} />
      )}
    </div>
  );
}

// =============================================
// CONTACT FORM POPUP
// =============================================

function ContactFormPopup({ locale, onClose }: { locale: Locale; onClose: () => void }) {
  const t = formTranslations[locale] || formTranslations.ru;

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('+7 ');
  const [comment, setComment] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSending(true);
    setError('');

    try {
      const res = await fetch('/api/doctors/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: fullName.trim() || 'Не указано',
          phone: phone.trim() || 'Не указано',
          comment: comment.trim() || '',
        }),
      });

      if (!res.ok) {
        throw new Error('Failed');
      }

      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
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

  const iconStyle: React.CSSProperties = {
    position: 'absolute',
    left: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#9CA3AF',
    pointerEvents: 'none',
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[450px] max-h-[90vh] overflow-y-auto"
        style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '32px 28px',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
          animation: 'popupIn 0.3s ease-out',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
          style={{ color: '#6B7280' }}
        >
          <X size={20} />
        </button>

        {success ? (
          <div className="text-center py-8">
            <div
              className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{ backgroundColor: '#10B981' }}
            >
              <CheckCircle2 size={32} color="white" />
            </div>
            <p className="text-[18px] font-medium" style={{ color: '#091D33' }}>
              {t.success}
            </p>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <div
                className="w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center"
                style={{ backgroundColor: '#209DA7' }}
              >
                <MessageCircle size={26} color="white" />
              </div>
              <h2
                className="text-[20px] sm:text-[22px] font-semibold mb-1"
                style={{ color: '#091D33' }}
              >
                {t.formTitle}
              </h2>
              <p className="text-[13px]" style={{ color: '#6B7280' }}>
                {t.formSubtitle}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* ФИО */}
              <div>
                <label className="block text-[13px] font-medium mb-1.5" style={{ color: '#374151' }}>
                  {t.fullName}
                </label>
                <div style={{ position: 'relative' }}>
                  <User size={18} style={iconStyle} />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={t.fullNamePlaceholder}
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = '#209DA7')}
                    onBlur={(e) => (e.target.style.borderColor = '#E5E7EB')}
                  />
                </div>
              </div>

              {/* Телефон */}
              <div>
                <label className="block text-[13px] font-medium mb-1.5" style={{ color: '#374151' }}>
                  {t.phone}
                </label>
                <div style={{ position: 'relative' }}>
                  <Phone size={18} style={iconStyle} />
                  <input
                    type="tel"
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder={t.phonePlaceholder}
                    style={inputStyle}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#209DA7';
                      if (!phone) setPhone('+7 ');
                    }}
                    onBlur={(e) => (e.target.style.borderColor = '#E5E7EB')}
                  />
                </div>
              </div>

              {/* Комментарий */}
              <div>
                <label className="block text-[13px] font-medium mb-1.5" style={{ color: '#374151' }}>
                  {t.comment}
                </label>
                <div style={{ position: 'relative' }}>
                  <MessageSquare size={18} style={{ ...iconStyle, top: '20px', transform: 'none' }} />
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder={t.commentPlaceholder}
                    rows={3}
                    style={{
                      ...inputStyle,
                      resize: 'none',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#209DA7')}
                    onBlur={(e) => (e.target.style.borderColor = '#E5E7EB')}
                  />
                </div>
              </div>

              {/* Error */}
              {error && (
                <p className="text-[13px] text-center" style={{ color: '#EF4444' }}>{error}</p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={sending}
                className="w-full py-3.5 rounded-full text-[15px] font-medium transition-all hover:opacity-90"
                style={{
                  backgroundColor: '#209DA7',
                  color: 'white',
                  opacity: sending ? 0.7 : 1,
                  cursor: sending ? 'not-allowed' : 'pointer',
                  marginTop: '4px',
                }}
              >
                {sending ? t.sending : t.submit}
              </button>
            </form>
          </>
        )}
      </div>

      <style>{`
        @keyframes popupIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
