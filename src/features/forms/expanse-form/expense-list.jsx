import React, { useState } from "react";
import enToBn from "../../en-to-bn/en-to-bn";
import useCostData from "../../../hooks/useCostData";
import axios from "axios";
import { BaseUri } from "../../../constants/uri";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";

const ExpenseList = () => {
  const { data, refetch } = useCostData();
  const cost = data?.data || [];
  const [filterDate, setFilterDate] = useState("");

  const groupByMonth = (costs) => {
    return costs.reduce((acc, cost) => {
      const month = cost.date.slice(0, 7);
      if (!acc[month]) {
        acc[month] = [];
      }
      acc[month].push(cost);
      return acc;
    }, {});
  };

  const groupedCosts = groupByMonth(cost);

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
      return month === filterDate.slice(0, 7);
    })
    .sort((a, b) => new Date(b.month) - new Date(a.month));

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BaseUri}/api/v1/cost/delete/${id}`);
      toast.success("🗑️ সফলভাবে ডিলিট হয়েছে!");
      refetch();
    } catch (err) {
      toast.error("❌ ডিলিট করতে সমস্যা হয়েছে");
      console.error(err);
    }
  };

  return (
    <div className="mx-auto mt-10 p-4 md:p-6 bg-white shadow-xl rounded-xl max-w-full overflow-hidden lg:px-10">
      <h2 className="text-xl md:text-2xl font-bold mb-6 text-center text-gray-800">
        💳 খরচ তালিকা (ছবিসহ)
      </h2>

      <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 gap-4">
        <h1 className="text-lg md:text-xl font-bold">
          মোট খরচ: ৳{" "}
          {enToBn(
            filteredAndSortedCosts.reduce(
              (acc, item) => acc + item.totalCost,
              0
            )
          )}
        </h1>

        <div className="flex items-center flex-wrap">
          <label className="mr-2 font-semibold whitespace-nowrap">
            🔍 মাস বাছাই করুন:
          </label>
          <input
            type="month"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="border rounded px-2 py-1 w-full sm:w-auto"
          />
        </div>
      </div>

      {/* Desktop/Table View */}
      <div className="hidden md:block overflow-x-auto w-full">
        <table className="w-full min-w-[600px] bg-white border border-gray-300 text-sm md:text-base">
          <thead>
            <tr className="bg-blue-100 text-gray-700 text-center">
              <th className="py-2 px-4 border whitespace-nowrap">📅 মাস</th>
              <th className="py-2 px-4 border whitespace-nowrap">
                🏷️ ক্যাটাগরি
              </th>
              <th className="py-2 px-4 border whitespace-nowrap">💸 পরিমাণ</th>
              <th className="py-2 px-4 border whitespace-nowrap">
                💳 পেমেন্ট মাধ্যম
              </th>
              <th className="py-2 px-4 border whitespace-nowrap">📝 নোট</th>
              <th className="py-2 px-4 border whitespace-nowrap">🖼️ ছবি</th>
              <th className="py-2 px-4 border whitespace-nowrap">❌</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedCosts.length > 0 ? (
              filteredAndSortedCosts.map(
                ({ month, costs, totalCost }, index) => (
                  <React.Fragment key={index}>
                    <tr>
                      <td
                        colSpan="7"
                        className="py-4 px-4 text-center text-base md:text-xl font-semibold bg-gray-50"
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
                          {cost.date.slice(0, 10)}
                        </td>
                        <td className="py-2 px-4 border">{cost.category}</td>
                        <td className="py-2 px-4 border">
                          ৳ {enToBn(cost.cost)}
                        </td>
                        <td className="py-2 px-4 border">
                          {cost.paymentMethod}
                        </td>
                        <td className="py-2 px-4 border">{cost.note || "—"}</td>
                        <td className="py-2 px-4 border">
                          {cost.attachmentImage ? (
                            <img
                              src={cost.attachmentImage}
                              alt="Expense"
                              className="w-12 h-12 object-cover rounded mx-auto"
                            />
                          ) : (
                            "—"
                          )}
                        </td>
                        <td className="py-2 px-4 border">
                          <button
                            onClick={() => handleDelete(cost._id)}
                            className="text-red-500"
                          >
                            <FaTrash className="h-5 w-5 md:h-6 md:w-6 mx-auto" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                )
              )
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  কোন খরচ পাওয়া যায়নি।
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile/Card View */}
      <div className="md:hidden flex flex-col gap-4">
        {filteredAndSortedCosts.length > 0 ? (
          filteredAndSortedCosts.map(({ month, costs, totalCost }, index) => (
            <div key={index}>
              <div className="bg-red-50 text-red-700 font-semibold text-center py-2 rounded">
                {month} - মোট খরচ: ৳ {enToBn(totalCost)}
              </div>
              {costs.map((cost, i) => (
                <div
                  key={i}
                  className="border rounded-lg p-4 shadow-sm bg-white flex flex-col gap-1"
                >
                  <div>
                    <strong>📅 তারিখ:</strong> {cost.date.slice(0, 10)}
                  </div>
                  <div>
                    <strong>🏷️ ক্যাটাগরি:</strong> {cost.category}
                  </div>
                  <div>
                    <strong>💸 পরিমাণ:</strong> ৳ {enToBn(cost.cost)}
                  </div>
                  <div>
                    <strong>💳 মাধ্যম:</strong> {cost.paymentMethod}
                  </div>
                  <div>
                    <strong>📝 নোট:</strong> {cost.note || "—"}
                  </div>
                  <div>
                    <strong>🖼️ ছবি:</strong>{" "}
                    {cost.attachmentImage ? (
                      <img
                        src={cost.attachmentImage}
                        alt="Expense"
                        className="w-20 h-20 object-cover rounded mt-1"
                      />
                    ) : (
                      "—"
                    )}
                  </div>
                  <div className="mt-2">
                    <button
                      onClick={() => handleDelete(cost._id)}
                      className="text-red-500 flex items-center gap-1"
                    >
                      <FaTrash /> <span>ডিলিট</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-gray-500">
            কোন খরচ পাওয়া যায়নি।
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseList;
