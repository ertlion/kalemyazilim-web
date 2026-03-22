import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const references = await prisma.reference.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return NextResponse.json(references);
}

export async function POST(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const { name, logo, website, sortOrder } = body;

    const reference = await prisma.reference.create({
      data: {
        name,
        logo: logo || null,
        website: website || null,
        sortOrder: sortOrder || 0,
      },
    });

    return NextResponse.json(reference);
  } catch (error) {
    console.error("Reference create error:", error);
    return NextResponse.json({ error: "Referans oluşturulurken hata oluştu" }, { status: 500 });
  }
}
