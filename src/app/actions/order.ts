'use server';

import prisma from '@/lib/db';
import { auth } from '@/auth';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

// Schema for creating an order
const createOrderSchema = z.object({
    items: z.array(z.object({
        productId: z.string(),
        quantity: z.number().int().positive(),
    })).min(1, 'Cần ít nhất 1 sản phẩm'),
    deliveryAddress: z.string().min(5, 'Địa chỉ giao hàng quá ngắn'),
    deliveryMethod: z.enum(['CRANE', 'MANUAL']).default('CRANE'),
    roadWidthLimit: z.number().optional(),
});

// Create a new order
export async function createOrder(data: z.infer<typeof createOrderSchema>) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return { order: null, error: 'Bạn cần đăng nhập để đặt hàng' };
        }

        const result = createOrderSchema.safeParse(data);
        if (!result.success) {
            const firstIssue = result.error.issues?.[0]?.message || 'Dữ liệu không hợp lệ';
            return { order: null, error: firstIssue };
        }

        const { items, deliveryAddress, deliveryMethod, roadWidthLimit } = result.data;

        // Fetch products and calculate prices
        const productIds = items.map(i => i.productId);
        const products = await prisma.product.findMany({
            where: { id: { in: productIds } },
            include: { priceTiers: { orderBy: { minQuantity: 'asc' } } },
        });

        if (products.length !== productIds.length) {
            return { order: null, error: 'Một số sản phẩm không tồn tại' };
        }

        // Calculate unit price based on quantity tier
        let totalAmount = 0;
        const orderItems = items.map(item => {
            const product = products.find(p => p.id === item.productId)!;
            const tier = [...product.priceTiers]
                .reverse()
                .find(t => item.quantity >= t.minQuantity);
            const unitPrice = tier?.unitPrice ?? product.priceTiers[0]?.unitPrice ?? 0;
            totalAmount += unitPrice * item.quantity;

            return {
                productId: item.productId,
                quantity: item.quantity,
                unitPrice,
            };
        });

        const order = await prisma.order.create({
            data: {
                userId: session.user.id,
                deliveryAddress,
                deliveryMethod: deliveryMethod as 'CRANE' | 'MANUAL',
                roadWidthLimit,
                totalAmount,
                items: { create: orderItems },
            },
            include: {
                items: {
                    include: {
                        product: { select: { name: true, slug: true } },
                    },
                },
            },
        });

        revalidatePath('/dashboard');
        return { order, error: null };
    } catch (error) {
        console.error('createOrder error:', error);
        return { order: null, error: 'Không thể tạo đơn hàng' };
    }
}

// Cancel an order (only PENDING orders)
export async function cancelOrder(orderId: string) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return { success: false, error: 'Bạn cần đăng nhập' };
        }

        const order = await prisma.order.findUnique({
            where: { id: orderId },
        });

        if (!order) {
            return { success: false, error: 'Đơn hàng không tồn tại' };
        }

        if (order.userId !== session.user.id) {
            return { success: false, error: 'Bạn không có quyền hủy đơn này' };
        }

        if (order.status !== 'PENDING') {
            return { success: false, error: 'Chỉ có thể hủy đơn hàng đang chờ xử lý' };
        }

        await prisma.order.update({
            where: { id: orderId },
            data: { status: 'CANCELLED' },
        });

        revalidatePath('/dashboard');
        return { success: true, error: null };
    } catch (error) {
        console.error('cancelOrder error:', error);
        return { success: false, error: 'Không thể hủy đơn hàng' };
    }
}

// Get orders for the current user
export async function getUserOrders(status?: string) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return { orders: [], error: 'Bạn cần đăng nhập' };
        }

        const where: Record<string, unknown> = { userId: session.user.id };
        if (status) where.status = status;

        const orders = await prisma.order.findMany({
            where,
            include: {
                items: {
                    include: {
                        product: {
                            select: { name: true, slug: true, type: true },
                        },
                    },
                },
                deliveries: {
                    orderBy: { scheduledDate: 'desc' },
                },
            },
            orderBy: { createdAt: 'desc' },
        });

        return { orders, error: null };
    } catch (error) {
        console.error('getUserOrders error:', error);
        return { orders: [], error: 'Không thể tải danh sách đơn hàng' };
    }
}
