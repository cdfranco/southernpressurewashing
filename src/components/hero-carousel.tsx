"use client";

import { useEffect, useRef, useState } from "react";
import { boardImage, heroSlides } from "@/content/site";

const INTERVAL = 4500;
const COUNT_MS = 700;

/**
 * Rotating portrait card for the hero: a room mockup with a real board on its
 * screen. A status bar docked along the bottom shows that board on a miniature
 * screen beside a proof point that counts up as each slide arrives. The rooms are
 * generated images, so the card says "Mockup".
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
        aria-label="Board mockups in different rooms"
      >
        {heroSlides.map((s, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={s.image}
            src={s.image}
            alt={i === index ? s.alt : ""}
            aria-hidden={i !== index}
            width={1536}
            height={1920}
            loading={i === 0 ? "eager" : "lazy"}
            fetchPriority={i === 0 ? "high" : "auto"}
            decoding="async"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out ${i === index ? "opacity-100" : "opacity-0"}`}
          />
        ))}
        <span className="absolute left-4 top-4 rounded-full bg-ink-950/55 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur">
          Mockup
        </span>

        {/* Slide dashes */}
        <div className="absolute right-4 top-3.5 flex gap-1 rounded-full bg-ink-950/55 px-2.5 backdrop-blur" role="tablist" aria-label="Choose a slide">
          {heroSlides.map((s, i) => (
            <button
              key={s.image}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Slide ${i + 1} of ${heroSlides.length}`}
              onClick={() => setIndex(i)}
              className="group flex h-7 items-center"
            >
              <span className={`block h-[3px] w-5 rounded-full transition-colors ${i === index ? "bg-white" : "bg-white/40 group-hover:bg-white/70"}`} />
            </button>
          ))}
        </div>

        {/* Proof point: a status bar docked along the bottom of the picture, with the
            slide's board on a miniature screen. */}
        <div
          className="absolute inset-x-3 bottom-3 flex items-center gap-3.5 rounded-2xl border border-white/70 bg-white/85 p-3 shadow-card backdrop-blur-md sm:inset-x-4 sm:bottom-4 sm:gap-4 sm:p-3.5"
          aria-live="polite"
        >
          <div key={`screen-${index}`} className="fade-up w-[5.5rem] shrink-0 rounded-[7px] bg-ink-950 p-[3px] shadow-md sm:w-[7rem]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={boardImage(slide.board, "sm")}
              alt=""
              width={160}
              height={90}
              loading="lazy"
              className="aspect-video w-full rounded-[4px] object-cover object-left-top"
            />
          </div>
          <div key={index} className="fade-up min-w-0 flex-1">
            <p className="font-display text-[1.75rem] font-extrabold leading-none tracking-tight text-ink-900 tabular-nums sm:text-[2rem]">
              {slide.prefix}
              {shown}
              {slide.suffix}
            </p>
            <p className="mt-1.5 text-[13px] leading-snug text-ink-900/75 sm:text-[13.5px]">{slide.label}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
