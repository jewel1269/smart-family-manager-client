import React, { useState } from "react";
import { useForm } from "react-hook-form";

const IncomeForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [successMsg, setSuccessMsg] = useState("");
  const [image, setImage] = useState(null);

  const onSubmit = (data) => {
    console.log("🟢 আয় তথ্য:", data);
    setSuccessMsg("✅ আয় সফলভাবে সংরক্ষণ করা হয়েছে!");
    reset();
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-2xl rounded-2xl">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        💰 আয় যোগ ফর্ম
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
            🏷️ ইনকাম ক্যাটাগরি
          </label>
          <select
            {...register("category", { required: true })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
          >
            <option value="">-- নির্বাচন করুন --</option>
            <option value="বেতন">বেতন</option>
            <option value="ফ্রিল্যান্সিং">ফ্রিল্যান্সিং</option>
            <option value="বিজনেস">বিজনেস</option>
            <option value="উপহার">উপহার</option>
            <option value="অন্যান্য">অন্যান্য</option>
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">
              ইনকাম ক্যাটাগরি নির্বাচন করা আবশ্যক।
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
            placeholder="৳ কত আয় হয়েছে"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
          />
          {errors.amount && (
            <p className="text-red-500 text-sm mt-1">সঠিক পরিমাণ লিখুন</p>
          )}
        </div>

        {/* পেমেন্ট পদ্ধতি */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            💳 ইনকাম মাধ্যম
          </label>
          <select
            {...register("paymentMethod", { required: true })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
          >
            <option value="">-- নির্বাচন করুন --</option>
            <option value="নগদ">নগদ</option>
            <option value="বিকাশ">বিকাশ</option>
            <option value="ব্যাংক">ব্যাংক</option>
            <option value="ক্যাশ">ক্যাশ</option>
            <option value="অন্যান্য">অন্যান্য</option>
          </select>
          {errors.paymentMethod && (
            <p className="text-red-500 text-sm mt-1">
              ইনকাম মাধ্যম নির্বাচন করুন।
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
            placeholder="আয়ের বিস্তারিত লিখুন (ঐচ্ছিক)"
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
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-2 rounded-lg transition-all duration-300"
          >
            ✅ আয় সংরক্ষণ করুন
          </button>
        </div>
      </form>
    </div>
  );
};

export default IncomeForm;
