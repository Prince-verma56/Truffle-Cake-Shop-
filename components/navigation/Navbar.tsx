"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
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
