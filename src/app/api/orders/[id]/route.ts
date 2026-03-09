import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { requireAuth } from '@/lib/auth-helpers';

// GET /api/orders/[id] - Get order detail (owner only)
export async function GET(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { user, error } = await requireAuth();
        if (error) return error;

        const { id } = await params;

        const order = await prisma.order.findUnique({
            where: { id },
            include: {
                items: {
                    include: {
                        product: {
                            select: { name: true, slug: true, dimensions: true },
                        },
                    },
                },
                deliveries: {
                    orderBy: { scheduledDate: 'asc' },
                },
            },
        });

        if (!order) {
            return NextResponse.json({ error: 'Đơn hàng không tồn tại' }, { status: 404 });
        }

        // Only owner or admin can view
        if (order.userId !== user!.id && user!.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Không có quyền xem đơn hàng này' }, { status: 403 });
        }

        return NextResponse.json(order);
    } catch (error) {
        console.error('Order detail error:', error);
        return NextResponse.json({ error: 'Không thể tải đơn hàng' }, { status: 500 });
    }
}

// PATCH /api/orders/[id] - Cancel order (only PENDING)
export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { user, error } = await requireAuth();
        if (error) return error;

        const { id } = await params;
        const body = await request.json();

        const order = await prisma.order.findUnique({ where: { id } });

        if (!order) {
            return NextResponse.json({ error: 'Đơn hàng không tồn tại' }, { status: 404 });
        }

        if (order.userId !== user!.id) {
            return NextResponse.json({ error: 'Không có quyền' }, { status: 403 });
        }

        // User can only cancel PENDING orders
        if (body.status === 'CANCELLED' && order.status !== 'PENDING') {
            return NextResponse.json(
                { error: 'Chỉ có thể hủy đơn hàng đang chờ xử lý' },
                { status: 400 }
            );
        }

        const updated = await prisma.order.update({
            where: { id },
            data: { status: body.status },
        });

        return NextResponse.json({ message: 'Cập nhật thành công', order: updated });
    } catch (error) {
        console.error('Order update error:', error);
        return NextResponse.json({ error: 'Không thể cập nhật đơn hàng' }, { status: 500 });
    }
}
