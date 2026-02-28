'use server';

import prisma from '@/lib/db';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';

// Verify admin role 
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

// Lấy danh sách setting list để trả về cho Client Component hoặc Client UI
export async function getSettings() {
    try {
        const settings = await prisma.setting.findMany();
        // Return data in Key-Value pair for easier processing on Frontend: { SITE_NAME: "Trung Son" }
        const settingsMap = settings.reduce((acc, curr) => {
            acc[curr.key] = curr.value;
            return acc;
        }, {} as Record<string, string>);

        return { settings: settingsMap, raw: settings, error: null };
    } catch (error) {
        console.error('getSettings error:', error);
        return { settings: {}, raw: [], error: 'Lỗi khi lấy dữ liệu cấu hình' };
    }
}

// Lấy danh sách theo từng category
export async function getSettingGroups() {
    try {
        const settings = await prisma.setting.findMany();

        // Nhóm theo category
        const groups = settings.reduce((acc, curr) => {
            const cat = curr.category || 'UNCATEGORIZED';
            if (!acc[cat]) {
                acc[cat] = [];
            }
            acc[cat].push(curr);
            return acc;
        }, {} as Record<string, typeof settings>);

        return { groups, error: null };
    } catch (error) {
        console.error('getSettingGroups error:', error);
        return { groups: {}, error: 'Lỗi khi lấy dữ liệu cấu hình' };
    }
}

// Server Action để lưu một loạt các setting một lúc
// Payload is object: { SITE_NAME: "Trung Son", HOTLINE: "1900 8000" }
export async function updateSettings(
    data: Record<string, string>,
    groupCategories?: Record<string, string>,
    groupLabels?: Record<string, string>
) {
    try {
        const { error } = await verifyAdmin();
        if (error) return { success: false, error };

        // Do Prisma không hỗ trợ "Upsert Many" cho object map, ta dùng loop bằng transaction
        const updates = Object.entries(data).map(([key, value]) => {
            return prisma.setting.upsert({
                where: { key },
                update: { value, updatedAt: new Date() },
                create: {
                    key,
                    value,
                    category: groupCategories?.[key] || 'GENERAL',
                    label: groupLabels?.[key] || key
                }
            });
        });

        await prisma.$transaction(updates);

        revalidatePath('/', 'layout'); // Revalidate toàn bộ app
        return { success: true, error: null };
    } catch (error) {
        console.error('updateSettings error:', error);
        return { success: false, error: 'Không thể lưu cài đặt. Vui lòng thử lại' };
    }
}
