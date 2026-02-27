import { UserForm } from "@/components/admin/UserForm";
import { getUserForEdit } from "@/app/actions/admin";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chỉnh Sửa Người Dùng | Admin",
};

export default async function EditUserPage({ params }: { params: { id: string } }) {
  const { user, error } = await getUserForEdit(params.id);

  if (error || !user) {
    notFound();
  }

  const initialData = {
    name: user.name || "",
    email: user.email,
    phone: user.phone || "",
    role: user.role,
  };

  return <UserForm mode="edit" userId={user.id} initialData={initialData} />;
}
