import Navbar from "@/components/navigation/Navbar";
import Preloader from "@/components/landing/Preloader";
import Hero from "@/components/landing/Hero";
import SignatureProduct from "@/components/landing/SignatureProduct";
import HorizontalStory from "@/components/landing/HorizontalStory";
import StoreExperience from "@/components/landing/StoreExperience";
import Occasions from "@/components/landing/Occasions";
import CinematicFooter from "@/components/landing/CinematicFooter";

export default function Home() {
  return (
    <>
      <Preloader />
      <Navbar />
      <main className="min-h-screen">
        <Hero />
        <SignatureProduct />
        <HorizontalStory />
        <StoreExperience />
        <Occasions />
      </main>
      <CinematicFooter />
    </>
  );
}
