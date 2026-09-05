"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button 
        onClick={() => setIsOpen(true)}
        className="p-2 -mr-2 text-navy"
        aria-label="Open menu"
      >
        <Menu size={24} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed inset-0 bg-cream z-50 flex flex-col"
          >
            <div className="flex justify-between items-center px-4 md:px-8 h-20">
              <span className="text-xl font-serif text-navy">Truffle Cakes.</span>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 -mr-2 text-navy"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>
            
            <nav className="flex flex-col gap-8 p-8 text-3xl font-serif mt-10">
              <Link href="#signature" onClick={() => setIsOpen(false)} className="text-navy hover:text-gold transition-colors">Signature</Link>
              <Link href="#story" onClick={() => setIsOpen(false)} className="text-navy hover:text-gold transition-colors">Our Story</Link>
              <Link href="#visit" onClick={() => setIsOpen(false)} className="text-navy hover:text-gold transition-colors">Visit Us</Link>
            </nav>

            <div className="mt-auto p-8">
              <Link 
                href="#order"
                onClick={() => setIsOpen(false)}
                className="block w-full py-4 bg-navy text-white text-center rounded-full text-lg font-medium"
              >
                Order a Cake
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
