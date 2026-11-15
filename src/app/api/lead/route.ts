/**
 * POST /api/lead — receives the contact form (src/components/lead-form.tsx).
 *
 * LEAD_WEBHOOK_URL contract
 * -------------------------
 * This route stores nothing itself. Set the environment variable LEAD_WEBHOOK_URL
 * to an HTTPS endpoint that accepts `POST` with `Content-Type: application/json`
 * (an automation hook, a spreadsheet script, a CRM intake URL). Every accepted
 * lead is forwarded to it as one JSON object:
 *
 *   { reference, receivedAt, name, business, email, phone,
 *     interest, locations, message, pageUrl, userAgent }
 *
 * - `reference` is the "AB-XXXXXX" code the visitor is shown; `receivedAt` is an
 *   ISO 8601 timestamp. All other values are trimmed strings of at most 2000 characters.
 * - The endpoint must answer with a 2xx status within 8 seconds. A non-2xx answer,
 *   a timeout or a network error is reported to the visitor as a failure (502), so a
 *   lead is never lost silently.
 * - While LEAD_WEBHOOK_URL is not set, real submissions are answered with 503 and the
 *   visitor is told to email or call. The route never claims a lead it did not deliver.
 * - Submissions that trip a spam check (the hidden `fax_ext` field is filled, or the
 *   form was sent less than 1.5 seconds after it appeared) get an ordinary-looking
 *   200 and are not forwarded.
 */

const EMAIL_PATTERN = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const MAX_FIELD_LENGTH = 2000;
const MIN_ELAPSED_MS = 1500;
const WEBHOOK_TIMEOUT_MS = 8000;
const REFERENCE_ALPHABET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

type LeadResult = { ok: true; reference: string } | { ok: false; error: string };

const respond = (body: LeadResult, status: number) => Response.json(body, { status });

/** Any incoming value as a trimmed, length-limited string. Non-strings become "". */
const clean = (value: unknown) => (typeof value === "string" ? value.trim().slice(0, MAX_FIELD_LENGTH) : "");

/** "AB-" followed by 6 uppercase base-36 characters, e.g. AB-7K2QX9. */
function createReference() {
  const bytes = crypto.getRandomValues(new Uint8Array(6));
  return `AB-${Array.from(bytes, (byte) => REFERENCE_ALPHABET[byte % REFERENCE_ALPHABET.length]).join("")}`;
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    const parsed: unknown = await request.json();
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) throw new Error("Body is not a JSON object");
    body = parsed as Record<string, unknown>;
  } catch {
    return respond({ ok: false, error: "Something went wrong. Please email or call us instead." }, 400);
  }

  const name = clean(body.name);
  const email = clean(body.email);
  if (!name) return respond({ ok: false, error: "Please tell us your name." }, 400);
  if (!EMAIL_PATTERN.test(email)) return respond({ ok: false, error: "That email address does not look right." }, 400);

  const reference = createReference();

  // Spam: accept it so the sender learns nothing, and stop here.
  const honeypot = body.fax_ext;
  const honeypotFilled = typeof honeypot === "string" ? honeypot.trim() !== "" : honeypot != null;
  const tooFast = typeof body.elapsedMs === "number" && body.elapsedMs < MIN_ELAPSED_MS;
  if (honeypotFilled || tooFast) return respond({ ok: true, reference }, 200);

  const webhookUrl = process.env.LEAD_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("Lead not delivered: LEAD_WEBHOOK_URL is not set.");
    return respond({ ok: false, error: "The form is not connected yet. Please email or call us instead." }, 503);
  }

  const lead = {
    reference,
    receivedAt: new Date().toISOString(),
    name,
    business: clean(body.business),
    email,
    phone: clean(body.phone),
    interest: clean(body.interest),
    locations: clean(body.locations),
    message: clean(body.message),
    pageUrl: clean(body.pageUrl),
    userAgent: clean(request.headers.get("user-agent")),
  };

  try {
    const delivery = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
      signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS),
    });
    if (!delivery.ok) throw new Error(`Webhook answered ${delivery.status}`);
  } catch (error) {
    // Log the reference only; the lead's contents stay out of the server log.
    console.error(`Lead ${reference} not delivered:`, error instanceof Error ? error.message : error);
    return respond({ ok: false, error: "We could not save your message. Please email or call us instead." }, 502);
  }

  return respond({ ok: true, reference }, 200);
}
