'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Newspaper, FlaskConical, MessageSquare, Phone, Mail, Clock } from 'lucide-react';

interface Submission {
  id: string;
  type: 'contact' | 'booking';
  firstName: string;
  lastName?: string;
  email?: string;
  phone: string;
  message?: string;
  analysisName?: string;
  createdAt: string;
}

interface Stats {
  newsCount: number;
  analysesCount: number;
  submissionsCount: number;
  recentSubmissions: Submission[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/admin/stats');
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
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

  const statCards = [
    {
      label: 'Новости',
      value: stats?.newsCount || 0,
      icon: Newspaper,
      href: '/admin/news',
      color: '#209DA7',
      bgColor: '#E0F2F4',
    },
    {
      label: 'Анализы',
      value: stats?.analysesCount || 0,
      icon: FlaskConical,
      href: '/admin/analyses',
      color: '#EC910C',
      bgColor: '#FEF3E2',
    },
    {
      label: 'Заявки',
      value: stats?.submissionsCount || 0,
      icon: MessageSquare,
      href: '/admin/submissions',
      color: '#10B981',
      bgColor: '#D1FAE5',
    },
  ];

  return (
    <div>
      <style>{`
        @media (max-width: 768px) {
          .dashboard-header {
            padding-top: 48px !important;
          }
          .stat-cards {
            grid-template-columns: 1fr !important;
          }
          .submission-item {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 12px !important;
          }
          .submission-right {
            width: 100% !important;
            text-align: left !important;
            display: flex !important;
            flex-direction: row-reverse !important;
            justify-content: space-between !important;
            align-items: center !important;
          }
        }
      `}</style>

      {/* Header */}
      <div className="dashboard-header" style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#091D33', marginBottom: '8px' }}>
          Дашборд
        </h1>
        <p style={{ color: '#6B7280', fontSize: '15px' }}>
          Добро пожаловать в панель управления GammaLab
        </p>
      </div>

      {/* Stat Cards */}
      <div
        className="stat-cards"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
          marginBottom: '32px',
        }}
      >
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '24px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                display: 'block',
                textDecoration: 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ color: '#6B7280', fontSize: '14px', marginBottom: '8px' }}>{stat.label}</p>
                  <p style={{ fontSize: '36px', fontWeight: '700', color: '#091D33' }}>{stat.value}</p>
                </div>
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    backgroundColor: stat.bgColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon style={{ width: '24px', height: '24px', color: stat.color }} />
                </div>
              </div>
              <div
                style={{
                  marginTop: '16px',
                  paddingTop: '16px',
                  borderTop: '1px solid #F3F4F6',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: stat.color,
                  fontSize: '14px',
                }}
              >
                <span>Перейти к разделу →</span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Submissions */}
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid #F3F4F6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#091D33', margin: 0 }}>
            Последние заявки
          </h2>
          <Link
            href="/admin/submissions"
            style={{ color: '#209DA7', fontSize: '14px', textDecoration: 'none' }}
          >
            Все заявки →
          </Link>
        </div>

        {stats?.recentSubmissions && stats.recentSubmissions.length > 0 ? (
          <div>
            {stats.recentSubmissions.map((submission, index) => (
              <div
                key={submission.id}
                className="submission-item"
                style={{
                  padding: '16px 24px',
                  borderBottom: index < stats.recentSubmissions.length - 1 ? '1px solid #F3F4F6' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      backgroundColor: submission.type === 'booking' ? '#FEF3E2' : '#E0F2F4',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '18px',
                      fontWeight: '600',
                      color: submission.type === 'booking' ? '#EC910C' : '#209DA7',
                      flexShrink: 0,
                    }}
                  >
                    {submission.firstName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p style={{ fontWeight: '500', color: '#091D33', marginBottom: '4px' }}>
                      {submission.firstName} {submission.lastName}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '13px', color: '#6B7280', flexWrap: 'wrap' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Phone style={{ width: '14px', height: '14px' }} />
                        {submission.phone}
                      </span>
                      {submission.email && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Mail style={{ width: '14px', height: '14px' }} />
                          {submission.email}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="submission-right" style={{ textAlign: 'right' }}>
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '500',
                      backgroundColor: submission.type === 'booking' ? '#FEF3E2' : '#E0F2F4',
                      color: submission.type === 'booking' ? '#EC910C' : '#209DA7',
                      marginBottom: '6px',
                    }}
                  >
                    {submission.type === 'booking' ? 'Запись' : 'Обратная связь'}
                  </span>
                  <p style={{ fontSize: '12px', color: '#9CA3AF', display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end', margin: 0 }}>
                    <Clock style={{ width: '12px', height: '12px' }} />
                    {formatDate(submission.createdAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ padding: '48px', textAlign: 'center', color: '#9CA3AF' }}>
            <MessageSquare style={{ width: '48px', height: '48px', margin: '0 auto 16px', opacity: 0.3 }} />
            <p style={{ margin: 0 }}>Заявок пока нет</p>
          </div>
        )}
      </div>
    </div>
  );
}
