import { ReactNode } from "react";
import { PageHeader } from "./page-header";
import { Section } from "./section";

export type LegalSection = {
  heading: string;
  /** One or more block elements, normally `<p>` paragraphs. */
  body: ReactNode;
};

type LegalPageProps = {
  kicker?: string;
  title: ReactNode;
  /** Lead paragraph under the h1 (the "Effective …" line). May contain links. */
  lead: ReactNode;
  sections: LegalSection[];
};

const linkStyles = "[&_a]:font-semibold [&_a]:text-brand-700 [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-brand-800";

/** Shared layout of the plain-language legal pages (privacy, terms): header plus one readable column. */
export function LegalPage({ kicker, title, lead, sections }: LegalPageProps) {
  return (
    <>
      <PageHeader kicker={kicker} title={title} description={<span className={linkStyles}>{lead}</span>} />
      <Section tone="white">
        <div className={`max-w-3xl ${linkStyles}`}>
          {sections.map((section) => (
            <div key={section.heading} className="mt-10 first:mt-0">
              <h2 className="text-2xl font-bold">{section.heading}</h2>
              <div className="mt-3 space-y-4 text-base leading-relaxed">{section.body}</div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
