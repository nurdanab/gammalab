'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Plus, X } from 'lucide-react';

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

export default function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'ru' | 'kz' | 'en'>('ru');
  const [newTag, setNewTag] = useState('');
  const [formData, setFormData] = useState<HomepageCategory>({
    id: '',
    name: '',
    nameKz: '',
    nameEn: '',
    description: '',
    descriptionKz: '',
    descriptionEn: '',
    description2: '',
    description2Kz: '',
    description2En: '',
    tags: [],
    tagsKz: [],
    tagsEn: [],
    order: 1,
    featured: false,
  });

  const isNew = id === 'new';

  useEffect(() => {
    if (!isNew) {
      fetchCategory();
    } else {
      setLoading(false);
    }
  }, [id, isNew]);

  const fetchCategory = async () => {
    try {
      const res = await fetch(`/api/admin/categories/${id}`);
      if (res.ok) {
        const data = await res.json();
        setFormData(data);
      }
    } catch (error) {
      console.error('Error fetching category:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const url = isNew ? '/api/admin/categories' : `/api/admin/categories/${id}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push('/admin/categories');
      }
    } catch (error) {
      console.error('Error saving category:', error);
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field: keyof HomepageCategory, value: string | number | boolean | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addTag = (lang: 'ru' | 'kz' | 'en') => {
    if (!newTag.trim()) return;
    const field = lang === 'ru' ? 'tags' : lang === 'kz' ? 'tagsKz' : 'tagsEn';
    const currentTags = formData[field] as string[];
    if (!currentTags.includes(newTag.trim())) {
      updateField(field, [...currentTags, newTag.trim()]);
    }
    setNewTag('');
  };

  const removeTag = (lang: 'ru' | 'kz' | 'en', index: number) => {
    const field = lang === 'ru' ? 'tags' : lang === 'kz' ? 'tagsKz' : 'tagsEn';
    const currentTags = formData[field] as string[];
    updateField(field, currentTags.filter((_, i) => i !== index));
  };

  const getCurrentTags = () => {
    if (activeTab === 'kz') return formData.tagsKz;
    if (activeTab === 'en') return formData.tagsEn;
    return formData.tags;
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
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151',
    marginBottom: '6px',
  };

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
          href="/admin/categories"
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
            {isNew ? 'Новая категория' : 'Редактирование'}
          </h1>
          <p style={{ color: '#6B7280', margin: 0, fontSize: '14px' }}>
            {isNew ? 'Создание новой категории анализов' : formData.name}
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
                {activeTab === 'ru' && (
                  <>
                    <div>
                      <label style={labelStyle}>Название *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => updateField('name', e.target.value)}
                        style={inputStyle}
                        required
                        placeholder="Например: Кардиология"
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Описание 1</label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => updateField('description', e.target.value)}
                        style={textareaStyle}
                        placeholder="Первый абзац описания"
                        rows={3}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Описание 2</label>
                      <textarea
                        value={formData.description2}
                        onChange={(e) => updateField('description2', e.target.value)}
                        style={textareaStyle}
                        placeholder="Второй абзац описания (опционально)"
                        rows={3}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Теги</label>
                      <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                        <input
                          type="text"
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              addTag('ru');
                            }
                          }}
                          style={{ ...inputStyle, flex: 1 }}
                          placeholder="Добавить тег"
                        />
                        <button
                          type="button"
                          onClick={() => addTag('ru')}
                          style={{
                            padding: '10px',
                            backgroundColor: '#209DA7',
                            color: 'white',
                            borderRadius: '8px',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                          }}
                        >
                          <Plus style={{ width: '18px', height: '18px' }} />
                        </button>
                      </div>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {formData.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              padding: '6px 12px',
                              borderRadius: '20px',
                              fontSize: '13px',
                              backgroundColor: '#E0F2F4',
                              color: '#209DA7',
                            }}
                          >
                            {tag}
                            <button
                              type="button"
                              onClick={() => removeTag('ru', idx)}
                              style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: 0,
                                display: 'flex',
                                color: '#209DA7',
                              }}
                            >
                              <X style={{ width: '14px', height: '14px' }} />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {activeTab === 'kz' && (
                  <>
                    <div>
                      <label style={labelStyle}>Название (KZ)</label>
                      <input
                        type="text"
                        value={formData.nameKz}
                        onChange={(e) => updateField('nameKz', e.target.value)}
                        style={inputStyle}
                        placeholder="Атауы"
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Описание 1 (KZ)</label>
                      <textarea
                        value={formData.descriptionKz}
                        onChange={(e) => updateField('descriptionKz', e.target.value)}
                        style={textareaStyle}
                        placeholder="Бірінші абзац"
                        rows={3}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Описание 2 (KZ)</label>
                      <textarea
                        value={formData.description2Kz}
                        onChange={(e) => updateField('description2Kz', e.target.value)}
                        style={textareaStyle}
                        placeholder="Екінші абзац"
                        rows={3}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Теги (KZ)</label>
                      <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                        <input
                          type="text"
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              addTag('kz');
                            }
                          }}
                          style={{ ...inputStyle, flex: 1 }}
                          placeholder="Тег қосу"
                        />
                        <button
                          type="button"
                          onClick={() => addTag('kz')}
                          style={{
                            padding: '10px',
                            backgroundColor: '#209DA7',
                            color: 'white',
                            borderRadius: '8px',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                          }}
                        >
                          <Plus style={{ width: '18px', height: '18px' }} />
                        </button>
                      </div>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {formData.tagsKz.map((tag, idx) => (
                          <span
                            key={idx}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              padding: '6px 12px',
                              borderRadius: '20px',
                              fontSize: '13px',
                              backgroundColor: '#E0F2F4',
                              color: '#209DA7',
                            }}
                          >
                            {tag}
                            <button
                              type="button"
                              onClick={() => removeTag('kz', idx)}
                              style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: 0,
                                display: 'flex',
                                color: '#209DA7',
                              }}
                            >
                              <X style={{ width: '14px', height: '14px' }} />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {activeTab === 'en' && (
                  <>
                    <div>
                      <label style={labelStyle}>Name (EN)</label>
                      <input
                        type="text"
                        value={formData.nameEn}
                        onChange={(e) => updateField('nameEn', e.target.value)}
                        style={inputStyle}
                        placeholder="Category name"
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Description 1 (EN)</label>
                      <textarea
                        value={formData.descriptionEn}
                        onChange={(e) => updateField('descriptionEn', e.target.value)}
                        style={textareaStyle}
                        placeholder="First paragraph"
                        rows={3}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Description 2 (EN)</label>
                      <textarea
                        value={formData.description2En}
                        onChange={(e) => updateField('description2En', e.target.value)}
                        style={textareaStyle}
                        placeholder="Second paragraph"
                        rows={3}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Tags (EN)</label>
                      <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                        <input
                          type="text"
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              addTag('en');
                            }
                          }}
                          style={{ ...inputStyle, flex: 1 }}
                          placeholder="Add tag"
                        />
                        <button
                          type="button"
                          onClick={() => addTag('en')}
                          style={{
                            padding: '10px',
                            backgroundColor: '#209DA7',
                            color: 'white',
                            borderRadius: '8px',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                          }}
                        >
                          <Plus style={{ width: '18px', height: '18px' }} />
                        </button>
                      </div>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {formData.tagsEn.map((tag, idx) => (
                          <span
                            key={idx}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              padding: '6px 12px',
                              borderRadius: '20px',
                              fontSize: '13px',
                              backgroundColor: '#E0F2F4',
                              color: '#209DA7',
                            }}
                          >
                            {tag}
                            <button
                              type="button"
                              onClick={() => removeTag('en', idx)}
                              style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: 0,
                                display: 'flex',
                                color: '#209DA7',
                              }}
                            >
                              <X style={{ width: '14px', height: '14px' }} />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  </>
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
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              <div>
                <label style={labelStyle}>Порядок отображения</label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => updateField('order', parseInt(e.target.value) || 1)}
                  style={inputStyle}
                  min="1"
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '8px' }}>
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => updateField('featured', e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: '#209DA7' }}
                />
                <label htmlFor="featured" style={{ fontSize: '14px', color: '#374151' }}>
                  Показывать на главной (активная)
                </label>
              </div>
              <p style={{ fontSize: '12px', color: '#9CA3AF', margin: 0 }}>
                Только одна категория может быть активной. При выборе этой опции, другие категории станут неактивными.
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
              {saving ? 'Сохранение...' : 'Сохранить'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
