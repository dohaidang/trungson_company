import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { requireAdmin } from '@/lib/auth-helpers';

// GET /api/admin/stats - Dashboard statistics
export async function GET() {
    try {
        const { error } = await requireAdmin();
        if (error) return error;

        // Run queries in parallel
        const [
            totalUsers,
            totalOrders,
            totalProducts,
            totalContacts,
            ordersByStatus,
            recentOrders,
            topProducts,
            revenueTotal,
        ] = await Promise.all([
            prisma.user.count(),
            prisma.order.count(),
            prisma.product.count(),
            prisma.contactInquiry.count({ where: { isRead: false } }),

            // Orders grouped by status
            prisma.order.groupBy({
                by: ['status'],
                _count: { id: true },
            }),

            // Recent 5 orders
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

            // Top selling products
            prisma.orderItem.groupBy({
                by: ['productId'],
                _sum: { quantity: true },
                orderBy: { _sum: { quantity: 'desc' } },
                take: 5,
            }),

            // Total revenue (completed orders)
            prisma.order.aggregate({
                where: { status: 'COMPLETED' },
                _sum: { totalAmount: true },
            }),
        ]);

        // Enrich top products with names
        const topProductIds = topProducts.map(p => p.productId);
        const productNames = await prisma.product.findMany({
            where: { id: { in: topProductIds } },
            select: { id: true, name: true, slug: true },
        });

        const enrichedTopProducts = topProducts.map(tp => ({
            ...tp,
            product: productNames.find(p => p.id === tp.productId),
        }));

        return NextResponse.json({
            totalUsers,
            totalOrders,
            totalProducts,
            unreadContacts: totalContacts,
            revenue: revenueTotal._sum.totalAmount || 0,
            ordersByStatus: ordersByStatus.map(s => ({
                status: s.status,
                count: s._count.id,
            })),
            recentOrders,
            topProducts: enrichedTopProducts,
        });
    } catch (error) {
        console.error('Admin stats error:', error);
        return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
    }
}
