import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email and message required" },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const adminEmail = process.env.ADMIN_EMAIL;

    if (!resendApiKey || !adminEmail) {
      return NextResponse.json(
        {
          success: false,
          error: "Email env missing. Message saved but email not sent.",
        },
        { status: 200 }
      );
    }

    const resend = new Resend(resendApiKey);

    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: adminEmail,
      subject: `New message from ${name}`,
      replyTo: email,
      html: `
        <h2>New Portfolio Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log("Contact API error:", error);

    return NextResponse.json(
      { success: false, error: "Email send failed" },
      { status: 200 }
    );
  }
}