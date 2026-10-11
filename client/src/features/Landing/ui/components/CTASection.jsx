import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router";

const CTASection = () => {
  let navigate = useNavigate()
  return (
    <section className="relative w-full overflow-hidden bg-[#080604] px-6 py-20 text-white">
      {/* Background glow */}
      <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/10 blur-[100px]" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 rounded-[32px] border border-orange-200/10 bg-gradient-to-r from-[#17100a] via-[#120d08] to-[#17100a] px-8 py-10 shadow-2xl md:flex-row md:px-12">
        {/* Decorative glow */}
        <div className="absolute left-0 top-0 h-full w-1/3 bg-orange-500/5 blur-3xl" />

        {/* Content */}
        <div className="relative flex items-center gap-5">
          <div className="hidden h-14 w-14 items-center justify-center rounded-2xl border border-orange-300/20 bg-orange-400/10 text-orange-300 sm:flex">
            <Sparkles size={24} />
          </div>

          <div>
            <p className="mb-2 text-xs font-medium tracking-[0.25em] text-orange-300 uppercase">
              Begin Your Divine Journey
            </p>

            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Make Your Next Puja
              <span className="text-orange-300"> Truly Special.</span>
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-white/50 sm:text-base">
              Book a trusted pandit and experience sacred rituals with
              simplicity, devotion, and peace of mind.
            </p>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={() => navigate("/book")}
          className="group relative z-10 flex shrink-0 items-center gap-3 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-7 py-4 font-semibold text-black shadow-[0_10px_35px_rgba(245,158,11,0.18)] transition duration-300 hover:scale-105 hover:shadow-[0_12px_45px_rgba(245,158,11,0.3)]"
        >
          Book a Puja
          <ArrowRight
            size={18}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </button>
      </div>
    </section>
  );
};

export default CTASection;
