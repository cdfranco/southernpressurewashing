import { ReactNode } from "react";
import { Icon } from "./icons";

export type FaqItem = { question: string; answer: ReactNode };

/** Accordion of questions. Uses <details> so it works without JavaScript. */
export function FaqList({ items, className = "" }: { items: FaqItem[]; className?: string }) {
  return (
    <div className={`border-t border-line ${className}`}>
      {items.map((item) => (
        <details key={item.question} className="group border-b border-line open:border-b-2 open:border-brand-600">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-1 py-5 text-left font-display text-[1.05rem] font-bold text-ink-900 transition-colors hover:text-brand-700 group-open:text-brand-700 sm:px-6 [&::-webkit-details-marker]:hidden">
            {item.question}
            <Icon
              name="chevron-down"
              className="h-4.5 w-4.5 shrink-0 text-ink-900 transition-transform duration-200 group-open:rotate-180 group-open:text-brand-700"
              strokeWidth={2.2}
            />
          </summary>
          <div className="px-1 pb-6 text-base leading-relaxed sm:px-6 [&_a]:font-semibold [&_a]:text-brand-700 [&_a]:underline-offset-4 hover:[&_a]:underline">
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  );
}
