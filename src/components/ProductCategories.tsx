import Image from "next/image";
import RevealOnScroll from "./RevealOnScroll";
import { productCategories } from "@/lib/site-config";

// Slightly asymmetric masonry: 1st and 6th cards run taller than the rest.
const TALL = new Set([0, 5]);

export default function ProductCategories() {
  return (
    <section id="products" className="bg-bone-dim py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <RevealOnScroll stagger=":scope > *" staggerAmount={0.12} className="max-w-xl">
          <p className="eyebrow text-walnut">What We Build</p>
          <h2 className="mt-5 font-serif text-4xl leading-tight text-charcoal sm:text-5xl">
            Seven ways we put wood to work.
          </h2>
        </RevealOnScroll>

        <RevealOnScroll
          stagger=".product-card"
          staggerAmount={0.1}
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {productCategories.map((cat, i) => (
            <a
              key={cat.id}
              href="#gallery"
              className={`product-card group relative block overflow-hidden ${
                TALL.has(i) ? "sm:row-span-2 aspect-[3/4.4]" : "aspect-[3/3.4]"
              }`}
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="font-serif text-2xl text-bone">{cat.name}</h3>
                <p className="mt-2 max-h-0 overflow-hidden text-sm leading-relaxed text-bone/85 opacity-0 transition-all duration-500 ease-out group-hover:max-h-16 group-hover:opacity-100">
                  {cat.description}
                </p>
              </div>
            </a>
          ))}
        </RevealOnScroll>
      </div>
    </section>
  );
}
