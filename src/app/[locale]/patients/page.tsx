'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import {
  Check,
  ChevronDown,
  Phone,
  Mail
} from 'lucide-react';

type Locale = 'ru' | 'kz' | 'en';

interface Section {
  id: string;
  title_ru: string;
  title_kz: string;
  title_en: string;
  slug: string;
  order_index: number;
  is_visible: boolean;
}

interface Block {
  id: string;
  section_id: string;
  block_type: string;
  title_ru: string;
  title_kz: string;
  title_en: string;
  content_ru: Record<string, unknown>;
  content_kz: Record<string, unknown>;
  content_en: Record<string, unknown>;
  settings: Record<string, unknown>;
  order_index: number;
}

function getSectionTitle(section: Section, locale: Locale): string {
  switch (locale) {
    case 'kz': return section.title_kz || section.title_ru;
    case 'en': return section.title_en || section.title_ru;
    default: return section.title_ru;
  }
}

function getBlockTitle(block: Block, locale: Locale): string {
  switch (locale) {
    case 'kz': return block.title_kz || block.title_ru;
    case 'en': return block.title_en || block.title_ru;
    default: return block.title_ru;
  }
}

function getBlockContent(block: Block, locale: Locale): Record<string, unknown> {
  switch (locale) {
    case 'kz': return block.content_kz || block.content_ru || {};
    case 'en': return block.content_en || block.content_ru || {};
    default: return block.content_ru || {};
  }
}

export default function PatientsPage() {
  const locale = useLocale() as Locale;
  const [sections, setSections] = useState<Section[]>([]);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/patients-content');
        if (res.ok) {
          const data = await res.json();
          setSections(data.sections || []);
          setBlocks(data.blocks || []);
        }
      } catch (error) {
        console.error('Error fetching patients content:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const scrollToSection = (slug: string) => {
    const element = document.getElementById(slug);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const getBlocksForSection = (sectionId: string) => {
    return blocks.filter(b => b.section_id === sectionId).sort((a, b) => a.order_index - b.order_index);
  };

  const renderBlock = (block: Block) => {
    const title = getBlockTitle(block, locale);
    const content = getBlockContent(block, locale);
    const settings = block.settings || {};

    switch (block.block_type) {
      case 'text':
        return (
          <div key={block.id} style={{ marginBottom: '24px' }}>
            {title && (
              <h3 style={{ color: '#091D33', fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>
                {title}
              </h3>
            )}
            <p style={{ color: '#3D3D3D', fontSize: '15px', lineHeight: '1.8' }}>
              {content.text as string || ''}
            </p>
          </div>
        );

      case 'colored_block':
        const bgColor = (settings.bgColor as string) || '#f8fafa';
        const isAccent = bgColor === '#209DA7' || bgColor === '#fef7ed';
        const textColor = bgColor === '#209DA7' ? 'white' : (bgColor === '#fef7ed' ? '#78350f' : '#3D3D3D');
        const borderColor = bgColor === '#fef7ed' ? '#EC910C' : (bgColor === '#209DA7' ? 'transparent' : '#209DA7');

        return (
          <div
            key={block.id}
            style={{
              backgroundColor: bgColor,
              borderRadius: '12px',
              padding: '24px 32px',
              marginBottom: '24px',
              borderLeft: isAccent ? `3px solid ${borderColor}` : 'none'
            }}
          >
            {title && (
              <h3 style={{
                color: bgColor === '#209DA7' ? 'white' : '#091D33',
                fontSize: '18px',
                fontWeight: '600',
                marginBottom: '12px'
              }}>
                {title}
              </h3>
            )}
            <p style={{ color: textColor, fontSize: '14px', lineHeight: '1.7', margin: 0 }}>
              {content.text as string || ''}
            </p>
          </div>
        );

      case 'list':
        const listItems = (content.items as string[]) || [];
        return (
          <div key={block.id} style={{ marginBottom: '24px' }}>
            {title && (
              <h3 style={{ color: '#091D33', fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
                {title}
              </h3>
            )}
            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              {listItems.map((item, index) => (
                <li key={index} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  padding: '12px 0',
                  borderBottom: index < listItems.length - 1 ? '1px solid #f3f4f6' : 'none'
                }}>
                  <Check size={18} color="#209DA7" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ color: '#3D3D3D', fontSize: '14px', lineHeight: '1.5' }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        );

      case 'cards':
        const cards = (content.cards as { title: string; text: string }[]) || [];
        return (
          <div key={block.id} style={{ marginBottom: '24px' }}>
            {title && (
              <h3 style={{ color: '#091D33', fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
                {title}
              </h3>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {cards.map((card, index) => (
                <div key={index} style={{
                  padding: '20px',
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb'
                }}>
                  <h4 style={{ color: '#091D33', fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>
                    {card.title}
                  </h4>
                  <p style={{ color: '#6b7280', fontSize: '13px', lineHeight: '1.5', margin: 0 }}>
                    {card.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'faq':
        const faqs = (content.faqs as { question: string; answer: string }[]) || [];
        return (
          <div key={block.id} style={{ marginBottom: '24px' }}>
            {title && (
              <h3 style={{ color: '#091D33', fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
                {title}
              </h3>
            )}
            <div>
              {faqs.map((faq, index) => {
                const faqId = `${block.id}-${index}`;
                const isOpen = openFaq === faqId;
                return (
                  <div key={index} style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : faqId)}
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
                        {faq.question}
                      </span>
                      <ChevronDown
                        size={18}
                        color="#9ca3af"
                        style={{
                          flexShrink: 0,
                          transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
                          transition: 'transform 0.2s'
                        }}
                      />
                    </button>
                    {isOpen && (
                      <div style={{
                        padding: '0 0 20px',
                        color: '#6b7280',
                        fontSize: '14px',
                        lineHeight: '1.7'
                      }}>
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 'table':
        const rows = (content.rows as { label: string; value: string }[]) || [];
        return (
          <div key={block.id} style={{ marginBottom: '24px' }}>
            {title && (
              <h3 style={{ color: '#091D33', fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
                {title}
              </h3>
            )}
            <div>
              {rows.map((row, index) => (
                <div key={index} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '16px 0',
                  borderBottom: index < rows.length - 1 ? '1px solid #f3f4f6' : 'none'
                }}>
                  <span style={{ color: '#3D3D3D', fontSize: '14px' }}>
                    {row.label}
                  </span>
                  <span style={{ color: '#209DA7', fontSize: '14px', fontWeight: '600' }}>
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'contact_block':
        const contactTitle = content.contactTitle as string || '';
        const contactDesc = content.contactDesc as string || '';
        const phone = (settings.phone as string) || '+7 (705) 100-03-33';
        const email = (settings.email as string) || 'info@gammalab.kz';

        return (
          <div key={block.id} style={{
            backgroundColor: '#209DA7',
            borderRadius: '12px',
            padding: '32px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            marginBottom: '24px'
          }}>
            {/* Decorative circles */}
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
              {contactTitle && (
                <h3 style={{ color: 'white', fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
                  {contactTitle}
                </h3>
              )}
              {contactDesc && (
                <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '14px', marginBottom: '24px' }}>
                  {contactDesc}
                </p>
              )}
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <a
                  href={`tel:${phone.replace(/\D/g, '')}`}
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
                  {phone}
                </a>
                <a
                  href={`mailto:${email}`}
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
                  {email}
                </a>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <div className="pt-[120px] px-5 sm:px-8 md:px-12 lg:px-20 pb-10">
          <div className="animate-pulse max-w-[800px] mx-auto">
            <div className="h-8 w-48 bg-gray-200 rounded mb-8" />
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-32 bg-gray-200 rounded" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If no dynamic content, show fallback message
  if (sections.length === 0) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <section className="relative pt-[100px] sm:pt-[110px] lg:pt-[120px] pb-6 lg:pb-8">
          <Image
            src="/images/hero-about.jpg"
            alt="Background"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#091D33]/60 via-[#091D33]/40 to-[#091D33]/60" />
          <div className="relative z-10 px-5 sm:px-8 md:px-12 lg:px-20 text-center">
            <h1 className="text-2xl text-white font-semibold">
              {locale === 'kz' ? 'Пациенттерге' : locale === 'en' ? 'For Patients' : 'Пациентам'}
            </h1>
          </div>
        </section>
        <main className="py-12 lg:py-20 px-5 sm:px-8 md:px-12 lg:px-20">
          <div className="max-w-[800px] mx-auto text-center">
            <p className="text-gray-500">
              {locale === 'kz' ? 'Мазмұн жақында қосылады' : locale === 'en' ? 'Content coming soon' : 'Контент скоро будет добавлен'}
            </p>
          </div>
        </main>
      </div>
    );
  }

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
                  onClick={() => scrollToSection(section.slug)}
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
                  {getSectionTitle(section, locale)}
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
          {sections.map((section) => (
            <section key={section.id} id={section.slug} style={{ marginBottom: '80px' }}>
              <h2 style={{ color: '#091D33', fontSize: '24px', fontWeight: '600', marginBottom: '32px' }}>
                {getSectionTitle(section, locale)}
              </h2>

              {getBlocksForSection(section.id).map(block => renderBlock(block))}
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
