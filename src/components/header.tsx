"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { brand, navigation, type NavItem } from "@/content/site";
import { Button } from "./button";
import { Icon } from "./icons";
import { Logo } from "./logo";

function DesktopItem({ item }: { item: NavItem }) {
  const linkClasses =
    "flex items-center gap-1 rounded-lg px-3 py-2 text-[15px] font-medium text-ink-900/80 transition-colors hover:bg-slate-100 hover:text-ink-900";

  if (!item.children) {
    return (
      <Link href={item.href} className={linkClasses}>
        {item.label}
      </Link>
    );
  }

  return (
    <div className="group relative">
      <Link href={item.href} className={linkClasses} aria-haspopup="true">
        {item.label}
        <Icon name="chevron-down" className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180" strokeWidth={2.4} />
      </Link>
      <div className="invisible absolute left-0 top-full z-40 w-[23rem] pt-3 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <div className="rounded-2xl border border-line bg-white p-2 shadow-float">
          {item.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className="flex flex-col gap-0.5 rounded-xl px-4 py-3 transition-colors hover:bg-paper"
            >
              <span className="font-display text-[15px] font-bold text-ink-900">{child.label}</span>
              {child.description && <span className="text-[13px] leading-snug text-body">{child.description}</span>}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-[4.75rem] max-w-[76rem] items-center gap-6 px-5 sm:px-8">
        <Logo onClick={close} />

        <nav className="hidden flex-1 items-center gap-0.5 xl:flex" aria-label="Main">
          {navigation.map((item) => (
            <DesktopItem key={item.label} item={item} />
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-4 xl:flex">
          <a href={brand.phoneHref} className="text-[15px] font-semibold tabular-nums text-ink-900/80 hover:text-ink-900">
            {brand.phone}
          </a>
          <Button as="link" href={brand.primaryCta.href} size="sm">
            {brand.primaryCta.label}
          </Button>
        </div>

        <div className="ml-auto flex items-center gap-2 xl:hidden">
          <a
            href={brand.phoneHref}
            aria-label={`Call ${brand.phone}`}
            className="inline-flex items-center gap-1.5 rounded-[10px] border border-slate-300 px-3 py-2 text-sm font-semibold text-ink-900"
          >
            <Icon name="phone" className="h-4 w-4 text-brand-700" />
            Call
          </a>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-slate-300 text-ink-900 transition-colors hover:bg-slate-100"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
            aria-controls="site-nav"
          >
            <Icon name={open ? "x" : "menu"} className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>
      </div>

      {open && (
        <div id="site-nav" className="max-h-[calc(100vh-4.75rem)] overflow-y-auto border-t border-line bg-white px-5 pb-6 pt-4 sm:px-8 xl:hidden">
          <nav className="flex flex-col gap-4" aria-label="Mobile">
            {navigation.map((item) => (
              <div key={item.label}>
                <Link href={item.href} onClick={close} className="block rounded-lg px-2 py-1.5 font-display text-base font-bold text-ink-900">
                  {item.label}
                </Link>
                {item.children && (
                  <div className="mt-0.5 flex flex-col border-l border-line pl-3">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={close}
                        className="rounded-lg px-2 py-1.5 text-[15px] text-body hover:bg-paper hover:text-ink-900"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          <div className="mt-6 grid gap-2 border-t border-line pt-5 sm:grid-cols-2">
            <Button as="link" href={brand.phoneHref} variant="secondary" className="w-full">
              <Icon name="phone" className="h-4 w-4" />
              {brand.phone}
            </Button>
            <Button as="link" href={brand.primaryCta.href} className="w-full">
              {brand.primaryCta.label}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
