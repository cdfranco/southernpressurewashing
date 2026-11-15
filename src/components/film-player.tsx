"use client";

import { useEffect, useRef, useState } from "react";
import { film } from "@/content/site";
import { Icon } from "./icons";

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

/**
 * The process film with its four chapters as tabs. The film plays when it
 * scrolls into view (muted, looping), each tab jumps to its chapter, and the
 * active tab follows playback.
 */
export function FilmPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const userPaused = useRef(false);
  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);

  const { chapters, duration } = film;
  const activeIndex = chapters.reduce((acc, c, i) => (time >= c.start ? i : acc), 0);
  const active = chapters[activeIndex];

  // Play while on screen, pause when scrolled away. Never auto-play for people who ask for less motion.
  useEffect(() => {
    const video = videoRef.current;
    const frame = frameRef.current;
    if (!video || !frame || !("IntersectionObserver" in window)) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          if (!reduced && !userPaused.current) video.play().catch(() => {});
        } else if (!video.paused) {
          video.pause();
        }
      },
      { threshold: [0, 0.5, 1] },
    );
    io.observe(frame);
    return () => io.disconnect();
  }, []);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      userPaused.current = false;
      video.play().catch(() => {});
    } else {
      userPaused.current = true;
      video.pause();
    }
  };

  const jump = (start: number) => {
    const video = videoRef.current;
    if (!video) return;
    userPaused.current = false;
    video.currentTime = start + 0.05;
    setTime(start + 0.05);
    video.play().catch(() => {});
  };

  return (
    <div>
      {/* Chapters */}
      <div className="border-b border-line">
        <div className="no-scrollbar -mb-px flex gap-1 overflow-x-auto lg:justify-center" role="group" aria-label="Film chapters">
          {chapters.map((c, i) => {
            const selected = i === activeIndex;
            return (
              <button
                key={c.id}
                type="button"
                aria-pressed={selected}
                onClick={() => jump(c.start)}
                className={`shrink-0 whitespace-nowrap border-b-2 px-4 py-4 font-display text-[1.02rem] font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-500 sm:px-5 ${
                  selected ? "border-brand-600 text-brand-700" : "border-transparent text-ink-900/80 hover:text-ink-900"
                }`}
              >
                {c.step}. {c.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Video */}
      <div ref={frameRef} className="mt-8 rounded-[1.75rem] border border-line bg-white/70 p-2.5 shadow-card sm:mt-12 sm:p-6">
        <div className="bg-film group relative aspect-video overflow-hidden rounded-2xl">
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            poster={film.poster}
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={`${film.title}: a silent animated walkthrough of the four steps described below`}
            onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
            onPlay={() => {
              setPlaying(true);
              setStarted(true);
            }}
            onPause={() => setPlaying(false)}
            onClick={toggle}
          >
            <source src={film.webm} type="video/webm" />
            <source src={film.mp4} type="video/mp4" />
          </video>

          {/* Start button over the poster */}
          {!started && (
            <button
              type="button"
              onClick={toggle}
              className="absolute left-1/2 top-1/2 inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-2.5 rounded-full bg-white px-6 py-3.5 font-display text-base font-bold text-ink-900 shadow-float ring-8 ring-white/25 transition-transform hover:scale-[1.03] sm:text-lg"
            >
              <Icon name="play" className="h-4.5 w-4.5 fill-current" strokeWidth={0} />
              {film.title}
            </button>
          )}

          {/* Controls */}
          <div
            className={`absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-ink-950/75 to-transparent px-3 pb-3 pt-10 transition-opacity duration-200 sm:px-5 sm:pb-4 ${
              started ? "opacity-100 sm:opacity-0 sm:focus-within:opacity-100 sm:group-hover:opacity-100" : "opacity-0"
            } ${!playing && started ? "!opacity-100" : ""}`}
          >
            <button
              type="button"
              onClick={toggle}
              aria-label={playing ? "Pause the film" : "Play the film"}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-ink-900 shadow transition-transform hover:scale-105"
            >
              <Icon name={playing ? "pause" : "play"} className={`h-4 w-4 ${playing ? "" : "fill-current"}`} strokeWidth={playing ? 2.6 : 0} />
            </button>
            <div className="flex flex-1 gap-1" aria-hidden="true">
              {chapters.map((c, i) => {
                const end = chapters[i + 1]?.start ?? duration;
                const fill = Math.max(0, Math.min(1, (time - c.start) / (end - c.start)));
                return (
                  <button
                    key={c.id}
                    type="button"
                    tabIndex={-1}
                    onClick={() => jump(c.start)}
                    className="h-4 py-[5px]"
                    style={{ flexGrow: end - c.start }}
                  >
                    <span className="block h-full overflow-hidden rounded-full bg-white/30">
                      <span className="block h-full rounded-full bg-white" style={{ width: `${fill * 100}%` }} />
                    </span>
                  </button>
                );
              })}
            </div>
            <span className="shrink-0 text-xs font-semibold tabular-nums text-white">
              {fmt(time)} / {fmt(duration)}
            </span>
          </div>
        </div>
      </div>

      {/* Active chapter */}
      <div key={active.id} className="fade-up mx-auto mt-8 grid max-w-4xl gap-4 sm:mt-10 sm:grid-cols-[auto_1fr] sm:gap-8">
        <div className="flex items-center gap-3 sm:flex-col sm:items-start">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink-900 font-display text-base font-extrabold text-white">
            {active.step}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-[13px] font-semibold text-brand-800">
            <Icon name="clock" className="h-3.5 w-3.5" strokeWidth={2} />
            {active.when}
          </span>
        </div>
        <div>
          <h3 className="font-display text-2xl font-bold text-ink-900">{active.label}</h3>
          <p className="mt-2 text-lg leading-relaxed">{active.body}</p>
        </div>
      </div>

      {/* All four steps as text, for people and machines that do not watch the film */}
      <ol className="sr-only">
        {chapters.map((c) => (
          <li key={c.id}>
            {c.label} ({c.when}): {c.body}
          </li>
        ))}
      </ol>
    </div>
  );
}
