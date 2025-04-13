import React, { useState } from "react";
import { useForm } from "react-hook-form";

const ExpenseForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [successMsg, setSuccessMsg] = useState("");
  const [image, setImage] = useState(null);

  const onSubmit = (data) => {
    console.log("🔴 খরচ তথ্য:", data);
    setSuccessMsg("✅ খরচ সফলভাবে সংরক্ষণ করা হয়েছে!");
    reset();
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-2xl rounded-2xl">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        💰 খরচ যোগ ফর্ম
      </h2>

      {successMsg && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 text-center">
          {successMsg}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* ক্যাটাগরি */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            🏷️ ক্যাটাগরি
          </label>
          <select
            {...register("category", { required: true })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
          >
            <option value="">-- নির্বাচন করুন --</option>
            <option value="খাবার">খাবার</option>
            <option value="ভাড়া">বাসা ভাড়া</option>
            <option value="পরিবহন">পরিবহন</option>
            <option value="চিকিৎসা">চিকিৎসা</option>
            <option value="শিক্ষা">শিক্ষা</option>
            <option value="পোশাক">পোশাক</option>
            <option value="বিনোদন">বিনোদন</option>
            <option value="অন্যান্য">অন্যান্য</option>
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">
              ক্যাটাগরি নির্বাচন করা আবশ্যক।
            </p>
          )}
        </div>

        {/* পরিমাণ */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            💸 পরিমাণ (৳)
          </label>
          <input
            type="number"
            {...register("amount", { required: true, min: 1 })}
            placeholder="৳ কত খরচ হয়েছে"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
          />
          {errors.amount && (
            <p className="text-red-500 text-sm mt-1">সঠিক পরিমাণ লিখুন</p>
          )}
        </div>

        {/* পেমেন্ট পদ্ধতি */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            💳 পেমেন্ট মাধ্যম
          </label>
          <select
            {...register("paymentMethod", { required: true })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
          >
            <option value="">-- নির্বাচন করুন --</option>
            <option value="নগদ">নগদ</option>
            <option value="বিকাশ">বিকাশ</option>
            <option value="নগদ অ্যাপ">নগদ অ্যাপ</option>
            <option value="কার্ড">কার্ড</option>
            <option value="ব্যাংক">ব্যাংক</option>
            <option value="ক্যাশ">ক্যাশ</option>
            <option value="অন্যান্য">অন্যান্য</option>
          </select>
          {errors.paymentMethod && (
            <p className="text-red-500 text-sm mt-1">
              পেমেন্ট মাধ্যম নির্বাচন করুন।
            </p>
          )}
        </div>

        {/* তারিখ */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            📅 তারিখ
          </label>
          <input
            type="date"
            defaultValue={today}
            {...register("date", { required: true })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
          />
          {errors.date && (
            <p className="text-red-500 text-sm mt-1">তারিখ নির্বাচন করুন</p>
          )}
        </div>

        {/* নোট */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">📝 নোট</label>
          <textarea
            {...register("note")}
            placeholder="খরচ সম্পর্কে বিস্তারিত লিখুন"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
            rows={3}
          />
        </div>

        {/* ফাইল */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            📎 রসিদ/ছবি (ঐচ্ছিক)
          </label>
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

        {/* Preview Image */}

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
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-2 rounded-lg transition-all duration-300"
          >
            ✅ খরচ সংরক্ষণ করুন
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
