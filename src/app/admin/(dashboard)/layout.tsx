import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth";
import Sidebar from "@/components/admin/Sidebar";
import TopBar from "@/components/admin/TopBar";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getCurrentAdmin();

  if (!admin) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopBar adminName={admin.name} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
