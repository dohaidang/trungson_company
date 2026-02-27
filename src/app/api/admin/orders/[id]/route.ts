import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { requireAdmin } from '@/lib/auth-helpers';

// PATCH /api/admin/orders/[id] - Update order status (admin)
export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { error } = await requireAdmin();
        if (error) return error;

        const { id } = await params;
        const body = await request.json();

        const order = await prisma.order.findUnique({ where: { id } });
        if (!order) {
            return NextResponse.json({ error: 'Đơn hàng không tồn tại' }, { status: 404 });
        }

        const data: Record<string, unknown> = {};
        if (body.status) data.status = body.status;

        const updated = await prisma.order.update({
            where: { id },
            data,
            include: {
                user: { select: { name: true, email: true } },
                items: {
                    include: { product: { select: { name: true } } },
                },
            },
        });

        return NextResponse.json({ message: 'Cập nhật thành công', order: updated });
    } catch (error) {
        console.error('Admin order update error:', error);
        return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
    }
}
