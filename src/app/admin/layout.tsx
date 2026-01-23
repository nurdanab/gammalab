import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import AdminSidebar from '@/components/admin/Sidebar';
import '../globals.css';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Админ-панель | GammaLab',
  description: 'Панель управления контентом GammaLab',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`
          @media (max-width: 768px) {
            .admin-sidebar {
              position: fixed;
              left: -280px;
              z-index: 100;
              transition: left 0.3s ease;
            }
            .admin-sidebar.open {
              left: 0;
            }
            .admin-main {
              margin-left: 0 !important;
              padding: 16px !important;
            }
            .sidebar-overlay {
              display: none;
              position: fixed;
              inset: 0;
              background: rgba(0,0,0,0.5);
              z-index: 99;
            }
            .sidebar-overlay.open {
              display: block;
            }
          }
          @media (min-width: 769px) {
            .mobile-menu-btn {
              display: none !important;
            }
          }
        `}</style>
      </head>
      <body className={`${inter.variable} font-sans antialiased`} style={{ margin: 0 }}>
        <div style={{ display: 'flex', minHeight: '100vh' }}>
          <AdminSidebar />
          <main
            className="admin-main"
            style={{
              flex: 1,
              backgroundColor: '#F3F4F6',
              padding: '32px',
              overflowX: 'auto',
              marginLeft: 0,
            }}
          >
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
