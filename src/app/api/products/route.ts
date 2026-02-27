import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

// GET /api/products - List all published products with price tiers
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const type = searchParams.get('type');
        const search = searchParams.get('search');

        // Build filter
        const where: Record<string, unknown> = {};
        if (type) where.type = type;
        if (search) {
            where.OR = [
                { name: { contains: search } },
                { description: { contains: search } },
            ];
        }

        const products = await prisma.product.findMany({
            where,
            include: {
                priceTiers: {
                    orderBy: { minQuantity: 'asc' },
                },
            },
            orderBy: { name: 'asc' },
        });

        return NextResponse.json(products);
    } catch (error) {
        console.error('Products API error:', error);
        return NextResponse.json(
            { error: 'Không thể tải danh sách sản phẩm' },
            { status: 500 }
        );
    }
}
