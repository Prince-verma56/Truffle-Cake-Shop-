import CinematicIntro from "@/components/intro/CinematicIntro";
import Navbar from "@/components/navigation/Navbar";
import Hero from "@/components/landing/Hero";
import OurStory from "@/components/landing/OurStory";
import HorizontalStory from "@/components/landing/HorizontalStory";
import StoreExperience from "@/components/landing/StoreExperience";
import Occasions from "@/components/landing/Occasions";
import CinematicFooter from "@/components/landing/CinematicFooter";

export default function Home() {
  return (
    <>
      {/* Cinematic intro — sits above everything at z-9999, unmounts when complete */}
      <CinematicIntro />

      <Navbar />

      <main className="min-h-screen">
        <Hero />
        {/* LAYER 3: Main Page Content */}
        <OurStory />
        <HorizontalStory />
        <StoreExperience />
        <Occasions />
      </main>

      <CinematicFooter />
    </>
  );
}
