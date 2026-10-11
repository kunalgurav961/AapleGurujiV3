import React from "react";
import {
  ArrowUpRight,
  Mail,
  Phone,
  User,
  MessageSquare,
  Sparkles,
} from "lucide-react";

const ContactForm = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#080808] px-6 py-20 text-white">
      {/* Background Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "55px 55px",
        }}
      />

      {/* Glow */}
      <div className="pointer-events-none absolute left-[-150px] top-[20%] h-[400px] w-[400px] rounded-full bg-orange-500/10 blur-[140px]" />

      <div className="pointer-events-none absolute bottom-[-150px] right-[-100px] h-[400px] w-[400px] rounded-full bg-orange-400/[0.07] blur-[140px]" />

      <div className="relative mx-auto grid max-w-6xl gap-16 lg:grid-cols-2 lg:items-center">
        {/* =====================================================
            LEFT CONTENT
        ===================================================== */}

        <div>
          {/* Label */}
          <div className="mb-6 flex items-center gap-2 text-orange-300">
            <Sparkles size={16} />

            <span className="text-xs font-medium tracking-[0.3em] uppercase">
              Get In Touch
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-6xl font-black leading-[0.85] tracking-[-0.07em] sm:text-7xl lg:text-[6.5rem]">
            LET'S
            <br />
            <span className="ml-[10%] text-orange-300">TALK</span>
            <span>.</span>
          </h1>

          <p className="mt-10 max-w-md text-sm leading-7 text-white/40">
            Have a question, need help choosing a puja, or want to organise a
            special ceremony? We'd love to hear from you.
          </p>

          {/* Contact Details */}
          <div className="mt-12 space-y-5">
            <a
              href="tel:+918888888888"
              className="group flex items-center gap-4"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] transition group-hover:border-orange-300/40 group-hover:bg-orange-300 group-hover:text-black">
                <Phone size={16} />
              </div>

              <div>
                <p className="text-[10px] tracking-[0.2em] text-white/25 uppercase">
                  Call us
                </p>

                <p className="mt-1 text-sm font-medium">+91 8888 888 888</p>
              </div>
            </a>

            <a
              href="mailto:hello@aapleguruji.in"
              className="group flex items-center gap-4"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] transition group-hover:border-orange-300/40 group-hover:bg-orange-300 group-hover:text-black">
                <Mail size={16} />
              </div>

              <div>
                <p className="text-[10px] tracking-[0.2em] text-white/25 uppercase">
                  Email us
                </p>

                <p className="mt-1 text-sm font-medium">hello@aapleguruji.in</p>
              </div>
            </a>
          </div>
        </div>

        {/* =====================================================
            FORM
        ===================================================== */}

        <div
          className="
            relative
            overflow-hidden
            rounded-[32px]
            border
            border-white/10
            bg-white/[0.035]
            p-6
            backdrop-blur-xl
            sm:p-8
          "
        >
          {/* Decorative Circle */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full border border-orange-300/10" />

          <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full border border-orange-300/10" />

          <form className="relative space-y-6">
            {/* Name + Phone */}
            <div className="grid gap-6 sm:grid-cols-2">
              {/* Name */}
              <div className="group">
                <label className="mb-2 block text-[10px] font-medium tracking-[0.2em] text-white/30 uppercase">
                  Your Name
                </label>

                <div className="relative">
                  <User
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25 transition-colors group-focus-within:text-orange-300"
                  />

                  <input
                    type="text"
                    placeholder="Kunal Gurav"
                    className="
                      h-14
                      w-full
                      rounded-2xl
                      border
                      border-white/10
                      bg-black/20
                      pl-11
                      pr-4
                      text-sm
                      text-white
                      outline-none
                      placeholder:text-white/20
                      transition-all
                      focus:border-orange-300/50
                      focus:bg-black/40
                      focus:ring-1
                      focus:ring-orange-300/20
                    "
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="group">
                <label className="mb-2 block text-[10px] font-medium tracking-[0.2em] text-white/30 uppercase">
                  Phone
                </label>

                <div className="relative">
                  <Phone
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25 transition-colors group-focus-within:text-orange-300"
                  />

                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    className="
                      h-14
                      w-full
                      rounded-2xl
                      border
                      border-white/10
                      bg-black/20
                      pl-11
                      pr-4
                      text-sm
                      text-white
                      outline-none
                      placeholder:text-white/20
                      transition-all
                      focus:border-orange-300/50
                      focus:bg-black/40
                      focus:ring-1
                      focus:ring-orange-300/20
                    "
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="group">
              <label className="mb-2 block text-[10px] font-medium tracking-[0.2em] text-white/30 uppercase">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25 transition-colors group-focus-within:text-orange-300"
                />

                <input
                  type="email"
                  placeholder="you@example.com"
                  className="
                    h-14
                    w-full
                    rounded-2xl
                    border
                    border-white/10
                    bg-black/20
                    pl-11
                    pr-4
                    text-sm
                    text-white
                    outline-none
                    placeholder:text-white/20
                    transition-all
                    focus:border-orange-300/50
                    focus:bg-black/40
                    focus:ring-1
                    focus:ring-orange-300/20
                  "
                />
              </div>
            </div>

            {/* Service */}
            <div>
              <label className="mb-2 block text-[10px] font-medium tracking-[0.2em] text-white/30 uppercase">
                What do you need?
              </label>

              <select
                className="
                  h-14
                  w-full
                  appearance-none
                  rounded-2xl
                  border
                  border-white/10
                  bg-black/20
                  px-4
                  text-sm
                  text-white/60
                  outline-none
                  transition-all
                  focus:border-orange-300/50
                  focus:bg-black/40
                  focus:ring-1
                  focus:ring-orange-300/20
                "
                defaultValue=""
              >
                <option value="" disabled className="bg-[#111]">
                  Select a service
                </option>

                <option className="bg-[#111]">Puja Booking</option>

                <option className="bg-[#111]">Home Puja</option>

                <option className="bg-[#111]">Griha Pravesh</option>

                <option className="bg-[#111]">Office Opening</option>

                <option className="bg-[#111]">Puja Samagri</option>

                <option className="bg-[#111]">Kundli / Astrology</option>

                <option className="bg-[#111]">Other</option>
              </select>
            </div>

            {/* Message */}
            <div className="group">
              <label className="mb-2 block text-[10px] font-medium tracking-[0.2em] text-white/30 uppercase">
                Your Message
              </label>

              <div className="relative">
                <MessageSquare
                  size={16}
                  className="absolute left-4 top-4 text-white/25 transition-colors group-focus-within:text-orange-300"
                />

                <textarea
                  rows={5}
                  placeholder="Tell us what you're looking for..."
                  className="
                    w-full
                    resize-none
                    rounded-2xl
                    border
                    border-white/10
                    bg-black/20
                    py-4
                    pl-11
                    pr-4
                    text-sm
                    leading-6
                    text-white
                    outline-none
                    placeholder:text-white/20
                    transition-all
                    focus:border-orange-300/50
                    focus:bg-black/40
                    focus:ring-1
                    focus:ring-orange-300/20
                  "
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="
                group
                flex
                h-14
                w-full
                items-center
                justify-between
                rounded-2xl
                bg-orange-300
                px-5
                text-sm
                font-semibold
                text-black
                transition-all
                duration-300
                hover:bg-orange-200
                hover:shadow-[0_0_40px_rgba(251,146,60,0.2)]
              "
            >
              <span>Send Message</span>

              <span
                className="
                  flex
                  h-9
                  w-9
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
                <ArrowUpRight size={17} />
              </span>
            </button>

            <p className="text-center text-[10px] leading-5 text-white/20">
              We'll get back to you as soon as possible.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
