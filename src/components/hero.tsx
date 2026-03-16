import Image from "next/image";
import Link from "next/link";
import { business } from "@/content/site";

const stats = [
  { value: "500+", label: "Properties Cleaned" },
  { value: "5.0★", label: "Avg. Rating" },
  { value: "100%", label: "Licensed & Insured" },
  { value: "Free", label: "No-Obligation Estimates" },
];

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[90vh] flex-col overflow-hidden bg-slate-950">
      {/* Full-bleed background image */}
      <Image
        src="/a-man-power-washing-a-patio-on-a-sunny-day-in-a-we-2026-01-08-22-52-39-utc.jpg"
        alt="Professional pressure washing service"
        fill
        className="object-cover object-center scale-x-[-1]"
        sizes="100vw"
        priority
      />

      {/* Layered overlays for depth */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/20" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />

      {/* Main content */}
      <div className="relative flex flex-1 items-center">
        <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:py-24 lg:py-28">
          <div className="max-w-2xl space-y-7">

            {/* Eyebrow badge */}
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-sky-300">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
              Professional · Reliable · Local
            </span>

            {/* Headline */}
            <h1 className="text-5xl font-bold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Make your home<br />
              <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
                look new again.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="max-w-lg text-lg leading-relaxed text-slate-300">
              Soft, safe exterior cleaning for siding, roofs, and concrete —
              without damaging your home.
            </p>

            {/* CTAs */}
            <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center">
              <Link
                href={business.phoneHref}
                className="inline-flex items-center justify-center gap-2.5 rounded-full bg-sky-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/30 transition-all hover:bg-sky-400 hover:shadow-sky-400/40"
              >
                <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 6.75z" />
                </svg>
                Call {business.phone}
              </Link>
              <Link
                href="#quote"
                className="inline-flex items-center justify-center gap-1.5 rounded-full border border-white/20 bg-white/8 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/30 hover:bg-white/15"
              >
                Get a Free Quote
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </Link>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1">
              {[
                { icon: "★★★★★", text: "5-star rated" },
                { icon: "✓", text: "Fully insured" },
                { icon: "✓", text: "Free estimates" },
                { icon: "✓", text: "No-pressure quotes" },
              ].map(({ icon, text }) => (
                <span key={text} className="flex items-center gap-1.5 text-sm text-slate-400">
                  <span className="text-sky-400 text-xs">{icon}</span>
                  {text}
                </span>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="relative border-t border-white/10 bg-slate-950/60 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-5 py-5">
          <div className="grid grid-cols-2 gap-y-4 sm:grid-cols-4 sm:divide-x sm:divide-white/10">
            {stats.map(({ value, label }) => (
              <div key={label} className="sm:px-6 first:pl-0 last:pr-0">
                <div className="text-2xl font-bold text-white">{value}</div>
                <div className="mt-0.5 text-xs text-slate-400">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
