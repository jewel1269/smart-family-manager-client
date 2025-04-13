import React, { useState } from "react";
import enToBn from "../../en-to-bn/en-to-bn";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([
    {
      category: "খাবার",
      amount: 150,
      paymentMethod: "নগদ",
      date: "2025-04-10",
      note: "দুপুরের খাবার",
      image: "https://via.placeholder.com/100",
    },
    {
      category: "পরিবহন",
      amount: 60,
      paymentMethod: "বিকাশ",
      date: "2025-04-13",
      note: "অফিস যাওয়ার গাড়ি",
      image: "https://via.placeholder.com/100",
    },
    {
      category: "চিকিৎসা",
      amount: 300,
      paymentMethod: "নগদ অ্যাপ",
      date: "2025-04-11",
      note: "ডাক্তারের ফি",
      image: "https://via.placeholder.com/100",
    },
  ]);

  const [filterDate, setFilterDate] = useState("");

  const filteredAndSortedExpenses = [...expenses]
    .filter((expense) => {
      if (!filterDate) return true;
      return expense.date === filterDate;
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="max-w-7xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        💳 খরচের তালিকা (ছবিসহ)
      </h2>

      <div className="flex justify-end items-center mb-4">
        <label className="mr-2 font-semibold">🔍 তারিখ বাছাই করুন:</label>
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="border rounded px-2 py-1"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-blue-100 text-gray-700 text-center">
              <th className="py-2 px-4 border">📅 তারিখ</th>
              <th className="py-2 px-4 border">🏷️ ক্যাটাগরি</th>
              <th className="py-2 px-4 border">💸 পরিমাণ</th>
              <th className="py-2 px-4 border">💳 পেমেন্ট মাধ্যম</th>
              <th className="py-2 px-4 border">📝 নোট</th>
              <th className="py-2 px-4 border">🖼️ ছবি</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedExpenses.length > 0 ? (
              filteredAndSortedExpenses.map((expense, index) => (
                <tr
                  key={index}
                  className="text-center border-b hover:bg-gray-100"
                >
                  <td className="py-2 px-4 border">{expense.date}</td>
                  <td className="py-2 px-4 border">{expense.category}</td>
                  <td className="py-2 px-4 border">
                    ৳ {enToBn(expense.amount)}
                  </td>
                  <td className="py-2 px-4 border">{expense.paymentMethod}</td>
                  <td className="py-2 px-4 border">{expense.note || "—"}</td>
                  <td className="py-2 px-4 border">
                    {expense.image ? (
                      <img
                        src={expense.image}
                        alt="Expense"
                        className="w-12 h-12 object-cover rounded"
                      />
                    ) : (
                      "—"
                    )}
                  </td>
                </tr>
              ))
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
