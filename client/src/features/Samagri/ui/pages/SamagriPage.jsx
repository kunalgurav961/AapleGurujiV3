import React from "react";
import { useNavigate } from "react-router";
import { Sparkles, Package, ShoppingCart, ArrowRight, Check } from "lucide-react";
import Navbar from "../../../../shared/ui/components/Navbar";
import Footer from "../../../Landing/ui/components/Footer";

const samagriKits = [
  {
    id: 1,
    name: "सत्यानारण पूजा समग्री",
    nameEn: "Satyanarayan Puja Kit",
    image: "/samagri/satyanarayan.jpg",
    description: "Complete kit for Satyanarayan Puja with all essential materials.",
    items: [
      "Pooja Thali",
      "Kalash",
      "Ghee Lamp",
      "Incense sticks",
      "Flowers",
      "Prasad items",
      "Sacred thread",
      "Kumkum & Haldi"
    ],
    price: "₹2,500",
    inStock: true,
  },
  {
    id: 2,
    name: "गृहप्रवेश समग्री",
    nameEn: "Griha Pravesh Kit",
    image: "/samagri/griha-pravesh.jpg",
    description: "Complete kit for house warming ceremony with all required materials.",
    items: [
      "Navagraha idols",
      "Kalash",
      "Coconut",
      "Rice & Grains",
      "Mango leaves",
      "Sacred thread",
      "Lamp",
      "Prasad items"
    ],
    price: "₹3,500",
    inStock: true,
  },
  {
    id: 3,
    name: "वास्तुशांती समग्री",
    nameEn: "Vaastu Shanti Kit",
    image: "/samagri/vaastu-shanti.jpg",
    description: "Complete kit for Vaastu Shanti Puja to bring peace and harmony.",
    items: [
      "Vastu yantra",
      "Puja materials",
      "Holy water vessel",
      "Incense",
      "Flowers",
      "Rice",
      "Coconut",
      "Sacred items"
    ],
    price: "₹2,000",
    inStock: true,
  },
  {
    id: 4,
    name: "ऑफिस ओपनिंग समग्री",
    nameEn: "Office Opening Kit",
    image: "/samagri/office-opening.jpg",
    description: "Complete kit for office/shop opening ceremony for prosperity.",
    items: [
      "Kalash",
      "Lamp",
      "Incense",
      "Flowers",
      "Coconut",
      "Sacred thread",
      "Prasad items",
      "Navagraha items"
    ],
    price: "₹3,000",
    inStock: false,
  },
];

const SamagriPage = () => {
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
                Puja Materials
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-semibold tracking-[-0.05em] mb-4">
              Samagri Kits
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              पूजा सामग्री - Complete puja material kits delivered to your doorstep.
            </p>
          </div>

          {/* Kits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {samagriKits.map((kit) => (
              <div
                key={kit.id}
                className="group bg-[#151515] rounded-3xl border border-white/10 overflow-hidden hover:border-orange-300/50 transition-all duration-300 hover:scale-105"
              >
                <div className="relative h-48 bg-[#080604] flex items-center justify-center">
                  <Package className="text-orange-300/30" size={64} />
                  {!kit.inStock && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Out of Stock
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">
                    {kit.name}
                  </h3>
                  <p className="text-sm text-orange-300 mb-3">
                    {kit.nameEn}
                  </p>
                  
                  <p className="text-white/60 text-sm mb-4 line-clamp-2">
                    {kit.description}
                  </p>
                  
                  <ul className="space-y-1 mb-4">
                    {kit.items.slice(0, 4).map((item, index) => (
                      <li key={index} className="flex items-center gap-2 text-xs text-white/70">
                        <Check size={12} className="text-green-400" />
                        {item}
                      </li>
                    ))}
                    {kit.items.length > 4 && (
                      <li className="text-xs text-orange-300">
                        +{kit.items.length - 4} more items
                      </li>
                    )}
                  </ul>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-semibold text-orange-300">
                      {kit.price}
                    </p>
                    <button
                      onClick={() => navigate("/book")}
                      disabled={!kit.inStock}
                      className="p-2 rounded-full bg-orange-300 text-black hover:bg-orange-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ShoppingCart size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="bg-gradient-to-r from-orange-500/10 to-amber-400/10 rounded-3xl border border-orange-300/20 p-12">
            <h2 className="text-3xl font-semibold text-center mb-8">Why Our Samagri Kits?</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-orange-300/10 flex items-center justify-center mx-auto mb-3">
                  <Package className="text-orange-300" size={28} />
                </div>
                <h3 className="font-semibold mb-1">Complete Kits</h3>
                <p className="text-sm text-white/60">All items included</p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-orange-300/10 flex items-center justify-center mx-auto mb-3">
                  <Check className="text-orange-300" size={28} />
                </div>
                <h3 className="font-semibold mb-1">Quality Assured</h3>
                <p className="text-sm text-white/60">Premium materials</p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-orange-300/10 flex items-center justify-center mx-auto mb-3">
                  <ShoppingCart className="text-orange-300" size={28} />
                </div>
                <h3 className="font-semibold mb-1">Doorstep Delivery</h3>
                <p className="text-sm text-white/60">Quick & safe delivery</p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-orange-300/10 flex items-center justify-center mx-auto mb-3">
                  <Sparkles className="text-orange-300" size={28} />
                </div>
                <h3 className="font-semibold mb-1">Blessed Items</h3>
                <p className="text-sm text-white/60">Priest blessed</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <p className="text-white/60 mb-4">Need custom samagri for specific puja?</p>
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

      <Footer />
    </div>
  );
};

export default SamagriPage;
