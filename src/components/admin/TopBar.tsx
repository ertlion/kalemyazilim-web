"use client";

import { useRouter } from "next/navigation";
import { LogOut, User } from "lucide-react";

interface TopBarProps {
  adminName: string;
}

export default function TopBar({ adminName }: TopBarProps) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div>
        <h2 className="text-lg font-semibold text-[#34373f]">Yönetim Paneli</h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <User className="w-4 h-4" />
          <span>{adminName}</span>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-600 transition"
        >
          <LogOut className="w-4 h-4" />
          <span>Çıkış</span>
        </button>
      </div>
    </header>
  );
}
