"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { homepageContent, media } from "@/lib/content/homepage";
import { fadeInUp, staggerContainer } from "@/lib/utils/animations";
import { MapPin, Phone } from "lucide-react";

const InstagramIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export default function StoreExperience() {
  const { storeExperience } = homepageContent;

  return (
    <section id="visit" className="py-24 sm:py-40 bg-powder-blue relative overflow-hidden border-b border-navy/10">
      <div className="container mx-auto px-6 md:px-12 flex flex-col items-center text-center gap-16">
        
        <div>
          <span className="type-label text-navy/50 tracking-[0.2em]">04 / OUR STORE</span>
          <h2 className="type-section text-navy mt-6">OUR STORE</h2>
        </div>

        <div className="w-full max-w-4xl aspect-[16/9] border border-dashed border-navy/20 flex flex-col items-center justify-center bg-cream/50 gap-4">
          <span className="type-label text-navy/40 tracking-widest">[ FUTURE STORE PHOTOGRAPHY ]</span>
          <span className="type-label text-navy/40 tracking-widest">[ FUTURE STORE STORY ]</span>
        </div>

      </div>
    </section>
  );
}
