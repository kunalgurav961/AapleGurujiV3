import React from "react";
import { useNavigate } from "react-router";
import { Sparkles, Star, Quote, Play, ArrowRight } from "lucide-react";
import Navbar from "../../../../shared/ui/components/Navbar";
import Footer from "../../../Landing/ui/components/Footer"

const testimonials = [
  {
    id: 1,
    name: "Rajesh Sharma",
    location: "Pune",
    rating: 5,
    text: "Excellent service! The pandit was very knowledgeable and performed the Satyanarayan Puja with great devotion. Highly recommended!",
    puja: "Satyanarayan Puja",
    avatar: "RS",
  },
  {
    id: 2,
    name: "Priya Patil",
    location: "Mumbai",
    rating: 5,
    text: "वास्तुशांती पूजा very well done. Guruji explained everything and the entire ceremony was smooth. Thank you Aaple Guruji!",
    puja: "Vaastu Shanti Puja",
    avatar: "PP",
  },
  {
    id: 3,
    name: "Amit Joshi",
    location: "Nashik",
    rating: 5,
    text: "Professional and punctual. The Griha Pravesh Puja was performed perfectly. Will definitely use again for other pujas.",
    puja: "Griha Pravesh",
    avatar: "AJ",
  },
  {
    id: 4,
    name: "Sneha Deshmukh",
    location: "Nagpur",
    rating: 5,
    text: "The Kundali matching was very accurate. Got detailed analysis and helpful remedies. Very satisfied with the service.",
    puja: "Kundali Matching",
    avatar: "SD",
  },
  {
    id: 5,
    name: "Vikram Singh",
    location: "Aurangabad",
    rating: 5,
    text: "गुण मेलन सेवा excellent. The astrologer explained everything clearly and gave us confidence in our decision.",
    puja: "Kundali Matching",
    avatar: "VS",
  },
  {
    id: 6,
    name: "Meena Kulkarni",
    location: "Kolhapur",
    rating: 5,
    text: "Office opening puja was perfect. The samagri was arranged properly and everything went smoothly. Great team!",
    puja: "Office Opening",
    avatar: "MK",
  },
];

const CustomersPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#080604] text-white">
      <Navbar />
      
      <div className="pt-32 px-6 pb-24">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-16 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-300/20 bg-orange-200/5 px-4 py-2 mb-6">
              <Sparkles size={16} className="text-orange-300" />
              <span className="text-xs font-medium tracking-[0.2em] text-orange-100/80 uppercase">
                Happy Customers
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-semibold tracking-[-0.05em] mb-4">
              What Our Customers Say
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Real stories from our satisfied customers who experienced our divine services.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <div className="bg-[#151515] rounded-2xl border border-white/10 p-6 text-center">
              <p className="text-4xl font-bold text-orange-300 mb-2">1000+</p>
              <p className="text-white/60">Happy Families</p>
            </div>
            <div className="bg-[#151515] rounded-2xl border border-white/10 p-6 text-center">
              <p className="text-4xl font-bold text-orange-300 mb-2">500+</p>
              <p className="text-white/60">Pujas Performed</p>
            </div>
            <div className="bg-[#151515] rounded-2xl border border-white/10 p-6 text-center">
              <p className="text-4xl font-bold text-orange-300 mb-2">4.9</p>
              <p className="text-white/60">Average Rating</p>
            </div>
            <div className="bg-[#151515] rounded-2xl border border-white/10 p-6 text-center">
              <p className="text-4xl font-bold text-orange-300 mb-2">50+</p>
              <p className="text-white/60">Expert Pandits</p>
            </div>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-[#151515] rounded-2xl border border-white/10 p-6 hover:border-orange-300/50 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center text-black font-bold text-xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-white/60">{testimonial.location}</p>
                  </div>
                </div>
                
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-orange-300 text-orange-300" />
                  ))}
                </div>
                
                <div className="relative mb-4">
                  <Quote className="absolute top-0 left-0 text-orange-300/20" size={32} />
                  <p className="text-white/80 pl-8 italic">
                    "{testimonial.text}"
                  </p>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="text-sm text-orange-300">{testimonial.puja}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Video Testimonials */}
          <div className="mb-16">
            <h2 className="text-3xl font-semibold text-center mb-8">Video Testimonials</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-[#151515] rounded-2xl border border-white/10 overflow-hidden aspect-video flex items-center justify-center group cursor-pointer hover:border-orange-300/50 transition-all"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-orange-300/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-orange-300 group-hover:text-black transition-all">
                      <Play size={32} className="text-orange-300 group-hover:text-black" />
                    </div>
                    <p className="text-white/60">Customer Story {i}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-orange-500/10 to-amber-400/10 rounded-3xl border border-orange-300/20 p-12 text-center">
            <h2 className="text-3xl font-semibold mb-4">Share Your Experience</h2>
            <p className="text-white/60 mb-6 max-w-xl mx-auto">
              Had a great experience with our services? Share your story and help others discover divine rituals.
            </p>
            <button
              onClick={() => navigate("/book")}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-400 text-black font-semibold rounded-full px-8 py-4 hover:scale-105 transition-transform"
            >
              Book a Puja
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CustomersPage;
