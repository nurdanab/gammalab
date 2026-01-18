'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { MapPin, Clock, Phone, Mail, MessageCircle, Star } from 'lucide-react';

export default function ContactsPage() {
  const t = useTranslations('contactsPage');
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log({ ...formData, rating });
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: t('address'),
      lines: [
        'г. Алматы, 8-й Микрорайон, 37/1',
        'БЦ "Алматы Тауэрс", офис 305'
      ],
    },
    {
      icon: Clock,
      title: t('workingHours'),
      lines: [
        t('weekdays') + ': 09:00 - 18:00',
        t('saturday') + ': 09:00 - 14:00',
        t('sunday') + ': ' + t('closed')
      ],
    },
    {
      icon: Mail,
      title: t('emailLabel'),
      lines: ['info@gammalab.kz', 'salem@gammalab.kz'],
      isLink: true,
      linkPrefix: 'mailto:',
    },
    {
      icon: Phone,
      title: t('phones'),
      lines: ['+7 (727) 346-85-25', '+7 (705) 100-03-33'],
      isLink: true,
      linkPrefix: 'tel:',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <section
        className="relative"
        style={{
          backgroundColor: '#209DA7',
          padding: '60px 0'
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <h1 className="text-white text-3xl lg:text-4xl font-semibold text-center">
            {t('pageTitle')}
          </h1>
          <p className="text-white/80 text-center mt-4">
            {t('pageSubtitle')}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section style={{ padding: '60px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Left Side - Map & Contact Info */}
            <div>
              {/* Map - OpenStreetMap (free) */}
              <div
                style={{
                  backgroundColor: 'white',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  marginBottom: '24px',
                }}
              >
                <iframe
                  src="https://www.openstreetmap.org/export/embed.html?bbox=76.92%2C43.23%2C76.94%2C43.24&layer=mapnik&marker=43.234%2C76.929"
                  width="100%"
                  height="280"
                  style={{ border: 0 }}
                  loading="lazy"
                  title="GammaLab Location"
                />
                <div style={{ padding: '12px 16px', borderTop: '1px solid #f0f0f0', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <a
                    href="https://2gis.kz/almaty/geo/9429940000646318"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: '13px', color: '#209DA7', textDecoration: 'none' }}
                  >
                    2GIS
                  </a>
                  <a
                    href="https://yandex.kz/maps/?pt=76.929,43.234&z=16&l=map"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: '13px', color: '#209DA7', textDecoration: 'none' }}
                  >
                    Yandex
                  </a>
                  <a
                    href="https://www.google.com/maps?q=43.234,76.929"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: '13px', color: '#209DA7', textDecoration: 'none' }}
                  >
                    Google Maps
                  </a>
                </div>
              </div>

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
                          {item.lines.map((line, lineIndex) => (
                            item.isLink ? (
                              <a
                                key={lineIndex}
                                href={`${item.linkPrefix}${line.replace(/[^+\d@.a-zA-Z]/g, '')}`}
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
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Messenger Links */}
                <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #f0f0f0' }}>
                  <div className="flex items-center gap-3">
                    <MessageCircle size={18} style={{ color: '#209DA7' }} />
                    <span style={{ fontSize: '14px', fontWeight: '600', color: '#091D33' }}>{t('messengers')}</span>
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
                {t('feedbackTitle')}
              </h2>
              <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '24px' }}>
                {t('feedbackSubtitle')}
              </p>

              <form onSubmit={handleSubmit}>
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label style={{ fontSize: '13px', color: '#374151', marginBottom: '6px', display: 'block' }}>
                      {t('firstName')}
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
                      {t('lastName')}
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
                    {t('email')}
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
                    {t('phone')}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+7 (___) ___-__-__"
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
                    {t('rateService')}
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
                      {t('yourRating')}: {rating} {t('outOf')} 5
                    </p>
                  )}
                </div>

                {/* Message */}
                <div className="mb-6">
                  <label style={{ fontSize: '13px', color: '#374151', marginBottom: '6px', display: 'block' }}>
                    {t('message')}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder={t('messagePlaceholder')}
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
                  style={{
                    width: '100%',
                    padding: '14px 24px',
                    backgroundColor: '#209DA7',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '15px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1a8a93'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#209DA7'}
                >
                  {t('submit')}
                </button>

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
                    {t('successMessage')}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
