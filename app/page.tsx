import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import AboutJanakiMahal from "../components/AboutJanakiMahal";
import RoomsSection from "../components/RoomsSection";
import AmenitiesSection from "../components/AmenitiesSection";
import GallerySection from "../components/GallerySection";
import TestimonialsSection from "../components/TestimonialsSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import FloatingWhatsApp from "../components/FloatingWhatsApp";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <AboutJanakiMahal />
      <RoomsSection />
      <AmenitiesSection />
      <GallerySection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}