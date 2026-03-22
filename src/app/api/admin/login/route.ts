import { NextResponse } from "next/server";
import { loginAdmin } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "E-posta ve parola gereklidir" },
        { status: 400 }
      );
    }

    const admin = await loginAdmin(email, password);

    if (!admin) {
      return NextResponse.json(
        { error: "Geçersiz e-posta veya parola" },
        { status: 401 }
      );
    }

    return NextResponse.json({ success: true, admin });
  } catch {
    return NextResponse.json(
      { error: "Giriş sırasında bir hata oluştu" },
      { status: 500 }
    );
  }
}
