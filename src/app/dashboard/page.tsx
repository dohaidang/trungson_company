import { auth, signOut } from '@/auth';
import { redirect } from 'next/navigation';
import { DashboardClient } from '@/components/dashboard/DashboardClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | Trung Sơn Company',
  description: 'Quản lý đơn hàng, theo dõi vận chuyển và cập nhật thông tin cá nhân.',
};

export default async function DashboardPage() {
  const session = await auth();
  
  if (!session?.user) {
    redirect('/login');
  }

  return (
    <DashboardClient
      userName={session?.user?.name || ''}
      userEmail={session?.user?.email || ''}
    />
  );
}
