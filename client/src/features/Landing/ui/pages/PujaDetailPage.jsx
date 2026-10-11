import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { ArrowLeft, Calendar, Clock, MapPin, Sparkles } from "lucide-react";

import Footer from "../components/Footer";
import { getPujaById } from "../../state/pujaAction";
import Navbar from "../../../../shared/ui/components/Navbar";

const PujaDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const puja = useSelector((state) => state.puja.selectedPuja);

  useEffect(() => {
    if (id) {
      dispatch(getPujaById(id));
    }
  }, [id, dispatch]);

  if (!puja) {
    return (
      <div className="min-h-screen bg-[#080604] text-white flex items-center justify-center">
        <p>Loading puja details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080604] text-white">
      <Navbar />
      
      <div className="pt-24 px-6">
        <div className="mx-auto max-w-6xl">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="mb-8 flex items-center gap-2 text-orange-300 hover:text-orange-200 transition"
          >
            <ArrowLeft size={20} />
            <span className="text-sm">Back to Pujas</span>
          </button>

          {/* Header */}
          <div className="mb-8">
            <div className="mb-4 flex items-center gap-2 text-orange-300">
              <Sparkles size={16} />
              <span className="text-xs font-medium tracking-[0.25em] uppercase">
                Sacred Ritual
              </span>
            </div>
            <h1 className="text-5xl font-semibold tracking-[-0.05em] sm:text-7xl">
              {puja.name?.en || puja.name}
            </h1>
            <p className="mt-4 text-lg text-white/60 max-w-2xl">
              {puja.shortDescription?.en || puja.description?.en}
            </p>
          </div>

          {/* Image */}
          <div className="mb-12 overflow-hidden rounded-[22px] border border-white/10">
            <img
              src={puja.images?.thumbnail || puja.image}
              alt={puja.name?.en || puja.name}
              className="w-full h-[400px] object-cover"
            />
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Description */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">About this Puja</h2>
              <p className="text-white/70 leading-relaxed">
                {puja.description?.en || puja.shortDescription?.en}
              </p>
            </div>

            {/* Details */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Puja Details</h2>
              <div className="space-y-3">
                {puja.category && (
                  <div className="flex items-center gap-3 text-white/70">
                    <span className="text-orange-300">Category:</span>
                    <span>{puja.category}</span>
                  </div>
                )}
                {puja.availability?.locations && puja.availability.locations.length > 0 && (
                  <div className="flex items-center gap-3 text-white/70">
                    <MapPin size={20} className="text-orange-300" />
                    <span>Location: {puja.availability.locations.join(", ")}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Benefits */}
          {puja.benefits && puja.benefits.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Benefits</h2>
              <div className="bg-[#151515] rounded-[22px] border border-white/10 p-6">
                <ul className="text-white/70 leading-relaxed space-y-2">
                  {puja.benefits.map((benefit, index) => (
                    <li key={index}>• {benefit}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Service Highlights */}
          {puja.serviceHighlights && puja.serviceHighlights.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Service Highlights</h2>
              <div className="bg-[#151515] rounded-[22px] border border-white/10 p-6">
                <ul className="text-white/70 leading-relaxed space-y-2">
                  {puja.serviceHighlights.map((highlight, index) => (
                    <li key={index}>• {highlight}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Samagri */}
          {puja.samagri && (
            <div className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Requirements</h2>
              <div className="bg-[#151515] rounded-[22px] border border-white/10 p-6 space-y-4">
                {puja.samagri.includedWithPackage && puja.samagri.includedWithPackage.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-orange-300 mb-2">Included with Package</h3>
                    <ul className="text-white/70 space-y-1">
                      {puja.samagri.includedWithPackage.map((item, index) => (
                        <li key={index}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {puja.samagri.customerArrangedChecklist && puja.samagri.customerArrangedChecklist.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-orange-300 mb-2">Customer Arranged</h3>
                    <ul className="text-white/70 space-y-1">
                      {puja.samagri.customerArrangedChecklist.map((item, index) => (
                        <li key={index}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Packages */}
          {puja.packages && puja.packages.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Packages</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {puja.packages.map((pkg) => (
                  <div key={pkg.id} className="bg-[#151515] rounded-[22px] border border-white/10 p-6">
                    <h3 className="text-xl font-semibold text-orange-300 mb-2">
                      {pkg.name?.en || pkg.name}
                    </h3>
                    <p className="text-3xl font-semibold text-white mb-4">
                      ₹{pkg.price}
                    </p>
                    {pkg.features && pkg.features.length > 0 && (
                      <ul className="text-white/70 space-y-1">
                        {pkg.features.map((feature, index) => (
                          <li key={index}>• {feature}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA Button */}
          <div className="mb-24 flex flex-col sm:flex-row gap-4">
            <button
              className="px-8 py-4 bg-orange-300 text-black font-semibold rounded-full hover:bg-orange-200 transition"
              onClick={() => navigate(`/book?pujaId=${puja._id}`)}
            >
              Book this Puja
            </button>
            <button
              className="px-8 py-4 border border-white/20 text-white font-semibold rounded-full hover:bg-white/10 transition"
              onClick={() => {
                window.location.href = `https://wa.me/918888333430?text=${encodeURIComponent(
                  `Hello! I'm interested in booking ${puja.name?.en || puja.name}.`
                )}`;
              }}
            >
              Chat on WhatsApp
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PujaDetailPage;
