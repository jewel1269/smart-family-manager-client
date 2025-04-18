import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { BaseUri } from "./../../constants/uri";
import useEmail from "../auth/email";
import useSaving from "../../hooks/useSaving";
import enToBn from "./../en-to-bn/en-to-bn";
import dayjs from "dayjs";

const Savings = () => {
  const email = useEmail();
  const { data: Jewel, refetch } = useSaving();
  const data = Jewel?.data || [];

  const [selectedTab, setSelectedTab] = useState("taken");

  const [form, setForm] = useState({
    email,
    amount: "",
    type: "taken",
    person: "",
    loanDate: "",
    dueDate: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (email) {
      setForm((prev) => ({ ...prev, email }));
    }
  }, [email]);

  useEffect(() => {
    setForm((prevForm) => ({
      ...prevForm,
      type: selectedTab,
    }));
  }, [selectedTab]);

  const handleSubmit = async () => {
    const { amount, type, person, loanDate, dueDate } = form;
    if (!amount || !type || !person || !loanDate || !dueDate) {
      toast.error("⚠️ সব ফিল্ড পূরণ করুন");
      return;
    }

    const payload = {
      ...form,
      id: Date.now(),
    };

    try {
      await axios.post(`${BaseUri}/api/v1/saving/add`, payload);
      toast.success("✅ সফলভাবে সংরক্ষণ হয়েছে!");
      refetch();
      setForm({
        email,
        amount: "",
        type: selectedTab,
        person: "",
        loanDate: "",
        dueDate: "",
      });
    } catch (err) {
      toast.error("❌ ডেটা পাঠাতে সমস্যা হয়েছে");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BaseUri}/api/v1/saving/delete/${id}`);
      toast.success("🗑️ সফলভাবে ডিলিট হয়েছে!");
      refetch();
    } catch (err) {
      toast.error("❌ ডিলিট করতে সমস্যা হয়েছে");
      console.error(err);
    }
  };

  const filteredData = data.filter((item) => item.type === selectedTab);
  const totalAmount = filteredData.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );

  const groupedData = filteredData.reduce((groups, item) => {
    const month = dayjs(item.loanDate).format("MMMM YYYY");
    if (!groups[month]) groups[month] = [];
    groups[month].push(item);
    return groups;
  }, {});

  return (
    <div className="px-2 sm:px-4 md:px-6 lg:px-8">
      <div className="mx-auto p-4 sm:p-6 mt-6 bg-white shadow-lg rounded-xl">
        <Toaster />
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 text-indigo-700">
          💰 ঋণ ও সঞ্চয় ব্যবস্থাপনা
        </h2>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center space-x-2 sm:space-x-4 mb-4 text-sm sm:text-base">
          {[
            { value: "taken", label: "ঋণ নেওয়া" },
            { value: "given", label: "ঋণ দেয়া" },
            { value: "saving", label: "সঞ্চয়" },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setSelectedTab(tab.value)}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded ${
                selectedTab === tab.value
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Total Amount */}
        <div className="text-center mb-4 text-green-600 text-base sm:text-lg font-semibold">
          মোট{" "}
          {selectedTab === "taken"
            ? "ঋণ নেওয়া"
            : selectedTab === "given"
            ? "ঋণ দেয়া"
            : "সঞ্চয়"}
          : {totalAmount.toFixed(2)} ৳
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-6 text-sm">
          <input
            type="number"
            name="amount"
            placeholder="পরিমাণ (৳)"
            value={form.amount}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
          />
          <input
            type="text"
            name="person"
            placeholder="কাকে / কার থেকে"
            value={form.person}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
          />
          <input
            type="date"
            name="loanDate"
            value={form.loanDate}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
          />
          <input
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
          />
          <button
            onClick={handleSubmit}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 w-full"
          >
            ➕ সংরক্ষণ করুন
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto text-xs sm:text-sm">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-indigo-100 text-center">
                <th className="border px-2 sm:px-4 py-2">আইডি</th>
                <th className="border px-2 sm:px-4 py-2">পরিমাণ (৳)</th>
                <th className="border px-2 sm:px-4 py-2">ব্যক্তি</th>
                <th className="border px-2 sm:px-4 py-2">তারিখ</th>
                <th className="border px-2 sm:px-4 py-2">ডিউ তারিখ</th>
                <th className="border px-2 sm:px-4 py-2">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(groupedData).length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    কোনো তথ্য পাওয়া যায়নি।
                  </td>
                </tr>
              ) : (
                Object.entries(groupedData).map(([month, items]) => (
                  <React.Fragment key={month}>
                    <tr>
                      <td
                        colSpan="6"
                        className="bg-gray-100 text-center font-semibold py-2"
                      >
                        📅 {month}
                      </td>
                    </tr>
                    {items.map((item) => (
                      <tr key={item.id} className="text-center">
                        <td className="border px-2 sm:px-4 py-1 sm:py-2">
                          {enToBn(item.id).slice(9)}
                        </td>
                        <td className="border px-2 sm:px-4 py-1 sm:py-2">
                          {enToBn(item.amount)} ৳
                        </td>
                        <td className="border px-2 sm:px-4 py-1 sm:py-2">
                          {item.person}
                        </td>
                        <td className="border px-2 sm:px-4 py-1 sm:py-2">
                          {item.loanDate}
                        </td>
                        <td className="border px-2 sm:px-4 py-1 sm:py-2">
                          {enToBn(item.dueDate)}
                        </td>
                        <td className="border px-2 sm:px-4 py-1 sm:py-2">
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-xs sm:text-sm"
                          >
                            ডিলিট
                          </button>
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Savings;
