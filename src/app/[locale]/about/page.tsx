'use client';

import { useState, useEffect, Fragment } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Users, Award, FileCheck, CheckCircle } from 'lucide-react';

// Подтемы бокового меню (id для связи с переводами)
const sidebarItemsConfig = [
  { id: 'about', icon: Users },
  { id: 'advantages', icon: Award },
  { id: 'analyses', icon: FileCheck },
  { id: 'equipment', icon: Award },
  { id: 'reagents', icon: CheckCircle },
  { id: 'labTests', icon: FileCheck },
  { id: 'logistics', icon: Award },
  { id: 'quality', icon: Award },
  { id: 'licenses', icon: FileCheck },
  { id: 'experience', icon: Users },
];

// Компонент круговой диаграммы для ONCO-профиля
function OncoPieChart({ labels, highlightFirst }: { labels: string[]; highlightFirst?: boolean }) {
  const segments = [
    { label: labels[0], color: '#209DA7', startAngle: 0, endAngle: 72, highlighted: true },
    { label: labels[1], color: '#2BBAC6', startAngle: 72, endAngle: 144, highlighted: false },
    { label: labels[2], color: '#EC910C', startAngle: 144, endAngle: 216, highlighted: false },
    { label: labels[3], color: '#166A71', startAngle: 216, endAngle: 288, highlighted: false },
    { label: labels[4], color: '#F4B860', startAngle: 288, endAngle: 360, highlighted: false },
  ];

  const createArcPath = (startAngle: number, endAngle: number, outerRadius: number, innerRadius: number) => {
    const startRad = (startAngle - 90) * Math.PI / 180;
    const endRad = (endAngle - 90) * Math.PI / 180;
    const x1 = 120 + outerRadius * Math.cos(startRad);
    const y1 = 120 + outerRadius * Math.sin(startRad);
    const x2 = 120 + outerRadius * Math.cos(endRad);
    const y2 = 120 + outerRadius * Math.sin(endRad);
    const x3 = 120 + innerRadius * Math.cos(endRad);
    const y3 = 120 + innerRadius * Math.sin(endRad);
    const x4 = 120 + innerRadius * Math.cos(startRad);
    const y4 = 120 + innerRadius * Math.sin(startRad);
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4} Z`;
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-8" style={{ marginTop: '30px' }}>
      {/* Donut Chart */}
      <div style={{ position: 'relative' }}>
        <svg width="240" height="240" viewBox="0 0 240 240">
          {segments.map((segment, index) => (
            <path
              key={index}
              d={createArcPath(segment.startAngle, segment.endAngle, segment.highlighted && highlightFirst ? 115 : 110, 60)}
              fill={segment.color}
              stroke="white"
              strokeWidth="3"
              style={{
                transition: 'all 0.2s',
                filter: segment.highlighted && highlightFirst ? 'drop-shadow(0 4px 6px rgba(32, 157, 167, 0.4))' : 'none'
              }}
            />
          ))}
          {/* Center circle */}
          <circle cx="120" cy="120" r="55" fill="#e8f5f6" />
          <text x="120" y="115" textAnchor="middle" fill="#209DA7" fontSize="14" fontWeight="600">ONCO</text>
          <text x="120" y="132" textAnchor="middle" fill="#209DA7" fontSize="11">профиль</text>
        </svg>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {segments.map((segment, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: segment.highlighted && highlightFirst ? '8px 12px' : '0',
              backgroundColor: segment.highlighted && highlightFirst ? '#e8f5f6' : 'transparent',
              borderRadius: '8px',
              marginLeft: segment.highlighted && highlightFirst ? '-12px' : '0',
              border: segment.highlighted && highlightFirst ? '2px solid #209DA7' : 'none',
            }}
          >
            <div
              style={{
                width: '16px',
                height: '16px',
                borderRadius: '4px',
                backgroundColor: segment.color,
                flexShrink: 0
              }}
            />
            <span style={{
              fontSize: '14px',
              color: segment.highlighted && highlightFirst ? '#209DA7' : '#3D3D3D',
              fontWeight: segment.highlighted && highlightFirst ? '600' : '400'
            }}>
              {segment.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Компонент контента секции "О нас" с переводами
function AboutSectionContent({ t }: { t: (key: string) => string }) {
  return (
    <>
      <p style={{ marginBottom: '16px' }}>{t('aboutSection.p1')}</p>
      <p style={{ marginBottom: '16px' }}>{t('aboutSection.p2')}</p>
      <p style={{ marginBottom: '16px' }}>{t('aboutSection.p3')}</p>
      <p style={{ marginBottom: '16px' }}>{t('aboutSection.p4')}</p>
      <p style={{ marginBottom: '16px' }}>{t('aboutSection.p5')}</p>
      <p style={{ marginBottom: '16px' }}>
        <strong>{t('aboutSection.p6label')}</strong> {t('aboutSection.p6')}
      </p>
      <p>{t('aboutSection.p7')}</p>
    </>
  );
}

// Компонент контента секции "Наши преимущества" с переводами
function AdvantagesSectionContent({ t }: { t: (key: string) => string }) {
  return (
    <>
      <p style={{ marginBottom: '16px' }}>
        <strong>{t('advantagesSection.qualityLabel')}</strong> {t('advantagesSection.qualityText')}
      </p>
      <p style={{ marginBottom: '16px' }}>
        <strong>{t('advantagesSection.speedLabel')}</strong> {t('advantagesSection.speedText')}
      </p>
      <p style={{ marginBottom: '16px' }}>
        {t('advantagesSection.deadlineText')}
      </p>
      <p style={{ marginBottom: '16px' }}>
        <strong>{t('advantagesSection.staffLabel')}</strong> {t('advantagesSection.staffText')}
      </p>
      <ul style={{ paddingLeft: '20px', marginBottom: '16px' }}>
        <li style={{ marginBottom: '8px' }}>{t('advantagesSection.staffList1')}</li>
        <li style={{ marginBottom: '8px' }}>{t('advantagesSection.staffList2')}</li>
        <li style={{ marginBottom: '8px' }}>{t('advantagesSection.staffList3')}</li>
      </ul>
      <p style={{ marginBottom: '16px' }}>
        {t('advantagesSection.membersText')}
      </p>
      <p>
        <strong>{t('advantagesSection.convenienceLabel')}</strong> {t('advantagesSection.convenienceText')}
      </p>
    </>
  );
}

// Компонент контента секции "Анализы" с переводами
function AnalysesSectionContent({ t }: { t: (key: string) => string }) {
  const therapyLabels = [
    t('analysesSection.therapy1'),
    t('analysesSection.therapy2'),
    t('analysesSection.therapy3'),
    t('analysesSection.therapy4'),
    t('analysesSection.therapy5'),
  ];

  return (
    <>
      {/* ONCO-профиль badge */}
      <div style={{
        display: 'inline-block',
        backgroundColor: '#209DA7',
        color: 'white',
        padding: '6px 16px',
        borderRadius: '20px',
        fontSize: '13px',
        fontWeight: '600',
        marginBottom: '16px'
      }}>
        ONCO-профиль
      </div>

      {/* Цель */}
      <div style={{
        backgroundColor: '#f0fafa',
        borderLeft: '4px solid #209DA7',
        padding: '16px 20px',
        borderRadius: '0 8px 8px 0',
        marginBottom: '20px'
      }}>
        <p style={{ fontSize: '14px', fontWeight: '600', color: '#091D33', marginBottom: '8px' }}>
          Цель: GL | ONCO
        </p>
        <p style={{ fontSize: '14px', lineHeight: '1.7', color: '#4B5563', margin: 0 }}>
          Основной целью работы лаборатории является деятельность по перспективным направлениям в сфере лабораторной диагностики, а также внедрение новых решений, связанных с исследованием мутаций в опухолевой ткани для подбора <strong style={{ color: '#209DA7' }}>таргетной терапии</strong>.
        </p>
      </div>

      {/* Diagram section */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '30px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
      }}>
        <h3 style={{
          fontSize: '16px',
          fontWeight: '600',
          color: '#091D33',
          marginBottom: '8px',
          textAlign: 'center'
        }}>
          {t('analysesSection.chartTitle')}
        </h3>
        <p style={{
          fontSize: '13px',
          color: '#6B7280',
          textAlign: 'center',
          marginBottom: '10px'
        }}>
          {t('analysesSection.chartSubtitle')}
        </p>
        <OncoPieChart labels={therapyLabels} highlightFirst={true} />
      </div>
    </>
  );
}

// Компонент контента секции "Оборудование" с переводами
function EquipmentSectionContent({ t }: { t: (key: string) => string }) {
  return (
    <>
      <p style={{ marginBottom: '16px' }}>{t('equipmentSection.p1')}</p>
      <p>{t('equipmentSection.p2')}</p>
    </>
  );
}

// Компонент контента секции "Реагенты" с переводами
function ReagentsSectionContent({ t }: { t: (key: string) => string }) {
  return (
    <p>{t('reagentsSection.p1')}</p>
  );
}

// Компонент контента секции "Перечень исследований" с переводами
function LabTestsSectionContent({ t }: { t: (key: string) => string }) {
  // Данные для таблицы 1: ГОБМП
  const table1Data = [
    { num: 1, name: 'Определение мутаций гена KRAS из биоптата опухолевой ткани методом ПЦР', code: 'B09.861.020', deadline: '10' },
    { num: 2, name: 'Определение мутаций гена EGFR из биоптата опухолевой ткани методом ПЦР', code: 'B09.862.020', deadline: '10' },
    { num: 3, name: 'Определение мутаций гена BRAF из биоптата опухолевой ткани методом ПЦР', code: 'B09.860.020', deadline: '10' },
    { num: 4, name: 'Определение мутации гена ALK из биоптата опухолевой ткани иммуногистохимическим (ИГХ) методом', code: 'B06.676.011', deadline: '14' },
    { num: 5, name: 'Определение рецептора PD-L1 из биоптата опухолевой ткани иммуногистохимическим (ИГХ) методом', code: 'B06.675.011', deadline: '14' },
    { num: 6, name: 'Молекулярно-цитогенетическое исследование с использованием ДНК-зондов (ФИШ-метод) биологического материала (1-зонд)', code: 'В09.765.016', deadline: '14' },
    { num: 7, name: 'Молекулярно-цитогенетическое исследование с использованием ДНК-зондов (ФИШ-метод) цитологических препаратов, гистологических срезов (1-зонд)', code: 'В09.769.016', deadline: '14' },
    { num: 8, name: 'Молекулярно-цитогенетическое исследование с использованием ДНК-зондов (ФИШ-метод) для определения ALK-положительных генов', code: 'В09.776.016', deadline: '14' },
  ];

  // Данные для таблицы 2: Коммерческие исследования
  const table2Data = [
    { category: 1, tests: [
      { num: 1, name: 'Определение мутации гена KRAS методом ПЦР', material: 'Фиксированная формалином и залитая парафином ткань опухоли', method: 'ПЦР', term: '5-7 р/д' },
      { num: 2, name: 'Определение мутаций гена NRAS методом ПЦР', material: 'Фиксированная формалином и залитая парафином ткань опухоли', method: 'ПЦР', term: '5-7 р/д' },
      { num: 3, name: 'Определение комплекса исследований мутаций гена KRAS и гена NRAS методом ПЦР', material: 'Фиксированная формалином и залитая парафином ткань опухоли', method: 'ПЦР', term: '5-7 р/д' },
      { num: 4, name: 'Определение комплекса мутаций в гене EGFR методом ПЦР', material: 'Фиксированная формалином и залитая парафином ткань опухоли', method: 'ПЦР', term: '5-7 р/д' },
      { num: 5, name: 'Определение мутации V600E в гене BRAF методом ПЦР', material: 'Фиксированная формалином и залитая парафином ткань опухоли', method: 'ПЦР', term: '5-7 р/д' },
      { num: 6, name: 'Определение дозы гена HER2/neu в геномной ДНК человека с использованием ПЦР в режиме реального времени', material: 'Фиксированная формалином и залитая парафином ткань опухоли', method: 'ПЦР', term: '5-7 р/д' },
      { num: 7, name: 'Определение мутаций гена IDH1, IDH2 методом полимеразной цепной реакции (ПЦР)', material: 'Фиксированная формалином и залитая парафином ткань опухоли', method: 'ПЦР', term: '5-7 р/д' },
      { num: 8, name: 'Определение мутаций гена PIK3CA методом полимеразной цепной реакции (ПЦР)', material: 'Фиксированная формалином и залитая парафином ткань опухоли', method: 'ПЦР', term: '5-7 р/д' },
    ]},
    { category: 2, tests: [
      { num: 9, name: 'Комплекс: определение 16 герминальных мутаций в генах BRCA1 и BRCA2 методом ПЦР', material: 'Кровь с ЭДТА / Фиксированная формалином и залитая парафином ткань опухоли', method: 'ПЦР', term: '5-7 р/д' },
    ]},
    { category: 3, tests: [
      { num: 10, name: 'Определение мутации гена ALK из биоптата опухолевой ткани иммуногистохимическим методом', material: 'Фиксированная формалином и залитая парафином ткань опухоли', method: 'ИГХ', term: '5-7 р/д' },
      { num: 11, name: 'Определение рецептора PD-L1 из биоптата опухолевой ткани иммуногистохимическим методом', material: 'Фиксированная формалином и залитая парафином ткань опухоли', method: 'ИГХ', term: '5-7 р/д' },
      { num: 12, name: 'Стандартизованное иммуногистохимическое исследование: рецепторный статус при раке молочной железы (PR, ER, ki67, C-erbB-2 (HER2/neu))', material: 'Фиксированная формалином и залитая парафином ткань опухоли', method: 'ИГХ', term: '5-7 р/д' },
      { num: 13, name: 'Определение экспрессии белка при транслокации гена ROS1 из биоптата опухолевой ткани иммуногистохимическим методом', material: 'Фиксированная формалином и залитая парафином ткань опухоли', method: 'ИГХ', term: '5-7 р/д' },
      { num: 14, name: 'Определение экспрессии Her2/neu из биоптата опухолевой ткани иммуногистохимическим методом', material: 'Фиксированная формалином и залитая парафином ткань опухоли', method: 'ИГХ', term: '5-7 р/д' },
      { num: 15, name: 'Определение экспрессии Ki-67 из биоптата опухолевой ткани иммуногистохимическим методом', material: 'Фиксированная формалином и залитая парафином ткань опухоли', method: 'ИГХ', term: '5-7 р/д' },
      { num: 16, name: 'Определение белка S100 из биоптата опухолевой ткани иммуногистохимическим методом', material: 'Фиксированная формалином и залитая парафином ткань опухоли', method: 'ИГХ', term: '5-7 р/д' },
      { num: 17, name: 'Определение рецепторов андрогенов (AR) иммуногистохимическим методом', material: 'Фиксированная формалином и залитая парафином ткань опухоли', method: 'ИГХ', term: '5-7 р/д' },
    ]},
    { category: 4, tests: [
      { num: 18, name: 'Комплексное исследование по определению содержания циркулирующих опухолевых клеток (ЦОК) в периферической крови', material: 'Кровь', method: 'комбинированный тест', term: '10 р/д' },
      { num: 19, name: 'Комплексное исследование по определению содержания циркулирующих опухолевых клеток (ЦОК) в периферической крови с анализом мутаций по 3 маркерам', material: 'Кровь', method: 'комбинированный тест', term: '10 р/д' },
    ]},
    { category: 5, tests: [
      { num: 20, name: 'Иммунологическое исследование для диагностики туберкулеза методом T-SPOT.TB', material: 'Кровь', method: 'ELISPOT', term: '3 р/д' },
    ]},
  ];

  const cellStyle = { padding: '10px 8px', border: '1px solid #ddd' };
  const centerCell = { ...cellStyle, textAlign: 'center' as const };

  return (
    <>
      {/* Таблица 1: ГОБМП */}
      <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: '#091D33' }}>
        {t('labTestsSection.table1Title')}
      </h3>
      <div style={{ overflowX: 'auto', marginBottom: '40px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead>
            <tr style={{ backgroundColor: '#209DA7', color: 'white' }}>
              <th style={{ padding: '12px 8px', textAlign: 'center', border: '1px solid #ddd' }}>{t('labTestsSection.colNumber')}</th>
              <th style={{ padding: '12px 8px', textAlign: 'left', border: '1px solid #ddd' }}>{t('labTestsSection.colTestName')}</th>
              <th style={{ padding: '12px 8px', textAlign: 'center', border: '1px solid #ddd' }}>{t('labTestsSection.colServiceCode')}</th>
              <th style={{ padding: '12px 8px', textAlign: 'center', border: '1px solid #ddd' }}>{t('labTestsSection.colDeadline')}</th>
            </tr>
          </thead>
          <tbody>
            {table1Data.map((row, idx) => (
              <tr key={row.num} style={{ backgroundColor: idx % 2 === 0 ? '#fff' : '#f9f9f9' }}>
                <td style={centerCell}>{row.num}</td>
                <td style={cellStyle}>{row.name}</td>
                <td style={centerCell}>{row.code}</td>
                <td style={centerCell}>{t('labTestsSection.upTo')} {row.deadline} {t('labTestsSection.workingDays')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Таблица 2: Коммерческие исследования */}
      <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: '#091D33' }}>
        {t('labTestsSection.table2Title')}
      </h3>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead>
            <tr style={{ backgroundColor: '#209DA7', color: 'white' }}>
              <th style={{ padding: '12px 8px', textAlign: 'center', border: '1px solid #ddd' }}>{t('labTestsSection.colNumber')}</th>
              <th style={{ padding: '12px 8px', textAlign: 'left', border: '1px solid #ddd' }}>{t('labTestsSection.colAnalysisName')}</th>
              <th style={{ padding: '12px 8px', textAlign: 'left', border: '1px solid #ddd' }}>{t('labTestsSection.colMaterial')}</th>
              <th style={{ padding: '12px 8px', textAlign: 'center', border: '1px solid #ddd' }}>{t('labTestsSection.colMethod')}</th>
              <th style={{ padding: '12px 8px', textAlign: 'center', border: '1px solid #ddd' }}>{t('labTestsSection.colTerm')}</th>
            </tr>
          </thead>
          <tbody>
            {table2Data.map((category) => (
              <Fragment key={`cat-${category.category}`}>
                <tr style={{ backgroundColor: '#e8f5f6' }}>
                  <td colSpan={5} style={{ padding: '10px 8px', fontWeight: '600', border: '1px solid #ddd', color: '#209DA7' }}>
                    {t(`labTestsSection.category${category.category}`)}
                  </td>
                </tr>
                {category.tests.map((test, idx) => (
                  <tr key={test.num} style={{ backgroundColor: idx % 2 === 0 ? '#fff' : '#f9f9f9' }}>
                    <td style={centerCell}>{test.num}</td>
                    <td style={cellStyle}>{test.name}</td>
                    <td style={cellStyle}>{test.material}</td>
                    <td style={centerCell}>{test.method}</td>
                    <td style={centerCell}>{test.term}</td>
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

// Компонент контента секции "Логистика" с переводами
function LogisticsSectionContent({ t }: { t: (key: string) => string }) {
  const boxStyle: React.CSSProperties = {
    backgroundColor: 'white',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '12px 14px',
    fontSize: '12px',
    lineHeight: '1.6',
  };

  const highlightBox: React.CSSProperties = {
    ...boxStyle,
    backgroundColor: '#FEF3C7',
    borderColor: '#F59E0B',
  };

  const headerBox: React.CSSProperties = {
    ...boxStyle,
    backgroundColor: '#209DA7',
    borderColor: '#209DA7',
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
  };

  const ArrowDown = () => (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '4px 0' }}>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M6 2v8M6 10l-2.5-2.5M6 10l2.5-2.5" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );

  return (
    <div style={{ maxWidth: '100%' }}>
      {/* Главный заголовок */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#091D33', marginBottom: '8px' }}>
          Схема передачи материала в лабораторию «GammaLab»
        </h3>
      </div>

      {/* Заголовок вопроса */}
      <div style={{ ...headerBox, marginBottom: '16px' }}>
        Как отправить материал в лабораторию «GAMMALAB»?
      </div>

      {/* Три колонки путей */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '16px' }}>
        {/* ГОБМП */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ ...highlightBox, textAlign: 'center', fontWeight: '500' }}>
            Подача заявки на исследование в рамках бесплатной помощи населению РК
          </div>
          <ArrowDown />
          <div style={boxStyle}>
            <p style={{ fontWeight: '500', marginBottom: '6px', color: '#091D33' }}>Способы подачи заявки:</p>
            <p style={{ fontSize: '11px', color: '#4b5563', marginBottom: '4px' }}>• Регистрация пациента в КМИС (при наличии интеграции ЛПУ с GammaLab)</p>
            <p style={{ fontSize: '11px', color: '#4b5563', marginBottom: '4px' }}>• Регистрация в Личном Кабинете Партнера (при отсутствии интеграции)</p>
            <p style={{ fontSize: '11px', color: '#4b5563' }}>• Биоматериалу должен быть присвоен штрих-код от GammaLab</p>
          </div>
          <ArrowDown />
          <div style={{ ...boxStyle, textAlign: 'center', backgroundColor: '#f9fafb' }}>
            <p style={{ fontSize: '11px', color: '#6b7280', marginBottom: '2px' }}>Вопросы? Колл-центр:</p>
            <p style={{ fontWeight: '600', color: '#091D33' }}>+7-705-100-03-33</p>
          </div>
        </div>

        {/* Самообращение (регионы) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ ...highlightBox, textAlign: 'center', fontWeight: '500' }}>
            Самообращение<br />(регионы РК)
          </div>
          <ArrowDown />
          <div style={{ ...boxStyle, textAlign: 'center', backgroundColor: '#f9fafb' }}>
            <p style={{ fontSize: '11px', color: '#6b7280', marginBottom: '2px' }}>Позвонить на номер колл-центра:</p>
            <p style={{ fontWeight: '600', color: '#091D33' }}>+7-705-100-03-33</p>
          </div>
          <ArrowDown />
          <div style={boxStyle}>
            <p style={{ fontSize: '11px', color: '#4b5563' }}>Оператор сообщает врачу адрес, дату и время передачи биоматериала и сопроводительных документов в регионе.</p>
          </div>
          <ArrowDown />
          <div style={boxStyle}>
            <p style={{ fontSize: '11px', color: '#4b5563' }}>Курьер отвозит материал и документы в лабораторию</p>
          </div>
        </div>

        {/* Самообращение (Алматы) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ ...highlightBox, textAlign: 'center', fontWeight: '500' }}>
            Самообращение<br />(г. Алматы)
          </div>
          <ArrowDown />
          <div style={boxStyle}>
            <p style={{ fontSize: '11px', color: '#4b5563' }}>Самостоятельная доставка пациентом материала и документов в лабораторию</p>
          </div>
          <ArrowDown />
          <div style={{ ...boxStyle, backgroundColor: '#f0fafa' }}>
            <p style={{ fontWeight: '500', color: '#091D33', marginBottom: '4px', fontSize: '11px' }}>Адрес:</p>
            <p style={{ fontSize: '11px', color: '#4b5563' }}>г. Алматы, ул. Ходжанова 55А</p>
          </div>
        </div>
      </div>

      {/* Документы */}
      <div style={{ ...boxStyle, marginBottom: '12px' }}>
        <p style={{ fontWeight: '500', color: '#091D33', marginBottom: '6px' }}>Документы, которые необходимо передать в лабораторию:</p>
        <p style={{ fontSize: '11px', color: '#4b5563', marginBottom: '2px' }}>• Направление на анализ</p>
        <p style={{ fontSize: '11px', color: '#4b5563' }}>• Копия выписки с гистологическим заключением</p>
      </div>

      {/* Сроки - три колонки */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '12px' }}>
        <div style={{ ...boxStyle, textAlign: 'center' }}>
          <p style={{ fontSize: '10px', color: '#6b7280', textTransform: 'uppercase', marginBottom: '4px' }}>Время приема биоматериала</p>
          <p style={{ fontWeight: '600', color: '#209DA7', fontSize: '12px' }}>Пн-Сб: 09:00 – 17:00</p>
        </div>
        <div style={{ ...boxStyle, textAlign: 'center' }}>
          <p style={{ fontSize: '10px', color: '#6b7280', textTransform: 'uppercase', marginBottom: '4px' }}>Срок доставки биоматериала</p>
          <p style={{ fontWeight: '600', color: '#209DA7', fontSize: '12px' }}>В течение 2-х рабочих дней</p>
        </div>
        <div style={{ ...boxStyle, textAlign: 'center' }}>
          <p style={{ fontSize: '10px', color: '#6b7280', textTransform: 'uppercase', marginBottom: '4px' }}>Срок исполнения анализа</p>
          <p style={{ fontWeight: '600', color: '#209DA7', fontSize: '12px' }}>От 5 до 14 рабочих дней</p>
        </div>
      </div>

      {/* Результат */}
      <div style={{ ...headerBox }}>
        <p style={{ marginBottom: '4px' }}>Способ получения результата исследования</p>
        <p style={{ fontSize: '11px', fontWeight: '400', opacity: 0.9 }}>
          Заключения с результатами тестирования пациент получает по e-mail, указанный при регистрации.<br />
          Результаты по ГОБМП автоматически направляются в КМИС.
        </p>
      </div>
    </div>
  );
}

// Компонент контента секции "Система качества" с переводами
function QualitySectionContent({ t }: { t: (key: string) => string }) {
  return (
    <>
      <p style={{ marginBottom: '20px' }}>{t('qualitySection.p1')}</p>
      <p style={{ fontWeight: '500', marginBottom: '12px' }}>{t('qualitySection.hasTitle')}</p>
      <ul style={{ paddingLeft: '20px', margin: 0 }}>
        <li style={{ marginBottom: '10px' }}>{t('qualitySection.item1')}</li>
        <li style={{ marginBottom: '10px' }}>{t('qualitySection.item2')}</li>
        <li>{t('qualitySection.item3')}</li>
      </ul>
    </>
  );
}

// Компонент контента секции "Лицензии" с переводами
function LicensesSectionContent({ t, locale }: { t: (key: string) => string; locale: string }) {
  const [documents, setDocuments] = useState<Array<{
    id: string;
    title: string;
    titleKz: string | null;
    titleEn: string | null;
    description: string | null;
    descriptionKz: string | null;
    descriptionEn: string | null;
    fileUrl: string;
    fileType: string;
  }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const res = await fetch('/api/documents');
        if (res.ok) {
          const data = await res.json();
          setDocuments(data);
        }
      } catch (error) {
        console.error('Error fetching documents:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDocuments();
  }, []);

  const getTitle = (doc: typeof documents[0]) => {
    if (locale === 'kz' && doc.titleKz) return doc.titleKz;
    if (locale === 'en' && doc.titleEn) return doc.titleEn;
    return doc.title;
  };

  const getDescription = (doc: typeof documents[0]) => {
    if (locale === 'kz' && doc.descriptionKz) return doc.descriptionKz;
    if (locale === 'en' && doc.descriptionEn) return doc.descriptionEn;
    return doc.description;
  };

  const isImage = (url: string) => /\.(jpg|jpeg|png|webp|gif)$/i.test(url);

  const fileTypeLabels: Record<string, Record<string, string>> = {
    license: { ru: 'Лицензия', kz: 'Лицензия', en: 'License' },
    certificate: { ru: 'Сертификат', kz: 'Сертификат', en: 'Certificate' },
    other: { ru: 'Документ', kz: 'Құжат', en: 'Document' },
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
        <div
          style={{
            width: '32px',
            height: '32px',
            border: '3px solid #E5E7EB',
            borderTopColor: '#209DA7',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (documents.length === 0) {
    return (
      <>
        <p style={{ marginBottom: '6px' }}>
          <strong>{t('licensesSection.licenseNumber')}</strong>
        </p>
        <p style={{ marginBottom: '20px', color: '#6b7280' }}>{t('licensesSection.licenseSubtitle')}</p>
        <ul style={{ paddingLeft: '20px', margin: 0 }}>
          <li style={{ marginBottom: '10px' }}>{t('licensesSection.item1')}</li>
          <li style={{ marginBottom: '10px' }}>{t('licensesSection.item2')}</li>
          <li>{t('licensesSection.item3')}</li>
        </ul>
      </>
    );
  }

  return (
    <>
      <p style={{ marginBottom: '6px' }}>
        <strong>{t('licensesSection.licenseNumber')}</strong>
      </p>
      <p style={{ marginBottom: '24px', color: '#6b7280' }}>{t('licensesSection.licenseSubtitle')}</p>

      {/* Documents Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
        {documents.map((doc) => (
          <a
            key={doc.id}
            href={doc.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'block',
              backgroundColor: 'white',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              textDecoration: 'none',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            className="hover:shadow-lg hover:-translate-y-1"
          >
            {/* Preview */}
            <div
              style={{
                height: '140px',
                backgroundColor: '#F9FAFB',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              {isImage(doc.fileUrl) ? (
                <img
                  src={doc.fileUrl}
                  alt={getTitle(doc)}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10 9 9 9 8 9"/>
                </svg>
              )}
            </div>

            {/* Info */}
            <div style={{ padding: '12px' }}>
              <span
                style={{
                  display: 'inline-block',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontSize: '10px',
                  fontWeight: '500',
                  backgroundColor: doc.fileType === 'license' ? '#E0F2F4' : doc.fileType === 'certificate' ? '#FEF3C7' : '#F3F4F6',
                  color: doc.fileType === 'license' ? '#209DA7' : doc.fileType === 'certificate' ? '#D97706' : '#6B7280',
                  marginBottom: '8px',
                }}
              >
                {fileTypeLabels[doc.fileType]?.[locale] || doc.fileType}
              </span>
              <h4 style={{ fontSize: '13px', fontWeight: '600', color: '#091D33', margin: '0 0 4px', lineHeight: 1.4 }}>
                {getTitle(doc)}
              </h4>
              {getDescription(doc) && (
                <p style={{ fontSize: '11px', color: '#6B7280', margin: 0, lineHeight: 1.6, whiteSpace: 'pre-line' }}>
                  {getDescription(doc)}
                </p>
              )}
            </div>
          </a>
        ))}
      </div>
    </>
  );
}

// Компонент контента секции "Опыт работы" с переводами
function ExperienceSectionContent({ t }: { t: (key: string) => string }) {
  const statItems = [
    { value: '49,5%', label: t('experienceSection.colorectal') },
    { value: '21%', label: t('experienceSection.lung') },
    { value: '47%', label: t('experienceSection.melanoma') },
    { value: '15%', label: t('experienceSection.bladder') },
    { value: '30%', label: t('experienceSection.breast') },
  ];

  return (
    <>
      <p style={{ marginBottom: '14px' }}>{t('experienceSection.p1')}</p>
      <p style={{ marginBottom: '14px' }}>{t('experienceSection.p2')}</p>
      <p style={{ marginBottom: '14px' }}>{t('experienceSection.p3')}</p>
      <p style={{ marginBottom: '14px' }}>{t('experienceSection.p4')}</p>
      <p style={{ marginBottom: '24px' }}>{t('experienceSection.p5')}</p>

      {/* Статистика */}
      <p style={{ fontWeight: '500', marginBottom: '12px' }}>{t('experienceSection.statsTitle')}</p>
      <div style={{ marginBottom: '20px', fontSize: '13px', color: '#4b5563' }}>
        {statItems.map((item, idx) => (
          <span key={idx}>
            <strong style={{ color: '#091D33' }}>{item.value}</strong> — {item.label}
            {idx < statItems.length - 1 && ' • '}
          </span>
        ))}
      </div>

      <p style={{ fontWeight: '500', marginBottom: '8px' }}>{t('experienceSection.ihcTitle')}</p>
      <p style={{ fontSize: '13px', color: '#4b5563', marginBottom: '24px' }}>
        <strong style={{ color: '#091D33' }}>PD-L1:</strong> 53% • <strong style={{ color: '#091D33' }}>ALK:</strong> 6%
      </p>

      {/* Контакты */}
      <p style={{ fontWeight: '500', marginBottom: '8px' }}>{t('experienceSection.contactTitle')}</p>
      <p style={{ marginBottom: '12px' }}>
        <a href="tel:+77051000333" style={{ color: '#091D33', textDecoration: 'none', fontWeight: '600', fontSize: '16px' }}>
          +7 (705) 100-03-33
        </a>
      </p>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <a
          href="https://t.me/+77051000333"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            backgroundColor: '#EC910C',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: '13px',
            fontWeight: '500'
          }}
        >
          Telegram
        </a>
        <a
          href="https://wa.me/77051000333"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            backgroundColor: '#EC910C',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: '13px',
            fontWeight: '500'
          }}
        >
          WhatsApp
        </a>
      </div>
    </>
  );
}

export default function AboutPage() {
  const [activeSection, setActiveSection] = useState('about');
  const t = useTranslations('aboutPage');
  const locale = useLocale();

  // Получаем контент в зависимости от активной секции
  const getContent = () => {
    if (activeSection === 'about') {
      return {
        title: t('aboutSection.title'),
        content: <AboutSectionContent t={t} />
      };
    }
    if (activeSection === 'advantages') {
      return {
        title: t('advantagesSection.title'),
        content: <AdvantagesSectionContent t={t} />
      };
    }
    if (activeSection === 'analyses') {
      return {
        title: t('analysesSection.title'),
        content: <AnalysesSectionContent t={t} />
      };
    }
    if (activeSection === 'equipment') {
      return {
        title: t('equipmentSection.title'),
        content: <EquipmentSectionContent t={t} />
      };
    }
    if (activeSection === 'reagents') {
      return {
        title: t('reagentsSection.title'),
        content: <ReagentsSectionContent t={t} />
      };
    }
    if (activeSection === 'logistics') {
      return {
        title: t('logisticsSection.title'),
        content: <LogisticsSectionContent t={t} />
      };
    }
    if (activeSection === 'labTests') {
      return {
        title: t('labTestsSection.title'),
        content: <LabTestsSectionContent t={t} />
      };
    }
    if (activeSection === 'quality') {
      return {
        title: t('qualitySection.title'),
        content: <QualitySectionContent t={t} />
      };
    }
    if (activeSection === 'licenses') {
      return {
        title: t('licensesSection.title'),
        content: <LicensesSectionContent t={t} locale={locale} />
      };
    }
    if (activeSection === 'experience') {
      return {
        title: t('experienceSection.title'),
        content: <ExperienceSectionContent t={t} />
      };
    }
    return { title: '', content: null };
  };

  const currentContent = getContent();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section
        className="relative pt-[140px] sm:pt-[160px] lg:pt-[180px] pb-8 lg:pb-12"
        style={{ backgroundColor: '#EEF6F6' }}
      >
        <div className="px-5 sm:px-8 md:px-12 lg:px-20 text-center">
          <h1
            className="text-[28px] sm:text-[36px] lg:text-[42px] font-semibold mb-4"
            style={{ color: '#091D33' }}
          >
            {t('pageTitle')}
          </h1>
          <p
            className="text-[15px] leading-[1.8] max-w-[600px] mx-auto"
            style={{ color: '#6B7280' }}
          >
            {t('pageSubtitle')}
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
                height: 'fit-content'
              }}
            >
              <nav>
                {sidebarItemsConfig.map((item) => {
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
                        fontWeight: isActive ? '500' : '400'
                      }}
                    >
                      <Icon size={18} style={{ color: isActive ? 'white' : '#EC910C' }} />
                      {t(`sections.${item.id}`)}
                    </button>
                  );
                })}
              </nav>
            </aside>

            {/* Content Area */}
            <main className="flex-1">
              {/* Content Box */}
              <div
                className="p-6 sm:p-8 lg:p-[50px_60px]"
                style={{
                  backgroundColor: '#e8f5f6',
                  borderRadius: '12px'
                }}
              >
                <h2
                  className="text-2xl"
                  style={{
                    color: '#EC910C',
                    marginBottom: '24px',
                    textAlign: 'center',
                    fontWeight: '700'
                  }}
                >
                  {currentContent?.title}
                </h2>
                <div
                  style={{
                    color: '#3D3D3D',
                    fontSize: '15px',
                    lineHeight: '1.8'
                  }}
                >
                  {currentContent?.content}
                </div>
              </div>
            </main>
          </div>
      </section>
    </div>
  );
}
