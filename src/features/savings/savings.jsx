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

  // handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // set email on load
  useEffect(() => {
    if (email) {
      setForm((prev) => ({ ...prev, email }));
    }
  }, [email]);

  // set form.type dynamically when tab changes
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
    <div className="lg:px-8">
      <div className=" mx-auto p-6 mt-8 bg-white shadow-lg rounded-xl">
      <Toaster />
      <h2 className="text-3xl font-bold text-center mb-6 text-indigo-700">
        💰 ঋণ ও সঞ্চয় ব্যবস্থাপনা
      </h2>

      {/* Tab Selector */}
      <div className="flex justify-center space-x-4 mb-6">
        {[
          { value: "taken", label: "ঋণ নেওয়া" },
          { value: "given", label: "ঋণ দেয়া" },
          { value: "saving", label: "সঞ্চয়" },
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setSelectedTab(tab.value)}
            className={`px-4 py-2 rounded ${
              selectedTab === tab.value
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Total Display */}
      <div className="text-center mb-4 text-xl font-semibold text-green-600">
        মোট{" "}
        {selectedTab === "taken"
          ? "ঋণ নেওয়া"
          : selectedTab === "given"
          ? "ঋণ দেয়া"
          : "সঞ্চয়"}
        : {totalAmount.toFixed(2)} ৳
      </div>

      {/* Form */}
      <div className="grid md:grid-cols-5 gap-4 mb-6">
        <input
          type="number"
          name="amount"
          placeholder="পরিমাণ (৳)"
          value={form.amount}
          onChange={handleChange}
          className="border px-4 py-2 rounded"
        />
        <input
          type="text"
          name="person"
          placeholder="কাকে / কার থেকে"
          value={form.person}
          onChange={handleChange}
          className="border px-4 py-2 rounded"
        />
        <input
          type="date"
          name="loanDate"
          value={form.loanDate}
          onChange={handleChange}
          className="border px-4 py-2 rounded"
        />
        <input
          type="date"
          name="dueDate"
          value={form.dueDate}
          onChange={handleChange}
          className="border px-4 py-2 rounded"
        />
        <button
          onClick={handleSubmit}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          ➕ সংরক্ষণ করুন
        </button>
      </div>

      {/* Table View */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-indigo-100">
              <th className="border px-4 py-2">আইডি</th>
              <th className="border px-4 py-2">পরিমাণ (৳)</th>
              <th className="border px-4 py-2">ব্যক্তি</th>
              <th className="border px-4 py-2">তারিখ</th>
              <th className="border px-4 py-2">ডিউ তারিখ</th>
              <th className="border px-4 py-2">অ্যাকশন</th>
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
                      <td className="border px-4 py-2">
                        {enToBn(item.id).slice(9)}
                      </td>
                      <td className="border px-4 py-2">
                        {enToBn(item.amount)} ৳
                      </td>
                      <td className="border px-4 py-2">{item.person}</td>
                      <td className="border px-4 py-2">{item.loanDate}</td>
                      <td className="border px-4 py-2">
                        {enToBn(item.dueDate)}
                      </td>
                      <td className="border px-4 py-2">
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
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
