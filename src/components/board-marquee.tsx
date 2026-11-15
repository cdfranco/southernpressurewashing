import { boardImage, boards, type Board } from "@/content/site";

function Row({ items, direction }: { items: Board[]; direction: "left" | "right" }) {
  // The list is rendered twice so the strip can loop without a visible seam.
  const tiles = (hidden: boolean) =>
    items.map((board) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        key={`${board.slug}-${hidden}`}
        src={boardImage(board.slug, "sm")}
        alt={hidden ? "" : board.alt}
        aria-hidden={hidden || undefined}
        width={720}
        height={405}
        loading="lazy"
        decoding="async"
        className="aspect-video w-[19rem] shrink-0 rounded-xl border border-line object-cover shadow-card sm:w-[26rem] lg:w-[34rem]"
      />
    ));
  return (
    <div className={`flex w-max gap-4 sm:gap-6 ${direction === "left" ? "marquee-left" : "marquee-right"}`}>
      {tiles(false)}
      {tiles(true)}
    </div>
  );
}

/** Two rows of real board screenshots drifting in opposite directions. */
export function BoardMarquee() {
  const landscape = boards.filter((b) => !b.portrait);
  const half = Math.ceil(landscape.length / 2);
  return (
    <div
      className="marquee flex flex-col gap-4 overflow-hidden sm:gap-6 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
      style={{ ["--marquee-duration" as string]: "90s" }}
    >
      <Row items={landscape.slice(0, half)} direction="left" />
      <Row items={landscape.slice(half)} direction="right" />
    </div>
  );
}
