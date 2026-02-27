import { redirect } from 'next/navigation';

// Preview route no longer needed — database is configured
// Redirect to the real admin page
export default function AdminPreviewPage() {
  redirect('/admin');
}
