import type { APIRoute } from "astro";

const limits = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 5;

function clean(value: FormDataEntryValue | null, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function json(message: string, status: number) {
  return new Response(JSON.stringify({ message }), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const contentType = request.headers.get("content-type") || "";
  if (
    !contentType.includes("multipart/form-data") &&
    !contentType.includes("application/x-www-form-urlencoded")
  ) {
    return json("Unsupported request.", 415);
  }

  const now = Date.now();
  const key = clientAddress || "unknown";
  const existing = limits.get(key);
  const limit =
    !existing || existing.resetAt < now
      ? { count: 0, resetAt: now + WINDOW_MS }
      : existing;
  limit.count += 1;
  limits.set(key, limit);
  if (limit.count > MAX_REQUESTS)
    return json("Please wait before trying again.", 429);

  const form = await request.formData();
  if (clean(form.get("website"), 200)) return json("Thanks.", 200);

  const name = clean(form.get("name"), 100);
  const email = clean(form.get("email"), 160);
  const company = clean(form.get("company"), 140);
  const reason = clean(form.get("reason"), 40);
  const message = clean(form.get("message"), 2000);
  const consent = clean(form.get("consent"), 10);
  const allowedReasons = new Set([
    "support",
    "partnership",
    "press",
    "general",
  ]);

  if (
    !name ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    !allowedReasons.has(reason) ||
    message.length < 10 ||
    consent !== "yes"
  ) {
    return json("Please check the form and try again.", 400);
  }

  const endpoint = import.meta.env.CONTACT_DELIVERY_ENDPOINT;
  const secret = import.meta.env.CONTACT_DELIVERY_SECRET;
  if (!endpoint) return json("Contact delivery is not configured.", 503);

  try {
    const upstream = await fetch(endpoint, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(secret ? { authorization: `Bearer ${secret}` } : {}),
      },
      body: JSON.stringify({
        name,
        email,
        company,
        reason,
        message,
        consent: true,
        source: "bridge.co/contact",
      }),
      signal: AbortSignal.timeout(8000),
    });

    if (!upstream.ok) return json("We could not send your message.", 502);
    return json("Message sent.", 200);
  } catch {
    return json("We could not send your message.", 502);
  }
};

export const ALL: APIRoute = () =>
  new Response(null, { status: 405, headers: { Allow: "POST" } });
