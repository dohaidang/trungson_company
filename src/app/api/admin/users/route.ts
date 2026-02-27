import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { requireAdmin } from '@/lib/auth-helpers';

// GET /api/admin/users - List all users with spending stats
export async function GET() {
    try {
        const { error } = await requireAdmin();
        if (error) return error;

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

        // Transform to include total spending
        const result = users.map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            createdAt: user.createdAt,
            totalOrders: user._count.orders,
            totalSpending: user.orders.reduce((sum, o) => sum + o.totalAmount, 0),
        }));

        return NextResponse.json(result);
    } catch (error) {
        console.error('Admin users error:', error);
        return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
    }
}
