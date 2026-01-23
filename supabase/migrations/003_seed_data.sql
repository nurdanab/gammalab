-- Seed data migration
-- Generated from JSON files

-- ============ CATEGORIES ============
INSERT INTO categories (id, slug, name, name_kz, name_en) VALUES (
  '3c0c108b-01f2-e3a4-7890-f79c015c47b3',
  'general',
  'Общеклинические исследования',
  'Жалпы клиникалық зерттеулер',
  'General Clinical Studies'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO categories (id, slug, name, name_kz, name_en) VALUES (
  '459bb454-eeb8-3856-f071-b7803e49645e',
  'immunology',
  'Иммунологические исследования',
  'Иммунологиялық зерттеулер',
  'Immunological Studies'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO categories (id, slug, name, name_kz, name_en) VALUES (
  '650fe591-44da-65e5-1a2b-7fdace0b936f',
  'histology',
  'Гистологические исследования',
  'Гистологиялық зерттеулер',
  'Histological Studies'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO categories (id, slug, name, name_kz, name_en) VALUES (
  '53989d08-3e8b-bc67-58f9-9b6de94f7aa8',
  'molecular',
  'Молекулярно-генетические исследования',
  'Молекулалық-генетикалық зерттеулер',
  'Molecular Genetic Studies'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO categories (id, slug, name, name_kz, name_en) VALUES (
  '2f0febb8-6f13-37f8-155b-86c3425622ea',
  'hormones',
  'Гормоны',
  'Гормондар',
  'Hormones'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO categories (id, slug, name, name_kz, name_en) VALUES (
  '7ac87f3a-6d6f-826f-ca4b-d5281c5a4986',
  'pcr',
  'ПЦР исследования',
  'ПТР зерттеулері',
  'PCR Studies'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO categories (id, slug, name, name_kz, name_en) VALUES (
  '1e2f4cb6-55b1-3e9b-7605-9193b3505545',
  'ifa',
  'ИФА исследования',
  'ИФА зерттеулері',
  'ELISA Studies'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO categories (id, slug, name, name_kz, name_en) VALUES (
  'e8684e61-8f4e-2b17-a0fa-e5e4acd03e29',
  'ihc',
  'Иммуногистохимия (ИГХ)',
  'Иммуногистохимия (ИГХ)',
  'Immunohistochemistry (IHC)'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO categories (id, slug, name, name_kz, name_en) VALUES (
  'abfdb8b6-a017-8c2c-5377-653ff57888de',
  'biochemistry',
  'Биохимия',
  'Биохимия',
  'Biochemistry'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO categories (id, slug, name, name_kz, name_en) VALUES (
  'f98019df-4876-7c1e-01d5-a3a4e815cf87',
  'oncology',
  'Онкомаркеры',
  'Онкомаркерлер',
  'Tumor Markers'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO categories (id, slug, name, name_kz, name_en) VALUES (
  '25e7f8a0-c8eb-e7ff-160b-f77d25a23034',
  'hematology',
  'Гематология',
  'Гематология',
  'Hematology'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO categories (id, slug, name, name_kz, name_en) VALUES (
  'c1625f8b-e163-6f0e-b4d7-0e4416d6f4e1',
  'autoimmune',
  'Диагностика аутоиммунных заболеваний',
  'Аутоиммунды аурулардың диагностикасы',
  'Autoimmune Disease Diagnostics'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO categories (id, slug, name, name_kz, name_en) VALUES (
  '273a1b31-6324-f4eb-b186-afad0b46fa77',
  'covid',
  'Исследования на COVID-19',
  'COVID-19 зерттеулері',
  'COVID-19 Testing'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO categories (id, slug, name, name_kz, name_en) VALUES (
  '85f7fbc5-abbe-cc5e-02fc-a56d975e54f1',
  'tuberculosis',
  'Диагностика туберкулеза',
  'Туберкулез диагностикасы',
  'Tuberculosis Diagnostics'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO categories (id, slug, name, name_kz, name_en) VALUES (
  '2585721c-ce0d-c1d2-15da-e2ac61cc4dbe',
  'pregnancy',
  'Диагностика беременности',
  'Жүктілік диагностикасы',
  'Pregnancy Diagnostics'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO categories (id, slug, name, name_kz, name_en) VALUES (
  '555e8127-aaf9-03a0-fd08-a859984fb0dd',
  'prenatal',
  'Пренатальный скрининг',
  'Пренаталдық скрининг',
  'Prenatal Screening'
) ON CONFLICT (id) DO NOTHING;


-- ============ HOMEPAGE SERVICES ============
INSERT INTO homepage_services (id, title, title_kz, title_en, description, description_kz, description_en, icon, "order") VALUES (
  'b5613fe5-0064-0f0e-56db-5363c31f5364',
  'Лабораторные анализы',
  'Зертханалық талдаулар',
  'Laboratory Tests',
  'Более 500 видов анализов с высокой точностью результатов',
  'Нәтижелердің жоғары дәлдігімен 500-ден астам талдау түрлері',
  'Over 500 types of tests with high accuracy results',
  'flask',
  1
) ON CONFLICT (id) DO NOTHING;

INSERT INTO homepage_services (id, title, title_kz, title_en, description, description_kz, description_en, icon, "order") VALUES (
  'c51a5e84-686b-3b92-ba46-f1b4a2ed1481',
  'Быстрые результаты',
  'Жылдам нәтижелер',
  'Fast Results',
  'Большинство анализов готовы в течение 24 часов',
  'Көптеген талдаулар 24 сағат ішінде дайын',
  'Most tests ready within 24 hours',
  'clock',
  2
) ON CONFLICT (id) DO NOTHING;

INSERT INTO homepage_services (id, title, title_kz, title_en, description, description_kz, description_en, icon, "order") VALUES (
  '3e90eab6-d6ae-d5ab-aff4-79301ede5480',
  'Онлайн-запись',
  'Онлайн жазылу',
  'Online Booking',
  'Удобная запись на анализы через сайт или по телефону',
  'Сайт немесе телефон арқылы талдауларға ыңғайлы жазылу',
  'Convenient test booking via website or phone',
  'calendar',
  3
) ON CONFLICT (id) DO NOTHING;

INSERT INTO homepage_services (id, title, title_kz, title_en, description, description_kz, description_en, icon, "order") VALUES (
  'fb04e378-e0f7-0b49-441a-04a9c6f4566f',
  'Выезд на дом',
  'Үйге шығу',
  'Home Visit',
  'Забор анализов у вас дома в удобное время',
  'Ыңғайлы уақытта сіздің үйіңізде талдау жинау',
  'Sample collection at your home at a convenient time',
  'home',
  4
) ON CONFLICT (id) DO NOTHING;

INSERT INTO homepage_services (id, title, title_kz, title_en, description, description_kz, description_en, icon, "order") VALUES (
  'ebad1aa8-4c5d-7ec8-c417-8c4750ea0e2b',
  'Современное оборудование',
  'Заманауи жабдықтар',
  'Modern Equipment',
  'Используем новейшее оборудование мировых производителей',
  'Әлемдік өндірушілердің ең жаңа жабдықтарын қолданамыз',
  'We use the latest equipment from world manufacturers',
  'microscope',
  5
) ON CONFLICT (id) DO NOTHING;

INSERT INTO homepage_services (id, title, title_kz, title_en, description, description_kz, description_en, icon, "order") VALUES (
  '64cbaf95-bd75-20fc-760a-4364ba4c390c',
  'Квалифицированный персонал',
  'Білікті персонал',
  'Qualified Staff',
  'Опытные специалисты с медицинским образованием',
  'Медициналық білімі бар тәжірибелі мамандар',
  'Experienced specialists with medical education',
  'users',
  6
) ON CONFLICT (id) DO NOTHING;


-- ============ REVIEWS ============
INSERT INTO reviews (id, name, name_kz, name_en, text, text_kz, text_en, rating, date, photo, show_on_homepage, "order") VALUES (
  '4e1e84e2-95d0-8791-8eb4-5689fb499be5',
  'Алия Касымова',
  'Алия Қасымова',
  'Aliya Kasymova',
  'Отличная лаборатория! Быстро, качественно и профессионально. Результаты пришли в тот же день. Персонал очень вежливый и внимательный.',
  'Тамаша зертхана! Тез, сапалы және кәсіби. Нәтижелер сол күні келді. Персонал өте сыпайы және мұқият.',
  'Excellent laboratory! Fast, quality and professional. Results came the same day. Staff is very polite and attentive.',
  4,
  '2026-01-10',
  'https://static-cse.canva.com/blob/191106/00_verzosa_winterlandscapes_jakob-owens-tb-2640x1485.jpg',
  true,
  1
) ON CONFLICT (id) DO NOTHING;

INSERT INTO reviews (id, name, name_kz, name_en, text, text_kz, text_en, rating, date, photo, show_on_homepage, "order") VALUES (
  'de2287b7-379a-04e4-a0f7-6f3ac27dbc37',
  'Марат Ахметов',
  'Марат Ахметов',
  'Marat Akhmetov',
  'Пользуюсь услугами GammaLab уже год. Всегда довольна результатами. Особенно нравится возможность получить результаты онлайн.',
  'GammaLab қызметтерін бір жылдан бері пайдаланып келемін. Нәтижелерге әрқашан ризамын. Әсіресе нәтижелерді онлайн алу мүмкіндігі ұнайды.',
  'I have been using GammaLab services for a year now. Always satisfied with the results. I especially like the ability to get results online.',
  5,
  '2026-01-08',
  NULL,
  true,
  2
) ON CONFLICT (id) DO NOTHING;

INSERT INTO reviews (id, name, name_kz, name_en, text, text_kz, text_en, rating, date, photo, show_on_homepage, "order") VALUES (
  'ef7ff634-0b3d-344f-95fd-853fd2b5d2a4',
  'Динара Сейтова',
  'Динара Сейтова',
  'Dinara Seitova',
  'Очень удобное расположение филиала, парковка рядом. Анализы сдала за 10 минут, никаких очередей. Рекомендую!',
  'Филиалдың орналасуы өте ыңғайлы, тұрақ жанында. Анализдерді 10 минутта тапсырдым, ешқандай кезек жоқ. Ұсынамын!',
  'Very convenient branch location, parking nearby. Tests done in 10 minutes, no queues. I recommend!',
  5,
  '2026-01-05',
  NULL,
  true,
  3
) ON CONFLICT (id) DO NOTHING;

INSERT INTO reviews (id, name, name_kz, name_en, text, text_kz, text_en, rating, date, photo, show_on_homepage, "order") VALUES (
  'eb1370da-377d-e81d-ab7f-9f1ed8b0c1cf',
  'Арман Жумабеков',
  'Арман Жұмабеков',
  'Arman Zhumabekov',
  'Сдавал комплексный анализ крови. Результат получил на следующий день. Цены адекватные, качество отличное.',
  'Қанның кешенді анализін тапсырдым. Нәтижені келесі күні алдым. Бағалар қолайлы, сапасы керемет.',
  'Did a comprehensive blood test. Got the result the next day. Prices are reasonable, quality is excellent.',
  4,
  '2026-01-03',
  NULL,
  true,
  4
) ON CONFLICT (id) DO NOTHING;

INSERT INTO reviews (id, name, name_kz, name_en, text, text_kz, text_en, rating, date, photo, show_on_homepage, "order") VALUES (
  'ff578019-d3cb-0910-84ab-de27d275e86a',
  'Гульнара Тасмагамбетова',
  'Гүлнара Тасмағамбетова',
  'Gulnara Tasmagambetova',
  'Приятно удивлена качеством обслуживания. Медсестра взяла кровь очень аккуратно, даже не почувствовала. Буду обращаться снова.',
  'Қызмет көрсету сапасына қуандым. Медбике қанды өте ұқыпты алды, сезінбедім де. Қайта хабарласамын.',
  'Pleasantly surprised by the quality of service. The nurse took blood very carefully, I didn''t even feel it. Will come again.',
  5,
  '2026-01-01',
  NULL,
  false,
  5
) ON CONFLICT (id) DO NOTHING;


-- ============ HOMEPAGE CATEGORIES ============
INSERT INTO homepage_categories (id, name, name_kz, name_en, description, description_kz, description_en, description2, description2_kz, description2_en, tags, tags_kz, tags_en, "order", featured) VALUES (
  '4e7b908c-307e-56c1-7eb8-4681ac6130df',
  'Кардиология',
  'Кардиология',
  'Cardiology',
  'Комплексная диагностика сердечно-сосудистой системы. Современные методы исследования позволяют выявить заболевания на ранних стадиях.',
  'Жүрек-қан тамырлары жүйесінің кешенді диагностикасы. Заманауи зерттеу әдістері аурулардың ерте сатысында анықтауға мүмкіндік береді.',
  'Comprehensive cardiovascular system diagnostics. Modern research methods allow for early detection of diseases.',
  'Профессиональная команда кардиологов обеспечивает точную диагностику и индивидуальный подход к каждому пациенту.',
  'Кардиологтардың кәсіби командасы дәл диагностика және әр пациентке жеке тәсілді қамтамасыз етеді.',
  'Our professional team of cardiologists provides accurate diagnostics and an individual approach to each patient.',
  ARRAY['ЭКГ диагностика', 'Холтер мониторинг', 'УЗИ сердца'],
  ARRAY['ЭКГ диагностикасы', 'Холтер мониторинг', 'Жүрек УДЗ'],
  ARRAY['ECG diagnostics', 'Holter monitoring', 'Heart ultrasound'],
  1,
  true
) ON CONFLICT (id) DO NOTHING;

INSERT INTO homepage_categories (id, name, name_kz, name_en, description, description_kz, description_en, description2, description2_kz, description2_en, tags, tags_kz, tags_en, "order", featured) VALUES (
  '6d4653b8-dbad-4b32-f22a-b42bb56c628d',
  'Лабораторный анализ',
  'Зертханалық талдау',
  'Laboratory tests',
  'Широкий спектр лабораторных исследований для точной диагностики. Более 500 видов анализов с использованием современного оборудования.',
  'Дәл диагностика үшін зертханалық зерттеулердің кең спектрі. Заманауи жабдықтарды пайдалана отырып, 500-ден астам талдау түрлері.',
  'Wide range of laboratory tests for accurate diagnostics. Over 500 types of analyses using modern equipment.',
  'Результаты большинства анализов готовы в течение 24 часов.',
  'Көптеген талдаулардың нәтижелері 24 сағат ішінде дайын.',
  'Results of most tests are ready within 24 hours.',
  ARRAY['Общий анализ крови', 'Биохимия', 'Гормоны'],
  ARRAY['Жалпы қан анализі', 'Биохимия', 'Гормондар'],
  ARRAY['Complete blood count', 'Biochemistry', 'Hormones'],
  2,
  false
) ON CONFLICT (id) DO NOTHING;

INSERT INTO homepage_categories (id, name, name_kz, name_en, description, description_kz, description_en, description2, description2_kz, description2_en, tags, tags_kz, tags_en, "order", featured) VALUES (
  '7f297c32-2d0e-de90-8b4c-4ce67f4cab71',
  'Гинекология',
  'Гинекология',
  'Gynecology',
  'Комплексная диагностика женского здоровья. Современные методы исследования и индивидуальный подход.',
  'Әйелдер денсаулығының кешенді диагностикасы. Заманауи зерттеу әдістері және жеке тәсіл.',
  'Comprehensive women''s health diagnostics. Modern research methods and individual approach.',
  'Профессиональная команда специалистов обеспечивает качественную диагностику.',
  'Мамандардың кәсіби командасы сапалы диагностиканы қамтамасыз етеді.',
  'Professional team of specialists provides quality diagnostics.',
  ARRAY['УЗИ малого таза', 'Анализы на гормоны', 'ПЦР диагностика'],
  ARRAY['Кіші жамбас УДЗ', 'Гормондарға анализ', 'ПТР диагностикасы'],
  ARRAY['Pelvic ultrasound', 'Hormone tests', 'PCR diagnostics'],
  3,
  false
) ON CONFLICT (id) DO NOTHING;

INSERT INTO homepage_categories (id, name, name_kz, name_en, description, description_kz, description_en, description2, description2_kz, description2_en, tags, tags_kz, tags_en, "order", featured) VALUES (
  'b5e7b544-e9db-f04a-1b61-152afa2b7b88',
  'Патология',
  'Патология',
  'Pathology',
  'Гистологические и цитологические исследования для точной диагностики заболеваний.',
  'Аурулардың дәл диагностикасы үшін гистологиялық және цитологиялық зерттеулер.',
  'Histological and cytological studies for accurate diagnosis of diseases.',
  'Современное оборудование и опытные специалисты.',
  'Заманауи жабдықтар және тәжірибелі мамандар.',
  'Modern equipment and experienced specialists.',
  ARRAY['Гистология', 'Цитология', 'Биопсия'],
  ARRAY['Гистология', 'Цитология', 'Биопсия'],
  ARRAY['Histology', 'Cytology', 'Biopsy'],
  4,
  false
) ON CONFLICT (id) DO NOTHING;

INSERT INTO homepage_categories (id, name, name_kz, name_en, description, description_kz, description_en, description2, description2_kz, description2_en, tags, tags_kz, tags_en, "order", featured) VALUES (
  '8f4f675b-9bbf-412e-da2c-554b4bf923b2',
  'Педиатрия',
  'Педиатрия',
  'Pediatrics',
  'Специализированные анализы для детей всех возрастов с учетом особенностей детского организма.',
  'Балалар ағзасының ерекшеліктерін ескере отырып, барлық жастағы балаларға арналған мамандандырылған талдаулар.',
  'Specialized tests for children of all ages, taking into account the characteristics of the child''s body.',
  'Комфортные условия и опытный персонал для работы с детьми.',
  'Балалармен жұмыс істеуге арналған жайлы жағдайлар және тәжірибелі персонал.',
  'Comfortable conditions and experienced staff for working with children.',
  ARRAY['Детские анализы', 'Вакцинация', 'Скрининг'],
  ARRAY['Балалар анализдері', 'Вакцинация', 'Скрининг'],
  ARRAY['Children''s tests', 'Vaccination', 'Screening'],
  5,
  false
) ON CONFLICT (id) DO NOTHING;

INSERT INTO homepage_categories (id, name, name_kz, name_en, description, description_kz, description_en, description2, description2_kz, description2_en, tags, tags_kz, tags_en, "order", featured) VALUES (
  '3dea389e-c615-eb50-b55e-d33e61405989',
  'Неврология',
  'Неврология',
  'Neurology',
  'Диагностика заболеваний нервной системы с использованием современных методов исследования.',
  'Заманауи зерттеу әдістерін қолдана отырып, жүйке жүйесі ауруларының диагностикасы.',
  'Diagnosis of nervous system diseases using modern research methods.',
  'Комплексный подход к диагностике неврологических заболеваний.',
  'Неврологиялық аурулардың диагностикасына кешенді тәсіл.',
  'Comprehensive approach to the diagnosis of neurological diseases.',
  ARRAY['ЭЭГ', 'МРТ', 'Нейровизуализация'],
  ARRAY['ЭЭГ', 'МРТ', 'Нейровизуализация'],
  ARRAY['EEG', 'MRI', 'Neuroimaging'],
  6,
  false
) ON CONFLICT (id) DO NOTHING;


-- ============ NEWS ============
INSERT INTO news (id, slug, title, title_kz, title_en, excerpt, excerpt_kz, excerpt_en, content, content_kz, content_en, image, category, published_at, featured) VALUES (
  'f82a8840-6994-fadd-29c4-82e97cfd6448',
  'tses-aktsiya',
  'тсес акция',
  'тсес акция',
  'тсес акция',
  'Тестовая акция',
  'Тестовая акция',
  'Тестовая акция',
  '',
  '',
  '',
  'https://media.istockphoto.com/id/517188688/ru/%D1%84%D0%BE%D1%82%D0%BE/%D0%B3%D0%BE%D1%80%D0%BD%D1%8B%D0%B9-%D0%BB%D0%B0%D0%BD%D0%B4%D1%88%D0%B0%D1%84%D1%82.jpg?s=612x612&w=0&k=20&c=6Qfb5YCLIkiq_hYxRmTj8t2FWwr4Yrdq2CRGVwj5Ymk=',
  'promotion',
  '2026-01-23',
  true
) ON CONFLICT (id) DO NOTHING;

INSERT INTO news (id, slug, title, title_kz, title_en, excerpt, excerpt_kz, excerpt_en, content, content_kz, content_en, image, category, published_at, featured) VALUES (
  '993a76af-0f82-e738-860b-08fdc051ffc3',
  'testovye-novosti',
  'Тестовые новости',
  'Тестовые новости',
  'Тестовые новости',
  'краткое описание новостей',
  'краткое описание новостей',
  'краткое описание новостей',
  'полный текст',
  '',
  '',
  'https://s0.rbk.ru/v6_top_pics/media/img/5/46/756038770746465.jpg',
  'news',
  '2026-01-20',
  true
) ON CONFLICT (id) DO NOTHING;

INSERT INTO news (id, slug, title, title_kz, title_en, excerpt, excerpt_kz, excerpt_en, content, content_kz, content_en, image, category, published_at, featured) VALUES (
  'b00e5c98-73c2-a377-66a9-4d11c19131e8',
  'new-branch-opening',
  'Открытие нового филиала в Астане',
  'Астанада жаңа филиалдың ашылуы',
  'New Branch Opening in Astana',
  'Рады сообщить об открытии нового филиала GammaLab в центре Астаны.',
  'Астана орталығында GammaLab жаңа филиалының ашылғанын хабарлауға қуаныштымыз.',
  'We are pleased to announce the opening of a new GammaLab branch in central Astana.',
  'Мы рады сообщить об открытии нового филиала лаборатории GammaLab!

Адрес: г. Астана, ул. Кунаева, 14/1

Часы работы:
Пн-Пт: 7:00 - 20:00
Сб: 8:00 - 16:00
Вс: выходной

В честь открытия — скидка 15% на все анализы в первую неделю!',
  'GammaLab зертханасының жаңа филиалының ашылғанын хабарлауға қуаныштымыз!

Мекенжайы: Астана қ., Кунаев к-сі, 14/1

Жұмыс уақыты:
Дс-Жм: 7:00 - 20:00
Сн: 8:00 - 16:00
Жс: демалыс

Ашылу құрметіне - бірінші аптада барлық анализдерге 15% жеңілдік!',
  'We are pleased to announce the opening of a new GammaLab laboratory branch!

Address: Astana, Kunayev St., 14/1

Working hours:
Mon-Fri: 7:00 AM - 8:00 PM
Sat: 8:00 AM - 4:00 PM
Sun: closed

In honor of the opening - 15% discount on all tests in the first week!',
  'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=400&fit=crop',
  'news',
  '2026-01-15',
  true
) ON CONFLICT (id) DO NOTHING;

INSERT INTO news (id, slug, title, title_kz, title_en, excerpt, excerpt_kz, excerpt_en, content, content_kz, content_en, image, category, published_at, featured) VALUES (
  '04f886bf-57f9-0709-35c4-a0f972032380',
  'covid-testing-update',
  'Обновление протокола тестирования на COVID-19',
  'COVID-19 тестілеу хаттамасын жаңарту',
  'COVID-19 Testing Protocol Update',
  'Информация о новых методах и сроках тестирования на коронавирус.',
  'Коронавирусқа тестілеудің жаңа әдістері мен мерзімдері туралы ақпарат.',
  'Information about new methods and timelines for coronavirus testing.',
  'В связи с обновлением рекомендаций МЗ РК, мы обновили протокол тестирования на COVID-19.

Доступные тесты:
- ПЦР-тест (результат за 24 часа)
- Экспресс-тест на антиген (результат за 30 минут)
- Тест на антитела IgG/IgM

Записаться можно по телефону или через форму на сайте.',
  'ҚР ДСМ ұсынымдарының жаңартылуына байланысты біз COVID-19 тестілеу хаттамасын жаңарттық.

Қолжетімді тестілер:
- ПТР-тест (нәтиже 24 сағатта)
- Антигенге экспресс-тест (нәтиже 30 минутта)
- IgG/IgM антиденелеріне тест',
  'Due to updated recommendations from the Ministry of Health, we have updated our COVID-19 testing protocol.

Available tests:
- PCR test (results in 24 hours)
- Rapid antigen test (results in 30 minutes)
- IgG/IgM antibody test',
  'https://images.unsplash.com/photo-1584483766114-2cea6facdf57?w=800&h=400&fit=crop',
  'news',
  '2026-01-12',
  true
) ON CONFLICT (id) DO NOTHING;

INSERT INTO news (id, slug, title, title_kz, title_en, excerpt, excerpt_kz, excerpt_en, content, content_kz, content_en, image, category, published_at, featured) VALUES (
  '05959e4e-b153-d8bf-8ad8-d775fdddf08a',
  'new-equipment',
  'Новое оборудование для диагностики',
  'Диагностикаға арналған жаңа жабдық',
  'New Diagnostic Equipment',
  'Мы приобрели современное оборудование для более точной диагностики.',
  'Дәлірек диагностика үшін заманауи жабдықтар сатып алдық.',
  'We have acquired modern equipment for more accurate diagnostics.',
  'GammaLab продолжает совершенствовать качество услуг!

Мы установили новейшее оборудование от ведущих мировых производителей:
- Анализатор крови Sysmex XN-1000
- Биохимический анализатор Cobas 6000
- Иммунохимический анализатор Alinity

Это позволяет получать результаты быстрее и с высокой точностью.',
  'GammaLab қызмет сапасын жетілдіруді жалғастыруда!

Біз әлемдік жетекші өндірушілерден ең жаңа жабдықтар орнаттық:
- Sysmex XN-1000 қан анализаторы
- Cobas 6000 биохимиялық анализаторы
- Alinity иммунохимиялық анализаторы',
  'GammaLab continues to improve service quality!

We have installed the latest equipment from leading global manufacturers:
- Sysmex XN-1000 blood analyzer
- Cobas 6000 biochemical analyzer
- Alinity immunochemical analyzer',
  'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=400&fit=crop',
  'news',
  '2026-01-08',
  false
) ON CONFLICT (id) DO NOTHING;

INSERT INTO news (id, slug, title, title_kz, title_en, excerpt, excerpt_kz, excerpt_en, content, content_kz, content_en, image, category, published_at, featured) VALUES (
  '6fd76477-2aea-385b-0545-d6818392ab0f',
  'spring-checkup-promotion',
  'Весенний чек-ап со скидкой 20%',
  'Көктемгі тексеру 20% жеңілдікпен',
  'Spring Check-up with 20% Discount',
  'Пройдите комплексное обследование организма по специальной цене до конца марта.',
  'Наурыз айының соңына дейін арнайы бағамен организмді кешенді тексеруден өтіңіз.',
  'Get a comprehensive body examination at a special price until the end of March.',
  'Весна — лучшее время для того, чтобы позаботиться о своём здоровье!

Что входит в чек-ап:
- Общий анализ крови
- Биохимический анализ крови
- Анализ мочи
- Проверка уровня витаминов
- Консультация терапевта

Стоимость со скидкой: 24 000 тенге вместо 30 000 тенге

Акция действует до 31 марта 2026 года.',
  'Көктем - денсаулығыңызға қамқорлық жасаудың ең жақсы уақыты!

Тексеруге не кіреді:
- Жалпы қан анализі
- Биохимиялық қан анализі
- Несеп анализі
- Дәрумендер деңгейін тексеру
- Терапевтпен кеңес

Жеңілдікпен бағасы: 30 000 теңгенің орнына 24 000 теңге',
  'Spring is the best time to take care of your health!

What''s included in the check-up:
- Complete blood count
- Blood biochemistry
- Urinalysis
- Vitamin level check
- Therapist consultation

Discounted price: 24,000 tenge instead of 30,000 tenge',
  'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=400&fit=crop',
  'promotion',
  '2026-01-10',
  true
) ON CONFLICT (id) DO NOTHING;

INSERT INTO news (id, slug, title, title_kz, title_en, excerpt, excerpt_kz, excerpt_en, content, content_kz, content_en, image, category, published_at, featured) VALUES (
  'dd40cea2-346e-47f6-748d-906b64a82033',
  'family-discount',
  'Семейная скидка 15%',
  'Отбасылық жеңілдік 15%',
  'Family Discount 15%',
  'При обследовании всей семьи скидка 15% на все анализы.',
  'Бүкіл отбасын тексергенде барлық анализдерге 15% жеңілдік.',
  '15% discount on all tests when examining the whole family.',
  'Позаботьтесь о здоровье всей семьи!

При одновременном обследовании 3 и более членов семьи предоставляется скидка 15% на все анализы.

Условия акции:
- Обследование проводится в один день
- Минимум 3 человека
- Скидка не суммируется с другими акциями

Акция действует постоянно.',
  'Бүкіл отбасының денсаулығына қамқорлық жасаңыз!

Отбасының 3 және одан көп мүшесін бір мезгілде тексергенде барлық анализдерге 15% жеңілдік беріледі.

Акция шарттары:
- Тексеру бір күнде жүргізіледі
- Кемінде 3 адам
- Жеңілдік басқа акциялармен қосылмайды',
  'Take care of your whole family''s health!

When examining 3 or more family members at the same time, a 15% discount is provided on all tests.

Promotion terms:
- Examination is carried out on the same day
- Minimum 3 people
- Discount cannot be combined with other promotions',
  'https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=800&h=400&fit=crop',
  'promotion',
  '2026-01-05',
  true
) ON CONFLICT (id) DO NOTHING;

INSERT INTO news (id, slug, title, title_kz, title_en, excerpt, excerpt_kz, excerpt_en, content, content_kz, content_en, image, category, published_at, featured) VALUES (
  'faac318f-70c7-43f5-84a9-95a469d23b3a',
  'seniors-discount',
  'Скидка для пенсионеров 10%',
  'Зейнеткерлерге 10% жеңілдік',
  '10% Discount for Seniors',
  'Постоянная скидка 10% для пенсионеров на все виды анализов.',
  'Зейнеткерлерге анализдердің барлық түрлеріне тұрақты 10% жеңілдік.',
  'Permanent 10% discount for seniors on all types of tests.',
  'GammaLab заботится о старшем поколении!

Всем пенсионерам предоставляется постоянная скидка 10% на все виды анализов.

Для получения скидки необходимо предъявить пенсионное удостоверение.

Скидка действует во всех филиалах GammaLab.',
  'GammaLab үлкен буын туралы қамқорлық жасайды!

Барлық зейнеткерлерге анализдердің барлық түрлеріне тұрақты 10% жеңілдік беріледі.

Жеңілдік алу үшін зейнеткер куәлігін көрсету қажет.',
  'GammaLab cares about the older generation!

All seniors receive a permanent 10% discount on all types of tests.

To receive the discount, you must present your pension certificate.',
  'https://images.unsplash.com/photo-1447005497901-b3e9ee359928?w=800&h=400&fit=crop',
  'promotion',
  '2026-01-03',
  false
) ON CONFLICT (id) DO NOTHING;


-- ============ ANALYSES ============
INSERT INTO analyses (id, slug, name, name_kz, name_en, description, description_kz, description_en, category_id, price, collection_price, deadline, deadline_kz, deadline_en, biomaterial, biomaterial_kz, biomaterial_en, preparation, preparation_kz, preparation_en) VALUES (
  '500b075d-30d3-70c2-8170-8f577f11f708',
  'prolactin',
  'Пролактин с определением макропролактина',
  'Макропролактинді анықтаумен пролактин',
  'Prolactin with macroprolactin determination',
  'Исследование уровня пролактина в крови с определением макропролактина для диагностики гиперпролактинемии и оценки функции гипофиза.',
  'Гиперпролактинемияны диагностикалау және гипофиз функциясын бағалау үшін макропролактинді анықтаумен қандағы пролактин деңгейін зерттеу.',
  'Blood prolactin level test with macroprolactin determination for diagnosing hyperprolactinemia and assessing pituitary function.',
  '2f0febb8-6f13-37f8-155b-86c3425622ea',
  5280,
  500,
  '3 рабочих дня',
  '3 жұмыс күні',
  '3 working days',
  'Венозная кровь',
  'Көктамырлық қан',
  'Venous blood',
  'Кровь сдается утром натощак, через 8-12 часов после последнего приема пищи. За 24 часа до исследования исключить физические и эмоциональные нагрузки, алкоголь. За 3 часа до исследования не курить.',
  'Қан таңертең ашқарынға, соңғы тамақтанудан кейін 8-12 сағаттан соң тапсырылады. Зерттеуге дейін 24 сағат бұрын физикалық және эмоционалдық жүктемелерді, алкогольді алып тастаңыз. Зерттеуге дейін 3 сағат бұрын темекі шекпеңіз.',
  'Blood should be taken in the morning on an empty stomach, 8-12 hours after the last meal. Exclude physical and emotional stress, alcohol 24 hours before the test. Do not smoke 3 hours before the test.'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO analyses (id, slug, name, name_kz, name_en, description, description_kz, description_en, category_id, price, collection_price, deadline, deadline_kz, deadline_en, biomaterial, biomaterial_kz, biomaterial_en, preparation, preparation_kz, preparation_en) VALUES (
  'c3913475-798c-3dfe-3f43-795b4ea9bdde',
  '17-oh-progesterone',
  '17-ОН Прогестерон (17-ОП)',
  '17-ОН Прогестерон (17-ОП)',
  '17-OH Progesterone (17-OHP)',
  'Определение уровня 17-гидроксипрогестерона для диагностики врожденной гиперплазии надпочечников и нарушений стероидогенеза.',
  'Бүйрек үсті безінің туа біткен гиперплазиясын және стероидогенез бұзылыстарын диагностикалау үшін 17-гидроксипрогестерон деңгейін анықтау.',
  'Determination of 17-hydroxyprogesterone level for diagnosing congenital adrenal hyperplasia and steroidogenesis disorders.',
  '2f0febb8-6f13-37f8-155b-86c3425622ea',
  2800,
  500,
  '3-5 рабочих дней',
  '3-5 жұмыс күні',
  '3-5 working days',
  'Венозная кровь',
  'Көктамырлық қан',
  'Venous blood',
  'Кровь сдается утром натощак. Женщинам рекомендуется сдавать на 3-5 день менструального цикла.',
  'Қан таңертең ашқарынға тапсырылады. Әйелдерге етеккір циклінің 3-5 күні тапсыру ұсынылады.',
  'Blood should be taken in the morning on an empty stomach. Women are recommended to take the test on days 3-5 of the menstrual cycle.'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO analyses (id, slug, name, name_kz, name_en, description, description_kz, description_en, category_id, price, collection_price, deadline, deadline_kz, deadline_en, biomaterial, biomaterial_kz, biomaterial_en, preparation, preparation_kz, preparation_en) VALUES (
  '84f56cf6-1e40-96f4-6443-c8b6ae352c57',
  'shbg',
  'Глобулин, связывающий половые гормоны (ГСПГ)',
  'Жыныстық гормондарды байланыстыратын глобулин (ЖГБГ)',
  'Sex Hormone Binding Globulin (SHBG)',
  'Определение уровня ГСПГ для оценки биодоступности половых гормонов и диагностики гормональных нарушений.',
  'Жыныстық гормондардың биоқолжетімділігін бағалау және гормональды бұзылыстарды диагностикалау үшін ЖГБГ деңгейін анықтау.',
  'Determination of SHBG level to assess bioavailability of sex hormones and diagnose hormonal disorders.',
  '2f0febb8-6f13-37f8-155b-86c3425622ea',
  4950,
  500,
  '2 рабочих дня',
  '2 жұмыс күні',
  '2 working days',
  'Венозная кровь',
  'Көктамырлық қан',
  'Venous blood',
  'Кровь сдается утром натощак, через 8-12 часов после последнего приема пищи.',
  'Қан таңертең ашқарынға, соңғы тамақтанудан кейін 8-12 сағаттан соң тапсырылады.',
  'Blood should be taken in the morning on an empty stomach, 8-12 hours after the last meal.'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO analyses (id, slug, name, name_kz, name_en, description, description_kz, description_en, category_id, price, collection_price, deadline, deadline_kz, deadline_en, biomaterial, biomaterial_kz, biomaterial_en, preparation, preparation_kz, preparation_en) VALUES (
  '1609fa35-3936-49ec-0826-ee7267776345',
  'somatotropin',
  'Соматотропный гормон (Соматотропин, СТГ)',
  'Соматотропты гормон (Соматотропин, СТГ)',
  'Growth Hormone (Somatotropin, GH)',
  'Определение уровня гормона роста для диагностики заболеваний гипофиза, нарушений роста у детей и акромегалии.',
  'Гипофиз ауруларын, балалардағы өсу бұзылыстарын және акромегалияны диагностикалау үшін өсу гормонының деңгейін анықтау.',
  'Determination of growth hormone level for diagnosing pituitary diseases, growth disorders in children, and acromegaly.',
  '2f0febb8-6f13-37f8-155b-86c3425622ea',
  6600,
  500,
  '2 рабочих дня',
  '2 жұмыс күні',
  '2 working days',
  'Венозная кровь',
  'Көктамырлық қан',
  'Venous blood',
  'Кровь сдается строго утром натощак, в состоянии покоя. За 3 дня до исследования исключить физические нагрузки.',
  'Қан таңертең ашқарынға, тыныштық күйінде тапсырылады. Зерттеуге дейін 3 күн бұрын физикалық жүктемелерді алып тастаңыз.',
  'Blood should be taken strictly in the morning on an empty stomach, at rest. Exclude physical activity 3 days before the test.'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO analyses (id, slug, name, name_kz, name_en, description, description_kz, description_en, category_id, price, collection_price, deadline, deadline_kz, deadline_en, biomaterial, biomaterial_kz, biomaterial_en, preparation, preparation_kz, preparation_en) VALUES (
  '0a3e4b2c-bcf9-746b-30fe-e2f820f9b8f7',
  'igf-1',
  'Инсулиноподобный фактор роста I (ИФР-1)',
  'Инсулин тәрізді өсу факторы I (ИӨФ-1)',
  'Insulin-like Growth Factor I (IGF-1)',
  'Определение уровня ИФР-1 для оценки секреции гормона роста и диагностики нарушений роста.',
  'Өсу гормонының секрециясын бағалау және өсу бұзылыстарын диагностикалау үшін ИӨФ-1 деңгейін анықтау.',
  'Determination of IGF-1 level to assess growth hormone secretion and diagnose growth disorders.',
  '2f0febb8-6f13-37f8-155b-86c3425622ea',
  6050,
  500,
  '3-5 рабочих дней',
  '3-5 жұмыс күні',
  '3-5 working days',
  'Венозная кровь',
  'Көктамырлық қан',
  'Venous blood',
  'Кровь сдается утром натощак, через 8-12 часов после последнего приема пищи.',
  'Қан таңертең ашқарынға, соңғы тамақтанудан кейін 8-12 сағаттан соң тапсырылады.',
  'Blood should be taken in the morning on an empty stomach, 8-12 hours after the last meal.'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO analyses (id, slug, name, name_kz, name_en, description, description_kz, description_en, category_id, price, collection_price, deadline, deadline_kz, deadline_en, biomaterial, biomaterial_kz, biomaterial_en, preparation, preparation_kz, preparation_en) VALUES (
  '8fc36d2d-c38c-9bfc-e92e-183ae843833c',
  'erythropoietin',
  'Эритропоэтин (Erythropoietin)',
  'Эритропоэтин',
  'Erythropoietin',
  'Определение уровня эритропоэтина для диагностики анемий и полицитемий.',
  'Анемиялар мен полицитемияларды диагностикалау үшін эритропоэтин деңгейін анықтау.',
  'Determination of erythropoietin level for diagnosing anemias and polycythemias.',
  '2f0febb8-6f13-37f8-155b-86c3425622ea',
  8250,
  500,
  '3-5 рабочих дней',
  '3-5 жұмыс күні',
  '3-5 working days',
  'Венозная кровь',
  'Көктамырлық қан',
  'Venous blood',
  'Кровь сдается утром натощак.',
  'Қан таңертең ашқарынға тапсырылады.',
  'Blood should be taken in the morning on an empty stomach.'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO analyses (id, slug, name, name_kz, name_en, description, description_kz, description_en, category_id, price, collection_price, deadline, deadline_kz, deadline_en, biomaterial, biomaterial_kz, biomaterial_en, preparation, preparation_kz, preparation_en) VALUES (
  '45a80a28-37ae-be66-ca67-1cd2ef1d90c1',
  'ena-screen',
  'ENA screen (экстрагируемые ядерные антитела)',
  'ENA screen (экстракцияланатын ядролық антиденелер)',
  'ENA screen (Extractable Nuclear Antibodies)',
  'Скрининговое исследование на наличие антител к экстрагируемым ядерным антигенам для диагностики системных аутоиммунных заболеваний.',
  'Жүйелі аутоиммунды аурулардың диагностикасы үшін экстракцияланатын ядролық антигендерге антиденелердің болуына скринингтік зерттеу.',
  'Screening test for antibodies to extractable nuclear antigens for diagnosing systemic autoimmune diseases.',
  'c1625f8b-e163-6f0e-b4d7-0e4416d6f4e1',
  4200,
  500,
  '3-5 рабочих дней',
  '3-5 жұмыс күні',
  '3-5 working days',
  'Венозная кровь',
  'Көктамырлық қан',
  'Venous blood',
  'Кровь сдается утром натощак, специальной подготовки не требуется.',
  'Қан таңертең ашқарынға тапсырылады, арнайы дайындық қажет емес.',
  'Blood should be taken in the morning on an empty stomach, no special preparation required.'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO analyses (id, slug, name, name_kz, name_en, description, description_kz, description_en, category_id, price, collection_price, deadline, deadline_kz, deadline_en, biomaterial, biomaterial_kz, biomaterial_en, preparation, preparation_kz, preparation_en) VALUES (
  '361b36ce-6194-05b3-b19b-305abc94a1a9',
  'anti-histone',
  'Антитела к гистонам (Anti Hyston)',
  'Гистондарға антиденелер',
  'Anti-Histone Antibodies',
  'Определение антител к гистонам для диагностики лекарственной волчанки и системной красной волчанки.',
  'Дәрілік волчанканы және жүйелі қызыл жегіні диагностикалау үшін гистондарға антиденелерді анықтау.',
  'Detection of anti-histone antibodies for diagnosing drug-induced lupus and systemic lupus erythematosus.',
  'c1625f8b-e163-6f0e-b4d7-0e4416d6f4e1',
  4400,
  500,
  '3-5 рабочих дней',
  '3-5 жұмыс күні',
  '3-5 working days',
  'Венозная кровь',
  'Көктамырлық қан',
  'Venous blood',
  'Кровь сдается утром натощак.',
  'Қан таңертең ашқарынға тапсырылады.',
  'Blood should be taken in the morning on an empty stomach.'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO analyses (id, slug, name, name_kz, name_en, description, description_kz, description_en, category_id, price, collection_price, deadline, deadline_kz, deadline_en, biomaterial, biomaterial_kz, biomaterial_en, preparation, preparation_kz, preparation_en) VALUES (
  '308c6a01-0598-dcdb-8a48-2cec644541d6',
  'anti-ssa',
  'Антитела к компоненту SS-A (Ro)',
  'SS-A (Ro) компонентіне антиденелер',
  'Anti-SS-A (Ro) Antibodies',
  'Определение антител к SS-A для диагностики синдрома Шегрена и системной красной волчанки.',
  'Шегрен синдромын және жүйелі қызыл жегіні диагностикалау үшін SS-A антиденелерін анықтау.',
  'Detection of anti-SS-A antibodies for diagnosing Sjögren syndrome and systemic lupus erythematosus.',
  'c1625f8b-e163-6f0e-b4d7-0e4416d6f4e1',
  3850,
  500,
  '3-5 рабочих дней',
  '3-5 жұмыс күні',
  '3-5 working days',
  'Венозная кровь',
  'Көктамырлық қан',
  'Venous blood',
  'Кровь сдается утром натощак.',
  'Қан таңертең ашқарынға тапсырылады.',
  'Blood should be taken in the morning on an empty stomach.'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO analyses (id, slug, name, name_kz, name_en, description, description_kz, description_en, category_id, price, collection_price, deadline, deadline_kz, deadline_en, biomaterial, biomaterial_kz, biomaterial_en, preparation, preparation_kz, preparation_en) VALUES (
  '7a3913bd-52ae-54d9-1d06-3d7472cefa3b',
  'c3-complement',
  'С3 компонент комплемента',
  'Комплементтің C3 компоненті',
  'C3 Complement Component',
  'Определение уровня C3 компонента комплемента для оценки состояния иммунной системы и диагностики аутоиммунных заболеваний.',
  'Иммундық жүйенің жағдайын бағалау және аутоиммунды аурулардың диагностикасы үшін комплементтің C3 компонентінің деңгейін анықтау.',
  'Determination of C3 complement component level to assess immune system status and diagnose autoimmune diseases.',
  '459bb454-eeb8-3856-f071-b7803e49645e',
  2200,
  500,
  '2 рабочих дня',
  '2 жұмыс күні',
  '2 working days',
  'Венозная кровь',
  'Көктамырлық қан',
  'Venous blood',
  'Кровь сдается утром натощак.',
  'Қан таңертең ашқарынға тапсырылады.',
  'Blood should be taken in the morning on an empty stomach.'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO analyses (id, slug, name, name_kz, name_en, description, description_kz, description_en, category_id, price, collection_price, deadline, deadline_kz, deadline_en, biomaterial, biomaterial_kz, biomaterial_en, preparation, preparation_kz, preparation_en) VALUES (
  '24ac794f-6f25-9c50-9420-929431b01b45',
  'egfr-mutation',
  'Мутации гена EGFR (методом ПЦР)',
  'EGFR генінің мутациялары (ПТР әдісімен)',
  'EGFR Gene Mutations (PCR method)',
  'Молекулярно-генетическое исследование мутаций гена EGFR для подбора таргетной терапии при немелкоклеточном раке легкого.',
  'Ұсақ емес жасушалы өкпе обырында таргетті терапияны таңдау үшін EGFR генінің мутацияларын молекулалық-генетикалық зерттеу.',
  'Molecular genetic testing of EGFR gene mutations for selecting targeted therapy in non-small cell lung cancer.',
  '7ac87f3a-6d6f-826f-ca4b-d5281c5a4986',
  45000,
  0,
  '7-10 рабочих дней',
  '7-10 жұмыс күні',
  '7-10 working days',
  'Парафиновые блоки опухолевой ткани',
  'Ісік тінінің парафинді блоктары',
  'Paraffin blocks of tumor tissue',
  'Необходимо предоставить парафиновые блоки или стекла с опухолевой тканью, а также копию гистологического заключения.',
  'Ісік тіні бар парафинді блоктарды немесе шынылар мен гистологиялық қорытындының көшірмесін ұсыну қажет.',
  'Paraffin blocks or slides with tumor tissue and a copy of the histological report must be provided.'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO analyses (id, slug, name, name_kz, name_en, description, description_kz, description_en, category_id, price, collection_price, deadline, deadline_kz, deadline_en, biomaterial, biomaterial_kz, biomaterial_en, preparation, preparation_kz, preparation_en) VALUES (
  'cf0d1d57-eb89-8ff4-0ab0-4efea22a8ce0',
  'kras-mutation',
  'Мутации гена KRAS (методом ПЦР)',
  'KRAS генінің мутациялары (ПТР әдісімен)',
  'KRAS Gene Mutations (PCR method)',
  'Молекулярно-генетическое исследование мутаций гена KRAS для определения чувствительности к анти-EGFR терапии при колоректальном раке.',
  'Колоректалды обырда анти-EGFR терапиясына сезімталдықты анықтау үшін KRAS генінің мутацияларын молекулалық-генетикалық зерттеу.',
  'Molecular genetic testing of KRAS gene mutations to determine sensitivity to anti-EGFR therapy in colorectal cancer.',
  '7ac87f3a-6d6f-826f-ca4b-d5281c5a4986',
  42000,
  0,
  '7-10 рабочих дней',
  '7-10 жұмыс күні',
  '7-10 working days',
  'Парафиновые блоки опухолевой ткани',
  'Ісік тінінің парафинді блоктары',
  'Paraffin blocks of tumor tissue',
  'Необходимо предоставить парафиновые блоки или стекла с опухолевой тканью, а также копию гистологического заключения.',
  'Ісік тіні бар парафинді блоктарды немесе шынылар мен гистологиялық қорытындының көшірмесін ұсыну қажет.',
  'Paraffin blocks or slides with tumor tissue and a copy of the histological report must be provided.'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO analyses (id, slug, name, name_kz, name_en, description, description_kz, description_en, category_id, price, collection_price, deadline, deadline_kz, deadline_en, biomaterial, biomaterial_kz, biomaterial_en, preparation, preparation_kz, preparation_en) VALUES (
  '9e578487-58d4-3c3a-4c59-835d42dbfd90',
  'braf-mutation',
  'Мутации гена BRAF V600E (методом ПЦР)',
  'BRAF V600E генінің мутациялары (ПТР әдісімен)',
  'BRAF V600E Gene Mutations (PCR method)',
  'Молекулярно-генетическое исследование мутации BRAF V600E для подбора таргетной терапии при меланоме и других злокачественных новообразованиях.',
  'Меланома және басқа қатерлі ісіктерде таргетті терапияны таңдау үшін BRAF V600E мутациясын молекулалық-генетикалық зерттеу.',
  'Molecular genetic testing of BRAF V600E mutation for selecting targeted therapy in melanoma and other malignancies.',
  '7ac87f3a-6d6f-826f-ca4b-d5281c5a4986',
  38000,
  0,
  '7-10 рабочих дней',
  '7-10 жұмыс күні',
  '7-10 working days',
  'Парафиновые блоки опухолевой ткани',
  'Ісік тінінің парафинді блоктары',
  'Paraffin blocks of tumor tissue',
  'Необходимо предоставить парафиновые блоки или стекла с опухолевой тканью, а также копию гистологического заключения.',
  'Ісік тіні бар парафинді блоктарды немесе шынылар мен гистологиялық қорытындының көшірмесін ұсыну қажет.',
  'Paraffin blocks or slides with tumor tissue and a copy of the histological report must be provided.'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO analyses (id, slug, name, name_kz, name_en, description, description_kz, description_en, category_id, price, collection_price, deadline, deadline_kz, deadline_en, biomaterial, biomaterial_kz, biomaterial_en, preparation, preparation_kz, preparation_en) VALUES (
  '8a10a938-addb-ef7d-02c1-69fd776f44ef',
  'her2-ihc',
  'HER2/neu (иммуногистохимия)',
  'HER2/neu (иммуногистохимия)',
  'HER2/neu (Immunohistochemistry)',
  'Иммуногистохимическое определение экспрессии HER2/neu для оценки показаний к таргетной терапии трастузумабом при раке молочной железы и желудка.',
  'Сүт безі және асқазан обырында трастузумабпен таргетті терапияның көрсеткіштерін бағалау үшін HER2/neu экспрессиясын иммуногистохимиялық анықтау.',
  'Immunohistochemical determination of HER2/neu expression to assess indications for trastuzumab targeted therapy in breast and gastric cancer.',
  'e8684e61-8f4e-2b17-a0fa-e5e4acd03e29',
  25000,
  0,
  '5-7 рабочих дней',
  '5-7 жұмыс күні',
  '5-7 working days',
  'Парафиновые блоки опухолевой ткани',
  'Ісік тінінің парафинді блоктары',
  'Paraffin blocks of tumor tissue',
  'Необходимо предоставить парафиновые блоки с опухолевой тканью и копию гистологического заключения.',
  'Ісік тіні бар парафинді блоктар мен гистологиялық қорытындының көшірмесін ұсыну қажет.',
  'Paraffin blocks with tumor tissue and a copy of the histological report must be provided.'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO analyses (id, slug, name, name_kz, name_en, description, description_kz, description_en, category_id, price, collection_price, deadline, deadline_kz, deadline_en, biomaterial, biomaterial_kz, biomaterial_en, preparation, preparation_kz, preparation_en) VALUES (
  '6a390f80-b141-2a40-0123-48b43417431b',
  'ki67-ihc',
  'Ki-67 (индекс пролиферации)',
  'Ki-67 (пролиферация индексі)',
  'Ki-67 (Proliferation Index)',
  'Иммуногистохимическое определение индекса пролиферации Ki-67 для оценки агрессивности опухоли и прогноза заболевания.',
  'Ісіктің агрессивтілігін және аурудың болжамын бағалау үшін Ki-67 пролиферация индексін иммуногистохимиялық анықтау.',
  'Immunohistochemical determination of Ki-67 proliferation index to assess tumor aggressiveness and disease prognosis.',
  'e8684e61-8f4e-2b17-a0fa-e5e4acd03e29',
  18000,
  0,
  '5-7 рабочих дней',
  '5-7 жұмыс күні',
  '5-7 working days',
  'Парафиновые блоки опухолевой ткани',
  'Ісік тінінің парафинді блоктары',
  'Paraffin blocks of tumor tissue',
  'Необходимо предоставить парафиновые блоки с опухолевой тканью.',
  'Ісік тіні бар парафинді блоктарды ұсыну қажет.',
  'Paraffin blocks with tumor tissue must be provided.'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO analyses (id, slug, name, name_kz, name_en, description, description_kz, description_en, category_id, price, collection_price, deadline, deadline_kz, deadline_en, biomaterial, biomaterial_kz, biomaterial_en, preparation, preparation_kz, preparation_en) VALUES (
  '2d341193-cd60-2864-0472-c7f9bea5a875',
  'pd-l1-ihc',
  'PD-L1 (иммуногистохимия)',
  'PD-L1 (иммуногистохимия)',
  'PD-L1 (Immunohistochemistry)',
  'Иммуногистохимическое определение экспрессии PD-L1 для оценки показаний к иммунотерапии при различных злокачественных новообразованиях.',
  'Әртүрлі қатерлі ісіктерде иммунотерапияның көрсеткіштерін бағалау үшін PD-L1 экспрессиясын иммуногистохимиялық анықтау.',
  'Immunohistochemical determination of PD-L1 expression to assess indications for immunotherapy in various malignancies.',
  'e8684e61-8f4e-2b17-a0fa-e5e4acd03e29',
  35000,
  0,
  '7-10 рабочих дней',
  '7-10 жұмыс күні',
  '7-10 working days',
  'Парафиновые блоки опухолевой ткани',
  'Ісік тінінің парафинді блоктары',
  'Paraffin blocks of tumor tissue',
  'Необходимо предоставить парафиновые блоки с опухолевой тканью и копию гистологического заключения.',
  'Ісік тіні бар парафинді блоктар мен гистологиялық қорытындының көшірмесін ұсыну қажет.',
  'Paraffin blocks with tumor tissue and a copy of the histological report must be provided.'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO analyses (id, slug, name, name_kz, name_en, description, description_kz, description_en, category_id, price, collection_price, deadline, deadline_kz, deadline_en, biomaterial, biomaterial_kz, biomaterial_en, preparation, preparation_kz, preparation_en) VALUES (
  '1e489e24-e510-1540-269a-d47008bfbb76',
  't-spot',
  'T-SPOT.TB (диагностика туберкулеза)',
  'T-SPOT.TB (туберкулез диагностикасы)',
  'T-SPOT.TB (Tuberculosis Diagnostics)',
  'Высокоточный тест для диагностики латентной туберкулезной инфекции. Не дает ложноположительных результатов после вакцинации БЦЖ.',
  'Латентті туберкулезді инфекцияны диагностикалаудың жоғары дәлдіктегі тесті. БЦЖ вакцинациясынан кейін жалған оң нәтижелер бермейді.',
  'High-precision test for diagnosing latent tuberculosis infection. Does not give false positive results after BCG vaccination.',
  '85f7fbc5-abbe-cc5e-02fc-a56d975e54f1',
  22000,
  500,
  '3-5 рабочих дней',
  '3-5 жұмыс күні',
  '3-5 working days',
  'Венозная кровь',
  'Көктамырлық қан',
  'Venous blood',
  'Кровь сдается в любое время суток, не зависимо от приема пищи. Специальной подготовки не требуется.',
  'Қанды тәуліктің кез келген уақытында, тамақтануға байланыссыз тапсыруға болады. Арнайы дайындық қажет емес.',
  'Blood can be taken at any time of day, regardless of food intake. No special preparation required.'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO analyses (id, slug, name, name_kz, name_en, description, description_kz, description_en, category_id, price, collection_price, deadline, deadline_kz, deadline_en, biomaterial, biomaterial_kz, biomaterial_en, preparation, preparation_kz, preparation_en) VALUES (
  '595231fd-8349-283e-322d-cd312e66648e',
  'cbc',
  'Общий анализ крови с лейкоформулой',
  'Лейкоформуласы бар жалпы қан анализі',
  'Complete Blood Count with Differential',
  'Комплексное исследование клеточного состава крови, включающее подсчет эритроцитов, лейкоцитов, тромбоцитов и определение лейкоцитарной формулы.',
  'Эритроциттер, лейкоциттер, тромбоциттер санағын және лейкоцитарлық формуланы анықтауды қамтитын қан жасушалық құрамын кешенді зерттеу.',
  'Comprehensive study of blood cell composition, including counting red blood cells, white blood cells, platelets and determining the leukocyte formula.',
  '3c0c108b-01f2-e3a4-7890-f79c015c47b3',
  1500,
  500,
  '1 рабочий день',
  '1 жұмыс күні',
  '1 working day',
  'Венозная кровь',
  'Көктамырлық қан',
  'Venous blood',
  'Кровь сдается утром натощак или через 4 часа после легкого приема пищи.',
  'Қан таңертең ашқарынға немесе жеңіл тамақтанудан 4 сағат кейін тапсырылады.',
  'Blood should be taken in the morning on an empty stomach or 4 hours after a light meal.'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO analyses (id, slug, name, name_kz, name_en, description, description_kz, description_en, category_id, price, collection_price, deadline, deadline_kz, deadline_en, biomaterial, biomaterial_kz, biomaterial_en, preparation, preparation_kz, preparation_en) VALUES (
  '4dde54d5-e4e9-510d-9aab-ef2cc2b3b610',
  'urinalysis',
  'Общий анализ мочи',
  'Жалпы несеп анализі',
  'Urinalysis',
  'Исследование физико-химических свойств мочи и микроскопия осадка для оценки функции почек и мочевыводящих путей.',
  'Бүйрек және несеп шығару жолдары функциясын бағалау үшін несептің физика-химиялық қасиеттерін зерттеу және тұнбаның микроскопиясы.',
  'Study of physical and chemical properties of urine and sediment microscopy to assess kidney and urinary tract function.',
  '3c0c108b-01f2-e3a4-7890-f79c015c47b3',
  800,
  0,
  '1 рабочий день',
  '1 жұмыс күні',
  '1 working day',
  'Средняя порция утренней мочи',
  'Таңғы несептің орташа порциясы',
  'Midstream morning urine',
  'Собрать среднюю порцию утренней мочи в стерильный контейнер после тщательного туалета наружных половых органов.',
  'Сыртқы жыныс мүшелерін мұқият жууғаннан кейін таңғы несептің орташа порциясын стерильді контейнерге жинаңыз.',
  'Collect midstream morning urine in a sterile container after thorough cleaning of external genitalia.'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO analyses (id, slug, name, name_kz, name_en, description, description_kz, description_en, category_id, price, collection_price, deadline, deadline_kz, deadline_en, biomaterial, biomaterial_kz, biomaterial_en, preparation, preparation_kz, preparation_en) VALUES (
  '34f48d2d-bf0a-b7c0-5462-9153acfa1568',
  'glucose',
  'Глюкоза крови',
  'Қан глюкозасы',
  'Blood Glucose',
  'Определение уровня глюкозы в крови для диагностики и мониторинга сахарного диабета.',
  'Қант диабетін диагностикалау және мониторингтеу үшін қандағы глюкоза деңгейін анықтау.',
  'Determination of blood glucose level for diagnosis and monitoring of diabetes mellitus.',
  'abfdb8b6-a017-8c2c-5377-653ff57888de',
  600,
  500,
  '1 рабочий день',
  '1 жұмыс күні',
  '1 working day',
  'Венозная кровь',
  'Көктамырлық қан',
  'Venous blood',
  'Кровь сдается строго натощак, после 8-14 часов голодания.',
  'Қан қатаң түрде ашқарынға, 8-14 сағат аштықтан кейін тапсырылады.',
  'Blood should be taken strictly on an empty stomach, after 8-14 hours of fasting.'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO analyses (id, slug, name, name_kz, name_en, description, description_kz, description_en, category_id, price, collection_price, deadline, deadline_kz, deadline_en, biomaterial, biomaterial_kz, biomaterial_en, preparation, preparation_kz, preparation_en) VALUES (
  '996e5a20-eb88-1a49-e6b7-44f2013376f0',
  'hba1c',
  'Гликированный гемоглобин (HbA1c)',
  'Гликирленген гемоглобин (HbA1c)',
  'Glycated Hemoglobin (HbA1c)',
  'Определение среднего уровня глюкозы крови за последние 2-3 месяца для оценки компенсации сахарного диабета.',
  'Қант диабетінің компенсациясын бағалау үшін соңғы 2-3 ай ішіндегі қан глюкозасының орташа деңгейін анықтау.',
  'Determination of average blood glucose level over the past 2-3 months to assess diabetes compensation.',
  'abfdb8b6-a017-8c2c-5377-653ff57888de',
  2500,
  500,
  '1-2 рабочих дня',
  '1-2 жұмыс күні',
  '1-2 working days',
  'Венозная кровь',
  'Көктамырлық қан',
  'Venous blood',
  'Специальной подготовки не требуется. Можно сдавать в любое время суток.',
  'Арнайы дайындық қажет емес. Тәуліктің кез келген уақытында тапсыруға болады.',
  'No special preparation required. Can be taken at any time of day.'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO analyses (id, slug, name, name_kz, name_en, description, description_kz, description_en, category_id, price, collection_price, deadline, deadline_kz, deadline_en, biomaterial, biomaterial_kz, biomaterial_en, preparation, preparation_kz, preparation_en) VALUES (
  'c14fd337-53a9-0256-cf56-523df94709ac',
  'psa-total',
  'ПСА общий (простатический специфический антиген)',
  'Жалпы ПСА (простатаға тән антиген)',
  'Total PSA (Prostate-Specific Antigen)',
  'Определение уровня общего ПСА для скрининга и мониторинга рака предстательной железы.',
  'Қуық асты безі обырын скринингтеу және мониторингтеу үшін жалпы ПСА деңгейін анықтау.',
  'Determination of total PSA level for screening and monitoring of prostate cancer.',
  'f98019df-4876-7c1e-01d5-a3a4e815cf87',
  3200,
  500,
  '1-2 рабочих дня',
  '1-2 жұмыс күні',
  '1-2 working days',
  'Венозная кровь',
  'Көктамырлық қан',
  'Venous blood',
  'Кровь сдается натощак. За 7 дней исключить массаж простаты, езду на велосипеде.',
  'Қан ашқарынға тапсырылады. 7 күн бұрын простата массажын, велосипедпен жүруді алып тастаңыз.',
  'Blood should be taken on an empty stomach. Exclude prostate massage and cycling 7 days before.'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO analyses (id, slug, name, name_kz, name_en, description, description_kz, description_en, category_id, price, collection_price, deadline, deadline_kz, deadline_en, biomaterial, biomaterial_kz, biomaterial_en, preparation, preparation_kz, preparation_en) VALUES (
  'dfda590d-bcf4-3e81-405a-9c0192297fb4',
  'ca125',
  'CA-125 (онкомаркер яичников)',
  'CA-125 (аналық бездің онкомаркері)',
  'CA-125 (Ovarian Cancer Marker)',
  'Определение уровня CA-125 для диагностики и мониторинга рака яичников.',
  'Аналық без обырын диагностикалау және мониторингтеу үшін CA-125 деңгейін анықтау.',
  'Determination of CA-125 level for diagnosis and monitoring of ovarian cancer.',
  'f98019df-4876-7c1e-01d5-a3a4e815cf87',
  3500,
  500,
  '1-2 рабочих дня',
  '1-2 жұмыс күні',
  '1-2 working days',
  'Венозная кровь',
  'Көктамырлық қан',
  'Venous blood',
  'Кровь сдается натощак. Женщинам рекомендуется сдавать на 5-7 день менструального цикла.',
  'Қан ашқарынға тапсырылады. Әйелдерге етеккір циклінің 5-7 күні тапсыру ұсынылады.',
  'Blood should be taken on an empty stomach. Women are recommended to take the test on days 5-7 of the menstrual cycle.'
) ON CONFLICT (id) DO NOTHING;


-- ============ SUBMISSIONS ============
INSERT INTO submissions (id, type, first_name, last_name, email, phone, message, rating, analysis_id, analysis_name, preferred_date, created_at) VALUES (
  '4482ec5b-032c-39aa-7912-002bfe008e77',
  'booking',
  'тест',
  NULL,
  NULL,
  '+7 923 283 92 38',
  NULL,
  NULL,
  NULL,
  'Общий анализ крови (ОАК)',
  '2026-01-25',
  '2026-01-18T18:29:45.950Z'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO submissions (id, type, first_name, last_name, email, phone, message, rating, analysis_id, analysis_name, preferred_date, created_at) VALUES (
  'aca5875e-0e2d-6a5a-af23-91352cd9780d',
  'contact',
  'Тест',
  'ТТТ',
  'test.diplom.04@mail.ru',
  '32832832',
  'вывы',
  3,
  NULL,
  NULL,
  NULL,
  '2026-01-18T18:01:59.762Z'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO submissions (id, type, first_name, last_name, email, phone, message, rating, analysis_id, analysis_name, preferred_date, created_at) VALUES (
  '8fa0768e-bda6-8faf-34ff-c02f9d16bc49',
  'contact',
  'Нурдана',
  'Бакытжан',
  'nurdanab2004@gmail.com',
  '7004792109',
  'аооллвкф',
  4,
  NULL,
  NULL,
  NULL,
  '2026-01-18T17:56:09.041Z'
) ON CONFLICT (id) DO NOTHING;

