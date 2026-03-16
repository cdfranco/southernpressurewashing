import { Section } from "@/components/section";
import { PageHeader } from "@/components/page-header";
import { FAQItem } from "@/components/faq-item";
import { business, faqs } from "@/content/site";

export default function FAQsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Got Questions"
        title="We have answers."
        titleAccent="answers."
        description="If you don't see your question here, reach out — we're happy to talk through your project in detail."
      />

      <Section className="bg-slate-900">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:items-start">
          <div className="space-y-2">
            {faqs.map((item) => (
              <FAQItem key={item.question} question={item.question} answer={item.answer} />
            ))}
          </div>

          <aside className="rounded-2xl border border-slate-800 bg-slate-950 p-6 lg:sticky lg:top-24">
            <p className="text-xs font-semibold uppercase tracking-widest text-sky-400">Still unsure?</p>
            <h2 className="mt-3 text-lg font-bold text-white">Not sure where to start?</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              Send us a quick message or give us a call and we&apos;ll help you decide which services make the most sense.
            </p>
            <div className="mt-5 space-y-3">
              <a
                href={business.phoneHref}
                className="flex items-center gap-2 text-sm font-semibold text-sky-400 hover:text-sky-300"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 6.75z" />
                </svg>
                {business.phone}
              </a>
              <a
                href={`mailto:${business.email}`}
                className="flex items-center gap-2 text-sm font-semibold text-sky-400 hover:text-sky-300"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                {business.email}
              </a>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
