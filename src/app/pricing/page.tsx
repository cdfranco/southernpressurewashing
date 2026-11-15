import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { Button } from "@/components/button";
import { CtaCard } from "@/components/cta-card";
import { DataTable } from "@/components/data-table";
import { FaqList, type FaqItem } from "@/components/faq";
import { Icon } from "@/components/icons";
import { PageHeader } from "@/components/page-header";
import { PricingCalculator } from "@/components/pricing-calculator";
import { Section, SectionHeader } from "@/components/section";
import { CheckList } from "@/components/check-list";
import { chainPricing, packagePrice, selfInstall, usd } from "@/content/site";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Published pricing. Packages from $500 one-time (design, hardware, install), and $150 less if you install the screen yourself. Care plans $49, $99 and $199 a month. Per-location pricing for chains from $1,195 + $59/month.",
};

const inlineLink = "font-semibold text-brand-700 underline underline-offset-4 hover:text-brand-800";

/* ── Step 1 · packages ─────────────────────────────────────────────── */

type PackageRow = {
  name: string;
  /** Regular-weight text that follows the bold name. */
  detail?: string;
  badge?: string;
  /** Prices repeated under the name below 63rem, where the 58rem-wide table scrolls sideways. */
  inlinePrice: string;
  bestFor: string;
  onTheWall: string;
  /** Installed price. */
  price: string;
  /** Price when the customer installs the screen; absent where that is not offered. */
  selfPrice?: string;
  /** Quoted per site: a starting price, shown lighter than the fixed prices. */
  quoted?: boolean;
};

/** Both prices for a Local or Commercial package: installed, and installed minus the self-install discount. */
const bothPrices = (installed: number) => {
  const self = usd(installed - selfInstall.discount);
  return { price: usd(installed), selfPrice: self, inlinePrice: `${usd(installed)} installed · ${self} if you install it` };
};

const packages: (PackageRow | { section: string })[] = [
  {
    name: "Board Kit",
    detail: " — your own TV",
    inlinePrice: "$500 one-time, you install",
    bestFor: "You already have a TV up, or you'd rather buy it yourself",
    onTheWall:
      "Our locked player and software on your TV, custom board design, remote onboarding and a self-install sheet. On-site visit +$95.",
    price: "—",
    selfPrice: usd(packagePrice.boardKit),
  },
  { section: "Local — consumer 4K smart TV" },
  {
    name: "Local 43",
    badge: "Our pick for a first screen",
    bestFor: "Counters, entries, waiting areas",
    onTheWall:
      '43" 4K smart TV running our software (no separate player), lockable anti-theft mount; cables hidden when we install it',
    ...bothPrices(packagePrice.local43),
  },
  {
    name: "Local 55",
    bestFor: "Dining rooms, lobbies, gyms",
    onTheWall: '55" 4K smart TV, lockable mount',
    ...bothPrices(packagePrice.local55),
  },
  {
    name: "Local 65",
    bestFor: "Large rooms, feature walls",
    onTheWall: '65" 4K smart TV, heavy-duty security mount; a two-person job whoever hangs it',
    ...bothPrices(packagePrice.local65),
  },
  {
    section:
      "Commercial — signage panel built to run 16 hours a day, every day (16/7-rated), 3-year limited manufacturer warranty",
  },
  {
    name: "Commercial 43",
    bestFor: "Screens that run open to close, every day; portrait walls; every chain",
    onTheWall:
      '43" commercial panel (LG or Samsung signage class) that runs the board from the panel\'s own signage OS (LG "Play via URL" / Samsung "URL Launcher"); where a panel has no URL launcher we add a small media box (+$120). Native portrait, lockable mount',
    ...bothPrices(packagePrice.commercial43),
  },
  {
    name: "Commercial 55",
    bestFor: "Dining rooms and lobbies that run all day",
    onTheWall: '55" commercial panel, security mount',
    ...bothPrices(packagePrice.commercial55),
  },
  {
    name: "Commercial 65",
    bestFor: "Large rooms, all-day retail",
    onTheWall: '65" commercial panel, security mount; a two-person job whoever hangs it',
    ...bothPrices(packagePrice.commercial65),
  },
  {
    name: 'Menu walls, 75"+, drive-through, outdoor',
    inlinePrice: "quoted, from $3,500 installed",
    bestFor: "Two to six screens behind a counter; anything outside",
    onTheWall: "Quoted per site. Same design system on every screen; content laid out as one menu.",
    price: "from $3,500",
    quoted: true,
  },
];

function PackageName({ row }: { row: PackageRow }) {
  return (
    <>
      {row.name}
      {row.detail && <span className="font-sans font-normal text-body">{row.detail}</span>}
      {row.badge && (
        <>
          {" "}
          <span className="my-0.5 inline-flex whitespace-nowrap rounded-full bg-brand-50 px-2.5 py-1 align-middle font-sans text-[13px] font-semibold leading-none text-brand-800">
            {row.badge}
          </span>
        </>
      )}
      <span className="mt-1 block font-sans text-[15px] font-bold tabular-nums text-brand-700 min-[63rem]:hidden">{row.inlinePrice}</span>
    </>
  );
}

const packageRows = packages.map((row) =>
  "section" in row
    ? {
        // Below 57rem the table is wider than its frame: keep the sub-heading wrapping inside the visible part.
        section: <span className="block max-w-[calc(100vw-6.75rem)] min-[63rem]:max-w-none">{row.section}</span>,
      }
    : [
        <PackageName key="name" row={row} />,
        row.bestFor,
        row.onTheWall,
        row.quoted ? (
          <span key="price" className="font-normal">
            {row.price}
          </span>
        ) : (
          row.price
        ),
        row.selfPrice ? (
          <span key="self" className="text-brand-700">
            {row.selfPrice}
          </span>
        ) : (
          <span key="self" className="font-normal text-slate-400">
            —
          </span>
        ),
      ],
);

const installChoices = [
  {
    title: "We install it",
    tagline: "The done-for-you way",
    price: "The installed price",
    featured: false,
    points: [
      "One visit: we deliver the screen, mount it level and connect it to your Wi-Fi",
      "Cables hidden, and the board is live before we leave",
      `Within ${selfInstall.freeDeliveryMiles} miles of Athens; elsewhere we add travel or use a local field technician at cost`,
    ],
  },
  {
    title: "You install it",
    tagline: "The same equipment, your wall, your way",
    price: `${usd(selfInstall.discount)} off any Local or Commercial package`,
    featured: true,
    points: [
      "The same display and mount, set up for your board before you get it",
      "Hang it where and how you want, on your own schedule, with your own hands or your own installer",
      `Pickup or delivery is free within ${selfInstall.freeDeliveryMiles} miles of Athens; shipping elsewhere is quoted with your order`,
      "A one-page install sheet, and we bring the board live with you remotely",
      `Changed your mind? We'll install it for the ${usd(selfInstall.discount)} difference`,
    ],
  },
];

const packageNotes = [
  {
    lead: "Local or Commercial?",
    body: "A consumer TV is the right buy for a counter screen that runs a few hours a day; its maker's warranty is one year and may exclude commercial use, so we say so in the agreement. A commercial panel is built to run 16 hours a day, every day, carries a 3-year limited warranty, rotates to portrait natively, and runs the board without a separate player.",
  },
  {
    lead: "Add-ons.",
    body: "Second screen installed in the same visit −$300 · media box where a panel has no URL launcher +$120 · appliance player for IT-mandated sites +$495 · LTE router where the store network is off-limits +$150 and $30/month · dish photography on install day +$150 · in-wall cabling or a new outlet by a licensed contractor at cost.",
  },
  {
    lead: "Prices are before sales tax.",
    body: "In Georgia, tax applies to the hardware (and delivery) line; installation and design are separately stated on your invoice and, as separately stated services, are not subject to Georgia sales tax. Outside Georgia, tax follows your state's rules.",
  },
];

/* ── Step 2 · care plans ───────────────────────────────────────────── */

type Plan = {
  name: string;
  tagline: string;
  price: string;
  term: string;
  features: { text: ReactNode; included?: boolean }[];
  cta: { label: string; href: string };
  footnote: string;
  featured?: boolean;
};

const plans: Plan[] = [
  {
    name: "Essential",
    tagline: "A board that mostly stays the same",
    price: "$49",
    term: "month to month",
    features: [
      { text: "Hosting, live clock, local weather, auto-reload" },
      { text: "Heartbeat monitoring — we're alerted if it goes dark" },
      {
        text: (
          <>
            <b>2 content changes a quarter</b>, 5 business days
          </>
        ),
      },
      { text: "Extra changes at $75 standard / $150 rush" },
      { text: "Player advance-replaced within 5 business days" },
      {
        text: "Display: 1-year maker's warranty on consumer sets (commercial use may be excluded — ask us); 3-year limited on commercial panels",
      },
      { text: "Email support, next business day" },
      { text: "Seasonal redesigns", included: false },
      { text: "Menu-price sync", included: false },
    ],
    cta: { label: "Ask about Essential", href: "/contact?i=pricing&plan=essential" },
    footnote: "Athens-area boards: ask about the partner-panel offset",
  },
  {
    name: "Pro",
    tagline: "Specials, seasonal menus, a board that works for you",
    price: "$99",
    term: "12-month term · $200 off the package",
    features: [
      { text: "Everything in Essential" },
      {
        text: (
          <>
            <b>Unlimited content changes</b>, 2 business days
          </>
        ),
      },
      {
        text: (
          <>
            <b>1 new creative a month</b> and <b>2 seasonal redesigns a year</b>
          </>
        ),
      },
      { text: "24/7 alerting and a monthly uptime report" },
      {
        text: (
          <>
            Player advance-replaced within <b>48 hours</b> (we ship the replacement before you send the old one back); display
            warranty claims handled by us, with a loaner
          </>
        ),
      },
      { text: "One on-site visit a year included" },
      { text: "Phone and text support, same business day; dark screen: 4-hour response" },
      {
        text: "One menu-price import (Toast, Square, Olo or your website): we pull your published prices in and re-pull on request or on a schedule we agree",
      },
    ],
    cta: { label: "Ask about Pro", href: "/contact?i=pricing&plan=pro" },
    footnote: "Our recommendation for most restaurants",
    featured: true,
  },
  {
    name: "Premier",
    tagline: "Daily specials, several screens, a designer on call",
    price: "$199",
    term: "24-month term · $200 off the package",
    features: [
      { text: "Everything in Pro" },
      { text: <b>Next-business-day changes; specials the same day</b> },
      { text: "Weekly specials calendar and a quarterly creative review" },
      { text: "Named contact; dark screen: 2-hour response, 7 days" },
      {
        text: (
          <>
            48-hour swap of the player <em>or</em> the display from our spare pool
          </>
        ),
      },
      { text: <b>4 on-site visits a year</b> },
      {
        text: (
          <>
            <b>Display refreshed at 36 months</b> while you stay on Premier
          </>
        ),
      },
      { text: "Multi-screen dashboard and proof-of-play reports" },
    ],
    cta: { label: "Ask about Premier", href: "/contact?i=pricing&plan=premier" },
    footnote: "Built for multi-screen and multi-site operators",
  },
];

function PlanCard({ plan }: { plan: Plan }) {
  const dark = plan.featured === true;
  return (
    <article
      className={`relative flex flex-col rounded-2xl border p-7 sm:p-8 ${
        dark ? "border-ink-900 bg-ink-900 text-slate-300 shadow-float" : "border-line bg-white shadow-card"
      }`}
    >
      {plan.featured && (
        <span className="absolute -top-3.5 left-7 rounded-full bg-sun-400 px-3 py-1.5 text-[12.5px] font-bold uppercase leading-none tracking-[0.12em] text-ink-900">
          Recommended
        </span>
      )}
      <h3 className={`text-2xl font-bold ${dark ? "text-white" : ""}`}>{plan.name}</h3>
      <p className="mt-1.5 text-[15px] leading-snug">{plan.tagline}</p>
      <p className="mt-6 flex items-baseline gap-1.5">
        <span
          className={`font-display text-5xl font-extrabold leading-none tracking-[-0.04em] tabular-nums ${
            dark ? "text-white" : "text-ink-900"
          }`}
        >
          {plan.price}
        </span>
        <span className="text-[15px]">/ month</span>
      </p>
      <p className={`mt-2.5 text-[15px] font-semibold ${dark ? "text-brand-300" : "text-brand-700"}`}>{plan.term}</p>

      <ul className={`my-7 space-y-3 border-t pt-7 ${dark ? "border-white/10 [&_b]:text-white" : "border-line"}`}>
        {plan.features.map((feature, i) => {
          const included = feature.included !== false;
          return (
            <li key={i} className="flex items-start gap-3 text-[15px] leading-normal">
              <span
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                  included
                    ? dark
                      ? "bg-white/10 text-brand-300"
                      : "bg-brand-50 text-brand-700"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                <Icon name={included ? "check" : "x"} className="h-3 w-3" strokeWidth={3} />
              </span>
              {included ? (
                <span className={dark ? "text-slate-200" : "text-ink-900/85"}>{feature.text}</span>
              ) : (
                <span className="text-slate-500 line-through">
                  <span className="sr-only">Not included: </span>
                  {feature.text}
                </span>
              )}
            </li>
          );
        })}
      </ul>

      <Button as="link" href={plan.cta.href} variant={dark ? "primary" : "secondary"} className="mt-auto w-full">
        {plan.cta.label}
      </Button>
      {/* Two lines of height on desktop so the three buttons line up when one footnote wraps. */}
      <p className={`mt-3.5 text-center text-[13.5px] leading-snug lg:min-h-[2.75em] ${dark ? "text-slate-400" : "text-slate-500"}`}>
        {plan.footnote}
      </p>
    </article>
  );
}

/* ── Chains & franchises ───────────────────────────────────────────── */

const dollars = (value: number) => "$" + value.toLocaleString("en-US");

const bandRows = chainPricing.bands.map((band) => [
  band.tableLabel,
  <span key="once" className="block whitespace-nowrap text-right font-display text-base font-bold tabular-nums text-ink-900">
    {dollars(band.once)}
  </span>,
  dollars(band.monthly),
]);

/* ── Content changes outside the plan ──────────────────────────────── */

const changeFees = [
  { lead: "Standard change", rest: " — up to five text, photo or price edits", turnaround: "3 business days", price: "$75" },
  { lead: "Rush change", rest: " — same scope, expedited", turnaround: "Next business day", price: "$150" },
  {
    lead: "Seasonal or full refresh",
    rest: " — more than five changes, new dishes, or a layout change",
    turnaround: "5 business days",
    price: "$350",
  },
  { lead: "Site visit", rest: " not caused by us or by equipment failure", turnaround: "Scheduled", price: "$95" },
  {
    lead: "Partner-ad creative",
    rest: " — we design a 2320×516 ad for a local business on your board",
    turnaround: "3 business days",
    price: "$150",
  },
];

const changeRows = changeFees.map((fee) => [
  <span key="change">
    {fee.lead}
    <span className="font-sans font-normal text-body">{fee.rest}</span>
  </span>,
  fee.turnaround,
  fee.price,
]);

/* ── Questions ─────────────────────────────────────────────────────── */

const faqs: FaqItem[] = [
  {
    question: "Who owns the display and the player?",
    answer: (
      <p>
        You do. Title to the hardware transfers to you when the package is paid, and the manufacturer&apos;s warranty is passed
        through to you. Our software stays ours and is licensed to you while you&apos;re on a care plan. The one exception is
        the partner-panel offset (below), where we keep title because we&apos;re paying for the screen.
      </p>
    ),
  },
  {
    question: "Can I install the screen myself?",
    answer: (
      <p>
        Yes, and it costs {usd(selfInstall.discount)} less on any Local or Commercial package. You get the same display and
        mount, set up for your board before you get it, with a one-page install sheet, and we bring it live with you remotely.
        Pickup or delivery is free within {selfInstall.freeDeliveryMiles} miles of Athens; shipping elsewhere is quoted with your
        order. Hang it where and how you want: the mounting is yours, and the board, the software and the support are still
        ours. If you&apos;d rather we mount it after all, we&apos;ll do it for the {usd(selfInstall.discount)} difference.
      </p>
    ),
  },
  {
    question: "What happens if I cancel the care plan?",
    answer: (
      <p>
        The hardware is yours and stays on the wall. The software license and hosting end 30 days after your last billing date,
        after which the board goes dark; if you ask, we can leave a static final version on the screen for a one-time fee. Your
        board and its design stay on file, so restarting a plan later is a phone call, not a new design job.
      </p>
    ),
  },
  {
    question: "Can I upgrade later?",
    answer: (
      <p>
        Yes. Move from a Local to a Commercial screen at the price difference plus the install visit; the board and your design
        carry over. Plans can move up at any time and down at the end of a term.
      </p>
    ),
  },
  {
    question: "What's the partner-panel offset?",
    answer: (
      <p>
        On some Athens-area boards we reserve a small rotating panel for two or three non-competing local businesses and sell
        those spots ourselves by zone. A venue that accepts the panel on a 24-month Essential term can run at $0 a month; in
        that case we keep title to the hardware. You approve every advertiser, nothing competes with you, and an unsold panel
        shows your own promotions. It&apos;s a limited program, not the default, and it&apos;s never offered on chain boards.
      </p>
    ),
  },
  {
    question: "Do I pay anything before I've seen the board?",
    answer: (
      <p>
        No. We build the first version at our own cost from your website or menu and send you a link. If you approve it, you
        pay the package fee, and the design work is included in it. If you don&apos;t, you owe nothing.
      </p>
    ),
  },
  {
    question: "How is a chain priced differently from a single restaurant?",
    answer: (
      <p>
        A chain buys one design and hundreds of installs, so the design cost moves into a single Brand Build (credited at 200+
        locations), the hardware becomes a pass-through line at volume, and installs are dispatched through a field-technician
        marketplace at rates set at scale. The chain monthly is lower than the $99 Pro care plan because one template serves
        every store, while including the fleet features a chain needs. See <Link href="/franchise">the chain program</Link>.
      </p>
    ),
  },
  {
    question: "Is there a contract?",
    answer: (
      <p>
        A two-page agreement you can read and accept on your phone. Packages are one-time. Essential is month to month with 30
        days&apos; notice; Pro is a 12-month term and Premier a 24-month term, each $200 off the package. Chain system
        agreements run 36 months with per-location order schedules.
      </p>
    ),
  },
];

export default function PricingPage() {
  return (
    <>
      <PageHeader
        kicker="Pricing"
        title="Two numbers. Both published."
        description={
          <>
            A one-time <b>package</b> pays for the design, the hardware and the install, or {usd(selfInstall.discount)} less if you
            install the screen yourself. A monthly <b>care plan</b> keeps the board running and current. Pick a screen, pick a
            plan, and you know the whole cost before we&apos;ve met.
          </>
        }
      />

      <Section id="packages" tone="white">
        <SectionHeader
          align="left"
          kicker="Step 1 · The package (one-time, per screen)"
          title="Design, display, mount and installation."
          description="Every package includes the custom board design in your brand, one round of corrections, our locked player software, configuration and go-live. We install it, or you take the same equipment and install it yourself for less. You own the hardware: title passes to you on payment and the manufacturer's warranty is passed through to you."
        />
        {/* Who installs it */}
        <div id="install" className="mt-10 scroll-mt-28 lg:mt-12">
          <h3 className="font-display text-2xl font-bold text-ink-900">{selfInstall.headline}</h3>
          <p className="mt-2 max-w-3xl text-[1.05rem] leading-relaxed">
            Every Local and Commercial package comes two ways. The design, the equipment and the care plan are identical; the only
            difference is who puts the screen on the wall.
          </p>
          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            {installChoices.map((choice) => (
              <article
                key={choice.title}
                className={`rounded-2xl border p-6 sm:p-7 ${choice.featured ? "border-brand-500 bg-brand-50/50" : "border-line bg-white"}`}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h4 className="font-display text-xl font-bold text-ink-900">{choice.title}</h4>
                  <p className={`text-[15px] font-bold ${choice.featured ? "text-brand-800" : "text-ink-900/70"}`}>{choice.price}</p>
                </div>
                <p className="mt-1 text-[15px] text-body">{choice.tagline}</p>
                <CheckList items={choice.points} className="mt-5 [&_li]:text-[15px]" />
              </article>
            ))}
          </div>
          <p className="mt-4 text-sm leading-relaxed text-slate-500">
            When you install it, the mounting is yours; the board, the software and the support are still ours.
          </p>
        </div>

        <div className="mt-10 lg:mt-12">
          <p className="mb-4 text-sm leading-relaxed text-slate-500 min-[63rem]:hidden">
            On a phone, swipe the table sideways for the price columns, or read both prices under each package name.
          </p>
          <DataTable
            caption="Package prices"
            head={[
              "Package",
              "Best for",
              "What's on the wall",
              "Installed",
              <span key="self" className="whitespace-nowrap">
                You install
              </span>,
            ]}
            rows={packageRows}
            minWidth="min-w-[58rem]"
            emphasizeLast={2}
          />
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {packageNotes.map((note) => (
            <p
              key={note.lead}
              className="rounded-r-xl border-l-[3px] border-brand-500 bg-paper px-5 py-4 text-[15px] leading-relaxed text-ink-900/85"
            >
              <b>{note.lead}</b> {note.body}
            </p>
          ))}
        </div>
      </Section>

      <Section id="plans" tone="mist">
        <SectionHeader
          align="left"
          kicker="Step 2 · The care plan (monthly, per screen)"
          title="Keeps it running. Keeps it current."
          description="Hosting, monitoring, software updates and content changes. Essential is month to month; Pro and Premier carry a term and take $200 off the package. A second screen at the same location is +$49/month."
        />
        <div className="mx-auto mt-14 grid max-w-xl gap-8 lg:max-w-none lg:grid-cols-3 lg:gap-6">
          {plans.map((plan) => (
            <PlanCard key={plan.name} plan={plan} />
          ))}
        </div>
      </Section>

      <Section id="chains" tone="white">
        <SectionHeader
          align="left"
          kicker="Chains & franchises"
          title="One price per location. Bands from ten stores."
          description={
            <>
              Chains and franchises pay one price per location: a Commercial 43 kit installed nationwide, then a monthly that
              includes unlimited changes, system-wide campaigns and monitoring. Brand Build $4,500 per brand, credited at 200+
              locations. Pilot: $2,500 for three stores, 90 days, credited in full against the first wave.{" "}
              <Link href="/franchise" className={inlineLink}>
                How the chain program works
              </Link>
              .
            </>
          }
        />
        {/* min-w-0 lets the table scroll inside its own frame instead of stretching the grid column */}
        <div className="mt-10 grid items-start gap-10 lg:mt-12 lg:grid-cols-2 lg:gap-12">
          <div className="min-w-0">
            <DataTable
              caption="Chain pricing bands"
              head={[
                "Locations under contract",
                <span key="once" className="block text-right">
                  One-time / location
                </span>,
                "Monthly / location",
              ]}
              rows={bandRows}
              minWidth="min-w-[21rem]"
              firstColumnWidth="min-w-[7rem]"
              emphasizeLast
            />
            <p className="mt-4 text-sm leading-relaxed text-slate-500">
              Before tax. Commercial 55 +$400; chain-supplied displays −$650. 36-month initial term, then month to month. 30% of
              each wave at PO, balance net-30 on photo-verified acceptance. Hardware is a pass-through line with a ±5%
              manufacturer-price clause. A single monthly figure with no one-time payment can be arranged through a third-party
              equipment lessor; ask for the leasing option on your proposal.
            </p>
          </div>
          <PricingCalculator className="min-w-0" />
        </div>
      </Section>

      <Section id="changes" tone="mist">
        <SectionHeader
          align="left"
          kicker="Content changes outside your plan"
          title="If it isn't in your plan, it's on this list."
          description="Every change is quoted in writing before we do it. On Pro and Premier, standard and rush changes are included."
        />
        <div className="mt-10 lg:mt-12">
          <DataTable head={["Change", "Turnaround", "Price"]} rows={changeRows} minWidth="min-w-[34rem]" emphasizeLast />
        </div>
      </Section>

      <Section id="faq" tone="white">
        <SectionHeader kicker="Questions about pricing" title="The fine print, in plain English." />
        <FaqList items={faqs} className="mx-auto mt-10 max-w-[54rem] lg:mt-12" />
      </Section>

      <CtaCard
        title="Want a number for your wall?"
        body="Tell us the room and the screen size you're thinking of. We'll send a one-page quote and, if you like, a free draft of the board itself."
        primary={{ label: "Get a quote", href: "/contact" }}
      />
    </>
  );
}
