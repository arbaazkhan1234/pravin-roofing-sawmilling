import { NextResponse } from "next/server";

// TODO before launch: wire this to a real email/CRM delivery (e.g. Resend,
// SendGrid, or a WhatsApp Business API webhook) using an API key the client
// provides. Right now it only logs server-side and confirms receipt to the
// browser — no notification actually reaches Pravin yet.
export async function POST(request: Request) {
  const body = await request.json();

  const { name, phone, productInterest, message } = body ?? {};

  if (!name || !phone || !productInterest) {
    return NextResponse.json(
      { error: "Missing required fields." },
      { status: 400 }
    );
  }

  console.log("[quote-request]", { name, phone, productInterest, message });

  return NextResponse.json({ ok: true });
}
