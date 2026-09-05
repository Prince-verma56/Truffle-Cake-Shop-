"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { homepageContent, media } from "@/lib/content/homepage";
import { fadeInUp } from "@/lib/utils/animations";
import Image from "next/image";

// Map occasions to a specific color palette
const occasionStyles: Record<string, { bg: string, text: string }> = {
  "Birthday": { bg: "bg-blush", text: "text-berry" },
  "Anniversary": { bg: "bg-powder-blue", text: "text-navy" },
  "Celebration": { bg: "bg-vanilla", text: "text-gold" },
  "Gifting": { bg: "bg-pistachio", text: "text-cocoa" },
  "Just Because": { bg: "bg-cream", text: "text-navy" }
};

export default function Occasions() {
  const { occasions } = homepageContent;
  const [activeOccasion, setActiveOccasion] = useState(occasions[0]?.name || "Birthday");

  const activeStyle = occasionStyles[activeOccasion] || { bg: "bg-cream", text: "text-navy" };

  return (
    <section className="py-24 sm:py-40 bg-cream overflow-hidden border-b border-navy/10">
      <div className="container mx-auto px-6 md:px-12 flex flex-col items-center text-center gap-16">
        
        <div>
          <span className="type-label text-navy/50 tracking-[0.2em]">05 / OCCASIONS</span>
          <h2 className="type-section text-navy mt-6">CELEBRATE SOMETHING?</h2>
        </div>

        <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto border border-dashed border-navy/20 p-16">
          {['Birthday', 'Anniversary', 'Celebration', 'Gifting', 'Just Because'].map((occasion, idx) => (
            <h3 key={idx} className="type-editorial text-navy/40">{occasion}</h3>
          ))}
        </div>
        
      </div>
    </section>
  );
}
