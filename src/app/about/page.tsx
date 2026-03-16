import { Section } from "@/components/section";
import { PageHeader } from "@/components/page-header";
import { business, processSteps, services } from "@/content/site";

const reasons = [
  "Soft washing methods that protect siding, roofs, and finishes.",
  "Flexible scheduling to work around your day-to-day routine.",
  "Clear, upfront pricing with no surprise add-ons.",
  "Respect for your landscaping, outdoor furniture, and property.",
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Story"
        title="A local team that treats your property like our own."
        titleAccent="our own."
        description="Southern Pressure Washing was built on a simple idea: meticulous, reliable cleaning that homeowners and business owners feel great about inviting to their property."
      />

      {/* Mission + Process */}
      <Section className="bg-slate-900">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-sky-400">Why choose us</p>
            <h2 className="mt-3 text-2xl font-black tracking-tight text-white sm:text-3xl">
              Why neighbors choose{" "}
              <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
                {business.name}
              </span>
            </h2>
            <p className="mt-3 text-slate-400">
              We focus on clear communication, respectful service, and careful attention to every surface. From the first quote to the final rinse, we make the process stress-free.
            </p>
            <ul className="mt-6 space-y-3">
              {reasons.map((reason) => (
                <li key={reason} className="flex items-start gap-3 text-sm text-slate-300">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  {reason}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-sky-400">Process</p>
            <h2 className="mt-3 text-2xl font-black tracking-tight text-white sm:text-3xl">
              A simple, reliable process
            </h2>
            <div className="mt-6 space-y-3">
              {processSteps.map((step, index) => (
                <div
                  key={step.title}
                  className="flex gap-4 rounded-xl border border-slate-800 bg-slate-950 p-4"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-sky-400/30 bg-sky-400/10 text-xs font-bold text-sky-400">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{step.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-slate-400">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Services we offer */}
      <Section className="bg-slate-950">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-sky-400">What we clean</p>
          <h2 className="mt-3 text-2xl font-black tracking-tight text-white sm:text-3xl">
            Surfaces we clean most often
          </h2>
          <p className="mt-2 text-slate-400">
            Every property is different, but these are the most common areas we help refresh:
          </p>
          <ul className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <li
                key={service.id}
                className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-sm font-medium text-slate-200"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                {service.name}
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}
