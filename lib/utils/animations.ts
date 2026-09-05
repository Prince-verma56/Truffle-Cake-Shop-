import type { Variants } from "motion/react";

export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 30 },
  whileInView: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
  }
};

export const staggerContainer: Variants = {
  initial: { opacity: 0 },
  whileInView: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

export const revealAnimation: Variants = {
  initial: { opacity: 0, clipPath: "inset(100% 0 0 0)" },
  whileInView: { 
    opacity: 1, 
    clipPath: "inset(0 0 0 0)", 
    transition: { duration: 1.2, ease: [0.77, 0, 0.175, 1] } 
  }
};
