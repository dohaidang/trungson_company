import { AdminDashboardClient } from '@/components/admin/AdminDashboardClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Preview | Trung Sơn Company',
};

// Temporary preview route - no auth required
// Delete this file when database is configured
export default function AdminPreviewPage() {
  return <AdminDashboardClient />;
}
