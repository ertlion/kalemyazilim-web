import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const posts = await prisma.post.findMany({
    include: { translations: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const { slug, coverImage, published, translations } = body;

    const post = await prisma.post.create({
      data: {
        slug,
        coverImage: coverImage || null,
        published: published || false,
        publishedAt: published ? new Date() : null,
        translations: {
          create: (translations || []).map((t: { locale: string; title: string; excerpt?: string; content?: string; metaTitle?: string; metaDescription?: string }) => ({
            locale: t.locale,
            title: t.title,
            excerpt: t.excerpt || "",
            content: t.content || "",
            metaTitle: t.metaTitle || "",
            metaDescription: t.metaDescription || "",
          })),
        },
      },
      include: { translations: true },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error("Post create error:", error);
    return NextResponse.json({ error: "Yazı oluşturulurken hata oluştu" }, { status: 500 });
  }
}
