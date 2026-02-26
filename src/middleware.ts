import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

// Middleware only uses authConfig (no Prisma, Edge Runtime compatible)
// Full auth with Prisma providers is in auth.ts (Node.js runtime only)
export default NextAuth(authConfig).auth;

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/admin/:path*',
    ],
};
