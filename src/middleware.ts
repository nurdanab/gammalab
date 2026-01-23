import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

const ADMIN_COOKIE_NAME = 'admin_session';

// Simple token check for middleware (full verification in API routes)
// Just checks if token exists and has valid base64 format with expected structure
function hasValidTokenFormat(token: string): boolean {
  try {
    // Decode base64
    const decoded = atob(token);

    // Check basic structure: should have format "admin:timestamp:expiry.signature"
    if (!decoded.includes('.') || !decoded.startsWith('admin:')) {
      return false;
    }

    // Extract and check expiry
    const lastDotIndex = decoded.lastIndexOf('.');
    const data = decoded.substring(0, lastDotIndex);
    const parts = data.split(':');

    if (parts.length !== 3) {
      return false;
    }

    const expiry = parseInt(parts[2], 10);
    if (isNaN(expiry) || Date.now() > expiry) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle admin routes separately
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;

    // Allow access to login page
    if (pathname === '/admin/login') {
      // If has valid token, redirect to dashboard
      if (token && hasValidTokenFormat(token)) {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
      return NextResponse.next();
    }

    // Check authentication for other admin routes
    if (!token || !hasValidTokenFormat(token)) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    return NextResponse.next();
  }

  // Apply internationalization middleware to all other routes
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Match all pathnames except for
    // - api routes
    // - _next (Next.js internals)
    // - static files (images, etc.)
    '/((?!api|_next|.*\\..*).*)'
  ],
};
