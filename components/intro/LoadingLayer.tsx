"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface LoadingLayerProps {
  progress: number; // 0–100
}

const LOADING_MESSAGES = [
  "Preparing something sweet...",
  "Whisking a little happiness...",
  "Adding something special...",
  "Almost ready...",
  "Something sweet awaits."
];

export default function LoadingLayer({ progress }: LoadingLayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const monogramRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLParagraphElement>(null);
  const progressLineFillRef = useRef<HTMLDivElement>(null);

  // The current active loading message index
  const [messageIndex, setMessageIndex] = useState(0);

  // Dynamic message rotation logic
  useEffect(() => {
    if (progress === 100) return; // Stop rotating at end
    
    // Calculate which message to show based on progress percentage
    // Divide 100% by the number of messages
    const index = Math.min(
      Math.floor((progress / 100) * LOADING_MESSAGES.length),
      LOADING_MESSAGES.length - 1
    );

    if (index !== messageIndex && messageRef.current) {
      // GSAP transition for text swap
      const el = messageRef.current;
      gsap.killTweensOf(el);
      
      gsap.to(el, {
        opacity: 0,
        y: -5,
        duration: 0.3,
        ease: "power1.inOut",
        onComplete: () => {
          setMessageIndex(index);
          gsap.fromTo(el,
            { opacity: 0, y: 5 },
            { opacity: 0.65, y: 0, duration: 0.4, ease: "power2.out" }
          );
        }
      });
    }
  }, [progress, messageIndex]);

  // Animate the progress number and line smoothly
  useEffect(() => {
    if (!progressRef.current) return;
    const el = progressRef.current;
    const current = parseInt(el.dataset.value ?? "0", 10);
    
    gsap.to({ val: current }, {
      val: progress,
      duration: 0.5,
      ease: "power2.out",
      onUpdate: function () {
        const val = Math.round(this.targets()[0].val);
        el.textContent = String(val).padStart(2, "0");
        el.dataset.value = String(val);
        
        // Update progress line fill
        if (progressLineFillRef.current) {
          progressLineFillRef.current.style.transform = `scaleX(${val / 100})`;
        }
      },
    });

    // Fade out the entire loading layer just before the curtains move
    if (progress === 100 && containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: "power2.inOut",
        delay: 0.2 // Small hold at 100%
      });
    }
  }, [progress]);

  // Subtle breathing animations
  useEffect(() => {
    if (monogramRef.current) {
      gsap.to(monogramRef.current, {
        scale: 1.02,
        opacity: 0.9,
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
      });
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 flex flex-col items-center justify-center select-none pointer-events-none"
      aria-hidden="true"
      style={{ zIndex: 25 }} // Sits above the curtains (z-20)
    >
      {/* ── Subtle paper grain texture overlay (for the loading screen only) ── */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: "multiply",
          pointerEvents: "none"
        }}
      />
      
      {/* ── Soft Vignette ── */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle at center, transparent 30%, rgba(200, 161, 90, 0.04) 100%)",
          pointerEvents: "none"
        }}
      />

      {/* Brand wordmark - Scaled up and spaced intentionally */}
      <div className="relative flex flex-col items-center gap-12 z-10">
        
        {/* Decorative fine line above */}
        <div
          style={{
            width: "1px",
            height: "80px",
            background: "linear-gradient(to bottom, transparent, rgba(200, 161, 90, 0.4))",
          }}
        />

        {/* Logo mark - Embossed style */}
        <div
          ref={monogramRef}
          className="relative flex items-center justify-center"
          style={{
            width: "68px",
            height: "68px",
            border: "1px solid rgba(200, 161, 90, 0.6)", // Stronger border
            borderRadius: "50%",
            backgroundColor: "#FFF8EF",
            boxShadow: "inset 2px 2px 6px rgba(255,255,255,0.8), inset -2px -2px 6px rgba(200, 161, 90, 0.1), 0 8px 24px rgba(200, 161, 90, 0.15)", // Stronger warm shadow
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-fraunces)",
              fontSize: "1.85rem",
              color: "#24365F",
              letterSpacing: "-0.04em",
              transform: "translateY(1px)",
              opacity: 0.95, // Stronger text
            }}
          >
            TC
          </span>
        </div>

        {/* Brand name and Dynamic Message */}
        <div className="flex flex-col items-center gap-3">
          <p
            style={{
              fontFamily: "var(--font-manrope)",
              fontSize: "0.875rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#24365F",
              fontWeight: 600,
              opacity: 0.85, // TRUFFLE CAKES ~0.75-0.9
            }}
          >
            Truffle Cakes
          </p>

          <p
            ref={messageRef}
            style={{
              fontFamily: "var(--font-manrope)",
              fontSize: "0.9375rem",
              letterSpacing: "0.06em",
              color: "#24365F",
              fontWeight: 400,
              opacity: 0.65, // Preparing ~0.55-0.7
            }}
          >
            {LOADING_MESSAGES[messageIndex]}
          </p>
        </div>

        {/* Thin separator line */}
        <div
          style={{
            width: "120px",
            height: "1px",
            background: "rgba(200, 161, 90, 0.25)",
          }}
        />

        {/* Progress counter and elegant line */}
        <div className="flex flex-col items-center gap-3 mt-4">
          <span
            ref={progressRef}
            data-value="0"
            style={{
              fontFamily: "var(--font-fraunces)",
              fontSize: "1.75rem",
              color: "#24365F",
              letterSpacing: "0.02em",
              fontVariantNumeric: "tabular-nums",
              opacity: 0.85,
            }}
          >
            00
          </span>

          {/* Premium Progress Line */}
          <div className="relative w-[180px] h-[1px] bg-[rgba(200,161,90,0.4)] flex items-center">
            {/* Active Fill */}
            <div
              ref={progressLineFillRef}
              className="absolute left-0 top-0 bottom-0 bg-[#E68A99] origin-left"
              style={{ width: "100%", transform: "scaleX(0)" }}
            />
          </div>

          <span
            style={{
              fontFamily: "var(--font-manrope)",
              fontSize: "0.625rem",
              letterSpacing: "0.25em",
              color: "#24365F",
              textTransform: "uppercase",
              opacity: 0.6,
              marginTop: "4px"
            }}
          >
            Sweet Moments
          </span>
        </div>

        {/* Decorative fine line below */}
        <div
          style={{
            width: "1px",
            height: "80px",
            background: "linear-gradient(to top, transparent, rgba(200, 161, 90, 0.4))",
          }}
        />
      </div>
    </div>
  );
}
