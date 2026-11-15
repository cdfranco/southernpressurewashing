import Link from "next/link";
import { brand } from "@/content/site";

/** The Athena Boards mark: a teal screen on a navy tile. */
export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <rect width="64" height="64" rx="14" fill="#0B1220" />
      <rect x="12" y="16" width="40" height="26" rx="4" fill="none" stroke="#14B8D4" strokeWidth="4" />
      <rect x="26" y="44" width="12" height="4" rx="2" fill="#14B8D4" />
    </svg>
  );
}

export function Logo({
  className = "",
  tone = "dark",
  onClick,
}: {
  className?: string;
  tone?: "dark" | "light";
  onClick?: () => void;
}) {
  return (
    <Link href="/" onClick={onClick} className={`inline-flex items-center gap-2.5 ${className}`} aria-label={`${brand.name} home`}>
      <LogoMark />
      <span className={`font-display text-[1.15rem] font-extrabold tracking-tight ${tone === "dark" ? "text-ink-900" : "text-white"}`}>
        {brand.name}
      </span>
    </Link>
  );
}
