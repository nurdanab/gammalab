export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  titleKz: string;
  titleEn: string;
  excerpt: string;
  excerptKz: string;
  excerptEn: string;
  content: string;
  contentKz: string;
  contentEn: string;
  image: string;
  category: 'news' | 'promotion' | 'article';
  publishedAt: string;
  featured: boolean;
}

export const news: NewsItem[] = [
  {
    id: '1',
    slug: 'heart-healthy-foods',
    title: '10 продуктов для здоровья сердца',
    titleKz: 'Жүрек денсаулығына арналған 10 өнім',
    titleEn: '10 Foods for Heart Health',
    excerpt: 'Узнайте какие продукты помогут сохранить здоровье вашей сердечно-сосудистой системы.',
    excerptKz: 'Жүрек-қан тамырлары жүйесінің денсаулығын сақтауға қандай өнімдер көмектесетінін біліңіз.',
    excerptEn: 'Learn which foods will help maintain the health of your cardiovascular system.',
    content: `
      <p>Здоровье сердца во многом зависит от того, что мы едим. Правильное питание может значительно снизить риск сердечно-сосудистых заболеваний.</p>

      <h3>1. Жирная рыба</h3>
      <p>Лосось, скумбрия и сардины богаты омега-3 жирными кислотами, которые снижают воспаление и уровень триглицеридов.</p>

      <h3>2. Орехи</h3>
      <p>Грецкие орехи и миндаль содержат полезные жиры, клетчатку и антиоксиданты.</p>

      <h3>3. Ягоды</h3>
      <p>Черника, клубника и малина богаты антоцианами, которые защищают сосуды.</p>

      <h3>4. Овсянка</h3>
      <p>Содержит бета-глюкан, который помогает снизить уровень холестерина.</p>

      <h3>5. Оливковое масло</h3>
      <p>Богато мононенасыщенными жирами и антиоксидантами.</p>
    `,
    contentKz: `
      <p>Жүректің денсаулығы көбінесе біздің не жейтінімізге байланысты. Дұрыс тамақтану жүрек-қан тамырлары ауруларының қаупін айтарлықтай төмендетеді.</p>

      <h3>1. Майлы балық</h3>
      <p>Лосось, скумбрия және сардина омега-3 май қышқылдарына бай, олар қабынуды және триглицеридтер деңгейін төмендетеді.</p>
    `,
    contentEn: `
      <p>Heart health largely depends on what we eat. Proper nutrition can significantly reduce the risk of cardiovascular disease.</p>

      <h3>1. Fatty Fish</h3>
      <p>Salmon, mackerel, and sardines are rich in omega-3 fatty acids, which reduce inflammation and triglyceride levels.</p>
    `,
    image: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=800&h=400&fit=crop',
    category: 'article',
    publishedAt: '2026-01-15',
    featured: true,
  },
  {
    id: '2',
    slug: 'stress-management',
    title: 'Как справиться со стрессом',
    titleKz: 'Стресспен қалай күресуге болады',
    titleEn: 'How to Deal with Stress',
    excerpt: 'Эффективные методы релаксации и управления стрессом в повседневной жизни.',
    excerptKz: 'Күнделікті өмірде релаксация мен стрессті басқарудың тиімді әдістері.',
    excerptEn: 'Effective relaxation and stress management techniques in everyday life.',
    content: `
      <p>Стресс — неизбежная часть современной жизни. Однако существуют проверенные методы, которые помогут вам справиться с ним.</p>

      <h3>Дыхательные упражнения</h3>
      <p>Глубокое дыхание активирует парасимпатическую нервную систему и помогает успокоиться.</p>

      <h3>Физическая активность</h3>
      <p>Регулярные упражнения снижают уровень кортизола и повышают уровень эндорфинов.</p>

      <h3>Медитация</h3>
      <p>Даже 10 минут медитации в день могут значительно снизить уровень стресса.</p>
    `,
    contentKz: `
      <p>Стресс - қазіргі өмірдің сөзсіз бөлігі. Дегенмен, онымен күресуге көмектесетін дәлелденген әдістер бар.</p>
    `,
    contentEn: `
      <p>Stress is an inevitable part of modern life. However, there are proven methods that will help you cope with it.</p>
    `,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=400&fit=crop',
    category: 'article',
    publishedAt: '2026-01-12',
    featured: true,
  },
  {
    id: '3',
    slug: 'immune-system-boost',
    title: 'Укрепление иммунитета',
    titleKz: 'Иммунитетті нығайту',
    titleEn: 'Boosting Your Immune System',
    excerpt: 'Лучшие способы укрепить иммунную систему и защитить организм от инфекций.',
    excerptKz: 'Иммундық жүйені нығайтудың және организмді инфекциялардан қорғаудың ең жақсы жолдары.',
    excerptEn: 'The best ways to strengthen your immune system and protect your body from infections.',
    content: `
      <p>Сильная иммунная система — ключ к здоровью и защите от болезней. Вот несколько способов её укрепить.</p>

      <h3>Витамин D</h3>
      <p>Достаточный уровень витамина D критически важен для иммунной функции.</p>

      <h3>Здоровый сон</h3>
      <p>7-9 часов качественного сна помогают иммунной системе восстанавливаться.</p>

      <h3>Пробиотики</h3>
      <p>Здоровая микрофлора кишечника напрямую влияет на иммунитет.</p>
    `,
    contentKz: `
      <p>Күшті иммундық жүйе - денсаулық пен аурулардан қорғаудың кілті.</p>
    `,
    contentEn: `
      <p>A strong immune system is the key to health and protection from disease.</p>
    `,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&h=400&fit=crop',
    category: 'article',
    publishedAt: '2026-01-10',
    featured: true,
  },
  {
    id: '4',
    slug: 'spring-checkup-promotion',
    title: 'Акция: Весенний чек-ап со скидкой 20%',
    titleKz: 'Акция: Көктемгі тексеру 20% жеңілдікпен',
    titleEn: 'Promotion: Spring Check-up with 20% Discount',
    excerpt: 'Пройдите комплексное обследование организма по специальной цене до конца марта.',
    excerptKz: 'Наурыз айының соңына дейін арнайы бағамен организмді кешенді тексеруден өтіңіз.',
    excerptEn: 'Get a comprehensive body examination at a special price until the end of March.',
    content: `
      <p>Весна — лучшее время для того, чтобы позаботиться о своём здоровье!</p>

      <h3>Что входит в чек-ап:</h3>
      <ul>
        <li>Общий анализ крови</li>
        <li>Биохимический анализ крови</li>
        <li>Анализ мочи</li>
        <li>Проверка уровня витаминов</li>
        <li>Консультация терапевта</li>
      </ul>

      <p><strong>Стоимость со скидкой: 24 000 ₸</strong> вместо 30 000 ₸</p>
    `,
    contentKz: `
      <p>Көктем - денсаулығыңызға қамқорлық жасаудың ең жақсы уақыты!</p>
    `,
    contentEn: `
      <p>Spring is the best time to take care of your health!</p>
    `,
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=400&fit=crop',
    category: 'promotion',
    publishedAt: '2026-01-08',
    featured: false,
  },
  {
    id: '5',
    slug: 'new-branch-opening',
    title: 'Открытие нового филиала в Астане',
    titleKz: 'Астанада жаңа филиалдың ашылуы',
    titleEn: 'New Branch Opening in Astana',
    excerpt: 'Рады сообщить об открытии нового филиала GammaLab в центре Астаны.',
    excerptKz: 'Астана орталығында GammaLab жаңа филиалының ашылғанын хабарлауға қуаныштымыз.',
    excerptEn: 'We are pleased to announce the opening of a new GammaLab branch in central Astana.',
    content: `
      <p>Мы рады сообщить об открытии нового филиала лаборатории GammaLab!</p>

      <h3>Адрес:</h3>
      <p>г. Астана, ул. Кунаева, 14/1</p>

      <h3>Часы работы:</h3>
      <p>Пн-Пт: 7:00 - 20:00<br>Сб: 8:00 - 16:00<br>Вс: выходной</p>

      <p>В честь открытия — скидка 15% на все анализы в первую неделю!</p>
    `,
    contentKz: `
      <p>GammaLab зертханасының жаңа филиалының ашылғанын хабарлауға қуаныштымыз!</p>
    `,
    contentEn: `
      <p>We are pleased to announce the opening of a new GammaLab laboratory branch!</p>
    `,
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=400&fit=crop',
    category: 'news',
    publishedAt: '2026-01-05',
    featured: false,
  },
  {
    id: '6',
    slug: 'covid-testing-update',
    title: 'Обновление протокола тестирования на COVID-19',
    titleKz: 'COVID-19 тестілеу хаттамасын жаңарту',
    titleEn: 'COVID-19 Testing Protocol Update',
    excerpt: 'Информация о новых методах и сроках тестирования на коронавирус.',
    excerptKz: 'Коронавирусқа тестілеудің жаңа әдістері мен мерзімдері туралы ақпарат.',
    excerptEn: 'Information about new methods and timelines for coronavirus testing.',
    content: `
      <p>В связи с обновлением рекомендаций МЗ РК, мы обновили протокол тестирования на COVID-19.</p>

      <h3>Доступные тесты:</h3>
      <ul>
        <li>ПЦР-тест (результат за 24 часа)</li>
        <li>Экспресс-тест на антиген (результат за 30 минут)</li>
        <li>Тест на антитела IgG/IgM</li>
      </ul>
    `,
    contentKz: `
      <p>ҚР ДСМ ұсынымдарының жаңартылуына байланысты біз COVID-19 тестілеу хаттамасын жаңарттық.</p>
    `,
    contentEn: `
      <p>Due to updated recommendations from the Ministry of Health, we have updated our COVID-19 testing protocol.</p>
    `,
    image: 'https://images.unsplash.com/photo-1584483766114-2cea6facdf57?w=800&h=400&fit=crop',
    category: 'news',
    publishedAt: '2026-01-03',
    featured: false,
  },
];

// Helper functions
export function getNewsBySlug(slug: string): NewsItem | undefined {
  return news.find(n => n.slug === slug);
}

export function getNewsById(id: string): NewsItem | undefined {
  return news.find(n => n.id === id);
}

export function getFeaturedNews(limit: number = 3): NewsItem[] {
  return news
    .filter(n => n.featured)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}

export function getLatestNews(limit: number = 6): NewsItem[] {
  return [...news]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}

export function getNewsByCategory(category: NewsItem['category']): NewsItem[] {
  return news
    .filter(n => n.category === category)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function searchNews(query: string, locale: string = 'ru'): NewsItem[] {
  const normalizedQuery = query.toLowerCase().trim();
  if (!normalizedQuery) return news;

  return news.filter(item => {
    const title = locale === 'kz' ? item.titleKz : locale === 'en' ? item.titleEn : item.title;
    const excerpt = locale === 'kz' ? item.excerptKz : locale === 'en' ? item.excerptEn : item.excerpt;

    return title.toLowerCase().includes(normalizedQuery) ||
           excerpt.toLowerCase().includes(normalizedQuery);
  });
}

export function formatDate(dateString: string, locale: string = 'ru'): string {
  const date = new Date(dateString);
  const localeMap: Record<string, string> = {
    ru: 'ru-RU',
    kz: 'kk-KZ',
    en: 'en-US',
  };

  return date.toLocaleDateString(localeMap[locale] || 'ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
