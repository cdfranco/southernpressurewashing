import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { TvFrame } from "@/components/board";
import { Button } from "@/components/button";
import { Feature, StepCard } from "@/components/check-list";
import { CtaCard } from "@/components/cta-card";
import { DataTable } from "@/components/data-table";
import { FaqList, type FaqItem } from "@/components/faq";
import { Icon } from "@/components/icons";
import { PageHeader } from "@/components/page-header";
import { Section, SectionHeader } from "@/components/section";
import { boardBySlug, boardImage } from "@/content/site";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "How a Athena Boards board gets designed, installed and kept current: the design process, the equipment we install, the software that runs it, and what happens after go-live.",
};

type FeatureItem = { title: string; icon: string; body: string };

/* ── 1 · Design ────────────────────────────────────────────────────── */

const designFeatures: FeatureItem[] = [
  {
    title: "Rotating featured items",
    icon: "photo",
    body: "Big photos, a name, a line, a price. Specials, seasonal items, the dish you're proudest of.",
  },
  {
    title: "A live menu or services panel",
    icon: "layout",
    body: "Prices you can change any time. An open / closing-soon badge driven by the clock.",
  },
  {
    title: "Schedules that know the day",
    icon: "calendar",
    body: "Weekly specials with today highlighted. A bakery's Tuesday bake list. A rec center's 9:25 class. It changes at midnight without anyone touching it.",
  },
  {
    title: "Clock, local weather, a ticker",
    icon: "sun",
    body: "Real weather for your address, refreshed every 15 minutes. A scrolling line for hours, catering, hiring, your app.",
  },
  {
    title: "Landscape or portrait",
    icon: "rotate",
    body: 'A 43" screen mounted upright next to the register, or a 65" in the dining room. Same content, laid out for the wall.',
  },
  {
    title: "Optional partner panel",
    icon: "storefront",
    body: "On some Athens-area boards, a small rotating slot for two or three local businesses you approve, sold by us; it can offset the monthly plan.",
  },
];

const designBoard = boardBySlug("ywco");
const designBoardAlt = "YWCO Athens board: the day's class schedule and pool hours, driven by the clock";
const designBoardCaption =
  "A rec-center board: every class, instructor and pool block on it is real, and the panel follows the clock through the day.";

/* ── 2 · Equipment ─────────────────────────────────────────────────── */

const equipmentHead = ["Component", "Local packages", "Commercial & chain packages"];

const commercialDisplay = (
  <>
    LG or Samsung commercial signage panels (UR640S / QB class): built to run 16 hours a day, every day (16/7-rated), 300–400
    nits, native portrait, <b>3-year limited manufacturer warranty</b>, runs the board from the panel&apos;s own signage OS (a
    small media box is added where a panel has no URL launcher)
  </>
);

const equipmentRows: ReactNode[][] = [
  [
    "Display",
    '43", 55" or 65" 4K smart TV (Insignia Fire TV class, or equivalent by availability), 1-year consumer warranty, landscape',
    commercialDisplay,
  ],
  [
    "Player",
    "The TV's own smart-TV OS runs our locked kiosk app: one URL, full screen, PIN-protected settings, nothing for staff to wander into. Your own TV? A small streaming stick running the same app.",
    "None needed on LG and Samsung signage panels: the board runs on the display's built-in signage OS. Where IT requires a named appliance, a BrightSign player.",
  ],
  [
    "Mount",
    "Lockable tilt mount, VESA-matched, level, with the remote's IR window clear",
    "Peerless-AV security mounts with anti-theft hardware, portrait or landscape",
  ],
  [
    "Power & cabling",
    "Surge protector, HDMI, paintable raceway or in-wall concealment",
    "Same, plus labelled cabling and a cellular router where the store network is off-limits",
  ],
  [
    "Network",
    "Your guest Wi-Fi is enough. The board keeps running if it drops; only the weather hides.",
    "Guest or IoT VLAN, Ethernet preferred. Outbound HTTPS only. Never on the card-holder network.",
  ],
  [
    "Install",
    "Our own technician, one visit, within 60 miles of Athens; travel added beyond. Or install it yourself for $150 less: the same equipment, set up for your board, with pickup or delivery free within 60 miles and shipping quoted elsewhere",
    "Field technicians dispatched nationwide through a marketplace, from a pre-configured kit and a one-page install sheet; photo confirmation on completion",
  ],
];

const equipmentSmallPrint =
  "Specific models change with availability and price; we quote the exact display and mount for your wall before you approve the package. All hardware is new, in retail packaging, and the manufacturer's warranty is passed through to you (consumer sets carry a 1-year warranty that may exclude commercial use; commercial panels carry 3 years).";

const portraitBoard = boardBySlug("kiques-portrait");
const portraitBoardAlt = "Portrait board for a 43-inch screen mounted upright";
const portraitBoardCaption =
  'A 43" screen mounted upright: photos, this week\'s specials with today highlighted, and the partner panel.';

/* ── 3 · Software ──────────────────────────────────────────────────── */

const softwareFeatures: FeatureItem[] = [
  {
    title: "Boards are self-contained.",
    icon: "wifi",
    body: "Fonts, photos and content are packaged into the board itself, so a short Wi-Fi drop doesn't blank the screen — only the weather hides.",
  },
  {
    title: "Locked, PIN-protected, self-healing.",
    icon: "lock",
    body: "Our kiosk software shows the board and nothing else. Settings are behind a PIN. It relaunches itself if something interrupts it and returns after a power cut on the players we've tested; commercial panels use their own on/off timer.",
  },
  {
    title: "Changes reach the screen without a visit.",
    icon: "refresh",
    body: "Screens re-check for a new version on a schedule — every 30 minutes on our player app; commercial panels on their own signage OS reload on a schedule we set at install. You never plug in a USB stick.",
  },
  {
    title: "Overscan, rotation and fit are handled.",
    icon: "tv",
    body: "Every TV crops a little differently. We fit the board to the panel at install, and a rotated screen is a setting, not a rebuild.",
  },
  {
    title: "Monitoring.",
    icon: "signal",
    body: "Under every care plan the screen checks in with us on a schedule and we're alerted if it goes dark; on Pro and above you also get a monthly uptime report.",
  },
  {
    title: "Menu-price import, when you want it.",
    icon: "document",
    body: "On Pro, we pull your published prices from Toast, Square, Olo or your website into the board and re-pull them on request or on a schedule we agree.",
  },
];

/* ── 4 · After go-live ─────────────────────────────────────────────── */

const afterSteps: { title: string; when: string; body: string }[] = [
  {
    title: "You send it",
    when: "Any time",
    body: '"Friday: fish tacos $12, photo attached." A text, an email, or a photo of the whiteboard. No portal to log into unless you want one.',
  },
  {
    title: "We make it",
    when: "Within the plan's turnaround",
    body: "We update the board, check it on a screen, and send you a preview link if it's more than a price change.",
  },
  {
    title: "It goes live",
    when: "Automatically",
    body: "Every screen picks up the new version on its next check-in — within 30 minutes on our player app, on the nightly schedule on commercial panels. No visit, no USB stick, no reboot.",
  },
  {
    title: "We watch it",
    when: "Every day",
    body: "Screens report in. A dark screen raises an alert to us. A failed player is advance-replaced under every plan; on Pro and Premier we handle the display too, with a loaner.",
  },
];

/* ── Common questions ──────────────────────────────────────────────── */

const faqs: FaqItem[] = [
  {
    question: "How long from first contact to a screen on the wall?",
    answer: (
      <p>
        About two weeks for a local business: three days to see your draft board, a couple of days for corrections and the
        agreement, and an install slot the following week. Chains: see{" "}
        <Link href="/franchise#rollout">how a rollout runs</Link>.
      </p>
    ),
  },
  {
    question: "Do I need an electrician or a network person?",
    answer: (
      <p>
        {
          "Usually not. We need a grounded outlet within reach of the wall and your Wi-Fi password. If the wall has no outlet nearby we'll tell you before install day and can arrange a licensed electrician at cost."
        }
      </p>
    ),
  },
  {
    question: "Can the board show something different in the morning and the evening?",
    answer: (
      <p>
        {
          'Yes. Boards are clock-driven: a breakfast menu until 11, lunch after, happy hour at 4, a "closed — see you tomorrow" state after hours. Weekly specials highlight the current day. Seasonal menus switch on the dates you choose.'
        }
      </p>
    ),
  },
  {
    question: "What if the TV breaks?",
    answer: (
      <p>
        {
          "On Essential we advance-replace the player within five business days and the display is covered by its maker's warranty, passed through to you. On Pro we ship a replacement player within 48 hours and handle the display warranty claim for you with a loaner. On Premier we swap the display or the player from our own spare pool within 48 hours. Commercial panels carry a three-year limited manufacturer warranty; consumer sets one year, which may exclude commercial use."
        }
      </p>
    ),
  },
  {
    question: "Can it be mounted vertically?",
    answer: (
      <p>
        {
          "Yes. Portrait boards are designed as their own layout, not a rotated landscape one, so photos and menus fit the tall shape. Commercial panels rotate natively. Consumer TVs aren't rated for upright use by their makers, so for a portrait wall we quote a commercial panel; if you choose a consumer set upright, it runs at your own risk and outside the manufacturer's warranty."
        }
      </p>
    ),
  },
  {
    question: "Will staff be able to mess with it?",
    answer: (
      <p>
        {
          "Not casually. The board is the only thing the player shows, settings are behind a PIN, and if someone does wander off it the board pulls itself back. We leave the remote with the manager, behind the counter, and a one-page sheet."
        }
      </p>
    ),
  },
  {
    question: "Is there a portal I have to learn?",
    answer: (
      <p>
        {
          "No. Most clients send changes by text. Chains get a dashboard for store status and campaign scheduling, and store managers get a small form for the fields HQ lets them edit."
        }
      </p>
    ),
  },
  {
    question: "Where do the photos come from?",
    answer: (
      <p>
        {
          "Yours, if you have them; your website's, with your permission; or we photograph your dishes on install day for a flat fee. We confirm you have the rights to anything we put on the wall."
        }
      </p>
    ),
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHeader
        kicker="How it works"
        title="What we do, what we install, and what happens after."
        description="A board is three things: a design that belongs to your brand, hardware on your wall that never asks for attention, and a service that keeps the screen worth looking at. Here's each one, plainly."
        actions={
          <>
            <Button as="link" href="/contact" size="lg">
              Get your free draft board
              <Icon name="arrow-right" className="h-4 w-4" strokeWidth={2.4} />
            </Button>
            <Button as="link" href="/pricing" variant="secondary" size="lg">
              See pricing
            </Button>
          </>
        }
      />

      {/* 1 · Design — copy and features beside the board, which stays in view while the list scrolls */}
      <Section id="design" tone="white">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-14 xl:grid-cols-[1.3fr_1fr] xl:gap-16">
          <div className="min-w-0">
            <SectionHeader
              align="left"
              kicker="1 · Design"
              title="We start from your brand, not from a template."
              description="Send a link to your website or a photo of your menu. We read your colors, your typefaces and your photography, and build a 4K board around your real menu, your hours and the things you'd like people to notice while they wait."
            />
            <div className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {designFeatures.map((feature) => (
                <Feature key={feature.title} title={feature.title} icon={feature.icon}>
                  {feature.body}
                </Feature>
              ))}
            </div>
          </div>

          <figure className="min-w-0 lg:sticky lg:top-28 lg:self-start">
            <TvFrame stand>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={boardImage(designBoard.slug, "lg")}
                alt={designBoardAlt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </TvFrame>
            <figcaption className="mx-auto mt-5 max-w-md text-center text-sm leading-relaxed text-slate-500">
              {designBoardCaption}
            </figcaption>
          </figure>
        </div>
      </Section>

      {/* 2 · Equipment — intro beside the upright screen, then the comparison table at full width */}
      <Section id="equipment" tone="mist">
        <div className="grid items-center gap-10 md:grid-cols-[minmax(0,1fr)_auto] md:gap-12 lg:gap-20">
          <SectionHeader
            align="left"
            kicker="2 · Equipment"
            title="Hardware chosen for walls that run all day."
            description={
              <>
                Two display ladders, one board. <b>Local</b>: consumer 4K televisions for counters and waiting areas. <b>Pro</b>:
                commercial 16/7-rated signage panels with a 3-year warranty where a screen runs from open to close every day of
                the year, and for every chain rollout.
              </>
            }
          />

          <figure className="mx-auto w-full max-w-[17rem] md:mx-0 md:w-[15rem] lg:w-[17rem]">
            <TvFrame portrait className="mx-auto max-w-[13.5rem]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={boardImage(portraitBoard.slug, "lg")}
                alt={portraitBoardAlt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </TvFrame>
            <figcaption className="mt-4 text-center text-sm leading-relaxed text-slate-500">{portraitBoardCaption}</figcaption>
          </figure>
        </div>

        <div className="mt-12 lg:mt-14">
          <DataTable head={equipmentHead} rows={equipmentRows} firstColumnWidth="min-w-[9.5rem]" minWidth="min-w-[48rem]" />
          <p className="mt-5 max-w-4xl text-sm leading-relaxed text-slate-500">{equipmentSmallPrint}</p>
        </div>
      </Section>

      {/* 3 · Software — the one dark surface on the page */}
      <Section id="software" tone="ink">
        <SectionHeader align="left" tone="dark" kicker="3 · Software" title="Built to run for years without a hand on it." />
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {softwareFeatures.map((feature) => (
            <div key={feature.title} className="rounded-2xl border border-white/10 bg-white/5 p-7">
              <Feature title={feature.title} icon={feature.icon} tone="dark">
                {feature.body}
              </Feature>
            </div>
          ))}
        </div>
      </Section>

      {/* 4 · After go-live */}
      <Section id="after" tone="mist">
        <SectionHeader
          align="left"
          kicker="4 · After go-live"
          title="Text us the change. That's the whole process."
          description="A new special, a price, a photo, a holiday closure: send it by text or email. On the Pro plan it's live within two business days; on Premier the next business day, and a special the same day. Seasonal menus are scheduled ahead and switch themselves."
        />
        {/* Four across from 1280px; a 2 × 2 grid below that keeps the cards readable */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {afterSteps.map((step, i) => (
            <StepCard key={step.title} step={i + 1} title={step.title} when={step.when}>
              {step.body}
            </StepCard>
          ))}
        </div>
      </Section>

      {/* Common questions */}
      <Section id="faq" tone="white">
        <SectionHeader kicker="Common questions" title="Things people ask before the first visit." />
        <FaqList items={faqs} className="mx-auto mt-12 max-w-3xl" />
      </Section>

      <CtaCard
        title="See it on your own wall first."
        body="We'll build a draft from your website, then bring a screen to your shop so you can see it at full size before deciding anything."
        primary={{ label: "Get your free draft board", href: "/contact" }}
      />
    </>
  );
}
