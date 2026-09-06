"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface IntroTransitionProps {
  /** When true, the cream overlay fades IN (covering the video) */
  active: boolean;
  /** Called when the cream fade is fully opaque — Hero can now appear */
  onFadeComplete: () => void;
}

export default function IntroTransition({ active, onFadeComplete }: IntroTransitionProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const completedRef = useRef(false);

  useEffect(() => {
    if (!active || completedRef.current) return;
    completedRef.current = true;

    const overlay = overlayRef.current;
    if (!overlay) return;

    // Brief hold (200ms) then fade the cream overlay in
    gsap.timeline()
      .set(overlay, { opacity: 0, display: "block" })
      .to(overlay, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.inOut",
        delay: 0.2,
        onComplete: onFadeComplete,
      });
  }, [active, onFadeComplete]);

  return (
    <div
      ref={overlayRef}
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#FFF8EF",
        opacity: 0,
        display: "none",
        zIndex: 30,
        pointerEvents: "none",
      }}
      aria-hidden="true"
    />
  );
}
