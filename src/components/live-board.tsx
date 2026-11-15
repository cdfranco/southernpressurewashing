"use client";

import { useEffect, useRef, useState } from "react";
import { TvFrame } from "./board";

type LiveBoardProps = {
  /** URL of the live board. */
  src: string;
  /** Screenshot shown until the live board loads. */
  poster: string;
  title: string;
  portrait?: boolean;
  label?: string;
  stand?: boolean;
  className?: string;
};

/**
 * A live board in a TV frame. The boards are 1.5–2.6 MB each, so the iframe
 * only loads when it nears the viewport, and on small screens or Data Saver we
 * show the screenshot with a "Load live board" button instead.
 */
export function LiveBoard({ src, poster, title, portrait, label = "Live now", stand, className }: LiveBoardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"poster" | "manual" | "live">("poster");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    const light = window.matchMedia("(max-width: 900px)").matches || Boolean(nav.connection?.saveData);
    const reveal = () => setMode(light ? "manual" : "live");

    if (!("IntersectionObserver" in window)) {
      const frame = requestAnimationFrame(reveal);
      return () => cancelAnimationFrame(frame);
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          reveal();
          io.disconnect();
        }
      },
      { rootMargin: light ? "0px" : "300px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      <TvFrame portrait={portrait} live={label} stand={stand}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={poster} alt="" className="absolute inset-0 h-full w-full object-cover" />
        {mode === "live" && (
          <iframe
            key={src}
            src={src}
            title={title}
            loading="lazy"
            tabIndex={-1}
            onLoad={() => setLoaded(true)}
            className={`absolute inset-0 h-full w-full border-0 transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
          />
        )}
        {mode === "manual" && (
          <div className="absolute inset-0 grid place-items-center bg-ink-950/35">
            <button
              type="button"
              onClick={() => setMode("live")}
              className="rounded-[10px] bg-white px-4 py-2.5 font-display text-sm font-bold text-ink-900 shadow-lg"
            >
              Load live board
            </button>
          </div>
        )}
      </TvFrame>
    </div>
  );
}
