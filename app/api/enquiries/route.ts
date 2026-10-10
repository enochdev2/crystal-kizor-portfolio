import { NextResponse } from "next/server";

export const runtime = "nodejs";

const allowedIntents = new Set([
  "Architecture / interior project",
  "Speaking engagement",
  "Partnership / collaboration",
  "Education / media",
  "General enquiry",
]);

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const rateLimit = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function cleanLine(value: unknown, max: number) {
  return clean(value, max).replace(/[\r\n]+/g, " ");
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const attempts = (rateLimit.get(ip) || []).filter((time) => now - time < WINDOW_MS);
  attempts.push(now);
  rateLimit.set(ip, attempts);
  return attempts.length > MAX_REQUESTS;
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") || "0");
  if (contentLength > 25_000) {
    return NextResponse.json({ message: "Form submission is too large." }, { status: 413 });
  }

  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host) {
    try {
      if (new URL(origin).host !== host) {
        return NextResponse.json({ message: "Invalid form origin." }, { status: 403 });
      }
    } catch {
      return NextResponse.json({ message: "Invalid form origin." }, { status: 403 });
    }
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { message: "Too many attempts. Please wait a few minutes and try again." },
      { status: 429 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ message: "Invalid form submission." }, { status: 400 });
  }

  // Bot trap. Return success without sending so automated submissions do not
  // learn which anti-spam rule they triggered.
  if (clean(body.companyWebsite, 200)) {
    return NextResponse.json({ message: "Thank you. Your enquiry has been sent." });
  }

  const name = cleanLine(body.name, 80);
  const email = cleanLine(body.email, 160).toLowerCase();
  const organisation = cleanLine(body.organisation, 120);
  const intent = cleanLine(body.intent, 80);
  const message = clean(body.message, 2000);

  if (
    name.length < 2 ||
    !emailPattern.test(email) ||
    !allowedIntents.has(intent) ||
    message.length < 20
  ) {
    return NextResponse.json(
      { message: "Please check the required fields and try again." },
      { status: 400 },
    );
  }

  const resendKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.ENQUIRY_TO_EMAIL;
  const fromEmail = process.env.ENQUIRY_FROM_EMAIL;
  const webhookUrl = process.env.ENQUIRY_WEBHOOK_URL;

  if (webhookUrl) {
    try {
      const parsedWebhook = new URL(webhookUrl);
      if (parsedWebhook.protocol !== "https:" && process.env.NODE_ENV === "production") {
        throw new Error("ENQUIRY_WEBHOOK_URL must use HTTPS in production.");
      }
    } catch {
      return NextResponse.json(
        { message: "The enquiry delivery configuration is invalid." },
        { status: 503 },
      );
    }
  }

  const payload = {
    name,
    email,
    organisation,
    intent,
    message,
    submittedAt: new Date().toISOString(),
  };

  try {
    if (resendKey && toEmail && fromEmail) {
      const resendResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [toEmail],
          reply_to: email,
          subject: `[Crystal Kizor enquiry] ${intent} — ${name}`,
          text: [
            `Intent: ${intent}`,
            `Name: ${name}`,
            `Email: ${email}`,
            `Organisation: ${organisation || "Not provided"}`,
            "",
            message,
          ].join("\n"),
          html: `
            <h2>New Crystal Kizor website enquiry</h2>
            <p><strong>Intent:</strong> ${escapeHtml(intent)}</p>
            <p><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p><strong>Organisation:</strong> ${escapeHtml(organisation || "Not provided")}</p>
            <p><strong>Message:</strong></p>
            <p>${escapeHtml(message).replaceAll("\n", "<br />")}</p>
          `,
        }),
      });

      if (!resendResponse.ok) {
        throw new Error("Email delivery provider rejected the request.");
      }
    } else if (webhookUrl) {
      const webhookResponse = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!webhookResponse.ok) {
        throw new Error("Enquiry webhook rejected the request.");
      }
    } else {
      return NextResponse.json(
        {
          message:
            "The enquiry form is not configured yet. For architecture projects, please use the Studio COKA link below.",
        },
        { status: 503 },
      );
    }
  } catch (error) {
    console.error("Enquiry delivery failed", error instanceof Error ? error.message : error);
    return NextResponse.json(
      { message: "We could not send your enquiry right now. Please try again shortly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ message: "Thank you. Your enquiry has been sent." });
}
