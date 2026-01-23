'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';

interface Analysis {
  id: string;
  slug: string;
  name: string;
  nameKz: string;
  nameEn: string;
  description: string;
  descriptionKz: string;
  descriptionEn: string;
  categoryId: string;
  price: number;
  collectionPrice: number;
  deadline: string;
  deadlineKz: string;
  deadlineEn: string;
  biomaterial: string;
  biomaterialKz: string;
  biomaterialEn: string;
  preparation: string;
  preparationKz: string;
  preparationEn: string;
}

interface Category {
  id: string;
  name: string;
}

export default function EditAnalysisPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeTab, setActiveTab] = useState<'ru' | 'kz' | 'en'>('ru');
  const [formData, setFormData] = useState<Analysis>({
    id: '',
    slug: '',
    name: '',
    nameKz: '',
    nameEn: '',
    description: '',
    descriptionKz: '',
    descriptionEn: '',
    categoryId: '',
    price: 0,
    collectionPrice: 0,
    deadline: '',
    deadlineKz: '',
    deadlineEn: '',
    biomaterial: '',
    biomaterialKz: '',
    biomaterialEn: '',
    preparation: '',
    preparationKz: '',
    preparationEn: '',
  });

  const isNew = id === 'new';

  useEffect(() => {
    fetchCategories();
    if (!isNew) {
      fetchAnalysis();
    } else {
      setLoading(false);
    }
  }, [id, isNew]);

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/admin/analyses?includeCategories=true');
      if (res.ok) {
        const data = await res.json();
        setCategories(data.categories);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchAnalysis = async () => {
    try {
      const res = await fetch(`/api/admin/analyses/${id}`);
      if (res.ok) {
        const data = await res.json();
        setFormData(data);
      }
    } catch (error) {
      console.error('Error fetching analysis:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const url = isNew ? '/api/admin/analyses' : `/api/admin/analyses/${id}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push('/admin/analyses');
      }
    } catch (error) {
      console.error('Error saving analysis:', error);
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field: keyof Analysis, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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
          href="/admin/analyses"
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
            {isNew ? 'Новый анализ' : 'Редактирование'}
          </h1>
          <p style={{ color: '#6B7280', margin: 0, fontSize: '14px' }}>
            {isNew ? 'Создание нового анализа' : formData.name}
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
                      <label style={labelStyle}>Название (RU) *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => updateField('name', e.target.value)}
                        style={inputStyle}
                        required
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Описание (RU)</label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => updateField('description', e.target.value)}
                        style={textareaStyle}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Сроки (RU)</label>
                      <input
                        type="text"
                        value={formData.deadline}
                        onChange={(e) => updateField('deadline', e.target.value)}
                        style={inputStyle}
                        placeholder="3 рабочих дня"
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Биоматериал (RU)</label>
                      <input
                        type="text"
                        value={formData.biomaterial}
                        onChange={(e) => updateField('biomaterial', e.target.value)}
                        style={inputStyle}
                        placeholder="Венозная кровь"
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Подготовка (RU)</label>
                      <textarea
                        value={formData.preparation}
                        onChange={(e) => updateField('preparation', e.target.value)}
                        style={textareaStyle}
                      />
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
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Описание (KZ)</label>
                      <textarea
                        value={formData.descriptionKz}
                        onChange={(e) => updateField('descriptionKz', e.target.value)}
                        style={textareaStyle}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Сроки (KZ)</label>
                      <input
                        type="text"
                        value={formData.deadlineKz}
                        onChange={(e) => updateField('deadlineKz', e.target.value)}
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Биоматериал (KZ)</label>
                      <input
                        type="text"
                        value={formData.biomaterialKz}
                        onChange={(e) => updateField('biomaterialKz', e.target.value)}
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Подготовка (KZ)</label>
                      <textarea
                        value={formData.preparationKz}
                        onChange={(e) => updateField('preparationKz', e.target.value)}
                        style={textareaStyle}
                      />
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
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Description (EN)</label>
                      <textarea
                        value={formData.descriptionEn}
                        onChange={(e) => updateField('descriptionEn', e.target.value)}
                        style={textareaStyle}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Deadline (EN)</label>
                      <input
                        type="text"
                        value={formData.deadlineEn}
                        onChange={(e) => updateField('deadlineEn', e.target.value)}
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Biomaterial (EN)</label>
                      <input
                        type="text"
                        value={formData.biomaterialEn}
                        onChange={(e) => updateField('biomaterialEn', e.target.value)}
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Preparation (EN)</label>
                      <textarea
                        value={formData.preparationEn}
                        onChange={(e) => updateField('preparationEn', e.target.value)}
                        style={textareaStyle}
                      />
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
                <label style={labelStyle}>Категория *</label>
                <select
                  value={formData.categoryId}
                  onChange={(e) => updateField('categoryId', e.target.value)}
                  style={{ ...inputStyle, backgroundColor: 'white' }}
                  required
                >
                  <option value="">Выберите категорию</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={labelStyle}>Цена (тенге)</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => updateField('price', parseInt(e.target.value) || 0)}
                  style={inputStyle}
                  min="0"
                />
              </div>

              <div>
                <label style={labelStyle}>Цена забора (тенге)</label>
                <input
                  type="number"
                  value={formData.collectionPrice}
                  onChange={(e) => updateField('collectionPrice', parseInt(e.target.value) || 0)}
                  style={inputStyle}
                  min="0"
                />
              </div>
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
