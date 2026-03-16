import { testimonials } from "@/content/site";

type TestimonialCardProps = {
  index: number;
};

export function TestimonialCard({ index }: TestimonialCardProps) {
  const testimonial = testimonials[index];
  if (!testimonial) return null;

  const initials = testimonial.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <figure className="flex flex-col rounded-2xl border border-slate-700/50 bg-slate-800/50 p-6 transition-all duration-300 hover:border-sky-800/60 hover:bg-slate-800/80">
      {/* Decorative quote mark */}
      <div className="mb-3 font-serif text-4xl leading-none text-sky-400/30">&ldquo;</div>

      {/* Stars */}
      <div className="mb-4 flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} className="h-4 w-4 text-sky-400" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      <blockquote className="flex-1 text-sm leading-relaxed text-slate-300">
        {testimonial.quote}
      </blockquote>

      <figcaption className="mt-5 flex items-center gap-3 border-t border-slate-700/50 pt-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-500/20 text-xs font-bold text-sky-300">
          {initials}
        </div>
        <div>
          <p className="text-sm font-semibold text-white">{testimonial.name}</p>
          <p className="text-xs text-slate-500">{testimonial.location}</p>
        </div>
      </figcaption>
    </figure>
  );
}
