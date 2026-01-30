'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Link } from '@/i18n/routing';

interface HeroSlide {
  id: string;
  title: string;
  titleKz: string;
  titleEn: string;
  description: string;
  descriptionKz: string;
  descriptionEn: string;
  image: string;
}

const staticTexts = {
  ru: {
    badge: 'Медицинская лаборатория',
    cta: 'Связаться с нами',
  },
  kz: {
    badge: 'Медициналық зертхана',
    cta: 'Бізбен байланысу',
  },
  en: {
    badge: 'Medical Laboratory',
    cta: 'Contact us',
  },
};

interface HeroCarouselProps {
  slides: HeroSlide[];
  locale: string;
}

export default function HeroCarousel({ slides, locale }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const getLocalizedText = useCallback((ru: string, kz: string, en: string) => {
    if (locale === 'kz') return kz || ru;
    if (locale === 'en') return en || ru;
    return ru;
  }, [locale]);

  // Auto-advance every 5 seconds
  useEffect(() => {
    if (slides.length <= 1) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  if (!slides || slides.length === 0) return null;

  const currentSlide = slides[currentIndex];

  const slideVariants = {
    enter: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? 100 : -100,
    }),
    center: {
      opacity: 1,
      x: 0,
    },
    exit: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? -100 : 100,
    }),
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2 + i * 0.1,
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      },
    }),
  };

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '500px',
        overflow: 'hidden',
        backgroundColor: '#F6F7F9',
      }}
      className="sm:min-h-[550px] lg:min-h-[700px]"
    >
      {/* Background Image with Animation */}
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentSlide.id}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            position: 'absolute',
            inset: 0,
          }}
        >
          <Image
            src={currentSlide.image}
            alt={getLocalizedText(currentSlide.title, currentSlide.titleKz, currentSlide.titleEn)}
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            priority
          />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div
        className="container-main"
        style={{
          position: 'relative',
          zIndex: 10,
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          paddingTop: '160px',
          paddingBottom: '80px',
        }}
      >
        <div style={{ maxWidth: '600px' }}>
          {/* Static Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              backgroundColor: 'white',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              borderRadius: '50px',
              marginBottom: '24px',
            }}
          >
            <div
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: '#209DA7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ color: 'white', fontWeight: 'bold', fontSize: '12px' }}>G</span>
            </div>
            <span style={{ color: '#091D33', fontSize: '14px', fontWeight: '500' }}>
              {staticTexts[locale as keyof typeof staticTexts]?.badge || staticTexts.ru.badge}
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={currentSlide.id + '-content'}>
              {/* Title */}
              <motion.h1
                custom={0}
                variants={textVariants}
                initial="hidden"
                animate="visible"
                style={{
                  fontSize: 'clamp(28px, 5vw, 48px)',
                  fontWeight: '700',
                  color: '#091D33',
                  lineHeight: '1.2',
                  marginBottom: '20px',
                }}
              >
                {getLocalizedText(currentSlide.title, currentSlide.titleKz, currentSlide.titleEn)}
              </motion.h1>

              {/* Description */}
              {(currentSlide.description || currentSlide.descriptionKz || currentSlide.descriptionEn) && (
                <motion.p
                  custom={1}
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                  style={{
                    fontSize: '16px',
                    color: '#4B5563',
                    lineHeight: '1.7',
                    marginBottom: '32px',
                    maxWidth: '500px',
                  }}
                >
                  {getLocalizedText(currentSlide.description, currentSlide.descriptionKz, currentSlide.descriptionEn)}
                </motion.p>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Static CTA Button */}
          <Link
            href="/contacts"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '16px 32px',
              backgroundColor: '#EC910C',
              color: 'white',
              borderRadius: '50px',
              fontSize: '15px',
              fontWeight: '600',
              textDecoration: 'none',
              transition: 'transform 0.3s, box-shadow 0.3s',
            }}
            className="hover:scale-105 hover:shadow-lg"
          >
            {staticTexts[locale as keyof typeof staticTexts]?.cta || staticTexts.ru.cta}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Decorative Elements */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          border: '2px solid rgba(255, 255, 255, 0.1)',
        }}
      />
    </section>
  );
}
