-- ============ PAGES (for editable static pages like Privacy Policy) ============
CREATE TABLE IF NOT EXISTS pages (
  id TEXT PRIMARY KEY,  -- e.g., 'privacy', 'terms', etc.
  title TEXT NOT NULL,
  title_kz TEXT NOT NULL,
  title_en TEXT NOT NULL,
  last_updated TEXT NOT NULL DEFAULT 'Январь 2024',
  last_updated_kz TEXT NOT NULL DEFAULT 'Қаңтар 2024',
  last_updated_en TEXT NOT NULL DEFAULT 'January 2024',
  sections JSONB NOT NULL DEFAULT '[]',
  sections_kz JSONB NOT NULL DEFAULT '[]',
  sections_en JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for quick lookups
CREATE INDEX IF NOT EXISTS idx_pages_id ON pages(id);

-- Enable RLS
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public read access for pages" ON pages
  FOR SELECT TO anon, authenticated USING (true);

-- Service role full access
CREATE POLICY "Service role full access for pages" ON pages
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Insert default privacy policy
INSERT INTO pages (id, title, title_kz, title_en, last_updated, last_updated_kz, last_updated_en, sections, sections_kz, sections_en)
VALUES (
  'privacy',
  'Политика конфиденциальности',
  'Құпиялылық саясаты',
  'Privacy Policy',
  'Январь 2024',
  'Қаңтар 2024',
  'January 2024',
  '[
    {"title": "1. Общие положения", "content": "Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных пользователей сайта GammaLab (далее — «Сайт»).\n\nИспользуя Сайт, вы соглашаетесь с условиями данной Политики конфиденциальности. Если вы не согласны с условиями Политики, пожалуйста, не используйте Сайт."},
    {"title": "2. Сбор персональных данных", "content": "Мы собираем следующие персональные данные:\n• Имя и фамилия\n• Контактный телефон\n• Адрес электронной почты\n• Информация, предоставленная при заполнении форм на Сайте\n\nДанные собираются при:\n• Заполнении форм обратной связи\n• Записи на прием\n• Оформлении заявки на анализы\n• Подписке на рассылку"},
    {"title": "3. Использование персональных данных", "content": "Собранные данные используются для:\n• Обработки заявок и обращений\n• Связи с пользователями по вопросам оказания услуг\n• Информирования о результатах анализов\n• Улучшения качества обслуживания\n• Отправки информационных сообщений (с согласия пользователя)"},
    {"title": "4. Защита персональных данных", "content": "Мы принимаем необходимые организационные и технические меры для защиты персональных данных от несанкционированного доступа, изменения, раскрытия или уничтожения.\n\nДоступ к персональным данным имеют только уполномоченные сотрудники, которым эта информация необходима для выполнения своих обязанностей."},
    {"title": "5. Передача данных третьим лицам", "content": "Мы не передаем персональные данные третьим лицам, за исключением случаев:\n• Получения явного согласия пользователя\n• Требований законодательства Республики Казахстан\n• Защиты прав и законных интересов GammaLab"},
    {"title": "6. Хранение данных", "content": "Персональные данные хранятся в течение срока, необходимого для достижения целей их обработки, или в течение срока, установленного законодательством Республики Казахстан.\n\nПосле достижения целей обработки или истечения установленного срока персональные данные уничтожаются."},
    {"title": "7. Права пользователей", "content": "Вы имеете право:\n• Получить информацию о своих персональных данных\n• Требовать уточнения или исправления своих данных\n• Требовать удаления своих данных\n• Отозвать согласие на обработку персональных данных\n\nДля реализации своих прав обратитесь по адресу: Salem@Gammalab.kz"},
    {"title": "8. Файлы cookie", "content": "Сайт использует файлы cookie для улучшения пользовательского опыта. Cookie — это небольшие текстовые файлы, сохраняемые на вашем устройстве.\n\nВы можете отключить использование cookie в настройках браузера, однако это может повлиять на функциональность Сайта."},
    {"title": "9. Изменение Политики", "content": "Мы оставляем за собой право вносить изменения в настоящую Политику конфиденциальности. Актуальная версия всегда доступна на данной странице.\n\nРекомендуем периодически проверять Политику на наличие изменений."},
    {"title": "10. Контактная информация", "content": "По всем вопросам, связанным с обработкой персональных данных, вы можете связаться с нами:\n\nАдрес: г. Алматы, ул. Ходжанова, 55а\nТелефон: +7-705-100-03-33\nEmail: Salem@Gammalab.kz"}
  ]'::jsonb,
  '[
    {"title": "1. Жалпы ережелер", "content": "Осы Құпиялылық саясаты GammaLab сайты пайдаланушыларының дербес деректерін өңдеу және қорғау тәртібін анықтайды.\n\nСайтты пайдалана отырып, сіз осы Құпиялылық саясатының шарттарымен келісесіз."},
    {"title": "2. Дербес деректерді жинау", "content": "Біз келесі дербес деректерді жинаймыз:\n• Аты-жөні\n• Байланыс телефоны\n• Электрондық пошта мекенжайы\n• Сайттағы формаларды толтыру кезінде берілген ақпарат"},
    {"title": "3. Дербес деректерді пайдалану", "content": "Жиналған деректер мынадай мақсаттарда пайдаланылады:\n• Өтінімдер мен өтініштерді өңдеу\n• Қызмет көрсету мәселелері бойынша пайдаланушылармен байланысу\n• Анализ нәтижелері туралы хабарлау\n• Қызмет көрсету сапасын жақсарту"},
    {"title": "4. Дербес деректерді қорғау", "content": "Біз дербес деректерді рұқсатсыз қол жеткізуден, өзгертуден, ашудан немесе жоюдан қорғау үшін қажетті ұйымдастырушылық және техникалық шараларды қолданамыз."},
    {"title": "5. Деректерді үшінші тұлғаларға беру", "content": "Біз дербес деректерді үшінші тұлғаларға бермейміз, мынадай жағдайларды қоспағанда:\n• Пайдаланушының нақты келісімін алу\n• Қазақстан Республикасы заңнамасының талаптары"},
    {"title": "6. Деректерді сақтау", "content": "Дербес деректер оларды өңдеу мақсаттарына қол жеткізу үшін қажетті мерзім ішінде немесе Қазақстан Республикасының заңнамасында белгіленген мерзім ішінде сақталады."},
    {"title": "7. Пайдаланушылардың құқықтары", "content": "Сіздің құқығыңыз бар:\n• Өзіңіздің дербес деректеріңіз туралы ақпарат алу\n• Деректеріңізді нақтылауды немесе түзетуді талап ету\n• Деректеріңізді жоюды талап ету\n\nӨз құқықтарыңызды жүзеге асыру үшін мына мекенжайға хабарласыңыз: Salem@Gammalab.kz"},
    {"title": "8. Cookie файлдары", "content": "Сайт пайдаланушы тәжірибесін жақсарту үшін cookie файлдарын пайдаланады. Сіз браузер параметрлерінде cookie пайдалануын өшіре аласыз."},
    {"title": "9. Саясатты өзгерту", "content": "Біз осы Құпиялылық саясатына өзгерістер енгізу құқығын сақтаймыз. Өзекті нұсқа әрқашан осы бетте қолжетімді."},
    {"title": "10. Байланыс ақпараты", "content": "Дербес деректерді өңдеуге байланысты барлық сұрақтар бойынша бізбен байланысуға болады:\n\nМекенжай: Алматы қ., Ходжанов к., 55а\nТелефон: +7-705-100-03-33\nEmail: Salem@Gammalab.kz"}
  ]'::jsonb,
  '[
    {"title": "1. General Provisions", "content": "This Privacy Policy defines the procedure for processing and protecting personal data of users of the GammaLab website (hereinafter referred to as the \"Website\").\n\nBy using the Website, you agree to the terms of this Privacy Policy. If you do not agree with the terms of the Policy, please do not use the Website."},
    {"title": "2. Collection of Personal Data", "content": "We collect the following personal data:\n• First and last name\n• Contact phone number\n• Email address\n• Information provided when filling out forms on the Website\n\nData is collected when:\n• Filling out feedback forms\n• Making an appointment\n• Submitting an application for tests\n• Subscribing to the newsletter"},
    {"title": "3. Use of Personal Data", "content": "The collected data is used for:\n• Processing applications and requests\n• Contacting users regarding services\n• Informing about test results\n• Improving service quality\n• Sending informational messages (with user consent)"},
    {"title": "4. Protection of Personal Data", "content": "We take necessary organizational and technical measures to protect personal data from unauthorized access, alteration, disclosure, or destruction.\n\nAccess to personal data is available only to authorized employees who need this information to perform their duties."},
    {"title": "5. Transfer of Data to Third Parties", "content": "We do not transfer personal data to third parties, except in the following cases:\n• Obtaining explicit user consent\n• Requirements of the legislation of the Republic of Kazakhstan\n• Protection of the rights and legitimate interests of GammaLab"},
    {"title": "6. Data Storage", "content": "Personal data is stored for the period necessary to achieve the purposes of their processing, or for the period established by the legislation of the Republic of Kazakhstan.\n\nAfter achieving the processing purposes or expiration of the established period, personal data is destroyed."},
    {"title": "7. User Rights", "content": "You have the right to:\n• Receive information about your personal data\n• Request clarification or correction of your data\n• Request deletion of your data\n• Withdraw consent to the processing of personal data\n\nTo exercise your rights, contact us at: Salem@Gammalab.kz"},
    {"title": "8. Cookies", "content": "The Website uses cookies to improve user experience. Cookies are small text files stored on your device.\n\nYou can disable cookies in your browser settings, however, this may affect the functionality of the Website."},
    {"title": "9. Policy Changes", "content": "We reserve the right to make changes to this Privacy Policy. The current version is always available on this page.\n\nWe recommend periodically checking the Policy for changes."},
    {"title": "10. Contact Information", "content": "For all questions related to the processing of personal data, you can contact us:\n\nAddress: Almaty, Khodzhanov St., 55a\nPhone: +7-705-100-03-33\nEmail: Salem@Gammalab.kz"}
  ]'::jsonb
) ON CONFLICT (id) DO NOTHING;
