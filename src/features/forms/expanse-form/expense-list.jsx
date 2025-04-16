import React, { useState } from "react";
import enToBn from "../../en-to-bn/en-to-bn";
import useCostData from "../../../hooks/useCostData";

const ExpenseList = () => {
  const { data } = useCostData();
  const cost = data?.data || [];

  const [filterDate, setFilterDate] = useState("");

  const groupByMonth = (costs) => {
    return costs.reduce((acc, cost) => {
      const month = cost.date.slice(0, 7); // Extract the month (YYYY-MM)
      if (!acc[month]) {
        acc[month] = [];
      }
      acc[month].push(cost);
      return acc;
    }, {});
  };

  // Group costs by month
  const groupedCosts = groupByMonth(cost);

  // Get filtered and sorted costs by month
  const filteredAndSortedCosts = Object.entries(groupedCosts)
    .map(([month, costsForMonth]) => {
      const totalMonthCost = costsForMonth.reduce(
        (acc, cost) => acc + cost.cost,
        0
      );
      return {
        month,
        costs: costsForMonth,
        totalCost: totalMonthCost,
      };
    })
    .filter(({ month }) => {
      if (!filterDate) return true;
      return month === filterDate.slice(0, 7); // Filter by the selected month
    })
    .sort((a, b) => new Date(b.month) - new Date(a.month)); // Sort by month

  return (
    <div className="max-w-7xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        💳 খরচ তালিকা (ছবিসহ)
      </h2>

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">
          মোট খরচ: ৳{" "}
          {enToBn(
            filteredAndSortedCosts.reduce(
              (acc, item) => acc + item.totalCost,
              0
            )
          )}
        </h1>

        <div className="flex items-center">
          <label className="mr-2 font-semibold">🔍 মাস বাছাই করুন:</label>
          <input
            type="month"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="border rounded px-2 py-1"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-blue-100 text-gray-700 text-center">
              <th className="py-2 px-4 border">📅 মাস</th>
              <th className="py-2 px-4 border">🏷️ ক্যাটাগরি</th>
              <th className="py-2 px-4 border">💸 পরিমাণ</th>
              <th className="py-2 px-4 border">💳 পেমেন্ট মাধ্যম</th>
              <th className="py-2 px-4 border">📝 নোট</th>
              <th className="py-2 px-4 border">🖼️ ছবি</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedCosts.length > 0 ? (
              filteredAndSortedCosts.map(
                ({ month, costs, totalCost }, index) => (
                  <React.Fragment key={index}>
                    <tr>
                      <td
                        colSpan="6"
                        className="py-4 px-4 text-center text-xl font-semibold"
                      >
                        {month} - মোট খরচ: ৳ {enToBn(totalCost)}
                      </td>
                    </tr>
                    {costs.map((cost, i) => (
                      <tr
                        key={i}
                        className="text-center border-b hover:bg-gray-100"
                      >
                        <td className="py-2 px-4 border">
                          {cost.date.slice(0, 10)} {/* Format date */}
                        </td>
                        <td className="py-2 px-4 border">{cost.category}</td>
                        <td className="py-2 px-4 border">
                          ৳ {enToBn(cost.cost)} {/* Display cost */}
                        </td>
                        <td className="py-2 px-4 border">{cost.paymentMethod}</td>
                        <td className="py-2 px-4 border">
                          {cost.note || "—"}
                        </td>
                        <td className="py-2 px-4 border">
                          {cost.attachmentImage ? (
                            <img
                              src={cost.attachmentImage}
                              alt="Expense"
                              className="w-12 h-12 object-cover rounded"
                            />
                          ) : (
                            "—"
                          )}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                )
              )
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  কোন খরচ পাওয়া যায়নি।
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseList;
