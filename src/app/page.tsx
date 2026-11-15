import Link from "next/link";
import { Button, TextLink } from "@/components/button";
import { BoardMarquee } from "@/components/board-marquee";
import { BoardShot } from "@/components/board";
import { CheckList, Feature, InfoCard } from "@/components/check-list";
import { CtaCard } from "@/components/cta-card";
import { FaqList, type FaqItem } from "@/components/faq";
import { FilmPlayer } from "@/components/film-player";
import { FleetDemo } from "@/components/fleet-demo";
import { HeroCarousel } from "@/components/hero-carousel";
import { Icon } from "@/components/icons";
import { LiveShowcase } from "@/components/live-showcase";
import { PackageCards } from "@/components/package-cards";
import { Accent, Kicker, Section, SectionHeader } from "@/components/section";
import { Tabs } from "@/components/tabs";
import { boardBySlug, brand, builtFor, film } from "@/content/site";

/* ── Line-of-business tabs ─────────────────────────────────────────── */

const lines = [
  {
    id: "restaurants",
    label: "Restaurants",
    title: "Specials that know what day it is.",
    body: "Weekly specials with today highlighted. A live menu with prices you can change any time, and an open / closing-soon badge driven by the clock.",
    bullets: [
      "Rotating featured items: big photos, a name, a line, a price",
      "A breakfast menu until 11, lunch after, happy hour at 4",
      "Seasonal menus that switch on the dates you choose",
    ],
    link: { label: "See restaurant boards", href: "/work#restaurants" },
    board: "lalos",
    chips: ["Weekly specials", "Live prices", "Open / closing-soon badge"],
  },
  {
    id: "coffee",
    label: "Coffee & bakeries",
    title: "Menus that look like the bag on the shelf.",
    body: "Every board starts from the business's own colors, typefaces, photography and menu. If it could belong to any other business, it isn't done.",
    bullets: [
      "A bakery board that knows what day it is: today's bake list, highlighted",
      "Rotating offers, and the coffees on the bar right now",
      "A 43\" screen mounted upright next to the register, or a 65\" in the dining room",
    ],
    link: { label: "See coffee and bakery boards", href: "/work#coffee" },
    board: "independent-baking",
    chips: ["Day-of-week bake list", "Rotating offers", "Portrait or landscape"],
  },
  {
    id: "services",
    label: "Services & schedules",
    title: "Not every wall is a menu.",
    body: "A rec center's 9:25 class. A laundromat's services and prices. The welcome center's events feed. It changes at midnight without anyone touching it.",
    bullets: [
      "Class and pool schedules that follow the clock through the day",
      "Services, prices, pickup and delivery in one panel",
      "Real weather for your address, refreshed every 15 minutes",
    ],
    link: { label: "See service and schedule boards", href: "/work#services" },
    board: "ywco",
    chips: ["Clock-driven schedule", "Local weather", "Scrolling ticker"],
  },
];

function LinePanel({ line }: { line: (typeof lines)[number] }) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <div>
        <h3 className="font-display text-[1.75rem] font-bold leading-tight text-ink-900 sm:text-[2rem]">{line.title}</h3>
        <p className="mt-4 text-lg leading-relaxed">{line.body}</p>
        <CheckList items={line.bullets} className="mt-6" />
        <TextLink href={line.link.href} className="mt-8 text-[1.05rem]">
          {line.link.label}
        </TextLink>
      </div>
      <div className="relative pb-7">
        <BoardShot board={boardBySlug(line.board)} />
        <div className="absolute inset-x-4 bottom-0 flex flex-wrap justify-center gap-x-5 gap-y-1.5 rounded-xl border border-line bg-white/95 px-4 py-3 shadow-card backdrop-blur sm:inset-x-8">
          {line.chips.map((chip) => (
            <span key={chip} className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-ink-900">
              <Icon name="check" className="h-3.5 w-3.5 text-brand-600" strokeWidth={3} />
              {chip}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Trust ─────────────────────────────────────────────────────────── */

const trust = [
  {
    icon: "check",
    title: "You see it before you pay.",
    body: "The first version is built at our cost. If you don't love it, you owe nothing.",
  },
  {
    icon: "wifi",
    title: "Boards are self-contained.",
    body: "Fonts, photos and content load with the page, so a Wi-Fi drop doesn't blank the screen — only the weather hides.",
  },
  {
    icon: "lock",
    title: "Our own locked player software.",
    body: "Boards run in kiosk software we wrote: PIN-locked, no menus for staff to wander into, and it relaunches itself if anything interrupts it.",
  },
  {
    icon: "shield",
    title: "Commercial-grade options with a 3-year limited warranty.",
    body: "Consumer 4K displays for most local walls; 16/7-rated commercial panels with a 3-year limited manufacturer warranty where a screen runs all day, every day, and for every chain rollout.",
  },
  {
    icon: "document",
    title: "Plain-language agreements, published terms.",
    body: "A short agreement you can read on your phone. Essential is month to month; Pro and Premier carry a 12- or 24-month term and take $200 off the package.",
  },
  {
    icon: "phone",
    title: "Local, and we answer the phone.",
    body: `We're in Athens, Georgia. Call ${brand.phone}. For chain rollouts we dispatch installs nationwide through a field-technician marketplace and stay the vendor of record for every screen.`,
  },
];

/* ── FAQ ───────────────────────────────────────────────────────────── */

const faqs: FaqItem[] = [
  {
    question: "Do I pay anything before I've seen the board?",
    answer:
      "No. We build the first version at our own cost from your website or menu and send you a link. If you approve it, you pay the package fee, and the design work is included in it. If you don't, you owe nothing.",
  },
  {
    question: "How long from first contact to a screen on the wall?",
    answer: (
      <>
        About two weeks for a local business: three days to see your draft board, a couple of days for corrections and the
        agreement, and an install slot the following week. Chains: see <Link href="/franchise#rollout">how a rollout runs</Link>.
      </>
    ),
  },
  {
    question: "Is there a portal I have to learn?",
    answer:
      "No. Most clients send changes by text. Chains get a dashboard for store status and campaign scheduling, and store managers get a small form for the fields HQ lets them edit.",
  },
  {
    question: "Can the board show something different in the morning and the evening?",
    answer:
      "Yes. Boards are clock-driven: a breakfast menu until 11, lunch after, happy hour at 4, a \"closed — see you tomorrow\" state after hours. Weekly specials highlight the current day. Seasonal menus switch on the dates you choose.",
  },
  {
    question: "Can I install the screen myself?",
    answer: (
      <>
        Yes, and it costs $150 less. You get the same display and mount as the installed package, set up for your board, with
        a one-page install sheet, and we bring it live with you remotely. Hang it where and how you want. Pickup or delivery is
        free within 60 miles of Athens; shipping elsewhere is quoted with your order.{" "}
        <Link href="/pricing#install">How installing it yourself works</Link>.
      </>
    ),
  },
  {
    question: "Who owns the display and the player?",
    answer:
      "You do. Title to the hardware transfers to you when the package is paid, and the manufacturer's warranty is passed through to you. Our software stays ours and is licensed to you while you're on a care plan. The one exception is the partner-panel offset, where we keep title because we're paying for the screen.",
  },
  {
    question: "Is there a contract?",
    answer:
      "A two-page agreement you can read and accept on your phone. Packages are one-time. Essential is month to month with 30 days' notice; Pro is a 12-month term and Premier a 24-month term, each $200 off the package. Chain system agreements run 36 months with per-location order schedules.",
  },
];

export default function Home() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-hero relative overflow-hidden">
        <div className="mx-auto grid max-w-[80rem] items-center gap-14 px-5 pb-14 pt-12 sm:px-8 sm:pt-16 lg:grid-cols-[1.12fr_1fr] lg:gap-14 lg:pb-20 lg:pt-20">
          <div className="flex flex-col items-start">
            <Kicker>{brand.tagline}</Kicker>
            <h1 className="mt-5 text-[2.5rem] font-extrabold leading-[1.07] tracking-[-0.035em] sm:text-[3.25rem] lg:text-[3.4rem] xl:text-[3.75rem]">
              Your menu, your specials, your brand — on a screen that <Accent>runs itself.</Accent>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-900/80 sm:text-xl">
              We design the board in your brand, mount the screen, and keep it current — specials, seasonal menus, hours, live
              weather — under a flat monthly plan. One screen for a café. One system for six hundred locations.
            </p>

            <div className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-start">
              <div className="flex flex-col items-center gap-2.5">
                <Button as="link" href="/contact" size="lg" className="w-full sm:w-auto">
                  Get your free draft board
                  <Icon name="arrow-right" className="h-4 w-4" strokeWidth={2.4} />
                </Button>
                <p className="text-[15px] text-ink-900/70">$0 due until you&apos;ve seen your board</p>
              </div>
              <Button as="link" href="/pricing" variant="secondary" size="lg" className="w-full sm:w-auto">
                See pricing
              </Button>
            </div>

            <p className="mt-8 max-w-xl text-[15px] leading-relaxed text-ink-900/75">
              Installed packages from <strong>$950</strong>, <strong>$150</strong> less if you install it yourself, or{" "}
              <strong>$500</strong> on a TV you already own. Care plans from{" "}
              <strong>$49</strong> a month. You see your board before you pay anything.
            </p>
            <a
              href="#how"
              className="group mt-5 inline-flex items-center gap-2.5 text-[15px] font-semibold text-ink-900 underline-offset-4 hover:underline"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-900 text-white transition-transform group-hover:scale-110">
                <Icon name="play" className="h-3 w-3 fill-current" strokeWidth={0} />
              </span>
              Watch how it works · {film.duration} seconds
            </a>
          </div>

          <div className="pl-3 sm:pl-14 lg:pl-10">
            <HeroCarousel />
          </div>
        </div>

        {/* Built for */}
        <div className="pb-14 lg:pb-20">
          <p className="px-5 text-center text-[15px] text-ink-900/70">
            Built for the businesses on your street, and the chains on every street
          </p>
          <div
            className="marquee mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_14%,black_86%,transparent)]"
            style={{ ["--marquee-duration" as string]: "44s" }}
          >
            <ul className="marquee-left flex w-max items-center">
              {[...builtFor, ...builtFor].map((item, i) => (
                <li
                  key={`${item.label}-${i}`}
                  aria-hidden={i >= builtFor.length || undefined}
                  className="flex shrink-0 items-center gap-2.5 px-7 font-display text-lg font-bold text-ink-900/45 sm:px-9"
                >
                  <Icon name={item.icon} className="h-5 w-5" />
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── What you get ── */}
      <Section tone="white">
        <div className="grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
          <SectionHeader
            align="left"
            size="lg"
            kicker="What you get"
            title="A board that looks like it was made by your brand. Because it was."
          />
          <div className="flex flex-col items-start justify-end gap-6">
            <p className="text-lg leading-relaxed text-ink-900/80 sm:text-xl">
              Not a template with your logo dropped in. We pull your colors, your typefaces, your photos and your real menu, and
              build a screen that belongs on your wall.
            </p>
            <Button as="link" href="/contact">
              Get your free draft board
            </Button>
          </div>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          <InfoCard icon="pencil" title="Designed for you, before you pay">
            We build the first version from your website and menu and send you a link. You see the finished board on your phone
            before a dollar changes hands. Then one round of corrections, and it&apos;s yours.
          </InfoCard>
          <InfoCard icon="wrench" title="Screen and mount included, installed your way">
            Local and Commercial packages include the display and a lockable mount; the board runs on the screen itself, so
            there is no extra box to fail. We install it in one visit with the cables hidden, or you hang it yourself and take
            $150 off. Already have a TV? The $500 Board Kit puts the board on it.
          </InfoCard>
          <InfoCard icon="refresh" title="Kept current, so you never touch it">
            Text us a new special or a price change and we put it on the screen within your plan&apos;s turnaround — two business
            days on Pro, next business day on Premier with specials the same day. Seasonal menus swap on the date you set. Hours,
            the clock and the weather update themselves.
          </InfoCard>
        </div>
      </Section>

      {/* ── The film ── */}
      <Section id="how" tone="paper">
        <SectionHeader
          kicker="How it works"
          title="From first email to a screen on the wall in about two weeks."
          className="mb-10 sm:mb-12"
        />
        <FilmPlayer />
        <p className="mx-auto mt-10 max-w-3xl text-center text-sm leading-relaxed text-slate-500">{film.caption}</p>
        <div className="mt-8 flex justify-center">
          <Button as="link" href="/how-it-works" variant="secondary">
            What we do, install and maintain
          </Button>
        </div>
      </Section>

      {/* ── Proof: stats and live boards ── */}
      <Section tone="band">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            <Kicker>Boards we&apos;ve built</Kicker>
            <h2 className="mt-4 text-[1.9rem] font-bold leading-[1.15] sm:text-4xl lg:text-[2.6rem]">
              Every one of these is a real business in and around <Accent>Athens, Georgia.</Accent>
            </h2>
          </div>
          <dl className="grid grid-cols-3 gap-6">
            {[
              { value: "21", label: "Boards designed" },
              { value: "18", label: "Businesses" },
              { value: "12", label: "Open live right now" },
            ].map((stat) => (
              <div key={stat.label}>
                <dd className="font-display text-4xl font-extrabold tracking-tight text-ink-900 sm:text-5xl">{stat.value}</dd>
                <dt className="mt-1.5 text-[15px] leading-snug sm:text-base">{stat.label}</dt>
              </div>
            ))}
          </dl>
        </div>
        <p className="mt-8 max-w-3xl text-lg leading-relaxed">
          Coffee roasters, taquerías, a laundromat, a bakery, a rec center and the city&apos;s welcome center — plus one concept
          board for a national breakfast chain, built from its public menu. Each was designed from the business&apos;s own brand
          and menu. The ones below open live.
        </p>
        <div className="mt-12">
          <LiveShowcase />
        </div>
      </Section>

      {/* ── Line of business ── */}
      <Section tone="paper">
        <SectionHeader title="Boards that work in your line of business" className="mb-8 sm:mb-10" />
        <Tabs items={lines.map((line) => ({ id: line.id, label: line.label, content: <LinePanel line={line} /> }))} />
        <div className="mt-14 flex justify-center">
          <Button as="link" href="/work" variant="secondary" size="lg">
            See all 21 boards
          </Button>
        </div>
      </Section>

      {/* ── Trust ── */}
      <Section tone="white">
        <SectionHeader
          kicker="Why businesses trust a small company with their wall"
          title="Small team. Serious hardware. Nothing hidden."
          description={
            <>
              Everything below is written up for IT, Legal and Purchasing on our{" "}
              <Link href="/trust" className="font-semibold text-brand-700 underline-offset-4 hover:underline">
                security &amp; trust page
              </Link>
              .
            </>
          }
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {trust.map((item) => (
            <InfoCard key={item.title} icon={item.icon} title={item.title}>
              {item.body}
            </InfoCard>
          ))}
        </div>
        <p className="mt-8 rounded-2xl border border-line bg-paper p-6 text-base leading-relaxed sm:p-7">
          <strong>Who&apos;s behind this.</strong> {brand.name} is run by {brand.founder} in Athens, Georgia. He designs every
          board and installs every screen within 60 miles; elsewhere, field technicians install from his kit and his sheet.{" "}
          <Link href="/about" className="font-semibold text-brand-700 underline-offset-4 hover:underline">
            About the company
          </Link>
          .
        </p>
      </Section>

      {/* ── Packages ── */}
      <Section tone="mist">
        <SectionHeader
          kicker="Pricing"
          title="One package fee. One monthly plan. No surprises."
          description="The package pays for the design, the hardware and the install, or less if you hang the screen yourself. The care plan keeps it running and current. Both are flat, both are published, and you see your board before you commit to either."
        />
        <PackageCards />
        <p className="mx-auto mt-10 max-w-4xl text-center text-base leading-relaxed">
          Care plans <strong>$49, $99 or $199</strong> a month cover hosting, monitoring, software updates and content changes.{" "}
          <Link href="/pricing#plans" className="font-semibold text-brand-700 underline-offset-4 hover:underline">
            Compare the three plans
          </Link>
          . Chains: one price per location — $1,500 + $99/month at list, down to $1,195 + $59 at 600+ locations.{" "}
          <Link href="/franchise" className="font-semibold text-brand-700 underline-offset-4 hover:underline">
            The chain program
          </Link>
          .
        </p>
      </Section>

      {/* ── Gallery ── */}
      <section className="overflow-hidden rounded-t-[2.5rem] bg-paper py-16 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
          <h2 className="max-w-3xl text-[1.75rem] font-bold leading-[1.15] sm:text-4xl lg:text-[2.6rem]">
            Designed from each business&apos;s own brand and menu, not from a template
          </h2>
          <TextLink href="/work" className="mt-6 text-[1.05rem]">
            See all 21 boards
          </TextLink>
        </div>
        <div className="mt-12">
          <BoardMarquee />
        </div>
      </section>

      {/* ── Chains ── */}
      <Section tone="ink">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeader
              align="left"
              tone="dark"
              kicker="Franchises & corporate chains"
              title="One board. Every location. Managed from one place."
              description="We build your brand's board once. Each store gets its own address, phone, hours, weather and prices from one deployment — pick a store, and the screen follows. Seasonal menus switch across the whole system on the date you set. Store managers edit only what's theirs."
            />
            <div className="mt-10 grid gap-7 sm:grid-cols-2">
              <Feature tone="dark" icon="document" title="Per-location content from one file">
                Address, hours, coordinates and price tiers per store. The concept board on the right carries every store in the
                chain&apos;s public ordering directory (678), with per-store prices for 28 Georgia stores.
              </Feature>
              <Feature tone="dark" icon="calendar" title="Central seasonal swaps">
                Campaigns carry start and end dates; every screen switches itself at midnight local time and back again when the
                promotion ends. Preview any date in advance.
              </Feature>
              <Feature tone="dark" icon="signal" title="Screens that report in">
                From your pilot&apos;s first install, every screen checks in on a schedule and your ops team gets a read-only
                status view: online, offline, last seen, current version.
              </Feature>
              <Feature tone="dark" icon="truck" title="Installed anywhere, priced per location">
                Chain installs are dispatched nationwide through a field-technician marketplace from a pre-configured kit, at one
                price per location with volume bands from ten stores.
              </Feature>
            </div>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button as="link" href="/franchise" variant="light">
                See the chain program
                <Icon name="arrow-right" className="h-4 w-4" strokeWidth={2.4} />
              </Button>
              <Button as="link" href="/contact?i=franchise" variant="outline-light">
                Request a pilot proposal
              </Button>
            </div>
          </div>
          <FleetDemo tone="dark" id="fleet-store-home" />
        </div>
      </Section>

      {/* ── FAQ ── */}
      <Section tone="paper">
        <div className="mx-auto max-w-[63rem]">
          <h2 className="max-w-xl text-[1.9rem] font-bold leading-[1.15] sm:text-4xl lg:text-[2.6rem]">
            Things people ask before the <Accent>first visit.</Accent>
          </h2>
          <FaqList items={faqs} className="mt-10" />
          <p className="mt-8 text-base">
            More answers on{" "}
            <Link href="/how-it-works#faq" className="font-semibold text-brand-700 underline-offset-4 hover:underline">
              how it works
            </Link>{" "}
            and{" "}
            <Link href="/pricing#faq" className="font-semibold text-brand-700 underline-offset-4 hover:underline">
              pricing
            </Link>
            .
          </p>
        </div>
      </Section>

      <CtaCard
        title="See your board before you decide."
        body="Send us your website or a photo of your menu. In a few days you'll have a link to a board designed for your business. No charge, no obligation."
      />
    </>
  );
}
