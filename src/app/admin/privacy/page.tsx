'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, Plus, Trash2, GripVertical } from 'lucide-react';

interface Section {
  title: string;
  content: string;
}

interface PageData {
  id: string;
  title: string;
  titleKz: string;
  titleEn: string;
  lastUpdated: string;
  lastUpdatedKz: string;
  lastUpdatedEn: string;
  sections: Section[];
  sectionsKz: Section[];
  sectionsEn: Section[];
}

export default function PrivacyAdminPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'ru' | 'kz' | 'en'>('ru');
  const [formData, setFormData] = useState<PageData>({
    id: 'privacy',
    title: 'Политика конфиденциальности',
    titleKz: 'Құпиялылық саясаты',
    titleEn: 'Privacy Policy',
    lastUpdated: 'Январь 2024',
    lastUpdatedKz: 'Қаңтар 2024',
    lastUpdatedEn: 'January 2024',
    sections: [],
    sectionsKz: [],
    sectionsEn: [],
  });

  useEffect(() => {
    fetchPage();
  }, []);

  const fetchPage = async () => {
    try {
      const res = await fetch('/api/admin/pages/privacy');
      if (res.ok) {
        const data = await res.json();
        setFormData(data);
      }
    } catch (error) {
      console.error('Error fetching page:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch('/api/admin/pages/privacy', {
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
      console.error('Error saving page:', error);
      alert('Ошибка сохранения');
    } finally {
      setSaving(false);
    }
  };

  const getSections = (): Section[] => {
    if (activeTab === 'kz') return formData.sectionsKz;
    if (activeTab === 'en') return formData.sectionsEn;
    return formData.sections;
  };

  const setSections = (sections: Section[]) => {
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
    setSections([...sections, { title: '', content: '' }]);
  };

  const updateSection = (index: number, field: 'title' | 'content', value: string) => {
    const sections = [...getSections()];
    sections[index] = { ...sections[index], [field]: value };
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
    minHeight: '120px',
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
            Политика конфиденциальности
          </h1>
          <p style={{ color: '#6B7280', margin: 0, fontSize: '14px' }}>
            Редактирование страницы
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
                    Заголовок страницы {activeTab === 'kz' ? '(KZ)' : activeTab === 'en' ? '(EN)' : ''}
                  </label>
                  <input
                    type="text"
                    value={activeTab === 'kz' ? formData.titleKz : activeTab === 'en' ? formData.titleEn : formData.title}
                    onChange={(e) => {
                      if (activeTab === 'kz') setFormData((p) => ({ ...p, titleKz: e.target.value }));
                      else if (activeTab === 'en') setFormData((p) => ({ ...p, titleEn: e.target.value }));
                      else setFormData((p) => ({ ...p, title: e.target.value }));
                    }}
                    style={inputStyle}
                    required
                  />
                </div>
                <div>
                  <label style={labelStyle}>
                    Дата обновления {activeTab === 'kz' ? '(KZ)' : activeTab === 'en' ? '(EN)' : ''}
                  </label>
                  <input
                    type="text"
                    value={activeTab === 'kz' ? formData.lastUpdatedKz : activeTab === 'en' ? formData.lastUpdatedEn : formData.lastUpdated}
                    onChange={(e) => {
                      if (activeTab === 'kz') setFormData((p) => ({ ...p, lastUpdatedKz: e.target.value }));
                      else if (activeTab === 'en') setFormData((p) => ({ ...p, lastUpdatedEn: e.target.value }));
                      else setFormData((p) => ({ ...p, lastUpdated: e.target.value }));
                    }}
                    style={inputStyle}
                    placeholder="Например: Январь 2024"
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
                  Секции ({activeTab.toUpperCase()})
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
                  Добавить секцию
                </button>
              </div>

              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {sections.length === 0 ? (
                  <p style={{ color: '#9CA3AF', textAlign: 'center', padding: '20px' }}>
                    Нет секций. Нажмите &quot;Добавить секцию&quot; для создания.
                  </p>
                ) : (
                  sections.map((section, index) => (
                    <div
                      key={index}
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
                          Секция {index + 1}
                        </span>
                        <div style={{ marginLeft: 'auto', display: 'flex', gap: '4px' }}>
                          <button
                            type="button"
                            onClick={() => moveSection(index, 'up')}
                            disabled={index === 0}
                            style={{
                              padding: '4px 8px',
                              border: '1px solid #E5E7EB',
                              borderRadius: '4px',
                              background: 'white',
                              cursor: index === 0 ? 'not-allowed' : 'pointer',
                              opacity: index === 0 ? 0.5 : 1,
                              fontSize: '12px',
                            }}
                          >
                            ↑
                          </button>
                          <button
                            type="button"
                            onClick={() => moveSection(index, 'down')}
                            disabled={index === sections.length - 1}
                            style={{
                              padding: '4px 8px',
                              border: '1px solid #E5E7EB',
                              borderRadius: '4px',
                              background: 'white',
                              cursor: index === sections.length - 1 ? 'not-allowed' : 'pointer',
                              opacity: index === sections.length - 1 ? 0.5 : 1,
                              fontSize: '12px',
                            }}
                          >
                            ↓
                          </button>
                          <button
                            type="button"
                            onClick={() => removeSection(index)}
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
                          <label style={{ ...labelStyle, fontSize: '13px' }}>Заголовок</label>
                          <input
                            type="text"
                            value={section.title}
                            onChange={(e) => updateSection(index, 'title', e.target.value)}
                            style={inputStyle}
                            placeholder="Например: 1. Общие положения"
                          />
                        </div>
                        <div>
                          <label style={{ ...labelStyle, fontSize: '13px' }}>Содержание</label>
                          <textarea
                            value={section.content}
                            onChange={(e) => updateSection(index, 'content', e.target.value)}
                            style={textareaStyle}
                            placeholder="Текст секции..."
                            rows={5}
                          />
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
                Здесь вы можете редактировать содержимое страницы &quot;Политика конфиденциальности&quot;.
              </p>
              <p style={{ fontSize: '13px', color: '#6B7280', lineHeight: 1.6, marginTop: '12px' }}>
                Не забудьте обновить все три языковые версии (RU, KZ, EN).
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
