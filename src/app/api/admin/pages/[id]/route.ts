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
  const page = await prisma.page.findUnique({
    where: { id },
    include: { translations: true },
  });

  if (!page) return NextResponse.json({ error: "Sayfa bulunamadı" }, { status: 404 });

  return NextResponse.json(page);
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
    const { translations } = body;

    if (translations && Array.isArray(translations)) {
      for (const t of translations as { locale: string; title: string; content?: string; metaTitle?: string; metaDescription?: string }[]) {
        await prisma.pageTranslation.upsert({
          where: { pageId_locale: { pageId: id, locale: t.locale } },
          update: {
            title: t.title,
            content: t.content || "",
            metaTitle: t.metaTitle || "",
            metaDescription: t.metaDescription || "",
          },
          create: {
            pageId: id,
            locale: t.locale,
            title: t.title,
            content: t.content || "",
            metaTitle: t.metaTitle || "",
            metaDescription: t.metaDescription || "",
          },
        });
      }
    }

    const updated = await prisma.page.findUnique({
      where: { id },
      include: { translations: true },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Page update error:", error);
    return NextResponse.json({ error: "Sayfa güncellenirken hata oluştu" }, { status: 500 });
  }
}
