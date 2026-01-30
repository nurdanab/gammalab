'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Pencil, Trash2, Image as ImageIcon, Eye, EyeOff } from 'lucide-react';

interface HeroCarousel {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  order: number;
  isActive: boolean;
}

export default function AdminHeroCarouselsPage() {
  const [carousels, setCarousels] = useState<HeroCarousel[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetchCarousels();
  }, []);

  const fetchCarousels = async () => {
    try {
      const res = await fetch('/api/admin/hero-carousels');
      if (res.ok) {
        const data = await res.json();
        setCarousels(data);
      }
    } catch (error) {
      console.error('Error fetching hero carousels:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/hero-carousels/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setCarousels(carousels.filter((c) => c.id !== id));
        setDeleteId(null);
      }
    } catch (error) {
      console.error('Error deleting hero carousel:', error);
    }
  };

  const toggleActive = async (id: string, currentActive: boolean) => {
    try {
      const res = await fetch(`/api/admin/hero-carousels/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !currentActive }),
      });
      if (res.ok) {
        setCarousels(carousels.map((c) =>
          c.id === id ? { ...c, isActive: !currentActive } : c
        ));
      }
    } catch (error) {
      console.error('Error toggling carousel active state:', error);
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
            Hero карусель
          </h1>
          <p style={{ color: '#6B7280', fontSize: '15px' }}>
            Управление слайдами на главной странице
          </p>
        </div>
        <Link
          href="/admin/hero-carousels/new"
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
          Добавить слайд
        </Link>
      </div>

      {/* Carousels Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {carousels.map((carousel) => (
          <div
            key={carousel.id}
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              opacity: carousel.isActive ? 1 : 0.6,
            }}
          >
            {/* Image Preview */}
            <div style={{ position: 'relative', height: '160px', backgroundColor: '#F3F4F6' }}>
              {carousel.image ? (
                <Image
                  src={carousel.image}
                  alt={carousel.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                  <ImageIcon style={{ width: '48px', height: '48px', color: '#D1D5DB' }} />
                </div>
              )}
              {/* Order Badge */}
              <div
                style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  backgroundColor: '#209DA7',
                  color: 'white',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: '600',
                }}
              >
                #{carousel.order + 1}
              </div>
              {/* Active Status */}
              <button
                onClick={() => toggleActive(carousel.id, carousel.isActive)}
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  backgroundColor: carousel.isActive ? '#10B981' : '#6B7280',
                  color: 'white',
                  padding: '6px',
                  borderRadius: '6px',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                title={carousel.isActive ? 'Активен' : 'Скрыт'}
              >
                {carousel.isActive ? (
                  <Eye style={{ width: '16px', height: '16px' }} />
                ) : (
                  <EyeOff style={{ width: '16px', height: '16px' }} />
                )}
              </button>
            </div>

            {/* Content */}
            <div style={{ padding: '16px' }}>
              <h3 style={{ fontWeight: '600', color: '#091D33', fontSize: '16px', marginBottom: '4px' }}>
                {carousel.title || 'Без заголовка'}
              </h3>
              <p style={{ color: '#6B7280', fontSize: '13px', marginBottom: '16px' }}>
                {carousel.subtitle || 'Без подзаголовка'}
              </p>

              {/* Actions */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <Link
                  href={`/admin/hero-carousels/${carousel.id}`}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '6px',
                    backgroundColor: '#E0F2F4',
                    color: '#209DA7',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    textDecoration: 'none',
                    fontSize: '13px',
                    fontWeight: '500',
                  }}
                >
                  <Pencil style={{ width: '14px', height: '14px' }} />
                  Редактировать
                </Link>
                <button
                  onClick={() => setDeleteId(carousel.id)}
                  style={{
                    padding: '8px',
                    borderRadius: '6px',
                    color: '#EF4444',
                    background: 'none',
                    border: '1px solid #FEE2E2',
                    cursor: 'pointer',
                    display: 'flex',
                  }}
                  title="Удалить"
                >
                  <Trash2 style={{ width: '16px', height: '16px' }} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {carousels.length === 0 && (
          <div
            style={{
              gridColumn: '1 / -1',
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '48px',
              textAlign: 'center',
              color: '#9CA3AF',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}
          >
            <ImageIcon style={{ width: '48px', height: '48px', margin: '0 auto 16px', opacity: 0.3 }} />
            <p style={{ margin: 0 }}>Слайдов пока нет</p>
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
              Удалить слайд?
            </h3>
            <p style={{ color: '#6B7280', marginBottom: '24px', fontSize: '14px' }}>
              Это действие нельзя отменить. Слайд будет удален навсегда.
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
