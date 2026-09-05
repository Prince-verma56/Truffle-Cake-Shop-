"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { homepageContent, media } from "@/lib/content/homepage";
import { fadeInUp, revealAnimation } from "@/lib/utils/animations";

export default function SignatureProduct() {
  const { signature } = homepageContent;
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section id="signature" className="relative min-h-[90vh] flex items-center py-20 overflow-hidden bg-vanilla">
      <div className="container relative z-10 mx-auto px-6 md:px-12 flex flex-col items-center justify-center gap-12 text-center w-full">
        
        <div>
          <span className="type-label text-navy/50 tracking-[0.2em]">
            02 / SIGNATURE CAKE
          </span>
        </div>
        
        <div className="w-full max-w-lg aspect-[3/4] border border-dashed border-navy/20 flex items-center justify-center bg-cream">
          <span className="type-label text-navy/40 tracking-widest">[ FUTURE PRODUCT VISUAL ]</span>
        </div>
        
        <h2 className="type-section text-navy">
          Signature Cake
        </h2>
        
      </div>
    </section>
  );
}
