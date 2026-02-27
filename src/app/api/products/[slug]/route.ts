import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

// GET /api/products/[slug] - Get single product by slug
export async function GET(
    _request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;

        const product = await prisma.product.findUnique({
            where: { slug },
            include: {
                priceTiers: {
                    orderBy: { minQuantity: 'asc' },
                },
            },
        });

        if (!product) {
            return NextResponse.json(
                { error: 'Không tìm thấy sản phẩm' },
                { status: 404 }
            );
        }

        return NextResponse.json(product);
    } catch (error) {
        console.error('Product detail error:', error);
        return NextResponse.json(
            { error: 'Không thể tải thông tin sản phẩm' },
            { status: 500 }
        );
    }
}
