import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Ad, e-posta ve mesaj alanları zorunludur" },
        { status: 400 }
      );
    }

    const contactMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        phone: phone || "",
        company: company || "",
        subject: subject || "",
        message,
      },
    });

    // TODO: Optionally send email notification via nodemailer

    return NextResponse.json({ success: true, id: contactMessage.id });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Mesajınız gönderilirken bir hata oluştu" },
      { status: 500 }
    );
  }
}
