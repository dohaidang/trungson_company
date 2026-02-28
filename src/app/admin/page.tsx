import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { AdminDashboardClient } from '@/components/admin/AdminDashboardClient';
import { getAdminStats, getAdminOrders, getAdminProducts, getAdminUsers, getAdminContacts } from '@/app/actions/admin';
import { getCategories } from '@/app/actions/category';
import { getApplications } from '@/app/actions/application';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard | CÔNG TY CỔ PHẦN THƯƠNG MẠI VÀ SẢN XUẤT VẬT LIỆU XÂY DỰNG TRUNG SƠN',
  description: 'Quản lý hệ thống CÔNG TY CỔ PHẦN THƯƠNG MẠI VÀ SẢN XUẤT VẬT LIỆU XÂY DỰNG TRUNG SƠN.',
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
  const [
    statsResult, 
    ordersResult, 
    productsResult, 
    usersResult, 
    contactsResult,
    categoriesResult,
    applicationsResult
  ] = await Promise.all([
    getAdminStats(),
    getAdminOrders(),
    getAdminProducts(),
    getAdminUsers(),
    getAdminContacts(),
    getCategories(),
    getApplications(),
  ]);

  return (
    <AdminDashboardClient
      stats={statsResult.stats}
      orders={ordersResult.orders}
      products={productsResult.products}
      users={usersResult.users}
      contacts={contactsResult.contacts}
      categories={categoriesResult.categories as any}
      applications={applicationsResult.applications as any}
    />
  );
}
