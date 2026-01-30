'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import Image from 'next/image';
import {
  FileText,
  Droplets,
  Clock,
  HelpCircle,
  Shield,
  Check,
  ChevronDown,
  Phone,
  Mail
} from 'lucide-react';

const sections = [
  { id: 'preparation', icon: FileText },
  { id: 'rules', icon: Droplets },
  { id: 'deadlines', icon: Clock },
  { id: 'faq', icon: HelpCircle },
  { id: 'rights', icon: Shield },
];

export default function PatientsPage() {
  const t = useTranslations('patients');
  const [openFaq, setOpenFaq] = useState<number | null>(1);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero */}
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

        <div className="relative z-10 px-5 sm:px-8 md:px-12 lg:px-20 text-center">
          {/* Navigation */}
          <nav className="flex flex-wrap justify-center items-center" style={{ gap: '24px' }}>
            {sections.map((section, index) => (
              <div key={section.id} className="flex items-center" style={{ gap: '24px' }}>
                <button
                  onClick={() => scrollToSection(section.id)}
                  className="transition-opacity hover:opacity-70"
                  style={{
                    fontSize: '14px',
                    color: 'rgba(255,255,255,0.9)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0
                  }}
                >
                  {t(`sections.${section.id}`)}
                </button>
                {index < sections.length - 1 && (
                  <span style={{ color: 'rgba(255,255,255,0.3)' }}>|</span>
                )}
              </div>
            ))}
          </nav>
        </div>
      </section>

      {/* Content */}
      <main className="py-12 lg:py-20 px-5 sm:px-8 md:px-12 lg:px-20">
        <div className="max-w-[800px] mx-auto">

          {/* Подготовка к анализам */}
          <section id="preparation" style={{ marginBottom: '80px' }}>
            <h2 style={{ color: '#091D33', fontSize: '24px', fontWeight: '600', marginBottom: '32px' }}>
              {t('preparationSection.title')}
            </h2>

            {/* IGRA */}
            <div style={{
              backgroundColor: '#f8fafa',
              borderRadius: '12px',
              padding: '32px',
              marginBottom: '32px'
            }}>
              <div style={{ marginBottom: '24px' }}>
                <span style={{
                  color: '#209DA7',
                  fontSize: '13px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  {t('preparationSection.igraTitle')}
                </span>
                <h3 style={{ color: '#091D33', fontSize: '18px', fontWeight: '600', marginTop: '8px' }}>
                  {t('preparationSection.igraSubtitle')}
                </h3>
                <p style={{ color: '#6b7280', marginTop: '8px', lineHeight: '1.7' }}>
                  {t('preparationSection.igraDesc')}
                </p>
              </div>

              <div style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                padding: '20px',
                borderLeft: '3px solid #209DA7'
              }}>
                <h4 style={{ color: '#091D33', fontSize: '15px', fontWeight: '600', marginBottom: '8px' }}>
                  {t('preparationSection.elispotTitle')}
                </h4>
                <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
                  {t('preparationSection.elispotDesc')}
                </p>
              </div>
            </div>

            {/* Преимущества */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {[1, 2, 3].map((num) => (
                <div key={num} style={{
                  padding: '20px',
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb'
                }}>
                  <h4 style={{ color: '#091D33', fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>
                    {t(`preparationSection.advantage${num}Title`)}
                  </h4>
                  <p style={{ color: '#6b7280', fontSize: '13px', lineHeight: '1.5', margin: 0 }}>
                    {t(`preparationSection.advantage${num}Desc`)}
                  </p>
                </div>
              ))}
            </div>

            {/* Рекомендации */}
            <div>
              <h3 style={{ color: '#091D33', fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
                {t('preparationSection.generalPrepTitle')}
              </h3>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                {[0, 1, 2, 3].map((index) => (
                  <li key={index} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    padding: '12px 0',
                    borderBottom: index < 3 ? '1px solid #f3f4f6' : 'none'
                  }}>
                    <Check size={18} color="#209DA7" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ color: '#3D3D3D', fontSize: '14px', lineHeight: '1.5' }}>
                      {t(`preparationSection.generalPrepList.${index}`)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Правила забора */}
          <section id="rules" style={{ marginBottom: '80px' }}>
            <h2 style={{ color: '#091D33', fontSize: '24px', fontWeight: '600', marginBottom: '32px' }}>
              {t('rulesSection.title')}
            </h2>

            <p style={{ color: '#3D3D3D', fontSize: '15px', lineHeight: '1.8', marginBottom: '32px' }}>
              {t('rulesSection.mainRule')}
            </p>

            <h3 style={{ color: '#091D33', fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
              {t('rulesSection.volumeTitle')}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
              {[1, 2, 3].map((num) => (
                <div key={num} style={{
                  padding: '20px',
                  borderRadius: '8px',
                  backgroundColor: '#f8fafa',
                  textAlign: 'center'
                }}>
                  <div style={{ color: '#209DA7', fontSize: '20px', fontWeight: '700', marginBottom: '4px' }}>
                    {t(`rulesSection.volumeAmount${num}`)}
                  </div>
                  <div style={{ color: '#6b7280', fontSize: '13px' }}>
                    {t(`rulesSection.volume${num}`)}
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              backgroundColor: '#fef7ed',
              borderRadius: '8px',
              padding: '20px',
              borderLeft: '3px solid #EC910C'
            }}>
              <h4 style={{ color: '#091D33', fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>
                {t('rulesSection.importantTitle')}
              </h4>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                {[1, 2, 3].map((num) => (
                  <li key={num} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    marginBottom: num < 3 ? '8px' : 0
                  }}>
                    <Check size={16} color="#EC910C" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ color: '#78350f', fontSize: '13px', lineHeight: '1.5' }}>
                      {t(`rulesSection.important${num}`)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Сроки */}
          <section id="deadlines" style={{ marginBottom: '80px' }}>
            <h2 style={{ color: '#091D33', fontSize: '24px', fontWeight: '600', marginBottom: '32px' }}>
              {t('deadlinesSection.title')}
            </h2>

            <div style={{ marginBottom: '24px' }}>
              {[
                { id: 'tspot' },
                { id: 'pcr' },
                { id: 'ihc' },
                { id: 'fish' }
              ].map((item, index, arr) => (
                <div key={item.id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '16px 0',
                  borderBottom: index < arr.length - 1 ? '1px solid #f3f4f6' : 'none'
                }}>
                  <span style={{ color: '#3D3D3D', fontSize: '14px' }}>
                    {t(`deadlinesSection.${item.id}Title`)}
                  </span>
                  <span style={{ color: '#209DA7', fontSize: '14px', fontWeight: '600' }}>
                    {t(`deadlinesSection.${item.id}Deadline`)}
                  </span>
                </div>
              ))}
            </div>

            <p style={{
              color: '#6b7280',
              fontSize: '13px',
              lineHeight: '1.6',
              padding: '16px',
              backgroundColor: '#f8fafa',
              borderRadius: '8px'
            }}>
              {t('deadlinesSection.note')}
            </p>
          </section>

          {/* FAQ */}
          <section id="faq" style={{ marginBottom: '80px' }}>
            <h2 style={{ color: '#091D33', fontSize: '24px', fontWeight: '600', marginBottom: '32px' }}>
              {t('faqSection.title')}
            </h2>

            <div>
              {[1, 2, 3, 4, 5].map((num) => (
                <div key={num} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <button
                    onClick={() => setOpenFaq(openFaq === num ? null : num)}
                    style={{
                      width: '100%',
                      padding: '20px 0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '16px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <span style={{
                      color: '#091D33',
                      fontSize: '15px',
                      fontWeight: '500',
                      lineHeight: '1.4'
                    }}>
                      {t(`faqSection.q${num}`)}
                    </span>
                    <ChevronDown
                      size={18}
                      color="#9ca3af"
                      style={{
                        flexShrink: 0,
                        transform: openFaq === num ? 'rotate(180deg)' : 'rotate(0)',
                        transition: 'transform 0.2s'
                      }}
                    />
                  </button>
                  {openFaq === num && (
                    <div style={{
                      padding: '0 0 20px',
                      color: '#6b7280',
                      fontSize: '14px',
                      lineHeight: '1.7'
                    }}>
                      {t(`faqSection.a${num}`)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Права */}
          <section id="rights">
            <h2 style={{ color: '#091D33', fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>
              {t('rightsSection.title')}
            </h2>
            <p style={{ color: '#6b7280', fontSize: '15px', marginBottom: '32px', lineHeight: '1.7' }}>
              {t('rightsSection.intro')}
            </p>

            <div style={{ marginBottom: '40px' }}>
              {[1, 2, 3, 4, 5].map((num) => (
                <div key={num} style={{
                  display: 'flex',
                  gap: '16px',
                  padding: '20px 0',
                  borderBottom: num < 5 ? '1px solid #f3f4f6' : 'none'
                }}>
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    backgroundColor: '#e8f5f6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    color: '#209DA7',
                    fontSize: '13px',
                    fontWeight: '600'
                  }}>
                    {num}
                  </div>
                  <div>
                    <h4 style={{ color: '#091D33', fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>
                      {t(`rightsSection.right${num}Title`)}
                    </h4>
                    <p style={{ color: '#6b7280', fontSize: '13px', margin: 0, lineHeight: '1.6' }}>
                      {t(`rightsSection.right${num}Desc`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Контакты */}
            <div style={{
              backgroundColor: '#209DA7',
              borderRadius: '12px',
              padding: '32px',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Декоративные круги */}
              <div style={{
                position: 'absolute',
                right: '-100px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '250px',
                height: '250px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.08)',
                pointerEvents: 'none'
              }} />
              <div style={{
                position: 'absolute',
                left: '-80px',
                top: '-80px',
                width: '180px',
                height: '180px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.06)',
                pointerEvents: 'none'
              }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h3 style={{ color: 'white', fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
                  {t('rightsSection.contactTitle')}
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '14px', marginBottom: '24px' }}>
                  {t('rightsSection.contactDesc')}
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-3">
                  <a
                    href="tel:+77051000333"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      backgroundColor: 'white',
                      color: '#209DA7',
                      padding: '12px 24px',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      fontSize: '14px',
                      fontWeight: '600'
                    }}
                  >
                    <Phone size={16} />
                    +7 (705) 100-03-33
                  </a>
                  <a
                    href="mailto:info@gammalab.kz"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      backgroundColor: 'transparent',
                      color: 'white',
                      padding: '12px 24px',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      fontSize: '14px',
                      border: '1px solid rgba(255,255,255,0.5)'
                    }}
                  >
                    <Mail size={16} />
                    info@gammalab.kz
                  </a>
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
