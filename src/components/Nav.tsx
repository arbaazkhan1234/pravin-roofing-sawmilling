"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { nav, business } from "@/lib/site-config";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12.04 2c-5.523 0-10 4.477-10 10 0 1.766.462 3.489 1.34 5.007L2 22l5.13-1.345A9.958 9.958 0 0 0 12.04 22c5.523 0 10-4.477 10-10s-4.477-10-10-10zm0 18.166a8.14 8.14 0 0 1-4.15-1.135l-.298-.177-3.043.798.812-2.968-.194-.305a8.15 8.15 0 0 1-1.253-4.35c0-4.507 3.667-8.174 8.174-8.174 4.507 0 8.174 3.667 8.174 8.174 0 4.507-3.667 8.174-8.174 8.174z" />
    </svg>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || open;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Background layer: a soft top-down scrim sits under the nav at all
          times so the logo/links always read against an intentional
          background instead of floating loose over the hero image; it
          crossfades into a solid bone bar once scrolled. */}
      <div
        className={`absolute inset-0 -z-10 transition-opacity duration-500 ${
          solid ? "opacity-0" : "opacity-100"
        } bg-gradient-to-b from-charcoal/70 via-charcoal/25 to-transparent`}
      />
      <div
        className={`absolute inset-0 -z-10 transition-opacity duration-500 ${
          solid ? "opacity-100" : "opacity-0"
        } bg-bone/95 backdrop-blur-sm shadow-[0_1px_0_0_rgba(28,24,21,0.08)]`}
      />

      <div className="mx-auto flex max-w-7xl items-center gap-10 px-6 py-3.5 lg:px-10 xl:gap-12 xl:px-12">
        <a href="#top" className="flex shrink-0 items-center">
          <Image
            src="/images/logo.png"
            alt="Pravin Roofing and Sawmilling Co. Ltd."
            width={956}
            height={503}
            priority
            className="h-11 w-auto lg:h-[3.1rem]"
          />
        </a>

        <div className="hidden flex-1 items-center justify-center xl:flex">
          {/* "Woody glass" capsule around the center links — frosted/blurred
              like real glass (backdrop-blur reveals whatever's behind it,
              softened), tinted warm amber/walnut instead of plain white,
              with just a hint of wood grain rather than a solid dark photo. */}
          <nav className="relative flex items-center gap-7 overflow-hidden rounded-full border border-amber-light/40 px-7 py-2.5 shadow-[0_4px_20px_rgba(0,0,0,0.15)] backdrop-blur-md">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-amber/30 via-walnut/35 to-amber/25" />
            <div className="absolute inset-0 -z-10 opacity-20 mix-blend-overlay">
              <Image
                src="/images/wood/mahogany.jpg"
                alt=""
                fill
                sizes="600px"
                className="object-cover"
              />
            </div>
            <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-1/2 bg-gradient-to-b from-bone/20 to-transparent" />
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="nav-link eyebrow whitespace-nowrap text-[0.65rem] tracking-[0.16em] text-bone transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <a
          href={business.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className={`hidden shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-[0.65rem] font-semibold tracking-[0.1em] transition-colors xl:flex ${
            solid
              ? "border-walnut/30 text-walnut hover:bg-walnut hover:text-bone"
              : "border-bone/40 text-bone hover:bg-bone hover:text-charcoal"
          }`}
        >
          <WhatsAppIcon className="h-3.5 w-3.5" />
          WHATSAPP
        </a>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className={`ml-auto flex h-10 w-10 shrink-0 flex-col items-center justify-center gap-1.5 xl:hidden ${
            solid ? "text-charcoal" : "text-bone"
          }`}
        >
          <span
            className={`block h-px w-6 bg-current transition-transform duration-300 ${
              open ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-px w-6 bg-current transition-transform duration-300 ${
              open ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden bg-bone xl:hidden"
          >
            <div className="flex flex-col gap-5 px-6 pb-8 pt-2">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="eyebrow text-charcoal"
                >
                  {item.label}
                </a>
              ))}
              <a
                href={business.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="eyebrow flex items-center gap-2 text-walnut"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Message on WhatsApp
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
