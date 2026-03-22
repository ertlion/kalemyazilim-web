import { prisma } from "@/lib/db";
import Link from "next/link";
import { Edit, FileStack } from "lucide-react";

export default async function PagesListPage() {
  const pages = await prisma.page.findMany({
    include: {
      translations: { where: { locale: "tr" } },
    },
    orderBy: { createdAt: "asc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#34373f]">Sayfalar</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {pages.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <FileStack className="w-12 h-12 mx-auto text-gray-300 mb-3" />
            <p>Henüz sayfa yok</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Sayfa</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Slug</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Güncelleme</th>
                <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {pages.map((page) => (
                <tr key={page.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/pages/${page.id}`}
                      className="text-sm font-medium text-gray-900 hover:text-[#00accb]"
                    >
                      {page.translations[0]?.title || page.slug}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{page.slug}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(page.updatedAt).toLocaleDateString("tr-TR")}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/pages/${page.id}`}
                      className="p-2 text-gray-400 hover:text-[#00accb] transition inline-flex"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
