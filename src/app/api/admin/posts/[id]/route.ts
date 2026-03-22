import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const post = await prisma.post.findUnique({
    where: { id },
    include: { translations: true },
  });

  if (!post) return NextResponse.json({ error: "Yazı bulunamadı" }, { status: 404 });

  return NextResponse.json(post);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  try {
    const body = await request.json();
    const { slug, coverImage, published, translations } = body;

    const existing = await prisma.post.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: "Yazı bulunamadı" }, { status: 404 });

    const post = await prisma.post.update({
      where: { id },
      data: {
        slug,
        coverImage: coverImage || null,
        published: published || false,
        publishedAt: published && !existing.publishedAt ? new Date() : existing.publishedAt,
      },
    });

    if (translations && Array.isArray(translations)) {
      for (const t of translations as { locale: string; title: string; excerpt?: string; content?: string; metaTitle?: string; metaDescription?: string }[]) {
        await prisma.postTranslation.upsert({
          where: { postId_locale: { postId: id, locale: t.locale } },
          update: {
            title: t.title,
            excerpt: t.excerpt || "",
            content: t.content || "",
            metaTitle: t.metaTitle || "",
            metaDescription: t.metaDescription || "",
          },
          create: {
            postId: id,
            locale: t.locale,
            title: t.title,
            excerpt: t.excerpt || "",
            content: t.content || "",
            metaTitle: t.metaTitle || "",
            metaDescription: t.metaDescription || "",
          },
        });
      }
    }

    const updated = await prisma.post.findUnique({
      where: { id },
      include: { translations: true },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Post update error:", error);
    return NextResponse.json({ error: "Yazı güncellenirken hata oluştu" }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  try {
    await prisma.post.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Yazı silinirken hata oluştu" }, { status: 500 });
  }
}
