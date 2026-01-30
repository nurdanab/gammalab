'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { MapPin, Clock, Phone, Mail, MessageCircle, Star, ExternalLink } from 'lucide-react';
import { formatPhoneNumber } from '@/utils/phoneFormat';
import { useReCaptcha } from '@/components/ReCaptchaProvider';

type Locale = 'ru' | 'kz' | 'en';

const translations = {
  ru: {
    home: 'Главная',
    pageTitle: 'Контакты',
    pageSubtitle: 'Свяжитесь с нами любым удобным способом',
    address: 'Адрес',
    addressValue: 'г. Алматы, ул. Ходжанова, 55а',
    openIn2gis: 'Открыть в 2ГИС',
    workingHours: 'Режим работы',
    weekdays: 'Пн-Пт',
    weekend: 'Сб-Вс',
    closed: 'выходной',
    emailLabel: 'Электронная почта',
    phones: 'Телефоны',
    messengers: 'Мессенджеры',
    feedbackTitle: 'Обратная связь',
    feedbackSubtitle: 'Оставьте ваш отзыв или задайте вопрос',
    firstName: 'Имя',
    lastName: 'Фамилия',
    email: 'Электронная почта',
    phone: 'Номер телефона',
    rateService: 'Оцените качество наших услуг',
    yourRating: 'Ваша оценка',
    outOf: 'из',
    message: 'Сообщение',
    messagePlaceholder: 'Напишите ваш отзыв или вопрос...',
    submit: 'Отправить',
    submitting: 'Отправка...',
    successMessage: 'Спасибо! Ваше сообщение успешно отправлено.',
  },
  kz: {
    home: 'Басты бет',
    pageTitle: 'Байланыс',
    pageSubtitle: 'Бізбен кез келген ыңғайлы жолмен байланысыңыз',
    address: 'Мекенжай',
    addressValue: 'Алматы қ., Ходжанов к., 55а',
    openIn2gis: '2ГИС-те ашу',
    workingHours: 'Жұмыс уақыты',
    weekdays: 'Дс-Жм',
    weekend: 'Сб-Жс',
    closed: 'демалыс',
    emailLabel: 'Электрондық пошта',
    phones: 'Телефондар',
    messengers: 'Мессенджерлер',
    feedbackTitle: 'Кері байланыс',
    feedbackSubtitle: 'Пікіріңізді қалдырыңыз немесе сұрақ қойыңыз',
    firstName: 'Аты',
    lastName: 'Тегі',
    email: 'Электрондық пошта',
    phone: 'Телефон нөмірі',
    rateService: 'Біздің қызмет сапасын бағалаңыз',
    yourRating: 'Сіздің бағаңыз',
    outOf: 'ішінен',
    message: 'Хабарлама',
    messagePlaceholder: 'Пікіріңізді немесе сұрағыңызды жазыңыз...',
    submit: 'Жіберу',
    submitting: 'Жіберілуде...',
    successMessage: 'Рахмет! Сіздің хабарламаңыз сәтті жіберілді.',
  },
  en: {
    home: 'Home',
    pageTitle: 'Contacts',
    pageSubtitle: 'Get in touch with us in any convenient way',
    address: 'Address',
    addressValue: 'Almaty, Khodzhanov St., 55a',
    openIn2gis: 'Open in 2GIS',
    workingHours: 'Working Hours',
    weekdays: 'Mon-Fri',
    weekend: 'Sat-Sun',
    closed: 'closed',
    emailLabel: 'Email',
    phones: 'Phone Numbers',
    messengers: 'Messengers',
    feedbackTitle: 'Feedback',
    feedbackSubtitle: 'Leave your feedback or ask a question',
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email',
    phone: 'Phone Number',
    rateService: 'Rate the quality of our services',
    yourRating: 'Your rating',
    outOf: 'out of',
    message: 'Message',
    messagePlaceholder: 'Write your feedback or question...',
    submit: 'Submit',
    submitting: 'Submitting...',
    successMessage: 'Thank you! Your message has been sent successfully.',
  },
};

export default function ContactsPage() {
  const locale = useLocale() as Locale;
  const t = translations[locale] || translations.ru;

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const { executeRecaptcha } = useReCaptcha();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Получаем токен reCAPTCHA
      const recaptchaToken = await executeRecaptcha('contact_form');

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, rating, type: 'contact', recaptchaToken }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Ошибка отправки');
      }

      setIsSubmitted(true);
      setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '' });
      setRating(0);
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка отправки');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      setFormData({ ...formData, phone: formatPhoneNumber(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: t.address,
      content: (
        <div>
          <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '8px' }}>
            {t.addressValue}
          </p>
          <a
            href="https://go.2gis.com/D23Va"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[13px] font-medium"
            style={{ color: '#209DA7' }}
          >
            <ExternalLink size={14} />
            {t.openIn2gis}
          </a>
        </div>
      ),
    },
    {
      icon: Clock,
      title: t.workingHours,
      lines: [
        `${t.weekdays}: 09:00 - 18:00`,
        `${t.weekend}: ${t.closed}`
      ],
    },
    {
      icon: Mail,
      title: t.emailLabel,
      lines: ['info@gammalab.kz', 'salem@gammalab.kz'],
      isLink: true,
      linkPrefix: 'mailto:',
    },
    {
      icon: Phone,
      title: t.phones,
      lines: ['+7-705-100-03-33'],
      isLink: true,
      linkPrefix: 'tel:',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative pt-[100px] sm:pt-[110px] lg:pt-[120px] pb-6 lg:pb-8">
        {/* Background Image */}
        <Image
          src="/images/hero-about.jpg"
          alt="Background"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#091D33]/60 via-[#091D33]/40 to-[#091D33]/60" />

        <div className="relative z-10 px-5 sm:px-8 md:px-12 lg:px-20">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 mb-6">
            <Link href="/" className="text-[13px] text-white/70 hover:text-white transition-colors">
              {t.home}
            </Link>
            <span className="text-[13px] text-white/50">/</span>
            <span className="text-[13px] text-white">
              {t.pageTitle}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-[28px] sm:text-[36px] lg:text-[42px] font-semibold mb-4 text-white">
            {t.pageTitle}
          </h1>
          <p className="text-[15px] leading-[1.8] max-w-[600px] text-white/80">
            {t.pageSubtitle}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-white px-5 sm:px-8 md:px-12 lg:px-20 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

            {/* Left Side - Map & Contact Info */}
            <div>
              {/* Map - 2GIS Widget */}
              <a
                href="https://go.2gis.com/D23Va"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block',
                  backgroundColor: 'white',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  marginBottom: '24px',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  transition: 'box-shadow 0.2s',
                }}
                className="hover:shadow-lg"
              >
                <div style={{ position: 'relative' }}>
                  <iframe
                    src="https://www.openstreetmap.org/export/embed.html?bbox=76.895%2C43.202%2C76.925%2C43.222&layer=mapnik&marker=43.212436%2C76.909764"
                    width="100%"
                    height="280"
                    style={{ border: 0, pointerEvents: 'none' }}
                    loading="lazy"
                    title="GammaLab - Ходжанова 55а"
                  />
                  {/* Clickable overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: 'transparent',
                    }}
                  />
                </div>
                <div style={{ padding: '16px', borderTop: '1px solid #f0f0f0' }}>
                  <p style={{ fontSize: '14px', fontWeight: '500', color: '#091D33', marginBottom: '4px' }}>
                    {t.addressValue}
                  </p>
                  <span
                    className="inline-flex items-center gap-2"
                    style={{
                      fontSize: '13px',
                      color: '#209DA7',
                      fontWeight: '500',
                    }}
                  >
                    <ExternalLink size={14} />
                    {t.openIn2gis}
                  </span>
                </div>
              </a>

              {/* Contact Info Cards */}
              <div
                style={{
                  backgroundColor: 'white',
                  borderRadius: '16px',
                  padding: '24px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                }}
              >
                <div className="space-y-5">
                  {contactInfo.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div key={index} className="flex items-start gap-4">
                        <div
                          style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            backgroundColor: '#e8f5f6',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                          }}
                        >
                          <Icon size={18} style={{ color: '#209DA7' }} />
                        </div>
                        <div>
                          <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#091D33', marginBottom: '4px' }}>
                            {item.title}
                          </h3>
                          {item.content ? (
                            item.content
                          ) : item.lines ? (
                            item.lines.map((line, lineIndex) => (
                              item.isLink ? (
                                <a
                                  key={lineIndex}
                                  href={`${item.linkPrefix}${line.replace(/[^+\d@.a-zA-Z-]/g, '')}`}
                                  style={{
                                    display: 'block',
                                    fontSize: '14px',
                                    color: '#209DA7',
                                    textDecoration: 'none',
                                    marginBottom: '2px',
                                  }}
                                >
                                  {line}
                                </a>
                              ) : (
                                <p
                                  key={lineIndex}
                                  style={{
                                    fontSize: '14px',
                                    color: '#6B7280',
                                    marginBottom: '2px',
                                  }}
                                >
                                  {line}
                                </p>
                              )
                            ))
                          ) : null}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Messenger Links */}
                <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #f0f0f0' }}>
                  <div className="flex items-center gap-3">
                    <MessageCircle size={18} style={{ color: '#209DA7' }} />
                    <span style={{ fontSize: '14px', fontWeight: '600', color: '#091D33' }}>{t.messengers}</span>
                  </div>
                  <div className="flex gap-3 mt-3">
                    <a
                      href="https://wa.me/77051000333"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        backgroundColor: '#25D366',
                        color: 'white',
                        padding: '10px 20px',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        fontSize: '14px',
                        fontWeight: '500',
                      }}
                    >
                      WhatsApp
                    </a>
                    <a
                      href="https://t.me/+77051000333"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        backgroundColor: '#0088cc',
                        color: 'white',
                        padding: '10px 20px',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        fontSize: '14px',
                        fontWeight: '500',
                      }}
                    >
                      Telegram
                    </a>
                    <a
                      href="https://www.instagram.com/gammalab_kz?igsh=aTU4dDZmYjF2MXli"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                        color: 'white',
                        padding: '10px 20px',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        fontSize: '14px',
                        fontWeight: '500',
                      }}
                    >
                      Instagram
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Feedback Form */}
            <div
              style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '32px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                height: 'fit-content',
              }}
            >
              <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#091D33', marginBottom: '8px' }}>
                {t.feedbackTitle}
              </h2>
              <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '24px' }}>
                {t.feedbackSubtitle}
              </p>

              <form onSubmit={handleSubmit}>
                {/* Name Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label style={{ fontSize: '13px', color: '#374151', marginBottom: '6px', display: 'block' }}>
                      {t.firstName}
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '1px solid #E5E7EB',
                        borderRadius: '8px',
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'border-color 0.2s',
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#209DA7'}
                      onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '13px', color: '#374151', marginBottom: '6px', display: 'block' }}>
                      {t.lastName}
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '1px solid #E5E7EB',
                        borderRadius: '8px',
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'border-color 0.2s',
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#209DA7'}
                      onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="mb-4">
                  <label style={{ fontSize: '13px', color: '#374151', marginBottom: '6px', display: 'block' }}>
                    {t.email}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="example@email.com"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      fontSize: '14px',
                      outline: 'none',
                      transition: 'border-color 0.2s',
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#209DA7'}
                    onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
                  />
                </div>

                {/* Phone */}
                <div className="mb-4">
                  <label style={{ fontSize: '13px', color: '#374151', marginBottom: '6px', display: 'block' }}>
                    {t.phone}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+7 700 123 45 67"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      fontSize: '14px',
                      outline: 'none',
                      transition: 'border-color 0.2s',
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#209DA7'}
                    onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
                  />
                </div>

                {/* Star Rating */}
                <div className="mb-4">
                  <label style={{ fontSize: '13px', color: '#374151', marginBottom: '10px', display: 'block' }}>
                    {t.rateService}
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        style={{
                          padding: '4px',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          transition: 'transform 0.2s',
                        }}
                      >
                        <Star
                          size={32}
                          fill={(hoverRating || rating) >= star ? '#EC910C' : 'none'}
                          stroke={(hoverRating || rating) >= star ? '#EC910C' : '#D1D5DB'}
                          strokeWidth={1.5}
                        />
                      </button>
                    ))}
                  </div>
                  {rating > 0 && (
                    <p style={{ fontSize: '13px', color: '#6B7280', marginTop: '8px' }}>
                      {t.yourRating}: {rating} {t.outOf} 5
                    </p>
                  )}
                </div>

                {/* Message */}
                <div className="mb-6">
                  <label style={{ fontSize: '13px', color: '#374151', marginBottom: '6px', display: 'block' }}>
                    {t.message}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder={t.messagePlaceholder}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      fontSize: '14px',
                      outline: 'none',
                      resize: 'vertical',
                      transition: 'border-color 0.2s',
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#209DA7'}
                    onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    padding: '14px 24px',
                    backgroundColor: isSubmitting ? '#9CA3AF' : '#209DA7',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '15px',
                    fontWeight: '500',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    transition: 'background-color 0.2s',
                  }}
                  onMouseEnter={(e) => !isSubmitting && (e.currentTarget.style.backgroundColor = '#1a8a93')}
                  onMouseLeave={(e) => !isSubmitting && (e.currentTarget.style.backgroundColor = '#209DA7')}
                >
                  {isSubmitting ? t.submitting : t.submit}
                </button>

                {/* Error Message */}
                {error && (
                  <div
                    style={{
                      marginTop: '16px',
                      padding: '12px 16px',
                      backgroundColor: '#FEE2E2',
                      color: '#991B1B',
                      borderRadius: '8px',
                      fontSize: '14px',
                      textAlign: 'center',
                    }}
                  >
                    {error}
                  </div>
                )}

                {/* Success Message */}
                {isSubmitted && (
                  <div
                    style={{
                      marginTop: '16px',
                      padding: '12px 16px',
                      backgroundColor: '#D1FAE5',
                      color: '#065F46',
                      borderRadius: '8px',
                      fontSize: '14px',
                      textAlign: 'center',
                    }}
                  >
                    {t.successMessage}
                  </div>
                )}
              </form>
            </div>
          </div>
      </section>
    </div>
  );
}
