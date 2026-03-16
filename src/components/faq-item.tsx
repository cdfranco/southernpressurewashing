"use client";

import { useState } from "react";

type FAQItemProps = {
  question: string;
  answer: string;
};

export function FAQItem({ question, answer }: FAQItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`rounded-xl border bg-slate-900 transition-colors duration-200 ${
        open ? "border-sky-400/30" : "border-slate-800"
      }`}
    >
      <button
        type="button"
        className="flex w-full items-center justify-between px-5 py-4 text-left"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <h3 className="text-sm font-semibold text-white pr-4">{question}</h3>
        <svg
          className={`h-5 w-5 shrink-0 transition-all duration-200 ${
            open ? "rotate-180 text-sky-400" : "text-slate-500"
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {open && (
        <div className="border-t border-slate-800 px-5 pb-5 pt-4">
          <p className="text-sm leading-relaxed text-slate-400">{answer}</p>
        </div>
      )}
    </div>
  );
}
