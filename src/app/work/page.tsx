import type { Metadata } from "next";
import { BoardGrid } from "@/components/board";
import { CtaCard } from "@/components/cta-card";
import { PageHeader } from "@/components/page-header";
import { Section, SectionHeader } from "@/components/section";
import { boardCategories, boards } from "@/content/site";

export const metadata: Metadata = {
  title: "Boards we've built",
  description:
    "21 digital boards designed for 18 real businesses in and around Athens, Georgia: restaurants, coffee roasters, a bakery, a laundromat, a rec center, the city's welcome center, and a concept board for a national breakfast chain.",
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        kicker="Boards we've built"
        title="21 boards for 18 businesses. Twelve you can open right now."
        description="Every board below was designed from a real business's own brand, menu and hours. Two are under agreement with the restaurants that chose them; the rest were built as proposals and are shown here as our portfolio. Twelve are public — click one and it opens live, with today's date, the local weather and the current special. The others were built as private previews for the business and are shown as screenshots."
      >
        <p className="max-w-3xl rounded-2xl border border-line bg-white/80 px-5 py-4 text-sm leading-relaxed text-body sm:px-6 sm:py-5">
          {
            "Names, logos and menus belong to the businesses shown. A board here means we designed it for them, not that they endorse us. Where a board carries placeholder specials or prices it says so on screen. The First Watch board is a concept built from the chain's public ordering menu; First Watch is not a customer."
          }
        </p>
      </PageHeader>

      {/* One gallery per category, in the order set in src/content/site.ts */}
      {boardCategories.map((category, index) => {
        const isLast = index === boardCategories.length - 1;
        return (
          <Section key={category.id} id={category.id} tone={index % 2 === 0 ? "white" : "mist"}>
            <SectionHeader align="left" kicker={category.kicker} title={category.heading} />
            <div className="mt-10 lg:mt-12">
              <BoardGrid boards={boards.filter((board) => board.category === category.id)} />
            </div>
            {isLast && (
              <p className="mt-8 max-w-3xl text-sm leading-relaxed text-slate-500">
                &quot;Private preview&quot; boards were built for the business that asked for them and open with a link we send;
                the screenshot shows the board as rendered today. Ask us for a live link.
              </p>
            )}
          </Section>
        );
      })}

      <CtaCard
        title="Yours would be next."
        body="Send your website. Three days later there's a board with your name on it — for your eyes only until you say otherwise."
        primary={{ label: "Get your free draft board", href: "/contact" }}
      />
    </>
  );
}
