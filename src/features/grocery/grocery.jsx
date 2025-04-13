import React, { useState } from "react";
import { useForm } from "react-hook-form";

const Grocery = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [successMsg, setSuccessMsg] = useState("");
  const [image, setImage] = useState(null);

  const onSubmit = (data) => {
    console.log("🛒 বাজার তথ্য:", data);
    setSuccessMsg("✅ বাজারের তথ্য সফলভাবে সংরক্ষণ করা হয়েছে!");
    reset();
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-2xl rounded-2xl">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        🛒 বাজারের জিনিসপত্র যোগ করুন
      </h2>

      {successMsg && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 text-center">
          {successMsg}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* প্রোডাক্ট নাম */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            📦 প্রোডাক্ট নাম
          </label>
          <input
            type="text"
            {...register("title", { required: true })}
            placeholder="যেমন: চাল, ডাল"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-400"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">প্রোডাক্ট নাম আবশ্যক।</p>
          )}
        </div>

        {/* ক্যাটাগরি */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">📂 ক্যাটাগরি</label>
          <select
            {...register("category", { required: true })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-400"
          >
            <option value="">-- নির্বাচন করুন --</option>
            <option value="সবজি">সবজি</option>
            <option value="মসল্লা">মসল্লা</option>
            <option value="গ্রোসারি">গ্রোসারি</option>
            <option value="অন্যান্য">অন্যান্য</option>
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">একটি ক্যাটাগরি নির্বাচন করুন।</p>
          )}
        </div>

        {/* মূল্য */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">💰 মূল্য (৳)</label>
          <input
            type="number"
            {...register("price", { required: true, min: 1 })}
            placeholder="৳ কত টাকা"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-400"
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">সঠিক মূল্য দিন।</p>
          )}
        </div>

        {/* কস্ট দাতা */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">🧍‍♂️ কে কিনেছে?</label>
          <input
            type="text"
            {...register("buyer", { required: true })}
            placeholder="যেমন: আব্বু, আম্মু, আমি"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-400"
          />
          {errors.buyer && (
            <p className="text-red-500 text-sm mt-1">ব্যক্তির নাম লিখুন।</p>
          )}
        </div>

        {/* তারিখ */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">📅 কেনার তারিখ</label>
          <input
            type="date"
            defaultValue={today}
            {...register("date", { required: true })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-400"
          />
          {errors.date && (
            <p className="text-red-500 text-sm mt-1">তারিখ নির্বাচন করুন।</p>
          )}
        </div>

        {/* নোট */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">📝 নোট</label>
          <textarea
            {...register("note")}
            placeholder="প্রয়োজনীয় তথ্য লিখুন (ঐচ্ছিক)"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-400"
            rows={3}
          />
        </div>

        {/* ছবি */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">📷 ছবি (ঐচ্ছিক)</label>
          <input
            type="file"
            {...register("attachment")}
            className="w-full"
            onChange={(e) => {
              if (e.target.files[0]) {
                setImage(e.target.files[0]);
              }
            }}
          />
        </div>

        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt="Attachment Preview"
            className="mt-2 w-32 h-32 object-cover rounded-lg"
          />
        )}

        {/* সাবমিট */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-2 rounded-lg transition-all duration-300"
          >
            ✅ বাজার সংরক্ষণ করুন
          </button>
        </div>
      </form>
    </div>
  );
};

export default Grocery;