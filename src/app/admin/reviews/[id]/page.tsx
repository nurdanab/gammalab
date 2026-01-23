'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Star } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';

interface Review {
  id: string;
  name: string;
  nameKz: string;
  nameEn: string;
  text: string;
  textKz: string;
  textEn: string;
  rating: number;
  date: string;
  photo?: string;
  showOnHomepage: boolean;
  order: number;
}

export default function EditReviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'ru' | 'kz' | 'en'>('ru');
  const [formData, setFormData] = useState<Review>({
    id: '',
    name: '',
    nameKz: '',
    nameEn: '',
    text: '',
    textKz: '',
    textEn: '',
    rating: 5,
    date: new Date().toISOString().split('T')[0],
    photo: '',
    showOnHomepage: true,
    order: 1,
  });

  const isNew = id === 'new';

  useEffect(() => {
    if (!isNew) {
      fetchReview();
    } else {
      setLoading(false);
    }
  }, [id, isNew]);

  const fetchReview = async () => {
    try {
      const res = await fetch(`/api/admin/reviews/${id}`);
      if (res.ok) {
        const data = await res.json();
        setFormData(data);
      }
    } catch (error) {
      console.error('Error fetching review:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const url = isNew ? '/api/admin/reviews' : `/api/admin/reviews/${id}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push('/admin/reviews');
      }
    } catch (error) {
      console.error('Error saving review:', error);
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field: keyof Review, value: string | number | boolean) => {
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
    minHeight: '120px',
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
          href="/admin/reviews"
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
            {isNew ? 'Новый отзыв' : 'Редактирование'}
          </h1>
          <p style={{ color: '#6B7280', margin: 0, fontSize: '14px' }}>
            {isNew ? 'Добавление нового отзыва' : formData.name}
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
                      <label style={labelStyle}>Имя *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => updateField('name', e.target.value)}
                        style={inputStyle}
                        required
                        placeholder="Введите имя"
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Текст отзыва *</label>
                      <textarea
                        value={formData.text}
                        onChange={(e) => updateField('text', e.target.value)}
                        style={textareaStyle}
                        required
                        placeholder="Введите текст отзыва"
                        rows={5}
                      />
                    </div>
                  </>
                )}

                {activeTab === 'kz' && (
                  <>
                    <div>
                      <label style={labelStyle}>Имя (KZ)</label>
                      <input
                        type="text"
                        value={formData.nameKz}
                        onChange={(e) => updateField('nameKz', e.target.value)}
                        style={inputStyle}
                        placeholder="Атын енгізіңіз"
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Текст отзыва (KZ)</label>
                      <textarea
                        value={formData.textKz}
                        onChange={(e) => updateField('textKz', e.target.value)}
                        style={textareaStyle}
                        placeholder="Пікір мәтінін енгізіңіз"
                        rows={5}
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
                        placeholder="Enter name"
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Review text (EN)</label>
                      <textarea
                        value={formData.textEn}
                        onChange={(e) => updateField('textEn', e.target.value)}
                        style={textareaStyle}
                        placeholder="Enter review text"
                        rows={5}
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
                <label style={labelStyle}>Рейтинг *</label>
                <div style={{ display: 'flex', gap: '4px' }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => updateField('rating', star)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '4px',
                      }}
                    >
                      <Star
                        style={{
                          width: '24px',
                          height: '24px',
                          fill: star <= formData.rating ? '#FBBF24' : 'none',
                          color: star <= formData.rating ? '#FBBF24' : '#D1D5DB',
                        }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={labelStyle}>Дата</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => updateField('date', e.target.value)}
                  style={inputStyle}
                />
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
              </div>

              <ImageUpload
                value={formData.photo || ''}
                onChange={(url) => updateField('photo', url)}
                folder="reviews"
              />

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '8px' }}>
                <input
                  type="checkbox"
                  id="showOnHomepage"
                  checked={formData.showOnHomepage}
                  onChange={(e) => updateField('showOnHomepage', e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: '#209DA7' }}
                />
                <label htmlFor="showOnHomepage" style={{ fontSize: '14px', color: '#374151' }}>
                  Показывать на главной странице
                </label>
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
