'use client';

import { useState, useEffect } from 'react';
import { Trash2, Phone, Mail, Calendar, MessageSquare, FlaskConical, User } from 'lucide-react';

interface Submission {
  id: string;
  type: 'contact' | 'booking';
  firstName: string;
  lastName?: string;
  email?: string;
  phone: string;
  message?: string;
  rating?: number;
  analysisId?: string;
  analysisName?: string;
  preferredDate?: string;
  createdAt: string;
}

export default function AdminSubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'contact' | 'booking'>('all');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const res = await fetch('/api/admin/submissions');
      if (res.ok) {
        const data = await res.json();
        setSubmissions(data);
      }
    } catch (error) {
      console.error('Error fetching submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch('/api/admin/submissions', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setSubmissions(submissions.filter((s) => s.id !== id));
        setDeleteId(null);
      }
    } catch (error) {
      console.error('Error deleting submission:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const filteredSubmissions = submissions.filter((item) => {
    if (filter === 'all') return true;
    return item.type === filter;
  });

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

  const filterButtons = [
    { key: 'all', label: 'Все' },
    { key: 'contact', label: 'Обратная связь' },
    { key: 'booking', label: 'Записи' },
  ] as const;

  return (
    <div>
      <style>{`
        @media (max-width: 768px) {
          .page-header {
            padding-top: 48px !important;
          }
          .filter-buttons {
            flex-wrap: wrap !important;
          }
          .submission-card-content {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          .submission-right {
            width: 100% !important;
            margin-left: 0 !important;
            margin-top: 12px !important;
            padding-top: 12px !important;
            border-top: 1px solid #F3F4F6 !important;
            flex-direction: row !important;
            justify-content: space-between !important;
          }
          .contact-info {
            flex-direction: column !important;
            gap: 8px !important;
          }
        }
      `}</style>

      {/* Header */}
      <div className="page-header" style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#091D33', marginBottom: '8px' }}>
          Заявки
        </h1>
        <p style={{ color: '#6B7280', fontSize: '15px' }}>
          Просмотр заявок с форм обратной связи и записи на анализы
        </p>
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
        <div className="filter-buttons" style={{ display: 'flex', gap: '8px' }}>
          {filterButtons.map((item) => (
            <button
              key={item.key}
              onClick={() => setFilter(item.key)}
              style={{
                padding: '10px 16px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: filter === item.key ? '#209DA7' : '#F3F4F6',
                color: filter === item.key ? 'white' : '#6B7280',
                whiteSpace: 'nowrap',
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Submissions List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filteredSubmissions.map((submission) => (
          <div
            key={submission.id}
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}
          >
            <div className="submission-card-content" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', flex: 1 }}>
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    backgroundColor: submission.type === 'booking' ? '#FEF3E2' : '#E0F2F4',
                  }}
                >
                  {submission.type === 'booking' ? (
                    <FlaskConical style={{ width: '24px', height: '24px', color: '#EC910C' }} />
                  ) : (
                    <MessageSquare style={{ width: '24px', height: '24px', color: '#209DA7' }} />
                  )}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px', flexWrap: 'wrap' }}>
                    <h3 style={{ fontWeight: '600', color: '#091D33', fontSize: '16px', margin: 0 }}>
                      {submission.firstName} {submission.lastName}
                    </h3>
                    <span
                      style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '500',
                        backgroundColor: submission.type === 'booking' ? '#FEF3E2' : '#E0F2F4',
                        color: submission.type === 'booking' ? '#EC910C' : '#209DA7',
                      }}
                    >
                      {submission.type === 'booking' ? 'Запись на анализ' : 'Обратная связь'}
                    </span>
                  </div>

                  <div className="contact-info" style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '14px', color: '#6B7280', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Phone style={{ width: '16px', height: '16px' }} />
                      <a href={`tel:${submission.phone}`} style={{ color: '#6B7280', textDecoration: 'none' }}>
                        {submission.phone}
                      </a>
                    </div>
                    {submission.email && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Mail style={{ width: '16px', height: '16px' }} />
                        <a href={`mailto:${submission.email}`} style={{ color: '#6B7280', textDecoration: 'none' }}>
                          {submission.email}
                        </a>
                      </div>
                    )}
                    {submission.preferredDate && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Calendar style={{ width: '16px', height: '16px' }} />
                        <span>Желаемая дата: {submission.preferredDate}</span>
                      </div>
                    )}
                  </div>

                  {submission.analysisName && (
                    <div
                      style={{
                        marginBottom: '12px',
                        padding: '12px',
                        backgroundColor: '#F9FAFB',
                        borderRadius: '8px',
                      }}
                    >
                      <p style={{ fontSize: '14px', color: '#6B7280', margin: 0 }}>
                        <span style={{ fontWeight: '500' }}>Анализ:</span> {submission.analysisName}
                      </p>
                    </div>
                  )}

                  {submission.message && (
                    <div
                      style={{
                        padding: '12px',
                        backgroundColor: '#F9FAFB',
                        borderRadius: '8px',
                      }}
                    >
                      <p style={{ fontSize: '14px', color: '#6B7280', margin: 0 }}>{submission.message}</p>
                    </div>
                  )}

                  {submission.rating && (
                    <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          style={{
                            fontSize: '18px',
                            color: star <= submission.rating! ? '#FBBF24' : '#D1D5DB',
                          }}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="submission-right" style={{ display: 'flex', alignItems: 'center', gap: '16px', marginLeft: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#9CA3AF' }}>
                  <Calendar style={{ width: '14px', height: '14px' }} />
                  {formatDate(submission.createdAt)}
                </div>
                <button
                  onClick={() => setDeleteId(submission.id)}
                  style={{
                    padding: '8px',
                    borderRadius: '6px',
                    color: '#9CA3AF',
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

        {filteredSubmissions.length === 0 && (
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
            <User style={{ width: '48px', height: '48px', margin: '0 auto 16px', opacity: 0.3 }} />
            <p style={{ margin: 0 }}>Заявок пока нет</p>
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
              Удалить заявку?
            </h3>
            <p style={{ color: '#6B7280', marginBottom: '24px', fontSize: '14px' }}>
              Это действие нельзя отменить. Заявка будет удалена навсегда.
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
