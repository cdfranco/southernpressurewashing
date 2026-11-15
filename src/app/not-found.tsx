import { Button } from "@/components/button";
import { Icon } from "@/components/icons";

export default function NotFound() {
  return (
    <section className="bg-hero px-5 py-28 sm:px-8">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-[12.5px] font-bold uppercase tracking-[0.16em] text-brand-700">404</p>
        <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">This screen is dark.</h1>
        <p className="mt-4 text-lg">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
        <div className="mt-8 flex justify-center">
          <Button as="link" href="/" size="lg">
            Back to home
            <Icon name="arrow-right" className="h-4 w-4" strokeWidth={2.4} />
          </Button>
        </div>
      </div>
    </section>
  );
}
