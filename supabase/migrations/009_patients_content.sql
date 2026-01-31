-- Patients page sections
CREATE TABLE IF NOT EXISTS patients_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_ru TEXT NOT NULL,
  title_kz TEXT,
  title_en TEXT,
  slug TEXT UNIQUE NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Patients page blocks within sections
CREATE TABLE IF NOT EXISTS patients_blocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id UUID REFERENCES patients_sections(id) ON DELETE CASCADE,
  block_type TEXT NOT NULL CHECK (block_type IN ('text', 'colored_block', 'list', 'cards', 'faq', 'table', 'contact_block')),
  title_ru TEXT,
  title_kz TEXT,
  title_en TEXT,
  content_ru JSONB DEFAULT '{}',
  content_kz JSONB DEFAULT '{}',
  content_en JSONB DEFAULT '{}',
  settings JSONB DEFAULT '{}',
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_patients_sections_order ON patients_sections(order_index);
CREATE INDEX IF NOT EXISTS idx_patients_blocks_section ON patients_blocks(section_id);
CREATE INDEX IF NOT EXISTS idx_patients_blocks_order ON patients_blocks(order_index);

-- Enable RLS
ALTER TABLE patients_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients_blocks ENABLE ROW LEVEL SECURITY;

-- Policies for public read access
CREATE POLICY "Allow public read patients_sections" ON patients_sections FOR SELECT USING (true);
CREATE POLICY "Allow public read patients_blocks" ON patients_blocks FOR SELECT USING (true);

-- Insert default sections
INSERT INTO patients_sections (id, title_ru, title_kz, title_en, slug, order_index) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Подготовка к анализам', 'Талдауларға дайындық', 'Test Preparation', 'preparation', 0),
  ('22222222-2222-2222-2222-222222222222', 'Правила сдачи биоматериала', 'Биоматериал тапсыру ережелері', 'Biomaterial Collection Rules', 'rules', 1),
  ('33333333-3333-3333-3333-333333333333', 'Сроки выполнения', 'Орындау мерзімдері', 'Turnaround Times', 'deadlines', 2),
  ('44444444-4444-4444-4444-444444444444', 'Часто задаваемые вопросы', 'Жиі қойылатын сұрақтар', 'FAQ', 'faq', 3),
  ('55555555-5555-5555-5555-555555555555', 'Права пациентов', 'Пациенттердің құқықтары', 'Patient Rights', 'rights', 4);

-- =============================================
-- SECTION 1: Подготовка к анализам (preparation)
-- =============================================

-- Block 1: IGRA colored block
INSERT INTO patients_blocks (section_id, block_type, title_ru, title_kz, title_en, content_ru, content_kz, content_en, settings, order_index) VALUES
('11111111-1111-1111-1111-111111111111', 'colored_block', 'IGRA-ТЕСТЫ - Золотой стандарт диагностики латентной туберкулёзной инфекции (ЛТБИ)', 'IGRA-ТЕСТТЕР - Латентті туберкулез инфекциясын диагностикалаудың алтын стандарты (ЛТБИ)', 'IGRA Tests - Gold Standard for Latent TB Infection Diagnosis',
'{"text": "IGRA-тесты — лучшая альтернатива кожным тестам (реакция Манту и Диаскинтест). ELISPOT (T-SPOT.TB) — анализ крови, который обладает высокой достоверностью и даёт результаты через 2 суток."}',
'{"text": "IGRA-тесттер — тері сынамаларына (Манту реакциясы және Диаскинтест) ең жақсы балама. ELISPOT (T-SPOT.TB) — жоғары сенімділікке ие және 2 тәулік ішінде нәтиже беретін қан талдауы."}',
'{"text": "IGRA tests are the best alternative to skin tests (Mantoux test and Diaskintest). ELISPOT (T-SPOT.TB) is a blood test that has high reliability and gives results within 2 days."}',
'{"bgColor": "#f8fafa"}', 0);

-- Block 2: Advantages cards
INSERT INTO patients_blocks (section_id, block_type, title_ru, title_kz, title_en, content_ru, content_kz, content_en, settings, order_index) VALUES
('11111111-1111-1111-1111-111111111111', 'cards', '', '', '',
'{"cards": [{"title": "Подходит для всех", "text": "Тест ELISPOT может пройти любой человек. Противопоказаний для этого теста не существует."}, {"title": "Один визит", "text": "Нужен всего 1 визит в лабораторию — не нужно приходить второй раз для проверки результата."}, {"title": "Без подготовки", "text": "Не требуется специальной подготовки для проведения теста."}]}',
'{"cards": [{"title": "Барлығына жарайды", "text": "ELISPOT тестін кез келген адам өте алады. Бұл тест үшін қарсы көрсетілімдер жоқ."}, {"title": "Бір келу", "text": "Зертханаға тек 1 рет келу қажет — нәтижені тексеру үшін екінші рет келудің қажеті жоқ."}, {"title": "Дайындықсыз", "text": "Тестті өткізу үшін арнайы дайындық қажет емес."}]}',
'{"cards": [{"title": "Suitable for everyone", "text": "Anyone can take the ELISPOT test. There are no contraindications for this test."}, {"title": "One visit", "text": "Only 1 visit to the laboratory is needed — no need to come a second time to check the result."}, {"title": "No preparation", "text": "No special preparation is required for the test."}]}',
'{}', 1);

-- Block 3: General recommendations list
INSERT INTO patients_blocks (section_id, block_type, title_ru, title_kz, title_en, content_ru, content_kz, content_en, settings, order_index) VALUES
('11111111-1111-1111-1111-111111111111', 'list', 'Общие рекомендации', 'Жалпы ұсыныстар', 'General Recommendations',
'{"items": ["Кровь сдаётся натощак (не менее 8 часов после последнего приёма пищи)", "За сутки до исследования исключить алкоголь и жирную пищу", "За 1 час до сдачи крови воздержаться от курения", "Непосредственно перед сдачей крови отдохнуть 10-15 минут"]}',
'{"items": ["Қан аш қарынға тапсырылады (соңғы тамақтанудан кейін кемінде 8 сағат)", "Зерттеуге дейін бір тәулік бұрын алкоголь мен майлы тағамды алып тастаңыз", "Қан тапсыруға дейін 1 сағат бұрын темекі шегуден бас тартыңыз", "Қан тапсырар алдында 10-15 минут демалыңыз"]}',
'{"items": ["Blood is taken on an empty stomach (at least 8 hours after the last meal)", "Exclude alcohol and fatty foods the day before the study", "Refrain from smoking 1 hour before blood donation", "Rest for 10-15 minutes immediately before blood donation"]}',
'{}', 2);

-- =============================================
-- SECTION 2: Правила сдачи биоматериала (rules)
-- =============================================

-- Block 1: Main rule text
INSERT INTO patients_blocks (section_id, block_type, title_ru, title_kz, title_en, content_ru, content_kz, content_en, settings, order_index) VALUES
('22222222-2222-2222-2222-222222222222', 'text', '', '', '',
'{"text": "Забор крови производится из вены в вакутайнер с гепарином NA или гепарином Li."}',
'{"text": "Қан тамырдан гепарин NA немесе гепарин Li бар вакутайнерге алынады."}',
'{"text": "Blood is drawn from a vein into a vacutainer with heparin NA or heparin Li."}',
'{}', 0);

-- Block 2: Volume cards
INSERT INTO patients_blocks (section_id, block_type, title_ru, title_kz, title_en, content_ru, content_kz, content_en, settings, order_index) VALUES
('22222222-2222-2222-2222-222222222222', 'cards', 'Объём крови для исследования', 'Зерттеу үшін қан көлемі', 'Blood Volume for Testing',
'{"cards": [{"title": "6-8 мл", "text": "Взрослые и дети 10 лет и старше"}, {"title": "4 мл", "text": "Дети 2-9 лет"}, {"title": "2 мл", "text": "Дети до 2 лет"}]}',
'{"cards": [{"title": "6-8 мл", "text": "Ересектер және 10 жас және одан үлкен балалар"}, {"title": "4 мл", "text": "2-9 жас аралығындағы балалар"}, {"title": "2 мл", "text": "2 жасқа дейінгі балалар"}]}',
'{"cards": [{"title": "6-8 ml", "text": "Adults and children 10 years and older"}, {"title": "4 ml", "text": "Children 2-9 years"}, {"title": "2 ml", "text": "Children under 2 years"}]}',
'{}', 1);

-- Block 3: Important colored block
INSERT INTO patients_blocks (section_id, block_type, title_ru, title_kz, title_en, content_ru, content_kz, content_en, settings, order_index) VALUES
('22222222-2222-2222-2222-222222222222', 'list', 'Важно знать', 'Маңызды ақпарат', 'Important Information',
'{"items": ["Забор крови осуществляется только в специализированных пунктах или лаборатории", "Используются одноразовые вакуумные системы для безопасности пациента", "После забора крови рекомендуется не снимать повязку в течение 10-15 минут"]}',
'{"items": ["Қан алу тек мамандандырылған пункттерде немесе зертханада жүзеге асырылады", "Пациенттің қауіпсіздігі үшін бір рет қолданылатын вакуумдық жүйелер қолданылады", "Қан алғаннан кейін таңғышты 10-15 минут ішінде алмау ұсынылады"]}',
'{"items": ["Blood collection is carried out only at specialized points or laboratory", "Disposable vacuum systems are used for patient safety", "After blood collection, it is recommended not to remove the bandage for 10-15 minutes"]}',
'{}', 2);

-- =============================================
-- SECTION 3: Сроки выполнения (deadlines)
-- =============================================

-- Block 1: Deadlines table
INSERT INTO patients_blocks (section_id, block_type, title_ru, title_kz, title_en, content_ru, content_kz, content_en, settings, order_index) VALUES
('33333333-3333-3333-3333-333333333333', 'table', '', '', '',
'{"rows": [{"label": "T-SPOT.TB (ELISPOT)", "value": "2-3 рабочих дня"}, {"label": "ПЦР-исследования (KRAS, EGFR, BRAF и др.)", "value": "5-7 рабочих дней"}, {"label": "Иммуногистохимические исследования (ИГХ)", "value": "5-14 рабочих дней"}, {"label": "FISH-исследования", "value": "до 14 рабочих дней"}]}',
'{"rows": [{"label": "T-SPOT.TB (ELISPOT)", "value": "2-3 жұмыс күні"}, {"label": "ПТР-зерттеулер (KRAS, EGFR, BRAF және т.б.)", "value": "5-7 жұмыс күні"}, {"label": "Иммуногистохимиялық зерттеулер (ИГХ)", "value": "5-14 жұмыс күні"}, {"label": "FISH-зерттеулер", "value": "14 жұмыс күніне дейін"}]}',
'{"rows": [{"label": "T-SPOT.TB (ELISPOT)", "value": "2-3 working days"}, {"label": "PCR studies (KRAS, EGFR, BRAF, etc.)", "value": "5-7 working days"}, {"label": "Immunohistochemical studies (IHC)", "value": "5-14 working days"}, {"label": "FISH studies", "value": "up to 14 working days"}]}',
'{}', 0);

-- Block 2: Note
INSERT INTO patients_blocks (section_id, block_type, title_ru, title_kz, title_en, content_ru, content_kz, content_en, settings, order_index) VALUES
('33333333-3333-3333-3333-333333333333', 'colored_block', '', '', '',
'{"text": "Сроки могут варьироваться в зависимости от сложности исследования. Точные сроки уточняйте при оформлении заказа."}',
'{"text": "Мерзімдер зерттеудің күрделілігіне байланысты өзгеруі мүмкін. Нақты мерзімдерді тапсырысты рәсімдеу кезінде нақтылаңыз."}',
'{"text": "Deadlines may vary depending on the complexity of the study. Please check the exact deadlines when placing your order."}',
'{"bgColor": "#f8fafa"}', 1);

-- =============================================
-- SECTION 4: FAQ (faq)
-- =============================================

-- Block 1: FAQ
INSERT INTO patients_blocks (section_id, block_type, title_ru, title_kz, title_en, content_ru, content_kz, content_en, settings, order_index) VALUES
('44444444-4444-4444-4444-444444444444', 'faq', '', '', '',
'{"faqs": [{"question": "Что такое T-SPOT.TB и чем он отличается от Манту?", "answer": "T-SPOT.TB — это современный иммунологический тест на туберкулёз, который проводится по анализу крови. В отличие от Манту, он не требует повторного визита, не даёт ложноположительных результатов у вакцинированных БЦЖ и имеет более высокую точность."}, {"question": "Нужно ли готовиться к тесту T-SPOT.TB?", "answer": "Специальной подготовки не требуется. Рекомендуется сдавать кровь натощак или через 3-4 часа после лёгкого приёма пищи."}, {"question": "Можно ли делать T-SPOT.TB детям?", "answer": "Да, тест можно проводить детям любого возраста. Объём забираемой крови зависит от возраста ребёнка."}, {"question": "Как получить результаты анализов?", "answer": "Результаты отправляются на электронную почту пациента. Также их можно получить лично в лаборатории или через личный кабинет партнёра."}, {"question": "Принимаете ли вы анализы по ГОБМП/ОСМС?", "answer": "Да, наша лаборатория является участником программы ГОБМП и ОСМС. Для прохождения бесплатных исследований необходимо направление от врача."}]}',
'{"faqs": [{"question": "T-SPOT.TB дегеніміз не және ол Мантудан қалай ерекшеленеді?", "answer": "T-SPOT.TB — бұл қан талдауы бойынша жүргізілетін туберкулезге заманауи иммунологиялық тест. Мантуден айырмашылығы, ол қайта келуді қажет етпейді, БЦЖ егілгендерде жалған оң нәтиже бермейді және жоғары дәлдікке ие."}, {"question": "T-SPOT.TB тестіне дайындалу керек пе?", "answer": "Арнайы дайындық қажет емес. Қанды аш қарынға немесе жеңіл тамақтанғаннан кейін 3-4 сағаттан соң тапсыру ұсынылады."}, {"question": "T-SPOT.TB балаларға жасауға бола ма?", "answer": "Иә, тестті кез келген жастағы балаларға жүргізуге болады. Алынатын қан көлемі баланың жасына байланысты."}, {"question": "Талдау нәтижелерін қалай алуға болады?", "answer": "Нәтижелер пациенттің электрондық поштасына жіберіледі. Сондай-ақ оларды зертханадан жеке немесе серіктестің жеке кабинеті арқылы алуға болады."}, {"question": "ТМКК/МӘМС бойынша талдаулар қабылдайсыздар ма?", "answer": "Иә, біздің зертхана ТМКК және МӘМС бағдарламасының қатысушысы болып табылады. Тегін зерттеулерден өту үшін дәрігердің жолдамасы қажет."}]}',
'{"faqs": [{"question": "What is T-SPOT.TB and how does it differ from Mantoux?", "answer": "T-SPOT.TB is a modern immunological test for tuberculosis, which is performed by blood analysis. Unlike Mantoux, it does not require a repeat visit, does not give false-positive results in BCG-vaccinated individuals, and has higher accuracy."}, {"question": "Do I need to prepare for the T-SPOT.TB test?", "answer": "No special preparation is required. It is recommended to donate blood on an empty stomach or 3-4 hours after a light meal."}, {"question": "Can T-SPOT.TB be done for children?", "answer": "Yes, the test can be performed on children of any age. The volume of blood taken depends on the child''s age."}, {"question": "How can I get test results?", "answer": "Results are sent to the patient''s email. They can also be obtained in person at the laboratory or through the partner''s personal account."}, {"question": "Do you accept tests under GOBMP/OSMS?", "answer": "Yes, our laboratory is a participant in the GOBMP and OSMS program. A doctor''s referral is required for free tests."}]}',
'{}', 0);

-- =============================================
-- SECTION 5: Права пациентов (rights)
-- =============================================

-- Block 1: Intro text
INSERT INTO patients_blocks (section_id, block_type, title_ru, title_kz, title_en, content_ru, content_kz, content_en, settings, order_index) VALUES
('55555555-5555-5555-5555-555555555555', 'text', '', '', '',
'{"text": "В соответствии с законодательством Республики Казахстан, каждый пациент имеет право на:"}',
'{"text": "Қазақстан Республикасының заңнамасына сәйкес әрбір пациенттің құқығы бар:"}',
'{"text": "In accordance with the legislation of the Republic of Kazakhstan, every patient has the right to:"}',
'{}', 0);

-- Block 2: Rights list
INSERT INTO patients_blocks (section_id, block_type, title_ru, title_kz, title_en, content_ru, content_kz, content_en, settings, order_index) VALUES
('55555555-5555-5555-5555-555555555555', 'cards', '', '', '',
'{"cards": [{"title": "Качественную медицинскую помощь", "text": "Получение медицинских услуг надлежащего качества в соответствии с установленными стандартами"}, {"title": "Информированное согласие", "text": "Получение полной информации о методах диагностики, их рисках и альтернативах перед проведением исследования"}, {"title": "Конфиденциальность", "text": "Защиту персональных данных и врачебной тайны. Результаты анализов передаются только пациенту или уполномоченным лицам"}, {"title": "Уважительное отношение", "text": "Вежливое и внимательное отношение со стороны медицинского персонала"}, {"title": "Обжалование", "text": "Возможность подать жалобу в случае нарушения ваших прав или ненадлежащего качества услуг"}]}',
'{"cards": [{"title": "Сапалы медициналық көмек", "text": "Белгіленген стандарттарға сәйкес тиісті сапалы медициналық қызметтерді алу"}, {"title": "Ақпараттандырылған келісім", "text": "Зерттеу жүргізер алдында диагностика әдістері, олардың тәуекелдері мен баламалары туралы толық ақпарат алу"}, {"title": "Құпиялылық", "text": "Дербес деректерді және дәрігерлік құпияны қорғау. Талдау нәтижелері тек пациентке немесе уәкілетті тұлғаларға беріледі"}, {"title": "Құрметпен қарау", "text": "Медициналық персоналдың сыпайы және мұқият қарауы"}, {"title": "Шағымдану", "text": "Құқықтарыңыз бұзылған немесе қызмет сапасы тиісті емес жағдайда шағым беру мүмкіндігі"}]}',
'{"cards": [{"title": "Quality medical care", "text": "Receiving medical services of proper quality in accordance with established standards"}, {"title": "Informed consent", "text": "Receiving complete information about diagnostic methods, their risks and alternatives before the study"}, {"title": "Confidentiality", "text": "Protection of personal data and medical confidentiality. Test results are transferred only to the patient or authorized persons"}, {"title": "Respectful treatment", "text": "Polite and attentive treatment from medical staff"}, {"title": "Appeal", "text": "The ability to file a complaint in case of violation of your rights or inadequate quality of services"}]}',
'{}', 1);

-- Block 3: Contact block
INSERT INTO patients_blocks (section_id, block_type, title_ru, title_kz, title_en, content_ru, content_kz, content_en, settings, order_index) VALUES
('55555555-5555-5555-5555-555555555555', 'contact_block', '', '', '',
'{"contactTitle": "Контакты для обращений", "contactDesc": "Если у вас есть вопросы или жалобы, свяжитесь с нами:"}',
'{"contactTitle": "Өтініш үшін байланыс", "contactDesc": "Сұрақтарыңыз немесе шағымдарыңыз болса, бізбен байланысыңыз:"}',
'{"contactTitle": "Contact for inquiries", "contactDesc": "If you have questions or complaints, contact us:"}',
'{"phone": "+7 (705) 100-03-33", "email": "info@gammalab.kz"}', 2);
