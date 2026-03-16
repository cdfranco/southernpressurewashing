import { Section } from "@/components/section";
import { PageHeader } from "@/components/page-header";
import { ServiceCard } from "@/components/service-card";
import { services } from "@/content/site";

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="What We Do"
        title="Exterior cleaning tailored to your home or business."
        titleAccent="tailored"
        description="Every surface needs the right combination of pressure, detergents, and technique. We adjust our approach for each material so it looks its best and lasts longer."
      />

      <Section className="bg-slate-900">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.id} id={service.id} />
          ))}
        </div>
      </Section>

      {/* What to expect */}
      <Section className="bg-slate-950">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-sky-400">Every job</p>
          <h2 className="mt-3 text-2xl font-black tracking-tight text-white sm:text-3xl">
            What you can always expect
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              { title: "Surface inspection", body: "We walk the area before we start to identify any fragile fixtures, stains that need pre-treatment, or areas requiring lower pressure." },
              { title: "Right tools for each surface", body: "Soft washing for siding and roofs. Higher pressure for concrete. We match the method to the material every time." },
              { title: "Walk-through & rinse", body: "When we finish, we do a thorough rinse, clean up, and walk the area with you to make sure you're satisfied." },
            ].map(({ title, body }) => (
              <div key={title} className="rounded-xl border border-slate-700 bg-slate-800/50 p-5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-400/10">
                  <svg className="h-4 w-4 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <h3 className="mt-3 text-sm font-bold text-white">{title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
