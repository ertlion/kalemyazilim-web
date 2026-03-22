import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const products = await prisma.product.findMany({
    include: { translations: true },
    orderBy: { sortOrder: "asc" },
  });

  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const { slug, icon, coverImage, category, sortOrder, published, translations } = body;

    const product = await prisma.product.create({
      data: {
        slug,
        icon: icon || null,
        coverImage: coverImage || null,
        category: category || "pos",
        sortOrder: sortOrder || 0,
        published: published !== false,
        translations: {
          create: (translations || []).map((t: { locale: string; title: string; shortDescription?: string; description?: string; features?: string; metaTitle?: string; metaDescription?: string }) => ({
            locale: t.locale,
            title: t.title,
            shortDescription: t.shortDescription || "",
            description: t.description || "",
            features: t.features || "[]",
            metaTitle: t.metaTitle || "",
            metaDescription: t.metaDescription || "",
          })),
        },
      },
      include: { translations: true },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("Product create error:", error);
    return NextResponse.json({ error: "Ürün oluşturulurken hata oluştu" }, { status: 500 });
  }
}
