import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const pathname = nextUrl.pathname;

            // Protect /admin and /dashboard routes — require login only
            // Role-based access is handled at the page level (server components)
            // because middleware doesn't have access to custom session fields (role)
            if (pathname.startsWith('/admin') || pathname.startsWith('/dashboard')) {
                if (isLoggedIn) return true;
                return false; // Redirect to login
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
