"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import { cn } from "@/lib/utils";
import { introConfig } from "@/lib/introConfig";

export default function Navbar() {
  const [introDone, setIntroDone] = useState(!introConfig.enableCinematicIntro);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  // Use native scroll event — avoids the motion/react useScroll SSR hydration
  // warning ("Target ref is defined but not hydrated").
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const prev = lastScrollY.current;

      setHidden(y > prev && y > 150);
      setIsScrolled(y > 50);

      lastScrollY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Listen for the Hero UI reveal event to trigger entrance animation
  useEffect(() => {
    if (introDone) return;
    const handleHeroReveal = () => {
      setIntroDone(true);
    };
    window.addEventListener("hero-ui-reveal", handleHeroReveal);
    return () => window.removeEventListener("hero-ui-reveal", handleHeroReveal);
  }, [introDone]);

  // Determine current animation state
  let navState = "visible";
  if (!introDone) navState = "intro";
  else if (hidden) navState = "hidden";

  return (
    <motion.header
      initial={introConfig.enableCinematicIntro ? "intro" : "visible"}
      variants={{
        intro: { y: -20, opacity: 0 },
        visible: { y: 0, opacity: 1 },
        hidden: { y: "-100%", opacity: 1 },
      }}
      animate={navState}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} // smooth out cubic bezier
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-cream/90 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.03)] h-20"
          : "bg-transparent h-28"
      )}
    >
      <div className="container mx-auto px-6 md:px-12 h-full flex items-center justify-between">
        <div className="flex-1">
          <Link href="/" className="font-fraunces text-2xl md:text-[1.75rem] tracking-tight text-navy">
            Truffle Cakes.
          </Link>
        </div>

        <nav className="hidden md:flex flex-1 justify-center items-center gap-10 font-manrope text-sm font-medium">
          <Link href="#cakes" className="text-navy hover:text-gold transition-colors">Cakes</Link>
          <Link href="#menu" className="text-navy hover:text-gold transition-colors">Menu</Link>
          <Link href="#story" className="text-navy hover:text-gold transition-colors">Our Story</Link>
          <Link href="#stores" className="text-navy hover:text-gold transition-colors">Stores</Link>
        </nav>

        <div className="hidden md:flex flex-1 justify-end">
          <Link
            href="#order"
            className="btn-primary !py-3 !px-7 !text-sm"
          >
            Order a Cake
          </Link>
        </div>

        <div className="md:hidden flex-1 flex justify-end">
          <MobileMenu />
        </div>
      </div>
    </motion.header>
  );
}
