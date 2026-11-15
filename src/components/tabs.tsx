"use client";

import { ReactNode, useId, useState } from "react";

export type TabItem = { id: string; label: string; content: ReactNode };

/**
 * Underlined tab row with one visible panel. Inactive panels stay mounted but
 * hidden so their content is still in the page for search engines.
 */
export function Tabs({
  items,
  align = "center",
  onChange,
  className = "",
}: {
  items: TabItem[];
  align?: "center" | "left";
  onChange?: (id: string) => void;
  className?: string;
}) {
  const [active, setActive] = useState(items[0]?.id);
  const base = useId();

  const select = (id: string) => {
    setActive(id);
    onChange?.(id);
  };

  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (index + (e.key === "ArrowRight" ? 1 : -1) + items.length) % items.length;
    select(items[next].id);
    document.getElementById(`${base}-tab-${items[next].id}`)?.focus();
  };

  return (
    <div className={className}>
      <div className="border-b border-line">
        <div
          role="tablist"
          className={`no-scrollbar -mb-px flex gap-1 overflow-x-auto ${align === "center" ? "sm:justify-center" : ""}`}
        >
          {items.map((item, i) => {
            const selected = item.id === active;
            return (
              <button
                key={item.id}
                id={`${base}-tab-${item.id}`}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls={`${base}-panel-${item.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => select(item.id)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={`shrink-0 whitespace-nowrap border-b-2 px-4 py-4 font-display text-[1.02rem] font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-500 sm:px-5 ${
                  selected ? "border-brand-600 text-brand-700" : "border-transparent text-ink-900/80 hover:text-ink-900"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
      {items.map((item) => (
        <div
          key={item.id}
          id={`${base}-panel-${item.id}`}
          role="tabpanel"
          aria-labelledby={`${base}-tab-${item.id}`}
          hidden={item.id !== active}
          className={item.id === active ? "fade-up pt-10 sm:pt-14" : ""}
        >
          {item.content}
        </div>
      ))}
    </div>
  );
}
