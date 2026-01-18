import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import {
  MapPin,
  Phone,
  Clock,
  Navigation,
  Search,
} from 'lucide-react';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function TestLocationsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <TestLocationsContent />;
}

const locations = [
  {
    id: 1,
    name: 'GammaLab - Центральный',
    address: '8-й Микрорайон, 37/1',
    city: 'Алматы',
    phone: '+7 727 346 8525',
    workingHours: 'Пн-Пт: 7:00 - 20:00, Сб: 8:00 - 16:00',
    isMain: true,
    services: ['Все виды анализов', 'Забор крови на дому', 'Экспресс-тесты'],
  },
  {
    id: 2,
    name: 'GammaLab - Достык',
    address: 'пр. Достык, 89',
    city: 'Алматы',
    phone: '+7 727 346 8526',
    workingHours: 'Пн-Пт: 7:30 - 19:00, Сб: 8:00 - 15:00',
    isMain: false,
    services: ['Общие анализы', 'Биохимия', 'Гормоны'],
  },
  {
    id: 3,
    name: 'GammaLab - Сайран',
    address: 'ул. Утеген Батыра, 126',
    city: 'Алматы',
    phone: '+7 727 346 8527',
    workingHours: 'Пн-Пт: 7:00 - 18:00, Сб: 8:00 - 14:00',
    isMain: false,
    services: ['Общие анализы', 'ПЦР-тесты', 'Аллергология'],
  },
  {
    id: 4,
    name: 'GammaLab - Жетысу',
    address: 'мкр. Жетысу-2, 85',
    city: 'Алматы',
    phone: '+7 727 346 8528',
    workingHours: 'Пн-Пт: 7:30 - 18:00, Сб: 8:00 - 14:00',
    isMain: false,
    services: ['Общие анализы', 'Биохимия', 'Коагулограмма'],
  },
  {
    id: 5,
    name: 'GammaLab - Астана',
    address: 'пр. Мангилик Ел, 54',
    city: 'Астана',
    phone: '+7 717 246 8525',
    workingHours: 'Пн-Пт: 7:00 - 19:00, Сб: 8:00 - 15:00',
    isMain: false,
    services: ['Все виды анализов', 'Забор крови на дому', 'Экспресс-тесты'],
  },
  {
    id: 6,
    name: 'GammaLab - Шымкент',
    address: 'ул. Тауке хана, 45',
    city: 'Шымкент',
    phone: '+7 725 246 8525',
    workingHours: 'Пн-Пт: 7:30 - 18:00, Сб: 8:00 - 14:00',
    isMain: false,
    services: ['Общие анализы', 'Биохимия', 'Гормоны'],
  },
];

const cities = ['Все города', 'Алматы', 'Астана', 'Шымкент'];

function TestLocationsContent() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section
        className="relative"
        style={{
          backgroundColor: '#EEF6F6',
          paddingTop: '180px',
          paddingBottom: '80px',
        }}
      >
        <div style={{ paddingLeft: '80px', paddingRight: '80px' }}>
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 mb-6">
            <Link href="/" className="text-[13px]" style={{ color: '#9CA3AF' }}>
              Главная
            </Link>
            <span className="text-[13px]" style={{ color: '#9CA3AF' }}>/</span>
            <span className="text-[13px]" style={{ color: '#209DA7' }}>
              Где пройти тест?
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-[42px] font-semibold mb-4"
            style={{ color: '#091D33' }}
          >
            Где пройти тест?
          </h1>
          <p
            className="text-[15px] leading-[1.8] max-w-[600px]"
            style={{ color: '#6B7280' }}
          >
            Найдите ближайший филиал GammaLab для сдачи анализов. Мы работаем
            в крупнейших городах Казахстана и постоянно расширяем сеть.
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="bg-white" style={{ padding: '40px 80px' }}>
        <div className="flex items-center justify-between gap-6">
          {/* Search */}
          <div
            className="flex items-center flex-1"
            style={{
              backgroundColor: '#F9FAFB',
              borderRadius: '12px',
              padding: '14px 20px',
              maxWidth: '400px',
            }}
          >
            <Search className="h-5 w-5" style={{ color: '#9CA3AF' }} />
            <input
              type="text"
              placeholder="Поиск по адресу..."
              className="flex-1 bg-transparent outline-none text-[14px] ml-3"
              style={{ color: '#091D33' }}
            />
          </div>

          {/* City Filter */}
          <div className="flex items-center gap-3">
            {cities.map((city, index) => (
              <button
                key={city}
                className="text-[13px] font-medium transition-colors"
                style={{
                  backgroundColor: index === 0 ? '#209DA7' : '#F3F4F6',
                  color: index === 0 ? 'white' : '#6B7280',
                  padding: '10px 20px',
                  borderRadius: '20px',
                }}
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Map and Locations Section */}
      <section className="bg-white" style={{ padding: '0 80px 60px' }}>
        <div className="flex gap-8">
          {/* Map Placeholder */}
          <div
            className="relative overflow-hidden"
            style={{
              flex: '1',
              minHeight: '500px',
              backgroundColor: '#E5E7EB',
              borderRadius: '16px',
            }}
          >
            {/* Map placeholder with pattern */}
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #EEF6F6 0%, #E0EDED 100%)',
              }}
            >
              <div className="text-center">
                <MapPin
                  className="mx-auto mb-4"
                  style={{ color: '#209DA7', width: '48px', height: '48px' }}
                />
                <p className="text-[16px] font-medium" style={{ color: '#091D33' }}>
                  Интерактивная карта
                </p>
                <p className="text-[13px]" style={{ color: '#6B7280' }}>
                  Здесь будет отображаться карта с филиалами
                </p>
              </div>
            </div>

            {/* Map pins simulation */}
            <div
              className="absolute"
              style={{
                width: '40px',
                height: '40px',
                backgroundColor: '#209DA7',
                borderRadius: '50% 50% 50% 0',
                transform: 'rotate(-45deg)',
                top: '30%',
                left: '40%',
                boxShadow: '0 4px 12px rgba(32, 157, 167, 0.4)',
              }}
            />
            <div
              className="absolute"
              style={{
                width: '30px',
                height: '30px',
                backgroundColor: '#EC910C',
                borderRadius: '50% 50% 50% 0',
                transform: 'rotate(-45deg)',
                top: '50%',
                left: '60%',
                boxShadow: '0 4px 12px rgba(236, 145, 12, 0.4)',
              }}
            />
            <div
              className="absolute"
              style={{
                width: '30px',
                height: '30px',
                backgroundColor: '#EC910C',
                borderRadius: '50% 50% 50% 0',
                transform: 'rotate(-45deg)',
                top: '45%',
                left: '25%',
                boxShadow: '0 4px 12px rgba(236, 145, 12, 0.4)',
              }}
            />
          </div>

          {/* Locations List */}
          <div style={{ width: '420px' }}>
            <h3
              className="text-[18px] font-semibold mb-5"
              style={{ color: '#091D33' }}
            >
              Наши филиалы ({locations.length})
            </h3>

            <div
              className="flex flex-col gap-4 overflow-y-auto pr-2"
              style={{ maxHeight: '450px' }}
            >
              {locations.map((location) => (
                <div
                  key={location.id}
                  className="cursor-pointer transition-all hover:shadow-md"
                  style={{
                    backgroundColor: location.isMain ? '#EEF6F6' : '#F9FAFB',
                    borderRadius: '12px',
                    padding: '20px',
                    border: location.isMain ? '2px solid #209DA7' : '1px solid transparent',
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4
                        className="text-[15px] font-semibold mb-1"
                        style={{ color: '#091D33' }}
                      >
                        {location.name}
                      </h4>
                      {location.isMain && (
                        <span
                          className="text-[10px] uppercase tracking-wider font-medium"
                          style={{
                            backgroundColor: '#209DA7',
                            color: 'white',
                            padding: '3px 8px',
                            borderRadius: '10px',
                          }}
                        >
                          Главный офис
                        </span>
                      )}
                    </div>
                    <button
                      className="p-2 rounded-full transition-colors"
                      style={{ backgroundColor: 'rgba(32, 157, 167, 0.1)' }}
                    >
                      <Navigation
                        className="h-4 w-4"
                        style={{ color: '#209DA7' }}
                      />
                    </button>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <MapPin
                        className="h-4 w-4 shrink-0"
                        style={{ color: '#9CA3AF' }}
                      />
                      <span className="text-[13px]" style={{ color: '#6B7280' }}>
                        {location.address}, {location.city}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone
                        className="h-4 w-4 shrink-0"
                        style={{ color: '#9CA3AF' }}
                      />
                      <a
                        href={`tel:${location.phone.replace(/\s/g, '')}`}
                        className="text-[13px] hover:underline"
                        style={{ color: '#209DA7' }}
                      >
                        {location.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock
                        className="h-4 w-4 shrink-0"
                        style={{ color: '#9CA3AF' }}
                      />
                      <span className="text-[13px]" style={{ color: '#6B7280' }}>
                        {location.workingHours}
                      </span>
                    </div>
                  </div>

                  {/* Services Tags */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {location.services.map((service) => (
                      <span
                        key={service}
                        className="text-[11px]"
                        style={{
                          backgroundColor: 'rgba(32, 157, 167, 0.1)',
                          color: '#209DA7',
                          padding: '4px 10px',
                          borderRadius: '12px',
                        }}
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Info Cards Section */}
      <section
        className="bg-white"
        style={{ padding: '40px 80px 80px' }}
      >
        <div className="grid grid-cols-3 gap-6">
          {/* Card 1 */}
          <div
            style={{
              backgroundColor: '#F9FAFB',
              borderRadius: '16px',
              padding: '32px',
            }}
          >
            <div
              className="flex items-center justify-center mb-5"
              style={{
                width: '60px',
                height: '60px',
                backgroundColor: '#209DA7',
                borderRadius: '12px',
              }}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <h3
              className="text-[18px] font-semibold mb-3"
              style={{ color: '#091D33' }}
            >
              Забор на дому
            </h3>
            <p className="text-[13px] leading-[1.7]" style={{ color: '#6B7280' }}>
              Закажите выезд медсестры на дом для забора анализов.
              Удобно, быстро и безопасно.
            </p>
            <button
              className="text-[13px] font-medium mt-4 inline-flex items-center gap-2"
              style={{ color: '#209DA7' }}
            >
              Заказать выезд
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Card 2 */}
          <div
            style={{
              backgroundColor: '#F9FAFB',
              borderRadius: '16px',
              padding: '32px',
            }}
          >
            <div
              className="flex items-center justify-center mb-5"
              style={{
                width: '60px',
                height: '60px',
                backgroundColor: '#EC910C',
                borderRadius: '12px',
              }}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <h3
              className="text-[18px] font-semibold mb-3"
              style={{ color: '#091D33' }}
            >
              Онлайн-запись
            </h3>
            <p className="text-[13px] leading-[1.7]" style={{ color: '#6B7280' }}>
              Запишитесь на удобное время онлайн и избегайте очередей.
              Экономьте своё время.
            </p>
            <button
              className="text-[13px] font-medium mt-4 inline-flex items-center gap-2"
              style={{ color: '#EC910C' }}
            >
              Записаться
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Card 3 */}
          <div
            style={{
              backgroundColor: '#F9FAFB',
              borderRadius: '16px',
              padding: '32px',
            }}
          >
            <div
              className="flex items-center justify-center mb-5"
              style={{
                width: '60px',
                height: '60px',
                backgroundColor: '#091D33',
                borderRadius: '12px',
              }}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <h3
              className="text-[18px] font-semibold mb-3"
              style={{ color: '#091D33' }}
            >
              Горячая линия
            </h3>
            <p className="text-[13px] leading-[1.7]" style={{ color: '#6B7280' }}>
              Позвоните нам для консультации или уточнения информации
              о наших услугах.
            </p>
            <a
              href="tel:+77273468525"
              className="text-[13px] font-medium mt-4 inline-flex items-center gap-2"
              style={{ color: '#091D33' }}
            >
              +7 727 346 8525
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="relative overflow-hidden"
        style={{
          backgroundColor: '#209DA7',
          padding: '70px 80px',
        }}
      >
        {/* Background decoration */}
        <div
          className="absolute"
          style={{
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            left: '-100px',
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        />

        <div className="relative flex items-center justify-between">
          {/* Left - Text */}
          <div>
            <p
              className="text-[11px] uppercase tracking-widest mb-3"
              style={{ color: 'rgba(255, 255, 255, 0.7)' }}
            >
              Не нашли удобный филиал?
            </p>
            <h2 className="text-[32px] font-semibold text-white leading-[1.3]">
              Закажите выезд
              <br />
              медсестры на дом
            </h2>
          </div>

          {/* Right - Button */}
          <button
            className="text-[14px] font-medium"
            style={{
              backgroundColor: 'white',
              color: '#091D33',
              padding: '16px 36px',
              borderRadius: '50px',
            }}
          >
            Заказать выезд на дом
          </button>
        </div>
      </section>
    </div>
  );
}
