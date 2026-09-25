"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { INTRO_READY_EVENT, INTRO_STORAGE_KEY } from "@/hooks/useIntroReady";

// Real intrinsic size of /public/images/logo.png (956x503, ratio ~1.9) — used
// so the <img> tags have correct width/height attributes and never shift
// layout while loading.
const LOGO_SRC = "/images/logo.png";
const LOGO_WIDTH = 956;
const LOGO_HEIGHT = 503;

const logoStyle: React.CSSProperties = {
  position: "absolute",
  left: "50%",
  width: "clamp(220px, 32vw, 480px)",
  height: "auto",
  // Matches the GSAP tween's own "from" state. The overlay PANELS themselves
  // stay opaque from the very first (pre-hydration) paint via static inline
  // styles below — so the page underneath is never visible behind them.
  // Only the logo needs to start invisible, so there's nothing to flash on
  // either a fresh load or an already-played refresh.
  opacity: 0,
};

export function IntroAnimation() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const topPanelRef = useRef<HTMLDivElement>(null);
  const bottomPanelRef = useRef<HTMLDivElement>(null);
  const topLogoRef = useRef<HTMLImageElement>(null);
  const bottomLogoRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const alreadyPlayed =
      typeof window !== "undefined" &&
      sessionStorage.getItem(INTRO_STORAGE_KEY) === "true";
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (alreadyPlayed) {
      // Panels are opaque from the very first paint (see markup below) and
      // only the logo defaults to opacity:0 — so removing the overlay here
      // never uncovers an unanimated flash of visible content, just the
      // solid panels for a single frame.
      overlay.remove();
      return;
    }

    if (prefersReducedMotion) {
      sessionStorage.setItem(INTRO_STORAGE_KEY, "true");
      gsap.set([topLogoRef.current, bottomLogoRef.current], { opacity: 1 });
      // Still a deliberate, brief hold before fading — fading with 0 delay
      // meant the very first painted frame could already be mid-fade,
      // reading as a flash rather than an intentional (if minimal) moment.
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.6,
        delay: 0.6,
        onComplete: () => overlay.remove(),
      });
      return;
    }

    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem(INTRO_STORAGE_KEY, "true");
      },
    });

    // Phase 1 (0 → 1.5s): nothing animates — solid white panels only, logo
    // still invisible. This beat is intentional: it reads as a load moment,
    // not dead time. (Tune by shifting the "1.5" position label below.)

    // Phase 2 — logo fades/scales in, starting at 1.5s, finishes at 3s.
    tl.fromTo(
      [topLogoRef.current, bottomLogoRef.current],
      { opacity: 0, scale: 0.85 },
      { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" },
      1.5
    )
      // Phase 3 — hold on the fully-revealed logo, then the split itself,
      // starting at 4s (1s hold after the fade completes).
      .to(
        topPanelRef.current,
        { y: "-100%", duration: 2, ease: "power3.inOut" },
        4
      )
      .to(
        bottomPanelRef.current,
        { y: "100%", duration: 2, ease: "power3.inOut" },
        4
      )
      // Phase 4 — fire the handoff at the SAME timestamp the split starts
      // (not when it finishes), so the hero's entrance animation runs
      // *underneath* the sliding panels instead of after them. This is the
      // one line that makes the whole thing feel continuous rather than
      // "overlay ends, then hero pops in."
      .call(
        () => {
          window.dispatchEvent(new Event(INTRO_READY_EVENT));
        },
        [],
        4
      )
      // cleanup once panels have fully cleared (4 + 2 = 6s total)
      .call(
        () => {
          document.body.style.overflow = "";
          overlay.remove();
        },
        [],
        6
      );

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0"
      style={{ zIndex: 9999 }}
      aria-hidden="true"
    >
      <div
        ref={topPanelRef}
        className="absolute inset-x-0 top-0 h-[calc(50%+1px)] overflow-hidden"
        style={{ background: "#FFFFFF" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={topLogoRef}
          src={LOGO_SRC}
          alt=""
          width={LOGO_WIDTH}
          height={LOGO_HEIGHT}
          style={{
            ...logoStyle,
            top: "50vh",
            transform: "translate(-50%, -50%)",
            // Clips this copy of the logo to its TOP half only. The
            // full-size image is positioned so its own vertical center sits
            // on the panel's bottom edge (top: 50vh inside a 50vh-tall
            // panel) — so the visible top half is exactly the top half of
            // the logo.
            clipPath: "inset(0 0 50% 0)",
          }}
        />
      </div>

      <div
        ref={bottomPanelRef}
        className="absolute inset-x-0 bottom-0 h-[calc(50%+1px)] overflow-hidden"
        style={{ background: "#FFFFFF" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={bottomLogoRef}
          src={LOGO_SRC}
          alt="Pravin Roofing and Sawmilling Co. Ltd."
          width={LOGO_WIDTH}
          height={LOGO_HEIGHT}
          style={{
            ...logoStyle,
            top: "0",
            transform: "translate(-50%, -50%)",
            // Same trick, mirrored: full-size image's vertical center sits
            // on THIS panel's top edge, clipped to show only the bottom
            // half of the logo.
            clipPath: "inset(50% 0 0 0)",
          }}
        />
      </div>
    </div>
  );
}
