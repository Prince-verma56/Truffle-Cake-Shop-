"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

// Panel visual data — each panel has its own subtle colour and depth character
const PANEL_DATA = [
  { num: "01", bg: "#FFF8EF", shadow: "inset 1px 0 0 rgba(255,255,255,0.4), inset -1px 0 20px rgba(200,161,90,0.02)", x: "-110vw", rotate: -1 },
  { num: "02", bg: "#FFF6EE", shadow: "inset 1px 0 0 rgba(255,255,255,0.4), inset -1px 0 20px rgba(200,161,90,0.02)", x: "-110vw", rotate: -0.5 },
  { num: "03", bg: "#FDF2EA", shadow: "inset 1px 0 0 rgba(255,255,255,0.4), inset -1px 0 20px rgba(200,161,90,0.02)", x: "-110vw", rotate: 0 },
  { num: "04", bg: "#FFF9F3", shadow: "inset 1px 0 0 rgba(255,255,255,0.4), inset 1px 0 20px rgba(200,161,90,0.02)", x: "110vw", rotate: 0 },
  { num: "05", bg: "#FAEFE7", shadow: "inset 1px 0 0 rgba(255,255,255,0.4), inset 1px 0 20px rgba(200,161,90,0.02)", x: "110vw", rotate: 0.5 },
  { num: "06", bg: "#FFF8EF", shadow: "inset 1px 0 0 rgba(255,255,255,0.4), inset 1px 0 20px rgba(200,161,90,0.02)", x: "110vw", rotate: 1 },
];

interface PaperRevealProps {
  onRevealComplete: () => void;
}

export default function PaperReveal({ onRevealComplete }: PaperRevealProps) {
  const panelRefs = useRef<HTMLDivElement[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const revealedRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleTrigger = () => {
      if (revealedRef.current) return;
      revealedRef.current = true;

      const tl = gsap.timeline({ onComplete: onRevealComplete });

      // Staggered horizontal split
      PANEL_DATA.forEach((data, i) => {
        const el = panelRefs.current[i];
        if (!el) return;
        
        // Use custom staggering times based on prompt: Panel 01 first, 02 slightly after, etc.
        const staggers = [0, 0.04, 0.08, 0.10, 0.06, 0.03];
        const delay = staggers[i] || 0;

        tl.to(el, {
          x: data.x,
          rotationZ: data.rotate,
          scaleY: 1.05, // Slight vertical stretch during movement
          duration: 1.6, // slightly increased duration for smoother, wider travel
          ease: "power3.inOut",
        }, delay);
      });
    };

    container.addEventListener("trigger-reveal", handleTrigger);
    return () => container.removeEventListener("trigger-reveal", handleTrigger);
  }, [onRevealComplete]);

  return (
    <div
      ref={containerRef}
      id="paper-reveal-container"
      className="absolute inset-0 flex overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Subtle global radial light behind the panels but in front of video */}
      <div 
        className="absolute inset-0 z-[-1]"
        style={{
          background: "radial-gradient(circle at center, rgba(255,248,239,0.3) 0%, rgba(200,161,90,0.05) 100%)"
        }}
      />

      {PANEL_DATA.map((panel, i) => {
        const isActive = i === 0;
        
        return (
          <div
            key={i}
            ref={(el) => { if (el) panelRefs.current[i] = el; }}
            style={{
              flex: "1",
              height: "100%",
              position: "relative",
              backgroundColor: panel.bg,
              boxShadow: panel.shadow,
              borderRight: i < 3 ? "1px solid rgba(200, 161, 90, 0.25)" : "none",
              borderLeft: i >= 3 ? "1px solid rgba(200, 161, 90, 0.25)" : "none",
              transformOrigin: "center center",
              willChange: "transform",
            }}
          >
            {/* Paper Texture Overlay */}
            <div 
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                mixBlendMode: "multiply"
              }}
            />

            {/* Subtle Colored Edge Accent */}
            <div 
              className={`absolute top-0 bottom-0 w-[2px] ${i < 3 ? 'right-0 bg-gradient-to-b from-transparent via-[#E68A99] to-transparent' : 'left-0 bg-gradient-to-b from-transparent via-[#FADABF] to-transparent'}`}
              style={{ opacity: 0.15 }}
            />

            {/* Panel Number */}
            <div className="absolute bottom-12 left-0 right-0 flex flex-col items-center">
              <span
                style={{
                  fontFamily: "var(--font-manrope)",
                  fontSize: "0.75rem",
                  letterSpacing: "0.15em",
                  color: isActive ? "#24365F" : "rgba(36, 54, 95, 0.4)",
                  fontWeight: isActive ? 600 : 500,
                }}
              >
                {panel.num}
              </span>
              {isActive && (
                <div className="w-3 h-px bg-[#E68A99] mt-2 opacity-80" />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
