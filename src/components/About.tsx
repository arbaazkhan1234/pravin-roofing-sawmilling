"use client";

import { useEffect, useRef, useState } from "react";

const MAIN_IMAGE = {
  src: "/images/craft/warehouse-exterior.jpg",
  alt: "Pravin Roofing and Sawmilling's warehouse and lumberyard in Penal, Trinidad",
};

// The small right-hand image is a slideshow of two shots instead of one static photo.
const SIDE_SLIDES = [
  {
    src: "/images/craft/craftsman-workshop.jpg",
    alt: "A craftsman shaping a solid wood door on a table saw",
  },
  {
    src: "/images/craft/lumber-truck.jpg",
    alt: "A truck loaded with fresh-cut lumber outside the yard",
  },
];

const SLIDE_DURATION = 4500;

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);

  // Fire the entrance sequence once, when the section scrolls into view
  // (it sits below the full-viewport hero, so "animate on mount" would
  // finish off-screen before anyone ever saw it).
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      setRevealed(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Slideshow for the small right-hand image.
  useEffect(() => {
    const id = setInterval(() => {
      setSlideIndex((i) => (i + 1) % SIDE_SLIDES.length);
    }, SLIDE_DURATION);
    return () => clearInterval(id);
  }, []);

  // Subtle cursor parallax on the two images, via CSS custom properties.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    let raf = 0;
    let targetX = 0;
    let targetY = 0;

    const apply = () => {
      el.style.setProperty("--mouse-x", targetX.toFixed(3));
      el.style.setProperty("--mouse-y", targetY.toFixed(3));
      raf = 0;
    };

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      targetX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      targetY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    const onLeave = () => {
      targetX = 0;
      targetY = 0;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      id="craft"
      ref={sectionRef}
      className={`pc-section ${revealed ? "is-revealed" : ""}`}
      style={{ ["--mouse-x" as string]: 0, ["--mouse-y" as string]: 0 }}
    >
      {/* next/font/google failed to resolve for this weight set under
          Turbopack's build (unrelated to this component's own code) — using
          a plain Google Fonts link instead, per the original spec anyway. */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap"
      />
      <h1 className="pc-title">
        <span className="pc-title-mask">
          <span className="pc-title-line pc-title-line-1">BUILT</span>
        </span>
        <span className="pc-title-mask">
          <span className="pc-title-line pc-title-line-2">HERE</span>
        </span>
      </h1>

      <div className="pc-left">
        <p className="pc-left-label">Solid wood doors, built in Penal</p>
        <p className="pc-left-desc">
          <strong>Real Hardwood, Not Veneer:</strong> solid, imported wood —
          never shortcuts.
        </p>
      </div>

      <figure className="pc-main">
        <img src={MAIN_IMAGE.src} alt={MAIN_IMAGE.alt} className="pc-main-img" />
        <span className="pc-overlay" aria-hidden="true" />
      </figure>

      <aside className="pc-right">
        <figure className="pc-small">
          {SIDE_SLIDES.map((slide, i) => (
            <img
              key={slide.src}
              src={slide.src}
              alt={slide.alt}
              className="pc-small-img"
              loading="lazy"
              style={{ opacity: i === slideIndex ? 1 : 0 }}
            />
          ))}
          <span className="pc-overlay" aria-hidden="true" />
        </figure>

        <div className="pc-right-text">
          <h2 className="pc-heading">
            <span className="pc-heading-mask">
              <span className="pc-heading-line">Milled and</span>
            </span>
            <span className="pc-heading-mask">
              <span className="pc-heading-line">Finished Here</span>
            </span>
          </h2>
          <p className="pc-paragraph">
            From raw lumber to a finished door, the work happens right here
            in Penal — imported hardwood, cut, shaped and finished by hand.
          </p>
        </div>
      </aside>

      <div className="pc-index">
        <span className="pc-index-line" aria-hidden="true" />
        <span>Pravin / 01</span>
      </div>

      <style>{`
        .pc-section {
          position: relative;
          isolation: isolate;
          width: 100%;
          height: 100svh;
          min-height: 480px;
          overflow: hidden;
          background: #f7f7f5;
          color: #050505;
          margin: 0;
          border: 0;
          padding: 0;
          font-family: "DM Sans", Arial, Helvetica, sans-serif;
        }

        .pc-title {
          position: absolute;
          /* +80px clears the persistent site nav, which is fixed on top of
             every section — the spec's plain 5.2% assumed no such bar. */
          top: calc(5.2% + 80px);
          left: 3.65%;
          z-index: 5;
          margin: 0;
          font-family: Arial, Helvetica, sans-serif;
          /* Scaled down from the spec's clamp(76px, 10.4vw, 166px) — at that
             size "HERE" ran wide enough to collide with the main image's
             left edge on typical desktop widths. */
          font-size: clamp(64px, 8vw, 128px);
          font-weight: 700;
          line-height: 0.78;
          letter-spacing: -0.087em;
          text-transform: uppercase;
          color: #050505;
          pointer-events: none;
        }
        .pc-title-mask {
          display: block;
          overflow: hidden;
          padding-right: 0.09em;
          padding-bottom: 0.1em;
        }
        .pc-title-line {
          display: block;
          transform: translateY(115%);
          transition: transform 1.05s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .pc-title-line-2 {
          transition-delay: 100ms;
        }
        .is-revealed .pc-title-line {
          transform: translateY(0);
        }

        .pc-left {
          position: absolute;
          left: 3.7%;
          top: 56.7%;
          z-index: 4;
          width: min(205px, 19.5vw);
        }
        .pc-left-label,
        .pc-left-desc {
          font-size: clamp(10px, 0.83vw, 13px);
          font-weight: 400;
          line-height: 1.43;
          letter-spacing: -0.025em;
          margin: 0;
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 800ms cubic-bezier(0.16, 1, 0.3, 1),
            transform 800ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .pc-left-label {
          margin-bottom: clamp(28px, 8.5vh, 68px);
          transition-delay: 720ms;
        }
        .pc-left-desc {
          transition-delay: 830ms;
        }
        .pc-left-desc strong {
          font-weight: 600;
        }
        .is-revealed .pc-left-label,
        .is-revealed .pc-left-desc {
          opacity: 1;
          transform: translateY(0);
        }

        .pc-main {
          position: absolute;
          top: 30.1%;
          left: 26.45%;
          width: 43.25%;
          height: 51.4%;
          min-height: 205px;
          z-index: 2;
          margin: 0;
          overflow: hidden;
          background: #e5e3de;
          border-radius: clamp(24px, 3.15vw, 46px);
          clip-path: inset(0 100% 0 0 round clamp(24px, 3.15vw, 46px));
          transition: clip-path 1.25s cubic-bezier(0.77, 0, 0.18, 1);
          transition-delay: 280ms;
        }
        .is-revealed .pc-main {
          clip-path: inset(0 0 0 0 round clamp(24px, 3.15vw, 46px));
        }
        .pc-main-img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          object-position: center 58%;
          transform: scale(1.055)
            translate(calc(var(--mouse-x) * -8px), calc(var(--mouse-y) * -6px));
          transition: transform 1.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .pc-main:hover .pc-main-img {
          transform: scale(1.095)
            translate(calc(var(--mouse-x) * -8px), calc(var(--mouse-y) * -6px));
        }

        .pc-overlay {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          pointer-events: none;
          z-index: 2;
          background: linear-gradient(
            115deg,
            rgba(255, 255, 255, 0.13),
            transparent 38%,
            rgba(0, 0, 0, 0.04)
          );
          mix-blend-mode: soft-light;
        }

        .pc-right {
          position: absolute;
          top: 30.8%;
          left: 72.35%;
          width: 25%;
          max-width: 390px;
          z-index: 3;
        }

        .pc-small {
          position: relative;
          width: 100%;
          height: clamp(104px, 23.4vh, 205px);
          overflow: hidden;
          background: #ddd9d0;
          margin: 0;
          border-radius: clamp(25px, 3.2vw, 46px);
          clip-path: inset(0 0 0 100% round clamp(25px, 3.2vw, 46px));
          transition: clip-path 1.15s cubic-bezier(0.77, 0, 0.18, 1);
          transition-delay: 440ms;
        }
        .is-revealed .pc-small {
          clip-path: inset(0 0 0 0 round clamp(25px, 3.2vw, 46px));
        }
        .pc-small-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          object-position: center 57%;
          transform: scale(1.075)
            translate(calc(var(--mouse-x) * 7px), calc(var(--mouse-y) * 5px));
          transition: transform 1.3s cubic-bezier(0.16, 1, 0.3, 1),
            opacity 900ms ease;
        }
        .pc-small:hover .pc-small-img {
          transform: scale(1.13)
            translate(calc(var(--mouse-x) * 7px), calc(var(--mouse-y) * 5px));
        }

        .pc-right-text {
          padding-top: clamp(18px, 4.2vh, 35px);
        }
        .pc-heading {
          font-family: Arial, Helvetica, sans-serif;
          font-size: clamp(25px, 2.7vw, 45px);
          font-weight: 700;
          line-height: 0.98;
          letter-spacing: -0.065em;
          margin: 0;
          color: #050505;
        }
        .pc-heading-mask {
          display: block;
          overflow: hidden;
          padding-bottom: 0.08em;
        }
        .pc-heading-line {
          display: block;
          transform: translateY(115%);
          transition: transform 900ms cubic-bezier(0.16, 1, 0.3, 1);
          transition-delay: 810ms;
        }
        .is-revealed .pc-heading-line {
          transform: translateY(0);
        }

        .pc-paragraph {
          max-width: 355px;
          margin-top: clamp(21px, 5.3vh, 43px);
          margin-left: 0;
          margin-right: 0;
          margin-bottom: 0;
          font-size: clamp(10px, 0.83vw, 13px);
          font-weight: 400;
          line-height: 1.43;
          letter-spacing: -0.025em;
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 800ms cubic-bezier(0.16, 1, 0.3, 1),
            transform 800ms cubic-bezier(0.16, 1, 0.3, 1);
          transition-delay: 960ms;
        }
        .is-revealed .pc-paragraph {
          opacity: 1;
          transform: translateY(0);
        }

        .pc-index {
          position: absolute;
          right: 2.3%;
          bottom: 3%;
          display: flex;
          align-items: center;
          gap: 9px;
          color: rgba(0, 0, 0, 0.43);
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 700ms cubic-bezier(0.16, 1, 0.3, 1),
            transform 700ms cubic-bezier(0.16, 1, 0.3, 1);
          transition-delay: 1.15s;
        }
        .is-revealed .pc-index {
          opacity: 1;
          transform: translateY(0);
        }
        .pc-index-line {
          width: 28px;
          height: 1px;
          background: currentColor;
        }

        @media (max-width: 900px) {
          .pc-section {
            height: auto;
            min-height: 100svh;
            /* top padding bumped from the spec's 28px to clear the fixed site nav */
            padding: 96px 24px 52px;
            overflow: visible;
          }
          .pc-title {
            position: relative;
            top: auto;
            left: auto;
            font-size: clamp(72px, 15vw, 124px);
            line-height: 0.78;
          }
          .pc-main {
            position: relative;
            top: auto;
            left: auto;
            width: 68%;
            height: 390px;
            min-height: 0;
            margin-top: 22px;
            margin-left: auto;
          }
          .pc-left {
            position: relative;
            left: auto;
            top: auto;
            width: 31%;
            margin-top: -250px;
            padding-right: 20px;
          }
          .pc-left-label {
            margin-bottom: 52px;
          }
          .pc-right {
            position: relative;
            top: auto;
            left: auto;
            width: 56%;
            max-width: none;
            margin-top: 160px;
            margin-left: auto;
          }
          .pc-small {
            height: 210px;
          }
          .pc-index {
            display: none;
          }
        }

        @media (max-width: 620px) {
          .pc-section {
            /* top padding bumped from the spec's 22px to clear the fixed site nav */
            padding: 88px 16px 44px;
          }
          .pc-title {
            font-size: clamp(62px, 21vw, 96px);
            letter-spacing: -0.085em;
          }
          .pc-main {
            width: 100%;
            height: min(70vw, 330px);
            margin-top: 24px;
            border-radius: 27px;
          }
          .pc-left {
            width: 100%;
            margin-top: 29px;
            padding-right: 0;
            display: grid;
            grid-template-columns: 1fr 1.25fr;
            gap: 28px;
          }
          .pc-left-label {
            margin-bottom: 0;
          }
          .pc-right {
            width: 100%;
            margin-top: 58px;
          }
          .pc-small {
            height: min(51vw, 245px);
            border-radius: 27px;
          }
          .pc-right-text {
            padding-top: 25px;
          }
          .pc-heading {
            font-size: clamp(34px, 10vw, 53px);
          }
          .pc-paragraph {
            max-width: 88%;
            margin-top: 25px;
          }
          .pc-left-label,
          .pc-left-desc,
          .pc-paragraph {
            font-size: 11px;
            line-height: 1.48;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .pc-title-line,
          .pc-heading-line,
          .pc-left-label,
          .pc-left-desc,
          .pc-paragraph,
          .pc-index,
          .pc-main,
          .pc-small {
            transition-duration: 1ms !important;
            transition-delay: 0ms !important;
          }
          .pc-main-img,
          .pc-small-img {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}
