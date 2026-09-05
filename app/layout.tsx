import type { Metadata } from "next";
import { Fraunces, Manrope, Allura } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const allura = Allura({
  subsets: ["latin"],
  variable: "--font-allura",
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Truffle Cakes | Modern Patisserie",
  description: "Made to be remembered.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${manrope.variable} ${allura.variable} h-full antialiased font-manrope`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
