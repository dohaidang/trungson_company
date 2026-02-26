import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { AdminDashboardClient } from '@/components/admin/AdminDashboardClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard | Trung Sơn Company',
  description: 'Quản lý hệ thống Trung Sơn Company.',
};

export default async function AdminPage() {
  const session = await auth();
  
  if (!session?.user) {
    redirect('/login');
  }

  // TODO: Check admin role
  // if (session.user.role !== 'admin') redirect('/dashboard');

  return <AdminDashboardClient />;
}
