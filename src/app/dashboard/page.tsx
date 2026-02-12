import { auth, signOut } from '@/auth';
import { redirect } from 'next/navigation';
 
export default async function DashboardPage() {
  const session = await auth();
  
  if (!session?.user) {
    redirect('/login');
  }
 
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
      <p className="text-lg mb-8">
        Welcome back, <span className="font-semibold">{session?.user?.name || session?.user?.email}</span>!
      </p>
      
      <form
        action={async () => {
          'use server';
          await signOut();
        }}
      >
        <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors">
          Sign Out
        </button>
      </form>
    </div>
  );
}
