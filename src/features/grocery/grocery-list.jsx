import React, { useState } from "react";

const GroceryList = () => {
  const [items, setItems] = useState([
    {
      title: "চাল",
      category: "গ্রোসারি",
      price: 100,
      buyer: "আমি",
      date: new Date().toISOString(),
      note: "5 কেজি",
    },
    {
      title: "আলু",
      category: "সবজি",
      price: 50,
      buyer: "আম্মু",
      date: new Date().toISOString(),
      note: "3 কেজি",
    },
  ]);

  const [filterDate, setFilterDate] = useState("");

  const filteredItems = filterDate
    ? items.filter(
        (item) =>
          item.date.split("T")[0] ===
          new Date(filterDate).toISOString().split("T")[0]
      )
    : items;

  const sortedItems = [...filteredItems].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div className="max-w-7xl mx-auto mt-10 p-6 bg-white shadow-2xl rounded-2xl">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        📋 বাজার তালিকা
      </h2>

      {/* Filter By Date */}
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">
          📅 তারিখ অনুসারে ফিল্টার করুন:
        </label>
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
        />
      </div>

      {/* তালিকা টেবিল */}
      <div className="overflow-x-auto">
        <table className="w-full border text-sm text-left text-gray-600">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">প্রোডাক্ট</th>
              <th className="px-4 py-2">ক্যাটাগরি</th>
              <th className="px-4 py-2">মূল্য (৳)</th>
              <th className="px-4 py-2">কে কিনেছে</th>
              <th className="px-4 py-2">তারিখ</th>
              <th className="px-4 py-2">নোট</th>
            </tr>
          </thead>
          <tbody>
            {sortedItems.map((item, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{item.title}</td>
                <td className="px-4 py-2">{item.category}</td>
                <td className="px-4 py-2">{item.price}</td>
                <td className="px-4 py-2">{item.buyer}</td>
                <td className="px-4 py-2">{item.date.split("T")[0]}</td>
                <td className="px-4 py-2">{item.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GroceryList;
