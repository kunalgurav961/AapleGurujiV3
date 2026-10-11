import React from "react";
import { useNavigate } from "react-router";
import { Sparkles, Star, Compass, BookOpen, ArrowRight } from "lucide-react";
import Navbar from "../../../../shared/ui/components/Navbar";
import Footer from "../../../Landing/ui/components/Footer";

const astrologyServices = [
  {
    id: 1,
    title: "जन्म पत्रिका",
    titleEn: "Birth Chart (Kundali)",
    icon: <Star size={48} />,
    description: "Get your detailed birth chart analysis with accurate predictions and remedies.",
    descriptionMr: "आपला जन्म पत्रिका मिळवा, अचूक भविष्य आणि उपाय",
    features: [
      "Detailed planetary positions",
      "Dasha and Antardasha analysis",
      "Personalized predictions",
      "Remedies for doshas"
    ],
    price: "₹501",
  },
  {
    id: 2,
    title: "गुण मेलन",
    titleEn: "Kundali Matching",
    icon: <Compass size={48} />,
    description: "Match kundalis for marriage with comprehensive compatibility analysis.",
    descriptionMr: "विवाहासाठी कुंडली मिळवा, संपूर्ण सहकार्यता विश्लेषण",
    features: [
      "Ashtakoot matching",
      "Mangal dosha check",
      "Family compatibility",
      "Remedies for issues"
    ],
    price: "₹1,001",
  },
  {
    id: 3,
    title: "ज्योतिष मार्गदर्शन",
    titleEn: "Astrology Consultation",
    icon: <BookOpen size={48} />,
    description: "Personal guidance from expert astrologers for life decisions.",
    descriptionMr: "आयुष्यातील निर्णयांसाठी तज्ञ ज्योतिषांकडून मार्गदर्शन",
    features: [
      "Career guidance",
      "Education & career",
      "Health predictions",
      "Financial advice"
    ],
    price: "₹2,001",
  },
];

const AstrologyPage = () => {
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
                Vedic Astrology
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-semibold tracking-[-0.05em] mb-4">
              Astrology Services
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              ज्योतिष सेवा - Get expert guidance from our experienced astrologers for all your life questions.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {astrologyServices.map((service) => (
              <div
                key={service.id}
                className="group bg-[#151515] rounded-3xl border border-white/10 p-8 hover:border-orange-300/50 transition-all duration-300 hover:scale-105"
              >
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-orange-300/10 flex items-center justify-center text-orange-300 group-hover:bg-orange-300 group-hover:text-black transition-all duration-300">
                    {service.icon}
                  </div>
                </div>
                
                <h3 className="text-2xl font-semibold text-center mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-orange-300 text-center mb-4">
                  {service.titleEn}
                </p>
                
                <p className="text-white/60 text-center mb-6">
                  {service.description}
                </p>
                
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-white/70">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-300" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="text-center">
                  <p className="text-2xl font-semibold text-orange-300 mb-4">
                    {service.price}
                  </p>
                  <button
                    onClick={() => navigate("/book")}
                    className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white px-6 py-3 rounded-full hover:bg-orange-300 hover:text-black transition-all duration-300"
                  >
                    Book Now
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Why Choose Us */}
          <div className="bg-gradient-to-r from-orange-500/10 to-amber-400/10 rounded-3xl border border-orange-300/20 p-12">
            <h2 className="text-3xl font-semibold text-center mb-8">Why Our Astrology Services?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-orange-300/10 flex items-center justify-center mx-auto mb-4">
                  <Star className="text-orange-300" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Expert Astrologers</h3>
                <p className="text-white/60">Highly qualified and experienced Vedic astrologers</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-orange-300/10 flex items-center justify-center mx-auto mb-4">
                  <Compass className="text-orange-300" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Accurate Predictions</h3>
                <p className="text-white/60">Time-tested Vedic methods for precise analysis</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-orange-300/10 flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="text-orange-300" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Personalized Remedies</h3>
                <p className="text-white/60">Custom solutions based on your unique chart</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AstrologyPage;
