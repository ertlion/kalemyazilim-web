import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { unlink } from "fs/promises";
import path from "path";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  try {
    const media = await prisma.media.findUnique({ where: { id } });
    if (!media) return NextResponse.json({ error: "Medya bulunamadı" }, { status: 404 });

    // Delete file from disk
    try {
      const filePath = path.join(process.cwd(), "public", media.path);
      await unlink(filePath);
    } catch {
      // File may not exist, continue with DB deletion
    }

    await prisma.media.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Medya silinirken hata oluştu" }, { status: 500 });
  }
}
