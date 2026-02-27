import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { DashboardClient } from '@/components/dashboard/DashboardClient';
import { getUserOrders } from '@/app/actions/order';
import { getUserProfile } from '@/app/actions/user';
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

  // Admin should use /admin dashboard
  const userRole = (session.user as { role?: string }).role;
  if (userRole === 'ADMIN') {
    redirect('/admin');
  }

  // Fetch real data from DB
  const [ordersResult, profileResult] = await Promise.all([
    getUserOrders(),
    getUserProfile(),
  ]);

  // Transform orders to serializable format
  const orders = ordersResult.orders.map(o => ({
    id: o.id,
    date: o.createdAt.toLocaleDateString('vi-VN'),
    items: o.items.map(i => `${i.product.name} (×${i.quantity})`).join(', '),
    total: o.totalAmount,
    status: o.status.toLowerCase() as 'pending' | 'confirmed' | 'delivering' | 'completed' | 'cancelled',
  }));

  const profile = profileResult.user ? {
    name: profileResult.user.name || '',
    email: profileResult.user.email,
    phone: profileResult.user.phone || '',
    joinedDate: profileResult.user.createdAt.toLocaleDateString('vi-VN'),
  } : {
    name: session.user.name || '',
    email: session.user.email || '',
    phone: '',
    joinedDate: '',
  };

  return (
    <DashboardClient
      userName={profile.name}
      userEmail={profile.email}
      userPhone={profile.phone}
      joinedDate={profile.joinedDate}
      orders={orders}
    />
  );
}
