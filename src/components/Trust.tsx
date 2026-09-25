import RevealOnScroll from "./RevealOnScroll";
import { trustPoints } from "@/lib/site-config";

export default function Trust() {
  return (
    <section id="why" className="grain bg-bone-dim py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <RevealOnScroll className="max-w-xl">
          <p className="eyebrow text-walnut">Why Pravin</p>
          <h2 className="mt-5 font-serif text-4xl leading-tight text-charcoal sm:text-5xl">
            No shortcuts, no veneer.
          </h2>
        </RevealOnScroll>

        <RevealOnScroll
          stagger=".trust-point"
          staggerAmount={0.1}
          className="mt-14 divide-y divide-charcoal/12 border-t border-charcoal/12"
        >
          {trustPoints.map((point) => (
            <div
              key={point.title}
              className="trust-point grid grid-cols-1 gap-2 py-8 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] sm:gap-10"
            >
              <h3 className="font-serif text-2xl text-charcoal">
                {point.title}
              </h3>
              <p className="max-w-xl text-base leading-relaxed text-charcoal/70">
                {point.description}
              </p>
            </div>
          ))}
        </RevealOnScroll>
      </div>
    </section>
  );
}
