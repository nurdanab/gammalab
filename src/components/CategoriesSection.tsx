'use client';

import { useState } from 'react';
import Link from 'next/link';

interface HomepageCategory {
  id: string;
  name: string;
  nameKz: string;
  nameEn: string;
  description: string;
  descriptionKz: string;
  descriptionEn: string;
  description2: string;
  description2Kz: string;
  description2En: string;
  tags: string[];
  tagsKz: string[];
  tagsEn: string[];
  order: number;
  featured: boolean;
}

interface CategoriesSectionProps {
  categories: HomepageCategory[];
  featuredCategory: HomepageCategory;
  locale: string;
}

export default function CategoriesSection({ categories, featuredCategory, locale }: CategoriesSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<HomepageCategory>(featuredCategory);

  const getCategoryName = (cat: HomepageCategory) => {
    return locale === 'kz' ? cat.nameKz : locale === 'en' ? cat.nameEn : cat.name;
  };

  const getCategoryDescription = (cat: HomepageCategory) => {
    return locale === 'kz' ? cat.descriptionKz : locale === 'en' ? cat.descriptionEn : cat.description;
  };

  const getCategoryDescription2 = (cat: HomepageCategory) => {
    return locale === 'kz' ? cat.description2Kz : locale === 'en' ? cat.description2En : cat.description2;
  };

  const getCategoryTags = (cat: HomepageCategory) => {
    return locale === 'kz' ? cat.tagsKz : locale === 'en' ? cat.tagsEn : cat.tags;
  };

  return (
    <section className="bg-white">
      <div className="container-main py-12 lg:py-20">
        <div className="relative overflow-hidden bg-[#EEF6F6] rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-12 xl:p-[60px]">
        {/* Background decorative icon - hidden on mobile */}
        <div className="hidden lg:block absolute right-12 top-1/2 -translate-y-1/2 opacity-10">
          <svg width="200" height="200" viewBox="0 0 24 24" fill="#209DA7" stroke="none">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>

        <div className="relative flex flex-col lg:flex-row gap-8 lg:gap-16">
          {/* Left - Categories */}
          <div className="flex flex-row flex-wrap lg:flex-col gap-3 lg:gap-4 lg:min-w-[220px]">
            {categories.map((cat, index) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs lg:text-[13px] uppercase tracking-wider font-medium transition-colors text-left ${
                  selectedCategory.id === cat.id ? 'text-[#209DA7]' : 'text-gray-400 hover:text-[#209DA7]'
                } ${index >= 3 ? 'hidden sm:block' : ''} ${index >= 4 ? 'hidden md:block' : ''} ${index >= 5 ? 'hidden lg:block' : ''}`}
              >
                {getCategoryName(cat)}
              </button>
            ))}
          </div>

          {/* Right - Content */}
          <div className="flex-1 lg:max-w-[500px]">
            <h3 className="text-2xl sm:text-[28px] lg:text-[32px] font-semibold mb-4 lg:mb-6 text-[#091D33]">
              {getCategoryName(selectedCategory)}
            </h3>

            <p className="text-sm leading-[1.8] mb-3 text-gray-500">
              {getCategoryDescription(selectedCategory)}
            </p>

            {getCategoryDescription2(selectedCategory) && (
              <p className="text-sm leading-[1.8] mb-5 text-gray-500 hidden sm:block">
                {getCategoryDescription2(selectedCategory)}
              </p>
            )}

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2 lg:gap-4 mb-6 lg:mb-8">
              {getCategoryTags(selectedCategory).map((tag, index, arr) => (
                <span key={index}>
                  <span className={`text-xs lg:text-[13px] text-[#209DA7] ${index >= 2 ? 'hidden sm:inline' : ''}`}>
                    {tag}
                  </span>
                  {index < arr.length - 1 && (
                    <span className={`text-gray-300 ml-2 lg:ml-4 ${index >= 1 ? 'hidden sm:inline' : ''}`}>|</span>
                  )}
                </span>
              ))}
            </div>

            {/* Button */}
            <Link
              href="/analyses"
              className="inline-block text-white text-xs lg:text-[13px] font-medium uppercase tracking-wider hover:opacity-90 transition-opacity bg-[#209DA7] px-6 lg:px-8 py-3 lg:py-4 rounded-lg"
            >
              {locale === 'kz' ? 'Толығырақ' : locale === 'en' ? 'Learn more' : 'Подробнее'}
            </Link>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
