import { prisma } from "@/lib/db";
import { FileText, Package, Mail, Award } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const [postCount, productCount, messageCount, referenceCount, recentMessages, recentPosts] =
    await Promise.all([
      prisma.post.count(),
      prisma.product.count(),
      prisma.contactMessage.count(),
      prisma.reference.count(),
      prisma.contactMessage.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
      prisma.post.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        include: {
          translations: { where: { locale: "tr" } },
        },
      }),
    ]);

  const stats = [
    { label: "Yazılar", value: postCount, icon: FileText, href: "/admin/posts", color: "bg-blue-500" },
    { label: "Ürünler", value: productCount, icon: Package, href: "/admin/products", color: "bg-green-500" },
    { label: "Mesajlar", value: messageCount, icon: Mail, href: "/admin/messages", color: "bg-amber-500" },
    { label: "Referanslar", value: referenceCount, icon: Award, href: "/admin/references", color: "bg-purple-500" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#34373f]">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-3xl font-bold text-[#34373f] mt-1">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Messages */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="font-semibold text-[#34373f]">Son Mesajlar</h2>
            <Link href="/admin/messages" className="text-sm text-[#00accb] hover:underline">
              Tümünü Gör
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {recentMessages.length === 0 ? (
              <p className="p-4 text-sm text-gray-500">Henüz mesaj yok</p>
            ) : (
              recentMessages.map((msg) => (
                <div key={msg.id} className="p-4 flex items-center justify-between">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-gray-900 truncate">{msg.name}</p>
                      {!msg.read && (
                        <span className="inline-flex w-2 h-2 bg-[#00accb] rounded-full" />
                      )}
                    </div>
                    <p className="text-sm text-gray-500 truncate">{msg.subject || msg.message}</p>
                  </div>
                  <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
                    {new Date(msg.createdAt).toLocaleDateString("tr-TR")}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Posts */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="font-semibold text-[#34373f]">Son Yazılar</h2>
            <Link href="/admin/posts" className="text-sm text-[#00accb] hover:underline">
              Tümünü Gör
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {recentPosts.length === 0 ? (
              <p className="p-4 text-sm text-gray-500">Henüz yazı yok</p>
            ) : (
              recentPosts.map((post) => (
                <div key={post.id} className="p-4 flex items-center justify-between">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {post.translations[0]?.title || post.slug}
                    </p>
                    <span
                      className={`inline-flex px-2 py-0.5 text-xs rounded-full ${
                        post.published
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {post.published ? "Yayında" : "Taslak"}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
                    {new Date(post.createdAt).toLocaleDateString("tr-TR")}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
