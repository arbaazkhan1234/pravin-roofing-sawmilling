import Image from "next/image";
import RevealOnScroll from "./RevealOnScroll";
import { woodSpecies } from "@/lib/site-config";

export default function WoodSpecies() {
  return (
    <section id="wood" className="grain bg-bone py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <RevealOnScroll stagger=":scope > *" staggerAmount={0.12} className="max-w-xl">
          <p className="eyebrow text-walnut">The Wood We Work With</p>
          <h2 className="mt-5 font-serif text-4xl leading-tight text-charcoal sm:text-5xl">
            Seven species, imported and local.
          </h2>
        </RevealOnScroll>

        <RevealOnScroll
          stagger=".wood-item > *"
          staggerAmount={0.05}
          className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4"
        >
          {woodSpecies.map((wood) => (
            <div key={wood.id} className="wood-item">
              <div className="relative aspect-square w-full overflow-hidden">
                <Image
                  src={wood.image}
                  alt={`${wood.name} wood grain texture`}
                  fill
                  sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 45vw"
                  className="object-cover"
                />
              </div>
              <h3 className="mt-4 font-serif text-xl text-charcoal">
                {wood.name}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-charcoal/70">
                {wood.description}
                {wood.needsClientInput && (
                  <span className="ml-1 text-terracotta">*</span>
                )}
              </p>
            </div>
          ))}
        </RevealOnScroll>

        <p className="mt-10 text-xs text-charcoal/50">
          * Description pending confirmation from Pravin — a less commonly
          documented local species.
        </p>
      </div>
    </section>
  );
}
