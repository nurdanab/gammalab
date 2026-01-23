'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Ошибка входа');
        return;
      }

      router.push('/admin');
      router.refresh();
    } catch {
      setError('Ошибка подключения к серверу');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F3F4F6',
      }}
    >
      <div style={{ maxWidth: '400px', width: '100%', padding: '0 16px' }}>
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
            padding: '32px',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: '#209DA7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
              }}
            >
              <Lock style={{ width: '32px', height: '32px', color: 'white' }} />
            </div>
            <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#091D33', margin: '0 0 8px' }}>
              Админ-панель
            </h1>
            <p style={{ color: '#6B7280', margin: 0 }}>GammaLab</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '24px' }}>
              <label
                htmlFor="password"
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '8px',
                }}
              >
                Пароль
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Введите пароль"
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            {error && (
              <div
                style={{
                  marginBottom: '16px',
                  padding: '12px',
                  backgroundColor: '#FEF2F2',
                  border: '1px solid #FECACA',
                  borderRadius: '8px',
                  color: '#DC2626',
                  fontSize: '14px',
                }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '12px 16px',
                backgroundColor: '#209DA7',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.6 : 1,
              }}
            >
              {loading ? 'Вход...' : 'Войти'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
