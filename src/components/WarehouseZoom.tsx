"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const IMAGE = {
  src: "/images/craft/warehouse-exterior.jpg",
  alt: "Pravin Roofing and Sawmilling's warehouse and lumberyard in Penal, Trinidad",
};

// Real intrinsic aspect ratio of the photo above (2000×896) — used on
// narrow screens so the starting card matches the photo's own wide
// landscape shape instead of the desktop layout's tall portrait box, which
// forced object-fit: cover to crop it down to a thin vertical sliver.
const IMAGE_ASPECT = 2000 / 896;
const MOBILE_BREAKPOINT = 620;

// Standalone section: the photo starts as a 62%-wide rounded card and, as
// the user scrolls through the pinned range, grows to fill the entire
// screen — corners squaring off as it goes — with "Our Warehouse" fading in
// over a blurred, darkened version of it near the end.
export default function WarehouseZoom() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    let ctx: gsap.Context | undefined;

    // Builds (or rebuilds, on resize) the pinned tween using measured PIXEL
    // values rather than percentages. GSAP's own "read the current CSS % as
    // the start value" produced a broken first frame here (width collapsed
    // to 0px) — ScrollTrigger's pin setup transiently perturbs the section's
    // measured width while it's being created, and that bad reading gets
    // cached. Measuring with getBoundingClientRect ourselves, before the
    // pinned ScrollTrigger is created, sidesteps that entirely. (A
    // ResizeObserver on the section itself was tried first, but the pin
    // setup's own mutations to that same element re-triggered it, causing
    // repeated rebuilds with transient, wrong sizes — window resize only.)
    const build = () => {
      const rect = section.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return false;

      ctx?.revert();
      ctx = gsap.context(() => {
        const card = section.querySelector<HTMLElement>(".wz-card");
        const img = section.querySelector<HTMLElement>(".wz-img");
        const scrim = section.querySelector<HTMLElement>(".wz-scrim");
        const text = section.querySelector<HTMLElement>(".wz-text");
        if (!card || !img || !scrim || !text) return;

        const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;
        let fromBox: { width: number; height: number; top: number; left: number };
        if (isMobile) {
          // Near-full-width card sized to the photo's real aspect ratio, so
          // the whole warehouse shows instead of a cropped vertical sliver —
          // centered in whatever extra vertical room the section has.
          const width = rect.width * 0.88;
          const height = width / IMAGE_ASPECT;
          fromBox = {
            width,
            height,
            left: (rect.width - width) / 2,
            top: (rect.height - height) / 2,
          };
        } else {
          fromBox = {
            width: rect.width * 0.62,
            height: rect.height * 0.62,
            top: rect.height * 0.19,
            left: rect.width * 0.19,
          };
        }

        // yPercent clears the mobile CSS fallback's `translateY(-50%)` —
        // fromBox.top above already accounts for centering in real px, so
        // that transform would otherwise double-offset it.
        gsap.set(card, { ...fromBox, yPercent: 0, borderRadius: isMobile ? 24 : 46 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=125%",
            scrub: 0.6,
            pin: true,
            anticipatePin: 1,
          },
        });

        tl.to(
          card,
          { width: rect.width, height: rect.height, top: 0, left: 0, borderRadius: 0, ease: "none" },
          0
        )
          .to(img, { filter: "blur(6px)", ease: "none" }, 0.45)
          .to(scrim, { opacity: 1, ease: "none" }, 0.45)
          .fromTo(text, { opacity: 0, y: 28 }, { opacity: 1, y: 0, ease: "none" }, 0.6);
      }, section);
      return true;
    };

    // The section can measure 0×0 right at mount, or a non-zero size that
    // hasn't actually settled yet (its own height briefly read a stale
    // pre-layout value in testing), so require two matching reads in a row
    // — a short poll, not just "first non-zero" — before trusting it.
    let cancelled = false;
    let retryTimer: ReturnType<typeof setTimeout>;
    let lastRect: { width: number; height: number } | null = null;
    const tryBuild = () => {
      if (cancelled) return;
      const rect = section.getBoundingClientRect();
      const stable =
        lastRect &&
        rect.width === lastRect.width &&
        rect.height === lastRect.height &&
        rect.width > 0 &&
        rect.height > 0;
      lastRect = { width: rect.width, height: rect.height };
      if (stable) {
        build();
      } else {
        retryTimer = setTimeout(tryBuild, 100);
      }
    };
    tryBuild();

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(build, 200);
    };
    window.addEventListener("resize", onResize);

    // Images elsewhere on the page (hero, craft section) can still be
    // loading when this section's tween is first built, and finish loading
    // afterwards — shifting this section's position on the page and leaving
    // ScrollTrigger's cached start/end pinned to stale coordinates. A single
    // refresh once everything has actually finished loading re-syncs it.
    const onLoad = () => ScrollTrigger.refresh();
    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad);
    }

    return () => {
      cancelled = true;
      clearTimeout(retryTimer);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", onLoad);
      clearTimeout(resizeTimer);
      ctx?.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="wz-section">
      <div className="wz-card">
        <img src={IMAGE.src} alt={IMAGE.alt} className="wz-img" />
        <span className="wz-scrim" aria-hidden="true" />
        <span className="wz-text" aria-hidden="true">
          <span className="wz-heading">Our Warehouse</span>
        </span>
      </div>

      <style>{`
        .wz-section {
          position: relative;
          width: 100%;
          height: 100svh;
          min-height: 480px;
          overflow: hidden;
          background: #ffffff;
        }
        .wz-card {
          position: absolute;
          top: 19%;
          left: 19%;
          width: 62%;
          height: 62%;
          overflow: hidden;
          border-radius: clamp(24px, 3.15vw, 46px);
        }
        .wz-img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          object-position: center 58%;
        }
        .wz-scrim {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: rgba(5, 5, 5, 0.5);
          opacity: 0;
        }
        .wz-text {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          opacity: 0;
        }
        .wz-heading {
          font-family: Arial, Helvetica, sans-serif;
          font-weight: 700;
          font-size: clamp(40px, 6vw, 96px);
          letter-spacing: -0.03em;
          color: #f7f7f5;
          text-align: center;
          padding: 0 24px;
        }

        @media (max-width: 620px) {
          .wz-card {
            /* Horizontal card matching the photo's own landscape aspect
               ratio (rather than a tall 62%-of-viewport box) so the whole
               warehouse shows instead of a thin cropped vertical sliver.
               aspect-ratio here is just the CSS-only fallback shown before
               JS measures and takes over via inline styles. */
            top: 50%;
            left: 6%;
            width: 88%;
            height: auto;
            aspect-ratio: 2000 / 896;
            transform: translateY(-50%);
            border-radius: 20px;
          }
          .wz-heading {
            font-size: clamp(28px, 7vw, 40px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .wz-card {
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            border-radius: 0;
          }
          .wz-scrim,
          .wz-text {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}
