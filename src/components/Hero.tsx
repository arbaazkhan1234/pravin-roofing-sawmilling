"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { hero } from "@/lib/site-config";
import { useIntroReady } from "@/hooks/useIntroReady";
import { FadeIn } from "@/components/shared/FadeIn";
import { AnimatedHeading } from "@/components/shared/AnimatedHeading";

const SLIDE_DURATION = 6000;

export default function Hero() {
  const ready = useIntroReady();
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % hero.slides.length);
    }, SLIDE_DURATION);
    return () => clearInterval(id);
  }, []);

  // These are wide landscape photos (multiple doors side by side); on a
  // narrow portrait screen, object-cover already has to crop them hard just
  // to fill the frame. The Ken Burns zoom-in was stacking extra crop on top
  // of that, making them feel too close — so mobile gets little to no
  // additional zoom, keeping as much of each shot visible as possible while
  // still filling the background edge to edge.
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Scroll parallax on the background layer + fade/rise of the foreground content.
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          yPercent: isMobile ? 6 : 18,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
      if (contentRef.current) {
        gsap.to(contentRef.current, {
          yPercent: -25,
          opacity: 0.2,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex h-[100svh] min-h-[640px] w-full items-end overflow-hidden bg-charcoal text-bone"
    >
      <div
        ref={bgRef}
        className="absolute inset-0 -top-[6%] h-[112%] w-full sm:-top-[10%] sm:h-[120%]"
      >
        <AnimatePresence>
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: isMobile ? 1.02 : 1.09 }}
              transition={{ duration: SLIDE_DURATION / 1000 + 1.4, ease: "linear" }}
              className="absolute inset-0"
            >
              <Image
                src={hero.slides[index].src}
                alt={hero.slides[index].alt}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
        {/* Warm dark gradient overlay, bottom to top, for text legibility —
            lightened so the photos stay visible; strongest right behind the
            text block, clearing to nearly nothing toward the top. */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/78 via-charcoal/32 to-transparent" />
      </div>

      <div
        ref={contentRef}
        className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 pt-40 lg:px-10 lg:pb-28"
      >
        <FadeIn start={ready} delay={0} duration={600}>
          <p className="eyebrow mb-6 text-amber-light">{hero.eyebrow}</p>
        </FadeIn>

        <AnimatedHeading
          start={ready}
          initialDelay={150}
          lines={[hero.headline]}
          accentPeriods={false}
          className="max-w-3xl font-serif text-5xl leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
        />

        <FadeIn start={ready} delay={700} duration={700}>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-bone/85 sm:text-lg">
            {hero.subcopy}
          </p>
        </FadeIn>

        <FadeIn start={ready} delay={950} duration={700}>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a href={hero.ctaHref} className="btn btn-primary">
              {hero.ctaLabel}
            </a>
            <a
              href={hero.secondaryCtaHref}
              className="btn btn-outline text-bone hover:text-charcoal"
            >
              {hero.secondaryCtaLabel}
            </a>
          </div>
        </FadeIn>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-6 right-6 z-10 flex gap-2 lg:right-10">
        {hero.slides.map((s, i) => (
          <button
            key={s.src}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-1 rounded-none transition-all duration-500 ${
              i === index ? "w-8 bg-amber-light" : "w-4 bg-bone/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
