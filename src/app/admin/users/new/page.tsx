import { UserForm } from "@/components/admin/UserForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thêm Người Dùng | Admin",
};

export default function NewUserPage() {
  return <UserForm mode="create" />;
}
