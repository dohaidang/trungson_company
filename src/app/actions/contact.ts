'use server';

import prisma from '@/lib/db';
import { z } from 'zod';

// Contact form validation schema
const contactSchema = z.object({
    name: z.string().min(2, 'Tên phải có ít nhất 2 ký tự'),
    email: z.string().email('Email không hợp lệ'),
    phone: z.string().optional(),
    subject: z.string().optional(),
    message: z.string().min(10, 'Nội dung phải có ít nhất 10 ký tự'),
});

// Submit contact form
export async function submitContact(data: {
    name: string;
    email: string;
    phone?: string;
    subject?: string;
    message: string;
}) {
    try {
        const result = contactSchema.safeParse(data);

        if (!result.success) {
            const firstIssue = result.error.issues?.[0]?.message || 'Dữ liệu không hợp lệ';
            return { success: false, error: firstIssue };
        }

        await prisma.contactInquiry.create({
            data: result.data,
        });

        return {
            success: true,
            error: null,
            message: 'Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất.',
        };
    } catch (error) {
        console.error('submitContact error:', error);
        return { success: false, error: 'Không thể gửi tin nhắn. Vui lòng thử lại.' };
    }
}
