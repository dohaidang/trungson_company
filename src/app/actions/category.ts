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
function generateCategorySlug(name: string): string {
    return name
        .toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove diacritics
        .replace(/đ/g, 'd').replace(/Đ/g, 'd')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
}

const categorySchema = z.object({
    name: z.string().min(2, 'Tên loại sản phẩm tối thiểu 2 ký tự'),
    description: z.string().optional(),
});

// Get all categories
export async function getCategories() {
    try {
        const categories = await prisma.category.findMany({
            orderBy: { name: 'asc' },
            include: {
                _count: { select: { products: true } }
            }
        });
        return { categories, error: null };
    } catch (error) {
        console.error('getCategories error:', error);
        return { categories: [], error: 'Lỗi server' };
    }
}

// Get single category
export async function getCategory(id: string) {
    try {
        const category = await prisma.category.findUnique({
            where: { id }
        });
        if (!category) return { category: null, error: 'Không tìm thấy loại sản phẩm' };
        return { category, error: null };
    } catch (error) {
        console.error('getCategory error:', error);
        return { category: null, error: 'Lỗi server' };
    }
}

// Create category
export async function createCategory(data: z.infer<typeof categorySchema>) {
    try {
        const { error } = await verifyAdmin();
        if (error) return { success: false, error };

        const parsed = categorySchema.safeParse(data);
        if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message || 'Dữ liệu không hợp lệ' };

        let slug = generateCategorySlug(parsed.data.name);
        const existing = await prisma.category.findUnique({ where: { slug } });
        if (existing) {
            slug = `${slug}-${Date.now().toString(36)}`;
        }

        const category = await prisma.category.create({
            data: {
                name: parsed.data.name,
                description: parsed.data.description || null,
                slug
            }
        });

        revalidatePath('/admin');
        revalidatePath('/products');
        return { success: true, category, error: null };
    } catch (error) {
        console.error('createCategory error:', error);
        return { success: false, error: 'Không thể tạo loại sản phẩm' };
    }
}

// Update category
export async function updateCategory(id: string, data: z.infer<typeof categorySchema>) {
    try {
        const { error } = await verifyAdmin();
        if (error) return { success: false, error };

        const parsed = categorySchema.safeParse(data);
        if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message || 'Dữ liệu không hợp lệ' };

        const existing = await prisma.category.findUnique({ where: { id } });
        if (!existing) return { success: false, error: 'Loại sản phẩm không tồn tại' };

        let slug = existing.slug;
        if (parsed.data.name !== existing.name) {
            slug = generateCategorySlug(parsed.data.name);
            const slugExists = await prisma.category.findFirst({ where: { slug, id: { not: id } } });
            if (slugExists) {
                slug = `${slug}-${Date.now().toString(36)}`;
            }
        }

        const category = await prisma.category.update({
            where: { id },
            data: {
                name: parsed.data.name,
                description: parsed.data.description || null,
                slug
            }
        });

        revalidatePath('/admin');
        revalidatePath('/products');
        return { success: true, category, error: null };
    } catch (error) {
        console.error('updateCategory error:', error);
        return { success: false, error: 'Không thể cập nhật loại sản phẩm' };
    }
}

// Delete category
export async function deleteCategory(id: string) {
    try {
        const { error } = await verifyAdmin();
        if (error) return { success: false, error };

        const category = await prisma.category.findUnique({
            where: { id },
            include: { _count: { select: { products: true } } }
        });

        if (!category) return { success: false, error: 'Loại sản phẩm không tồn tại' };
        if (category._count.products > 0) return { success: false, error: `Không thể xóa: Loại này đang có ${category._count.products} sản phẩm` };

        await prisma.category.delete({ where: { id } });

        revalidatePath('/admin/categories');
        revalidatePath('/products');
        return { success: true, error: null };
    } catch (error) {
        console.error('deleteCategory error:', error);
        return { success: false, error: 'Không thể xóa loại sản phẩm' };
    }
}
