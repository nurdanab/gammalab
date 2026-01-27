'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import {
  FlaskConical,
  Microscope,
  Sun,
  Heart,
  Dna,
  Brain,
  Droplets,
  Building2,
  User,
  Phone,
  Briefcase,
  MapPin,
  ChevronDown,
} from 'lucide-react';

type Locale = 'ru' | 'kz' | 'en';

const STORAGE_KEY = 'gammalab_doctor_registered';

// Sidebar navigation config
const sidebarItems = [
  { id: 'about', icon: Building2 },
  { id: 'lung', icon: FlaskConical },
  { id: 'melanoma', icon: Sun },
  { id: 'breast', icon: Heart },
  { id: 'colorectal', icon: Microscope },
  { id: 'fgfr', icon: Dna },
  { id: 'glioma', icon: Brain },
  { id: 'liquidBiopsy', icon: Droplets },
];

const sidebarLabels = {
  ru: {
    about: 'О лаборатории',
    lung: 'Рак легкого',
    melanoma: 'Меланома',
    breast: 'Рак молочной железы',
    colorectal: 'Колоректальный рак',
    fgfr: 'Семейство генов FGFR',
    glioma: 'Глиома',
    liquidBiopsy: 'Жидкостная биопсия',
  },
  kz: {
    about: 'Зертхана туралы',
    lung: 'Өкпе рагі',
    melanoma: 'Меланома',
    breast: 'Сүт безі рагі',
    colorectal: 'Колоректальды рак',
    fgfr: 'FGFR гендер отбасы',
    glioma: 'Глиома',
    liquidBiopsy: 'Сұйық биопсия',
  },
  en: {
    about: 'About the laboratory',
    lung: 'Lung cancer',
    melanoma: 'Melanoma',
    breast: 'Breast cancer',
    colorectal: 'Colorectal cancer',
    fgfr: 'FGFR gene family',
    glioma: 'Glioma',
    liquidBiopsy: 'Liquid biopsy',
  },
};

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

// =============================================
// MAIN COMPONENT
// =============================================

export default function DoctorsPage() {
  const locale = useLocale() as Locale;
  const [activeSection, setActiveSection] = useState('about');
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
  const labels = sidebarLabels[locale] || sidebarLabels.ru;

  const getContent = () => {
    switch (activeSection) {
      case 'about':
        return { title: labels.about, content: <AboutSection locale={locale} /> };
      case 'lung':
        return { title: labels.lung, content: <p>Контент в разработке</p> };
      case 'melanoma':
        return { title: labels.melanoma, content: <p>Контент в разработке</p> };
      case 'breast':
        return { title: labels.breast, content: <p>Контент в разработке</p> };
      case 'colorectal':
        return { title: labels.colorectal, content: <p>Контент в разработке</p> };
      case 'fgfr':
        return { title: labels.fgfr, content: <p>Контент в разработке</p> };
      case 'glioma':
        return { title: labels.glioma, content: <p>Контент в разработке</p> };
      case 'liquidBiopsy':
        return { title: labels.liquidBiopsy, content: <p>Контент в разработке</p> };
      default:
        return { title: '', content: null };
    }
  };

  // Loading state — ждём чтения localStorage
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

  // Не зарегистрирован — показываем форму
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

  // Зарегистрирован — показываем контент
  const currentContent = getContent();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Hero Section */}
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

      {/* Main Content */}
      <section className="bg-white px-5 sm:px-8 md:px-12 lg:px-20 py-12 lg:py-20">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Sidebar Navigation */}
          <aside
            className="lg:w-72 flex-shrink-0"
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              overflow: 'hidden',
              height: 'fit-content',
            }}
          >
            <nav>
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className="w-full text-left flex items-center gap-3 transition-colors"
                    style={{
                      padding: '16px 20px',
                      backgroundColor: isActive ? '#209DA7' : 'transparent',
                      color: isActive ? 'white' : '#3D3D3D',
                      borderBottom: '1px solid #f0f0f0',
                      fontSize: '14px',
                      fontWeight: isActive ? '500' : '400',
                    }}
                  >
                    <Icon size={18} style={{ color: isActive ? 'white' : '#EC910C' }} />
                    {labels[item.id as keyof typeof labels]}
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Content Area */}
          <main className="flex-1">
            <div
              className="p-6 sm:p-8 lg:p-[50px_60px]"
              style={{
                backgroundColor: '#e8f5f6',
                borderRadius: '12px',
              }}
            >
              <h2
                className="text-2xl"
                style={{
                  color: '#EC910C',
                  marginBottom: '24px',
                  textAlign: 'center',
                  fontWeight: '700',
                }}
              >
                {currentContent.title}
              </h2>
              <div
                style={{
                  color: '#3D3D3D',
                  fontSize: '15px',
                  lineHeight: '1.8',
                }}
              >
                {currentContent.content}
              </div>
            </div>
          </main>
        </div>
      </section>
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
    // Extract only digits
    let digits = input.replace(/\D/g, '');
    // Always start with 7
    if (digits.length === 0) {
      setPhone('+7 ');
      return;
    }
    if (digits[0] === '8') digits = '7' + digits.slice(1);
    if (digits[0] !== '7') digits = '7' + digits;
    // Limit to 11 digits (7 + 10)
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

// =============================================
// SECTION COMPONENTS
// =============================================

function AboutSection({ locale }: { locale: Locale }) {
  const t = {
    ru: {
      p1: 'Диагностическая лаборатория «Gammalab (ГаммаЛаб)» — это современная молекулярно-генетическая лаборатория — это объединение профессионалов, сплочённая команда, решающая ряд перспективных научно-практических задач, связанных с различными направлениями современных технологий в области диагностики заболеваний.',
      p2: 'Основной целью работы лаборатории является научно-исследовательская деятельность по перспективным направлениям в сфере лабораторной диагностики, а также внедрение новых решений, связанных с молекулярным профилированием опухоли, обеспечивая первую ступень персонифицированной медицины.',
      p3: 'Лаборатория оснащена самым современным оборудованием, позволяющим проводить исследования на уровне, соответствующем международным стандартам.',
    },
    kz: {
      p1: '«Gammalab (ГаммаЛаб)» диагностикалық зертханасы — бұл заманауи молекулярлық-генетикалық зертхана, аурулардың диагностикасы саласындағы заманауи технологиялардың әртүрлі бағыттарымен байланысты бірқатар перспективалық ғылыми-практикалық міндеттерді шешетін кәсіпқойлар бірлестігі.',
      p2: 'Зертхананың негізгі мақсаты — зертханалық диагностика саласындағы перспективалық бағыттар бойынша ғылыми-зерттеу қызметі, сондай-ақ ісіктің молекулярлық профилін жасаумен байланысты жаңа шешімдерді енгізу, персонализацияланған медицинаның бірінші сатысын қамтамасыз ету.',
      p3: 'Зертхана халықаралық стандарттарға сәйкес деңгейде зерттеулер жүргізуге мүмкіндік беретін ең заманауи жабдықтармен жабдықталған.',
    },
    en: {
      p1: 'Diagnostic Laboratory "Gammalab" is a modern molecular genetic laboratory — an association of professionals, a cohesive team solving a number of promising scientific and practical tasks related to various areas of modern technologies in the field of disease diagnostics.',
      p2: 'The main goal of the laboratory is research activities in promising areas of laboratory diagnostics, as well as the implementation of new solutions related to molecular tumor profiling, providing the first step of personalized medicine.',
      p3: 'The laboratory is equipped with the most modern equipment, allowing research at a level that meets international standards.',
    },
  };

  const text = t[locale] || t.ru;

  return (
    <>
      <p style={{ marginBottom: '16px' }}>{text.p1}</p>
      <p style={{ marginBottom: '16px' }}>{text.p2}</p>
      <p>{text.p3}</p>
    </>
  );
}
