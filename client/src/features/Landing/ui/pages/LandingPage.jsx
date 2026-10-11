import React from "react";
import HeroSection from "../components/HeroSection";
import CTASection from "../components/CTASection";
import TestimonialsSection from "../components/TestimonialSection";
import Footer from "../components/Footer";
import { CIcon } from "@coreui/icons-react";
import { cibWhatsapp } from "@coreui/icons";

const LandingPage = () => {
  return (
    <main className="w-full overflow-hidden bg-[#080604]">
      <HeroSection />
      <CTASection />
      <TestimonialsSection />
      <Footer />
      <a
        href={`https://wa.me/918888333430?text=${encodeURIComponent(
          "Hello! I'm interested in your services.",
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-15 h-15 fixed bottom-10 right-10 flex justify-center items-center z-50 p-2 text-white rounded-full bg-green-500"
      >
        <CIcon icon={cibWhatsapp} color="white" />
      </a>
    </main>
  );
};

export default LandingPage;
