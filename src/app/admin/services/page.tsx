'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Pencil, Trash2, Sparkles, GripVertical } from 'lucide-react';

interface HomepageService {
  id: string;
  title: string;
  titleKz: string;
  titleEn: string;
  description: string;
  descriptionKz: string;
  descriptionEn: string;
  icon: string;
  order: number;
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<HomepageService[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch('/api/admin/services');
      if (res.ok) {
        const data = await res.json();
        setServices(data);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/services/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setServices(services.filter((s) => s.id !== id));
        setDeleteId(null);
      }
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  const iconOptions: Record<string, string> = {
    flask: 'Колба',
    clock: 'Часы',
    calendar: 'Календарь',
    home: 'Дом',
    microscope: 'Микроскоп',
    users: 'Люди',
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
            Услуги на главной
          </h1>
          <p style={{ color: '#6B7280', fontSize: '15px' }}>
            Управление блоком услуг на главной странице (отображается 4 первых)
          </p>
        </div>
        <Link
          href="/admin/services/new"
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

      {/* Services List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {services.map((service, index) => (
          <div
            key={service.id}
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              border: index < 4 ? '2px solid #209DA7' : '2px solid transparent',
            }}
          >
            <div style={{ color: '#9CA3AF', cursor: 'grab' }}>
              <GripVertical style={{ width: '20px', height: '20px' }} />
            </div>

            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: '#E0F2F4',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Sparkles style={{ width: '24px', height: '24px', color: '#209DA7' }} />
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <h3 style={{ fontWeight: '600', color: '#091D33', fontSize: '16px', margin: 0 }}>
                  {service.title}
                </h3>
                {index < 4 && (
                  <span
                    style={{
                      padding: '2px 8px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: '500',
                      backgroundColor: '#E0F2F4',
                      color: '#209DA7',
                    }}
                  >
                    Показывается
                  </span>
                )}
              </div>
              <p style={{ color: '#6B7280', fontSize: '14px', margin: 0 }}>
                {service.description.length > 100
                  ? service.description.substring(0, 100) + '...'
                  : service.description}
              </p>
              <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                <span style={{ color: '#9CA3AF', fontSize: '12px' }}>
                  Иконка: {iconOptions[service.icon] || service.icon}
                </span>
                <span style={{ color: '#9CA3AF', fontSize: '12px' }}>
                  Порядок: {service.order}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <Link
                href={`/admin/services/${service.id}`}
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
                onClick={() => setDeleteId(service.id)}
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

        {services.length === 0 && (
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
            <Sparkles style={{ width: '48px', height: '48px', margin: '0 auto 16px', opacity: 0.3 }} />
            <p style={{ margin: 0 }}>Услуг пока нет</p>
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
              Удалить услугу?
            </h3>
            <p style={{ color: '#6B7280', marginBottom: '24px', fontSize: '14px' }}>
              Это действие нельзя отменить. Услуга будет удалена навсегда.
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
