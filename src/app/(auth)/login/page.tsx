import { AuthForm } from '@/components/auth/auth-form';
 
export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-zinc-50 dark:bg-zinc-950">
      <AuthForm type="login" />
    </main>
  );
}
