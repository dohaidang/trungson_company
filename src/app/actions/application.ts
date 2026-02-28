'use server';

import prisma from '@/lib/db';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

// Helper to verify admin role
async function verifyAdmin() {
    const session = await auth();
    if (!session?.user?.id) {
        return { userId: null, error: 'Bạn cần đăng nhập' };
    }
    if (session.user.role !== 'ADMIN') {
        return { userId: null, error: 'Bạn không có quyền truy cập' };
    }
    return { userId: session.user.id, error: null };
}

// Helper: generate slug from name
function generateApplicationSlug(name: string): string {
    return name
        .toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove diacritics
        .replace(/đ/g, 'd').replace(/Đ/g, 'd')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
}

const applicationSchema = z.object({
    name: z.string().min(2, 'Tên ứng dụng tối thiểu 2 ký tự'),
    description: z.string().optional(),
});

// Get all applications
export async function getApplications() {
    try {
        const applications = await prisma.application.findMany({
            orderBy: { name: 'asc' },
            include: {
                _count: { select: { products: true } }
            }
        });
        return { applications, error: null };
    } catch (error) {
        console.error('getApplications error:', error);
        return { applications: [], error: 'Lỗi server' };
    }
}

// Get single application
export async function getApplication(id: string) {
    try {
        const application = await prisma.application.findUnique({
            where: { id }
        });
        if (!application) return { application: null, error: 'Không tìm thấy ứng dụng' };
        return { application, error: null };
    } catch (error) {
        console.error('getApplication error:', error);
        return { application: null, error: 'Lỗi server' };
    }
}

// Create application
export async function createApplication(data: z.infer<typeof applicationSchema>) {
    try {
        const { error } = await verifyAdmin();
        if (error) return { success: false, error };

        const parsed = applicationSchema.safeParse(data);
        if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message || 'Dữ liệu không hợp lệ' };

        let slug = generateApplicationSlug(parsed.data.name);
        const existing = await prisma.application.findUnique({ where: { slug } });
        if (existing) {
            slug = `${slug}-${Date.now().toString(36)}`;
        }

        const application = await prisma.application.create({
            data: {
                name: parsed.data.name,
                description: parsed.data.description || null,
                slug
            }
        });

        revalidatePath('/admin');
        revalidatePath('/products');
        return { success: true, application, error: null };
    } catch (error) {
        console.error('createApplication error:', error);
        return { success: false, error: 'Không thể tạo ứng dụng' };
    }
}

// Update application
export async function updateApplication(id: string, data: z.infer<typeof applicationSchema>) {
    try {
        const { error } = await verifyAdmin();
        if (error) return { success: false, error };

        const parsed = applicationSchema.safeParse(data);
        if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message || 'Dữ liệu không hợp lệ' };

        const existing = await prisma.application.findUnique({ where: { id } });
        if (!existing) return { success: false, error: 'Ứng dụng không tồn tại' };

        let slug = existing.slug;
        if (parsed.data.name !== existing.name) {
            slug = generateApplicationSlug(parsed.data.name);
            const slugExists = await prisma.application.findFirst({ where: { slug, id: { not: id } } });
            if (slugExists) {
                slug = `${slug}-${Date.now().toString(36)}`;
            }
        }

        const application = await prisma.application.update({
            where: { id },
            data: {
                name: parsed.data.name,
                description: parsed.data.description || null,
                slug
            }
        });

        revalidatePath('/admin');
        revalidatePath('/products');
        return { success: true, application, error: null };
    } catch (error) {
        console.error('updateApplication error:', error);
        return { success: false, error: 'Không thể cập nhật ứng dụng' };
    }
}

// Delete application
export async function deleteApplication(id: string) {
    try {
        const { error } = await verifyAdmin();
        if (error) return { success: false, error };

        const application = await prisma.application.findUnique({
            where: { id },
            include: { _count: { select: { products: true } } }
        });

        if (!application) return { success: false, error: 'Ứng dụng không tồn tại' };
        if (application._count.products > 0) return { success: false, error: `Không thể xóa: Ứng dụng này đang được dùng cho ${application._count.products} sản phẩm` };

        await prisma.application.delete({ where: { id } });

        revalidatePath('/admin/applications');
        revalidatePath('/products');
        return { success: true, error: null };
    } catch (error) {
        console.error('deleteApplication error:', error);
        return { success: false, error: 'Không thể xóa ứng dụng' };
    }
}
