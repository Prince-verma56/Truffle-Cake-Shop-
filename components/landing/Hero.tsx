"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { introConfig } from "@/lib/introConfig";
import { cn } from "@/lib/utils";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  
  // Element refs for stagger animation
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);

  const [introDone, setIntroDone] = useState(!introConfig.enableCinematicIntro);
  const hasStartedHeroReveal = useRef(false);
  const hasPausedVideo = useRef(false);

  // Intro completion listener - this triggers the Hero to become visible
  useEffect(() => {
    if (introDone) return;
    const handleIntroComplete = () => {
      // Small delay to let the intro video settle
      setTimeout(() => setIntroDone(true), 200);
    };
    window.addEventListener("intro-complete", handleIntroComplete);
    return () => window.removeEventListener("intro-complete", handleIntroComplete);
  }, [introDone]);

  // Setup GSAP Timeline (paused initially)
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    tlRef.current = gsap.timeline({ paused: true });
    
    // Main UI elements to reveal
    // Sequence timing requested:
    // 5.0 - 5.4s Navigation (handled in Navbar.tsx)
    // 5.3 - 5.8s Eyebrow
    // 5.6 - 6.4s Headline
    // 6.1 - 6.6s Description
    // 6.4 - 7.0s CTA
    // 6.8 - 7.3s Social proof
    
    // We start the timeline at video time >= 5.0s
    // So tl time 0 = video time 5.0s
    
    tlRef.current
      .fromTo(eyebrowRef.current,
        { opacity: 0, y: 15, clipPath: "inset(100% 0 0 0)" },
        { opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)", duration: 0.5, ease: "power3.out" },
        0.3 // Starts at 5.3s
      )
      .fromTo(headlineRef.current,
        { opacity: 0, y: 35, clipPath: "inset(100% 0 0 0)" },
        { opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)", duration: 0.8, ease: "power3.out" },
        0.6 // Starts at 5.6s
      )
      .fromTo(descRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
        1.1 // Starts at 6.1s
      )
      .fromTo(ctaRef.current,
        { opacity: 0, y: 18, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out" },
        1.4 // Starts at 6.4s
      )
      .fromTo(reviewsRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
        1.8 // Starts at 6.8s
      );

    return () => {
      tlRef.current?.kill();
    };
  }, []);

  // Video Event Handling
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;

    const currentTime = video.currentTime;

    // Trigger UI reveal at 5.0s
    if (currentTime >= 5.0 && !hasStartedHeroReveal.current) {
      hasStartedHeroReveal.current = true;
      tlRef.current?.play();
      window.dispatchEvent(new CustomEvent("hero-ui-reveal"));
    }

    // Freeze video at 8.0s (using 7.95 for safety threshold)
    if (currentTime >= 7.95 && !hasPausedVideo.current) {
      hasPausedVideo.current = true;
      video.pause();
      video.currentTime = 8.0;
    }
  };

  // Play video once intro is done and Hero is visible
  useEffect(() => {
    if (introDone && videoRef.current) {
      // Ensure we start from 0 if needed
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        // Handle autoplay restrictions if necessary
      });
    }
  }, [introDone]);

  // Start with everything hidden if intro is enabled and not done
  const initialOpacity = (!introDone && introConfig.enableCinematicIntro) ? "opacity-0" : "opacity-100";

  return (
    <section
      ref={sectionRef}
      id="hero"
      className={cn("relative min-h-screen overflow-hidden transition-opacity duration-1000 ease-in-out", initialOpacity)}
    >
      {/* ── VIDEO BACKGROUND ── */}
      <div className="absolute inset-0 z-0 bg-[#FFF8EF]">
        <video 
          ref={videoRef}
          src="/Videos/Bg%20Videos/Landing%20Page%20Video.mp4" 
          muted 
          playsInline
          onTimeUpdate={handleTimeUpdate}
          className="w-full h-full object-cover lg:object-[center_top]"
        />
        {/* Subtle overlay to ensure text readability */}
        <div className="absolute inset-0 bg-cream/5 mix-blend-overlay" />
      </div>

      {/* ── HERO CONTENT CONTAINER ── */}
      <div 
        className="relative z-10 w-full h-full min-h-screen flex items-center"
        style={{
          maxWidth: "1536px", // Allow slightly wider container to push things further left on big screens
          marginInline: "auto",
          paddingInline: "clamp(24px, 5vw, 64px)" // Reduced side padding
        }}
      >
        {/* LEFT: Text/Content Zone (Strict left column, ~40% width) */}
        <div 
          className="w-full flex flex-col justify-center pt-24 pb-16"
          style={{ width: "min(100%, max(420px, 40vw))", maxWidth: "520px" }}
        >
          
          <div ref={eyebrowRef} className="mb-6 flex items-center gap-4 opacity-0">
            <span className="text-[#24365F] font-manrope text-[0.65rem] tracking-[0.25em] font-bold uppercase opacity-80">
              Happiness tastes better together
            </span>
            <div className="w-8 h-[1px] bg-[#C8A15A] opacity-50" />
            <svg className="w-3 h-3 text-[#E68A99] fill-current opacity-80" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>

          <h1 
            ref={headlineRef} 
            className="text-[#24365F] font-fraunces leading-[1.02] tracking-[-0.02em] mb-6 opacity-0"
            style={{ 
              fontSize: "clamp(48px, 5.5vw, 84px)",
              maxWidth: "100%" 
            }}
          >
            Delicious<br />
            <span className="text-[#E68A99] italic mr-2">Cakes</span>
            for<br />
            Every Moment
          </h1>

          <p 
            ref={descRef} 
            className="text-[#24365F] font-manrope text-base md:text-lg lg:text-xl opacity-80 mb-10 leading-relaxed opacity-0 text-balance"
            style={{ maxWidth: "420px" }}
          >
            Handcrafted with premium ingredients, made to celebrate life&apos;s sweetest moments.
          </p>

          <div ref={ctaRef} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-12 opacity-0">
            <button className="bg-[#24365F] text-[#FFF8EF] font-manrope text-sm font-semibold tracking-wide rounded-full px-8 py-4 flex items-center justify-center gap-3 transition-transform hover:translate-y-[-2px] active:scale-95 shadow-lg shadow-[#24365F]/20">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
              Order a Cake
              <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
            <button className="border border-[#24365F]/30 text-[#24365F] font-manrope text-sm font-semibold tracking-wide rounded-full px-8 py-4 flex items-center justify-center transition-all hover:bg-[#24365F]/5 hover:translate-y-[-2px] active:scale-95">
              Explore Cakes
            </button>
          </div>

          {/* Reviews */}
          <div ref={reviewsRef} className="flex items-center gap-6 opacity-0">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-[#FFF8EF] bg-[#FDF2EA] overflow-hidden">
                  <div className="w-full h-full bg-[#E0D5C1] opacity-50 flex items-end justify-center pt-2">
                    <div className="w-6 h-6 rounded-full bg-[#24365F]/20 mb-1" />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col">
              <div className="flex text-[#C8A15A] mb-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <span className="text-[#24365F] font-manrope text-xs opacity-70">
                <strong>4.9/5</strong> Loved by 10K+ cake lovers
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT: Cake/Video Focal Point */}
        {/* Intentionally left empty to allow the video cake to breathe without decorative clutter */}
        
      </div>
    </section>
  );
}
