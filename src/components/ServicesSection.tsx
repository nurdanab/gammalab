'use client';

import { motion } from 'framer-motion';

interface ServicesSectionProps {
  locale: string;
}

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
};

const content = {
  ru: {
    services: [
      { icon: 'flask', title: 'Лабораторные анализы', description: 'Узкий профиль персонифицированной диагностики, внедряя современные молекулярно-генетические и иммуногистохимические методы исследований' },
      { icon: 'clock', title: 'Быстрые результаты', description: 'Скорость выдачи результатов исследований от 3-14 рабочих дней в зависимости от профиля проводимого исследования' },
      { icon: 'calendar', title: 'Результаты онлайн', description: 'В соответствии с политикой конфиденциальности результаты исследований поступают на электронную почту, указанную при формировании направления и оплаты услуг' },
      { icon: 'microscope', title: 'Контроль качества', description: 'Ежегодно и ежеквартально проводится внутренняя и внешняя оценка качества проводимых исследований' },
    ],
  },
  kz: {
    services: [
      { icon: 'flask', title: 'Зертханалық талдаулар', description: 'Заманауи молекулалық-генетикалық және иммуногистохимиялық зерттеу әдістерін енгізе отырып, дербес диагностиканың тар профилі' },
      { icon: 'clock', title: 'Жылдам нәтижелер', description: 'Жүргізілетін зерттеу профиліне байланысты зерттеу нәтижелерін беру жылдамдығы 3-14 жұмыс күні' },
      { icon: 'calendar', title: 'Онлайн нәтижелер', description: 'Құпиялылық саясатына сәйкес зерттеу нәтижелері бағытты қалыптастыру және қызметтерді төлеу кезінде көрсетілген электрондық поштаға жіберіледі' },
      { icon: 'microscope', title: 'Сапа бақылауы', description: 'Жүргізілетін зерттеулердің сапасын ішкі және сыртқы бағалау жыл сайын және тоқсан сайын жүргізіледі' },
    ],
  },
  en: {
    services: [
      { icon: 'flask', title: 'Laboratory Tests', description: 'Narrow profile of personalized diagnostics, implementing modern molecular-genetic and immunohistochemical research methods' },
      { icon: 'clock', title: 'Fast Results', description: 'Research results delivery speed from 3-14 working days depending on the research profile' },
      { icon: 'calendar', title: 'Online Results', description: 'In accordance with the privacy policy, research results are sent to the email address specified when creating the referral and paying for services' },
      { icon: 'microscope', title: 'Quality Control', description: 'Internal and external quality assessment of research is conducted annually and quarterly' },
    ],
  },
};

export default function ServicesSection({ locale }: ServicesSectionProps) {
  const t = content[locale as keyof typeof content] || content.ru;

  return (
    <section className="bg-white">
      <div className="container-main py-10 lg:py-16">
        {/* Main container with circles */}
        <div className="relative overflow-hidden bg-[#209DA7] rounded-3xl lg:rounded-[32px] p-6 sm:p-8 lg:p-12">
          {/* Decorative circles */}
          <div
            className="absolute -top-24 -left-12 w-72 h-72 rounded-full pointer-events-none"
            style={{ border: '120px solid rgba(9, 29, 51, 0.08)' }}
          />
          <div
            className="absolute -bottom-28 -right-20 w-80 h-80 rounded-full pointer-events-none"
            style={{ border: '160px solid rgba(9, 29, 51, 0.06)' }}
          />

          {/* Service Cards inside */}
          <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
            {t.services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                }}
                className="bg-white rounded-xl lg:rounded-2xl text-center shadow-lg p-4 sm:p-5 lg:p-6 cursor-pointer"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.15, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: index * 0.3,
                  }}
                  className="flex justify-center mb-4 lg:mb-6 text-[#209DA7]"
                >
                  {serviceIcons[service.icon] || serviceIcons.flask}
                </motion.div>
                <h3 className="text-sm lg:text-base font-semibold mb-2 lg:mb-3 text-[#091D33] line-clamp-2">
                  {service.title}
                </h3>
                <p className="text-[11px] lg:text-xs leading-relaxed text-gray-500 line-clamp-3">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
