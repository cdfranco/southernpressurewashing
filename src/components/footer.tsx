import Link from "next/link";
import { brand, footerColumns, footerDisclaimer } from "@/content/site";
import { Icon } from "./icons";
import { Logo } from "./logo";

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const classes = "text-[15px] text-body transition-colors hover:text-ink-900";
  if (href.startsWith("http")) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto max-w-[76rem] px-5 py-14 sm:px-8 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed">{brand.footerBlurb}</p>
            <p className="mt-4 text-sm text-slate-500">{brand.serviceArea}</p>
          </div>

          {footerColumns.map((column) => (
            <div key={column.heading}>
              <h2 className="font-display text-base font-bold text-ink-900">{column.heading}</h2>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={`${column.heading}-${link.label}`}>
                    <FooterLink href={link.href}>{link.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact strip */}
        <div className="mt-12 grid overflow-hidden rounded-2xl border border-line md:grid-cols-[1fr_1.6fr]">
          <div className="bg-white p-6 sm:p-8">
            <h2 className="font-display text-lg font-bold text-ink-900">Prefer to talk?</h2>
            <p className="mt-2 text-[15px] leading-relaxed">
              Call or text — {brand.founder} answers during business hours and returns every voicemail the same business day.
            </p>
          </div>
          <div className="flex flex-col justify-center gap-3 bg-mist p-6 sm:flex-row sm:items-center sm:p-8">
            <a
              href={brand.phoneHref}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-[10px] border border-slate-300 bg-white px-5 py-3.5 font-display text-base font-bold tabular-nums text-ink-900 transition-colors hover:border-brand-500"
            >
              <Icon name="phone" className="h-4.5 w-4.5 text-brand-700" />
              {brand.phone}
            </a>
            <a
              href={`mailto:${brand.email}`}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-[10px] border border-slate-300 bg-white px-5 py-3.5 font-display text-base font-bold text-ink-900 transition-colors hover:border-brand-500"
            >
              <Icon name="envelope" className="h-4.5 w-4.5 text-brand-700" />
              {brand.email}
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 text-center text-sm text-slate-500">
          <p>
            © {new Date().getFullYear()} {brand.legalName}. {brand.location}.{" "}
            <Link href="/privacy" className="underline-offset-4 hover:text-ink-900 hover:underline">
              Privacy
            </Link>{" "}
            ·{" "}
            <Link href="/terms" className="underline-offset-4 hover:text-ink-900 hover:underline">
              Terms
            </Link>
          </p>
          <p className="max-w-2xl text-[13px] leading-relaxed">{footerDisclaimer}</p>
        </div>
      </div>
    </footer>
  );
}
