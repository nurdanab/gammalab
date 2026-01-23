'use client';

import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';

type Locale = 'ru' | 'kz' | 'en';

const translations = {
  ru: {
    home: 'Главная',
    title: 'Политика конфиденциальности',
    lastUpdated: 'Последнее обновление: Январь 2024',
    sections: [
      {
        title: '1. Общие положения',
        content: `Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных пользователей сайта GammaLab (далее — «Сайт»).

Используя Сайт, вы соглашаетесь с условиями данной Политики конфиденциальности. Если вы не согласны с условиями Политики, пожалуйста, не используйте Сайт.`
      },
      {
        title: '2. Сбор персональных данных',
        content: `Мы собираем следующие персональные данные:
• Имя и фамилия
• Контактный телефон
• Адрес электронной почты
• Информация, предоставленная при заполнении форм на Сайте

Данные собираются при:
• Заполнении форм обратной связи
• Записи на прием
• Оформлении заявки на анализы
• Подписке на рассылку`
      },
      {
        title: '3. Использование персональных данных',
        content: `Собранные данные используются для:
• Обработки заявок и обращений
• Связи с пользователями по вопросам оказания услуг
• Информирования о результатах анализов
• Улучшения качества обслуживания
• Отправки информационных сообщений (с согласия пользователя)`
      },
      {
        title: '4. Защита персональных данных',
        content: `Мы принимаем необходимые организационные и технические меры для защиты персональных данных от несанкционированного доступа, изменения, раскрытия или уничтожения.

Доступ к персональным данным имеют только уполномоченные сотрудники, которым эта информация необходима для выполнения своих обязанностей.`
      },
      {
        title: '5. Передача данных третьим лицам',
        content: `Мы не передаем персональные данные третьим лицам, за исключением случаев:
• Получения явного согласия пользователя
• Требований законодательства Республики Казахстан
• Защиты прав и законных интересов GammaLab`
      },
      {
        title: '6. Хранение данных',
        content: `Персональные данные хранятся в течение срока, необходимого для достижения целей их обработки, или в течение срока, установленного законодательством Республики Казахстан.

После достижения целей обработки или истечения установленного срока персональные данные уничтожаются.`
      },
      {
        title: '7. Права пользователей',
        content: `Вы имеете право:
• Получить информацию о своих персональных данных
• Требовать уточнения или исправления своих данных
• Требовать удаления своих данных
• Отозвать согласие на обработку персональных данных

Для реализации своих прав обратитесь по адресу: Salem@Gammalab.kz`
      },
      {
        title: '8. Файлы cookie',
        content: `Сайт использует файлы cookie для улучшения пользовательского опыта. Cookie — это небольшие текстовые файлы, сохраняемые на вашем устройстве.

Вы можете отключить использование cookie в настройках браузера, однако это может повлиять на функциональность Сайта.`
      },
      {
        title: '9. Изменение Политики',
        content: `Мы оставляем за собой право вносить изменения в настоящую Политику конфиденциальности. Актуальная версия всегда доступна на данной странице.

Рекомендуем периодически проверять Политику на наличие изменений.`
      },
      {
        title: '10. Контактная информация',
        content: `По всем вопросам, связанным с обработкой персональных данных, вы можете связаться с нами:

Адрес: г. Алматы, ул. Ходжанова, 55а
Телефон: +7-705-100-03-33
Email: Salem@Gammalab.kz`
      }
    ]
  },
  kz: {
    home: 'Басты бет',
    title: 'Құпиялылық саясаты',
    lastUpdated: 'Соңғы жаңарту: Қаңтар 2024',
    sections: [
      {
        title: '1. Жалпы ережелер',
        content: `Осы Құпиялылық саясаты GammaLab сайты пайдаланушыларының дербес деректерін өңдеу және қорғау тәртібін анықтайды.

Сайтты пайдалана отырып, сіз осы Құпиялылық саясатының шарттарымен келісесіз.`
      },
      {
        title: '2. Дербес деректерді жинау',
        content: `Біз келесі дербес деректерді жинаймыз:
• Аты-жөні
• Байланыс телефоны
• Электрондық пошта мекенжайы
• Сайттағы формаларды толтыру кезінде берілген ақпарат`
      },
      {
        title: '3. Дербес деректерді пайдалану',
        content: `Жиналған деректер мынадай мақсаттарда пайдаланылады:
• Өтінімдер мен өтініштерді өңдеу
• Қызмет көрсету мәселелері бойынша пайдаланушылармен байланысу
• Анализ нәтижелері туралы хабарлау
• Қызмет көрсету сапасын жақсарту`
      },
      {
        title: '4. Дербес деректерді қорғау',
        content: `Біз дербес деректерді рұқсатсыз қол жеткізуден, өзгертуден, ашудан немесе жоюдан қорғау үшін қажетті ұйымдастырушылық және техникалық шараларды қолданамыз.`
      },
      {
        title: '5. Деректерді үшінші тұлғаларға беру',
        content: `Біз дербес деректерді үшінші тұлғаларға бермейміз, мынадай жағдайларды қоспағанда:
• Пайдаланушының нақты келісімін алу
• Қазақстан Республикасы заңнамасының талаптары`
      },
      {
        title: '6. Деректерді сақтау',
        content: `Дербес деректер оларды өңдеу мақсаттарына қол жеткізу үшін қажетті мерзім ішінде немесе Қазақстан Республикасының заңнамасында белгіленген мерзім ішінде сақталады.`
      },
      {
        title: '7. Пайдаланушылардың құқықтары',
        content: `Сіздің құқығыңыз бар:
• Өзіңіздің дербес деректеріңіз туралы ақпарат алу
• Деректеріңізді нақтылауды немесе түзетуді талап ету
• Деректеріңізді жоюды талап ету

Өз құқықтарыңызды жүзеге асыру үшін мына мекенжайға хабарласыңыз: Salem@Gammalab.kz`
      },
      {
        title: '8. Cookie файлдары',
        content: `Сайт пайдаланушы тәжірибесін жақсарту үшін cookie файлдарын пайдаланады. Сіз браузер параметрлерінде cookie пайдалануын өшіре аласыз.`
      },
      {
        title: '9. Саясатты өзгерту',
        content: `Біз осы Құпиялылық саясатына өзгерістер енгізу құқығын сақтаймыз. Өзекті нұсқа әрқашан осы бетте қолжетімді.`
      },
      {
        title: '10. Байланыс ақпараты',
        content: `Дербес деректерді өңдеуге байланысты барлық сұрақтар бойынша бізбен байланысуға болады:

Мекенжай: Алматы қ., Ходжанов к., 55а
Телефон: +7-705-100-03-33
Email: Salem@Gammalab.kz`
      }
    ]
  },
  en: {
    home: 'Home',
    title: 'Privacy Policy',
    lastUpdated: 'Last updated: January 2024',
    sections: [
      {
        title: '1. General Provisions',
        content: `This Privacy Policy defines the procedure for processing and protecting personal data of users of the GammaLab website (hereinafter referred to as the "Website").

By using the Website, you agree to the terms of this Privacy Policy. If you do not agree with the terms of the Policy, please do not use the Website.`
      },
      {
        title: '2. Collection of Personal Data',
        content: `We collect the following personal data:
• First and last name
• Contact phone number
• Email address
• Information provided when filling out forms on the Website

Data is collected when:
• Filling out feedback forms
• Making an appointment
• Submitting an application for tests
• Subscribing to the newsletter`
      },
      {
        title: '3. Use of Personal Data',
        content: `The collected data is used for:
• Processing applications and requests
• Contacting users regarding services
• Informing about test results
• Improving service quality
• Sending informational messages (with user consent)`
      },
      {
        title: '4. Protection of Personal Data',
        content: `We take necessary organizational and technical measures to protect personal data from unauthorized access, alteration, disclosure, or destruction.

Access to personal data is available only to authorized employees who need this information to perform their duties.`
      },
      {
        title: '5. Transfer of Data to Third Parties',
        content: `We do not transfer personal data to third parties, except in the following cases:
• Obtaining explicit user consent
• Requirements of the legislation of the Republic of Kazakhstan
• Protection of the rights and legitimate interests of GammaLab`
      },
      {
        title: '6. Data Storage',
        content: `Personal data is stored for the period necessary to achieve the purposes of their processing, or for the period established by the legislation of the Republic of Kazakhstan.

After achieving the processing purposes or expiration of the established period, personal data is destroyed.`
      },
      {
        title: '7. User Rights',
        content: `You have the right to:
• Receive information about your personal data
• Request clarification or correction of your data
• Request deletion of your data
• Withdraw consent to the processing of personal data

To exercise your rights, contact us at: Salem@Gammalab.kz`
      },
      {
        title: '8. Cookies',
        content: `The Website uses cookies to improve user experience. Cookies are small text files stored on your device.

You can disable cookies in your browser settings, however, this may affect the functionality of the Website.`
      },
      {
        title: '9. Policy Changes',
        content: `We reserve the right to make changes to this Privacy Policy. The current version is always available on this page.

We recommend periodically checking the Policy for changes.`
      },
      {
        title: '10. Contact Information',
        content: `For all questions related to the processing of personal data, you can contact us:

Address: Almaty, Khodzhanov St., 55a
Phone: +7-705-100-03-33
Email: Salem@Gammalab.kz`
      }
    ]
  }
};

export default function PrivacyPage() {
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
          <p className="text-[14px]" style={{ color: '#6B7280' }}>
            {t.lastUpdated}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-10 lg:py-16">
        <div className="container-main">
          <div className="max-w-[800px]">
            {t.sections.map((section, index) => (
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
