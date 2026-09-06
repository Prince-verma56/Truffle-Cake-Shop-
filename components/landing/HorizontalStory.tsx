"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import { homepageContent, media } from "@/lib/content/homepage";

export default function HorizontalStory() {
  const { horizontalStory } = homepageContent;
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const track = trackRef.current;

    if (!section || !track) return;

    // We only want the horizontal scroll on desktop
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const getScrollAmount = () => {
        let trackWidth = track.scrollWidth;
        return -(trackWidth - window.innerWidth);
      };

      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          end: () => `+=${getScrollAmount() * -1}`,
          invalidateOnRefresh: true, // Recalculates on resize
        }
      });

      // Parallax inner background animation
      const parallaxInners = gsap.utils.toArray<HTMLElement>('.parallax-inner', track);
      gsap.fromTo(parallaxInners, 
        { backgroundPosition: "0% 50%" },
        {
          backgroundPosition: "100% 50%",
          ease: "none",
          scrollTrigger: {
             trigger: section,
             start: "top top",
             end: () => `+=${getScrollAmount() * -1}`,
             scrub: 1,
             invalidateOnRefresh: true,
          }
        }
      );

      return () => {
        tween.kill();
      };
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section id="story" ref={sectionRef} className="bg-blush py-24 md:py-0 md:h-screen flex items-center overflow-hidden relative border-b border-navy/10">
      
      {/* Mobile fallback: vertical stack */}
      <div className="md:hidden container mx-auto px-6 flex flex-col gap-24 relative z-10">
        <div className="text-center mb-8">
          <span className="type-label text-navy/50 tracking-[0.2em]">03 / THE JOURNEY</span>
        </div>
        
        {['CRAFTED', 'LAYERED', 'DECORATED', 'DELIVERED', 'CELEBRATED'].map((chapter, index) => (
          <div key={index} className="flex flex-col items-center gap-4 text-center border border-dashed border-navy/20 py-24">
            <span className="type-label text-navy/40 mb-2 block">0{index + 1}</span>
            <h3 className="type-section text-navy">{chapter}</h3>
          </div>
        ))}
      </div>

      {/* Desktop horizontal track */}
      <div className="hidden md:flex flex-col h-full justify-center w-full relative z-10">
        <div className="absolute top-12 left-12">
          <span className="type-label text-navy/50 tracking-[0.2em]">03 / THE JOURNEY</span>
        </div>
        
        <div ref={trackRef} className="flex items-center pl-[15vw] pr-[30vw] h-[75vh] gap-[20vw] w-fit">
          {['CRAFTED', 'LAYERED', 'DECORATED', 'DELIVERED', 'CELEBRATED'].map((chapter, index) => (
            <div key={index} className="flex flex-col items-center justify-center gap-6 w-[60vw] lg:w-[40vw] shrink-0 border border-[#C8A15A]/20 h-[60vh] bg-[#FFF8EF] shadow-lg rounded-[24px] overflow-hidden relative group">
              
              {/* Premium Parallax Background Placeholder */}
              <div 
                className="parallax-inner absolute inset-0 bg-cover bg-center opacity-30 mix-blend-multiply pointer-events-none transition-opacity duration-500 group-hover:opacity-50"
                style={{
                  // Using placeholder image gradients/textures if real images are missing
                  backgroundImage: `linear-gradient(to right, rgba(255,248,239,0.8), rgba(255,248,239,0.4)), url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }}
              />

              <div className="relative z-10 flex flex-col items-center p-8 text-center bg-[#FFF8EF]/80 backdrop-blur-sm rounded-xl m-8 border border-white/50 shadow-sm">
                <span className="font-manrope text-[0.6rem] tracking-[0.25em] uppercase text-[#E68A99] font-bold mb-3">0{index + 1}</span>
                <h3 className="font-fraunces text-4xl lg:text-5xl text-[#24365F] mb-4">{chapter}</h3>
                <p className="font-manrope text-[#24365F]/60 text-sm leading-relaxed max-w-[280px]">
                  [ Story content for {chapter.toLowerCase()} will be placed here. ]
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
