"use client";

import { useState } from "react";
import { boardImage, fleetDemo } from "@/content/site";
import { LiveBoard } from "./live-board";

/** Multi-location demo: pick a store and the live concept board follows. */
export function FleetDemo({ tone = "dark", id = "fleet-store" }: { tone?: "light" | "dark"; id?: string }) {
  const [store, setStore] = useState("athens");
  const url = `${fleetDemo.baseUrl}?loc=${encodeURIComponent(store)}`;
  const dark = tone === "dark";

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <label htmlFor={id} className="sr-only">
          {fleetDemo.label}
        </label>
        <select
          id={id}
          value={store}
          onChange={(e) => setStore(e.target.value)}
          className={`max-w-full rounded-[10px] border px-3.5 py-2.5 text-base font-medium focus:outline-none sm:text-[15px] focus:ring-2 focus:ring-brand-500/40 sm:max-w-[22rem] ${
            dark ? "border-white/15 bg-ink-700 text-white" : "border-slate-300 bg-white text-ink-900"
          }`}
        >
          {fleetDemo.groups.map((group) => (
            <optgroup key={group.label} label={group.label}>
              {group.stores.map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        <span className={`text-sm ${dark ? "text-white/65" : "text-body"}`}>{fleetDemo.hint}</span>
      </div>
      <LiveBoard
        src={url}
        poster={boardImage("first-watch", "lg")}
        label="Live"
        title="Live multi-location demo — First Watch concept board; the store follows the picker above"
      />
      <p className={`mt-3 text-center text-[13.5px] leading-relaxed ${dark ? "text-white/60" : "text-body"}`}>
        {fleetDemo.disclaimer}{" "}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={`underline underline-offset-4 ${dark ? "text-white/85" : "text-ink-900"}`}
        >
          Open the concept board full screen<span className="sr-only"> (opens in a new tab)</span>
        </a>
      </p>
    </div>
  );
}
