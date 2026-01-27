'use client';

import { useState, useEffect } from 'react';
import { Trash2, Phone, Briefcase, MapPin, Calendar, User, Search } from 'lucide-react';

interface DoctorRegistration {
  id: string;
  fullName: string;
  phone: string;
  workplace: string;
  profession: string;
  createdAt: string;
}

export default function AdminDoctorRegistrationsPage() {
  const [registrations, setRegistrations] = useState<DoctorRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      const res = await fetch('/api/admin/doctor-registrations');
      if (res.ok) {
        const data = await res.json();
        setRegistrations(data);
      }
    } catch (error) {
      console.error('Error fetching doctor registrations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/doctor-registrations?id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setRegistrations(registrations.filter((r) => r.id !== id));
        setDeleteId(null);
      }
    } catch (error) {
      console.error('Error deleting registration:', error);
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

  const filtered = registrations.filter((r) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      r.fullName.toLowerCase().includes(q) ||
      r.phone.includes(q) ||
      r.workplace.toLowerCase().includes(q) ||
      r.profession.toLowerCase().includes(q)
    );
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

  return (
    <div>
      <style>{`
        @media (max-width: 768px) {
          .page-header {
            padding-top: 48px !important;
          }
          .reg-card-content {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          .reg-right {
            width: 100% !important;
            margin-left: 0 !important;
            margin-top: 12px !important;
            padding-top: 12px !important;
            border-top: 1px solid #F3F4F6 !important;
            flex-direction: row !important;
            justify-content: space-between !important;
          }
          .reg-info {
            flex-direction: column !important;
            gap: 8px !important;
          }
        }
      `}</style>

      {/* Header */}
      <div className="page-header" style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#091D33', marginBottom: '8px' }}>
          Анкеты врачей
        </h1>
        <p style={{ color: '#6B7280', fontSize: '15px' }}>
          Заполненные анкеты со страницы «Врачам» ({registrations.length})
        </p>
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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск по ФИО, телефону, месту работы..."
            style={{
              width: '100%',
              padding: '12px 16px 12px 42px',
              borderRadius: '8px',
              border: '1.5px solid #E5E7EB',
              fontSize: '14px',
              outline: 'none',
            }}
          />
        </div>
      </div>

      {/* List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filtered.map((reg) => (
          <div
            key={reg.id}
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}
          >
            <div className="reg-card-content" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
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
                    backgroundColor: '#E0F2F4',
                  }}
                >
                  <User style={{ width: '24px', height: '24px', color: '#209DA7' }} />
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px', flexWrap: 'wrap' }}>
                    <h3 style={{ fontWeight: '600', color: '#091D33', fontSize: '16px', margin: 0 }}>
                      {reg.fullName}
                    </h3>
                    <span
                      style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '500',
                        backgroundColor: '#E0F2F4',
                        color: '#209DA7',
                      }}
                    >
                      {reg.profession}
                    </span>
                  </div>

                  <div className="reg-info" style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '14px', color: '#6B7280' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Phone style={{ width: '16px', height: '16px' }} />
                      <a href={`tel:${reg.phone}`} style={{ color: '#6B7280', textDecoration: 'none' }}>
                        {reg.phone}
                      </a>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <MapPin style={{ width: '16px', height: '16px' }} />
                      <span>{reg.workplace}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="reg-right" style={{ display: 'flex', alignItems: 'center', gap: '16px', marginLeft: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#9CA3AF', whiteSpace: 'nowrap' }}>
                  <Calendar style={{ width: '14px', height: '14px' }} />
                  {formatDate(reg.createdAt)}
                </div>
                <button
                  onClick={() => setDeleteId(reg.id)}
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

        {filtered.length === 0 && (
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
            <Briefcase style={{ width: '48px', height: '48px', margin: '0 auto 16px', opacity: 0.3 }} />
            <p style={{ margin: 0 }}>
              {search ? 'Ничего не найдено' : 'Анкет пока нет'}
            </p>
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
              Удалить анкету?
            </h3>
            <p style={{ color: '#6B7280', marginBottom: '24px', fontSize: '14px' }}>
              Это действие нельзя отменить. Анкета будет удалена навсегда.
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
