import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const pathname = nextUrl.pathname;

            // Protect /admin routes — require ADMIN role
            if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/preview')) {
                if (!isLoggedIn) return false;
                const role = (auth?.user as { role?: string })?.role;
                if (role !== 'ADMIN') {
                    return Response.redirect(new URL('/dashboard', nextUrl));
                }
                return true;
            }

            // Protect /dashboard routes — require login
            if (pathname.startsWith('/dashboard') && !pathname.startsWith('/dashboard/preview')) {
                if (isLoggedIn) return true;
                return false;
            }

            // Redirect logged-in users away from auth pages
            if (isLoggedIn && (pathname === '/login' || pathname === '/register')) {
                return Response.redirect(new URL('/dashboard', nextUrl));
            }

            return true;
        },
    },
    providers: [],
} satisfies NextAuthConfig;
