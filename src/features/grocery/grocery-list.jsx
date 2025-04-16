import React, { useState, useMemo } from "react";
import useGroceryData from "../../hooks/useGroceryData";
import enToBn from './../en-to-bn/en-to-bn';

const GroceryList = () => {
  const [filterMonth, setFilterMonth] = useState("");
  const { data } = useGroceryData();
  const items = data?.data || [];

  const monthFormatted = (dateStr) =>
    new Date(dateStr).toLocaleDateString("bn-BD", {
      year: "numeric",
      month: "long",
    });

  const filteredItems = useMemo(() => {
    if (!filterMonth) return items;
    return items.filter((item) => item.date.slice(0, 7) === filterMonth);
  }, [items, filterMonth]);

  const sortedItems = [...filteredItems].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const totalBazar = sortedItems.reduce((sum, item) => sum + item.price, 0);

  // ✅ সকল মাসের মোট খরচ বের করার জন্য গ্রুপ করা
  const monthlyTotals = useMemo(() => {
    const totals = {};
    items.forEach((item) => {
      const month = item.date.slice(0, 7); 
      if (!totals[month]) totals[month] = 0;
      totals[month] += item.price;
    });
    return totals;
  }, [items]);

  return (
    <div className="max-w-7xl mx-auto mt-12 px-4 sm:px-6 ">
      <div className="bg-white shadow-xl rounded-3xl p-8">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-10">
          📊 মাসভিত্তিক বাজার বিশ্লেষণ
        </h2>

        {/* Filter Section */}
        <div className="mb-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              📅 মাস ফিল্টার করুন:
            </label>
            <input
              type="month"
              value={filterMonth}
              onChange={(e) => setFilterMonth(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>

          <div className="bg-green-100 p-1 text-green-800 font-bold text-lg shadow-md">
            💰 মোট বাজার খরচ: {enToBn(totalBazar)}৳
          </div>
        </div>

        {/* মাসভিত্তিক মোট খরচ দেখানো */}
        <div className="mb-10">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            📅 মাসভিত্তিক খরচের সারাংশ:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(monthlyTotals).map(([month, total]) => (
              <div
                key={month}
                className="bg-blue-50 border border-blue-200 rounded-lg p-4 shadow-sm flex justify-between"
              >
                <span>{monthFormatted(`${month}-01`)}</span>
                <span className="font-bold text-blue-800">{enToBn(total)}৳</span>
              </div>
            ))}
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto rounded-xl shadow-lg border">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-5 py-4">🛍️ প্রোডাক্ট</th>
                <th className="px-5 py-4">🏷️ ক্যাটাগরি</th>
                <th className="px-5 py-4">💰 মূল্য (৳)</th>
                <th className="px-5 py-4">👤 কে কিনেছে</th>
                <th className="px-5 py-4">📆 তারিখ</th>
                <th className="px-5 py-4">📝 নোট</th>
              </tr>
            </thead>
            <tbody>
              {sortedItems.length > 0 ? (
                sortedItems.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-blue-50 transition duration-150"
                  >
                    <td className="px-5 py-3">{item.title}</td>
                    <td className="px-5 py-3">{item.category}</td>
                    <td className="px-5 py-3">{enToBn(item.price)}৳</td>
                    <td className="px-5 py-3">{item.buyer}</td>
                    <td className="px-5 py-3">
                      {new Date(item.date).toLocaleDateString("bn-BD")}
                    </td>
                    <td className="px-5 py-3">{item.note}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center text-gray-500 italic py-6"
                  >
                    😴 এই মাসে কোনো বাজার তথ্য পাওয়া যায়নি।
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GroceryList;
