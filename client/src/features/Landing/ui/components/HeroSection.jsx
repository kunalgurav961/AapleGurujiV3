import { ArrowRight, ChevronDown, MessageCircle, Sparkles } from "lucide-react";
import ContactForm from "./ContactForm";

import { Navigate, useNavigate } from "react-router";
import Navbar from "../../../../shared/ui/components/Navbar";

const HeroSection = () => {
  let navigate = useNavigate();
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#080604] text-white">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/bg.png"
          alt="Aaple Guruji"
          className="h-full w-full object-cover scale-105"
        />

        {/* Dark cinematic overlays */}
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-[#080604]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/30" />
      </div>

      {/* Ambient glow */}
      <div className="absolute left-1/2 top-1/3 h-100 w-100 -translate-x-1/2 rounded-full bg-orange-500/10 blur-[120px]" />

      {/* ================= NAVBAR ================= */}
      <Navbar />

      {/* ================= HERO CONTENT ================= */}
      <main className="relative z-10 flex min-h-[calc(100vh-80px)] items-center justify-center px-6">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center text-center">
          {/* Small badge */}
          <div className="mb-6 flex items-center gap-2 rounded-full border border-orange-300/20 bg-orange-200/5 px-4 py-2 backdrop-blur-md">
            <Sparkles size={15} className="text-orange-300" />

            <span className="text-xs font-medium tracking-[0.2em] text-orange-100/80 uppercase">
              Divine Services • Trusted Pandits
            </span>
          </div>

          {/* Main heading */}
          <h1 className="max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.04em] sm:text-7xl lg:text-[100px]">
            <span className="block">Bring Divinity</span>

            <span className="block bg-gradient-to-r from-[#ffe0a3] via-[#f6b85c] to-[#d97706] bg-clip-text text-transparent">
              Into Your Home
            </span>
          </h1>

          {/* Description */}
          <p className="mt-7 max-w-2xl text-base leading-7 text-white/60 sm:text-lg">
            Book authentic Hindu pujas, connect with trusted pandits, and
            experience every sacred ritual with simplicity, devotion, and
            convenience.
          </p>

          {/* CTA */}
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => navigate("/book")}
              className="group flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-7 py-4 font-semibold text-black shadow-[0_10px_40px_rgba(245,158,11,0.2)] transition hover:scale-[1.03]"
            >
              Book a Puja
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>

            <button
              onClick={() => navigate("/pujas")}
              className="rounded-full border border-white/15 bg-white/5 px-7 py-4 font-medium text-white backdrop-blur-md transition hover:bg-white/10"
            >
              Explore Services
            </button>
          </div>

          {/* Trust */}
          <div className="mt-10 flex items-center gap-3 text-sm text-white/45">
            <div className="flex -space-x-2">
              <div className="h-8 w-8 rounded-full border-2 border-black bg-orange-200" />
              <div className="h-8 w-8 rounded-full border-2 border-black bg-amber-400" />
              <div className="h-8 w-8 rounded-full border-2 border-black bg-orange-700" />
            </div>

            <span>
              Trusted by <strong className="text-white/70">1000+</strong>{" "}
              families
            </span>
          </div>
        </div>
      </main>

      {/* ================= BOTTOM BOOKING CARD ================= */}
      <div className="absolute bottom-8 left-6 z-20 hidden w-[360px] lg:block">
        <div className="rounded-3xl border border-white/10 bg-black/40 p-6 shadow-2xl backdrop-blur-2xl">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-400/10 text-orange-300">
              <Sparkles size={19} />
            </div>

            <div>
              <p className="text-xs text-orange-300">TODAY</p>
              <h3 className="font-semibold">Aajch Puja Book Kara 🙏</h3>
            </div>
          </div>

          <p className="text-sm leading-6 text-white/50">
            Choose your puja, select your preferred time and let our trusted
            pandits take care of the rest.
          </p>

          <button
            onClick={() => navigate("/book")}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-white py-3 font-semibold text-black transition hover:bg-orange-100"
          >
            Book Your Puja
            <ArrowRight size={17} />
          </button>
        </div>
      </div>

      {/* ================= SCROLL INDICATOR ================= */}
      <div className="absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/40 md:flex">
        <span className="text-[10px] tracking-[0.3em] uppercase">
          Scroll to explore
        </span>

        <ChevronDown className="animate-bounce" size={18} />
      </div>
    </section>
  );
};

export default HeroSection;
