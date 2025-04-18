import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { BaseUri } from "../../constants/uri";
import useEmail from "./email";
import { useNavigate } from "react-router-dom";

const OTPVerification = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const email = useEmail();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(`${BaseUri}/api/v1/user/verify`, {
        email,
        otp: data.otp,
      });
      if (response.status === 200) {
        toast.success("ভেরিফিকেশন সফল হয়েছে!");
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      }
    } catch (err) {
      setLoading(false);
      toast.error(err.response?.data?.message || "ভেরিফিকেশন ব্যর্থ হয়েছে");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfbfb] via-[#e3e7e8] to-[#dfe4ea] flex items-center justify-center px-4">
      <div className="bg-gray-100 rounded-2xl overflow-hidden w-full max-w-xl">
        <div className="p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              OTP ভেরিফিকেশন
            </h2>
            <p className="text-gray-500 text-sm">
              আমরা আপনার ইমেইলে একটি OTP পাঠিয়েছি: <br />
              <span className="text-amber-500 font-semibold">{email}</span>
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                OTP কোড:
              </label>
              <input
                type="text"
                {...register("otp", {
                  required: "OTP আবশ্যক",
                  pattern: {
                    value: /^[0-9]{6}$/,
                    message: "৬ সংখ্যার সঠিক OTP দিন",
                  },
                })}
                className="mt-1 block w-full border-b rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
                placeholder="ভেরিফিকেশন  "
              />
              {errors.otp && (
                <p className="text-red-500 text-sm">{errors.otp.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full ${
                loading
                  ? "bg-amber-300 cursor-not-allowed"
                  : "bg-amber-500 hover:bg-amber-600"
              } text-white font-semibold py-2 px-4 rounded-lg transition duration-200`}
            >
              {loading ? "ভেরিফাই হচ্ছে..." : "ভেরিফাই করুন"}
            </button>
          </form>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default OTPVerification;
