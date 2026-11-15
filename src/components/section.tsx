import { ReactNode } from "react";

type Tone = "paper" | "white" | "mist" | "band" | "ink";

const tones: Record<Tone, string> = {
  paper: "bg-paper",
  white: "bg-white",
  mist: "bg-mist",
  band: "bg-band",
  ink: "bg-ink-grid text-slate-300",
};

type SectionProps = {
  id?: string;
  tone?: Tone;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
};

/** Page section with the shared container width and vertical rhythm. */
export function Section({ id, tone = "paper", className = "", containerClassName = "", children }: SectionProps) {
  return (
    <section id={id} className={`relative scroll-mt-20 px-5 py-16 sm:px-8 sm:py-20 lg:py-28 ${tones[tone]} ${className}`}>
      <div className={`mx-auto max-w-[76rem] ${containerClassName}`}>{children}</div>
    </section>
  );
}

export function Container({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`mx-auto max-w-[76rem] px-5 sm:px-8 ${className}`}>{children}</div>;
}

/** Small uppercase label above a heading. */
export function Kicker({ children, tone = "light" }: { children: ReactNode; tone?: "light" | "dark" }) {
  return (
    <span
      className={`block text-[12.5px] font-bold uppercase tracking-[0.16em] ${tone === "dark" ? "text-brand-300" : "text-brand-700"}`}
    >
      {children}
    </span>
  );
}

type SectionHeaderProps = {
  kicker?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  size?: "md" | "lg";
  className?: string;
};

export function SectionHeader({
  kicker,
  title,
  description,
  align = "center",
  tone = "light",
  size = "md",
  className = "",
}: SectionHeaderProps) {
  const alignment = align === "center" ? "mx-auto items-center text-center" : "items-start text-left";
  const titleSize =
    size === "lg"
      ? "text-[2rem] leading-[1.12] sm:text-[2.6rem] lg:text-5xl lg:leading-[1.1]"
      : "text-[1.75rem] leading-[1.15] sm:text-4xl lg:text-[2.6rem] lg:leading-[1.14]";
  return (
    <div className={`flex max-w-3xl flex-col gap-4 ${alignment} ${className}`}>
      {kicker && <Kicker tone={tone}>{kicker}</Kicker>}
      <h2 className={`font-bold ${titleSize} ${tone === "dark" ? "text-white" : ""}`}>{title}</h2>
      {description && (
        <p className={`max-w-2xl text-lg leading-relaxed ${tone === "dark" ? "text-slate-300" : "text-body"}`}>{description}</p>
      )}
    </div>
  );
}

/** Highlighted words inside a heading, e.g. <Accent>runs itself.</Accent> */
export function Accent({ children }: { children: ReactNode }) {
  return <span className="text-brand-600">{children}</span>;
}
