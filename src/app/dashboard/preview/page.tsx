import { redirect } from 'next/navigation';

// Preview route no longer needed — database is configured
// Redirect to the real dashboard page
export default function DashboardPreviewPage() {
  redirect('/dashboard');
}
