'use server';

import prisma from '@/lib/db';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';

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

// Get admin dashboard stats
export async function getAdminStats() {
    try {
        const { error } = await verifyAdmin();
        if (error) return { stats: null, error };

        const [
            totalUsers,
            totalOrders,
            totalProducts,
            totalContacts,
            ordersByStatus,
            recentOrders,
            revenueTotal,
        ] = await Promise.all([
            prisma.user.count(),
            prisma.order.count(),
            prisma.product.count(),
            prisma.contactInquiry.count({ where: { isRead: false } }),
            prisma.order.groupBy({
                by: ['status'],
                _count: { id: true },
            }),
            prisma.order.findMany({
                take: 5,
                orderBy: { createdAt: 'desc' },
                include: {
                    user: { select: { name: true, email: true } },
                    items: {
                        include: {
                            product: { select: { name: true } },
                        },
                    },
                },
            }),
            prisma.order.aggregate({
                where: { status: 'COMPLETED' },
                _sum: { totalAmount: true },
            }),
        ]);

        return {
            stats: {
                totalUsers,
                totalOrders,
                totalProducts,
                unreadContacts: totalContacts,
                revenue: revenueTotal._sum.totalAmount || 0,
                ordersByStatus: ordersByStatus.map(s => ({
                    status: s.status,
                    count: s._count.id,
                })),
                recentOrders: recentOrders.map(o => ({
                    id: o.id,
                    customer: o.user.name || o.user.email,
                    email: o.user.email,
                    items: o.items.map(i => `${i.product.name} ×${i.quantity}`).join(', '),
                    total: o.totalAmount,
                    status: o.status.toLowerCase(),
                    date: o.createdAt.toLocaleDateString('vi-VN'),
                })),
            },
            error: null,
        };
    } catch (error) {
        console.error('getAdminStats error:', error);
        return { stats: null, error: 'Lỗi server' };
    }
}

// Get all orders for admin
export async function getAdminOrders(filters?: {
    status?: string;
    search?: string;
    page?: number;
    limit?: number;
}) {
    try {
        const { error } = await verifyAdmin();
        if (error) return { orders: [], pagination: null, error };

        const page = filters?.page || 1;
        const limit = filters?.limit || 20;

        const where: Record<string, unknown> = {};
        if (filters?.status) where.status = filters.status;
        if (filters?.search) {
            where.OR = [
                { user: { name: { contains: filters.search } } },
                { user: { email: { contains: filters.search } } },
                { deliveryAddress: { contains: filters.search } },
            ];
        }

        const [orders, total] = await Promise.all([
            prisma.order.findMany({
                where,
                include: {
                    user: { select: { name: true, email: true, phone: true } },
                    items: {
                        include: {
                            product: { select: { name: true, slug: true } },
                        },
                    },
                },
                orderBy: { createdAt: 'desc' },
                skip: (page - 1) * limit,
                take: limit,
            }),
            prisma.order.count({ where }),
        ]);

        // Transform to serializable format
        const serializedOrders = orders.map(o => ({
            id: o.id,
            customer: o.user.name || 'N/A',
            email: o.user.email,
            items: o.items.map(i => `${i.product.name} ×${i.quantity}`).join(', '),
            total: o.totalAmount,
            status: o.status.toLowerCase(),
            date: o.createdAt.toLocaleDateString('vi-VN'),
        }));

        return {
            orders: serializedOrders,
            pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
            error: null,
        };
    } catch (error) {
        console.error('getAdminOrders error:', error);
        return { orders: [], pagination: null, error: 'Lỗi server' };
    }
}

// Update order status
export async function updateOrderStatus(orderId: string, status: string) {
    try {
        const { error } = await verifyAdmin();
        if (error) return { success: false, error };

        const order = await prisma.order.findUnique({ where: { id: orderId } });
        if (!order) {
            return { success: false, error: 'Đơn hàng không tồn tại' };
        }

        await prisma.order.update({
            where: { id: orderId },
            data: { status: status as 'PENDING' | 'CONFIRMED' | 'DELIVERING' | 'COMPLETED' | 'CANCELLED' },
        });

        revalidatePath('/admin');
        return { success: true, error: null };
    } catch (error) {
        console.error('updateOrderStatus error:', error);
        return { success: false, error: 'Không thể cập nhật trạng thái' };
    }
}

// Get all products for admin (including unpublished)
export async function getAdminProducts() {
    try {
        const { error } = await verifyAdmin();
        if (error) return { products: [], error };

        const products = await prisma.product.findMany({
            include: {
                priceTiers: { orderBy: { minQuantity: 'asc' } },
                _count: { select: { orderItems: true } },
            },
            orderBy: { name: 'asc' },
        });

        const serialized = products.map(p => ({
            id: p.id,
            name: p.name,
            slug: p.slug,
            type: p.type,
            price: p.priceTiers[0]?.unitPrice || 0,
            isPublished: p.isPublished,
            totalSold: p._count.orderItems,
        }));

        return { products: serialized, error: null };
    } catch (error) {
        console.error('getAdminProducts error:', error);
        return { products: [], error: 'Lỗi server' };
    }
}

// Toggle product published status
export async function toggleProductPublish(productId: string) {
    try {
        const { error } = await verifyAdmin();
        if (error) return { success: false, error };

        const product = await prisma.product.findUnique({ where: { id: productId } });
        if (!product) {
            return { success: false, error: 'Sản phẩm không tồn tại' };
        }

        await prisma.product.update({
            where: { id: productId },
            data: { isPublished: !product.isPublished },
        });

        revalidatePath('/admin');
        revalidatePath('/products');
        return { success: true, error: null };
    } catch (error) {
        console.error('toggleProductPublish error:', error);
        return { success: false, error: 'Không thể cập nhật sản phẩm' };
    }
}

// Get all users for admin
export async function getAdminUsers() {
    try {
        const { error } = await verifyAdmin();
        if (error) return { users: [], error };

        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                role: true,
                createdAt: true,
                _count: { select: { orders: true } },
                orders: {
                    where: { status: 'COMPLETED' },
                    select: { totalAmount: true },
                },
            },
            orderBy: { createdAt: 'desc' },
        });

        const serialized = users.map(user => ({
            id: user.id,
            name: user.name || 'N/A',
            email: user.email,
            phone: user.phone || '',
            role: user.role.toLowerCase(),
            joined: user.createdAt.toLocaleDateString('vi-VN'),
            orders: user._count.orders,
            spent: user.orders.reduce((sum, o) => sum + o.totalAmount, 0),
        }));

        return { users: serialized, error: null };
    } catch (error) {
        console.error('getAdminUsers error:', error);
        return { users: [], error: 'Lỗi server' };
    }
}
