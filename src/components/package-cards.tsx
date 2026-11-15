"use client";

import { useState } from "react";
import { packagePrice, selfInstall, usd } from "@/content/site";
import { Button } from "./button";
import { CheckList } from "./check-list";

type Mode = "installed" | "self";

/** A package price for the chosen mode: the installed price, or that minus the self-install discount. */
const priceFor = (installed: number, mode: Mode) => usd(mode === "self" ? installed - selfInstall.discount : installed);

const choices: Record<Mode, { label: string; note: string }> = {
  installed: {
    label: "We install it",
    note: `We deliver, mount and connect the screen in one visit, within ${selfInstall.freeDeliveryMiles} miles of Athens.`,
  },
  self: {
    label: "You install it",
    note: `The same screen and mount, set up for your board before you get it. Hang it where and how you want. Pickup or delivery is free within ${selfInstall.freeDeliveryMiles} miles of Athens; shipping elsewhere is quoted with your order.`,
  },
};

const packages = (mode: Mode) => [
  {
    name: "Board Kit",
    tagline: "You already have a TV on the wall",
    price: usd(packagePrice.boardKit),
    saves: false,
    includes: "Design + our player software + setup",
    features: [
      "Custom board design in your brand",
      "Locked player software on your TV",
      "Remote setup and a self-install sheet",
      "One round of corrections",
    ],
    link: "Board Kit details",
    featured: false,
  },
  {
    name: "Local 43",
    tagline: "Counters, entries, waiting areas",
    price: priceFor(packagePrice.local43, mode),
    saves: mode === "self",
    includes: mode === "self" ? '43" 4K smart TV and mount, you install' : '43" 4K smart TV, mount, pro install',
    features:
      mode === "self"
        ? [
            "Everything in the Board Kit",
            '43" 4K display and lockable anti-theft mount',
            "Set up for your board before you get it",
            "An install sheet, and we bring it live with you remotely",
            `55" ${priceFor(packagePrice.local55, mode)} · 65" ${priceFor(packagePrice.local65, mode)}`,
          ]
        : [
            "Everything in the Board Kit",
            '43" 4K display and lockable anti-theft mount',
            "Professional installation, one visit",
            "Cables hidden, remote with the manager",
            `55" ${priceFor(packagePrice.local55, mode)} · 65" ${priceFor(packagePrice.local65, mode)}`,
          ],
    link: "See all sizes",
    featured: true,
  },
  {
    name: "Commercial 43",
    tagline: "All-day screens, portrait walls, chains",
    price: priceFor(packagePrice.commercial43, mode),
    saves: mode === "self",
    includes:
      mode === "self"
        ? "Commercial 16/7 panel, 3-year limited warranty, you install"
        : "Commercial 16/7 panel, 3-year limited warranty, installed",
    features: [
      "Everything in Local 43",
      "Commercial signage panel built to run 16 hours a day, every day",
      "Runs the board from the panel's own signage OS; a small media box is added where a panel has no URL launcher",
      "Native portrait; 3-year limited manufacturer warranty",
      `55" ${priceFor(packagePrice.commercial55, mode)} · 65" ${priceFor(packagePrice.commercial65, mode)}`,
    ],
    link: "Commercial 43 details",
    featured: false,
  },
];

/**
 * The three headline packages with a choice above them: have us install the
 * screen, or take the same equipment and install it yourself for less.
 */
export function PackageCards() {
  const [mode, setMode] = useState<Mode>("installed");

  return (
    <div>
      <div className="mx-auto mt-10 flex max-w-3xl flex-col items-center text-center">
        <p className="font-display text-xl font-bold text-ink-900">{selfInstall.headline}</p>
        <div role="group" aria-label="Who installs the screen" className="mt-4 inline-flex rounded-[13px] border border-line bg-white p-1 shadow-card">
          {(Object.keys(choices) as Mode[]).map((m) => {
            const on = mode === m;
            return (
              <button
                key={m}
                type="button"
                aria-pressed={on}
                onClick={() => setMode(m)}
                className={`inline-flex items-center gap-2 rounded-[10px] px-3.5 py-2.5 font-display text-[15px] font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 sm:px-5 ${
                  on ? "bg-ink-900 text-white" : "text-ink-900/75 hover:text-ink-900"
                }`}
              >
                {choices[m].label}
                {m === "self" && (
                  <span
                    className={`whitespace-nowrap rounded-full px-2 py-0.5 font-sans text-[12px] font-bold ${
                      on ? "bg-sun-400 text-ink-900" : "bg-brand-50 text-brand-800"
                    }`}
                  >
                    Save {usd(selfInstall.discount)}
                  </span>
                )}
              </button>
            );
          })}
        </div>
        <p className="mt-4 min-h-[4.5rem] text-[15px] leading-relaxed sm:min-h-[3rem]" aria-live="polite">
          {choices[mode].note}
        </p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {packages(mode).map((pkg) => (
          <article
            key={pkg.name}
            className={`relative flex flex-col rounded-2xl border p-7 sm:p-8 ${
              pkg.featured ? "border-ink-900 bg-ink-900 text-slate-300 shadow-float" : "border-line bg-white"
            }`}
          >
            {pkg.featured && (
              <span className="absolute -top-3 left-7 rounded-full bg-sun-400 px-3 py-1 text-[11.5px] font-bold uppercase tracking-[0.1em] text-ink-900">
                Our pick for a first screen
              </span>
            )}
            <h3 className={`font-display text-2xl font-bold ${pkg.featured ? "text-white" : "text-ink-900"}`}>{pkg.name}</h3>
            <p className={`mt-1 text-[15px] ${pkg.featured ? "text-slate-300" : "text-body"}`}>{pkg.tagline}</p>
            <p className="mt-6 flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <span className={`font-display text-5xl font-extrabold tracking-tight tabular-nums ${pkg.featured ? "text-white" : "text-ink-900"}`}>
                {pkg.price}
              </span>
              <span className={`text-sm ${pkg.featured ? "text-slate-400" : "text-slate-500"}`}>one-time</span>
              {pkg.saves && (
                <span
                  className={`rounded-full px-2.5 py-1 text-[12.5px] font-bold ${
                    pkg.featured ? "bg-sun-400 text-ink-900" : "bg-brand-50 text-brand-800"
                  }`}
                >
                  {usd(selfInstall.discount)} off
                </span>
              )}
            </p>
            <p className={`mt-2 text-[15px] font-semibold ${pkg.featured ? "text-brand-300" : "text-brand-700"}`}>{pkg.includes}</p>
            <CheckList
              items={pkg.features}
              tone={pkg.featured ? "dark" : "light"}
              className={`mt-6 flex-1 border-t pt-6 [&_li]:text-[15px] ${pkg.featured ? "border-white/10" : "border-line"}`}
            />
            <div className="mt-7">
              <Button as="link" href="/pricing" variant={pkg.featured ? "light" : "secondary"} className="w-full">
                {pkg.link}
              </Button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
