"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize Lenis with premium settings
    const lenis = new Lenis({
      lerp: 0.08, // Very smooth, slightly more frictionless than default 0.1
      duration: 1.5,
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Synchronize GSAP ticker with Lenis requestAnimationFrame
    const update = (time: number) => {
      lenis.raf(time * 1000); // GSAP ticker provides time in seconds, Lenis needs ms
    };

    gsap.ticker.add(update);

    // Disable GSAP's lag smoothing as it can interfere with smooth scrolling
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(update);
    };
  }, []);

  return <>{children}</>;
}
