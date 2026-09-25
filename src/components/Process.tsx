import RevealOnScroll from "./RevealOnScroll";
import { process } from "@/lib/site-config";

export default function Process() {
  return (
    <section id="process" className="bg-walnut py-24 text-bone lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <RevealOnScroll stagger=":scope > *" staggerAmount={0.12} className="max-w-xl">
          <p className="eyebrow text-amber-light">How It Works</p>
          <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl">
            From a conversation to a finished door.
          </h2>
        </RevealOnScroll>

        <RevealOnScroll
          stagger=".process-step > *"
          staggerAmount={0.06}
          className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0"
        >
          {process.map((step, i) => (
            <div
              key={step.step}
              className={`process-step relative lg:px-8 ${
                i > 0 ? "lg:border-l lg:border-bone/20" : ""
              }`}
            >
              <span className="font-serif text-5xl text-amber-light/90">
                {step.step}
              </span>
              <h3 className="mt-4 font-serif text-xl text-bone">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-bone/70">
                {step.description}
              </p>
            </div>
          ))}
        </RevealOnScroll>
      </div>
    </section>
  );
}
