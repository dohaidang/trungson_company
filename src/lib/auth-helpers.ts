import { auth } from '@/auth';
import { NextResponse } from 'next/server';

// Get the current authenticated user from session
export async function getCurrentUser() {
    const session = await auth();
    return session?.user ?? null;
}

// Require authentication — returns user or error response
export async function requireAuth() {
    const user = await getCurrentUser();
    if (!user) {
        return {
            user: null,
            error: NextResponse.json(
                { error: 'Bạn cần đăng nhập' },
                { status: 401 }
            ),
        };
    }
    return { user, error: null };
}

// Require ADMIN role — returns user or error response
export async function requireAdmin() {
    const { user, error } = await requireAuth();
    if (error) return { user: null, error };

    if (user?.role !== 'ADMIN') {
        return {
            user: null,
            error: NextResponse.json(
                { error: 'Bạn không có quyền truy cập' },
                { status: 403 }
            ),
        };
    }
    return { user, error: null };
}
