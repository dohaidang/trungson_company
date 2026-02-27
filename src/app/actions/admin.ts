'use server';

import prisma from '@/lib/db';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import bcrypt from 'bcryptjs';

// Helper to verify admin role
async function verifyAdmin() {
    const session = await auth();
    if (!session?.user?.id) {
        return { userId: null, error: 'Bạn cần đăng nhập' };
    }
    if (session.user.role !== 'ADMIN') {
        return { userId: null, error: 'Bạn không có quyền truy cập' };
    }
    return { userId: session.user.id, error: null };
}

// Get admin dashboard stats
export async function getAdminStats() {
    try {
        const { error } = await verifyAdmin();
        if (error) return { stats: null, error };

        const [
            totalUsers,
            totalOrders,
            totalProducts,
            totalContacts,
            ordersByStatus,
            recentOrders,
            revenueTotal,
        ] = await Promise.all([
            prisma.user.count(),
            prisma.order.count(),
            prisma.product.count(),
            prisma.contactInquiry.count({ where: { isRead: false } }),
            prisma.order.groupBy({
                by: ['status'],
                _count: { id: true },
            }),
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
            prisma.order.aggregate({
                where: { status: 'COMPLETED' },
                _sum: { totalAmount: true },
            }),
        ]);

        return {
            stats: {
                totalUsers,
                totalOrders,
                totalProducts,
                unreadContacts: totalContacts,
                revenue: revenueTotal._sum.totalAmount || 0,
                ordersByStatus: ordersByStatus.map(s => ({
                    status: s.status,
                    count: s._count.id,
                })),
                recentOrders: recentOrders.map(o => ({
                    id: o.id,
                    customer: o.user.name || o.user.email,
                    email: o.user.email,
                    items: o.items.map(i => `${i.product.name} ×${i.quantity}`).join(', '),
                    total: o.totalAmount,
                    status: o.status.toLowerCase(),
                    date: o.createdAt.toLocaleDateString('vi-VN'),
                })),
            },
            error: null,
        };
    } catch (error) {
        console.error('getAdminStats error:', error);
        return { stats: null, error: 'Lỗi server' };
    }
}

// Get all orders for admin
export async function getAdminOrders(filters?: {
    status?: string;
    search?: string;
    page?: number;
    limit?: number;
}) {
    try {
        const { error } = await verifyAdmin();
        if (error) return { orders: [], pagination: null, error };

        const page = filters?.page || 1;
        const limit = filters?.limit || 20;

        const where: Record<string, unknown> = {};
        if (filters?.status) where.status = filters.status;
        if (filters?.search) {
            where.OR = [
                { user: { name: { contains: filters.search } } },
                { user: { email: { contains: filters.search } } },
                { deliveryAddress: { contains: filters.search } },
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
                },
                orderBy: { createdAt: 'desc' },
                skip: (page - 1) * limit,
                take: limit,
            }),
            prisma.order.count({ where }),
        ]);

        // Transform to serializable format
        const serializedOrders = orders.map(o => ({
            id: o.id,
            customer: o.user.name || 'N/A',
            email: o.user.email,
            items: o.items.map(i => `${i.product.name} ×${i.quantity}`).join(', '),
            total: o.totalAmount,
            status: o.status.toLowerCase(),
            date: o.createdAt.toLocaleDateString('vi-VN'),
        }));

        return {
            orders: serializedOrders,
            pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
            error: null,
        };
    } catch (error) {
        console.error('getAdminOrders error:', error);
        return { orders: [], pagination: null, error: 'Lỗi server' };
    }
}

// Update order status
export async function updateOrderStatus(orderId: string, status: string) {
    try {
        const { error } = await verifyAdmin();
        if (error) return { success: false, error };

        const order = await prisma.order.findUnique({ where: { id: orderId } });
        if (!order) {
            return { success: false, error: 'Đơn hàng không tồn tại' };
        }

        await prisma.order.update({
            where: { id: orderId },
            data: { status: status as 'PENDING' | 'CONFIRMED' | 'DELIVERING' | 'COMPLETED' | 'CANCELLED' },
        });

        revalidatePath('/admin');
        return { success: true, error: null };
    } catch (error) {
        console.error('updateOrderStatus error:', error);
        return { success: false, error: 'Không thể cập nhật trạng thái' };
    }
}

// Get all products for admin (including unpublished)
export async function getAdminProducts() {
    try {
        const { error } = await verifyAdmin();
        if (error) return { products: [], error };

        const products = await prisma.product.findMany({
            include: {
                priceTiers: { orderBy: { minQuantity: 'asc' } },
                _count: { select: { orderItems: true } },
            },
            orderBy: { name: 'asc' },
        });

        const serialized = products.map(p => ({
            id: p.id,
            name: p.name,
            slug: p.slug,
            type: p.type,
            price: p.priceTiers[0]?.unitPrice || 0,
            isPublished: p.isPublished,
            totalSold: p._count.orderItems,
        }));

        return { products: serialized, error: null };
    } catch (error) {
        console.error('getAdminProducts error:', error);
        return { products: [], error: 'Lỗi server' };
    }
}

// Toggle product published status
export async function toggleProductPublish(productId: string) {
    try {
        const { error } = await verifyAdmin();
        if (error) return { success: false, error };

        const product = await prisma.product.findUnique({ where: { id: productId } });
        if (!product) {
            return { success: false, error: 'Sản phẩm không tồn tại' };
        }

        await prisma.product.update({
            where: { id: productId },
            data: { isPublished: !product.isPublished },
        });

        revalidatePath('/admin');
        revalidatePath('/products');
        return { success: true, error: null };
    } catch (error) {
        console.error('toggleProductPublish error:', error);
        return { success: false, error: 'Không thể cập nhật sản phẩm' };
    }
}

// Get all users for admin
export async function getAdminUsers() {
    try {
        const { error } = await verifyAdmin();
        if (error) return { users: [], error };

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

        const serialized = users.map(user => ({
            id: user.id,
            name: user.name || 'N/A',
            email: user.email,
            phone: user.phone || '',
            role: user.role.toLowerCase(),
            joined: user.createdAt.toLocaleDateString('vi-VN'),
            orders: user._count.orders,
            spent: user.orders.reduce((sum, o) => sum + o.totalAmount, 0),
        }));

        return { users: serialized, error: null };
    } catch (error) {
        console.error('getAdminUsers error:', error);
        return { users: [], error: 'Lỗi server' };
    }
}

// ============================================
// USER CRUD
// ============================================

const userSchema = z.object({
    name: z.string().min(2, 'Tên người dùng tối thiểu 2 ký tự').optional().or(z.literal('')),
    email: z.string().email('Email không hợp lệ'),
    phone: z.string().optional().or(z.literal('')),
    role: z.enum(['ADMIN', 'CUSTOMER', 'CONTRACTOR']),
    password: z.string().optional().or(z.literal('')),
});

export async function getUserForEdit(userId: string) {
    try {
        const { error } = await verifyAdmin();
        if (error) return { user: null, error };

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                role: true,
                // Do not return password hash
            }
        });

        if (!user) return { user: null, error: 'Người dùng không tồn tại' };

        return { user, error: null };
    } catch (error) {
        console.error('getUserForEdit error:', error);
        return { user: null, error: 'Lỗi server' };
    }
}

export async function createUser(data: {
    name?: string;
    email: string;
    phone?: string;
    password?: string;
    role: string;
}) {
    try {
        const { error } = await verifyAdmin();
        if (error) return { success: false, error };

        const parsed = userSchema.safeParse(data);
        if (!parsed.success) {
            return { success: false, error: parsed.error.issues[0]?.message || 'Dữ liệu không hợp lệ' };
        }

        const validated = parsed.data;

        if (!validated.password || validated.password.length < 6) {
            return { success: false, error: 'Mật khẩu phải từ 6 ký tự trở lên' };
        }

        // Check if email exists
        const emailExists = await prisma.user.findUnique({ where: { email: validated.email } });
        if (emailExists) return { success: false, error: 'Email đã được đăng ký' };

        // Check phone if provided
        if (validated.phone) {
            const phoneExists = await prisma.user.findUnique({ where: { phone: validated.phone } });
            if (phoneExists) return { success: false, error: 'Số điện thoại đã được đăng ký' };
        }

        const hashedPassword = await bcrypt.hash(validated.password, 10);

        await prisma.user.create({
            data: {
                email: validated.email,
                name: validated.name || null,
                phone: validated.phone || null,
                role: validated.role as 'ADMIN' | 'CUSTOMER' | 'CONTRACTOR',
                password: hashedPassword,
            },
        });

        revalidatePath('/admin');
        return { success: true, error: null };
    } catch (error) {
        console.error('createUser error:', error);
        return { success: false, error: 'Không thể tạo người dùng' };
    }
}

export async function updateUser(userId: string, data: {
    name?: string;
    email: string;
    phone?: string;
    password?: string;
    role: string;
}) {
    try {
        const { error } = await verifyAdmin();
        if (error) return { success: false, error };

        const parsed = userSchema.safeParse(data);
        if (!parsed.success) {
            return { success: false, error: parsed.error.issues[0]?.message || 'Dữ liệu không hợp lệ' };
        }

        const validated = parsed.data;

        const targetUser = await prisma.user.findUnique({ where: { id: userId } });
        if (!targetUser) return { success: false, error: 'Người dùng không tồn tại' };

        // Check email uniqueness if modified
        if (validated.email !== targetUser.email) {
            const emailExists = await prisma.user.findUnique({ where: { email: validated.email } });
            if (emailExists) return { success: false, error: 'Email đã được sử dụng bởi tài khoản khác' };
        }

        // Check phone uniqueness if modified
        if (validated.phone && validated.phone !== targetUser.phone) {
            const phoneExists = await prisma.user.findUnique({ where: { phone: validated.phone } });
            if (phoneExists) return { success: false, error: 'Số điện thoại đã được sử dụng' };
        }

        const updateData: any = {
            email: validated.email,
            name: validated.name || null,
            phone: validated.phone || null,
            role: validated.role as 'ADMIN' | 'CUSTOMER' | 'CONTRACTOR',
        };

        // Update password if a new one is provided
        if (validated.password && validated.password.length > 0) {
            if (validated.password.length < 6) return { success: false, error: 'Mật khẩu phải từ 6 ký tự trở lên' };
            updateData.password = await bcrypt.hash(validated.password, 10);
        }

        await prisma.user.update({
            where: { id: userId },
            data: updateData,
        });

        revalidatePath('/admin');
        return { success: true, error: null };
    } catch (error) {
        console.error('updateUser error:', error);
        return { success: false, error: 'Không thể cập nhật người dùng' };
    }
}

export async function deleteUser(userId: string) {
    try {
        const { userId: adminId, error } = await verifyAdmin();
        if (error) return { success: false, error };

        if (adminId === userId) {
            return { success: false, error: 'Không thể xóa chính bạn!' };
        }

        const targetUser = await prisma.user.findUnique({
            where: { id: userId },
            include: { _count: { select: { orders: true } } }
        });

        if (!targetUser) return { success: false, error: 'Người dùng không tồn tại' };

        if (targetUser._count.orders > 0) {
            return { success: false, error: `Không thể xóa: Người dùng này đang có ${targetUser._count.orders} đơn hàng` };
        }

        await prisma.user.delete({ where: { id: userId } });

        revalidatePath('/admin');
        return { success: true, error: null };
    } catch (error) {
        console.error('deleteUser error:', error);
        return { success: false, error: 'Không thể xóa người dùng' };
    }
}

// ============================================
// PRODUCT CRUD
// ============================================

// Validation schema
const priceTierSchema = z.object({
    minQuantity: z.number().int().min(0),
    maxQuantity: z.number().int().positive().nullable(),
    unitPrice: z.number().positive('Giá phải lớn hơn 0'),
});

const productSchema = z.object({
    name: z.string().min(3, 'Tên sản phẩm tối thiểu 3 ký tự'),
    type: z.enum(['SOLID', 'FOUR_HOLE', 'TWO_HOLE', 'BLOCK', 'DECORATIVE']),
    description: z.string().optional(),
    dimensions: z.string().optional(),
    weight: z.number().positive().nullable().optional(),
    compressiveStrength: z.number().positive().nullable().optional(),
    isPublished: z.boolean().default(true),
    priceTiers: z.array(priceTierSchema).min(1, 'Cần ít nhất 1 mức giá'),
    images: z.array(z.string()).optional().default([]),
});

// Helper: generate slug from name
function generateSlug(name: string): string {
    return name
        .toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove diacritics
        .replace(/đ/g, 'd').replace(/Đ/g, 'd')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
}

// Get single product for editing (with full data + price tiers)
export async function getProductForEdit(productId: string) {
    try {
        const { error } = await verifyAdmin();
        if (error) return { product: null, error };

        const product = await prisma.product.findUnique({
            where: { id: productId },
            include: {
                priceTiers: { orderBy: { minQuantity: 'asc' } },
            },
        });

        if (!product) {
            return { product: null, error: 'Sản phẩm không tồn tại' };
        }

        return {
            product: {
                id: product.id,
                name: product.name,
                slug: product.slug,
                description: product.description || '',
                type: product.type,
                dimensions: product.dimensions || '',
                weight: product.weight,
                compressiveStrength: product.compressiveStrength,
                isPublished: product.isPublished,
                images: product.images ? JSON.parse(product.images) : [],
                priceTiers: product.priceTiers.map(t => ({
                    id: t.id,
                    minQuantity: t.minQuantity,
                    maxQuantity: t.maxQuantity,
                    unitPrice: t.unitPrice,
                })),
            },
            error: null,
        };
    } catch (error) {
        console.error('getProductForEdit error:', error);
        return { product: null, error: 'Lỗi server' };
    }
}

// Create a new product
export async function createProduct(data: {
    name: string;
    type: string;
    description?: string;
    dimensions?: string;
    weight?: number | null;
    compressiveStrength?: number | null;
    isPublished?: boolean;
    priceTiers: { minQuantity: number; maxQuantity: number | null; unitPrice: number }[];
}) {
    try {
        const { error } = await verifyAdmin();
        if (error) return { success: false, error };

        // Validate
        const parsed = productSchema.safeParse(data);
        if (!parsed.success) {
            const firstError = parsed.error.issues[0]?.message || 'Dữ liệu không hợp lệ';
            return { success: false, error: firstError };
        }

        const validated = parsed.data;

        // Generate unique slug
        let slug = generateSlug(validated.name);
        const existing = await prisma.product.findUnique({ where: { slug } });
        if (existing) {
            slug = `${slug}-${Date.now().toString(36)}`;
        }

        // Create product with price tiers in a transaction
        await prisma.$transaction(async (tx) => {
            const product = await tx.product.create({
                data: {
                    name: validated.name,
                    slug,
                    description: validated.description || null,
                    type: validated.type as 'SOLID' | 'FOUR_HOLE' | 'TWO_HOLE' | 'BLOCK' | 'DECORATIVE',
                    dimensions: validated.dimensions || null,
                    weight: validated.weight ?? null,
                    compressiveStrength: validated.compressiveStrength ?? null,
                    isPublished: validated.isPublished,
                },
            });

            // Create price tiers
            await tx.priceTier.createMany({
                data: validated.priceTiers.map(t => ({
                    productId: product.id,
                    minQuantity: t.minQuantity,
                    maxQuantity: t.maxQuantity,
                    unitPrice: t.unitPrice,
                })),
            });
        });

        revalidatePath('/admin');
        revalidatePath('/products');
        return { success: true, error: null };
    } catch (error) {
        console.error('createProduct error:', error);
        return { success: false, error: 'Không thể tạo sản phẩm' };
    }
}

// Update an existing product
export async function updateProduct(productId: string, data: {
    name: string;
    type: string;
    description?: string;
    dimensions?: string;
    weight?: number | null;
    compressiveStrength?: number | null;
    isPublished?: boolean;
    priceTiers: { minQuantity: number; maxQuantity: number | null; unitPrice: number }[];
}) {
    try {
        const { error } = await verifyAdmin();
        if (error) return { success: false, error };

        const parsed = productSchema.safeParse(data);
        if (!parsed.success) {
            const firstError = parsed.error.issues[0]?.message || 'Dữ liệu không hợp lệ';
            return { success: false, error: firstError };
        }

        const validated = parsed.data;

        const existing = await prisma.product.findUnique({ where: { id: productId } });
        if (!existing) {
            return { success: false, error: 'Sản phẩm không tồn tại' };
        }

        // Generate slug if name changed
        let slug = existing.slug;
        if (validated.name !== existing.name) {
            slug = generateSlug(validated.name);
            const slugExists = await prisma.product.findFirst({
                where: { slug, id: { not: productId } },
            });
            if (slugExists) {
                slug = `${slug}-${Date.now().toString(36)}`;
            }
        }

        // Update in transaction: product + replace price tiers
        await prisma.$transaction(async (tx) => {
            await tx.product.update({
                where: { id: productId },
                data: {
                    name: validated.name,
                    slug,
                    description: validated.description || null,
                    type: validated.type as 'SOLID' | 'FOUR_HOLE' | 'TWO_HOLE' | 'BLOCK' | 'DECORATIVE',
                    dimensions: validated.dimensions || null,
                    weight: validated.weight ?? null,
                    compressiveStrength: validated.compressiveStrength ?? null,
                    isPublished: validated.isPublished,
                },
            });

            // Delete old tiers and create new ones
            await tx.priceTier.deleteMany({ where: { productId } });
            await tx.priceTier.createMany({
                data: validated.priceTiers.map(t => ({
                    productId,
                    minQuantity: t.minQuantity,
                    maxQuantity: t.maxQuantity,
                    unitPrice: t.unitPrice,
                })),
            });
        });

        revalidatePath('/admin');
        revalidatePath('/products');
        revalidatePath(`/products/${slug}`);
        return { success: true, error: null };
    } catch (error) {
        console.error('updateProduct error:', error);
        return { success: false, error: 'Không thể cập nhật sản phẩm' };
    }
}

// Delete a product (only if no orders reference it)
export async function deleteProduct(productId: string) {
    try {
        const { error } = await verifyAdmin();
        if (error) return { success: false, error };

        const product = await prisma.product.findUnique({
            where: { id: productId },
            include: { _count: { select: { orderItems: true } } },
        });

        if (!product) {
            return { success: false, error: 'Sản phẩm không tồn tại' };
        }

        if (product._count.orderItems > 0) {
            return { success: false, error: `Không thể xóa: sản phẩm có ${product._count.orderItems} đơn hàng liên quan` };
        }

        // Delete price tiers first, then product
        await prisma.$transaction(async (tx) => {
            await tx.priceTier.deleteMany({ where: { productId } });
            await tx.product.delete({ where: { id: productId } });
        });

        revalidatePath('/admin');
        revalidatePath('/products');
        return { success: true, error: null };
    } catch (error) {
        console.error('deleteProduct error:', error);
        return { success: false, error: 'Không thể xóa sản phẩm' };
    }
}
