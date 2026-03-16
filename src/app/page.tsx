import { Hero } from "@/components/hero";
import { Section } from "@/components/section";
import { ServiceCard } from "@/components/service-card";
import { TestimonialCard } from "@/components/testimonial-card";
import { ContactForm } from "@/components/contact-form";
import { business, services, processSteps } from "@/content/site";

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px w-8 rounded-full bg-gradient-to-r from-sky-400 to-cyan-300" />
      <p className="text-xs font-semibold uppercase tracking-widest text-sky-400">{children}</p>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Hero />

      {/* ── Services ── */}
      <Section id="services" className="bg-slate-900">
        <SectionEyebrow>Services</SectionEyebrow>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Everything you need for a{" "}
            <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
              brighter exterior.
            </span>
          </h2>
          <p className="max-w-sm text-sm text-slate-400 sm:text-right">
            From siding and roofs to driveways and patios — we handle the details.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.slice(0, 4).map((service) => (
            <ServiceCard key={service.id} id={service.id} />
          ))}
        </div>
      </Section>

      {/* ── How it works ── */}
      <Section className="bg-slate-950">
        <SectionEyebrow>How it works</SectionEyebrow>
        <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
          Professional care at{" "}
          <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
            every step.
          </span>
        </h2>
        <p className="mt-3 max-w-xl text-base text-slate-400">
          We protect landscaping, fixtures, and finishes while delivering a noticeable difference in just a few hours.
        </p>

        {/* Steps with connector line */}
        <div className="relative mt-12 grid grid-cols-1 gap-10 md:grid-cols-3">
          <div className="absolute left-5 right-5 top-5 hidden border-t border-dashed border-slate-700 md:block" />
          {processSteps.map((step, i) => (
            <div key={step.title}>
              <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-sky-400/30 bg-slate-950 text-sm font-bold text-sky-400">
                {i + 1}
              </div>
              <h3 className="mt-5 font-bold text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{step.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Service area ── */}
      <Section className="bg-slate-900">
        <div className="mx-auto max-w-2xl text-center">
          <SectionEyebrow>Service area</SectionEyebrow>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
            Proudly serving{" "}
            <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
              Athens, GA &amp; beyond.
            </span>
          </h2>
          <p className="mt-3 text-base text-slate-400">
            We focus on Athens and the surrounding communities so we can respond quickly, schedule flexibly, and build long-term relationships with our neighbors.
          </p>
        </div>
        <ul className="mt-8 flex flex-wrap justify-center gap-2">
          {business.serviceArea.map((area) => (
            <li
              key={area}
              className="flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-800/60 px-4 py-2 text-sm font-medium text-slate-300"
            >
              <svg className="h-3 w-3 shrink-0 text-sky-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" />
              </svg>
              {area}
            </li>
          ))}
        </ul>
      </Section>

      {/* ── Testimonials ── */}
      <Section className="bg-slate-950">
        <div className="mx-auto max-w-2xl text-center">
          <SectionEyebrow>Reviews</SectionEyebrow>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
            What our{" "}
            <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
              neighbors say.
            </span>
          </h2>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <TestimonialCard index={0} />
          <TestimonialCard index={1} />
          <TestimonialCard index={2} />
        </div>
      </Section>

      {/* ── CTA / Quote ── */}
      <Section id="quote" className="bg-slate-950">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div className="space-y-5">
            <SectionEyebrow>Free estimate</SectionEyebrow>
            <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
              One quick form away from a{" "}
              <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
                noticeably cleaner
              </span>{" "}
              property.
            </h2>
            <p className="text-base text-slate-400">
              Tell us about the areas you&apos;d like cleaned and we&apos;ll follow up with clear, no-pressure pricing.
            </p>

            <ul className="space-y-2.5 pt-1">
              {["Licensed & insured", "Free, no-obligation estimates", "Same-week scheduling available"].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-slate-300">
                  <svg className="h-4 w-4 shrink-0 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>

            <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
              <p className="text-sm font-semibold text-white">Prefer to call?</p>
              <p className="mt-1 text-sm text-slate-400">
                Reach us at{" "}
                <a href={business.phoneHref} className="font-semibold text-sky-400 hover:text-sky-300">
                  {business.phone}
                </a>
              </p>
            </div>
          </div>

          <ContactForm />
        </div>
      </Section>
    </>
  );
}
