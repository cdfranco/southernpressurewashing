import Link from "next/link";
import { ReactNode } from "react";
import { Icon } from "./icons";

type Variant = "primary" | "secondary" | "dark" | "light" | "outline-light";
type Size = "sm" | "md" | "lg";

type BaseProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonProps =
  | (BaseProps & {
      as?: "button";
      type?: "button" | "submit";
      onClick?: () => void;
      disabled?: boolean;
    })
  | (BaseProps & {
      as: "link";
      href: string;
    });

const base =
  "inline-flex items-center justify-center gap-2 rounded-[10px] font-display font-bold tracking-[-0.01em] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-b from-brand-600 to-brand-700 text-white shadow-btn hover:from-brand-500 hover:to-brand-700 hover:-translate-y-px",
  secondary: "border border-slate-300 bg-white text-ink-900 hover:border-ink-900/40 hover:bg-slate-50",
  dark: "bg-ink-900 text-white hover:bg-ink-700",
  light: "bg-white text-ink-900 shadow-md shadow-ink-950/20 hover:bg-brand-50",
  "outline-light": "border border-white/30 text-white hover:border-white/70 hover:bg-white/10",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2.5 text-sm",
  md: "px-5 py-3 text-[15px]",
  lg: "px-6 py-4 text-base",
};

const isPlainAnchor = (href: string) => /^(https?:|tel:|mailto:|#)/.test(href);

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className = "", children } = props;
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (props.as === "link") {
    if (isPlainAnchor(props.href)) {
      const external = props.href.startsWith("http");
      return (
        <a href={props.href} className={classes} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          {children}
        </a>
      );
    }
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={props.type ?? "button"} onClick={props.onClick} disabled={props.disabled} className={classes}>
      {children}
    </button>
  );
}

/** Inline text link with a trailing chevron, e.g. "See all 21 boards ›". */
export function TextLink({
  href,
  children,
  className = "",
  tone = "light",
}: {
  href: string;
  children: ReactNode;
  className?: string;
  tone?: "light" | "dark";
}) {
  const classes = `group inline-flex items-center gap-1.5 font-semibold underline-offset-4 hover:underline ${
    tone === "dark" ? "text-brand-300 hover:text-brand-200" : "text-brand-700 hover:text-brand-800"
  } ${className}`;
  const content = (
    <>
      {children}
      <Icon name="chevron-right" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" strokeWidth={2.4} />
    </>
  );
  if (isPlainAnchor(href)) {
    const external = href.startsWith("http");
    return (
      <a href={href} className={classes} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
