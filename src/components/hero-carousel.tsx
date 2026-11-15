"use client";

import { useEffect, useRef, useState } from "react";
import { boardImage, heroSlides } from "@/content/site";
import { Icon } from "./icons";

const INTERVAL = 4500;
const COUNT_MS = 700;

/**
 * Rotating portrait card for the hero: an illustrated venue with a real board
 * on its screen, and a proof point that counts up as each slide arrives.
 */
export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState<number | null>(null);
  const hovered = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      if (document.hidden || hovered.current) return;
      setIndex((i) => (i + 1) % heroSlides.length);
    }, INTERVAL);
    return () => window.clearInterval(timer);
  }, []);

  // Count the number up each time a new slide becomes active (not on first paint).
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const target = heroSlides[index].value;
    const started = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - started) / COUNT_MS);
      setCount(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) frame = requestAnimationFrame(tick);
      else setCount(null);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [index]);

  const slide = heroSlides[index];
  const shown = count ?? slide.value;

  return (
    <div
      className="relative mx-auto w-full max-w-[32.5rem]"
      onMouseEnter={() => (hovered.current = true)}
      onMouseLeave={() => (hovered.current = false)}
    >
      <div
        className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-ink-900 shadow-float"
        role="region"
        aria-roledescription="carousel"
        aria-label="Boards on real walls"
      >
        {heroSlides.map((s, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={s.image}
            src={s.image}
            alt={i === index ? s.alt : ""}
            aria-hidden={i !== index}
            width={1040}
            height={1300}
            loading={i === 0 ? "eager" : "lazy"}
            fetchPriority={i === 0 ? "high" : "auto"}
            decoding="async"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out ${i === index ? "opacity-100" : "opacity-0"}`}
          />
        ))}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink-950/55 to-transparent" />

        {/* Slide dashes */}
        <div className="absolute bottom-5 right-5 flex gap-1.5" role="tablist" aria-label="Choose a slide">
          {heroSlides.map((s, i) => (
            <button
              key={s.image}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Slide ${i + 1} of ${heroSlides.length}`}
              onClick={() => setIndex(i)}
              className="group flex h-6 items-center"
            >
              <span className={`block h-[3px] w-8 rounded-full transition-colors ${i === index ? "bg-white" : "bg-white/40 group-hover:bg-white/70"}`} />
            </button>
          ))}
        </div>
      </div>

      {/* Proof point */}
      <div
        key={index}
        className="fade-up absolute -left-3 bottom-12 flex w-[17.5rem] max-w-[86%] items-center gap-3 rounded-2xl border border-white/70 bg-white/85 p-4 shadow-card backdrop-blur-md sm:-left-14 sm:bottom-14 sm:w-[19rem]"
        aria-live="polite"
      >
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-2 font-display text-[2rem] font-extrabold leading-none tracking-tight text-ink-900">
            <Icon name="chart" className="h-5 w-5 text-emerald-600" strokeWidth={2} />
            <span className="tabular-nums">
              {slide.prefix}
              {shown}
              {slide.suffix}
            </span>
          </p>
          <p className="mt-1.5 text-[13.5px] leading-snug text-ink-900/75">{slide.label}</p>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={boardImage(slide.board, "sm")}
          alt=""
          width={72}
          height={72}
          loading="lazy"
          className="h-[4.5rem] w-[4.5rem] shrink-0 rounded-full border-2 border-white object-cover shadow"
        />
      </div>
    </div>
  );
}
