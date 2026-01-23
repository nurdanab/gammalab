'use client';

import { useState, useEffect } from 'react';

interface Review {
  id: string;
  name: string;
  nameKz: string;
  nameEn: string;
  text: string;
  textKz: string;
  textEn: string;
  rating: number;
  photo?: string;
}

interface Props {
  reviews: Review[];
  locale: string;
}

export default function TestimonialsCarousel({ reviews, locale }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const getReviewName = (review: Review) => {
    return locale === 'kz' ? review.nameKz : locale === 'en' ? review.nameEn : review.name;
  };

  const getReviewText = (review: Review) => {
    return locale === 'kz' ? review.textKz : locale === 'en' ? review.textEn : review.text;
  };

  // Auto-scroll every 5 seconds
  useEffect(() => {
    if (reviews.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [reviews.length]);

  if (reviews.length === 0) return null;

  const currentReview = reviews[currentIndex];

  return (
    <div className="flex-1 lg:max-w-[500px] text-center md:text-left">
      {/* Quote icon */}
      <div className="mb-4 flex justify-center md:justify-start">
        <svg width="40" height="32" viewBox="0 0 40 32" fill="#209DA7">
          <path d="M0 20.8C0 27.2 4.8 32 11.2 32c4.8 0 8.8-4 8.8-8.8 0-4.8-4-8.8-8.8-8.8-1.6 0-2.4 0-3.2.8C8.8 6.4 14.4 1.6 20 0L16.8 0C7.2 3.2 0 11.2 0 20.8zm20 0c0 6.4 4.8 11.2 11.2 11.2 4.8 0 8.8-4 8.8-8.8 0-4.8-4-8.8-8.8-8.8-1.6 0-2.4 0-3.2.8C28.8 6.4 34.4 1.6 40 0L36.8 0C27.2 3.2 20 11.2 20 20.8z"/>
        </svg>
      </div>

      {/* Quote text with fade animation */}
      <div className="min-h-[100px] transition-opacity duration-500">
        <p className="text-sm lg:text-base leading-[1.8] mb-5 text-gray-500">
          {getReviewText(currentReview)}
        </p>
      </div>

      {/* Author */}
      <div className="mb-5">
        <p className="text-lg font-semibold text-[#091D33]">
          {getReviewName(currentReview)}
        </p>
        <p className="text-xs uppercase tracking-wider text-[#209DA7]">
          {locale === 'kz' ? 'Пациент' : locale === 'en' ? 'Patient' : 'Пациент'}
        </p>
      </div>

      {/* Stars */}
      <div className="flex gap-1 justify-center md:justify-start mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill={star <= currentReview.rating ? '#FBBF24' : 'none'}
            stroke={star <= currentReview.rating ? '#FBBF24' : '#D1D5DB'}
            strokeWidth="2"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        ))}
      </div>

      {/* Dots - clickable */}
      <div className="flex gap-2 justify-center md:justify-start">
        {reviews.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              index === currentIndex ? 'bg-[#209DA7]' : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Отзыв ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
