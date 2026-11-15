"use client";

import { useState } from "react";
import { boardBySlug, boardImage, liveShowcase } from "@/content/site";
import { Icon } from "./icons";
import { LiveBoard } from "./live-board";

/** One live board at a time, with a pager. Only the visible board is loaded. */
export function LiveShowcase() {
  const [index, setIndex] = useState(0);
  const total = liveShowcase.length;
  const item = liveShowcase[index];
  const board = boardBySlug(item.board);
  const go = (delta: number) => setIndex((i) => (i + delta + total) % total);

  const arrow =
    "flex h-12 w-12 items-center justify-center rounded-[10px] border border-slate-300 bg-white text-ink-900 transition-colors hover:border-ink-900/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500";

  return (
    <div>
      <div className="grid overflow-hidden rounded-3xl border border-line bg-white/80 shadow-card backdrop-blur lg:grid-cols-[1.25fr_1fr]">
        <div className="bg-ink-900 p-4 sm:p-6">
          <LiveBoard
            key={board.slug}
            src={board.liveUrl!}
            poster={boardImage(board.slug, "lg")}
            title={`Live demo board — ${board.name}, running now`}
          />
        </div>
        <div key={board.slug} className="fade-up flex flex-col justify-center p-7 sm:p-10">
          <p className="text-[12.5px] font-bold uppercase tracking-[0.14em] text-brand-700">{item.kicker}</p>
          <h3 className="mt-3 font-display text-[1.75rem] font-bold leading-tight text-ink-900 sm:text-[2rem]">{board.name}</h3>
          <p className="mt-4 text-lg leading-relaxed">{item.body}</p>
          <a
            href={board.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-6 inline-flex w-fit items-center gap-1.5 font-semibold text-brand-700 underline-offset-4 hover:underline"
          >
            Open the board full screen
            <Icon name="arrow-up-right" className="h-4 w-4" strokeWidth={2.2} />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-4">
        <p className="text-sm text-ink-900/70" aria-live="polite">
          <span className="font-bold text-ink-900">{index + 1}</span> of {total}
        </p>
        <div className="flex gap-2">
          <button type="button" onClick={() => go(-1)} aria-label="Previous board" className={arrow}>
            <Icon name="chevron-left" className="h-5 w-5" strokeWidth={2} />
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Next board" className={arrow}>
            <Icon name="chevron-right" className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
}
