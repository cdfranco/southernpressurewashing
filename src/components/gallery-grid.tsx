import Image from "next/image";
import { galleryItems } from "@/content/site";

export function GalleryGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
      {galleryItems.map((item) => (
        <article
          key={item.id}
          className="group relative aspect-square overflow-hidden rounded-xl bg-slate-800"
        >
          {item.imageUrl ? (
            <Image
              src={item.imageUrl}
              alt={item.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-slate-700 to-slate-800" />
          )}

          {/* Permanent subtle bottom fade */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-950/70 to-transparent" />

          {/* Hover overlay with label */}
          <div className="absolute inset-0 flex items-end bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div>
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="mt-0.5 text-xs text-slate-300">{item.description}</p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
