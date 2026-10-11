import React from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { Sparkles, ArrowRight, Search } from "lucide-react";
import Navbar from "../../../../shared/ui/components/Navbar";
import Footer from "../../../Landing/ui/components/Footer";
import PoojaCard from "../../../Landing/ui/components/PoojaCard";

const PujasPage = () => {
  const navigate = useNavigate();
  const pujas = useSelector((state) => state.puja.pujas);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("All");

  const categories = ["All", ...new Set(pujas?.map(p => p.category) || [])];

  const filteredPujas = pujas?.filter((puja) => {
    const matchesSearch = (puja.name?.en || puja.name).toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || puja.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#080604] text-white">
      <Navbar />
      
      <div className="pt-32 px-6 pb-24">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-300/20 bg-orange-200/5 px-4 py-2 mb-6">
              <Sparkles size={16} className="text-orange-300" />
              <span className="text-xs font-medium tracking-[0.2em] text-orange-100/80 uppercase">
                Sacred Rituals
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-semibold tracking-[-0.05em] mb-4">
              Our Pujas
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Discover authentic Hindu pujas performed by experienced pandits for every important moment of your life.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-8 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" size={20} />
              <input
                type="text"
                placeholder="Search pujas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#151515] border border-white/10 rounded-full pl-12 pr-4 py-3 text-white placeholder:text-white/50 focus:border-orange-300 focus:outline-none transition"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full text-sm font-medium whitespace-nowrap transition ${
                    selectedCategory === category
                      ? "bg-orange-300 text-black"
                      : "bg-[#151515] border border-white/10 text-white/70 hover:text-white"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Pujas Grid */}
          {filteredPujas && filteredPujas.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPujas.map((puja) => (
                <PoojaCard key={puja._id} pooja={puja} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-white/50 text-lg">No pujas found matching your search.</p>
            </div>
          )}

          {/* CTA */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-orange-500/10 to-amber-400/10 rounded-3xl border border-orange-300/20 p-12">
              <h2 className="text-3xl font-semibold mb-4">Can't find what you're looking for?</h2>
              <p className="text-white/60 mb-6">Contact us for custom puja arrangements</p>
              <button
                onClick={() => navigate("/book")}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-400 text-black font-semibold rounded-full px-8 py-4 hover:scale-105 transition-transform"
              >
                Contact Us
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PujasPage;
