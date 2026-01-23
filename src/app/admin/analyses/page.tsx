'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';

interface Analysis {
  id: string;
  slug: string;
  name: string;
  categoryId: string;
  price: number;
}

interface Category {
  id: string;
  name: string;
}

export default function AdminAnalysesPage() {
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/admin/analyses?includeCategories=true');
      if (res.ok) {
        const data = await res.json();
        setAnalyses(data.analyses);
        setCategories(data.categories);
      }
    } catch (error) {
      console.error('Error fetching analyses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/analyses/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setAnalyses(analyses.filter((a) => a.id !== id));
        setDeleteId(null);
      }
    } catch (error) {
      console.error('Error deleting analysis:', error);
    }
  };

  const getCategoryName = (categoryId: string) => {
    return categories.find((c) => c.id === categoryId)?.name || categoryId;
  };

  const filteredAnalyses = analyses.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !categoryFilter || item.categoryId === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU').format(price) + ' ₸';
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
          .filters-container {
            flex-direction: column !important;
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
            Анализы
          </h1>
          <p style={{ color: '#6B7280', fontSize: '15px' }}>
            Управление каталогом анализов
          </p>
        </div>
        <Link
          href="/admin/analyses/new"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 20px',
            backgroundColor: '#209DA7',
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

      {/* Filters */}
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        }}
      >
        <div className="filters-container" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
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
              placeholder="Поиск по названию..."
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
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{
              padding: '12px 16px',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none',
              minWidth: '200px',
              backgroundColor: 'white',
            }}
          >
            <option value="">Все категории</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
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
                Название
              </th>
              <th style={{ textAlign: 'left', padding: '14px 20px', fontSize: '13px', fontWeight: '600', color: '#6B7280' }}>
                Категория
              </th>
              <th style={{ textAlign: 'left', padding: '14px 20px', fontSize: '13px', fontWeight: '600', color: '#6B7280' }}>
                Цена
              </th>
              <th style={{ textAlign: 'right', padding: '14px 20px', fontSize: '13px', fontWeight: '600', color: '#6B7280' }}>
                Действия
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAnalyses.map((item, index) => (
              <tr
                key={item.id}
                style={{ borderBottom: index < filteredAnalyses.length - 1 ? '1px solid #F3F4F6' : 'none' }}
              >
                <td style={{ padding: '16px 20px' }}>
                  <p style={{ fontWeight: '500', color: '#091D33', marginBottom: '4px' }}>{item.name}</p>
                  <p style={{ fontSize: '13px', color: '#9CA3AF' }}>{item.slug}</p>
                </td>
                <td style={{ padding: '16px 20px', color: '#6B7280', fontSize: '14px' }}>
                  {getCategoryName(item.categoryId)}
                </td>
                <td style={{ padding: '16px 20px', fontWeight: '600', color: '#209DA7', fontSize: '14px' }}>
                  {formatPrice(item.price)}
                </td>
                <td style={{ padding: '16px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                    <Link
                      href={`/admin/analyses/${item.id}`}
                      style={{
                        padding: '8px',
                        borderRadius: '6px',
                        color: '#209DA7',
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

        {filteredAnalyses.length === 0 && (
          <div style={{ padding: '48px', textAlign: 'center', color: '#9CA3AF' }}>
            {search || categoryFilter ? 'Ничего не найдено' : 'Анализов пока нет'}
          </div>
        )}
      </div>

      {/* Mobile Cards */}
      <div className="mobile-cards" style={{ display: 'none' }}>
        {filteredAnalyses.map((item) => (
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
            <div style={{ marginBottom: '12px' }}>
              <p style={{ fontWeight: '500', color: '#091D33', marginBottom: '4px', fontSize: '15px' }}>{item.name}</p>
              <p style={{ fontSize: '12px', color: '#9CA3AF' }}>{item.slug}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '13px', color: '#6B7280' }}>
                {getCategoryName(item.categoryId)}
              </span>
              <span style={{ fontWeight: '600', color: '#209DA7', fontSize: '15px' }}>
                {formatPrice(item.price)}
              </span>
            </div>
            <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid #F3F4F6', paddingTop: '12px' }}>
              <Link
                href={`/admin/analyses/${item.id}`}
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: '8px',
                  backgroundColor: '#E0F2F4',
                  color: '#209DA7',
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
                  padding: '10px 16px',
                  borderRadius: '8px',
                  backgroundColor: '#FEF2F2',
                  color: '#EF4444',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  fontSize: '13px',
                }}
              >
                <Trash2 style={{ width: '16px', height: '16px' }} />
                Удалить
              </button>
            </div>
          </div>
        ))}
        {filteredAnalyses.length === 0 && (
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '48px', textAlign: 'center', color: '#9CA3AF' }}>
            {search || categoryFilter ? 'Ничего не найдено' : 'Анализов пока нет'}
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
              Удалить анализ?
            </h3>
            <p style={{ color: '#6B7280', marginBottom: '24px', fontSize: '14px' }}>
              Это действие нельзя отменить. Анализ будет удален навсегда.
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
