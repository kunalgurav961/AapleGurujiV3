import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Check, X, Loader2, Sparkles, IndianRupee, Calendar, MapPin, Navigation } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import api from "../../../../config/api";
import { useLeadCapture } from "../../hooks/useLeadCapture";
import { setUserDetails, setEmailVerified, clearUser } from "../../state/userSlice";

const BookingForm = ({ preselectedPuja, pujas }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const isVerified = useSelector((state) => state.user.isVerified);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: user?.name || "",
      mobile: user?.mobile || "",
      email: user?.email || "",
      pujaId: preselectedPuja?._id || "",
      samagriOption: "with_samagri",
      scheduledDate: "",
      scheduledTime: "",
      address: "",
      city: "",
      pincode: "",
      notes: "",
    },
  });

  const watchedEmail = watch("email");
  const watchedPujaId = watch("pujaId");
  const watchedSamagriOption = watch("samagriOption");

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpSending, setOtpSending] = useState(false);
  const [otpVerifying, setOtpVerifying] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [needsVerification, setNeedsVerification] = useState(true);
  const [pricing, setPricing] = useState(null);
  const [loadingPricing, setLoadingPricing] = useState(false);
  const [selectedPujaData, setSelectedPujaData] = useState(preselectedPuja);
  const [locating, setLocating] = useState(false);

  useLeadCapture(watchedEmail, leadSubmitted && !otpVerified && needsVerification);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          
          if (data.address) {
            const address = data.address.road || "";
            const city = data.address.city || data.address.town || data.address.village || "";
            const pincode = data.address.postcode || "";
            
            setValue("address", address);
            setValue("city", city);
            setValue("pincode", pincode);
            toast.success("Location detected successfully");
          }
        } catch {
          toast.error("Failed to get address from location");
        } finally {
          setLocating(false);
        }
      },
      () => {
        setLocating(false);
        toast.error("Failed to get your location. Please enable location services.");
      }
    );
  };

  useEffect(() => {
    if (preselectedPuja) {
      setSelectedPujaData(preselectedPuja);
    }
  }, [preselectedPuja]);

  useEffect(() => {
    if (user) {
      setValue("name", user.name);
      setValue("mobile", user.mobile);
      setValue("email", user.email);
      if (user.emailVerified) {
        setLeadSubmitted(true);
        setOtpVerified(true);
      }
    }
  }, [user, setValue]);

  useEffect(() => {
    if (watchedPujaId && pujas) {
      const puja = pujas.find((p) => p._id === watchedPujaId);
      setSelectedPujaData(puja);
    }
  }, [watchedPujaId, pujas]);

  useEffect(() => {
    if (watchedEmail && watchedEmail !== preselectedPuja?.email) {
      setOtpSent(false);
      setOtpVerified(false);
      setOtp("");
    }
  }, [watchedEmail, preselectedPuja?.email]);

  useEffect(() => {
    const fetchPricing = async () => {
      if (watchedPujaId && watchedSamagriOption) {
        setLoadingPricing(true);
        try {
          const response = await api.post("/bookings/calculate-price", {
            pujaId: watchedPujaId,
            samagriOption: watchedSamagriOption,
          });
          setPricing(response.data.data);
        } catch (error) {
          console.error("Error fetching pricing:", error);
        } finally {
          setLoadingPricing(false);
        }
      }
    };

    fetchPricing();
  }, [watchedPujaId, watchedSamagriOption]);

  const sendOTP = async () => {
    if (!watchedEmail) {
      toast.error("Please enter your email address");
      return;
    }

    setOtpSending(true);
    try {
      await api.post("/otp/request", { email: watchedEmail });
      setOtpSent(true);
      toast.success("OTP sent to your email");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setOtpSending(false);
    }
  };

  const verifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    setOtpVerifying(true);
    try {
      await api.post("/otp/verify", { email: watchedEmail, otp });
      setOtpVerified(true);
      dispatch(setEmailVerified());
      toast.success("Email verified successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid OTP");
    } finally {
      setOtpVerifying(false);
    }
  };

  const handleContinueToOTP = async (data) => {
    try {
      const response = await api.post("/leads", {
        name: data.name,
        mobile: data.mobile,
        email: data.email,
        pujaId: data.pujaId,
      });
      
      dispatch(setUserDetails({
        name: data.name,
        mobile: data.mobile,
        email: data.email,
      }));
      
      setLeadSubmitted(true);
      setNeedsVerification(response.data.data.needsVerification);
      
      if (!response.data.data.needsVerification) {
        setOtpVerified(true);
        dispatch(setEmailVerified());
        toast.success("Email already verified. Proceeding to booking.");
      } else {
        toast.success("Details saved. Please verify your email to continue.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save details");
    }
  };

  const onSubmit = async (data) => {
    if (needsVerification && !otpVerified) {
      toast.error("Please verify your email before submitting");
      return;
    }

    try {
      const response = await api.post("/bookings", {
        name: data.name,
        mobile: data.mobile,
        email: data.email,
        pujaId: data.pujaId,
        samagriOption: data.samagriOption,
        scheduledDate: data.scheduledDate,
        scheduledTime: data.scheduledTime,
        address: data.address,
        city: data.city,
        pincode: data.pincode,
        notes: data.notes,
      });

      toast.success("Booking submitted successfully!");
      
      setTimeout(() => {
        window.location.href = `/booking-success?reference=${response.data.data.bookingReference}`;
      }, 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit booking");
    }
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const mobileRegex = /^[6-9]\d{9}$/;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Form Section */}
      <div className="space-y-6">
        {/* Personal Information */}
        <div className="bg-[#151515] rounded-[22px] border border-white/10 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Sparkles size={20} className="text-orange-300" />
              Personal Information
            </h2>
            {isVerified && (
              <button
                type="button"
                onClick={() => {
                  dispatch(clearUser());
                  setLeadSubmitted(false);
                  setOtpVerified(false);
                  setOtpSent(false);
                  setValue("name", "");
                  setValue("mobile", "");
                  setValue("email", "");
                }}
                className="text-sm text-orange-300 hover:text-orange-200 transition"
              >
                Change Details
              </button>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                disabled={isVerified}
                className={`w-full bg-[#080604] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-orange-300 focus:outline-none transition ${isVerified ? "opacity-50 cursor-not-allowed" : ""}`}
                placeholder="Enter your full name"
              />
              {errors.name && (
                <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                Mobile Number *
              </label>
              <div className="flex">
                <span className="bg-[#080604] border border-white/10 border-r-0 rounded-l-lg px-4 py-3 text-white/50">
                  +91
                </span>
                <input
                  type="tel"
                  {...register("mobile", {
                    required: "Mobile number is required",
                    pattern: {
                      value: mobileRegex,
                      message: "Invalid mobile number",
                    },
                  })}
                  disabled={isVerified}
                  className={`w-full bg-[#080604] border border-white/10 rounded-r-lg px-4 py-3 text-white focus:border-orange-300 focus:outline-none transition ${isVerified ? "opacity-50 cursor-not-allowed" : ""}`}
                  placeholder="Enter 10-digit mobile number"
                />
              </div>
              {errors.mobile && (
                <p className="text-red-400 text-sm mt-1">{errors.mobile.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: emailRegex,
                    message: "Invalid email format",
                  },
                })}
                disabled={isVerified}
                className={`w-full bg-[#080604] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-orange-300 focus:outline-none transition ${isVerified ? "opacity-50 cursor-not-allowed" : ""}`}
                placeholder="Enter your email address"
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {!leadSubmitted && !isVerified && (
              <button
                type="button"
                onClick={handleSubmit(handleContinueToOTP)}
                className="w-full bg-orange-300 text-black font-semibold rounded-lg py-3 hover:bg-orange-200 transition"
              >
                Continue to Verification
              </button>
            )}
          </div>
        </div>

        {/* Email Verification */}
        {leadSubmitted && needsVerification && (
          <div className="bg-[#151515] rounded-[22px] border border-white/10 p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Sparkles size={20} className="text-orange-300" />
              Email Verification
            </h2>

            <div className="space-y-4">
              {!otpSent ? (
                <button
                  type="button"
                  onClick={sendOTP}
                  disabled={otpSending || !emailRegex.test(watchedEmail)}
                  className="w-full bg-orange-300 text-black font-semibold rounded-lg py-3 hover:bg-orange-200 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {otpSending ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send OTP"
                  )}
                </button>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">
                      Enter OTP *
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        maxLength={6}
                        className="flex-1 bg-[#080604] border border-white/10 rounded-lg px-4 py-3 text-white text-center text-2xl tracking-widest focus:border-orange-300 focus:outline-none transition"
                        placeholder="000000"
                      />
                      {otpVerified ? (
                        <div className="flex items-center justify-center px-4 bg-green-500/20 rounded-lg">
                          <Check size={24} className="text-green-400" />
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={verifyOTP}
                          disabled={otpVerifying}
                          className="px-6 bg-orange-300 text-black font-semibold rounded-lg hover:bg-orange-200 transition disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                          {otpVerifying ? (
                            <Loader2 size={18} className="animate-spin" />
                          ) : (
                            "Verify"
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={sendOTP}
                    disabled={otpSending}
                    className="text-sm text-orange-300 hover:text-orange-200 transition disabled:opacity-50"
                  >
                    Resend OTP
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* Puja Selection */}
        {leadSubmitted && (otpVerified || !needsVerification) && (
          <div className="bg-[#151515] rounded-[22px] border border-white/10 p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Sparkles size={20} className="text-orange-300" />
              Puja Selection
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Select Puja *
                </label>
                <select
                  {...register("pujaId", { required: "Please select a puja" })}
                  className="w-full bg-[#080604] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-orange-300 focus:outline-none transition"
                >
                  <option value="">Choose a puja</option>
                  {pujas?.map((puja) => (
                    <option key={puja._id} value={puja._id}>
                      {puja.name?.en || puja.name}
                    </option>
                  ))}
                </select>
                {errors.pujaId && (
                  <p className="text-red-400 text-sm mt-1">{errors.pujaId.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Samagri Option *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label className="relative cursor-pointer">
                    <input
                      type="radio"
                      {...register("samagriOption")}
                      value="with_samagri"
                      className="sr-only peer"
                    />
                    <div className="bg-[#080604] border border-white/10 rounded-lg p-4 peer-checked:border-orange-300 peer-checked:bg-orange-300/10 transition">
                      <div className="flex items-center gap-2">
                        <Check size={16} className="text-orange-300 opacity-0 peer-checked:opacity-100" />
                        <span className="font-medium">With Samagri</span>
                      </div>
                    </div>
                  </label>
                  <label className="relative cursor-pointer">
                    <input
                      type="radio"
                      {...register("samagriOption")}
                      value="without_samagri"
                      className="sr-only peer"
                    />
                    <div className="bg-[#080604] border border-white/10 rounded-lg p-4 peer-checked:border-orange-300 peer-checked:bg-orange-300/10 transition">
                      <div className="flex items-center gap-2">
                        <Check size={16} className="text-orange-300 opacity-0 peer-checked:opacity-100" />
                        <span className="font-medium">Without Samagri</span>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Scheduling */}
        {leadSubmitted && (otpVerified || !needsVerification) && (
          <div className="bg-[#151515] rounded-[22px] border border-white/10 p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Calendar size={20} className="text-orange-300" />
              Schedule (Optional)
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Preferred Date
                </label>
                <input
                  type="date"
                  {...register("scheduledDate")}
                  className="w-full bg-[#080604] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-orange-300 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Preferred Time
                </label>
                <input
                  type="time"
                  {...register("scheduledTime")}
                  className="w-full bg-[#080604] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-orange-300 focus:outline-none transition"
                />
              </div>
            </div>
          </div>
        )}

        {/* Address */}
        {leadSubmitted && (otpVerified || !needsVerification) && (
          <div className="bg-[#151515] rounded-[22px] border border-white/10 p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <MapPin size={20} className="text-orange-300" />
              Address (Optional)
            </h2>

            <div className="space-y-4">
              <button
                type="button"
                onClick={getCurrentLocation}
                disabled={locating}
                className="w-full flex items-center justify-center gap-2 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white hover:bg-white/20 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {locating ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Locating...
                  </>
                ) : (
                  <>
                    <Navigation size={18} />
                    Use Current Location
                  </>
                )}
              </button>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Street Address
                </label>
                <textarea
                  {...register("address")}
                  rows={2}
                  className="w-full bg-[#080604] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-orange-300 focus:outline-none transition resize-none"
                  placeholder="Enter your street address"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    {...register("city")}
                    className="w-full bg-[#080604] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-orange-300 focus:outline-none transition"
                    placeholder="City"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Pincode
                  </label>
                  <input
                    type="text"
                    {...register("pincode")}
                    className="w-full bg-[#080604] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-orange-300 focus:outline-none transition"
                    placeholder="Pincode"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notes */}
        {leadSubmitted && (otpVerified || !needsVerification) && (
          <div className="bg-[#151515] rounded-[22px] border border-white/10 p-6">
            <h2 className="text-xl font-semibold mb-6">Additional Notes</h2>
            <textarea
              {...register("notes")}
              rows={3}
              className="w-full bg-[#080604] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-orange-300 focus:outline-none transition resize-none"
              placeholder="Any special requirements or notes..."
            />
          </div>
        )}

        {/* Submit Button */}
        {leadSubmitted && (otpVerified || !needsVerification) && (
          <button
            type="button"
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-orange-500 to-amber-400 text-black font-semibold rounded-xl py-4 hover:scale-[1.02] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Booking"
            )}
          </button>
        )}
      </div>

      {/* Summary Section */}
      <div className="space-y-6">
        <div className="bg-[#151515] rounded-[22px] border border-white/10 p-6 sticky top-24">
          <h2 className="text-xl font-semibold mb-6">Booking Summary</h2>

          {selectedPujaData && (
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                {selectedPujaData.images?.thumbnail ? (
                  <img
                    src={selectedPujaData.images.thumbnail}
                    alt={selectedPujaData.name?.en}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-20 h-20 bg-[#080604] rounded-lg flex items-center justify-center">
                    <Sparkles size={32} className="text-orange-300" />
                  </div>
                )}
                <div>
                  <h3 className="font-semibold">
                    {selectedPujaData.name?.en || selectedPujaData.name}
                  </h3>
                  <p className="text-sm text-white/60">
                    {selectedPujaData.shortDescription?.en || selectedPujaData.category}
                  </p>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Package</span>
                  <span className="text-right">
                    {pricing?.packageName || "Loading..."}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Samagri</span>
                  <span>
                    {watchedSamagriOption === "with_samagri" ? "Included" : "Not Included"}
                  </span>
                </div>
                <div className="border-t border-white/10 pt-3 flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span className="text-orange-300 flex items-center gap-1">
                    <IndianRupee size={18} />
                    {loadingPricing ? "..." : pricing?.totalPrice || "0"}
                  </span>
                </div>
              </div>
            </div>
          )}

          {!selectedPujaData && (
            <p className="text-white/50 text-center py-8">
              Select a puja to see the summary
            </p>
          )}
        </div>

        {/* Trust Badges */}
        <div className="bg-[#151515] rounded-[22px] border border-white/10 p-6">
          <h3 className="font-semibold mb-4">Why Choose Us?</h3>
          <ul className="space-y-3 text-sm text-white/70">
            <li className="flex items-start gap-2">
              <Check size={16} className="text-green-400 mt-0.5" />
              <span>Verified and experienced pandits</span>
            </li>
            <li className="flex items-start gap-2">
              <Check size={16} className="text-green-400 mt-0.5" />
              <span>Transparent pricing with no hidden charges</span>
            </li>
            <li className="flex items-start gap-2">
              <Check size={16} className="text-green-400 mt-0.5" />
              <span>Complete samagri arrangement available</span>
            </li>
            <li className="flex items-start gap-2">
              <Check size={16} className="text-green-400 mt-0.5" />
              <span>Secure and convenient booking process</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
