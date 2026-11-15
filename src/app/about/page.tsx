import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { TvFrame } from "@/components/board";
import { Feature, InfoCard } from "@/components/check-list";
import { CtaCard } from "@/components/cta-card";
import { PageHeader } from "@/components/page-header";
import { Kicker, Section, SectionHeader } from "@/components/section";
import { boardBySlug, boardImage, brand } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Athena Boards is a digital-board company in Athens, Georgia: we design branded boards, install the hardware, and keep them current, for one café or a whole chain.",
};

const inlineLink = "font-semibold text-brand-700 underline underline-offset-4 hover:text-brand-800";

const beliefs: { title: string; icon: string; body: ReactNode }[] = [
  {
    title: "Full service, published prices.",
    icon: "briefcase",
    body: "The signage market splits into software you run yourself and agencies that quote by phone. We do the whole thing and print the number.",
  },
  {
    title: "Designed, not templated.",
    icon: "pencil",
    body: "Every board starts from the business's own colors, typefaces, photography and menu. If it could belong to any other business, it isn't done.",
  },
  {
    title: "Boring hardware, in a good way.",
    icon: "tv",
    body: "Commercial panels rated for the hours a restaurant keeps, running the board on their own signage OS, with warranties in your name.",
  },
  {
    title: "Honest about what we are.",
    icon: "shield",
    body: (
      <>
        A young company with every board live and inspectable, a plain-language agreement, and no lock-in. Read our{" "}
        <Link href="/trust" className={inlineLink}>
          security and trust page
        </Link>{" "}
        before you ask; we wrote it for the people who have to say yes.
      </>
    ),
  },
];

const organization: { title: string; icon: string; body: string }[] = [
  {
    title: "Design & software",
    icon: "layout",
    body: "Boards, the fleet system and the kiosk software are built and maintained in-house in Athens. One point of contact from the first draft to the last content change.",
  },
  {
    title: "Installation",
    icon: "wrench",
    body: "Our own technician within about 60 miles of Athens. Nationwide, vetted and insured field technicians working from our pre-configured kit and one-page install sheet, with photo confirmation on every ticket.",
  },
  {
    title: "Hardware & hosting partners",
    icon: "globe",
    body: "Commercial displays from LG and Samsung through authorized distribution; hosting on Vercel's SOC 2-audited content delivery network; e-signature and invoicing through standard business tools your finance team already accepts.",
  },
];

const facts: { term: string; detail: ReactNode }[] = [
  { term: "Name", detail: "Athena Boards, operating from Franco Creative Agency, Athens, Georgia" },
  { term: "Founder", detail: "Caleb Franco" },
  { term: "Founded", detail: "2026, Athens, Georgia" },
  {
    term: "Serves",
    detail:
      "Athens and Atlanta by our own team; the Southeast and nationwide chain rollouts through our field-technician network",
  },
  {
    term: "Contact",
    detail: (
      <>
        <a href={brand.phoneHref} className={inlineLink}>
          {brand.phone}
        </a>{" "}
        ·{" "}
        <a href={`mailto:${brand.email}`} className={`${inlineLink} break-words`}>
          {brand.email}
        </a>
      </>
    ),
  },
];

export default function AboutPage() {
  const bakingBoard = boardBySlug("independent-baking");

  return (
    <>
      <PageHeader
        kicker="About"
        title="Built in Athens, Georgia. Built to roll out."
        description="Athena Boards started with a question a coffee roaster asked: why does the screen behind the counter still show a cable channel? We built them a board that looked like their brand and ran itself. Then we built twenty more for restaurants, bakeries, a laundromat, a rec center, the city's welcome center and a national breakfast chain, and turned what we learned into a company."
      />

      {/* What we believe */}
      <Section tone="white">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="min-w-0">
            <SectionHeader
              align="left"
              kicker="What we believe"
              title="A screen on a wall should be someone's job. Ours."
            />
            <div className="mt-10 space-y-8">
              {beliefs.map((item) => (
                <Feature key={item.title} title={item.title} icon={item.icon}>
                  {item.body}
                </Feature>
              ))}
            </div>
          </div>
          <figure className="min-w-0">
            <TvFrame stand portrait={bakingBoard.portrait}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={boardImage(bakingBoard.slug, "lg")}
                alt="Independent Baking Co. board"
                width={1440}
                height={810}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </TvFrame>
            <figcaption className="mt-5 text-center text-[15px] leading-relaxed text-body">
              Every board in our gallery is running right now.{" "}
              <Link href="/work" className={inlineLink}>
                See them all
              </Link>
              .
            </figcaption>
          </figure>
        </div>
      </Section>

      {/* How we're organized */}
      <Section tone="mist">
        <SectionHeader
          align="left"
          kicker="How we're organized"
          title="Small core, vetted network, named accountability."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {organization.map((item) => (
            <InfoCard key={item.title} title={item.title} icon={item.icon}>
              <p>{item.body}</p>
            </InfoCard>
          ))}
        </div>
      </Section>

      {/* Company facts */}
      <Section tone="white">
        <div className="mx-auto max-w-4xl rounded-2xl border border-line bg-white p-7 sm:p-10">
          <h2 className="font-sans">
            <Kicker>Company facts</Kicker>
          </h2>
          <dl className="mt-6 divide-y divide-line border-t border-line">
            {facts.map((fact) => (
              <div key={fact.term} className="grid gap-1 py-5 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-8">
                <dt className="font-display text-[15px] font-bold text-ink-900">{fact.term}</dt>
                <dd className="text-base leading-relaxed text-body">{fact.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      {/* Talk to the person who builds it: the reference's closing block, rendered as the page's call to action */}
      <CtaCard
        title={
          <>
            <span className="mb-4 block font-sans leading-normal">
              <Kicker>Talk to the person who builds it</Kicker>
            </span>
            {"You'll deal with the founder."}
          </>
        }
        body="Every proposal, every board draft and every support call goes through Caleb Franco. That is a feature while we are this size, and the agreement is written so that it is never a risk: self-contained boards, hardware you own, source escrow on chain accounts, and month-to-month terms after the initial period."
        primary={{ label: "Book a 15-minute demo", href: "/contact" }}
        secondary={{ label: "Security & trust", href: "/trust" }}
      />
    </>
  );
}
