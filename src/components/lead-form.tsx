"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { type FormEvent, type ReactNode, useEffect, useRef, useState } from "react";
import { Button } from "./button";
import { Icon } from "./icons";

const interestOptions = [
  { value: "demo", label: "A free draft board + demo" },
  { value: "pricing", label: "A quote for one location" },
  { value: "franchise", label: "A pilot for a chain or franchise" },
  { value: "ads", label: "Advertising on a board" },
  { value: "other", label: "Something else" },
];

const locationOptions = [
  { value: "1", label: "1" },
  { value: "2-9", label: "2–9" },
  { value: "10-49", label: "10–49" },
  { value: "50-199", label: "50–199" },
  { value: "200-599", label: "200–599" },
  { value: "600+", label: "600+" },
];

const defaultInterest = interestOptions[0].value;
const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const inputClass =
  "w-full rounded-[10px] border border-slate-300 bg-white px-4 py-3 text-[15px] text-ink-900 placeholder:text-slate-400 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500/25 aria-[invalid=true]:border-red-500";

type Status = { kind: "ok" | "err"; text: string };
type LeadResponse = { ok?: boolean; reference?: string; error?: string };

/** Label above a control. The control is pinned to the bottom so a wrapped label never misaligns a two-column row. */
function Field({ id, label, children }: { id: string; label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="mb-1.5 block text-[13.5px] font-semibold leading-snug text-ink-900">
        {label}
      </label>
      <div className="mt-auto">{children}</div>
    </div>
  );
}

/**
 * The contact form. Posts JSON to /api/lead and reports the result in a live
 * status line. `?i=<interest>` preselects the interest field and `?plan=<name>`
 * starts the message, so links from the pricing and chain pages land prefilled.
 */
export function LeadForm() {
  const searchParams = useSearchParams();

  const [interest, setInterest] = useState(() => {
    const requested = searchParams.get("i");
    return requested && interestOptions.some((option) => option.value === requested) ? requested : defaultInterest;
  });
  const [message, setMessage] = useState(() => {
    const plan = searchParams.get("plan");
    return plan ? `Interested in the ${plan.charAt(0).toUpperCase()}${plan.slice(1)} care plan — ` : "";
  });
  const [status, setStatus] = useState<Status | null>(null);
  const [invalid, setInvalid] = useState<"name" | "email" | null>(null);
  const [sending, setSending] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  // When the form appeared, so the server can ignore submissions no person could have typed that fast.
  const startedAt = useRef(0);
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const nameEl = nameRef.current;
    const emailEl = emailRef.current;

    setInvalid(null);
    if (nameEl && !nameEl.value.trim()) {
      setStatus({ kind: "err", text: "Please tell us your name." });
      setInvalid("name");
      nameEl.focus();
      return;
    }
    if (emailEl && !emailPattern.test(emailEl.value.trim())) {
      setStatus({ kind: "err", text: "That email address does not look right." });
      setInvalid("email");
      emailEl.focus();
      return;
    }

    // Read the fields from the form itself so autofilled and honeypot values are included as the browser holds them.
    const data = {
      ...Object.fromEntries(new FormData(form).entries()),
      elapsedMs: Date.now() - startedAt.current,
      pageUrl: window.location.href,
    };

    setStatus(null);
    setSending(true);
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result: LeadResponse = (await response.json().catch(() => null)) ?? {};
      if (response.ok && result.ok) {
        form.reset();
        setInterest(defaultInterest);
        setMessage("");
        setStatus({
          kind: "ok",
          text: `Got it — thank you. We reply within one business day, usually the same afternoon. Reference ${result.reference}.`,
        });
      } else {
        const text = result.error || "Something went wrong. Please email or call us instead.";
        setStatus({ kind: "err", text });
        // The server repeats the two field checks; point at the field it rejected.
        if (/email address/i.test(text)) {
          setInvalid("email");
          emailEl?.focus();
        } else if (/your name/i.test(text)) {
          setInvalid("name");
          nameEl?.focus();
        }
      }
    } catch {
      setStatus({ kind: "err", text: "Could not reach the server. Please email or call us instead." });
    }
    setSending(false);
  }

  return (
    <form onSubmit={handleSubmit} className="relative grid gap-4">
      {/* Honeypot: people never see or reach this field; anything typed here marks the submission as spam. */}
      <input
        className="absolute left-[-9999px] h-0 overflow-hidden opacity-0"
        type="text"
        name="fax_ext"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="f-name" label="Your name (required)">
          <input
            ref={nameRef}
            id="f-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={invalid === "name" ? true : undefined}
            className={inputClass}
          />
        </Field>
        <Field id="f-business" label="Business or brand">
          <input id="f-business" name="business" type="text" autoComplete="organization" className={inputClass} />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="f-email" label="Email (required)">
          <input
            ref={emailRef}
            id="f-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={invalid === "email" ? true : undefined}
            className={inputClass}
          />
        </Field>
        <Field id="f-phone" label="Phone — if a text back is easier">
          <input id="f-phone" name="phone" type="tel" autoComplete="tel" className={inputClass} />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="f-interest" label="I'm interested in">
          <select
            id="f-interest"
            name="interest"
            value={interest}
            onChange={(event) => setInterest(event.target.value)}
            className={inputClass}
          >
            {interestOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>
        <Field id="f-locations" label="Number of locations">
          <select id="f-locations" name="locations" className={inputClass}>
            {locationOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field id="f-message" label="Your website, or anything else we should know">
        <textarea
          id="f-message"
          name="message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder={'e.g. yourrestaurant.com — we have a 55" TV in the entry that\'s just showing cable right now'}
          className={`${inputClass} block min-h-[120px] resize-y`}
        />
      </Field>

      <Button type="submit" size="lg" disabled={sending}>
        {sending ? (
          "Sending…"
        ) : (
          <>
            Send — start my free draft
            <Icon name="arrow-right" className="h-4 w-4" strokeWidth={2.4} />
          </>
        )}
      </Button>

      <div>
        <p className="text-[13.5px] leading-relaxed text-slate-500">
          No newsletter, no spam. We&apos;ll only use this to reply, and we keep your IP address for spam control.{" "}
          <Link href="/privacy" className="underline underline-offset-2 hover:text-ink-900">
            Privacy
          </Link>
          .
        </p>
        <div
          role="status"
          aria-live="polite"
          className={
            status
              ? `mt-4 rounded-[10px] px-4 py-3.5 text-[15px] leading-relaxed ${
                  status.kind === "ok" ? "bg-green-500/10 text-green-800" : "bg-red-500/10 text-red-800"
                }`
              : undefined
          }
        >
          {status?.text}
        </div>
      </div>
    </form>
  );
}
