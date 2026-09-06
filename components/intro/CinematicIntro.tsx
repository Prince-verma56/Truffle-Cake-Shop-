"use client";

import {
  useEffect,
  useRef,
  useState,
  useCallback,
  useReducer,
  type RefObject,
} from "react";
import gsap from "gsap";
import { introConfig } from "@/lib/introConfig";
import LoadingLayer from "./LoadingLayer";
import PaperReveal from "./PaperReveal";
import BakeryVideo from "./BakeryVideo";

// ─── State machine ─────────────────────────────────────────────────────────────

type IntroState =
  | "loading"     // Layer 1: showing loading UI
  | "revealing"   // Layer 1: paper panels animating upward
  | "video"       // Layer 2: video is playing
  | "heroReveal"  // Layer 2: video frozen in bg, hero UI fading in
  | "complete";   // Skipped or fully done

type IntroAction =
  | { type: "VIDEO_READY" }
  | { type: "BEGIN_REVEAL" }
  | { type: "REVEAL_DONE" }
  | { type: "HERO_REVEAL_TRIGGERED" }
  | { type: "SKIP" };

function introReducer(state: IntroState, action: IntroAction): IntroState {
  switch (state) {
    case "loading":
      if (action.type === "BEGIN_REVEAL") return "revealing";
      if (action.type === "SKIP") return "heroReveal";
      return state;

    case "revealing":
      if (action.type === "REVEAL_DONE") return "video";
      return state;

    case "video":
      if (action.type === "HERO_REVEAL_TRIGGERED") return "heroReveal";
      if (action.type === "SKIP") return "heroReveal";
      return state;

    default:
      return state;
  }
}

// ─── Progress simulation ────────────────────────────────────────────────────

/**
 * Returns a progress value (0–100) that advances over time.
 * Progress intentionally slows near 90 to feel realistic.
 * The video-ready event snaps it to 100.
 */
function useSimulatedProgress(
  phase: IntroState,
  videoReadyRef: RefObject<boolean>
): number {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const snappedRef = useRef(false);

  useEffect(() => {
    if (phase !== "loading") return;

    startRef.current = performance.now();
    snappedRef.current = false;

    const tick = (now: number) => {
      // Snap immediately to 100 when video is ready (done only once)
      if (videoReadyRef.current && !snappedRef.current) {
        snappedRef.current = true;
        setProgress(100);
        return; // stop the loop; parent will advance state on next render
      }

      const elapsed = now - startRef.current;

      // Ease function: fast start, slows near 90%
      let raw: number;
      if (elapsed < 800) {
        raw = (elapsed / 800) * 35;
      } else if (elapsed < 2000) {
        raw = 35 + ((elapsed - 800) / 1200) * 35;
      } else if (elapsed < 4000) {
        raw = 70 + ((elapsed - 2000) / 2000) * 18;
      } else {
        raw = Math.min(92, 88 + ((elapsed - 4000) / 6000) * 4);
      }

      setProgress(Math.round(raw));
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [phase, videoReadyRef]);

  return progress;
}

// ─── Scroll lock ────────────────────────────────────────────────────────────

function lockScroll() {
  const scrollbarWidth =
    window.innerWidth - document.documentElement.clientWidth;
  document.documentElement.style.overflow = "hidden";
  // Compensate for scrollbar to prevent layout shift
  if (scrollbarWidth > 0) {
    document.body.style.paddingRight = `${scrollbarWidth}px`;
  }
}

function unlockScroll() {
  document.documentElement.style.overflow = "";
  document.body.style.paddingRight = "";
}

// ─── Component ─────────────────────────────────────────────────────────────────

export default function CinematicIntro() {
  const [state, dispatch] = useReducer(introReducer, "loading");
  const [videoReady, setVideoReady] = useState(false);
  const videoReadyRef = useRef(false); // mirrors videoReady for RAF loop
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const paperRevealContainerRef = useRef<HTMLDivElement>(null);
  const readinessTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dispatchedRef = useRef(false);  // guard against double-dispatch

  const progress = useSimulatedProgress(state, videoReadyRef);

  // ── Reduced motion: client-only, computed once after mount ───────────────
  // Using useState with a lazy initializer that defers to undefined on SSR,
  // then resolves on the client — avoids both the hydration mismatch and the
  // set-state-in-effect lint rule.
  const [prefersReducedMotion] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  // ── Lock scroll on mount, unlock on heroReveal ────────────────────────────
  useEffect(() => {
    lockScroll();
    return () => unlockScroll();
  }, []);

  useEffect(() => {
    if (state === "heroReveal" || state === "complete") {
      unlockScroll();
    }
  }, [state]);

  // ── Reduced motion fast path ───────────────────────────────────────────────
  useEffect(() => {
    if (!prefersReducedMotion) return;
    // Give fonts a frame to paint, then skip straight to fade
    const t = setTimeout(() => {
      if (!dispatchedRef.current) {
        dispatchedRef.current = true;
        dispatch({ type: "SKIP" });
      }
    }, 400);
    return () => clearTimeout(t);
  }, [prefersReducedMotion]);

  // ── Video readiness + fallback timeout ────────────────────────────────────
  const handleVideoCanPlay = useCallback(() => {
    videoReadyRef.current = true;
    setVideoReady(true);
    if (readinessTimerRef.current) {
      clearTimeout(readinessTimerRef.current);
      readinessTimerRef.current = null;
    }
  }, []);

  const handleVideoError = useCallback(() => {
    if (readinessTimerRef.current) {
      clearTimeout(readinessTimerRef.current);
      readinessTimerRef.current = null;
    }
    // Skip video layer — go straight to fade transition
    if (state === "loading" || state === "video") {
      dispatch({ type: "SKIP" });
    }
  }, [state]);

  // Start readiness timeout
  useEffect(() => {
    if (prefersReducedMotion) return;

    readinessTimerRef.current = setTimeout(() => {
      // If we're still loading and video hasn't reported ready, proceed anyway
      if (state === "loading") {
        videoReadyRef.current = true;
        setVideoReady(true); // unblock the progress
      }
    }, introConfig.videoReadinessTimeout);

    return () => {
      if (readinessTimerRef.current) clearTimeout(readinessTimerRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Begin reveal when video is ready + progress is 100 ───────────────────
  useEffect(() => {
    if (state !== "loading") return;
    if (!videoReady) return;
    if (progress < 100) return;

    // Wait for the loading layer to elegantly fade out before curtains rise
    const t = setTimeout(() => {
      dispatch({ type: "BEGIN_REVEAL" });
    }, 800);
    return () => clearTimeout(t);
  }, [state, videoReady, progress]);

  // ── Trigger paper panel animation when state becomes "revealing" ──────────
  useEffect(() => {
    if (state !== "revealing") return;

    // Fire a custom DOM event on the PaperReveal container
    const container = document.getElementById("paper-reveal-container");
    if (container) {
      container.dispatchEvent(new CustomEvent("trigger-reveal"));
    }
  }, [state]);

  // ── Start video when paper reveal completes ───────────────────────────────
  const handleRevealComplete = useCallback(() => {
    dispatch({ type: "REVEAL_DONE" });
  }, []);

  useEffect(() => {
    if (state !== "video") return;
    const video = videoRef.current;
    if (!video) {
      // No video — skip to fade
      dispatch({ type: "SKIP" });
      return;
    }

    // Small delay to let the video become fully visible first
    const t = setTimeout(() => {
      video.play().catch(() => {
        // Autoplay blocked — treat as ended and proceed
        dispatch({ type: "SKIP" });
      });
    }, 80);

    return () => clearTimeout(t);
  }, [state]);

  // ── Handle early Hero Reveal trigger (from BakeryVideo at 7.0s) ────────
  const handleHeroRevealTrigger = useCallback(() => {
    if (!dispatchedRef.current) {
      dispatch({ type: "HERO_REVEAL_TRIGGERED" });
    }
  }, []);

  // Native ended acts as a fallback
  const handleVideoEnded = useCallback(() => {
    // Wait slightly to ensure it doesn't fire before 7.0s
    dispatch({ type: "HERO_REVEAL_TRIGGERED" });
  }, []);

  // ── Hero Reveal complete → Signal UI to fade in ─────────────────────────
  useEffect(() => {
    if (state === "heroReveal") {
      window.dispatchEvent(new CustomEvent("intro-complete"));
    }
  }, [state]);
  // ── Exit animation: if skipped or fully complete ──────────────────────────
  useEffect(() => {
    if (state !== "complete") return;
    const container = containerRef.current;
    if (!container) return;

    // Stop video to free resources
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.src = "";
      video.load();
    }

    gsap.to(container, {
      opacity: 0,
      duration: 0.4,
      onComplete: () => {
        container.style.display = "none";
      },
    });
  }, [state]);

  // Don't render at all if disabled
  if (!introConfig.enableCinematicIntro) return null;

  // Once complete & container hidden, nothing meaningful renders
  const isActive = state !== "complete";
  const isBackground = state === "heroReveal";

  return (
    <div
      ref={containerRef}
      role="presentation"
      aria-hidden="true"
      style={{
        position: isBackground ? "absolute" : "fixed",
        inset: 0,
        zIndex: isBackground ? -1 : 9999,
        overflow: "hidden",
        backgroundColor: "#FFF8EF",
        display: isActive ? "block" : "none",
        pointerEvents: isBackground ? "none" : "auto", // Allow clicking hero elements
      }}
    >
      {/* ── Layer 2: Bakery Truck Video (underneath the paper panels) ──── */}
      <BakeryVideo
        src={introConfig.videoSrc}
        videoRef={videoRef}
        visible={state === "loading" || state === "revealing" || state === "video" || state === "heroReveal"}
        onCanPlay={handleVideoCanPlay}
        onEnded={handleVideoEnded}
        onHeroRevealTrigger={handleHeroRevealTrigger}
        onError={handleVideoError}
      />

      {/* ── Layer 1: Paper panels (animate upward to reveal the video) ─── */}
      {(state === "loading" || state === "revealing") && (
        <div
          ref={paperRevealContainerRef}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 20,
            overflow: "hidden",
          }}
        >
          <PaperReveal onRevealComplete={handleRevealComplete} />

          {/* Loading composition sits on top of the paper panels */}
          <LoadingLayer progress={progress} />
        </div>
      )}
    </div>
  );
}
