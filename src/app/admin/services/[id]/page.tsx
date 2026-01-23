'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';

interface HomepageService {
  id: string;
  title: string;
  titleKz: string;
  titleEn: string;
  description: string;
  descriptionKz: string;
  descriptionEn: string;
  icon: string;
  order: number;
}

const iconOptions = [
  { value: 'flask', label: 'Колба (лаборатория)' },
  { value: 'clock', label: 'Часы (быстрые результаты)' },
  { value: 'calendar', label: 'Календарь (онлайн-запись)' },
  { value: 'home', label: 'Дом (выезд на дом)' },
  { value: 'microscope', label: 'Микроскоп (оборудование)' },
  { value: 'users', label: 'Люди (персонал)' },
];

export default function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'ru' | 'kz' | 'en'>('ru');
  const [formData, setFormData] = useState<HomepageService>({
    id: '',
    title: '',
    titleKz: '',
    titleEn: '',
    description: '',
    descriptionKz: '',
    descriptionEn: '',
    icon: 'flask',
    order: 1,
  });

  const isNew = id === 'new';

  useEffect(() => {
    if (!isNew) {
      fetchService();
    } else {
      setLoading(false);
    }
  }, [id, isNew]);

  const fetchService = async () => {
    try {
      const res = await fetch(`/api/admin/services/${id}`);
      if (res.ok) {
        const data = await res.json();
        setFormData(data);
      }
    } catch (error) {
      console.error('Error fetching service:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const url = isNew ? '/api/admin/services' : `/api/admin/services/${id}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push('/admin/services');
      }
    } catch (error) {
      console.error('Error saving service:', error);
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field: keyof HomepageService, value: string | number) => {
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
          href="/admin/services"
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
            {isNew ? 'Новая услуга' : 'Редактирование'}
          </h1>
          <p style={{ color: '#6B7280', margin: 0, fontSize: '14px' }}>
            {isNew ? 'Добавление новой услуги на главную' : formData.title}
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
                        value={formData.title}
                        onChange={(e) => updateField('title', e.target.value)}
                        style={inputStyle}
                        required
                        placeholder="Введите название услуги"
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Описание</label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => updateField('description', e.target.value)}
                        style={textareaStyle}
                        placeholder="Краткое описание услуги"
                        rows={4}
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
                        value={formData.titleKz}
                        onChange={(e) => updateField('titleKz', e.target.value)}
                        style={inputStyle}
                        placeholder="Қызмет атауы"
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Описание (KZ)</label>
                      <textarea
                        value={formData.descriptionKz}
                        onChange={(e) => updateField('descriptionKz', e.target.value)}
                        style={textareaStyle}
                        placeholder="Қысқаша сипаттама"
                        rows={4}
                      />
                    </div>
                  </>
                )}

                {activeTab === 'en' && (
                  <>
                    <div>
                      <label style={labelStyle}>Title (EN)</label>
                      <input
                        type="text"
                        value={formData.titleEn}
                        onChange={(e) => updateField('titleEn', e.target.value)}
                        style={inputStyle}
                        placeholder="Service title"
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Description (EN)</label>
                      <textarea
                        value={formData.descriptionEn}
                        onChange={(e) => updateField('descriptionEn', e.target.value)}
                        style={textareaStyle}
                        placeholder="Brief description"
                        rows={4}
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
                <label style={labelStyle}>Иконка *</label>
                <select
                  value={formData.icon}
                  onChange={(e) => updateField('icon', e.target.value)}
                  style={inputStyle}
                  required
                >
                  {iconOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={labelStyle}>Порядок отображения</label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => updateField('order', parseInt(e.target.value) || 1)}
                  style={inputStyle}
                  min="1"
                />
                <p style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '4px' }}>
                  На главной показываются первые 4 услуги
                </p>
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
