'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Newspaper, Tag, Star, FlaskConical, LogOut, Menu, X, Folder, FileText, Award, UserCheck, Image, Dna } from 'lucide-react';

const navItems = [
  { href: '/admin', label: 'Дашборд', icon: LayoutDashboard },
  { href: '/admin/hero-carousels', label: 'Hero карусель', icon: Image },
  { href: '/admin/news', label: 'Новости', icon: Newspaper },
  { href: '/admin/promotions', label: 'Акции', icon: Tag },
  { href: '/admin/reviews', label: 'Отзывы', icon: Star },
  { href: '/admin/analysis-categories', label: 'Категории анализов', icon: Folder },
  { href: '/admin/analyses', label: 'Анализы', icon: FlaskConical },
  { href: '/admin/ngs-content', label: 'NGS (Врачам)', icon: Dna },
  { href: '/admin/doctor-registrations', label: 'Анкеты врачей', icon: UserCheck },
  { href: '/admin/documents', label: 'Лицензии и сертиф.', icon: Award },
  { href: '/admin/privacy', label: 'Политика конфиденц.', icon: FileText },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="mobile-menu-btn"
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          top: '16px',
          left: '16px',
          zIndex: 98,
          width: '44px',
          height: '44px',
          borderRadius: '10px',
          backgroundColor: '#091D33',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        }}
      >
        <Menu style={{ width: '24px', height: '24px' }} />
      </button>

      {/* Overlay */}
      <div
        className={`sidebar-overlay ${isOpen ? 'open' : ''}`}
        onClick={closeSidebar}
      />

      {/* Sidebar */}
      <aside
        className={`admin-sidebar ${isOpen ? 'open' : ''}`}
        style={{
          width: '260px',
          minHeight: '100vh',
          backgroundColor: '#091D33',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
        }}
      >
        {/* Header with Close Button for Mobile */}
        <div style={{ padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link
            href="/admin"
            onClick={closeSidebar}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}
          >
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                backgroundColor: '#209DA7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }}>G</span>
            </div>
            <div>
              <span style={{ color: 'white', fontWeight: 'bold', fontSize: '18px', display: 'block' }}>
                GammaLab
              </span>
              <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Админ-панель</span>
            </div>
          </Link>
          <button
            className="mobile-menu-btn"
            onClick={closeSidebar}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              backgroundColor: 'transparent',
              color: '#9CA3AF',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X style={{ width: '20px', height: '20px' }} />
          </button>
        </div>

        {/* Navigation */}
        <nav style={{ marginTop: '16px', flex: 1 }}>
          {navItems.map((item) => {
            const isActive = pathname === item.href ||
              (item.href !== '/admin' && pathname.startsWith(item.href));
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeSidebar}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px 24px',
                  color: isActive ? 'white' : '#9CA3AF',
                  backgroundColor: isActive ? 'rgba(32, 157, 167, 0.15)' : 'transparent',
                  borderRight: isActive ? '3px solid #209DA7' : '3px solid transparent',
                  transition: 'all 0.2s',
                  textDecoration: 'none',
                }}
              >
                <Icon style={{ width: '20px', height: '20px' }} />
                <span style={{ fontSize: '15px' }}>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div style={{ padding: '16px' }}>
          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '14px 20px',
              color: '#9CA3AF',
              backgroundColor: 'transparent',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              width: '100%',
              fontSize: '15px',
            }}
          >
            <LogOut style={{ width: '20px', height: '20px' }} />
            <span>Выйти</span>
          </button>
        </div>
      </aside>
    </>
  );
}
