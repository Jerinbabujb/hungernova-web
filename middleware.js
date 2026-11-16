import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET_KEY || 'your-super-secret-development-key');

// Define which paths require the user to be logged in
const protectedRoutes = ['/home', '/request', '/donate', '/volunteer', '/campaigns', '/profile'];

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // 1. Get the token from the cookies
  const token = request.cookies.get('auth_token')?.value;
  let isAuthenticated = false;

  // 2. Verify the token if it exists
  if (token) {
    try {
      await jwtVerify(token, JWT_SECRET);
      isAuthenticated = true;
    } catch (error) {
      isAuthenticated = false;
    }
  }

  // 3. Redirect logic

  // If trying to access a protected route without being logged in -> Redirect to login (/)
  if (protectedRoutes.some(route => pathname.startsWith(route)) && !isAuthenticated) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If already logged in and visiting the root login page (/) -> Redirect to /home
  if (pathname === '/' && isAuthenticated) {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};