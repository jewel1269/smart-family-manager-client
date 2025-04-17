import React, { useState } from "react";
import enToBn from "../../en-to-bn/en-to-bn";
import useIncomeData from "../../../hooks/useIncomeData";
import axios from "axios";
import { BaseUri } from "../../../constants/uri";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";

const IncomeList = () => {
  const { data , refetch} = useIncomeData();
  const incomes = data?.data || [];

  const [filterDate, setFilterDate] = useState("");

  // Function to group by month (Year-Month format: YYYY-MM)
  const groupByMonth = (incomes) => {
    return incomes.reduce((acc, income) => {
      const month = income.date.slice(0, 7); // Extract Year-Month (YYYY-MM)
      if (!acc[month]) {
        acc[month] = [];
      }
      acc[month].push(income);
      return acc;
    }, {});
  };

  // Group incomes by month
  const groupedIncomes = groupByMonth(incomes);

  // Get filtered and sorted incomes
  const filteredAndSortedIncomes = Object.entries(groupedIncomes)
    .map(([month, incomesForMonth]) => {
      const totalMonthIncome = incomesForMonth.reduce(
        (acc, income) => acc + income.income,
        0
      );
      return {
        month,
        incomes: incomesForMonth,
        totalIncome: totalMonthIncome,
      };
    })
    .filter(({ month }) => {
      if (!filterDate) return true;
      return month === filterDate.slice(0, 7); // Compare only Year-Month part
    })
    .sort((a, b) => new Date(b.month) - new Date(a.month)); // Sort by month

    const handleDelete = async (id) => {
      try {
        await axios.delete(`${BaseUri}/api/v1/income/delete/${id}`);
        toast.success("🗑️ সফলভাবে ডিলিট হয়েছে!");
        refetch();
      } catch (err) {
        toast.error("❌ ডিলিট করতে সমস্যা হয়েছে");
        console.error(err);
      }
    };
  

  return (
    <div className=" mx-auto mt-10 p-6 bg-white shadow-xl rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        💳 আয়ের তালিকা (ছবিসহ)
      </h2>

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">
          মোট আয়: ৳{" "}
          {enToBn(
            filteredAndSortedIncomes.reduce(
              (acc, item) => acc + item.totalIncome,
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
              <th className="py-2 px-4 border">❌ </th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedIncomes.length > 0 ? (
              filteredAndSortedIncomes.map(
                ({ month, incomes, totalIncome }, index) => (
                  <React.Fragment key={index}>
                    <tr>
                      <td
                        colSpan="6"
                        className="py-4 px-4 text-center text-xl font-semibold"
                      >
                        {month} - মোট আয়: ৳ {enToBn(totalIncome)}
                      </td>
                    </tr>
                    {incomes.map((income, i) => (
                      <tr
                        key={i}
                        className="text-center border-b hover:bg-gray-100"
                      >
                        <td className="py-2 px-4 border">
                          {income.date.slice(0, 10)}
                        </td>
                        <td className="py-2 px-4 border">{income.category}</td>
                        <td className="py-2 px-4 border">
                          ৳ {enToBn(income.income)}
                        </td>
                        <td className="py-2 px-4 border">
                          {income.paymentMethod}
                        </td>
                        <td className="py-2 px-4 border">
                          {income.note || "—"}
                        </td>
                        <td className="py-2 px-4 border">
                          {income.attachmentImage ? (
                            <img
                              src={income.attachmentImage}
                              alt="Income"
                              className="w-12 h-12 object-cover rounded"
                            />
                          ) : (
                            "—"
                          )}
                        </td>
                        <td className="flex  border-gray-300 justify-center  py-2">
                        <button
                          onClick={() => handleDelete(income._id)}
                          className=" text-red-500"
                        >
                          <FaTrash className="h-10"/>
                        </button>
                      </td>
                      </tr>
                    ))}
                  </React.Fragment>
                )
              )
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  কোন আয় পাওয়া যায়নি।
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IncomeList;
