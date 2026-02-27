import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { requireAdmin } from '@/lib/auth-helpers';

// GET /api/admin/orders - List all orders (admin)
export async function GET(request: Request) {
    try {
        const { error } = await requireAdmin();
        if (error) return error;

        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');
        const search = searchParams.get('search');
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '20');

        const where: Record<string, unknown> = {};
        if (status) where.status = status;
        if (search) {
            where.OR = [
                { user: { name: { contains: search } } },
                { user: { email: { contains: search } } },
                { deliveryAddress: { contains: search } },
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
                    _count: { select: { deliveries: true } },
                },
                orderBy: { createdAt: 'desc' },
                skip: (page - 1) * limit,
                take: limit,
            }),
            prisma.order.count({ where }),
        ]);

        return NextResponse.json({
            orders,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error('Admin orders error:', error);
        return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
    }
}
