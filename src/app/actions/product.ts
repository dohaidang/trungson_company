'use server';

import prisma from '@/lib/db';
import { Prisma } from '@prisma/client';

// Fetch all published products with optional filters
export async function getProducts(options?: {
    page?: number;
    limit?: number;
    query?: string;
    filters?: {
        types?: string[];
        search?: string;
        minPrice?: number;
        maxPrice?: number;
        applications?: string[];
        inStock?: boolean;
    };
    sortBy?: string;
}) {
    const {
        page = 1,
        limit = 12,
        query = "",
        filters = {},
        sortBy = "newest"
    } = options || {};

    const skip = (page - 1) * limit;

    try {
        const where: any = { isPublished: true };

        // 1. Search Query
        if (query) {
            where.OR = [
                { name: { contains: query } },
                { description: { contains: query } },
            ];
        }

        // 2. Filter by Categories (formerly Types)
        if (filters?.types && filters.types.length > 0) {
            where.category = { name: { in: filters.types } };
        }

        // 3. Filter by Search keyword (Legacy)
        if (filters?.search) {
            if (where.OR) {
                // Do nothing if main query already handles this, or merge
            } else {
                where.OR = [
                    { name: { contains: filters.search } },
                    { description: { contains: filters.search } },
                ];
            }
        }

        // 4. Filter by Application (using relation)
        if (filters?.applications && filters.applications.length > 0) {
            where.applications = {
                some: { name: { in: filters.applications } }
            };
        }

        // 5. Filter by Stock
        if (filters?.inStock) {
            where.stock = { gt: 0 };
        }

        // 6. Filter by Price Range (using priceTiers relation)
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
                category: true,
                applications: true,
            },
            orderBy: { createdAt: 'desc' }, // default sort bypass for now, adjust based on sortBy param later
            skip,
            take: limit
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
