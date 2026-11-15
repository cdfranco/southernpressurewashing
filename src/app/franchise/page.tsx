import type { Metadata } from "next";
import Link from "next/link";
import { TvFrame } from "@/components/board";
import { Button } from "@/components/button";
import { Feature, InfoCard, StepCard } from "@/components/check-list";
import { CtaCard } from "@/components/cta-card";
import { DataTable } from "@/components/data-table";
import { FaqList, type FaqItem } from "@/components/faq";
import { FleetDemo } from "@/components/fleet-demo";
import { Icon } from "@/components/icons";
import { PageHeader } from "@/components/page-header";
import { Accent, Section, SectionHeader } from "@/components/section";
import { boardBySlug, boardImage, chainPricing } from "@/content/site";

export const metadata: Metadata = {
  title: "Franchises & chains",
  description:
    "A brand-locked digital board built once, installed at every location for one per-location price, managed from one place. Pilot in 3 stores for 90 days.",
};

type Item = { title: string; body: string; icon: string };

const proof = [
  { value: "678", label: "stores on one concept board (not a customer)" },
  { value: "3 stores · 90 days", label: "standard pilot" },
  { value: "Nationwide", label: "installs dispatched through a field-technician marketplace" },
];

const practice: Item[] = [
  {
    title: "Brand-locked template",
    icon: "layout",
    body: "Your typefaces, colors, photography and layout, embedded in the board and approved by your brand team once. Stores can't move a pixel of it. Landscape and portrait editions from the same content.",
  },
  {
    title: "Per-store data layer",
    icon: "map-pin",
    body: "Address, phone, hours, weather coordinates and price tier per location, in one file we maintain. Price zones and store-level exceptions are supported. Menu prices can sync from your ordering platform.",
  },
  {
    title: "Scheduled campaigns",
    icon: "calendar",
    body: "Campaigns carry start and end dates: load the fall menu in September and every screen switches itself at midnight local time, then back again when the promotion ends. Preview any date in advance; rolling back is redeploying the previous version.",
  },
  {
    title: "Store-level overrides",
    icon: "pencil",
    body: "From the pilot onward, store managers get a short form for only the fields HQ allows: today's hours, an item that's 86'd, a local hiring line. Corporate content can't be touched from a store, and HQ previews and approves store changes.",
  },
  {
    title: "Screens that report in",
    icon: "signal",
    body: "From your pilot's first install, every screen checks in on a schedule with its version and status. Your ops team gets a read-only status view — online, offline, last seen — and we are alerted before the store notices. Quarterly uptime report per location.",
  },
  {
    title: "One kit, any wall, anywhere",
    icon: "truck",
    body: "An identical pre-configured kit per location — commercial display, mount, cabling, labels — shipped from distribution and installed nationwide by field technicians dispatched through a marketplace (Field Nation, 1,600+ digital-signage techs), from a one-page install sheet. A photo of the running board closes every ticket, and we stay the vendor of record for every screen.",
  },
];

const rollout = [
  {
    title: "Concept board",
    when: "Weeks 1–3",
    body: "We build a concept board from your public menu and brand standards — before the first meeting, if you like — and put it in front of Marketing, Ops and IT together. The production Brand Build ($4,500: theme, landscape and portrait editions, first content load, first two campaigns, HQ approval) is paid at pilot and credited at 200+ locations.",
  },
  {
    title: "Pilot",
    when: "Weeks 4–17",
    body: "3–5 stores in one market, 90 days, $2,500 for three stores and credited against the first wave. We install in one visit per store. You measure what you already measure: featured-item mix, app and loyalty sign-ups, catering leads, versus matched control stores.",
  },
  {
    title: "Regional wave",
    when: "Months 5–8",
    body: "25–100 stores under the system agreement, with installers onboarded, spares positioned, and the status view live for your ops team. Weekly progress report by store.",
  },
  {
    title: "System rollout",
    when: "Months 9–18",
    body: "Region by region at a cadence your ops calendar sets. Each wave is an order schedule under the same master agreement. Seasonal campaigns run system-wide from the first wave onward.",
  },
];

const pricingLines: Item[] = [
  {
    title: "One-time, per location: $1,500 at list, down to $1,195 at 600+",
    icon: "tv",
    body: "Commercial 43 kit: a 43\" commercial 16/7 panel with a 3-year limited manufacturer warranty running the board from the panel's own signage OS (a small media box is added where a panel has no URL launcher), security mount, cabling, nationwide install, go-live and photo confirmation. Commercial 55 +$400; portrait +$0; chain-supplied displays −$650.",
  },
  {
    title: "Monthly, per location: $99 at list, down to $59 at 600+",
    icon: "refresh",
    body: "Unlimited content changes in 2 business days, scheduled system-wide campaigns, brand-locked templates with store-level overrides, heartbeat monitoring with a 30-minute offline alert, 99.5% hosting SLA with credits, advance replacement shipped within 2 business days from spares held at two per fifty stores, quarterly uptime report, one consolidated invoice with site IDs, a named account manager.",
  },
  {
    title: "Brand Build: $4,500 per brand, credited at 200+ locations",
    icon: "sparkles",
    body: "Theme, landscape and portrait editions, first content load, first two campaigns, HQ approval walkthrough. Paid at pilot.",
  },
  {
    title: "Pilot: $2,500 for three stores, 90 days",
    icon: "storefront",
    body: "Additional pilot stores $1,050 each; no monthly during the pilot; credited in full against the first wave when the system agreement follows within 30 days.",
  },
  {
    title: "No ads, ever, on chain boards.",
    icon: "shield",
    body: "The partner panel exists only on independent boards. On yours, that space sells your LTOs, app, catering, gift cards and hiring.",
  },
];

const review: Item[] = [
  {
    title: "Network & security",
    icon: "wifi",
    body: "The board is a single HTTPS page loaded by the display's signage OS or by our single-purpose kiosk app. Outbound-only on port 443 to our hosting domain and a weather service (coordinates only). No inbound ports, no VPN, no POS connection, no guest data on the device, no PII collected. Players belong on the guest or IoT VLAN or a cellular router and never touch the card-holder network. Settings are PIN-locked; the page reloads on a schedule. Hosted on Vercel; we attach the host's current SOC 2 report in the security exhibit and make no compliance claims of our own. We complete your security questionnaire and provide a one-page data-flow diagram.",
  },
  {
    title: "Content, data and IP",
    icon: "lock",
    body: "You own your content and brand assets; we own the platform and license it to you. Telemetry is limited to a device heartbeat: status, software version, uptime and the device's IP address. No guest data, no audio, no camera, no location. QR codes use your own links. Boards are self-contained files, and the master agreement includes source escrow: if we cease operations you receive the board files and hosting instructions. Hardware is sold outright — title passes to you on payment of each order schedule — so nothing on your walls depends on us.",
  },
  {
    title: "Paper & terms",
    icon: "document",
    body: "Master services agreement with per-location order schedules, SLA exhibit (response times, uptime, replacement), security exhibit, insurance exhibit. Net-30 invoicing against your PO through Coupa, Ariba or email. A W-9 with EIN and a certificate of insurance (general liability $1M/$2M, your entity named as additional insured) are provided before the first install.",
  },
  {
    title: "Support at scale",
    icon: "wrench",
    body: "Commercial displays with a 3-year limited manufacturer warranty; spares held at two per fifty stores; advance replacement shipped within 2 business days; warranty claims filed by us. Installs by field technicians dispatched through a national marketplace from a pre-configured kit. Every screen checks in; alerts fire before a store calls. A ticket address, a phone number, and published response times: 4 hours for a dark screen during business hours.",
  },
];

const funding: Item[] = [
  {
    title: "Brand fund pays the monthly, franchisees buy hardware",
    icon: "megaphone",
    body: "The system-wide campaign engine is a marketing expense; the screen is a store asset. Cleanest for brand consistency.",
  },
  {
    title: "Hardware in the remodel package",
    icon: "office",
    body: "Add the board to the next remodel or new-store spec. New units open with it; existing units adopt on their remodel cycle.",
  },
  {
    title: "Optional program, franchisee-paid",
    icon: "users",
    body: "A ten-store pilot run by a franchisee, presented to the advisory council by the franchisee who ran it. We disclose any franchisor rebate as required.",
  },
  {
    title: "Corporate-owned units decide once",
    icon: "briefcase",
    body: "If most of your system is company-owned, a yes from the support center is a system-wide order. We plan the install waves around your ops calendar.",
  },
];

const faqs: FaqItem[] = [
  {
    question: "Have you rolled out a chain before?",
    answer:
      "Not yet at scale, and the pricing says so. What we have today: 21 boards built for 18 Athens-area businesses that you can open from this site, a 678-store concept deployment you can drive from the picker above, our own locked player software, and an agreement written so a pilot costs 2,500 dollars for three stores, is credited in full if you proceed, and locks you into nothing. You decide on results.",
  },
  {
    question: "How big is the company?",
    answer: (
      <>
        One founder who designs every board, plus field technicians dispatched through a national marketplace for installs, and
        commercial hardware with the manufacturer&apos;s warranty in your name. Hiring follows the contracts: an installer at the
        first regional wave and a rollout coordinator when a 100-location agreement is signed. See{" "}
        <Link href="/about" className="underline">
          about
        </Link>{" "}
        and{" "}
        <Link href="/trust" className="underline">
          security &amp; trust
        </Link>{" "}
        for what that means in practice.
      </>
    ),
  },
  {
    question: "What if you disappear?",
    answer:
      "Your boards keep running. They are self-contained files on hardware you own; the master agreement includes source escrow, so you receive the files, the fleet data and hosting instructions and can host them yourself or hand them to another vendor. There is nothing of ours you would need to return.",
  },
  {
    question: "Who controls the brand and the content?",
    answer:
      "HQ does. The template is locked to your brand standards; store managers edit only the fields you allow through a short form, and HQ previews and approves those changes. System-wide campaigns are scheduled centrally with start and end dates.",
  },
  {
    question: "What does IT have to do?",
    answer:
      "Put the screens on the guest or IoT VLAN (or accept a cellular router), allow outbound HTTPS to our hosting domain and the weather service, and review the security exhibit. No inbound ports, no VPN, no POS connection, no guest data. We complete your questionnaire and attach our host's SOC 2 report.",
  },
  {
    question: "What does a pilot cost and how long does it take?",
    answer:
      "2,500 dollars for three stores (additional pilot stores 1,050 each), no monthly during the 90 days, credited in full against the first wave when the system agreement follows within 30 days. From your yes to screens on walls is about three weeks; the pilot runs 90 days against matched control stores on the metrics you already track.",
  },
];

const usd = (amount: number) => `$${amount.toLocaleString("en-US")}`;

const price = (amount: number) => <span className="font-semibold tabular-nums text-ink-900">{usd(amount)}</span>;

export default function FranchisePage() {
  const firstWatch = boardBySlug("first-watch");

  return (
    <>
      <PageHeader
        kicker="Franchises · corporate chains · multi-unit operators"
        title={
          <>
            One board for the brand. One price per location. <Accent>One place to run it.</Accent>
          </>
        }
        description="We build your brand's board once, to your standards. Every location gets its own address, hours, weather and prices from a single deployment. Seasonal menus switch system-wide on the date you set. Store managers edit only what's theirs. And every screen reports in, so you know it's on."
        actions={
          <>
            <Button as="link" href="/contact?i=franchise" size="lg">
              Request a pilot proposal
              <Icon name="arrow-right" className="h-4 w-4" strokeWidth={2.4} />
            </Button>
            <Button as="link" href="#pricing" variant="secondary" size="lg">
              Per-location pricing
            </Button>
          </>
        }
      >
        <dl className="grid gap-x-10 gap-y-7 md:grid-cols-3">
          {proof.map((stat) => (
            <div key={stat.value} className="flex flex-col gap-1.5 border-l-2 border-brand-500 pl-5">
              <dt className="order-2 max-w-[19rem] text-[15px] leading-relaxed text-body">{stat.label}</dt>
              <dd className="order-1 font-display text-[1.75rem] font-extrabold leading-tight tracking-[-0.03em] text-ink-900 md:text-2xl lg:text-[2rem]">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </PageHeader>

      {/* Live multi-location demo */}
      <Section tone="ink">
        <SectionHeader tone="dark" title="Pick a store. The board follows." />
        <div className="mx-auto mt-10 max-w-4xl">
          <FleetDemo tone="dark" id="fleet-store-franchise" />
          <p className="mt-2 text-center text-[13.5px] leading-relaxed text-white/60">
            Every store in the chain&apos;s public ordering directory (678), per-store prices for 28 Georgia stores.
          </p>
        </div>
      </Section>

      {/* What it means in practice */}
      <Section tone="white">
        <SectionHeader
          align="left"
          kicker={'What "one board, every location" means in practice'}
          title="Design once. Configure per store. Update everywhere."
          description="The reason this works for six hundred locations is that nothing is bespoke past the first board. The brand template is fixed by HQ; the store layer is data."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {practice.map((item) => (
            <InfoCard key={item.title} title={item.title} icon={item.icon}>
              <p>{item.body}</p>
            </InfoCard>
          ))}
        </div>
      </Section>

      {/* Rollout */}
      <Section id="rollout" tone="mist">
        <SectionHeader align="left" kicker="How a rollout runs" title="Pilot, then wave, then system. Nothing is a leap." />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {rollout.map((step, i) => (
            <StepCard key={step.title} step={i + 1} title={step.title} when={step.when}>
              {step.body}
            </StepCard>
          ))}
        </div>
      </Section>

      {/* Per-location pricing */}
      <Section id="pricing" tone="white">
        <SectionHeader
          align="left"
          kicker="Per-location pricing"
          title="Simple numbers your finance team can put in a model."
          description="Two lines per location: a one-time install and a monthly service, in volume bands on a 36-month term. Pilot hardware is priced at cost and credited in full against the first wave, so the rollout decision is made on results."
        />
        <div className="mt-12 grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div className="min-w-0 space-y-8">
            {pricingLines.map((item) => (
              <Feature key={item.title} title={item.title} icon={item.icon}>
                {item.body}
              </Feature>
            ))}
          </div>
          <div className="min-w-0 lg:sticky lg:top-28 lg:self-start">
            <DataTable
              caption="Per-location pricing"
              minWidth="min-w-[26rem]"
              firstColumnWidth="min-w-[9.5rem]"
              head={["Locations under contract", "One-time / location", "Monthly / location"]}
              rows={chainPricing.bands.map((band) => [band.tableLabel, price(band.once), price(band.monthly)])}
            />
            <p className="mt-4 text-sm leading-relaxed text-slate-500">
              Before tax. 36-month initial term, then month to month. 30% of each wave at PO, balance net-30 on photo-verified
              acceptance. Hardware is a pass-through line with a ±5% manufacturer-price clause. A single monthly figure with no
              one-time payment can be arranged through a third-party equipment lessor; ask for the leasing option on your
              proposal.{" "}
              <Link
                href="/pricing#chains"
                className="font-semibold text-brand-700 underline underline-offset-4 hover:text-brand-800"
              >
                Try the rollout calculator
              </Link>
              .
            </p>
          </div>
        </div>
      </Section>

      {/* IT, Legal and Purchasing */}
      <Section id="it" tone="mist">
        <SectionHeader align="left" kicker="For IT, Legal and Purchasing" title="The answers your review will ask for." />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {review.map((item) => (
            <InfoCard key={item.title} title={item.title} icon={item.icon}>
              <p>{item.body}</p>
            </InfoCard>
          ))}
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <Button as="link" href="/trust">
            Read the security &amp; trust page
            <Icon name="arrow-right" className="h-4 w-4" strokeWidth={2.4} />
          </Button>
          <Button as="link" href="/contact?i=franchise" variant="secondary">
            Request the vendor pack
          </Button>
        </div>

        <figure className="mt-16 grid items-center gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-14">
          <TvFrame stand className="min-w-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={boardImage(firstWatch.slug, "lg")}
              alt="Chain concept board — seasonal features, live menu prices, waitlist prompt"
              width={1440}
              height={810}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </TvFrame>
          <figcaption className="min-w-0 border-l-2 border-brand-500 pl-5 text-[17px] leading-relaxed text-ink-900/80">
            The concept board rotates the seasonal features first, then the classics, with a live open/closing badge and a
            &quot;join the waitlist&quot; prompt. Every price came from the store&apos;s own ordering menu.
          </figcaption>
        </figure>
      </Section>

      {/* Franchisors */}
      <Section tone="white">
        <SectionHeader align="left" kicker="For franchisors" title="Four ways to fund it, so franchisees say yes." />
        <div className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2">
          {funding.map((item) => (
            <Feature key={item.title} title={item.title} icon={item.icon}>
              {item.body}
            </Feature>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq" tone="paper">
        <SectionHeader kicker="Questions a chain asks first" title="Straight answers, including the uncomfortable one." />
        <FaqList items={faqs} className="mx-auto mt-12 max-w-3xl" />
      </Section>

      <CtaCard
        title="Start with a concept board of your brand, at our cost."
        body="Send us your brand standards or just your website. We'll build a concept board from your public menu, put it on a screen, and bring it to your team — Marketing, Ops and IT in the same room. Then decide about a pilot."
        primary={{ label: "Request a pilot proposal", href: "/contact?i=franchise" }}
      />
    </>
  );
}
