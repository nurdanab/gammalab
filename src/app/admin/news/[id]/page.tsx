'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';

interface NewsItem {
  id: string;
  slug: string;
  title: string;
  titleKz: string;
  titleEn: string;
  excerpt: string;
  excerptKz: string;
  excerptEn: string;
  content: string;
  contentKz: string;
  contentEn: string;
  image: string;
  category: 'news' | 'promotion';
  publishedAt: string;
  featured: boolean;
}

export default function EditNewsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'ru' | 'kz' | 'en'>('ru');
  const [formData, setFormData] = useState<NewsItem>({
    id: '',
    slug: '',
    title: '',
    titleKz: '',
    titleEn: '',
    excerpt: '',
    excerptKz: '',
    excerptEn: '',
    content: '',
    contentKz: '',
    contentEn: '',
    image: '',
    category: 'news',
    publishedAt: new Date().toISOString().split('T')[0],
    featured: false,
  });

  const isNew = id === 'new';

  useEffect(() => {
    if (!isNew) {
      fetchNews();
    } else {
      setLoading(false);
    }
  }, [id, isNew]);

  const fetchNews = async () => {
    try {
      const res = await fetch(`/api/admin/news/${id}`);
      if (res.ok) {
        const data = await res.json();
        setFormData(data);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const url = isNew ? '/api/admin/news' : `/api/admin/news/${id}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push('/admin/news');
      }
    } catch (error) {
      console.error('Error saving news:', error);
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field: keyof NewsItem, value: string | boolean) => {
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
          href="/admin/news"
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
            {isNew ? 'Новая запись' : 'Редактирование'}
          </h1>
          <p style={{ color: '#6B7280', margin: 0, fontSize: '14px' }}>
            {isNew ? 'Создание новой записи' : formData.title}
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
                      <label style={labelStyle}>Заголовок *</label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => updateField('title', e.target.value)}
                        style={inputStyle}
                        required
                        placeholder="Введите заголовок"
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Краткое описание</label>
                      <textarea
                        value={formData.excerpt}
                        onChange={(e) => updateField('excerpt', e.target.value)}
                        style={textareaStyle}
                        placeholder="Краткое описание для карточки (1-2 предложения)"
                        rows={3}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Полный текст</label>
                      <textarea
                        value={formData.content}
                        onChange={(e) => updateField('content', e.target.value)}
                        style={{ ...textareaStyle, minHeight: '200px' }}
                        placeholder="Полный текст новости или акции"
                        rows={8}
                      />
                    </div>
                  </>
                )}

                {activeTab === 'kz' && (
                  <>
                    <div>
                      <label style={labelStyle}>Заголовок (KZ)</label>
                      <input
                        type="text"
                        value={formData.titleKz}
                        onChange={(e) => updateField('titleKz', e.target.value)}
                        style={inputStyle}
                        placeholder="Тақырып"
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Краткое описание (KZ)</label>
                      <textarea
                        value={formData.excerptKz}
                        onChange={(e) => updateField('excerptKz', e.target.value)}
                        style={textareaStyle}
                        placeholder="Қысқаша сипаттама"
                        rows={3}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Полный текст (KZ)</label>
                      <textarea
                        value={formData.contentKz}
                        onChange={(e) => updateField('contentKz', e.target.value)}
                        style={{ ...textareaStyle, minHeight: '200px' }}
                        placeholder="Толық мәтін"
                        rows={8}
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
                        placeholder="Enter title"
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Excerpt (EN)</label>
                      <textarea
                        value={formData.excerptEn}
                        onChange={(e) => updateField('excerptEn', e.target.value)}
                        style={textareaStyle}
                        placeholder="Short description"
                        rows={3}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Content (EN)</label>
                      <textarea
                        value={formData.contentEn}
                        onChange={(e) => updateField('contentEn', e.target.value)}
                        style={{ ...textareaStyle, minHeight: '200px' }}
                        placeholder="Full content"
                        rows={8}
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
                <label style={labelStyle}>Тип *</label>
                <select
                  value={formData.category}
                  onChange={(e) => updateField('category', e.target.value)}
                  style={{ ...inputStyle, backgroundColor: 'white' }}
                >
                  <option value="news">Новость</option>
                  <option value="promotion">Акция</option>
                </select>
              </div>

              <div>
                <label style={labelStyle}>Дата публикации</label>
                <input
                  type="date"
                  value={formData.publishedAt}
                  onChange={(e) => updateField('publishedAt', e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>URL изображения</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => updateField('image', e.target.value)}
                  style={inputStyle}
                  placeholder="https://..."
                />
                {formData.image && (
                  <div style={{ marginTop: '8px', borderRadius: '8px', overflow: 'hidden' }}>
                    <img
                      src={formData.image}
                      alt="Preview"
                      style={{ width: '100%', height: '120px', objectFit: 'cover' }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                )}
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
