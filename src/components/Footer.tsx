"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { business, footer } from "@/lib/site-config";
import RevealOnScroll from "./RevealOnScroll";

export default function Footer() {
  return (
    <footer className="relative isolate min-h-[100svh] w-full overflow-hidden bg-charcoal text-bone">
      {/* Cinematic landscape background — slow, near-unnoticeable zoom + drift */}
      <motion.div
        className="absolute inset-0"
        animate={{ scale: [1, 1.07, 1], x: [0, -18, 0] }}
        transition={{ duration: 42, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src="/images/footer/landscape.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-top"
          style={{ filter: "saturate(0.7) brightness(0.72)" }}
        />
      </motion.div>

      {/* Deep-blue evening color grade */}
      <div className="absolute inset-0 bg-[#0b1a33] mix-blend-color opacity-40" />

      {/* Gradual dark fade, starting around the middle, near-black at the bottom */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,transparent_36%,rgba(28,24,21,0.5)_56%,rgba(10,9,8,0.9)_80%,#000_100%)]" />

      {/* Soft vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_42%,rgba(0,0,0,0.55)_100%)]" />

      {/* Extremely subtle film grain */}
      <div className="grain grain-cinematic pointer-events-none absolute inset-0" />

      {/* Tiny shooting star, upper-left-middle of the sky */}
      <motion.div
        className="absolute left-[20%] top-[16%] h-px w-16 rounded-full bg-gradient-to-r from-transparent via-bone/90 to-transparent"
        style={{ rotate: "24deg", transformOrigin: "left center" }}
        initial={{ opacity: 0, x: 0 }}
        animate={{ opacity: [0, 0, 0.9, 0], x: [0, 0, 70, 96] }}
        transition={{
          duration: 11,
          repeat: Infinity,
          times: [0, 0.82, 0.9, 1],
          ease: "easeIn",
        }}
      />

      {/* Content flows normally (not absolutely positioned) so the section
          grows taller if mobile needs more room for 7+ stacked links —
          only the giant word stays pinned/cropped regardless. This is what
          keeps everything from overlapping on short/narrow screens while
          still landing at "one screen" on desktop where it fits. */}
      <div className="relative z-10 flex min-h-[100svh] flex-col">
        {/* Top row: mark + address (left), tagline (right).
            pt-28+ clears the persistent site nav bar fixed on top of this section. */}
        <div className="flex items-start justify-between px-6 pt-28 sm:px-10 sm:pt-32 lg:px-14">
          <a href="#top" className="group flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-bone/40 transition-all duration-500 group-hover:rotate-[18deg] group-hover:border-bone sm:h-11 sm:w-11">
              <Image
                src="/images/logo.png"
                alt="Pravin"
                width={956}
                height={503}
                className="h-5 w-auto opacity-75 transition-opacity duration-500 group-hover:opacity-100 sm:h-6"
              />
            </span>
            <div className="hidden text-xs leading-relaxed text-bone/50 sm:block">
              <p>{business.address}</p>
              <p className="mt-0.5">
                {business.phone} · {business.hours}
              </p>
            </div>
          </a>
          <p className="eyebrow max-w-[10rem] text-right text-[0.62rem] leading-relaxed text-bone/80 sm:max-w-none">
            {footer.tagline}
          </p>
        </div>

        {/* Nav columns — vertically centered in the remaining space, which
            is where the background has already gone dark */}
        <div className="flex flex-1 items-center px-6 py-10 sm:px-10 lg:px-14">
          <RevealOnScroll
            stagger=".footer-col"
            staggerAmount={0.12}
            className="grid w-full grid-cols-2 gap-x-8 gap-y-9 sm:grid-cols-[2fr_1fr_1fr] sm:gap-x-10"
          >
            <div className="footer-col col-span-2 sm:col-span-1">
              <h3 className="eyebrow text-[0.68rem] text-bone">Menu</h3>
              <div className="mt-3 h-px w-full bg-bone/30" />
              <ul className="mt-4 space-y-2.5">
                {footer.menu.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="nav-link text-sm text-bone/55 transition-colors duration-300 hover:text-bone"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-col">
              <h3 className="eyebrow text-[0.68rem] text-bone">Socials</h3>
              <div className="mt-3 h-px w-full bg-bone/30" />
              <ul className="mt-4 space-y-2.5">
                {footer.socials.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="nav-link text-sm text-bone/55 transition-colors duration-300 hover:text-bone"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-col">
              <h3 className="eyebrow text-[0.68rem] text-bone">Resources</h3>
              <div className="mt-3 h-px w-full bg-bone/30" />
              <ul className="mt-4 space-y-2.5">
                {footer.resources.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="nav-link text-sm text-bone/55 transition-colors duration-300 hover:text-bone"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href={footer.ctaHref}
                className="group mt-6 inline-flex items-center gap-2 rounded-full border border-bone/50 px-5 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-bone transition-colors duration-400 hover:bg-bone hover:text-charcoal"
              >
                {footer.ctaLabel}
                <span className="inline-block max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 group-hover:max-w-[1rem] group-hover:opacity-100">
                  →
                </span>
              </a>
            </div>
          </RevealOnScroll>
        </div>

        {/* Tiny copyright — in-flow (not absolutely positioned) so it can
            never collide with the nav columns above it, whatever height
            those end up needing on a given screen size */}
        <p className="px-6 pb-3 text-right text-[0.6rem] text-bone/30 sm:px-10 lg:px-14">
          © {new Date().getFullYear()} {business.legalName}
        </p>

        {/* Reserved space so the in-flow content above never sits under the
            giant word below (which is pinned/cropped independently) */}
        <div className="h-[22vw] shrink-0 sm:h-[15vw] lg:h-[13vw]" aria-hidden="true" />
      </div>

      {/* Oversized cropped wordmark — pinned to the very bottom regardless
          of how tall the flow content above ended up being */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] overflow-hidden text-center"
        style={{ transform: "translateY(9%)" }}
      >
        <span
          className="footer-word inline-block font-sans font-extrabold"
          style={{
            fontSize: "clamp(88px, 21vw, 400px)",
            lineHeight: 0.78,
            letterSpacing: "-0.04em",
          }}
        >
          {footer.wordmark}
        </span>
      </div>
    </footer>
  );
}
