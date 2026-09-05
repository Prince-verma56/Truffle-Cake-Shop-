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
            <div key={index} className="flex flex-col items-center justify-center gap-6 w-[60vw] lg:w-[40vw] shrink-0 border border-dashed border-navy/20 h-[60vh] bg-blush">
              <span className="type-label text-navy/40">0{index + 1}</span>
              <h3 className="type-section text-navy">{chapter}</h3>
              <p className="type-body text-navy/40 mt-4 text-center">[ STORY CONTENT WILL BE ADDED LATER ]</p>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
