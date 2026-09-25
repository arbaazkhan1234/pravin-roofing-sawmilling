"use client";

import { useLayoutEffect, useState } from "react";

export const INTRO_STORAGE_KEY = "introPlayed";
export const INTRO_READY_EVENT = "site:intro-ready";

/**
 * Starts false on every render (server included) to avoid a hydration
 * mismatch, then resolves on the client: true immediately if the intro
 * already played this session or the visitor prefers reduced motion,
 * otherwise waits for IntroAnimation to dispatch the ready event.
 *
 * Uses useLayoutEffect (not useEffect) so the "already played" case
 * resolves BEFORE the browser paints — otherwise the first frame after a
 * refresh briefly shows the hero's hidden pre-animation state (no overlay
 * masking it this time), then a beat later everything starts animating.
 * That gap is exactly what reads as a stutter on refresh.
 */
export function useIntroReady() {
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    const alreadyPlayed = sessionStorage.getItem(INTRO_STORAGE_KEY) === "true";
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (alreadyPlayed || reducedMotion) {
      setReady(true);
      return;
    }

    function handleReady() {
      setReady(true);
    }
    window.addEventListener(INTRO_READY_EVENT, handleReady);
    return () => window.removeEventListener(INTRO_READY_EVENT, handleReady);
  }, []);

  return ready;
}
