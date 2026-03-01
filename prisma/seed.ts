import { PrismaClient, Role, OrderStatus, DeliveryMethod } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database...');

    // ===== 1. ADMIN USER =====
    const adminPassword = await bcrypt.hash('Admin@123', 10);
    const admin = await prisma.user.upsert({
        where: { email: 'admin@trungson.vn' },
        update: {},
        create: {
            email: 'admin@trungson.vn',
            name: 'Admin Trung Sơn',
            phone: '0901000001',
            password: adminPassword,
            role: Role.ADMIN,
        },
    });
    console.log('✅ Admin user created:', admin.email);

    // ===== 2. CUSTOMER USERS =====
    const customerPassword = await bcrypt.hash('Customer@123', 10);

    const customer1 = await prisma.user.upsert({
        where: { email: 'nguyenvana@gmail.com' },
        update: {},
        create: {
            email: 'nguyenvana@gmail.com',
            name: 'Nguyễn Văn A',
            phone: '0909111222',
            password: customerPassword,
            role: Role.CUSTOMER,
        },
    });

    const customer2 = await prisma.user.upsert({
        where: { email: 'tranthib@gmail.com' },
        update: {},
        create: {
            email: 'tranthib@gmail.com',
            name: 'Trần Thị B',
            phone: '0912333444',
            password: customerPassword,
            role: Role.CUSTOMER,
        },
    });

    const contractor = await prisma.user.upsert({
        where: { email: 'levanc@gmail.com' },
        update: {},
        create: {
            email: 'levanc@gmail.com',
            name: 'Lê Văn C',
            phone: '0918555666',
            password: customerPassword,
            role: Role.CONTRACTOR,
            contractorProfile: {
                create: {
                    creditLimit: 50000000,
                    paymentTerms: 'Net 30',
                },
            },
        },
    });
    console.log('✅ 3 customer/contractor users created');

    // ===== 2.5 CATEGORIES & APPLICATIONS =====
    const categoriesData = [
        { name: 'Gạch Chỉ (Solid)', slug: 'gach-chi', description: 'Gạch đặc và tuynel truyền thống' },
        { name: 'Gạch Lỗ (Hollow)', slug: 'gach-lo', description: 'Gạch nhiều lỗ cách âm, cách nhiệt' },
        { name: 'Gạch Block', slug: 'gach-block', description: 'Gạch bê tông xi măng khối lớn' },
        { name: 'Gạch Trang Trí', slug: 'gach-trang-tri', description: 'Gạch ốp tường, vỉa hè, sân vườn' },
    ];

    console.log('Inserting Categories...');
    await prisma.category.createMany({ data: categoriesData });
    const categories = await prisma.category.findMany();

    const appsData = [
        { name: 'Xây thô', slug: 'xay-tho', description: 'Xây móng, tường bao chịu lực' },
        { name: 'Vách ngăn', slug: 'vach-ngan', description: 'Tường ngăn phòng bên trong' },
        { name: 'Ốp lát ngoài trời', slug: 'op-lat-ngoai-troi', description: 'Trang trí mặt tiền, hàng rào' },
        { name: 'Lát hè & sân', slug: 'lat-he-san', description: 'Khu vực chịu tải trọng đi lại' },
    ];

    console.log('Inserting Applications...');
    await prisma.application.createMany({ data: appsData });
    const applications = await prisma.application.findMany();

    console.log('✅ Categories and Applications created');

    // ===== 3. PRODUCTS =====
    const productsData = [
        {
            name: 'Gạch Đặc Tiêu Chuẩn - Tuynel Đỏ',
            slug: 'gach-dac-tieu-chuan-tuynel-do',
            description: 'Gạch đỏ đặc truyền thống thích hợp cho tường chịu lực. Sản xuất theo công nghệ Tuynel, đạt tiêu chuẩn TCVN.',
            type: null,
            categoryId: categories.find(c => c.slug === 'gach-chi')?.id,
            applicationSlugs: ['xay-tho'],
            dimensions: '22x10.5x6cm',
            weight: 1.8,
            compressiveStrength: 7.5,
            priceTiers: [
                { minQuantity: 0, maxQuantity: 999, unitPrice: 1200 },
                { minQuantity: 1000, maxQuantity: 4999, unitPrice: 1100 },
                { minQuantity: 5000, maxQuantity: null, unitPrice: 1000 },
            ],
        },
        {
            name: 'Gạch 2 Lỗ - Tiêu Chuẩn',
            slug: 'gach-2-lo-tieu-chuan',
            description: 'Lựa chọn kinh tế cho tường ngăn. Khả năng cách nhiệt, cách âm tốt.',
            type: null,
            categoryId: categories.find(c => c.slug === 'gach-lo')?.id,
            applicationSlugs: ['vach-ngan'],
            dimensions: '22x10.5x6cm',
            weight: 1.5,
            compressiveStrength: 5.0,
            priceTiers: [
                { minQuantity: 0, maxQuantity: 999, unitPrice: 1050 },
                { minQuantity: 1000, maxQuantity: 4999, unitPrice: 950 },
                { minQuantity: 5000, maxQuantity: null, unitPrice: 850 },
            ],
        },
        {
            name: 'Gạch Ốp Tường Xám Đá',
            slug: 'gach-op-tuong-xam-da',
            description: 'Bề mặt xám hiện đại cho thiết kế kiến trúc đương đại. Chống thấm, chống nấm mốc.',
            type: null,
            categoryId: categories.find(c => c.slug === 'gach-trang-tri')?.id,
            applicationSlugs: ['op-lat-ngoai-troi'],
            dimensions: '20x10x5cm',
            weight: 1.2,
            compressiveStrength: 10.0,
            priceTiers: [
                { minQuantity: 0, maxQuantity: 499, unitPrice: 2400 },
                { minQuantity: 500, maxQuantity: 1999, unitPrice: 2200 },
                { minQuantity: 2000, maxQuantity: null, unitPrice: 2000 },
            ],
        },
        {
            name: 'Gạch Ốp Cổ Điển',
            slug: 'gach-op-co-dien',
            description: 'Mang lại vẻ đẹp cổ điển và ấm cúng với bề mặt giả gỗ tự nhiên.',
            type: null,
            categoryId: categories.find(c => c.slug === 'gach-trang-tri')?.id,
            applicationSlugs: ['op-lat-ngoai-troi'],
            dimensions: '20x10x5cm',
            weight: 1.1,
            compressiveStrength: 10.0,
            priceTiers: [
                { minQuantity: 0, maxQuantity: 499, unitPrice: 1850 },
                { minQuantity: 500, maxQuantity: 1999, unitPrice: 1700 },
                { minQuantity: 2000, maxQuantity: null, unitPrice: 1550 },
            ],
        },
        {
            name: 'Gạch Block 4 Lỗ',
            slug: 'gach-block-4-lo',
            description: 'Block bê tông 4 lỗ cách nhiệt, cách âm xuất sắc. Thi công nhanh, tiết kiệm vữa.',
            type: null,
            categoryId: categories.find(c => c.slug === 'gach-block')?.id,
            applicationSlugs: ['xay-tho', 'vach-ngan'],
            dimensions: '39x19x14cm',
            weight: 8.5,
            compressiveStrength: 5.0,
            priceTiers: [
                { minQuantity: 0, maxQuantity: 499, unitPrice: 3500 },
                { minQuantity: 500, maxQuantity: 1999, unitPrice: 3200 },
                { minQuantity: 2000, maxQuantity: null, unitPrice: 2900 },
            ],
        },
        {
            name: 'Gạch Vỉa Hè',
            slug: 'gach-via-he',
            description: 'Gạch lát vỉa hè con sâu chống trơn trượt, thoát nước tốt. Bền màu theo thời gian.',
            type: null,
            categoryId: categories.find(c => c.slug === 'gach-trang-tri')?.id,
            applicationSlugs: ['lat-he-san'],
            dimensions: '20x10x6cm',
            weight: 2.0,
            compressiveStrength: 15.0,
            priceTiers: [
                { minQuantity: 0, maxQuantity: 999, unitPrice: 2100 },
                { minQuantity: 1000, maxQuantity: 4999, unitPrice: 1900 },
                { minQuantity: 5000, maxQuantity: null, unitPrice: 1750 },
            ],
        },
    ];

    for (const productData of productsData) {
        const { priceTiers, type, applicationSlugs, ...product } = productData;

        await prisma.product.upsert({
            where: { slug: product.slug },
            update: {},
            create: {
                ...product,
                applications: {
                    connect: applications
                        .filter(a => (applicationSlugs as string[]).includes(a.slug))
                        .map(a => ({ id: a.id }))
                },
                priceTiers: {
                    create: priceTiers,
                },
            },
        });
    }
    console.log('✅ 6 products with price tiers created');

    // ===== 4. ORDERS =====
    const products = await prisma.product.findMany();
    const p1 = products.find((p) => p.slug === 'gach-dac-tieu-chuan-tuynel-do')!;
    const p2 = products.find((p) => p.slug === 'gach-block-4-lo')!;
    const p3 = products.find((p) => p.slug === 'gach-via-he')!;
    const p4 = products.find((p) => p.slug === 'gach-op-tuong-xam-da')!;

    // Order 1: Delivered
    await prisma.order.create({
        data: {
            userId: customer1.id,
            status: OrderStatus.COMPLETED,
            deliveryMethod: DeliveryMethod.CRANE,
            deliveryAddress: '123 Đường Nguyễn Văn Linh, Q.7, TP.HCM',
            totalAmount: 2400000,
            items: {
                create: [
                    { productId: p1.id, quantity: 2000, unitPrice: 1200 },
                ],
            },
            deliveries: {
                create: {
                    scheduledDate: new Date('2024-02-15'),
                    quantity: 2000,
                    status: 'DELIVERED',
                    driverName: 'Trần Văn Tài',
                    vehiclePlate: '51C-123.45',
                },
            },
        },
    });

    // Order 2: Delivering
    await prisma.order.create({
        data: {
            userId: customer2.id,
            status: OrderStatus.DELIVERING,
            deliveryMethod: DeliveryMethod.CRANE,
            deliveryAddress: '456 Đường Lê Lợi, Q.1, TP.HCM',
            totalAmount: 1750000,
            items: {
                create: [
                    { productId: p2.id, quantity: 500, unitPrice: 3500 },
                ],
            },
            deliveries: {
                create: {
                    scheduledDate: new Date('2024-02-25'),
                    quantity: 500,
                    status: 'EN_ROUTE',
                    driverName: 'Nguyễn Văn Hùng',
                    vehiclePlate: '51D-678.90',
                },
            },
        },
    });

    // Order 3: Pending
    await prisma.order.create({
        data: {
            userId: contractor.id,
            status: OrderStatus.PENDING,
            deliveryMethod: DeliveryMethod.MANUAL,
            deliveryAddress: '789 Đường Trần Hưng Đạo, Q.5, TP.HCM',
            totalAmount: 720000,
            items: {
                create: [
                    { productId: p4.id, quantity: 300, unitPrice: 2400 },
                ],
            },
        },
    });

    // Order 4: Completed (large order)
    await prisma.order.create({
        data: {
            userId: customer1.id,
            status: OrderStatus.COMPLETED,
            deliveryMethod: DeliveryMethod.CRANE,
            deliveryAddress: '123 Đường Nguyễn Văn Linh, Q.7, TP.HCM',
            totalAmount: 5000000,
            items: {
                create: [
                    { productId: p1.id, quantity: 5000, unitPrice: 1000 },
                ],
            },
            deliveries: {
                create: [
                    {
                        scheduledDate: new Date('2024-01-05'),
                        quantity: 2500,
                        status: 'DELIVERED',
                        driverName: 'Trần Văn Tài',
                        vehiclePlate: '51C-123.45',
                    },
                    {
                        scheduledDate: new Date('2024-01-08'),
                        quantity: 2500,
                        status: 'DELIVERED',
                        driverName: 'Nguyễn Văn Hùng',
                        vehiclePlate: '51D-678.90',
                    },
                ],
            },
        },
    });

    // Order 5: Cancelled
    await prisma.order.create({
        data: {
            userId: customer2.id,
            status: OrderStatus.CANCELLED,
            deliveryMethod: DeliveryMethod.CRANE,
            deliveryAddress: '456 Đường Lê Lợi, Q.1, TP.HCM',
            totalAmount: 2100000,
            items: {
                create: [
                    { productId: p3.id, quantity: 1000, unitPrice: 2100 },
                ],
            },
        },
    });

    console.log('✅ 5 orders with items & deliveries created');

    // ===== 5. CONTACT INQUIRIES =====
    await prisma.contactInquiry.createMany({
        data: [
            { name: 'Phạm Thị D', email: 'phamthid@gmail.com', phone: '0935777888', subject: 'Báo giá gạch block', message: 'Cho tôi xin báo giá 5000 viên gạch block 4 lỗ giao tại Bình Dương.' },
            { name: 'Hoàng Văn E', email: 'hoangvane@gmail.com', phone: '0977999000', subject: 'Hỏi về vận chuyển', message: 'Công trình ở hẻm nhỏ 2m, có giao được không ạ?', isRead: true },
        ],
    });
    console.log('✅ 2 contact inquiries created');

    console.log('\n🎉 Seeding completed!');
    console.log('📧 Admin login: admin@trungson.vn / Admin@123');
    console.log('📧 Customer login: nguyenvana@gmail.com / Customer@123');
}

main()
    .catch((e) => {
        console.error('❌ Seeding failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
