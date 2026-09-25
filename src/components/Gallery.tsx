import Image from "next/image";
import RevealOnScroll from "./RevealOnScroll";
import { gallery } from "@/lib/site-config";

export default function Gallery() {
  return (
    <section id="gallery" className="bg-charcoal py-24 text-bone lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <RevealOnScroll stagger=":scope > *" staggerAmount={0.12} className="max-w-xl">
          <p className="eyebrow text-amber-light">Featured Work</p>
          <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl">
            A few pieces we&apos;re proud of.
          </h2>
        </RevealOnScroll>
      </div>

      <RevealOnScroll stagger=".gallery-item" staggerAmount={0.09} className="mt-14">
        <div className="scrollbar-none flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-6 lg:px-10">
          {gallery.map((item) => (
            <figure
              key={item.src}
              className="gallery-item group relative aspect-[4/5] w-[78vw] flex-none snap-start overflow-hidden sm:w-[46vw] lg:w-[30vw]"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 78vw"
                className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
              <figcaption className="absolute bottom-0 left-0 p-5 text-sm text-bone/90">
                {item.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </RevealOnScroll>
    </section>
  );
}
