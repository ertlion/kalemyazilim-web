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
  const product = await prisma.product.findUnique({
    where: { id },
    include: { translations: true },
  });

  if (!product) return NextResponse.json({ error: "Ürün bulunamadı" }, { status: 404 });

  return NextResponse.json(product);
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
    const { slug, icon, coverImage, category, sortOrder, published, translations } = body;

    await prisma.product.update({
      where: { id },
      data: {
        slug,
        icon: icon || null,
        coverImage: coverImage || null,
        category: category || "pos",
        sortOrder: sortOrder || 0,
        published: published !== false,
      },
    });

    if (translations && Array.isArray(translations)) {
      for (const t of translations as { locale: string; title: string; shortDescription?: string; description?: string; features?: string; metaTitle?: string; metaDescription?: string }[]) {
        await prisma.productTranslation.upsert({
          where: { productId_locale: { productId: id, locale: t.locale } },
          update: {
            title: t.title,
            shortDescription: t.shortDescription || "",
            description: t.description || "",
            features: t.features || "[]",
            metaTitle: t.metaTitle || "",
            metaDescription: t.metaDescription || "",
          },
          create: {
            productId: id,
            locale: t.locale,
            title: t.title,
            shortDescription: t.shortDescription || "",
            description: t.description || "",
            features: t.features || "[]",
            metaTitle: t.metaTitle || "",
            metaDescription: t.metaDescription || "",
          },
        });
      }
    }

    const updated = await prisma.product.findUnique({
      where: { id },
      include: { translations: true },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Product update error:", error);
    return NextResponse.json({ error: "Ürün güncellenirken hata oluştu" }, { status: 500 });
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
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Ürün silinirken hata oluştu" }, { status: 500 });
  }
}
