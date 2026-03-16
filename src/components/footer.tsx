import Image from "next/image";
import Link from "next/link";
import { business, navigation } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="relative h-9 w-9 overflow-hidden rounded-full border border-sky-400/20 bg-sky-500/10">
                <Image src="/logo.png" alt={`${business.name} logo`} fill className="object-contain" sizes="36px" />
              </span>
              <span className="text-base font-bold text-white">{business.name}</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
              Professional pressure washing for homes and businesses. Respectful service, upfront pricing, and lasting results.
            </p>
            <p className="mt-3 text-sm text-slate-500">
              Serving {business.serviceArea.slice(0, -1).join(", ")} and {business.serviceArea.slice(-1)}.
            </p>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Contact</p>
            <div className="mt-4 space-y-3">
              <Link href={business.phoneHref} className="flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-sky-400">
                <svg className="h-4 w-4 shrink-0 text-sky-400/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 6.75z" />
                </svg>
                {business.phone}
              </Link>
              <Link href={`mailto:${business.email}`} className="flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-sky-400">
                <svg className="h-4 w-4 shrink-0 text-sky-400/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                {business.email}
              </Link>
            </div>
          </div>

          {/* Pages */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Pages</p>
            <nav className="mt-4 flex flex-col gap-2.5">
              {navigation.map((item) => (
                <Link key={item.href} href={item.href} className="text-sm text-slate-400 transition-colors hover:text-sky-300">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-start gap-3 border-t border-slate-800 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} {business.name}. All rights reserved.
          </p>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-800 bg-slate-900 px-3 py-1 text-xs text-slate-500">
            <svg className="h-3 w-3 text-sky-400/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
            Licensed & Insured
          </span>
        </div>
      </div>
    </footer>
  );
}
