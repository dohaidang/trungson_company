import { NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/db';
import { requireAuth } from '@/lib/auth-helpers';

// GET /api/orders - List orders for current user
export async function GET(request: Request) {
    try {
        const { user, error } = await requireAuth();
        if (error) return error;

        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');

        const where: Record<string, unknown> = { userId: user!.id };
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

        return NextResponse.json(orders);
    } catch (error) {
        console.error('Orders list error:', error);
        return NextResponse.json(
            { error: 'Không thể tải danh sách đơn hàng' },
            { status: 500 }
        );
    }
}

// POST /api/orders - Create new order
const createOrderSchema = z.object({
    items: z.array(z.object({
        productId: z.string(),
        quantity: z.number().int().positive(),
    })).min(1, 'Cần ít nhất 1 sản phẩm'),
    customerName: z.string().min(2, 'Họ tên quá ngắn'),
    customerPhone: z.string().min(10, 'Số điện thoại không hợp lệ'),
    notes: z.string().optional(),
    deliveryAddress: z.string().min(5, 'Địa chỉ giao hàng quá ngắn'),
    deliveryMethod: z.enum(['CRANE', 'MANUAL']).default('CRANE'),
    roadWidthLimit: z.number().optional(),
});

export async function POST(request: Request) {
    try {
        const { user, error } = await requireAuth();
        if (error) return error;

        const body = await request.json();
        const result = createOrderSchema.safeParse(body);

        if (!result.success) {
            const firstIssue = result.error.issues?.[0]?.message || 'Dữ liệu không hợp lệ';
            return NextResponse.json({ error: firstIssue }, { status: 400 });
        }

        const { items, customerName, customerPhone, notes, deliveryAddress, deliveryMethod, roadWidthLimit } = result.data;

        // Fetch products and calculate prices
        const productIds = items.map(i => i.productId);
        const products = await prisma.product.findMany({
            where: { id: { in: productIds } },
            include: { priceTiers: { orderBy: { minQuantity: 'asc' } } },
        });

        if (products.length !== productIds.length) {
            return NextResponse.json(
                { error: 'Một số sản phẩm không tồn tại' },
                { status: 400 }
            );
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
                userId: user!.id,
                customerName,
                customerPhone,
                notes,
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

        return NextResponse.json(
            { message: 'Đặt hàng thành công', order },
            { status: 201 }
        );
    } catch (error) {
        console.error('Create order error:', error);
        return NextResponse.json(
            { error: 'Không thể tạo đơn hàng' },
            { status: 500 }
        );
    }
}
