import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { AdminDashboardClient } from '@/components/admin/AdminDashboardClient';
import { getAdminStats, getAdminOrders, getAdminProducts, getAdminUsers } from '@/app/actions/admin';
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

  // Enforce admin role
  if (session.user.role !== 'ADMIN') {
    redirect('/dashboard');
  }

  // Fetch all admin data in parallel
  const [statsResult, ordersResult, productsResult, usersResult] = await Promise.all([
    getAdminStats(),
    getAdminOrders(),
    getAdminProducts(),
    getAdminUsers(),
  ]);

  return (
    <AdminDashboardClient
      stats={statsResult.stats}
      orders={ordersResult.orders}
      products={productsResult.products}
      users={usersResult.users}
    />
  );
}
