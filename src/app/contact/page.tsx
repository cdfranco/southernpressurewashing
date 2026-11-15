import type { Metadata } from "next";
import { Suspense, type ReactNode } from "react";
import { FaqList, type FaqItem } from "@/components/faq";
import { Icon } from "@/components/icons";
import { LeadForm } from "@/components/lead-form";
import { PageHeader } from "@/components/page-header";
import { Section, SectionHeader } from "@/components/section";
import { brand } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get a free draft of your board, ask for a quote, or request a pilot proposal for your chain. (706) 521-4024 · cdfranco@gmail.com · Athens, Georgia.",
};

const linkClass = "font-semibold text-brand-700 underline-offset-4 hover:underline";

const facts: { label: string; icon: string; body: ReactNode }[] = [
  {
    label: "Phone",
    icon: "phone",
    body: (
      <>
        <a href={brand.phoneHref} className={linkClass}>
          {brand.phone}
        </a>{" "}
        — call or text; we answer during business hours and return every voicemail the same business day
      </>
    ),
  },
  {
    label: "Email",
    icon: "envelope",
    body: (
      <a href={`mailto:${brand.email}`} className={linkClass}>
        {brand.email}
      </a>
    ),
  },
  {
    label: "Based in",
    icon: "map-pin",
    body: "Athens, Georgia · installs within 60 miles by our own technician; nationwide through a field-technician marketplace",
  },
  {
    label: "What happens next",
    icon: "clock",
    body: "We reply within one business day, usually the same afternoon. Local businesses get a draft board link in about three days. Chains get a pilot proposal and a brand board to review.",
  },
];

const faqs: FaqItem[] = [
  {
    question: "What does the free draft include?",
    answer: (
      <p>
        {
          "A working board — not a mockup — built from your website or menu in your brand, with a private link you can open on your phone, laptop or a TV. It's the same board that would go on the wall, before the corrections round."
        }
      </p>
    ),
  },
  {
    question: "Do you work outside Athens?",
    answer: (
      <p>
        Yes. Design and support are remote, so the board is the same anywhere. Installation is by our own technician within about
        60 miles of Athens, and by field technicians dispatched through a marketplace elsewhere at a small travel or per-site fee.
        Chain rollouts are installed nationwide.
      </p>
    ),
  },
  {
    question: "Can I advertise on a board near me?",
    answer: (
      <p>
        {
          'Some independent boards will carry a small rotating panel for two or three local partners, sold by zone once a neighborhood has enough screens. Pick "Advertising on a board" above and tell us where you are; we\'ll tell you when your zone opens and what it costs.'
        }
      </p>
    ),
  },
  {
    question: "I'm a franchisee, not the franchisor. Can I do this for my stores?",
    answer: (
      <p>
        {
          "Usually, yes, if your brand allows guest-facing screens in your unit. We'll build the board to your brand standards, and if your franchisor wants to review it we'll present it with you. Multi-unit franchisees are priced on the same bands as a chain — 10–49 or 50–199 locations — and can run the pilot themselves."
        }
      </p>
    ),
  },
];

/** Placeholder with the form's footprint, shown until the form (which reads the query string) is ready. */
function LeadFormFallback() {
  const field = "h-[4.6rem] rounded-[10px] bg-mist";
  return (
    <div>
      <p className="sr-only">Loading the contact form…</p>
      <div aria-hidden="true" className="grid animate-pulse gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className={field} />
          <div className={field} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className={field} />
          <div className={field} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className={field} />
          <div className={field} />
        </div>
        <div className="h-[9.2rem] rounded-[10px] bg-mist" />
        <div className="h-14 rounded-[10px] bg-mist" />
        <div className="h-10 rounded-[10px] bg-mist" />
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <>
      <PageHeader
        kicker="Contact"
        title="Tell us about the wall."
        description={
          "Send your website or a photo of your menu and we'll build a draft board at no charge. Prefer to talk? Call or text — Caleb Franco answers."
        }
      />

      <Section tone="paper">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <ul className="space-y-7">
              {facts.map((fact) => (
                <li key={fact.label} className="flex gap-4">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                    <Icon name={fact.icon} className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-display text-[1.05rem] font-bold leading-snug text-ink-900">{fact.label}</p>
                    <p className="mt-1.5 text-[15px] leading-relaxed">{fact.body}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-10 rounded-2xl border border-line bg-white p-7">
              <h2 className="text-xl font-bold">Already have a board with us?</h2>
              <p className="mt-2.5 text-[15px] leading-relaxed">
                Text or email your change and it&apos;s handled under your plan. For a dark screen, call — that&apos;s the fast
                path.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-line bg-white p-6 shadow-card sm:p-8">
            <Suspense fallback={<LeadFormFallback />}>
              <LeadForm />
            </Suspense>
          </div>
        </div>
      </Section>

      <Section id="faq" tone="white">
        <SectionHeader kicker="FAQ" title="Before you write." />
        <FaqList items={faqs} className="mx-auto mt-10 max-w-3xl sm:mt-12" />
      </Section>
    </>
  );
}
