"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type Props = {
  children: ReactNode;
  /** CSS selector, relative to the wrapper, for children to stagger. Omit to animate the wrapper itself. */
  stagger?: string;
  staggerAmount?: number;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section";
};

export default function RevealOnScroll({
  children,
  stagger,
  staggerAmount = 0.12,
  delay = 0,
  y = 40,
  className,
  as = "div",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const targets = stagger ? el.querySelectorAll(stagger) : el;

    if (prefersReducedMotion) {
      gsap.set(targets, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(targets, { opacity: 0, y });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 82%",
      once: true,
      onEnter: () => {
        gsap.to(targets, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          delay,
          stagger: stagger ? staggerAmount : 0,
        });
      },
    });

    return () => trigger.kill();
  }, [stagger, staggerAmount, delay, y]);

  const Tag = as;
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
