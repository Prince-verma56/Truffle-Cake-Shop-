"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

// Configuration for development
const ENABLE_PRELOADER = false;

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(ENABLE_PRELOADER);

  useEffect(() => {
    if (!ENABLE_PRELOADER) return;
    
    // Lock body scroll while preloading
    document.body.style.overflow = "hidden";
    
    // Simulate loading time (in a real app, this would wait for assets or data)
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = "";
    }, 2500);
    
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  if (!ENABLE_PRELOADER) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-[100] bg-cream flex flex-col items-center justify-center pointer-events-none"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col items-center gap-6"
          >
            <div className="relative w-24 h-24 sm:w-32 sm:h-32">
              {/* Paper-art placeholder */}
              <div className="absolute inset-0 border border-gold/30 rounded-full animate-spin-slow" style={{ animationDuration: '4s' }}></div>
              <div className="absolute inset-2 border border-gold/20 rounded-full animate-spin-slow" style={{ animationDuration: '3s', animationDirection: 'reverse' }}></div>
              <div className="absolute inset-0 flex items-center justify-center text-4xl sm:text-5xl font-serif text-navy">
                T
              </div>
            </div>
            
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="h-px bg-gold/50 w-32 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gold animate-pulse"></div>
            </motion.div>
            
            <p className="text-navy/70 font-medium tracking-[0.2em] text-xs uppercase">Baking memories</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
