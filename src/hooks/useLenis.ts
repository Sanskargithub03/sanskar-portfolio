import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenisInstance: Lenis | null = null;
let pauseDepth = 0;

/**
 * Pauses Lenis' global wheel/scroll hijacking. Call this whenever a
 * full-screen overlay with its own internal scroll container (project
 * detail, lightbox) opens — otherwise Lenis keeps intercepting wheel
 * events meant for the overlay, and since the page underneath is
 * scroll-locked, the overlay silently doesn't scroll at all.
 *
 * Reference-counted so a nested overlay (the lightbox can open on top of
 * the project detail page) doesn't resume Lenis just because the inner
 * one closed while the outer one is still open.
 */
export function pauseLenis() {
  pauseDepth++;
  lenisInstance?.stop();
}

/** Resumes Lenis after a matching pauseLenis() call's overlay closes. */
export function resumeLenis() {
  pauseDepth = Math.max(0, pauseDepth - 1);
  if (pauseDepth === 0) {
    lenisInstance?.start();
  }
}

/**
 * Drives smooth inertial scrolling and keeps GSAP ScrollTrigger in sync
 * with it. Disabled entirely when the user prefers reduced motion —
 * the browser falls back to normal native scrolling.
 */
export function useLenis(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    const lenis = new Lenis({
      lerp: 0.1, // snappy, direct response to wheel input — not a floaty multi-second glide
      smoothWheel: true,
      touchMultiplier: 1.2,
    });
    lenisInstance = lenis;
    pauseDepth = 0;

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Let in-page anchor links use Lenis' smooth scroll.
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("a[href^='#']");
      if (!target) return;
      const href = target.getAttribute("href");
      if (!href || href === "#") return;
      const el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -88, duration: 1.0 });
    };
    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      lenisInstance = null;
      lenis.destroy();
    };
  }, [enabled]);
}
