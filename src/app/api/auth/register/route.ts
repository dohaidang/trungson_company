import { NextResponse } from 'next/server';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/db';

// Validation schema
const registerSchema = z.object({
    name: z.string().min(2, 'Tên phải có ít nhất 2 ký tự'),
    email: z.string().email('Email không hợp lệ'),
    phone: z.string().optional(),
    password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validate input
        const result = registerSchema.safeParse(body);
        if (!result.success) {
            const firstIssue = result.error.issues?.[0]?.message || 'Dữ liệu không hợp lệ';
            return NextResponse.json(
                { error: firstIssue },
                { status: 400 }
            );
        }

        const { name, email, phone, password } = result.data;

        // Check if email already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: 'Email đã được sử dụng' },
                { status: 409 }
            );
        }

        // Hash password and create user
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                phone: phone || null,
                password: hashedPassword,
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
            },
        });

        return NextResponse.json(
            { message: 'Đăng ký thành công', user },
            { status: 201 }
        );
    } catch (error) {
        console.error('Register error:', error);
        return NextResponse.json(
            { error: 'Đã có lỗi xảy ra. Vui lòng thử lại.' },
            { status: 500 }
        );
    }
}
