'use server';

import prisma from '@/lib/db';
import type { ProductType } from '@prisma/client';

// Fetch all published products with optional filters
export async function getProducts(filters?: {
    type?: ProductType;
    search?: string;
}) {
    try {
        const where: Record<string, unknown> = { isPublished: true };

        if (filters?.type) {
            where.type = filters.type;
        }

        if (filters?.search) {
            where.OR = [
                { name: { contains: filters.search } },
                { description: { contains: filters.search } },
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

        return { products, error: null };
    } catch (error) {
        console.error('getProducts error:', error);
        return { products: [], error: 'Không thể tải danh sách sản phẩm' };
    }
}

// Fetch a single product by slug
export async function getProductBySlug(slug: string) {
    try {
        const product = await prisma.product.findUnique({
            where: { slug },
            include: {
                priceTiers: {
                    orderBy: { minQuantity: 'asc' },
                },
            },
        });

        if (!product) {
            return { product: null, error: 'Không tìm thấy sản phẩm' };
        }

        return { product, error: null };
    } catch (error) {
        console.error('getProductBySlug error:', error);
        return { product: null, error: 'Không thể tải thông tin sản phẩm' };
    }
}

// Fetch a single product by ID
export async function getProductById(id: string) {
    try {
        const product = await prisma.product.findUnique({
            where: { id },
            include: {
                priceTiers: {
                    orderBy: { minQuantity: 'asc' },
                },
            },
        });

        if (!product) {
            return { product: null, error: 'Không tìm thấy sản phẩm' };
        }

        return { product, error: null };
    } catch (error) {
        console.error('getProductById error:', error);
        return { product: null, error: 'Không thể tải thông tin sản phẩm' };
    }
}
