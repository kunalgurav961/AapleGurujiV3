import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import PoojaCard from "./PoojaCard";
import { ArrowUpRight, Sparkles } from "lucide-react";

const PoojaSection = () => {
  const navigate = useNavigate();
  const pujas = useSelector((state) => state.puja.pujas);
  return (
    <section id="Pujas" className="relative overflow-hidden bg-[#080808] px-6 py-24 text-white">
      {/* Background Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        {/* ================= HEADER ================= */}

        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-4 flex items-center gap-2 text-orange-300">
              <Sparkles size={16} />

              <span className="text-xs font-medium tracking-[0.25em] uppercase">
                Sacred Experiences
              </span>
            </div>

            <h2 className="text-6xl font-semibold tracking-[-0.05em] sm:text-8xl">
              Pooja
              <span className="text-orange-300">.</span>
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-6 text-white/45">
            Discover sacred rituals performed by experienced pandits for every
            important moment of your life.
          </p>
        </div>

        {/* ================= BENTO GRID ================= */}

        <div
          className="
            grid
            grid-cols-1
            gap-4
            sm:grid-cols-2
            md:grid-cols-4
            md:auto-rows-[220px]
          "
        >
          {pujas ? (
            pujas.map((pooja) => (
              <PoojaCard key={pooja._id} pooja={pooja} />
            ))
          ) : (
            <p className="text-white/50">Loading pujas...</p>
          )}

          {/* ================= TYPOGRAPHY ================= */}

          <div
            className="
              relative
              hidden
              overflow-hidden
              md:col-start-2
              md:col-span-3
              md:row-start-4
              md:block
            "
          >
            {/* Huge background typography */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <span
                className="
                  select-none
                  text-[7rem]
                  font-black
                  leading-none
                  tracking-[-0.08em]
                  text-white/[0.035]
                "
              >
                DEVOTION
              </span>
            </div>

            {/* Foreground typography */}
            <div className="relative flex h-full items-center justify-between px-6 ">
              <div>
                <p className="mb-3 text-[20px] font-medium tracking-[0.35em] text-orange-300 uppercase">
                  More than a ritual
                </p>

                <h3 className="max-w-lg text-6xl font-semibold leading-[0.95] tracking-[-0.04em]">
                  Moments that
                  <br />
                  <span className="text-orange-300">become memories.</span>
                </h3>
              </div>

              {/* Vertical text */}
              <div className="hidden h-full items-center lg:flex">
                <span
                  className="
                    rotate-90
                    whitespace-nowrap
                    text-[10px]
                    font-medium
                    tracking-[0.5em]
                    text-white/20
                    uppercase
                  "
                >
                  Faith • Tradition • Blessings
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= FOOTER ================= */}

        <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
          <span className="text-sm text-white/30">
            {pujas ? `${String(pujas.length).padStart(2, '0')} Sacred Experiences` : 'Loading...'}
          </span>

          <button 
            onClick={() => navigate("/pujas")}
            className="group flex items-center gap-2 text-sm font-medium text-orange-300 transition hover:text-orange-200"
          >
            Explore all Pujas
            <ArrowUpRight
              size={16}
              className="
                transition-transform
                group-hover:-translate-y-1
                group-hover:translate-x-1
              "
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default PoojaSection;
