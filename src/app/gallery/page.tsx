import { Section } from "@/components/section";
import { PageHeader } from "@/components/page-header";
import { GalleryGrid } from "@/components/gallery-grid";

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Work"
        title="Results that speak for themselves."
        titleAccent="speak for themselves."
        description="Example projects showing the kind of transformation professional pressure washing delivers. Replace these with your own before-and-after photos."
      />

      <Section className="bg-slate-900">
        <GalleryGrid />
      </Section>
    </>
  );
}
