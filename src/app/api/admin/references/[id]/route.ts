import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  try {
    const body = await request.json();
    const { name, logo, website, sortOrder } = body;

    const reference = await prisma.reference.update({
      where: { id },
      data: {
        name,
        logo: logo || null,
        website: website || null,
        sortOrder: sortOrder || 0,
      },
    });

    return NextResponse.json(reference);
  } catch {
    return NextResponse.json({ error: "Referans güncellenirken hata oluştu" }, { status: 500 });
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
    await prisma.reference.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Referans silinirken hata oluştu" }, { status: 500 });
  }
}
