import { ReactNode } from "react";
import { boardImage, type Board } from "@/content/site";
import { Icon } from "./icons";

/** A slim TV bezel around a screenshot, video or live board. */
export function TvFrame({
  children,
  portrait = false,
  live,
  stand = false,
  className = "",
}: {
  children: ReactNode;
  portrait?: boolean;
  live?: string;
  stand?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="relative rounded-[14px] bg-ink-950 p-2 shadow-float ring-1 ring-inset ring-white/10 sm:p-2.5">
        {live && (
          <span className="absolute left-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur sm:left-5 sm:top-5">
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-emerald-400" />
            {live}
          </span>
        )}
        <div className={`relative overflow-hidden rounded-md bg-black ${portrait ? "aspect-[9/16]" : "aspect-video"}`}>{children}</div>
      </div>
      {stand && <div className="mx-auto h-3 w-[26%] rounded-b-[10px] bg-gradient-to-b from-ink-900 to-ink-950" />}
    </div>
  );
}

/** Static screenshot of a board inside a TV frame. */
export function BoardShot({
  board,
  size = "lg",
  className = "",
  priority = false,
}: {
  board: Board;
  size?: "sm" | "lg";
  className?: string;
  priority?: boolean;
}) {
  return (
    <TvFrame portrait={board.portrait} className={className}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={boardImage(board.slug, size)}
        alt={board.alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className="h-full w-full object-cover"
      />
    </TvFrame>
  );
}

/** Portfolio tile: opens the live board, or the full-size screenshot for private previews. */
export function BoardCard({ board }: { board: Board }) {
  const href = board.liveUrl ?? boardImage(board.slug, "lg");
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="card-lift group flex flex-col overflow-hidden rounded-2xl border border-line bg-white"
    >
      <div className="relative flex aspect-video items-center justify-center overflow-hidden bg-ink-950">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={boardImage(board.slug, "sm")}
          alt={board.alt}
          loading="lazy"
          decoding="async"
          className={
            board.portrait
              ? "h-full w-auto object-contain"
              : "h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          }
        />
        {board.liveUrl && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Live
          </span>
        )}
      </div>
      <div className="flex flex-1 items-start justify-between gap-3 p-5">
        <div>
          <h3 className="font-display text-[1.05rem] font-bold leading-snug text-ink-900">{board.name}</h3>
          <p className="mt-1 text-sm leading-relaxed text-body">{board.caption}</p>
        </div>
        <Icon
          name="arrow-up-right"
          className="mt-1 h-4 w-4 shrink-0 text-slate-400 transition-colors group-hover:text-brand-700"
          strokeWidth={2.2}
        />
      </div>
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}

export function BoardGrid({ boards }: { boards: Board[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {boards.map((board) => (
        <BoardCard key={board.slug} board={board} />
      ))}
    </div>
  );
}
