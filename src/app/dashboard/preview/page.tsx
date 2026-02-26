import { DashboardClient } from '@/components/dashboard/DashboardClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard Preview | Trung Sơn Company',
};

// Temporary preview route - no auth required
// Delete this file when database is configured
export default function DashboardPreviewPage() {
  return (
    <DashboardClient
      userName="Nguyễn Văn A"
      userEmail="nguyenvana@example.com"
    />
  );
}
