'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Pencil, Trash2, Search, Eye, Home } from 'lucide-react';

interface NewsItem {
  id: string;
  slug: string;
  title: string;
  category: 'news' | 'promotion';
  publishedAt: string;
  featured: boolean;
}

export default function AdminPromotionsPage() {
  const [promotions, setPromotions] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    try {
      const res = await fetch('/api/admin/news');
      if (res.ok) {
        const data = await res.json();
        // Filter only promotion items
        setPromotions(data.filter((item: NewsItem) => item.category === 'promotion'));
      }
    } catch (error) {
      console.error('Error fetching promotions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/news/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setPromotions(promotions.filter((p) => p.id !== id));
        setDeleteId(null);
      }
    } catch (error) {
      console.error('Error deleting promotion:', error);
    }
  };

  const filteredPromotions = promotions.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '300px' }}>
        <div
          style={{
            width: '40px',
            height: '40px',
            border: '3px solid #E5E7EB',
            borderTopColor: '#EC910C',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div>
      <style>{`
        @media (max-width: 768px) {
          .page-header {
            padding-top: 48px !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 16px !important;
          }
          .desktop-table {
            display: none !important;
          }
          .mobile-cards {
            display: block !important;
          }
        }
        @media (min-width: 769px) {
          .mobile-cards {
            display: none !important;
          }
        }
      `}</style>

      {/* Header */}
      <div className="page-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#091D33', marginBottom: '8px' }}>
            Акции
          </h1>
          <p style={{ color: '#6B7280', fontSize: '15px' }}>
            Управление акциями и специальными предложениями
          </p>
        </div>
        <Link
          href="/admin/promotions/new"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 20px',
            backgroundColor: '#EC910C',
            color: 'white',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: '500',
          }}
        >
          <Plus style={{ width: '18px', height: '18px' }} />
          Добавить
        </Link>
      </div>

      {/* Search */}
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        }}
      >
        <div style={{ position: 'relative' }}>
          <Search
            style={{
              position: 'absolute',
              left: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '18px',
              height: '18px',
              color: '#9CA3AF',
            }}
          />
          <input
            type="text"
            placeholder="Поиск по заголовку..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 12px 12px 44px',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>
      </div>

      {/* Desktop Table */}
      <div
        className="desktop-table"
        style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          overflow: 'hidden',
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
              <th style={{ textAlign: 'left', padding: '14px 20px', fontSize: '13px', fontWeight: '600', color: '#6B7280' }}>
                Заголовок
              </th>
              <th style={{ textAlign: 'left', padding: '14px 20px', fontSize: '13px', fontWeight: '600', color: '#6B7280' }}>
                Дата
              </th>
              <th style={{ textAlign: 'left', padding: '14px 20px', fontSize: '13px', fontWeight: '600', color: '#6B7280' }}>
                Главная
              </th>
              <th style={{ textAlign: 'right', padding: '14px 20px', fontSize: '13px', fontWeight: '600', color: '#6B7280' }}>
                Действия
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredPromotions.map((item, index) => (
              <tr
                key={item.id}
                style={{ borderBottom: index < filteredPromotions.length - 1 ? '1px solid #F3F4F6' : 'none' }}
              >
                <td style={{ padding: '16px 20px' }}>
                  <p style={{ fontWeight: '500', color: '#091D33', marginBottom: '4px' }}>{item.title}</p>
                  <p style={{ fontSize: '13px', color: '#9CA3AF' }}>{item.slug}</p>
                </td>
                <td style={{ padding: '16px 20px', color: '#6B7280', fontSize: '14px' }}>
                  {formatDate(item.publishedAt)}
                </td>
                <td style={{ padding: '16px 20px' }}>
                  {item.featured && (
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '500',
                        backgroundColor: '#FEF3E2',
                        color: '#EC910C',
                      }}
                    >
                      <Home style={{ width: '12px', height: '12px' }} />
                      Да
                    </span>
                  )}
                </td>
                <td style={{ padding: '16px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                    <Link
                      href={`/ru/news/${item.slug}`}
                      target="_blank"
                      style={{
                        padding: '8px',
                        borderRadius: '6px',
                        color: '#6B7280',
                        display: 'flex',
                      }}
                      title="Просмотр"
                    >
                      <Eye style={{ width: '18px', height: '18px' }} />
                    </Link>
                    <Link
                      href={`/admin/promotions/${item.id}`}
                      style={{
                        padding: '8px',
                        borderRadius: '6px',
                        color: '#EC910C',
                        display: 'flex',
                      }}
                      title="Редактировать"
                    >
                      <Pencil style={{ width: '18px', height: '18px' }} />
                    </Link>
                    <button
                      onClick={() => setDeleteId(item.id)}
                      style={{
                        padding: '8px',
                        borderRadius: '6px',
                        color: '#EF4444',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                      }}
                      title="Удалить"
                    >
                      <Trash2 style={{ width: '18px', height: '18px' }} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredPromotions.length === 0 && (
          <div style={{ padding: '48px', textAlign: 'center', color: '#9CA3AF' }}>
            {search ? 'Ничего не найдено' : 'Акций пока нет'}
          </div>
        )}
      </div>

      {/* Mobile Cards */}
      <div className="mobile-cards" style={{ display: 'none' }}>
        {filteredPromotions.map((item) => (
          <div
            key={item.id}
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '16px',
              marginBottom: '12px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: '500', color: '#091D33', marginBottom: '4px', fontSize: '15px' }}>{item.title}</p>
                <p style={{ fontSize: '12px', color: '#9CA3AF' }}>{item.slug}</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
              {item.featured && (
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: '500',
                    backgroundColor: '#FEF3E2',
                    color: '#EC910C',
                  }}
                >
                  <Home style={{ width: '10px', height: '10px' }} />
                  На главной
                </span>
              )}
              <span style={{ fontSize: '12px', color: '#9CA3AF' }}>
                {formatDate(item.publishedAt)}
              </span>
            </div>
            <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid #F3F4F6', paddingTop: '12px' }}>
              <Link
                href={`/ru/news/${item.slug}`}
                target="_blank"
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: '8px',
                  backgroundColor: '#F3F4F6',
                  color: '#6B7280',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  textDecoration: 'none',
                  fontSize: '13px',
                }}
              >
                <Eye style={{ width: '16px', height: '16px' }} />
                Просмотр
              </Link>
              <Link
                href={`/admin/promotions/${item.id}`}
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: '8px',
                  backgroundColor: '#FEF3E2',
                  color: '#EC910C',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  textDecoration: 'none',
                  fontSize: '13px',
                }}
              >
                <Pencil style={{ width: '16px', height: '16px' }} />
                Изменить
              </Link>
              <button
                onClick={() => setDeleteId(item.id)}
                style={{
                  padding: '10px',
                  borderRadius: '8px',
                  backgroundColor: '#FEF2F2',
                  color: '#EF4444',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Trash2 style={{ width: '16px', height: '16px' }} />
              </button>
            </div>
          </div>
        ))}
        {filteredPromotions.length === 0 && (
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '48px', textAlign: 'center', color: '#9CA3AF' }}>
            {search ? 'Ничего не найдено' : 'Акций пока нет'}
          </div>
        )}
      </div>

      {/* Delete Modal */}
      {deleteId && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 50,
            padding: '16px',
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '24px',
              maxWidth: '400px',
              width: '100%',
            }}
          >
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#091D33', marginBottom: '8px' }}>
              Удалить акцию?
            </h3>
            <p style={{ color: '#6B7280', marginBottom: '24px', fontSize: '14px' }}>
              Это действие нельзя отменить. Акция будет удалена навсегда.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button
                onClick={() => setDeleteId(null)}
                style={{
                  padding: '10px 16px',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
              >
                Отмена
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                style={{
                  padding: '10px 16px',
                  backgroundColor: '#EF4444',
                  color: 'white',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
