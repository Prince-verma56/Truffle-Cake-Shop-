"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { homepageContent } from "@/lib/content/homepage";
import { MapPin, Phone } from "lucide-react";

const InstagramIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export default function CinematicFooter() {
  const { footer } = homepageContent;

  return (
    <footer className="bg-navy text-cream pt-24 pb-12 relative overflow-hidden border-t border-cream/10">
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-24">
          
          <div className="lg:col-span-2 pr-12">
            <span className="type-label text-gold tracking-[0.2em] mb-6 block">06 / FOOTER</span>
            <Link href="/" className="font-fraunces text-4xl tracking-tight text-white mb-6 block">
              Truffle Cakes.
            </Link>
          </div>

          <div>
            <h4 className="type-label text-gold mb-6">EXPLORE</h4>
            <ul className="flex flex-col gap-4 type-body text-cream/70">
              <li><Link href="#cakes" className="hover:text-gold transition-colors">Cakes</Link></li>
              <li><Link href="#menu" className="hover:text-gold transition-colors">Menu</Link></li>
              <li><Link href="#story" className="hover:text-gold transition-colors">Our Story</Link></li>
              <li><Link href="#stores" className="hover:text-gold transition-colors">Stores</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="type-label text-gold mb-6">CONTACT</h4>
            <ul className="flex flex-col gap-4 type-body text-cream/70">
              <li>
                <span className="text-cream/40">[ Social Links Placeholder ]</span>
              </li>
              <li>
                <span className="text-cream/40">[ Contact Info Placeholder ]</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-cream/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="type-small text-cream/50">
            © {new Date().getFullYear()} Truffle Cakes.
          </p>
          <div className="flex items-center gap-6 type-small text-cream/50">
            <span className="hover:text-gold transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-gold transition-colors cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
