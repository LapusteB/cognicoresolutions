import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

type Payload = {
  name?: string;
  email?: string;
  company?: string;
  topic?: string;
  message?: string;
};

const TO = process.env.CONTACT_TO ?? "team@cognicoresolutions.com";
// Resend requires a verified sender; override once cognicoresolutions.com is
// verified in the Resend dashboard.
const FROM =
  process.env.CONTACT_FROM ?? "Cognicore Website <onboarding@resend.dev>";

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const message = body.message?.trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 }
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "That email address doesn't look valid." },
      { status: 400 }
    );
  }
  if (message.length > 10000) {
    return NextResponse.json(
      { error: "Message is too long." },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Sending is temporarily unavailable." },
      { status: 503 }
    );
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: FROM,
    to: [TO],
    replyTo: email,
    subject: `Website inquiry — ${name}${body.company ? ` (${body.company.trim()})` : ""}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      body.company?.trim() ? `Company: ${body.company.trim()}` : null,
      body.topic ? `Topic: ${body.topic}` : null,
      "",
      message,
    ]
      .filter((l): l is string => l !== null)
      .join("\n"),
  });

  if (error) {
    return NextResponse.json(
      { error: "The message didn't go through." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
