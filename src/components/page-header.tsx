import { ReactNode } from "react";
import { Kicker } from "./section";

type PageHeaderProps = {
  kicker?: string;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  /** Optional visual shown to the right of the copy on wide screens. */
  aside?: ReactNode;
  /** Optional full-width content under the copy (stat rows, pickers). */
  children?: ReactNode;
};

/** Top-of-page hero used by every inner page. */
export function PageHeader({ kicker, title, description, actions, aside, children }: PageHeaderProps) {
  return (
    <section className="bg-hero relative overflow-hidden border-b border-line/70">
      <div className="mx-auto max-w-[76rem] px-5 pb-16 pt-14 sm:px-8 sm:pt-20 lg:pb-20 lg:pt-24">
        <div className={aside ? "grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16" : ""}>
          <div className="flex max-w-3xl flex-col items-start gap-5">
            {kicker && <Kicker>{kicker}</Kicker>}
            <h1 className="text-[2.4rem] font-extrabold leading-[1.08] tracking-[-0.03em] sm:text-5xl lg:text-[3.6rem] lg:leading-[1.06]">
              {title}
            </h1>
            {description && <p className="max-w-2xl text-lg leading-relaxed text-ink-900/75 sm:text-xl">{description}</p>}
            {actions && <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap sm:items-center">{actions}</div>}
          </div>
          {aside && <div>{aside}</div>}
        </div>
        {children && <div className="mt-12">{children}</div>}
      </div>
    </section>
  );
}
