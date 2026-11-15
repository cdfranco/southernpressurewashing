import { ReactNode } from "react";
import { brand } from "@/content/site";
import { Button } from "./button";
import { Icon } from "./icons";

type CtaCardProps = {
  title: ReactNode;
  body?: ReactNode;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
};

/** Closing call-to-action card used at the bottom of every page. */
export function CtaCard({
  title,
  body,
  primary = { label: brand.primaryCta.label, href: brand.primaryCta.href },
  secondary = { label: `Call ${brand.phone}`, href: brand.phoneHref },
}: CtaCardProps) {
  return (
    <section className="bg-paper px-5 py-16 sm:px-8 lg:py-24">
      <div className="bg-cta relative mx-auto max-w-[76rem] overflow-hidden rounded-3xl px-6 py-12 sm:px-12 sm:py-16 lg:px-[4.5rem] lg:py-20">
        {/* Oversized screen mark, echoing the logo */}
        <svg
          viewBox="0 0 64 64"
          aria-hidden="true"
          className="pointer-events-none absolute -right-6 top-1/2 hidden h-[19rem] w-[19rem] -translate-y-1/2 text-white/60 lg:block"
        >
          <rect x="8" y="12" width="48" height="32" rx="5" fill="currentColor" />
          <rect x="25" y="48" width="14" height="5" rx="2.5" fill="currentColor" />
        </svg>
        <div className="relative max-w-3xl">
          <h2 className="text-[2.1rem] font-extrabold leading-[1.08] tracking-[-0.03em] sm:text-5xl lg:text-[3.5rem]">{title}</h2>
          {body && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-900/75">{body}</p>}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button as="link" href={primary.href} size="lg">
              {primary.label}
              <Icon name="arrow-right" className="h-4 w-4" strokeWidth={2.4} />
            </Button>
            {secondary && (
              <Button as="link" href={secondary.href} variant="secondary" size="lg">
                {secondary.label}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
