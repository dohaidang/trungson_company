import { NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/db';

// POST /api/contact - Submit contact form (public)
const contactSchema = z.object({
    name: z.string().min(2, 'Tên phải có ít nhất 2 ký tự'),
    email: z.string().email('Email không hợp lệ'),
    phone: z.string().optional(),
    subject: z.string().optional(),
    message: z.string().min(10, 'Nội dung phải có ít nhất 10 ký tự'),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const result = contactSchema.safeParse(body);

        if (!result.success) {
            const firstIssue = result.error.issues?.[0]?.message || 'Dữ liệu không hợp lệ';
            return NextResponse.json({ error: firstIssue }, { status: 400 });
        }

        const inquiry = await prisma.contactInquiry.create({
            data: result.data,
        });

        return NextResponse.json(
            { message: 'Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất.', id: inquiry.id },
            { status: 201 }
        );
    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json(
            { error: 'Không thể gửi tin nhắn. Vui lòng thử lại.' },
            { status: 500 }
        );
    }
}
