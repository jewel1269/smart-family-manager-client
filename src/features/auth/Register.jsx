import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { RegisterUser } from "../../services/api";
import { Toaster } from "react-hot-toast";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate()
  const [uploading, setUploading] = useState(false);

  const imgbbApiKey = "82c726e9918f37b82da10ff4866d0fc0"; 

  const onSubmit = async (data) => {
    setUploading(true);
    const imageFile = data.profileImage[0];

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
        formData
      );

      const imageUrl = response.data.data.url;

      const userData = {
        ...data,
        profileImage: imageUrl,
      }; 

      RegisterUser(userData,navigate)

      console.log("রেজিস্ট্রেশন তথ্য:", userData);
      reset(); // ফর্ম রিসেট
    } catch (error) {
      console.error("ইমেজ আপলোডে সমস্যা:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfbfb] via-[#e3e7e8] to-[#dfe4ea] flex items-center justify-center px-4">
      <div className="bg-gray-100 rounded-2xl flex w-full max-w-5xl overflow-hidden">
        {/* Left Side Image */}
        <div
          className="hidden md:block md:w-1/2 bg-no-repeat bg-center"
          style={{
            backgroundImage: `url("https://i.ibb.co.com/KzDjTcGW/4826435-removebg-preview.png")`,
          }}
        ></div>

        {/* Right Side Form */}
        <div className="w-full md:w-1/2 p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              স্বাগতম Smart Family Manager এ
            </h2>
            <p className="text-gray-500 text-sm">
              নিবন্ধন করতে নিচের ফর্ম পূরণ করুন
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* নাম */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                নাম
              </label>
              <input
                type="text"
                {...register("name", { required: "নাম আবশ্যক" })}
                className="mt-1 block w-full border-b rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
                placeholder="আপনার নাম লিখুন"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            {/* ইমেইল */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                ইমেইল
              </label>
              <input
                type="email"
                {...register("email", { required: "ইমেইল আবশ্যক" })}
                className="mt-1 block w-full border-b rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
                placeholder="example@mail.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* পাসওয়ার্ড */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                পাসওয়ার্ড
              </label>
              <input
                type="password"
                {...register("password", { required: "পাসওয়ার্ড আবশ্যক" })}
                className="mt-1 block w-full border-b rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
                placeholder="********"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* ঠিকানা */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                ঠিকানা
              </label>
              <input
                type="text"
                {...register("address", { required: "ঠিকানা আবশ্যক" })}
                className="mt-1 block w-full border-b rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
                placeholder="ঠিকানা লিখুন"
              />
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address.message}</p>
              )}
            </div>

            {/* প্রোফাইল ইমেজ ফাইল */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                প্রোফাইল ইমেজ
              </label>
              <input
                type="file"
                {...register("profileImage", { required: "ইমেজ ফাইল দিন" })}
                accept="image/*"
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-amber-100 file:text-amber-700 hover:file:bg-amber-200"
              />
              {errors.profileImage && (
                <p className="text-red-500 text-sm">
                  {errors.profileImage.message}
                </p>
              )}
            </div>

            {/* রোল */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                রোল
              </label>
              <select
                {...register("role")}
                defaultValue="user"
                className="mt-1 block w-full border-b rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                <option value="user">User</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={uploading}
              className={`w-full ${
                uploading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-amber-500 hover:bg-amber-600"
              } text-white font-semibold py-2 px-4 rounded-lg transition duration-200`}
            >
              {uploading ? "আপলোড হচ্ছে..." : "নিবন্ধন করুন"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">ইতিমধ্যেই একাউন্ট আছে?</p>
            <NavLink
              to="/login"
              className="inline-block mt-2 bg-amber-100 text-amber-600 hover:bg-amber-200 font-medium py-2 px-4 rounded-lg transition duration-200"
            >
              লগইন করুন
            </NavLink>
          </div>
        </div>
      </div>
      <Toaster/>
    </div>
  );
};

export default Register;
