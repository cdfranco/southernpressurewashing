import Link from "next/link";
import { ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline";

type BaseProps = {
  variant?: Variant;
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

const baseClasses =
  "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500 focus-visible:ring-offset-slate-950";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-sky-500 to-cyan-400 text-white shadow-lg shadow-sky-500/20 hover:from-sky-400 hover:to-cyan-300 hover:shadow-sky-400/30 disabled:opacity-60 disabled:cursor-not-allowed",
  secondary:
    "bg-slate-800 text-white border border-slate-700 hover:bg-slate-700 hover:border-slate-600",
  outline:
    "border border-slate-600 text-slate-300 hover:border-sky-400 hover:text-sky-300",
};

export function Button(props: ButtonProps) {
  const { variant = "primary", className, children } = props;
  const classes = `${baseClasses} ${variants[variant]} ${className ?? ""}`;

  if (props.as === "link") {
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      disabled={props.disabled}
      className={classes}
    >
      {children}
    </button>
  );
}
