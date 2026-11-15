"use client";

import { useId, useState } from "react";
import { chainPricing } from "@/content/site";

const LOCATIONS = { min: 1, max: 700, step: 1, initial: 25 };

const displayOptions = [
  { value: "pro43", label: "Commercial 43, supplied by us" },
  { value: "pro55", label: "Commercial 55, supplied by us (+$400)" },
  { value: "byo", label: "Chain-supplied display (−$650)" },
];

const brandBuildOptions = [
  { value: "auto", label: "Included at 200+ locations" },
  { value: "none", label: "Already built / not needed" },
];

const money = (value: number) => "$" + Math.round(value).toLocaleString("en-US");

const labelClass = "block text-sm font-semibold text-white/75";
const selectClass =
  "mt-2 w-full rounded-[10px] border border-white/15 bg-ink-700 px-3.5 py-2.5 text-base font-medium text-white sm:text-[15px] focus:outline-none focus:ring-2 focus:ring-brand-500/40";

/**
 * Rollout calculator for the chain program. Every figure is derived from
 * `chainPricing`, the same data the published band table is built from.
 */
export function PricingCalculator({ className = "" }: { className?: string }) {
  const id = useId();
  const [count, setCount] = useState(LOCATIONS.initial);
  const [display, setDisplay] = useState(displayOptions[0].value);
  const [brandBuildChoice, setBrandBuildChoice] = useState(brandBuildOptions[0].value);

  const band = chainPricing.bands.find((b) => count >= b.min && count <= b.max) ?? chainPricing.bands[0];
  const onceEach = band.once + (chainPricing.displayAdj[display] ?? 0);
  const monthEach = band.monthly;
  const brandBuild =
    brandBuildChoice === "none" || count >= chainPricing.brandBuildWaivedAt ? 0 : chainPricing.brandBuild;
  const onceAll = onceEach * count + brandBuild;
  const countLabel = `${count.toLocaleString("en-US")} ${count === 1 ? "location" : "locations"}`;

  const outputs = [
    { value: money(onceAll), label: "one-time, all locations" },
    { value: money(monthEach * count), label: "per month, all locations" },
    { value: `${money(onceEach)} + ${money(monthEach)}/mo`, label: "per location" },
    { value: money(onceAll + monthEach * count * 12), label: "first-year total" },
  ];

  return (
    <div
      role="group"
      aria-labelledby={`${id}-title`}
      className={`rounded-2xl border border-white/10 bg-ink-900 p-6 text-white shadow-float sm:p-8 ${className}`}
    >
      <h3 id={`${id}-title`} className="text-[12.5px] font-bold uppercase tracking-[0.16em] text-brand-300">
        Rollout calculator
      </h3>

      <div className="mt-6 grid gap-5">
        <div>
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <label htmlFor={`${id}-locations`} className={labelClass}>
              Locations
            </label>
            {/* The slider announces this same text through aria-valuetext. */}
            <span aria-hidden="true" className="font-display text-[1.375rem] font-bold tracking-[-0.02em] tabular-nums text-white">
              {countLabel}
            </span>
          </div>
          <input
            id={`${id}-locations`}
            name="locations"
            type="range"
            min={LOCATIONS.min}
            max={LOCATIONS.max}
            step={LOCATIONS.step}
            value={count}
            aria-valuetext={countLabel}
            onChange={(e) => setCount(parseInt(e.target.value, 10) || 1)}
            className="mt-3 block h-6 w-full cursor-pointer accent-brand-400"
          />
        </div>

        <div>
          <label htmlFor={`${id}-display`} className={labelClass}>
            Display
          </label>
          <select
            id={`${id}-display`}
            name="display"
            value={display}
            onChange={(e) => setDisplay(e.target.value)}
            className={selectClass}
          >
            {displayOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor={`${id}-brandbuild`} className={labelClass}>
            Brand Build
          </label>
          <select
            id={`${id}-brandbuild`}
            name="brandbuild"
            value={brandBuildChoice}
            onChange={(e) => setBrandBuildChoice(e.target.value)}
            className={selectClass}
          >
            {brandBuildOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div aria-live="polite" className="mt-7 grid grid-cols-2 gap-3">
        {outputs.map((output) => (
          <p key={output.label} className="rounded-xl border border-white/10 bg-white/5 p-3 sm:p-4">
            <b className="block font-display text-[length:clamp(1rem,4.6vw,1.625rem)] font-bold leading-tight tracking-[-0.03em] tabular-nums text-white [overflow-wrap:anywhere]">
              {output.value}
            </b>
            <span className="mt-1 block text-[13px] leading-snug text-white/65">{output.label}</span>
          </p>
        ))}
      </div>

      <p className="mt-4 text-[13.5px] leading-relaxed text-white/60">
        Band: {band.label}
        {brandBuild ? ` · includes Brand Build ${money(brandBuild)}` : " · Brand Build included"}. List prices before tax;
        multi-screen walls, outdoor displays and non-standard electrical are quoted per site.
      </p>
    </div>
  );
}
