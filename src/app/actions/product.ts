'use server';

import prisma from '@/lib/db';
import type { ProductType } from '@prisma/client';

// Fetch all published products with optional filters
export async function getProducts(filters?: {
    types?: string[];
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    applications?: string[];
    inStock?: boolean;
}) {
    try {
        const where: Record<string, any> = { isPublished: true };

        // 1. Filter by Types (array)
        if (filters?.types && filters.types.length > 0) {
            where.type = { in: filters.types as ProductType[] };
        }

        // 2. Filter by Search keyword
        if (filters?.search) {
            where.OR = [
                { name: { contains: filters.search } },
                { description: { contains: filters.search } },
            ];
        }

        // 3. Filter by Application (using string contains, because it's a JSON string array)
        if (filters?.applications && filters.applications.length > 0) {
            if (!where.AND) where.AND = [];
            // Products must have at least one of the selected applications
            const appConditions = filters.applications.map(app => ({
                application: { contains: `"${app}"` }
            }));
            where.AND.push({ OR: appConditions });
        }

        // 4. Filter by Stock
        if (filters?.inStock) {
            where.stock = { gt: 0 };
        }

        // 5. Filter by Price Range (using priceTiers relation)
        if (filters?.minPrice !== undefined || filters?.maxPrice !== undefined) {
            const priceCondition: any = {};
            if (filters.minPrice !== undefined) priceCondition.gte = filters.minPrice;
            if (filters.maxPrice !== undefined) priceCondition.lte = filters.maxPrice;

            where.priceTiers = {
                some: { unitPrice: priceCondition }
            };
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
