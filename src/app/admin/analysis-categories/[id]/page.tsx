'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  nameKz: string;
  nameEn: string;
  slug: string;
}

export default function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const isNew = id === 'new';

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'ru' | 'kz' | 'en'>('ru');

  const [formData, setFormData] = useState({
    name: '',
    nameKz: '',
    nameEn: '',
    slug: '',
  });

  useEffect(() => {
    if (!isNew) {
      fetchCategory();
    }
  }, [id, isNew]);

  const fetchCategory = async () => {
    try {
      const res = await fetch(`/api/admin/analysis-categories/${id}`);
      if (res.ok) {
        const data: Category = await res.json();
        setFormData({
          name: data.name,
          nameKz: data.nameKz,
          nameEn: data.nameEn,
          slug: data.slug,
        });
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
      const url = isNew ? '/api/admin/analysis-categories' : `/api/admin/analysis-categories/${id}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push('/admin/analysis-categories');
      } else {
        const data = await res.json();
        alert(data.error || 'Ошибка сохранения');
      }
    } catch (error) {
      console.error('Error saving category:', error);
      alert('Ошибка сохранения');
    } finally {
      setSaving(false);
    }
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

  const inputStyle = {
    width: '100%',
    padding: '12px 14px',
    border: '1px solid #E5E7EB',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box' as const,
  };

  const labelStyle = {
    display: 'block',
    fontSize: '14px',
    fontWeight: '500' as const,
    color: '#374151',
    marginBottom: '6px',
  };

  return (
    <div>
      <style>{`
        @media (max-width: 768px) {
          .page-header { padding-top: 48px !important; }
        }
        input:focus, textarea:focus {
          border-color: #209DA7 !important;
        }
      `}</style>

      {/* Header */}
      <div className="page-header" style={{ marginBottom: '32px' }}>
        <Link
          href="/admin/analysis-categories"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#6B7280',
            textDecoration: 'none',
            fontSize: '14px',
            marginBottom: '16px',
          }}
        >
          <ArrowLeft style={{ width: '18px', height: '18px' }} />
          Назад к категориям
        </Link>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#091D33', marginBottom: '8px' }}>
          {isNew ? 'Новая категория' : 'Редактирование категории'}
        </h1>
        <p style={{ color: '#6B7280', fontSize: '15px' }}>
          {isNew ? 'Создание новой категории анализов' : 'Изменение данных категории'}
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            marginBottom: '24px',
          }}
        >
          {/* Language Tabs */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
            {(['ru', 'kz', 'en'] as const).map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => setActiveTab(lang)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '6px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  backgroundColor: activeTab === lang ? '#209DA7' : '#F3F4F6',
                  color: activeTab === lang ? 'white' : '#6B7280',
                }}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Russian Fields */}
          {activeTab === 'ru' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={labelStyle}>
                  Название (RU) <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  style={inputStyle}
                  placeholder="Например: Общеклинические исследования"
                />
              </div>
            </div>
          )}

          {/* Kazakh Fields */}
          {activeTab === 'kz' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={labelStyle}>Название (KZ)</label>
                <input
                  type="text"
                  value={formData.nameKz}
                  onChange={(e) => setFormData({ ...formData, nameKz: e.target.value })}
                  style={inputStyle}
                  placeholder="Казахское название"
                />
              </div>
            </div>
          )}

          {/* English Fields */}
          {activeTab === 'en' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={labelStyle}>Название (EN)</label>
                <input
                  type="text"
                  value={formData.nameEn}
                  onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                  style={inputStyle}
                  placeholder="English name"
                />
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <Link
            href="/admin/analysis-categories"
            style={{
              padding: '12px 24px',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              backgroundColor: 'white',
              color: '#374151',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            Отмена
          </Link>
          <button
            type="submit"
            disabled={saving}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              backgroundColor: '#209DA7',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: saving ? 'not-allowed' : 'pointer',
              opacity: saving ? 0.7 : 1,
            }}
          >
            <Save style={{ width: '18px', height: '18px' }} />
            {saving ? 'Сохранение...' : 'Сохранить'}
          </button>
        </div>
      </form>
    </div>
  );
}
