'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { z } from 'zod';
import prisma from '@/lib/db';
import bcrypt from 'bcryptjs';

const RegisterSchema = z.object({
    email: z.string().email({ message: 'Email không hợp lệ.' }),
    password: z.string().min(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự.' }),
    name: z.string().min(2, { message: 'Tên phải có ít nhất 2 ký tự.' }),
});

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Thông tin đăng nhập không chính xác.';
                default:
                    return 'Đã xảy ra lỗi.';
            }
        }
        throw error;
    }
}

export async function register(
    prevState: string | undefined,
    formData: FormData,
) {
    const validatedFields = RegisterSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
        name: formData.get('name'),
    });

    if (!validatedFields.success) {
        return 'Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.';
    }

    const { email, password, name } = validatedFields.data;

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return 'Email này đã được sử dụng.';
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
            },
        });

        // Sau khi đăng ký thành công, có thể tự động đăng nhập hoặc chuyển hướng
        // Ở đây ta trả về thông báo thành công hoặc redirect
        // Tuy nhiên Server Action register chỉ xử lý logic tạo user
        return 'success';
    } catch (error) {
        console.error('Registration error:', error);
        return 'Đã xảy ra lỗi khi tạo tài khoản.';
    }
}
