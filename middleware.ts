import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const session = request.cookies.get('session')?.value;

  const isAuthPage = request.nextUrl.pathname === '/auth';
  const isDashboard = request.nextUrl.pathname.startsWith('/dashboard');

  if (!session && isDashboard) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  if (session && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth'],
};
