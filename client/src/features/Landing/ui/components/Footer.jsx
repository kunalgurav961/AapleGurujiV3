import React, { useEffect } from "react";
import { ArrowUpRight, Sparkles, Heart } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";
import { getPuja } from "../../state/pujaAction";

const navigationLinks = [
  { label: "Home", to: "/" },
  { label: "Pujas", to: "/pujas" },
  { label: "Astrology", to: "/astrology" },
  { label: "Puja Samagri", to: "/samagri" },
  { label: "Customers", to: "/customers" },
];

const socialLinks = [
  { label: "Instagram", href: "#", Icon: FaInstagram },
  { label: "Facebook", href: "#", Icon: FaFacebookF },
  { label: "YouTube", href: "#", Icon: FaYoutube },
];

const legalLinks = ["Privacy", "Terms", "Refund Policy"];

const Footer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pujas, loading } = useSelector((state) => state.puja);

  useEffect(() => {
    if (!pujas && !loading) {
      dispatch(getPuja());
    }
  }, [dispatch, loading, pujas]);

  const serviceLinks = pujas
    ?.filter((puja) => puja.availability?.active !== false)
    .slice(0, 6)
    .map((puja) => ({
      label: puja.name?.en || puja.name,
      to: `/puja/${puja._id}`,
    })) || [{ label: loading ? "Loading pujas..." : "Explore all pujas", to: "/pujas" }];

  return (
    <footer className="relative overflow-hidden bg-[#080808] text-white">
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "55px 55px",
        }}
      />

      {/* Orange glow */}
      <div className="pointer-events-none absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-orange-500/10 blur-[150px]" />

      <div className="pointer-events-none absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-orange-400/[0.06] blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* =====================================================
            BIG CTA
        ===================================================== */}

        <div className="relative border-b border-white/10 py-24 sm:py-32">
          {/* Small label */}
          <div className="mb-8 flex items-center gap-2 text-orange-300">
            <Sparkles size={16} />

            <span className="text-xs font-medium tracking-[0.3em] uppercase">
              Begin Your Journey
            </span>
          </div>

          {/* Main heading */}
          <div className="relative">
            <h2
              className="
                max-w-6xl
                text-[16vw]
                font-black
                leading-[0.72]
                tracking-[-0.09em]
                sm:text-8xl
                lg:text-[9.5rem]
              "
            >
              FIND
              <br />
              <span className="ml-[12%] text-orange-300">YOUR</span>
              <br />
              <span className="ml-[4%]">
                BLESSING<span className="text-orange-300">.</span>
              </span>
            </h2>

            {/* Floating sticker */}
            <div
              className="
                absolute
                right-[5%]
                top-[28%]
                hidden
                rotate-6
                rounded-full
                border
                border-black
                bg-orange-300
                px-7
                py-7
                text-center
                text-black
                shadow-2xl
                md:block
              "
            >
              <span className="block text-[10px] font-bold tracking-[0.25em] uppercase">
                Sacred
              </span>

              <span className="block text-xl font-black">• Moments •</span>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-sm leading-6 text-white/40">
              From traditional pujas to meaningful celebrations, let Aaple
              Guruji bring devotion, tradition and blessings closer to your
              home.
            </p>

            <button
              type="button"
              onClick={() => navigate("/book")}
              className="
                group
                flex
                w-fit
                items-center
                gap-4
                rounded-full
                bg-white
                px-7
                py-4
                text-sm
                font-semibold
                text-black
                transition-all
                duration-300
                hover:bg-orange-300
                hover:shadow-[0_0_50px_rgba(251,146,60,0.2)]
              "
            >
              Book a Puja
              <span
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-full
                  bg-black
                  text-white
                  transition-transform
                  duration-300
                  group-hover:-translate-y-1
                  group-hover:translate-x-1
                "
              >
                <ArrowUpRight size={15} />
              </span>
            </button>
          </div>
        </div>

        {/* =====================================================
            FOOTER CONTENT
        ===================================================== */}

        <div className="grid gap-12 py-16 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="relative">
              <h3 className="text-4xl font-black tracking-[-0.06em] sm:text-5xl">
                AAPLE
                <span className="text-orange-300">.</span>
                GURUJI
              </h3>

              <p className="mt-5 max-w-sm text-sm leading-6 text-white/40">
                Making sacred traditions simple, accessible and meaningful for
                modern families.
              </p>
            </div>

            {/* Socials */}
            <div className="mt-8 flex gap-3">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/10
                  bg-white/[0.03]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-orange-300/40
                  hover:bg-orange-300
                  hover:text-black
                "
                >
                  {React.createElement(Icon, { size: 17 })}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-2">
            <p className="mb-5 text-[10px] font-semibold tracking-[0.3em] text-orange-300 uppercase">
              Explore
            </p>

            <div className="flex flex-col gap-3">
              {navigationLinks.map(({ label, to }) => (
                  <Link
                    key={label}
                    to={to}
                    className="
                    group
                    flex
                    w-fit
                    items-center
                    gap-2
                    text-sm
                    text-white/45
                    transition-colors
                    hover:text-white
                  "
                  >
                    {label}

                    <ArrowUpRight
                      size={12}
                      className="
                      opacity-0
                      transition-all
                      duration-300
                      group-hover:-translate-y-0.5
                      group-hover:translate-x-0.5
                      group-hover:opacity-100
                    "
                    />
                  </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="md:col-span-2">
            <p className="mb-5 text-[10px] font-semibold tracking-[0.3em] text-orange-300 uppercase">
              Services
            </p>

            <div className="flex flex-col gap-3">
              {serviceLinks.map(({ label, to }) => (
                <Link
                  key={to}
                  to={to}
                  className="
                    text-sm
                    text-white/45
                    transition-colors
                    hover:text-white
                  "
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <p className="mb-5 text-[10px] font-semibold tracking-[0.3em] text-orange-300 uppercase">
              Get in touch
            </p>

            <div className="space-y-4">
              <a
                href="tel:+918888333430"
                className="
                  block
                  text-xl
                  font-semibold
                  tracking-tight
                  transition-colors
                  hover:text-orange-300
                "
              >
                +91 8888 333 430
              </a>

              <a
                href="mailto:hello@aapleguruji.in"
                className="
                  block
                  text-sm
                  text-white/40
                  transition-colors
                  hover:text-white
                "
              >
                office@aapleguruji.in
              </a>

              <p className="max-w-xs text-sm leading-6 text-white/30">
                Pune, Maharashtra
                <br />
                India
              </p>
            </div>
          </div>
        </div>

        {/* =====================================================
            FUNKY DIVIDER
        ===================================================== */}

        <div className="relative overflow-hidden border-y border-white/10 py-5">
          <div
            className="
              flex
              w-max
              items-center
              gap-8
              whitespace-nowrap
              text-[11px]
              font-medium
              tracking-[0.35em]
              text-white/20
              uppercase
            "
          >
            <span>Faith</span>
            <span className="text-orange-300">✦</span>
            <span>Tradition</span>
            <span className="text-orange-300">✦</span>
            <span>Devotion</span>
            <span className="text-orange-300">✦</span>
            <span>Peace</span>
            <span className="text-orange-300">✦</span>
            <span>Faith</span>
            <span className="text-orange-300">✦</span>
            <span>Tradition</span>
            <span className="text-orange-300">✦</span>
            <span>Devotion</span>
            <span className="text-orange-300">✦</span>
            <span>Peace</span>
          </div>
        </div>

        {/* =====================================================
            BOTTOM BAR
        ===================================================== */}

        <div className="flex flex-col justify-between gap-5 py-7 text-xs text-white/25 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Aaple Guruji. All rights reserved.</p>

          <div className="flex flex-wrap gap-6">
            {legalLinks.map((item) => (
              <a key={item} href="#" className="transition-colors hover:text-white">
                {item}
              </a>
            ))}
          </div>

          <p className="flex items-center gap-1">
            Made with
            <Heart size={12} fill="currentColor" className="text-orange-300" />
            in India
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
