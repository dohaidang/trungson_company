'use client';
 
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { authenticate, register } from '@/app/actions/auth';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

export function AuthForm({ type }: { type: 'login' | 'register' }) {
  const [errorMessage, dispatch] = useActionState(
    type === 'login' ? authenticate : register,
    undefined
  );
 
  return (
    <form action={dispatch} className="space-y-4 w-full max-w-md mx-auto p-6 bg-white dark:bg-zinc-900 rounded-lg shadow-lg border border-zinc-200 dark:border-zinc-800">
      <div className="space-y-1 mb-4">
        <h1 className="text-2xl font-bold text-center">
          {type === 'login' ? 'Đăng nhập' : 'Đăng ký'}
        </h1>
        <p className="text-sm text-zinc-500 text-center">
            {type === 'login' ? 'Chào mừng bạn quay trở lại' : 'Tạo tài khoản mới để bắt đầu'}
        </p>
      </div>

      <div className="space-y-2">
        {type === 'register' && (
           <>
            <label className="block text-sm font-medium" htmlFor="name">
              Tên hiển thị
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:focus:ring-white"
              id="name"
              type="text"
              name="name"
              placeholder="Nguyễn Văn A"
              required
            />
          </>
        )}
        
        <label className="block text-sm font-medium" htmlFor="email">
          Email
        </label>
        <input
          className="flex h-10 w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:focus:ring-white"
          id="email"
          type="email"
          name="email"
          placeholder="m@example.com"
          required
        />
        
        <label className="block text-sm font-medium" htmlFor="password">
          Mật khẩu
        </label>
        <input
          className="flex h-10 w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:focus:ring-white"
          id="password"
          type="password"
          name="password"
          required
          minLength={6}
        />
      </div>
      
      <div className="flex items-center justify-between">
           {type === 'login' && (
               <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                   Quên mật khẩu?
               </Link>
           )}
      </div>

      <LoginButton type={type} />
      
      <div
        className="flex h-8 items-end space-x-1"
        aria-live="polite"
        aria-atomic="true"
      >
        {errorMessage && (
          <p className="text-sm text-red-500">
            {errorMessage}
          </p>
        )}
      </div>

      <div className="text-center text-sm mt-4">
          {type === 'login' ? (
              <>
                  Chưa có tài khoản?{' '}
                  <Link href="/register" className="text-blue-600 hover:underline font-medium">
                      Đăng ký ngay
                  </Link>
              </>
          ) : (
              <>
                  Đã có tài khoản?{' '}
                  <Link href="/login" className="text-blue-600 hover:underline font-medium">
                      Đăng nhập
                  </Link>
              </>
          )}
      </div>
    </form>
  );
}
 
function LoginButton({ type }: { type: 'login' | 'register' }) {
  const { pending } = useFormStatus();
 
  return (
    <button
        className="w-full flex justify-center items-center h-10 rounded-md bg-black text-white hover:bg-zinc-800 disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-zinc-200 transition-colors" 
        aria-disabled={pending}
    >
      {pending ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : null}
      {type === 'login' ? 'Đăng nhập' : 'Đăng ký'}
    </button>
  );
}
