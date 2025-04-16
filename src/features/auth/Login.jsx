import React from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { LoginUser } from "../../services/api";
import { Toaster } from "react-hot-toast";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  

  const onSubmit = (data) => {
    console.log("লগইন তথ্য:", data);
    LoginUser(data, navigate);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfbfb] via-[#e3e7e8] to-[#dfe4ea] flex items-center justify-center px-4">
      <div className="bg-gray-100  rounded-2xl overflow-hidden w-full max-w-5xl grid grid-cols-1 md:grid-cols-2">
        {/* Left Side Image */}
        <div className="hidden md:block">
          <img
            src="https://i.ibb.co.com/KzDjTcGW/4826435-removebg-preview.png" 
            alt="Login"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side Login Form */}
        <div className="p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              স্বাগতম Smart Family Manager এ
            </h2>
            <p className="text-gray-500 text-sm">লগইন করতে আপনার তথ্য দিন</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                ইমেইল
              </label>
              <input
                type="email"
                {...register("email", { required: "ইমেইল আবশ্যক" })}
                className="mt-1 block w-full border-b  rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
                placeholder="example@mail.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                পাসওয়ার্ড
              </label>
              <input
                type="password"
                {...register("password", { required: "পাসওয়ার্ড আবশ্যক" })}
                className="mt-1 block w-full border-b  rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
                placeholder="********"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
            >
              লগইন করুন
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">আপনার একাউন্ট নেই?</p>
            <NavLink
              to="/register"
              className="inline-block mt-2 bg-amber-100 text-amber-600 hover:bg-amber-200 font-medium py-2 px-4 rounded-lg transition duration-200"
            >
              রেজিস্টার করুন
            </NavLink>
          </div>
        </div>
      </div>
      <Toaster/>
    </div>
  );
};

export default Login;
