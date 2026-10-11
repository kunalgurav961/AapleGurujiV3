import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { ArrowLeft, Loader2 } from "lucide-react";
import Navbar from "../../../../shared/ui/components/Navbar";
import Footer from "../../../Landing/ui/components/Footer";
import BookingForm from "../components/BookingForm";
import { getPuja } from "../../../Landing/state/pujaAction";

const BookingPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const preselectedPujaId = searchParams.get("pujaId");
  const pujas = useSelector((state) => state.puja.pujas);
  const [selectedPuja, setSelectedPuja] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch pujas if not already loaded
    if (!pujas) {
      dispatch(getPuja());
    }
  }, [pujas, dispatch]);

  useEffect(() => {
    if (preselectedPujaId && pujas) {
      const puja = pujas.find((p) => p._id === preselectedPujaId);
      setSelectedPuja(puja || null);
    }
    setLoading(false);
  }, [preselectedPujaId, pujas]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080604] text-white flex items-center justify-center">
        <Loader2 className="animate-spin" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080604] text-white">
      <Navbar />
      
      <div className="pt-24 px-6 pb-12">
        <div className="mx-auto max-w-6xl">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="mb-8 flex items-center gap-2 text-orange-300 hover:text-orange-200 transition"
          >
            <ArrowLeft size={20} />
            <span className="text-sm">Back</span>
          </button>

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-5xl font-semibold tracking-[-0.05em] sm:text-7xl mb-4">
              Book Your Puja
            </h1>
            <p className="text-lg text-white/60 max-w-2xl">
              Complete the form below to book your puja. Our team will contact you to confirm the details.
            </p>
          </div>

          <BookingForm preselectedPuja={selectedPuja} pujas={pujas} />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BookingPage;
