import { UserForm } from "@/components/admin/UserForm";
import { getUserForEdit } from "@/app/actions/admin";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const { user } = await getUserForEdit(id);
  
  if (!user) {
    return { title: "Không tìm thấy người dùng | Admin" };
  }
  
  return { title: `Chỉnh sửa: ${user.name || user.email} | Admin` };
}

export default async function EditUserPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { user, error } = await getUserForEdit(id);

  if (error) {
    throw new Error(error);
  }

  if (!user) {
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
