'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, Plus, Trash2, GripVertical } from 'lucide-react';

interface NgsSection {
  title: string;
  items: string[];
}

interface NgsContentData {
  id: string;
  title: string;
  titleKz: string;
  titleEn: string;
  description: string;
  descriptionKz: string;
  descriptionEn: string;
  sections: NgsSection[];
  sectionsKz: NgsSection[];
  sectionsEn: NgsSection[];
  isActive: boolean;
}

export default function NgsContentAdminPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'ru' | 'kz' | 'en'>('ru');
  const [formData, setFormData] = useState<NgsContentData>({
    id: '',
    title: 'Next-generation sequencing (NGS)',
    titleKz: 'Next-generation sequencing (NGS)',
    titleEn: 'Next-generation sequencing (NGS)',
    description: '',
    descriptionKz: '',
    descriptionEn: '',
    sections: [],
    sectionsKz: [],
    sectionsEn: [],
    isActive: true,
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const res = await fetch('/api/admin/ngs-content');
      if (res.ok) {
        const data = await res.json();
        if (data) {
          setFormData(data);
        }
      }
    } catch (error) {
      console.error('Error fetching NGS content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch('/api/admin/ngs-content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert('Изменения сохранены');
      } else {
        alert('Ошибка сохранения');
      }
    } catch (error) {
      console.error('Error saving NGS content:', error);
      alert('Ошибка сохранения');
    } finally {
      setSaving(false);
    }
  };

  const getSections = (): NgsSection[] => {
    if (activeTab === 'kz') return formData.sectionsKz || [];
    if (activeTab === 'en') return formData.sectionsEn || [];
    return formData.sections || [];
  };

  const setSections = (sections: NgsSection[]) => {
    if (activeTab === 'kz') {
      setFormData((prev) => ({ ...prev, sectionsKz: sections }));
    } else if (activeTab === 'en') {
      setFormData((prev) => ({ ...prev, sectionsEn: sections }));
    } else {
      setFormData((prev) => ({ ...prev, sections }));
    }
  };

  const addSection = () => {
    const sections = getSections();
    setSections([...sections, { title: '', items: [''] }]);
  };

  const updateSectionTitle = (index: number, title: string) => {
    const sections = [...getSections()];
    sections[index] = { ...sections[index], title };
    setSections(sections);
  };

  const updateSectionItem = (sectionIndex: number, itemIndex: number, value: string) => {
    const sections = [...getSections()];
    const items = [...sections[sectionIndex].items];
    items[itemIndex] = value;
    sections[sectionIndex] = { ...sections[sectionIndex], items };
    setSections(sections);
  };

  const addSectionItem = (sectionIndex: number) => {
    const sections = [...getSections()];
    sections[sectionIndex] = {
      ...sections[sectionIndex],
      items: [...sections[sectionIndex].items, ''],
    };
    setSections(sections);
  };

  const removeSectionItem = (sectionIndex: number, itemIndex: number) => {
    const sections = [...getSections()];
    sections[sectionIndex] = {
      ...sections[sectionIndex],
      items: sections[sectionIndex].items.filter((_, i) => i !== itemIndex),
    };
    setSections(sections);
  };

  const removeSection = (index: number) => {
    const sections = getSections().filter((_, i) => i !== index);
    setSections(sections);
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const sections = [...getSections()];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= sections.length) return;
    [sections[index], sections[newIndex]] = [sections[newIndex], sections[index]];
    setSections(sections);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '300px' }}>
        <div
          style={{
            width: '40px',
            height: '40px',
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

  const tabs = [
    { key: 'ru', label: 'RU' },
    { key: 'kz', label: 'KZ' },
    { key: 'en', label: 'EN' },
  ] as const;

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 14px',
    border: '1px solid #E5E7EB',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box',
  };

  const textareaStyle: React.CSSProperties = {
    ...inputStyle,
    resize: 'vertical',
    minHeight: '100px',
    fontFamily: 'inherit',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151',
    marginBottom: '6px',
  };

  const sections = getSections();

  return (
    <div>
      <style>{`
        @media (max-width: 768px) {
          .edit-header {
            padding-top: 48px !important;
          }
          .edit-grid {
            grid-template-columns: 1fr !important;
          }
          .sidebar-section {
            order: -1;
          }
        }
      `}</style>

      {/* Header */}
      <div className="edit-header" style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
        <Link
          href="/admin"
          style={{
            padding: '8px',
            borderRadius: '8px',
            display: 'flex',
            color: '#091D33',
            textDecoration: 'none',
          }}
        >
          <ArrowLeft style={{ width: '20px', height: '20px' }} />
        </Link>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#091D33', margin: '0 0 4px' }}>
            NGS контент (Врачам)
          </h1>
          <p style={{ color: '#6B7280', margin: 0, fontSize: '14px' }}>
            Редактирование раздела Next-generation sequencing
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="edit-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '24px' }}>
          {/* Main Content */}
          <div>
            {/* Language Tabs */}
            <div
              style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                overflow: 'hidden',
                marginBottom: '24px',
              }}
            >
              <div style={{ borderBottom: '1px solid #E5E7EB' }}>
                <div style={{ display: 'flex' }}>
                  {tabs.map((tab) => (
                    <button
                      key={tab.key}
                      type="button"
                      onClick={() => setActiveTab(tab.key)}
                      style={{
                        padding: '14px 24px',
                        fontSize: '14px',
                        fontWeight: '500',
                        border: 'none',
                        background: 'none',
                        cursor: 'pointer',
                        borderBottom: activeTab === tab.key ? '2px solid #209DA7' : '2px solid transparent',
                        color: activeTab === tab.key ? '#209DA7' : '#6B7280',
                        marginBottom: '-1px',
                      }}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={labelStyle}>
                    Описание {activeTab === 'kz' ? '(KZ)' : activeTab === 'en' ? '(EN)' : '(RU)'}
                  </label>
                  <textarea
                    value={
                      activeTab === 'kz'
                        ? formData.descriptionKz
                        : activeTab === 'en'
                        ? formData.descriptionEn
                        : formData.description
                    }
                    onChange={(e) => {
                      if (activeTab === 'kz') setFormData((p) => ({ ...p, descriptionKz: e.target.value }));
                      else if (activeTab === 'en') setFormData((p) => ({ ...p, descriptionEn: e.target.value }));
                      else setFormData((p) => ({ ...p, description: e.target.value }));
                    }}
                    style={textareaStyle}
                    placeholder="Введите описание раздела NGS..."
                  />
                </div>
              </div>
            </div>

            {/* Sections */}
            <div
              style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  padding: '16px 24px',
                  borderBottom: '1px solid #E5E7EB',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#091D33', margin: 0 }}>
                  Категории ({activeTab.toUpperCase()})
                </h2>
                <button
                  type="button"
                  onClick={addSection}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    backgroundColor: '#209DA7',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: '500',
                    cursor: 'pointer',
                  }}
                >
                  <Plus size={16} />
                  Добавить категорию
                </button>
              </div>

              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {sections.length === 0 ? (
                  <p style={{ color: '#9CA3AF', textAlign: 'center', padding: '20px' }}>
                    Нет категорий. Нажмите &quot;Добавить категорию&quot; для создания.
                  </p>
                ) : (
                  sections.map((section, sIndex) => (
                    <div
                      key={sIndex}
                      style={{
                        border: '1px solid #E5E7EB',
                        borderRadius: '10px',
                        padding: '16px',
                        backgroundColor: '#FAFAFA',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                        <GripVertical size={18} style={{ color: '#9CA3AF', cursor: 'grab' }} />
                        <span style={{ fontSize: '13px', fontWeight: '500', color: '#6B7280' }}>
                          Категория {sIndex + 1}
                        </span>
                        <div style={{ marginLeft: 'auto', display: 'flex', gap: '4px' }}>
                          <button
                            type="button"
                            onClick={() => moveSection(sIndex, 'up')}
                            disabled={sIndex === 0}
                            style={{
                              padding: '4px 8px',
                              border: '1px solid #E5E7EB',
                              borderRadius: '4px',
                              background: 'white',
                              cursor: sIndex === 0 ? 'not-allowed' : 'pointer',
                              opacity: sIndex === 0 ? 0.5 : 1,
                              fontSize: '12px',
                            }}
                          >
                            ↑
                          </button>
                          <button
                            type="button"
                            onClick={() => moveSection(sIndex, 'down')}
                            disabled={sIndex === sections.length - 1}
                            style={{
                              padding: '4px 8px',
                              border: '1px solid #E5E7EB',
                              borderRadius: '4px',
                              background: 'white',
                              cursor: sIndex === sections.length - 1 ? 'not-allowed' : 'pointer',
                              opacity: sIndex === sections.length - 1 ? 0.5 : 1,
                              fontSize: '12px',
                            }}
                          >
                            ↓
                          </button>
                          <button
                            type="button"
                            onClick={() => removeSection(sIndex)}
                            style={{
                              padding: '4px 8px',
                              border: '1px solid #FCA5A5',
                              borderRadius: '4px',
                              background: '#FEE2E2',
                              cursor: 'pointer',
                              color: '#DC2626',
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div>
                          <label style={{ ...labelStyle, fontSize: '13px' }}>Заголовок категории</label>
                          <input
                            type="text"
                            value={section.title}
                            onChange={(e) => updateSectionTitle(sIndex, e.target.value)}
                            style={inputStyle}
                            placeholder="Например: ИССЛЕДОВАНИЯ NGS"
                          />
                        </div>

                        <div>
                          <label style={{ ...labelStyle, fontSize: '13px' }}>Пункты списка</label>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {section.items.map((item, iIndex) => (
                              <div key={iIndex} style={{ display: 'flex', gap: '8px' }}>
                                <input
                                  type="text"
                                  value={item}
                                  onChange={(e) => updateSectionItem(sIndex, iIndex, e.target.value)}
                                  style={{ ...inputStyle, flex: 1 }}
                                  placeholder="Введите пункт..."
                                />
                                <button
                                  type="button"
                                  onClick={() => removeSectionItem(sIndex, iIndex)}
                                  disabled={section.items.length === 1}
                                  style={{
                                    padding: '8px',
                                    border: '1px solid #E5E7EB',
                                    borderRadius: '8px',
                                    background: 'white',
                                    cursor: section.items.length === 1 ? 'not-allowed' : 'pointer',
                                    opacity: section.items.length === 1 ? 0.5 : 1,
                                    color: '#DC2626',
                                  }}
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            ))}
                            <button
                              type="button"
                              onClick={() => addSectionItem(sIndex)}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                padding: '8px 12px',
                                border: '1px dashed #D1D5DB',
                                borderRadius: '6px',
                                background: 'white',
                                cursor: 'pointer',
                                color: '#6B7280',
                                fontSize: '13px',
                              }}
                            >
                              <Plus size={14} />
                              Добавить пункт
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="sidebar-section" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div
              style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                padding: '24px',
              }}
            >
              <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#091D33', marginBottom: '12px' }}>
                Информация
              </h3>
              <p style={{ fontSize: '13px', color: '#6B7280', lineHeight: 1.6 }}>
                Здесь вы можете редактировать содержимое раздела NGS на странице &quot;Врачам&quot;.
              </p>
              <p style={{ fontSize: '13px', color: '#6B7280', lineHeight: 1.6, marginTop: '12px' }}>
                Добавьте категории с заголовками и пунктами списка. Не забудьте заполнить все три языковые версии.
              </p>
            </div>

            <button
              type="submit"
              disabled={saving}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '14px 20px',
                backgroundColor: '#209DA7',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: saving ? 'not-allowed' : 'pointer',
                opacity: saving ? 0.6 : 1,
              }}
            >
              <Save style={{ width: '18px', height: '18px' }} />
              {saving ? 'Сохранение...' : 'Сохранить изменения'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
