import React, { useEffect, useState } from "react";
import { ArrowUpRight, Play, Quote, Sparkles, Star, X } from "lucide-react";

const testimonials = [
  {
    name: "Priya Kulkarni",
    location: "Pune",
    quote:
      "The entire puja experience was beautiful and completely hassle-free.",
    video: "/videos/customer-1.mp4",
    className: "md:col-span-2 md:row-span-2",
    rotate: "md:-rotate-2",
  },
  {
    name: "Rahul Deshmukh",
    location: "Mumbai",
    quote: "Everything was arranged perfectly.",
    video: "/videos/customer-2.mp4",
    className: "md:col-start-3 md:row-start-1",
    rotate: "md:rotate-2",
  },
  {
    name: "Sneha Patil",
    location: "Nashik",
    quote: "Authentic, peaceful and beautifully organised.",
    video: "/videos/shneha-patil.mp4",
    className: "md:col-start-4 md:row-start-1 md:row-span-2",
    rotate: "md:-rotate-1",
  },
  {
    name: "Amit Joshi",
    location: "Pune",
    quote: "Finding a trusted pandit has never been this easy.",
    video: "/videos/customer-4.mp4",
    className: "md:col-start-2 md:row-start-3",
    rotate: "md:rotate-3",
  },
  {
    name: "Neha Sharma",
    location: "Mumbai",
    quote: "A wonderful experience for our family.",
    video: "/videos/customer-5.mp4",
    className: "md:col-start-3 md:col-span-2 md:row-start-3",
    rotate: "md:-rotate-1",
  },
];

const VideoCard = ({ testimonial, onPlay }) => {
  return (
    <article
      className={`
        group
        relative
        min-h-[240px]
        overflow-hidden
        rounded-[28px]
        border
        border-white/10
        bg-[#151515]
        transition-all
        duration-500
        hover:z-20
        hover:scale-[1.03]
        hover:rotate-0
        ${testimonial.className}
        ${testimonial.rotate}
      `}
    >
      {/* Thumbnail */}
      <video
        src={testimonial.video}
        muted
        playsInline
        preload="metadata"
        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
          opacity-80
          transition
          duration-700
          group-hover:scale-110
        "
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

      {/* Play button */}
      <button
        onClick={() => onPlay(testimonial)}
        className="
          absolute
          right-5
          top-5
          z-10
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-full
          bg-white
          text-black
          shadow-xl
          transition-all
          duration-300
          hover:scale-110
          hover:bg-orange-300
        "
        aria-label={`Play ${testimonial.name}'s video`}
      >
        <Play size={16} fill="currentColor" />
      </button>

      {/* Quote icon */}
      <div className="absolute left-5 top-5">
        <Quote size={30} className="text-white/30" fill="currentColor" />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 w-full p-6">
        <p className="max-w-sm text-base font-medium leading-6 text-white">
          "{testimonial.quote}"
        </p>

        <div className="mt-5 flex items-end justify-between">
          <div>
            <h3 className="font-semibold">{testimonial.name}</h3>

            <p className="mt-1 text-xs text-white/50">{testimonial.location}</p>
          </div>

          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={11}
                fill="currentColor"
                className="text-orange-300"
              />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};

const VideoPopup = ({ testimonial, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Prevent background scrolling
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="
        fixed
        inset-0
        z-[999]
        flex
        items-center
        justify-center
        bg-black/80
        p-5
        backdrop-blur-xl
        animate-[fadeIn_0.25s_ease-out]
      "
      onClick={onClose}
    >
      {/* Decorative circles */}
      <div className="pointer-events-none absolute left-[10%] top-[15%] h-32 w-32 rounded-full bg-orange-400/10 blur-3xl" />

      <div className="pointer-events-none absolute bottom-[10%] right-[10%] h-40 w-40 rounded-full bg-orange-500/10 blur-3xl" />

      {/* Popup Card */}
      <div
        onClick={(event) => event.stopPropagation()}
        className="
          relative
          w-full
          max-w-4xl
          overflow-hidden
          rounded-[32px]
          border
          border-white/15
          bg-[#111]
          shadow-[0_30px_100px_rgba(0,0,0,0.7)]
          animate-[popupIn_0.4s_cubic-bezier(.16,1,.3,1)]
        "
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="
            absolute
            right-5
            top-5
            z-20
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-full
            border
            border-white/20
            bg-black/50
            text-white
            backdrop-blur-md
            transition
            hover:rotate-90
            hover:bg-white
            hover:text-black
          "
          aria-label="Close video"
        >
          <X size={20} />
        </button>

        {/* Video */}
        <div className="relative aspect-video w-full bg-black">
          <video
            src={testimonial.video}
            controls
            autoPlay
            playsInline
            className="h-full w-full object-contain"
          />
        </div>

        {/* Popup information */}
        <div className="flex flex-col justify-between gap-5 p-6 sm:flex-row sm:items-center sm:p-7">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Quote
                size={15}
                className="text-orange-300"
                fill="currentColor"
              />

              <span className="text-xs tracking-[0.2em] text-orange-300 uppercase">
                Customer Story
              </span>
            </div>

            <h3 className="text-2xl font-semibold">{testimonial.name}</h3>

            <p className="mt-1 text-sm text-white/40">{testimonial.location}</p>
          </div>

          <div className="max-w-md text-sm leading-6 text-white/55">
            "{testimonial.quote}"
          </div>
        </div>
      </div>
    </div>
  );
};

const TestimonialsSection = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <>
      <section id="Customers" className="relative overflow-hidden bg-[#080808] px-6 py-32 text-white">
        {/* Background grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "55px 55px",
          }}
        />

        {/* Glow */}
        <div className="absolute left-[20%] top-20 h-80 w-80 rounded-full bg-orange-500/10 blur-[130px]" />

        <div className="relative mx-auto max-w-6xl">
          {/* Header */}
          <div className="relative mb-24">
            <div className="mb-5 flex items-center gap-2 text-orange-300">
              <Sparkles size={16} />

              <span className="text-xs font-medium tracking-[0.3em] uppercase">
                Real People • Real Stories
              </span>
            </div>

            <div className="relative">
              <h2 className="text-[15vw] font-black leading-[0.75] tracking-[-0.08em] sm:text-8xl lg:text-[9rem]">
                LOVE
                <span className="text-orange-300">.</span>
              </h2>

              <span
                className="
                  absolute
                  bottom-[-25px]
                  left-[32%]
                  rotate-[-8deg]
                  font-serif
                  text-3xl
                  italic
                  text-orange-300
                  sm:text-5xl
                "
              >
                from our customers
              </span>
            </div>

            <p className="mt-14 max-w-md text-sm leading-6 text-white/40 md:ml-auto">
              Every ceremony is different. Every family has a story. Here's what
              they experienced with Aaple Guruji.
            </p>
          </div>

          {/* Gallery */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 md:auto-rows-[200px]">
            {testimonials.map((testimonial) => (
              <VideoCard
                key={testimonial.name}
                testimonial={testimonial}
                onPlay={setSelectedVideo}
              />
            ))}

            {/* Quote card */}
            <div
              className="
                relative
                flex
                min-h-[200px]
                rotate-[-4deg]
                items-center
                justify-center
                rounded-[35px]
                bg-orange-300
                p-8
                text-black
                shadow-[15px_20px_50px_rgba(0,0,0,0.3)]
                transition
                duration-500
                hover:z-20
                hover:rotate-2
              "
            >
              <div>
                <Quote
                  size={40}
                  fill="currentColor"
                  className="mb-4 opacity-30"
                />

                <p className="font-serif text-3xl font-bold leading-tight">
                  "Rituals become
                  <br />
                  memories."
                </p>
              </div>

              <Sparkles className="absolute right-6 top-6" size={20} />
            </div>

            {/* Decorative text */}
            <div className="hidden items-center justify-center md:flex">
              <span className="rotate-90 whitespace-nowrap text-[10px] tracking-[0.5em] text-white/20 uppercase">
                Faith • Family • Tradition • Blessings
              </span>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-20 flex flex-col items-start justify-between gap-8 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
            <div>
              <p className="text-3xl font-semibold">
                Your story could be next.
              </p>

              <p className="mt-2 text-sm text-white/35">
                Experience your special moments with Aaple Guruji.
              </p>
            </div>

            <button className="group flex items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-orange-200">
              Share your experience
              <ArrowUpRight
                size={17}
                className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </button>
          </div>
        </div>
      </section>

      {/* Video Popup */}
      {selectedVideo && (
        <VideoPopup
          testimonial={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}

      {/* Animation */}
      <style>{`
        @keyframes popupIn {
          0% {
            opacity: 0;
            transform: scale(0.8) rotate(-3deg);
          }

          70% {
            transform: scale(1.02) rotate(1deg);
          }

          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
};

export default TestimonialsSection;
