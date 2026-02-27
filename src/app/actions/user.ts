'use server';

import prisma from '@/lib/db';
import { auth } from '@/auth';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { revalidatePath } from 'next/cache';

// Get user profile
export async function getUserProfile() {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return { user: null, error: 'Bạn cần đăng nhập' };
        }

        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                role: true,
                createdAt: true,
            },
        });

        if (!user) {
            return { user: null, error: 'Không tìm thấy tài khoản' };
        }

        return { user, error: null };
    } catch (error) {
        console.error('getUserProfile error:', error);
        return { user: null, error: 'Không thể tải thông tin tài khoản' };
    }
}

// Update profile schema
const updateProfileSchema = z.object({
    name: z.string().min(2, 'Tên phải có ít nhất 2 ký tự'),
    phone: z.string().optional(),
});

// Update user profile
export async function updateProfile(data: { name: string; phone?: string }) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return { success: false, error: 'Bạn cần đăng nhập' };
        }

        const result = updateProfileSchema.safeParse(data);
        if (!result.success) {
            const firstIssue = result.error.issues?.[0]?.message || 'Dữ liệu không hợp lệ';
            return { success: false, error: firstIssue };
        }

        await prisma.user.update({
            where: { id: session.user.id },
            data: {
                name: result.data.name,
                phone: result.data.phone || null,
            },
        });

        revalidatePath('/dashboard');
        return { success: true, error: null };
    } catch (error) {
        console.error('updateProfile error:', error);
        return { success: false, error: 'Không thể cập nhật thông tin' };
    }
}

// Change password schema
const changePasswordSchema = z.object({
    currentPassword: z.string().min(1, 'Vui lòng nhập mật khẩu hiện tại'),
    newPassword: z.string().min(6, 'Mật khẩu mới phải có ít nhất 6 ký tự'),
});

// Change password
export async function changePassword(data: { currentPassword: string; newPassword: string }) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return { success: false, error: 'Bạn cần đăng nhập' };
        }

        const result = changePasswordSchema.safeParse(data);
        if (!result.success) {
            const firstIssue = result.error.issues?.[0]?.message || 'Dữ liệu không hợp lệ';
            return { success: false, error: firstIssue };
        }

        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            select: { password: true },
        });

        if (!user?.password) {
            return { success: false, error: 'Tài khoản không hỗ trợ đổi mật khẩu' };
        }

        const isValid = await bcrypt.compare(result.data.currentPassword, user.password);
        if (!isValid) {
            return { success: false, error: 'Mật khẩu hiện tại không đúng' };
        }

        const hashedPassword = await bcrypt.hash(result.data.newPassword, 10);
        await prisma.user.update({
            where: { id: session.user.id },
            data: { password: hashedPassword },
        });

        return { success: true, error: null };
    } catch (error) {
        console.error('changePassword error:', error);
        return { success: false, error: 'Không thể đổi mật khẩu' };
    }
}
