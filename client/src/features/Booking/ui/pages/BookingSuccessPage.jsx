import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { CheckCircle, ArrowLeft, Sparkles, Copy, Check } from "lucide-react";
import Navbar from "../../../../shared/ui/components/Navbar";
import Footer from "../../../Landing/ui/components/Footer";
import api from "../../../../config/api";


const BookingSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const reference = searchParams.get("reference");
  const [bookingDetails, setBookingDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      if (reference) {
        try {
          const response = await api.get(`/bookings/${reference}`);
          setBookingDetails(response.data.data);
        } catch (error) {
          console.error("Error fetching booking details:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchBookingDetails();
  }, [reference]);

  const copyToClipboard = () => {
    if (reference) {
      navigator.clipboard.writeText(reference);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080604] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-300 mx-auto mb-4"></div>
          <p>Loading booking details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080604] text-white">
      <Navbar />
      
      <div className="pt-24 px-6 pb-12">
        <div className="mx-auto max-w-3xl">
          {/* Success Icon */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-500/20 mb-6">
              <CheckCircle size={48} className="text-green-400" />
            </div>
            <h1 className="text-5xl font-semibold tracking-[-0.05em] mb-4">
              Booking Confirmed!
            </h1>
            <p className="text-lg text-white/60">
              Thank you for your booking. Our team will contact you shortly to confirm the details.
            </p>
          </div>

          {/* Booking Details Card */}
          <div className="bg-[#151515] rounded-[22px] border border-white/10 p-8 mb-8">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles size={20} className="text-orange-300" />
              <h2 className="text-xl font-semibold">Booking Details</h2>
            </div>

            {bookingDetails && (
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-[#080604] rounded-lg">
                  <div>
                    <p className="text-sm text-white/60">Booking Reference</p>
                    <p className="text-xl font-semibold font-mono">{reference}</p>
                  </div>
                  <button
                    onClick={copyToClipboard}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
                    title="Copy reference"
                  >
                    {copied ? <Check size={20} className="text-green-400" /> : <Copy size={20} />}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-[#080604] rounded-lg">
                    <p className="text-sm text-white/60">Customer Name</p>
                    <p className="font-semibold">{bookingDetails.customerName}</p>
                  </div>
                  <div className="p-4 bg-[#080604] rounded-lg">
                    <p className="text-sm text-white/60">Mobile</p>
                    <p className="font-semibold">{bookingDetails.mobile}</p>
                  </div>
                  <div className="p-4 bg-[#080604] rounded-lg">
                    <p className="text-sm text-white/60">Email</p>
                    <p className="font-semibold">{bookingDetails.email}</p>
                  </div>
                  <div className="p-4 bg-[#080604] rounded-lg">
                    <p className="text-sm text-white/60">Status</p>
                    <p className="font-semibold capitalize text-orange-300">
                      {bookingDetails.status}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-[#080604] rounded-lg">
                  <p className="text-sm text-white/60">Puja</p>
                  <p className="font-semibold">
                    {bookingDetails.pujaId?.name?.en || bookingDetails.pujaId?.name}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-[#080604] rounded-lg">
                    <p className="text-sm text-white/60">Samagri Option</p>
                    <p className="font-semibold capitalize">
                      {bookingDetails.samagriOption === "with_samagri" ? "With Samagri" : "Without Samagri"}
                    </p>
                  </div>
                  <div className="p-4 bg-[#080604] rounded-lg">
                    <p className="text-sm text-white/60">Total Price</p>
                    <p className="font-semibold text-orange-300">₹{bookingDetails.totalPrice}</p>
                  </div>
                </div>

                {bookingDetails.scheduledDate && (
                  <div className="p-4 bg-[#080604] rounded-lg">
                    <p className="text-sm text-white/60">Scheduled Date</p>
                    <p className="font-semibold">
                      {new Date(bookingDetails.scheduledDate).toLocaleDateString()}
                    </p>
                  </div>
                )}

                {bookingDetails.address && (
                  <div className="p-4 bg-[#080604] rounded-lg">
                    <p className="text-sm text-white/60">Address</p>
                    <p className="font-semibold">{bookingDetails.address}</p>
                    {bookingDetails.city && <p className="text-sm">{bookingDetails.city}</p>}
                    {bookingDetails.pincode && <p className="text-sm">{bookingDetails.pincode}</p>}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Next Steps */}
          <div className="bg-[#151515] rounded-[22px] border border-white/10 p-8 mb-8">
            <h2 className="text-xl font-semibold mb-4">What's Next?</h2>
            <ol className="space-y-4 text-white/70">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-300 text-black flex items-center justify-center text-sm font-semibold">1</span>
                <span>You will receive a confirmation email with your booking details.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-300 text-black flex items-center justify-center text-sm font-semibold">2</span>
                <span>Our team will contact you within 24 hours to confirm the puja timing and details.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-300 text-black flex items-center justify-center text-sm font-semibold">3</span>
                <span>On the day of the puja, our pandit will arrive at your location with all necessary samagri.</span>
              </li>
            </ol>
          </div>

          {/* Back Button */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-orange-300 hover:text-orange-200 transition"
          >
            <ArrowLeft size={20} />
            <span className="text-sm">Back to Home</span>
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BookingSuccessPage;
