"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export default function OurStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headingLine1Ref = useRef<HTMLSpanElement>(null);
  const headingLine2Ref = useRef<HTMLSpanElement>(null);
  const text1Ref = useRef<HTMLParagraphElement>(null);
  const text2Ref = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const imageRevealRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Create the timeline (paused initially)
    const tl = gsap.timeline({ paused: true });

    // 1. "02 / OUR STORY" fades in + translateY(15px)
    tl.fromTo(labelRef.current, 
      { opacity: 0, y: 15 }, 
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    );

    // 2. Heading reveals line-by-line
    tl.fromTo(headingLine1Ref.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    );
    tl.fromTo(headingLine2Ref.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.6"
    );

    // 3. Story paragraphs
    tl.fromTo(text1Ref.current,
      { opacity: 0, y: 15 },
      { opacity: 0.8, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    );
    tl.fromTo(text2Ref.current,
      { opacity: 0, y: 15 },
      { opacity: 0.8, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.6"
    );

    // 4. CTA
    tl.fromTo(ctaRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    );

    // 5. Owner image reveal (clip-path inset + slight translateY)
    tl.fromTo(imageRevealRef.current,
      { clipPath: "inset(100% 0 0 0)", y: 30 },
      { clipPath: "inset(0% 0 0 0)", y: 0, duration: 1.2, ease: "power3.inOut" },
      "-=1.2" // Start revealing the image slightly after the heading starts
    );
    
    // Scale down image slightly inside the reveal to give a parallax effect
    tl.fromTo(imageInnerRef.current,
      { scale: 1.05 },
      { scale: 1, duration: 1.2, ease: "power3.inOut" },
      "<" // Sync with previous tween
    );

    // 6. Owner caption
    tl.fromTo(captionRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.6"
    );

    // Use Intersection Observer to play the timeline when section enters view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            tl.play();
            observer.disconnect(); // Play only once
          }
        });
      },
      { threshold: 0.25 } // Trigger when 25% of the section is visible
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      tl.kill();
    };
  }, []);

  return (
    <section 
      id="our-story" 
      ref={sectionRef}
      className="relative min-h-[90vh] flex flex-col justify-center py-24 overflow-hidden"
      style={{ 
        backgroundColor: "#FFF8EF", // Warm ivory base
      }}
    >
      {/* Subtle background layers */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 70% 50%, rgba(243, 213, 222, 0.15) 0%, transparent 60%)", // soft blush radial glow behind image
        }}
        aria-hidden="true"
      />
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      <div className="container relative z-10 mx-auto px-6 md:px-[clamp(32px,5vw,80px)] w-full max-w-[1440px]">
        
        {/* Grid Layout */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-[clamp(40px,7vw,110px)]">
          
          {/* LEFT: Story Content (Slightly offset downwards for editorial asymmetry) */}
          <div className="w-full lg:w-5/12 flex flex-col mt-0 lg:mt-16">
            
            {/* Section Header */}
            <div ref={labelRef} className="flex items-center gap-4 mb-8 opacity-0">
              <span className="text-[#24365F] font-manrope text-[0.65rem] tracking-[0.2em] font-semibold uppercase opacity-70">
                02 / Our Story
              </span>
              <div className="w-8 h-[1px] bg-[#E68A99] opacity-70" />
            </div>

            {/* Main Heading */}
            <h2 className="text-[#24365F] font-fraunces leading-[1.05] tracking-tight mb-10 flex flex-col"
                style={{ fontSize: "clamp(48px, 5vw, 78px)" }}>
              <span ref={headingLine1Ref} className="block opacity-0">
                Baked with
              </span>
              <span ref={headingLine2Ref} className="block opacity-0">
                a little <span className="text-[#E68A99] italic">love.</span>
              </span>
            </h2>

            {/* Story Copy */}
            <div className="flex flex-col gap-6 mb-12" style={{ maxWidth: "460px" }}>
              <p ref={text1Ref} className="text-[#24365F] font-manrope text-base md:text-lg leading-relaxed opacity-0">
                Truffle Cakes began with a simple belief: the sweetest moments deserve something made with heart.
              </p>
              <p ref={text2Ref} className="text-[#24365F] font-manrope text-base md:text-lg leading-relaxed opacity-0">
                From carefully crafted cakes to little moments of happiness, everything we make is designed to bring people a little closer.
              </p>
            </div>

            {/* CTA */}
            <div className="flex items-start">
              <a 
                ref={ctaRef}
                href="/our-story" 
                className="group relative inline-flex items-center justify-center bg-[#24365F] text-[#FFF8EF] font-manrope text-sm font-semibold tracking-wide rounded-full px-8 py-4 transition-transform hover:translate-y-[-2px] active:scale-95 shadow-md shadow-[#24365F]/15 opacity-0"
              >
                Discover Our Story 
                <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>

          </div>

            {/* RIGHT: Owner Image & Caption */}
          <div className="w-full lg:w-6/12 flex flex-col relative h-[600px] lg:h-[700px]" ref={imageRevealRef}>
            <Card className="w-full h-full flex flex-col overflow-hidden bg-[#FFF6EE] border-[#C8A15A]/20 shadow-xl rounded-[24px]">
              {/* Image Placeholder */}
              <div ref={imageInnerRef} className="relative flex-1 bg-gradient-to-br from-[#FFF8EF] to-[#FDF2EA] flex flex-col items-center justify-center overflow-hidden group cursor-pointer border-b border-[#C8A15A]/10">
                
                {/* Paper texture for placeholder */}
                <div 
                  className="absolute inset-0 opacity-[0.04] pointer-events-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter2'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter2)'/%3E%3C/svg%3E")`,
                    mixBlendMode: "multiply"
                  }}
                />

                <CardContent className="relative z-10 flex flex-col items-center justify-center gap-8 p-12 opacity-60 group-hover:opacity-100 transition-opacity duration-500 w-full h-full">
                  <div className="flex flex-col items-center gap-4">
                    <span className="font-fraunces text-7xl text-[#24365F] tracking-tighter opacity-80">
                      TC
                    </span>
                    <div className="w-[1px] h-[60px] bg-gradient-to-b from-[#24365F]/40 to-transparent" />
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <span className="font-manrope text-[0.65rem] uppercase tracking-[0.35em] text-[#24365F] font-semibold text-center">
                      Image Placeholder
                    </span>
                    <span className="opacity-40 text-[9px] uppercase tracking-wider text-[#24365F] font-medium">(Replace src here later)</span>
                  </div>
                </CardContent>

                {/* 
                  // Real Image goes here when ready:
                  <img 
                    src="/images/founders.jpg" 
                    alt="Truffle Cakes Founders"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                */}
              </div>

              {/* Caption Content below image inside the Card */}
              <CardFooter ref={captionRef} className="flex flex-col items-start justify-center gap-3 p-8 lg:p-10 bg-white/60 opacity-0 shrink-0">
                <span className="text-[#E68A99] font-manrope text-[0.65rem] tracking-[0.3em] uppercase font-bold">
                  The people behind Truffle Cakes
                </span>
                <p className="text-[#24365F] font-fraunces italic text-xl md:text-2xl opacity-90 leading-tight">
                  "Made with heart, served with happiness."
                </p>
              </CardFooter>
            </Card>
          </div>

        </div>
      </div>
    </section>
  );
}
