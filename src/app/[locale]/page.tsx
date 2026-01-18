import Image from 'next/image';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HomeContent />;
}

function HomeContent() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[600px] lg:min-h-[700px]">
        {/* Full Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-doctor.png"
            alt="Лаборатория GammaLab"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Gradient overlay for text readability */}
          {/* <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to right, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 35%, rgba(255,255,255,0.4) 60%, transparent 100%)'
            }}
          /> */}
        </div>

        {/* Content */}
        <div
          className="absolute"
          style={{
            left: '250px',
            top: '60%',
            transform: 'translateY(-50%)'
          }}
        >
          {/* Text Content - Left side */}
          <div className="max-w-lg">
              {/* Badge */}
              <div
                className="inline-flex items-center gap-2"
                style={{
                  backgroundColor: 'white',
                  padding: '8px 18px',
                  borderRadius: '24px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  marginBottom: '16px'
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#209DA7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                </svg>
                <span className="text-[12px] font-medium" style={{ color: '#3D3D3D' }}>
                  Медицинская лаборатория
                </span>
              </div>

              {/* Heading */}
              <h1 className="text-3xl lg:text-4xl xl:text-[44px] font-semibold leading-[1.2]" style={{ color: '#091D33', marginBottom: '10px' }}>
                Мы заботимся
                <br />
                о вашем здоровье
              </h1>

              {/* Description */}
              <p className="text-[14px] lg:text-[15px] leading-[1.8] max-w-[500px]" style={{ color: '#3D3D3D', marginBottom: '40px' }}>
                Современная диагностическая лаборатория с высокоточным оборудованием. Мы предоставляем широкий спектр лабораторных исследований для точной диагностики.
              </p>

              {/* CTA Button */}
            <Link
              href="/contacts"
              className="inline-block text-white hover:opacity-90 transition-all text-[14px] font-medium"
              style={{ backgroundColor: '#EC910C', padding: '12px 30px', borderRadius: '24px' }}
            >
              Связаться с нами
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white" style={{ padding: '80px 0' }}>
        <div style={{ paddingLeft: '80px', paddingRight: '80px' }}>
          <div className="flex items-center justify-center">
            {/* Stat 1 */}
            <div className="text-center" style={{ padding: '0 60px' }}>
              <div className="text-[48px] font-semibold" style={{ color: '#209DA7' }}>+5120</div>
              <div className="text-[14px]" style={{ color: '#6B7280' }}>Довольных пациентов</div>
            </div>

            {/* Divider */}
            <div style={{ width: '1px', height: '60px', backgroundColor: '#E5E7EB' }} />

            {/* Stat 2 */}
            <div className="text-center" style={{ padding: '0 60px' }}>
              <div className="text-[48px] font-semibold" style={{ color: '#209DA7' }}>+26</div>
              <div className="text-[14px]" style={{ color: '#6B7280' }}>Филиалов</div>
            </div>

            {/* Divider */}
            <div style={{ width: '1px', height: '60px', backgroundColor: '#E5E7EB' }} />

            {/* Stat 3 */}
            <div className="text-center" style={{ padding: '0 60px' }}>
              <div className="text-[48px] font-semibold" style={{ color: '#209DA7' }}>+53</div>
              <div className="text-[14px]" style={{ color: '#6B7280' }}>Врачей</div>
            </div>

            {/* Divider */}
            <div style={{ width: '1px', height: '60px', backgroundColor: '#E5E7EB' }} />

            {/* Stat 4 */}
            <div className="text-center" style={{ padding: '0 60px' }}>
              <div className="text-[48px] font-semibold" style={{ color: '#209DA7' }}>+10</div>
              <div className="text-[14px]" style={{ color: '#6B7280' }}>Лет опыта</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-white" style={{ padding: '60px 80px', paddingBottom: '100px' }}>
        {/* Main container with circles */}
        <div
          className="relative overflow-hidden"
          style={{
            backgroundColor: '#209DA7',
            borderRadius: '24px',
            padding: '80px 50px',
            paddingBottom: '170px'
          }}
        >
          {/* Decorative circles */}
          <div
            className="absolute"
            style={{
              width: '300px',
              height: '300px',
              borderRadius: '50%',
              border: '150px solid rgba(9, 29, 51, 0.08)',
              top: '-100px',
              left: '-50px'
            }}
          />
          <div
            className="absolute"
            style={{
              width: '190px',
              height: '190px',
              borderRadius: '50%',
              border: '100px solid rgba(236, 145, 12, 0.1)',
              top: '30px',
              left: '300px'
            }}
          />
          <div
            className="absolute"
            style={{
              width: '350px',
              height: '350px',
              borderRadius: '50%',
              border: '200px solid rgba(9, 29, 51, 0.06)',
              bottom: '-120px',
              right: '-80px'
            }}
          />
          <div
            className="absolute"
            style={{
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              border: '100px solid rgba(236, 145, 12, 0.08)',
              bottom: '100px',
              right: '190px'
            }}
          />

          {/* Header */}
          <div className="relative flex justify-between items-start">
            <h2 className="text-[32px] font-semibold text-white leading-[1.2]">
              Основные услуги
              <br />
              Gammalab
            </h2>
            <p className="text-white text-[14px] leading-[1.8] max-w-[450px]" style={{ opacity: 0.9 }}>
              Lorem Ipsum является стандартным фиктивным текстом в этой отрасли с 1500-х годов, когда неизвестный печатник взял набор шрифтов и перемешал их, чтобы создать образец шрифтов.
            </p>
          </div>
        </div>

        {/* Service Cards - outside the overflow container */}
        <div className="relative grid grid-cols-4 gap-5" style={{ marginTop: '-100px', padding: '0 100px', zIndex: 10 }}>
              {/* Card 1 */}
              <div className="bg-white rounded-2xl text-center shadow-lg" style={{ padding: '32px 20px' }}>
                <div className="flex justify-center mb-6">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#209DA7" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    <polyline points="9 22 9 12 15 12 15 22"/>
                  </svg>
                </div>
                <h3 className="text-[16px] font-semibold mb-3" style={{ color: '#091D33' }}>
                  Общая<br />диагностика
                </h3>
                <p className="text-[12px] leading-[1.7]" style={{ color: '#6B7280' }}>
                  Комплексное обследование организма с использованием современного оборудования.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-2xl text-center shadow-lg" style={{ padding: '32px 20px' }}>
                <div className="flex justify-center mb-6">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#209DA7" strokeWidth="2">
                    <circle cx="12" cy="8" r="5"/>
                    <path d="M12 13v8"/>
                  </svg>
                </div>
                <h3 className="text-[16px] font-semibold mb-3" style={{ color: '#091D33' }}>
                  Поддержка<br />беременности
                </h3>
                <p className="text-[12px] leading-[1.7]" style={{ color: '#6B7280' }}>
                  Полное сопровождение беременности и подготовка к родам.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-white rounded-2xl text-center shadow-lg" style={{ padding: '32px 20px' }}>
                <div className="flex justify-center mb-6">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#209DA7" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2"/>
                    <path d="M7 7h10M7 12h10M7 17h6"/>
                  </svg>
                </div>
                <h3 className="text-[16px] font-semibold mb-3" style={{ color: '#091D33' }}>
                  Нутрициологическая<br />поддержка
                </h3>
                <p className="text-[12px] leading-[1.7]" style={{ color: '#6B7280' }}>
                  Индивидуальные программы питания и витаминотерапии.
                </p>
              </div>

              {/* Card 4 */}
              <div className="bg-white rounded-2xl text-center shadow-lg" style={{ padding: '32px 20px' }}>
                <div className="flex justify-center mb-6">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#209DA7" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2"/>
                    <path d="M12 8v8"/>
                    <path d="M8 12h8"/>
                  </svg>
                </div>
                <h3 className="text-[16px] font-semibold mb-3" style={{ color: '#091D33' }}>
                  Фармацевтическая<br />помощь
                </h3>
                <p className="text-[12px] leading-[1.7]" style={{ color: '#6B7280' }}>
                  Консультации по лекарственным препаратам и их взаимодействию.
                </p>
              </div>
        </div>
      </section>

      {/* About Section - Удобные и быстрые анализы */}
      <section className="relative bg-white overflow-hidden" style={{ padding: '80px 80px' }}>
        {/* Background decorative circle */}
        <div
          className="absolute"
          style={{
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            border: '3px solid rgba(220, 220, 220, 0.3)',
            top: '5%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        />
        <div
          className="absolute"
          style={{
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            border: '3px solid rgba(220, 220, 220, 0.3)',
            top: '5%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        />

        <div className="relative text-center max-w-[700px]" style={{ marginBottom: '60px', marginLeft: 'auto', marginRight: 'auto' }}>
          {/* Small label */}
          <p className="text-[12px] uppercase tracking-widest mb-4" style={{ color: '#9CA3AF' }}>
            О нас
          </p>

          {/* Main heading */}
          <h2 className="text-[36px] font-semibold mb-6" style={{ color: '#091D33' }}>
            Удобные и быстрые анализы
          </h2>

          {/* Description */}
          <p className="text-[14px] leading-[1.8]" style={{ color: '#6B7280' }}>
            «Будьте здоровы!» — как часто мы говорим и слышим эти слова. Однако одного пожелания мало. За здоровьем необходимо следить. Ключевую роль в этом играет качественная лабораторная диагностика. Что может обеспечить это качество?
          </p>
        </div>

        {/* Features */}
        <div className="relative grid grid-cols-4 gap-8" style={{ padding: '0 70px' }}>
          {/* Feature 1 - Быстро */}
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div
                className="flex items-center justify-center"
                style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '10%',
                  backgroundColor: '#209DA7'
                }}
              >
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
            </div>
            <h3 className="text-[18px] font-semibold mb-3" style={{ color: '#091D33' }}>Быстро</h3>
            <p className="text-[13px]" style={{ color: '#6B7280' }}>Экономия времени и скорость</p>
          </div>

          {/* Feature 2 - Качественно */}
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div
                className="flex items-center justify-center"
                style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '10%',
                  backgroundColor: '#209DA7'
                }}
              >
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
            </div>
            <h3 className="text-[18px] font-semibold mb-3" style={{ color: '#091D33' }}>Качественно</h3>
            <p className="text-[13px]" style={{ color: '#6B7280' }}>Качество и достоверность</p>
          </div>

          {/* Feature 3 - Точно */}
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div
                className="flex items-center justify-center"
                style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '10%',
                  backgroundColor: '#209DA7'
                }}
              >
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
                </svg>
              </div>
            </div>
            <h3 className="text-[18px] font-semibold mb-3" style={{ color: '#091D33' }}>Точно</h3>
            <p className="text-[13px]" style={{ color: '#6B7280' }}>Профессионализм и технологичность</p>
          </div>

          {/* Feature 4 - Удобно */}
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div
                className="flex items-center justify-center"
                style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '10%',
                  backgroundColor: '#209DA7'
                }}
              >
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                  <line x1="9" y1="9" x2="9.01" y2="9"/>
                  <line x1="15" y1="9" x2="15.01" y2="9"/>
                </svg>
              </div>
            </div>
            <h3 className="text-[18px] font-semibold mb-3" style={{ color: '#091D33' }}>Удобно</h3>
            <p className="text-[13px]" style={{ color: '#6B7280' }}>Удобство и комфорт</p>
          </div>
        </div>
      </section>

      {/* Popular Analysis Section */}
      <section className="bg-white" style={{ padding: '60px 80px' }}>
        <div
          className="relative overflow-hidden"
          style={{
            backgroundColor: '#EEF6F6',
            borderRadius: '24px',
            padding: '60px'
          }}
        >
          {/* Background decorative icon */}
          <div
            className="absolute"
            style={{
              right: '60px',
              top: '50%',
              transform: 'translateY(-50%)',
              opacity: 0.1
            }}
          >
            <svg width="200" height="200" viewBox="0 0 24 24" fill="#209DA7" stroke="none">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>

          <div className="relative flex gap-16">
            {/* Left - Categories */}
            <div className="flex flex-col gap-4" style={{ minWidth: '220px' }}>
              <a href="#" className="text-[13px] uppercase tracking-wider font-medium" style={{ color: '#9CA3AF' }}>
                Лабораторный анализ
              </a>
              <a href="#" className="text-[13px] uppercase tracking-wider font-medium" style={{ color: '#209DA7' }}>
                Кардиология
              </a>
              <a href="#" className="text-[13px] uppercase tracking-wider font-medium" style={{ color: '#9CA3AF' }}>
                Гинекология
              </a>
              <a href="#" className="text-[13px] uppercase tracking-wider font-medium" style={{ color: '#9CA3AF' }}>
                Патология
              </a>
              <a href="#" className="text-[13px] uppercase tracking-wider font-medium" style={{ color: '#9CA3AF' }}>
                Педиатрия
              </a>
              <a href="#" className="text-[13px] uppercase tracking-wider font-medium" style={{ color: '#9CA3AF' }}>
                Неврология
              </a>
            </div>

            {/* Right - Content */}
            <div className="flex-1" style={{ maxWidth: '500px' }}>
              <h3 className="text-[32px] font-semibold mb-6" style={{ color: '#091D33' }}>
                Кардиология
              </h3>

              <p className="text-[14px] leading-[1.8] mb-4" style={{ color: '#6B7280' }}>
                Комплексная диагностика сердечно-сосудистой системы. Современные методы исследования позволяют выявить заболевания на ранних стадиях.
              </p>

              <p className="text-[14px] leading-[1.8] mb-6" style={{ color: '#6B7280' }}>
                Профессиональная команда кардиологов обеспечивает точную диагностику и индивидуальный подход к каждому пациенту.
              </p>

              {/* Tags */}
              <div className="flex items-center gap-4 mb-8">
                <span className="text-[13px]" style={{ color: '#209DA7' }}>ЭКГ диагностика</span>
                <span style={{ color: '#D1D5DB' }}>|</span>
                <span className="text-[13px]" style={{ color: '#209DA7' }}>Холтер мониторинг</span>
                <span style={{ color: '#D1D5DB' }}>|</span>
                <span className="text-[13px]" style={{ color: '#209DA7' }}>УЗИ сердца</span>
              </div>

              {/* Button */}
              <button
                className="text-white text-[13px] font-medium uppercase tracking-wider"
                style={{
                  backgroundColor: '#209DA7',
                  padding: '14px 32px',
                  borderRadius: '8px'
                }}
              >
                Подробнее
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #EEF6F6 0%, #E8F4F4 100%)',
          padding: '80px 80px'
        }}
      >
        {/* Background decorative circle */}
        <div
          className="absolute"
          style={{
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            border: '2px solid rgba(32, 157, 167, 0.1)',
            right: '-100px',
            top: '50%',
            transform: 'translateY(-50%)'
          }}
        />

        <div className="relative flex items-center gap-20">
          {/* Left - Photos */}
          <div className="relative" style={{ width: '350px', height: '300px' }}>
            {/* Photo 1 - Top */}
            <div
              className="absolute overflow-hidden"
              style={{
                width: '90px',
                height: '90px',
                borderRadius: '50%',
                border: '3px solid white',
                top: '0',
                left: '50%',
                transform: 'translateX(-50%)',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
              }}
            >
              <Image src="https://i.pravatar.cc/150?img=1" alt="Пациент" fill className="object-cover" />
            </div>

            {/* Photo 2 - Left */}
            <div
              className="absolute overflow-hidden"
              style={{
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                border: '3px solid white',
                top: '80px',
                left: '30px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
              }}
            >
              <Image src="https://i.pravatar.cc/150?img=5" alt="Пациент" fill className="object-cover" />
            </div>

            {/* Photo 3 - Right */}
            <div
              className="absolute overflow-hidden"
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                border: '3px solid white',
                top: '60px',
                right: '40px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
              }}
            >
              <Image src="https://i.pravatar.cc/150?img=8" alt="Пациент" fill className="object-cover" />
            </div>

            {/* Photo 4 - Bottom Left */}
            <div
              className="absolute overflow-hidden"
              style={{
                width: '75px',
                height: '75px',
                borderRadius: '50%',
                border: '3px solid white',
                bottom: '40px',
                left: '60px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
              }}
            >
              <Image src="https://i.pravatar.cc/150?img=12" alt="Пациент" fill className="object-cover" />
            </div>

            {/* Photo 5 - Bottom Right */}
            <div
              className="absolute overflow-hidden"
              style={{
                width: '65px',
                height: '65px',
                borderRadius: '50%',
                border: '3px solid white',
                bottom: '20px',
                right: '80px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
              }}
            >
              <Image src="https://i.pravatar.cc/150?img=20" alt="Пациент" fill className="object-cover" />
            </div>
          </div>

          {/* Right - Testimonial */}
          <div className="flex-1" style={{ maxWidth: '500px' }}>
            {/* Quote icon */}
            <div className="mb-4">
              <svg width="40" height="32" viewBox="0 0 40 32" fill="#209DA7">
                <path d="M0 20.8C0 27.2 4.8 32 11.2 32c4.8 0 8.8-4 8.8-8.8 0-4.8-4-8.8-8.8-8.8-1.6 0-2.4 0-3.2.8C8.8 6.4 14.4 1.6 20 0L16.8 0C7.2 3.2 0 11.2 0 20.8zm20 0c0 6.4 4.8 11.2 11.2 11.2 4.8 0 8.8-4 8.8-8.8 0-4.8-4-8.8-8.8-8.8-1.6 0-2.4 0-3.2.8C28.8 6.4 34.4 1.6 40 0L36.8 0C27.2 3.2 20 11.2 20 20.8z"/>
              </svg>
            </div>

            {/* Quote text */}
            <p className="text-[16px] leading-[1.8] mb-6" style={{ color: '#6B7280' }}>
              Очень довольна качеством обслуживания в лаборатории GammaLab. Результаты анализов получила быстро, персонал вежливый и профессиональный. Рекомендую всем!
            </p>

            {/* Author */}
            <div className="mb-6">
              <p className="text-[18px] font-semibold" style={{ color: '#091D33' }}>Анна Иванова</p>
              <p className="text-[12px] uppercase tracking-wider" style={{ color: '#209DA7' }}>Пациент</p>
            </div>

            {/* Dots */}
            <div className="flex gap-2">
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#209DA7' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#D1D5DB' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#D1D5DB' }} />
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="bg-white" style={{ padding: '80px 80px' }}>
        {/* Header */}
        <h2 className="text-[28px] font-semibold mb-10" style={{ color: '#091D33' }}>
          Наши последние новости
        </h2>

        {/* News Cards */}
        <div className="grid grid-cols-3 gap-6 mb-12">
          {/* Card 1 */}
          <div>
            <div className="relative mb-5 overflow-hidden" style={{ borderRadius: '8px', height: '180px' }}>
              <Image
                src="/images/news-1.jpg"
                alt="Здоровье сердца"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-[15px] font-semibold mb-2" style={{ color: '#091D33' }}>
              10 продуктов для здоровья сердца
            </h3>
            <p className="text-[13px] leading-[1.7] mb-4" style={{ color: '#9CA3AF' }}>
              Узнайте какие продукты помогут сохранить здоровье вашей сердечно-сосудистой системы.
            </p>
            <a href="#" className="text-[13px] font-medium" style={{ color: '#209DA7' }}>
              Читать далее
            </a>
          </div>

          {/* Card 2 */}
          <div>
            <div className="relative mb-5 overflow-hidden" style={{ borderRadius: '8px', height: '180px' }}>
              <Image
                src="/images/news-2.jpg"
                alt="Релаксация"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-[15px] font-semibold mb-2" style={{ color: '#091D33' }}>
              Как справиться со стрессом
            </h3>
            <p className="text-[13px] leading-[1.7] mb-4" style={{ color: '#9CA3AF' }}>
              Эффективные методы релаксации и управления стрессом в повседневной жизни.
            </p>
            <a href="#" className="text-[13px] font-medium" style={{ color: '#209DA7' }}>
              Читать далее
            </a>
          </div>

          {/* Card 3 */}
          <div>
            <div className="relative mb-5 overflow-hidden" style={{ borderRadius: '8px', height: '180px' }}>
              <Image
                src="/images/news-3.jpg"
                alt="Иммунитет"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-[15px] font-semibold mb-2" style={{ color: '#091D33' }}>
              Укрепление иммунитета
            </h3>
            <p className="text-[13px] leading-[1.7] mb-4" style={{ color: '#9CA3AF' }}>
              Лучшие способы укрепить иммунную систему и защитить организм от инфекций.
            </p>
            <a href="#" className="text-[13px] font-medium" style={{ color: '#209DA7' }}>
              Читать далее
            </a>
          </div>
        </div>

        {/* Button */}
        <div className="text-center">
          <button
            className="inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-wider"
            style={{
              border: '1px solid #209DA7',
              color: '#209DA7',
              padding: '12px 28px',
              borderRadius: '6px',
              backgroundColor: 'transparent'
            }}
          >
            Все новости
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </section>

      {/* Newsletter / Quick Search Section */}
      <section
        className="relative overflow-hidden"
        style={{
          backgroundColor: '#209DA7',
          padding: '70px 80px'
        }}
      >
        {/* Subtle background decoration */}
        <div
          className="absolute"
          style={{
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            left: '-100px',
            top: '50%',
            transform: 'translateY(-50%)'
          }}
        />

        <div className="relative flex items-center justify-between">
          {/* Left - Text */}
          <div>
            <p
              className="text-[11px] uppercase tracking-widest mb-3"
              style={{ color: 'rgba(255, 255, 255, 0.7)' }}
            >
              Быстрый поиск
            </p>
            <h2 className="text-[32px] font-semibold text-white leading-[1.3]">
              Найдите нужный
              <br />
              анализ быстро
            </h2>
          </div>

          {/* Right - Search Input */}
          <div
            className="flex items-center"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              borderRadius: '50px',
              padding: '6px 6px 6px 28px',
              minWidth: '420px'
            }}
          >
            <input
              type="text"
              placeholder="Введите название анализа"
              className="flex-1 bg-transparent outline-none text-[14px]"
              style={{ color: 'white' }}
            />
            <button
              className="text-[12px] font-medium uppercase tracking-wider"
              style={{
                backgroundColor: 'white',
                color: '#091D33',
                padding: '14px 28px',
                borderRadius: '50px'
              }}
            >
              Найти
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
