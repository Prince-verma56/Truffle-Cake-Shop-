"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { homepageContent, media } from "@/lib/content/homepage";
import { fadeInUp, staggerContainer } from "@/lib/utils/animations";

export default function Hero() {
  const { hero } = homepageContent;

  return (
    <section className="relative min-h-[90vh] flex items-center py-20 overflow-hidden bg-cream">
      
      <div className="container relative z-10 mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
        
        {/* Text Composition */}
        <div className="flex-1 text-left z-20">
          <div className="mb-6">
            <span className="type-label text-navy/50 tracking-[0.2em]">
              01 / HERO
            </span>
          </div>

          <h1 className="type-hero text-navy mb-8">
            Hero Headline
          </h1>

          <p className="type-body text-navy/70 max-w-md mb-10">
            Short brand statement
          </p>

          <div>
            <span className="btn-primary">
              Explore Cakes
            </span>
          </div>
        </div>

        {/* Visual Composition Placeholder */}
        <div className="flex-1 relative w-full aspect-[4/5] max-w-lg lg:max-w-none border border-dashed border-navy/20 flex items-center justify-center">
          <span className="type-label text-navy/40 tracking-widest">[ FUTURE HERO VISUAL ]</span>
        </div>
        
      </div>
    </section>
  );
}
