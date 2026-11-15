import { ReactNode } from "react";
import { Icon } from "./icons";

/** Bulleted list with brand check marks. */
export function CheckList({
  items,
  tone = "light",
  className = "",
}: {
  items: ReactNode[];
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <ul className={`space-y-3.5 ${className}`}>
      {items.map((item, i) => (
        <li key={i} className={`flex items-start gap-3 text-base leading-relaxed ${tone === "dark" ? "text-slate-200" : "text-ink-900/85"}`}>
          <Icon name="check" className={`mt-1 h-4.5 w-4.5 shrink-0 ${tone === "dark" ? "text-brand-300" : "text-brand-600"}`} strokeWidth={2.6} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Definition-style feature: bold lead-in followed by a sentence, as used across the site. */
export function Feature({
  title,
  children,
  icon,
  tone = "light",
}: {
  title: string;
  children: ReactNode;
  icon?: string;
  tone?: "light" | "dark";
}) {
  return (
    <div className="flex gap-4">
      {icon && (
        <span
          className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
            tone === "dark" ? "bg-white/10 text-brand-300" : "bg-brand-50 text-brand-700"
          }`}
        >
          <Icon name={icon} className="h-5 w-5" />
        </span>
      )}
      <div>
        <h3 className={`font-display text-[1.05rem] font-bold leading-snug ${tone === "dark" ? "text-white" : "text-ink-900"}`}>{title}</h3>
        <p className={`mt-1.5 text-[15px] leading-relaxed ${tone === "dark" ? "text-slate-300" : "text-body"}`}>{children}</p>
      </div>
    </div>
  );
}

/** Bordered card with an icon, heading and copy. */
export function InfoCard({
  title,
  children,
  icon,
  className = "",
}: {
  title: string;
  children: ReactNode;
  icon?: string;
  className?: string;
}) {
  return (
    <article className={`card-lift rounded-2xl border border-line bg-white p-7 sm:p-8 ${className}`}>
      {icon && (
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
          <Icon name={icon} className="h-6 w-6" />
        </span>
      )}
      <h3 className={`font-display text-xl font-bold leading-snug text-ink-900 ${icon ? "mt-6" : ""}`}>{title}</h3>
      <div className="mt-3 text-base leading-relaxed [&_a]:font-semibold [&_a]:text-brand-700 [&_a]:underline-offset-4 hover:[&_a]:underline">
        {children}
      </div>
    </article>
  );
}

/** Numbered step with a timing note, used for process timelines. */
export function StepCard({
  step,
  title,
  when,
  children,
}: {
  step: number | string;
  title: string;
  when?: string;
  children: ReactNode;
}) {
  return (
    <article className="relative flex flex-col rounded-2xl border border-line bg-white p-7">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink-900 font-display text-sm font-extrabold text-white">
        {step}
      </span>
      <h3 className="mt-5 font-display text-xl font-bold text-ink-900">{title}</h3>
      <p className="mt-2.5 flex-1 text-[15px] leading-relaxed">{children}</p>
      {when && (
        <p className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-[13px] font-semibold text-brand-800">
          <Icon name="clock" className="h-3.5 w-3.5" strokeWidth={2} />
          {when}
        </p>
      )}
    </article>
  );
}
