'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Pencil, Trash2, Star, GripVertical } from 'lucide-react';

interface HomepageCategory {
  id: string;
  name: string;
  nameKz: string;
  nameEn: string;
  description: string;
  tags: string[];
  order: number;
  featured: boolean;
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<HomepageCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/admin/categories');
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/categories/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setCategories(categories.filter((c) => c.id !== id));
        setDeleteId(null);
      }
    } catch (error) {
      console.error('Error deleting category:', error);
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
        }
      `}</style>

      {/* Header */}
      <div className="page-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#091D33', marginBottom: '8px' }}>
            Категории анализов
          </h1>
          <p style={{ color: '#6B7280', fontSize: '15px' }}>
            Управление секцией &quot;Популярные анализы&quot; на главной странице
          </p>
        </div>
        <Link
          href="/admin/categories/new"
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

      {/* Categories List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {categories.map((category) => (
          <div
            key={category.id}
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              border: category.featured ? '2px solid #209DA7' : '2px solid transparent',
            }}
          >
            <div style={{ color: '#9CA3AF', cursor: 'grab' }}>
              <GripVertical style={{ width: '20px', height: '20px' }} />
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <h3 style={{ fontWeight: '600', color: '#091D33', fontSize: '16px', margin: 0 }}>
                  {category.name}
                </h3>
                {category.featured && (
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '2px 8px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: '500',
                      backgroundColor: '#E0F2F4',
                      color: '#209DA7',
                    }}
                  >
                    <Star style={{ width: '10px', height: '10px' }} />
                    Активная
                  </span>
                )}
              </div>
              <p style={{ color: '#6B7280', fontSize: '14px', margin: '0 0 8px 0' }}>
                {category.description.length > 100
                  ? category.description.substring(0, 100) + '...'
                  : category.description}
              </p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {category.tags.slice(0, 3).map((tag, idx) => (
                  <span
                    key={idx}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      backgroundColor: '#F3F4F6',
                      color: '#6B7280',
                    }}
                  >
                    {tag}
                  </span>
                ))}
                {category.tags.length > 3 && (
                  <span style={{ fontSize: '12px', color: '#9CA3AF' }}>
                    +{category.tags.length - 3}
                  </span>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <Link
                href={`/admin/categories/${category.id}`}
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
                onClick={() => setDeleteId(category.id)}
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
          </div>
        ))}

        {categories.length === 0 && (
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '48px',
              textAlign: 'center',
              color: '#9CA3AF',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}
          >
            <p style={{ margin: 0 }}>Категорий пока нет</p>
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
              Удалить категорию?
            </h3>
            <p style={{ color: '#6B7280', marginBottom: '24px', fontSize: '14px' }}>
              Это действие нельзя отменить. Категория будет удалена навсегда.
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
