import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/button";
import { Feature, InfoCard } from "@/components/check-list";
import { CtaCard } from "@/components/cta-card";
import { DataTable } from "@/components/data-table";
import { Icon } from "@/components/icons";
import { PageHeader } from "@/components/page-header";
import { Section, SectionHeader } from "@/components/section";

export const metadata: Metadata = {
  title: "Security & trust",
  description:
    "How Athena Boards boards are built, hosted, secured and supported: outbound-only architecture, no guest data, self-contained boards, source escrow, published SLAs, and the vendor-onboarding pack procurement asks for.",
};

type Item = { title: string; body: string; icon?: string };

const architecture: Item[] = [
  {
    title: "The board is a single self-contained HTML file.",
    icon: "document",
    body: "Fonts, photos and content are packaged inside it. It is served from a content delivery network over HTTPS and cached on the device, so it keeps running when the internet drops.",
  },
  {
    title: "The device makes outbound HTTPS requests only.",
    icon: "arrow-up-right",
    body: "To our hosting domain for the board and to a weather service for the forecast. No inbound ports, no VPN, no remote desktop, no tunnel back to us.",
  },
  {
    title: "Nothing touches your POS or your card-holder network.",
    icon: "shield",
    body: "Players belong on the guest or IoT VLAN or a cellular router. Menu-price sync, when you want it, reads a public ordering menu or a feed you publish; it never connects to a POS terminal.",
  },
  {
    title: "No guest data. No cameras. No microphones.",
    icon: "users",
    body: "The board displays; it does not observe. Our kiosk app declares no camera, microphone, location or storage permissions. QR codes on the board point at your own links.",
  },
  {
    title: "Locked player.",
    icon: "lock",
    body: "Commercial panels run the board on their own signage OS. Where a device is used, it runs our single-purpose kiosk software: one URL, full screen, PIN-locked settings, Back button disabled, self-relaunching, reload on a schedule.",
  },
];

const dataFlow: [string, string, string][] = [
  ["Screen → our CDN", "HTTPS GET of the board page, every 30 minutes", "Pick up content changes"],
  ["Screen → weather API", "HTTPS GET, coordinates only, every 15 minutes", "Local forecast in the header"],
  ["Screen → our monitoring", "Heartbeat: device ID, app version, uptime, current URL", "Know it is on before you do"],
  ["You → us", "Content changes by email, text or the store form", "Keep the board current"],
  ["Us → you", "Preview links, uptime reports, invoices", "Approval and records"],
];

const continuity: Item[] = [
  {
    title: "Hosting",
    icon: "globe",
    body: "Boards are static files served from Vercel's global content delivery network over HTTPS. Vercel publishes its SOC 2 Type II and ISO 27001 attestations at vercel.com/security; we will attach the current reports to your security questionnaire. There is no application server between your screens and the content.",
  },
  {
    title: "Offline behavior",
    icon: "wifi",
    body: "The board is cached on the device. If the store's internet drops, the board keeps running with the last content; only the weather hides. When the connection returns, the next scheduled check-in picks up any changes. No one has to touch the screen.",
  },
  {
    title: "Monitoring",
    icon: "bell",
    body: "From the pilot's first install, every device checks in on a schedule with its version and status. A screen that misses check-ins raises an alert to us within 30 minutes on chain plans. You receive a read-only status view and a quarterly uptime report per location.",
  },
  {
    title: "Business continuity",
    icon: "shield",
    body: "Chain agreements include source escrow: if we cease operations you receive the board files, the fleet data and hosting instructions, and your boards keep running. Hardware title is yours on payment; there is nothing of ours you would need to return to keep operating.",
  },
  {
    title: "Content ownership",
    icon: "photo",
    body: "You own your content and brand assets. We own the software and license it to you for the term. Brand-locked templates keep HQ content out of reach of store logins; HQ can preview and approve every store-level change.",
  },
  {
    title: "Change control",
    icon: "refresh",
    body: "Every content change is versioned. Campaigns are scheduled with start and end dates and can be previewed on any date in advance. Rolling back is redeploying the previous version; every screen follows on its next check-in.",
  },
];

const serviceLevels: { commitment: string; chainPlan: ReactNode }[] = [
  {
    commitment: "Hosting availability",
    chainPlan: (
      <>
        <strong>99.5%</strong> monthly, measured at the CDN; credits 10% of the monthly per day below target, capped at 50%
      </>
    ),
  },
  {
    commitment: "Dark-screen response",
    chainPlan: (
      <>
        <strong>4 hours</strong> during business hours (7 AM – 7 PM local), next morning otherwise
      </>
    ),
  },
  {
    commitment: "Advance hardware replacement",
    chainPlan: (
      <>
        <strong>2 business days</strong> from our spare pool (two units held per fifty stores), shipped with a return label
      </>
    ),
  },
  {
    commitment: "Content changes",
    chainPlan: (
      <>
        Unlimited; <strong>2 business days</strong>; scheduled campaigns deploy at midnight local time on the date set
      </>
    ),
  },
  {
    commitment: "Offline alerting",
    chainPlan: (
      <>
        Alert raised to us within <strong>30 minutes</strong> of a missed check-in, respecting the panel&apos;s on/off schedule
      </>
    ),
  },
  {
    commitment: "Reporting",
    chainPlan: (
      <>
        Read-only status dashboard; <strong>quarterly uptime report</strong> per location
      </>
    ),
  },
  {
    commitment: "Support channels",
    chainPlan: "Phone, text and a ticket address; named account manager for chain accounts",
  },
];

const vendorPack: Item[] = [
  {
    title: "Entity & tax",
    icon: "office",
    body: "W-9 with EIN, DUNS number, ACH remittance form, Georgia sales-tax registration and resale certificate. Invoices submitted through your portal (Coupa, Ariba or email) against your PO.",
  },
  {
    title: "Insurance",
    icon: "shield",
    body: "Certificate of insurance on the ACORD 25 form with your entity as additional insured: general liability $1M per occurrence / $2M aggregate, installation floater, hired and non-owned auto, cyber and technology E&O. Field technicians carry their own general liability and workers' compensation.",
  },
  {
    title: "Paper",
    icon: "document",
    body: "Master services agreement, pilot statement of work, per-location order schedules, and SLA, security and insurance exhibits. Net-30 against a PO; 30% of each wave at order, balance on photo-verified acceptance; CPI escalator capped at 3%; convenience exit after month 12 with a hardware buy-out schedule.",
  },
  {
    title: "Security review",
    icon: "lock",
    body: "A one-page data-flow diagram, this page as the security summary, our hosting provider's SOC 2 report, and completed vendor security questionnaires (SIG Lite or your own). Remote patch and kill-switch obligations accepted in the security exhibit.",
  },
];

const hardware: Item[] = [
  {
    title: "Displays",
    icon: "tv",
    body: "Chain deployments use commercial signage panels (LG UR640S / Samsung QB class): 16/7 duty rating, 300–400 nits, native portrait, 3-year limited manufacturer warranty passed through to you. Consumer televisions are used only on local packages, by choice, and are labelled as such.",
  },
  {
    title: "Players",
    icon: "play",
    body: `On commercial panels the board runs from the display's own signage OS (LG "Play via URL", Samsung "URL Launcher"), so there is no separate device to fail, patch or steal; where a panel has no URL launcher we add a small single-purpose media box with no consumer apps and no accounts. Consumer streaming sticks are never deployed to a chain. Our boards are tested on each panel model before it is quoted.`,
  },
  {
    title: "Installation",
    icon: "wrench",
    body: "Identical pre-configured kits per location. Installed by insured field technicians dispatched through a national marketplace, from a one-page sheet; every ticket closes with a photo of the running board showing the store ID and the clock. Non-standard electrical or in-wall cabling is done by licensed contractors and quoted separately.",
  },
];

const notClaimed: Item[] = [
  {
    title: "We are a young company.",
    body: "Athena Boards was formed in 2026 in Athens, Georgia, by Caleb Franco, on the boards you see in the gallery. We do not have a decade of chain logos. What we have is every board live and inspectable, a per-location price you can read, and an agreement written so that a pilot costs you a few thousand dollars and no lock-in.",
  },
  {
    title: "We hold no certification of our own yet.",
    body: "Our hosting provider is SOC 2 Type II and ISO 27001 audited; we are not, and we will not imply otherwise. We answer security questionnaires in full, accept the security exhibit's obligations, and keep the architecture simple enough that the review is short.",
  },
  {
    title: "Installation is subcontracted outside Georgia.",
    body: "Within about 60 miles of Athens our own technician installs. Elsewhere we dispatch field technicians through a national marketplace, working from our kit and our sheet, and we remain the single point of accountability for the result.",
  },
  {
    title: "Demo boards are demonstrations.",
    body: "Boards in our gallery were designed for real businesses from their public menus and brands; some are on walls, some are proposals. A board's presence in the gallery is not an endorsement by that business, and the multi-location concept board is not a program of the chain shown.",
  },
];

export default function TrustPage() {
  return (
    <>
      <PageHeader
        kicker="Security & trust"
        title="Written for the people who have to say yes: IT, Legal, Purchasing."
        description={
          <>
            This page is the plain version of what we put in the security exhibit. Nothing on it is aspirational: it describes how
            the boards on our{" "}
            <Link href="/work" className="font-semibold text-brand-700 underline underline-offset-4 hover:text-brand-800">
              live gallery
            </Link>{" "}
            run today. Where a commitment depends on your contract (SLA credits, insurance limits, escrow), it says so.
          </>
        }
      />

      {/* Architecture */}
      <Section id="architecture" tone="white">
        <SectionHeader
          align="left"
          kicker="Architecture"
          title="One web page, loaded by one locked device, talking outbound only."
        />
        <div className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2">
          {architecture.map((item) => (
            <Feature key={item.title} title={item.title} icon={item.icon}>
              {item.body}
            </Feature>
          ))}
        </div>

        <div className="mt-16">
          <h3 className="font-display text-2xl font-bold leading-snug text-ink-900">Data flow, in one table</h3>
          <div className="mt-6">
            <DataTable
              caption="Data flow, in one table"
              minWidth="min-w-[36rem]"
              firstColumnWidth="w-[26%] min-w-[10rem]"
              head={["From → to", "What", "Why"]}
              rows={dataFlow}
            />
          </div>
          {/* Kept outside the scrolling table so the whole sentence is readable on a phone */}
          <p className="mt-4 rounded-2xl border border-brand-100 bg-brand-50/60 px-5 py-4 text-[15px] font-semibold leading-relaxed text-brand-800">
            Nothing else. No guest data is collected, stored or transmitted by the board or the player.
          </p>
        </div>
      </Section>

      {/* Hosting, availability, continuity */}
      <Section id="hosting" tone="mist">
        <SectionHeader
          align="left"
          kicker="Hosting, availability, continuity"
          title="Built so a screen keeps working even if the internet, or we, go away."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {continuity.map((item) => (
            <InfoCard key={item.title} title={item.title} icon={item.icon}>
              <p>{item.body}</p>
            </InfoCard>
          ))}
        </div>
      </Section>

      {/* Service levels */}
      <Section id="sla" tone="white">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14">
          <SectionHeader
            align="left"
            kicker="Service levels"
            title="Published response times, in the agreement, with credits."
            description="These are the commitments on the chain plan. They appear as the SLA exhibit to the master services agreement; credits are applied to the monthly invoice."
          />
          <div className="min-w-0">
            <DataTable
              caption="Service levels on the chain plan"
              minWidth="min-w-[21rem]"
              firstColumnWidth="w-[36%] min-w-[8.5rem]"
              head={["Commitment", "Chain plan"]}
              rows={serviceLevels.map((row) => [row.commitment, row.chainPlan])}
            />
          </div>
        </div>
      </Section>

      {/* For Purchasing and Legal */}
      <Section id="procurement" tone="ink">
        <SectionHeader
          align="left"
          tone="dark"
          kicker="For Purchasing and Legal"
          title="The vendor pack, ready before the pilot."
          description="Everything a vendor-onboarding portal asks for, provided with the pilot statement of work so the rollout needs no new paper."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {vendorPack.map((item) => (
            <InfoCard key={item.title} title={item.title} icon={item.icon} className="text-body">
              <p>{item.body}</p>
            </InfoCard>
          ))}
        </div>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <Button as="link" href="/contact?i=franchise" size="lg">
            Request the vendor pack
            <Icon name="arrow-right" className="h-4 w-4" strokeWidth={2.4} />
          </Button>
          <Button as="link" href="/franchise" variant="outline-light" size="lg">
            The chain program
          </Button>
        </div>
      </Section>

      {/* Hardware standards */}
      <Section id="hardware" tone="white">
        <SectionHeader align="left" kicker="Hardware standards" title="Commercial panels for commercial hours." />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {hardware.map((item) => (
            <InfoCard key={item.title} title={item.title} icon={item.icon}>
              <p>{item.body}</p>
            </InfoCard>
          ))}
        </div>
        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-slate-500">
          Model availability changes; the exact SKUs are named in each order schedule. Our own boards are tested on each target
          panel model before it is quoted to a chain.
        </p>
      </Section>

      {/* What we don't claim */}
      <Section id="honest" tone="band">
        <SectionHeader
          align="left"
          kicker="What we don't claim"
          title="A short list, so you don't have to find it."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {notClaimed.map((item) => (
            <InfoCard key={item.title} title={item.title}>
              <p>{item.body}</p>
            </InfoCard>
          ))}
        </div>
      </Section>

      <CtaCard
        title="Send this page to your IT and Legal teams."
        body="Then send us the questionnaire. We'll return it complete, with the data-flow diagram and our hosting provider's reports, within five business days."
        primary={{ label: "Start a security review", href: "/contact?i=franchise" }}
      />
    </>
  );
}
