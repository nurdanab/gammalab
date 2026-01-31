'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';

interface MissionAccordionProps {
  locale: string;
}

// Lottie animation URLs from lottiefiles.com
const lottieAnimations = {
  target: 'https://lottie.host/e1b7c4e8-5a3c-4c5d-9c3b-8f7d4e2a1b3c/target-goal.json',
  eye: 'https://lottie.host/b2c8d5e9-6b4d-4d6e-0d4c-9g8e5f3b2c4d/vision-eye.json',
  check: 'https://lottie.host/c3d9e6f0-7c5e-4e7f-1e5d-0h9f6g4c3d5e/mission-check.json',
};

// Fallback SVG icons
const fallbackIcons: Record<string, React.ReactNode> = {
  target: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  eye: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  check: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
};

const missionItems = {
  ru: [
    {
      id: 'vision',
      title: 'Видение',
      icon: 'eye',
      text: 'Быть ведущей лабораторией Казахстана, задающей стандарты качества диагностики. Мы видим будущее, где каждый человек имеет доступ к точной и своевременной диагностике.',
    },
    {
      id: 'mission',
      title: 'Миссия',
      icon: 'check',
      text: 'Предоставление точных результатов молекулярно-генетической диагностики, помогая людям заботиться о своем здоровье и принимать обоснованные решения о лечении.',
    },
    {
      id: 'goal',
      title: 'Цель',
      icon: 'target',
      text: 'Внедрение инновационных технологий, обеспечение доступности высококачественных медицинских анализов для всех слоев населения. Мы стремимся сделать диагностику доступной и удобной для каждого.',
    },
  ],
  kz: [
    {
      id: 'vision',
      title: 'Көзқарас',
      icon: 'eye',
      text: 'Диагностика сапасының стандарттарын белгілейтін Қазақстанның жетекші зертханасы болу.',
    },
    {
      id: 'mission',
      title: 'Миссия',
      icon: 'check',
      text: 'Молекулярлық-генетикалық диагностиканың дәл нәтижелерін беру, адамдарға денсаулықтарына қамқорлық жасауға көмектесу.',
    },
    {
      id: 'goal',
      title: 'Мақсат',
      icon: 'target',
      text: 'Инновациялық технологияларды енгізу, барлық халық топтары үшін жоғары сапалы медициналық талдауларға қол жетімділікті қамтамасыз ету.',
    },
  ],
  en: [
    {
      id: 'vision',
      title: 'Vision',
      icon: 'eye',
      text: 'To be the leading laboratory in Kazakhstan, setting quality standards for diagnostics.',
    },
    {
      id: 'mission',
      title: 'Mission',
      icon: 'check',
      text: 'Providing accurate results of molecular genetic diagnostics, helping people take care of their health.',
    },
    {
      id: 'goal',
      title: 'Goal',
      icon: 'target',
      text: 'Implementation of innovative technologies, ensuring accessibility of high-quality medical tests for all segments of the population.',
    },
  ],
};

const readMoreText = {
  ru: 'Подробнее',
  kz: 'Толығырақ',
  en: 'Read more',
};

const iconColors = {
  target: '#209DA7',
  eye: '#091D33',
  check: '#EC910C',
};

// Animated Icon Component with Lottie
function AnimatedIcon({ icon, isHovered }: { icon: string; isHovered: boolean }) {
  const color = iconColors[icon as keyof typeof iconColors];

  return (
    <div
      className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl flex items-center justify-center transition-all duration-300"
      style={{
        backgroundColor: `${color}15`,
        color: color,
        transform: isHovered ? 'scale(1.1)' : 'scale(1)',
      }}
    >
      {fallbackIcons[icon]}
    </div>
  );
}

export default function MissionAccordion({ locale }: MissionAccordionProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const items = missionItems[locale as keyof typeof missionItems] || missionItems.ru;
  const readMore = readMoreText[locale as keyof typeof readMoreText] || readMoreText.ru;

  const handleClick = (id: string) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section className="py-12 lg:py-20 bg-white">
      <div className="container-main">
        {/* Grid of cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {items.map((item, index) => {
            const isActive = activeId === item.id;
            const isHovered = hoveredId === item.id;
            const color = iconColors[item.icon as keyof typeof iconColors];

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <motion.button
                  onClick={() => handleClick(item.id)}
                  className="w-full text-left bg-white border-2 rounded-2xl p-5 lg:p-6 transition-all duration-300 group"
                  style={{
                    borderColor: isActive || isHovered ? color : '#e5e7eb',
                    boxShadow: isActive ? `0 10px 30px ${color}25` : isHovered ? `0 8px 20px ${color}15` : 'none',
                  }}
                  whileHover={{ y: -4 }}
                >
                  <div className="flex items-start gap-4 lg:gap-5">
                    {/* Animated Icon */}
                    <div className="relative flex-shrink-0">
                      {/* Pulse effect */}
                      {(isActive || isHovered) && (
                        <>
                          <motion.div
                            className="absolute inset-0 rounded-2xl"
                            style={{ backgroundColor: color }}
                            animate={{ scale: [1, 1.4], opacity: [0.3, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                          <motion.div
                            className="absolute inset-0 rounded-2xl"
                            style={{ backgroundColor: color }}
                            animate={{ scale: [1, 1.2], opacity: [0.2, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                          />
                        </>
                      )}
                      <AnimatedIcon icon={item.icon} isHovered={isActive || isHovered} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 pt-2">
                      <h3 className="text-lg lg:text-xl font-semibold text-[#091D33] mb-2">
                        {item.title}
                      </h3>
                      <span
                        className="inline-flex items-center gap-1 text-sm transition-all"
                        style={{ color }}
                      >
                        {readMore}
                        <motion.svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          animate={{ rotate: isActive ? 90 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <path d="M9 18l6-6-6-6" />
                        </motion.svg>
                      </span>
                    </div>
                  </div>

                  {/* Expandable content */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div
                          className="pt-4 mt-4 border-t"
                          style={{ borderColor: `${color}30` }}
                        >
                          <p className="text-sm lg:text-[15px] leading-relaxed text-gray-500">
                            {item.text}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
