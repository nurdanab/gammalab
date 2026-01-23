'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Pencil, Trash2, Star, Home } from 'lucide-react';

interface Review {
  id: string;
  name: string;
  text: string;
  rating: number;
  date: string;
  photo?: string;
  showOnHomepage: boolean;
  order: number;
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await fetch('/api/admin/reviews');
      if (res.ok) {
        const data = await res.json();
        setReviews(data);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/reviews/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setReviews(reviews.filter((r) => r.id !== id));
        setDeleteId(null);
      }
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

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
            Отзывы
          </h1>
          <p style={{ color: '#6B7280', fontSize: '15px' }}>
            Управление отзывами на главной странице
          </p>
        </div>
        <Link
          href="/admin/reviews/new"
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

      {/* Reviews List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {reviews.map((review) => (
          <div
            key={review.id}
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px' }}>
              {review.photo ? (
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
                  <img src={review.photo} alt={review.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ) : (
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: '#E0F2F4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    color: '#209DA7',
                    fontWeight: '600',
                    fontSize: '18px',
                  }}
                >
                  {review.name.charAt(0).toUpperCase()}
                </div>
              )}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px', flexWrap: 'wrap' }}>
                  <h3 style={{ fontWeight: '600', color: '#091D33', fontSize: '16px', margin: 0 }}>
                    {review.name}
                  </h3>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        style={{
                          width: '14px',
                          height: '14px',
                          fill: star <= review.rating ? '#FBBF24' : 'none',
                          color: star <= review.rating ? '#FBBF24' : '#D1D5DB',
                        }}
                      />
                    ))}
                  </div>
                  {review.showOnHomepage && (
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: '500',
                        backgroundColor: '#E0F2F4',
                        color: '#209DA7',
                      }}
                    >
                      <Home style={{ width: '10px', height: '10px' }} />
                      На главной
                    </span>
                  )}
                </div>
                <p style={{ color: '#6B7280', fontSize: '14px', marginBottom: '8px', lineHeight: '1.6' }}>
                  {review.text.length > 200 ? review.text.substring(0, 200) + '...' : review.text}
                </p>
                <span style={{ color: '#9CA3AF', fontSize: '12px' }}>
                  {formatDate(review.date)}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Link
                  href={`/admin/reviews/${review.id}`}
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
                  onClick={() => setDeleteId(review.id)}
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
          </div>
        ))}

        {reviews.length === 0 && (
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
            <Star style={{ width: '48px', height: '48px', margin: '0 auto 16px', opacity: 0.3 }} />
            <p style={{ margin: 0 }}>Отзывов пока нет</p>
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
              Удалить отзыв?
            </h3>
            <p style={{ color: '#6B7280', marginBottom: '24px', fontSize: '14px' }}>
              Это действие нельзя отменить. Отзыв будет удален навсегда.
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
