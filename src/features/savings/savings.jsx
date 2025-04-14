import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

const Savings = () => {
  const [loans, setLoans] = useState(() => {
    const saved = localStorage.getItem("loans");
    return saved ? JSON.parse(saved) : [];
  });
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("taken");
  const [dueDate, setDueDate] = useState("");
  const [loanDate, setLoanDate] = useState("");
  const [person, setPerson] = useState("");
  const [goal, setGoal] = useState(() => {
    const savedGoal = localStorage.getItem("goal");
    return savedGoal || "";
  });
  const [alertList, setAlertList] = useState([]);
  const [filterMonth, setFilterMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
      2,
      "0"
    )}`;
  });

  const getCurrentMonth = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
      2,
      "0"
    )}`;
  };

  useEffect(() => {
    const monthKey = getCurrentMonth();
    const existingMonthly =
      JSON.parse(localStorage.getItem("monthlyLoans")) || {};
    if (!existingMonthly[monthKey]) {
      existingMonthly[monthKey] = [];
      localStorage.setItem("monthlyLoans", JSON.stringify(existingMonthly));
    }
  }, []);

  useEffect(() => {
    const grouped = JSON.parse(localStorage.getItem("monthlyLoans")) || {};
    setLoans(grouped[filterMonth] || []);
  }, [filterMonth]);

  const saveToLocalStorage = (newLoans) => {
    const grouped = JSON.parse(localStorage.getItem("monthlyLoans")) || {};
    grouped[filterMonth] = newLoans;
    localStorage.setItem("monthlyLoans", JSON.stringify(grouped));
    if (filterMonth === getCurrentMonth()) {
      localStorage.setItem("loans", JSON.stringify(newLoans));
    }
  };

  const addLoan = () => {
    if (!amount || !dueDate || !person || !loanDate)
      return alert("দয়া করে সমস্ত তথ্য পূরণ করুন।");

    const newLoan = {
      id: Date.now(),
      amount: parseFloat(amount),
      type,
      dueDate,
      loanDate,
      person,
    };
    const updatedLoans = [...loans, newLoan];
    setLoans(updatedLoans);
    saveToLocalStorage(updatedLoans);
    toast.success(`${type} সফলভাবে সম্পন্ন হয়েছে`);

    setAmount("");
    setDueDate("");
    setLoanDate("");
    setPerson("");
  };

  const deleteLoan = (id) => {
    const updatedLoans = loans.filter((loan) => loan.id !== id);
    setLoans(updatedLoans);
    saveToLocalStorage(updatedLoans);
  };

  const totalSavings = loans.reduce((acc, loan) => {
    return loan.type === "given" || loan.type === "saving"
      ? acc + loan.amount
      : acc - loan.amount;
  }, 0);

  const progress = goal ? Math.min((totalSavings / goal) * 100, 100) : 0;

  useEffect(() => {
    const today = new Date();
    const upcoming = loans.filter((loan) => {
      const due = new Date(loan.dueDate);
      const diff = (due - today) / (1000 * 60 * 60 * 24);
      return diff >= 0 && diff <= 3;
    });
    setAlertList(upcoming);
  }, [loans]);

  useEffect(() => {
    localStorage.setItem("goal", goal);
  }, [goal]);

  return (
    <div className="max-w-7xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-2xl space-y-6 border border-gray-200">
      <h2 className="text-3xl font-bold text-center text-indigo-700">
        💵 ঋণ ও সঞ্চয় ট্র্যাকার
      </h2>

      {/* মাস নির্বাচন */}
      <div className="flex justify-center">
        <input
          type="month"
          value={filterMonth}
          onChange={(e) => setFilterMonth(e.target.value)}
          className="border px-4 py-2 rounded focus:outline-indigo-500"
        />
      </div>

      {/* ঋণ যুক্ত করার ফর্ম */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <input
            type="number"
            placeholder="পরিমাণ (৳)"
            className="w-full border px-4 py-2 rounded focus:outline-indigo-500"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border px-4 py-2 rounded focus:outline-indigo-500"
          >
            <option value="taken">ঋণ নেওয়া</option>
            <option value="given">ঋণ দেয়া</option>
            <option value="saving">সঞ্চয় </option>
          </select>
          <input
            type="text"
            placeholder="কার কাছে বা কাকে"
            className="border px-4 py-2 rounded focus:outline-indigo-500"
            value={person}
            onChange={(e) => setPerson(e.target.value)}
          />
          <input
            type="date"
            className="border px-4 py-2 rounded focus:outline-indigo-500"
            value={loanDate}
            onChange={(e) => setLoanDate(e.target.value)}
          />
          <input
            type="date"
            className="border px-4 py-2 rounded focus:outline-indigo-500"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <button
            onClick={addLoan}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
          >
            ➕ যুক্ত করুন
          </button>
        </div>

        {/* মাসিক সঞ্চয় লক্ষ্য */}
        <div className="flex items-center gap-4">
          <input
            type="number"
            placeholder="🎯 মাসিক সঞ্চয় লক্ষ্য (৳)"
            className="w-full border px-4 py-2 rounded focus:outline-indigo-500"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />
        </div>
      </div>

      {/* ব্যালেন্স ও প্রগ্রেস */}
      <div className="bg-gray-50 p-4 rounded shadow-inner">
        <p className="text-lg font-semibold">
          💰 বর্তমান ব্যালেন্স:{" "}
          <span className="text-green-600">{totalSavings.toFixed(2)} ৳</span>
        </p>
        <div className="mt-3 w-full bg-gray-300 rounded-full h-4">
          <div
            className="bg-green-500 h-4 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-right mt-1 text-gray-600">
          অগ্রগতি: {progress.toFixed(1)}%
        </p>
      </div>

      {/* ডিউ এলার্ট */}
      {alertList.length > 0 && (
        <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded">
          <h4 className="font-semibold mb-2">
            ⚠️ ৩ দিনের মধ্যে পরিশোধের সময়সীমা:
          </h4>
          <ul className="list-disc pl-6 space-y-1">
            {alertList.map((loan) => (
              <li key={loan.id}>
                {loan.type === "taken"
                  ? "ঋণ নেওয়া"
                  : loan.type === "given"
                  ? "ঋণ দেয়া"
                  : "সঞ্চয়"}{" "}
                — {loan.amount} ৳ (শেষ তারিখ: {loan.dueDate}, ব্যক্তি:{" "}
                {loan.person})
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* সকল রেকর্ড এবং ডিলিট অপশন */}
      {loans.length > 0 && (
        <div className="bg-blue-50 border border-blue-300 px-4 py-3 rounded space-y-2">
          <h4 className="font-semibold text-blue-800">📄 সকল রেকর্ড:</h4>
          <ul className="space-y-1">
            {loans.map((loan) => (
              <li
                key={loan.id}
                className="flex justify-between items-center border p-2 rounded"
              >
                <span>
                  {loan.type === "taken"
                    ? "ঋণ নেওয়া"
                    : loan.type === "given"
                    ? "ঋণ দেয়া"
                    : "সঞ্চয়"}{" "}
                  — {loan.amount} ৳ | {loan.person} | প্রদান: {loan.loanDate} |
                  পরিশোধ: {loan.dueDate}
                </span>
                <button
                  onClick={() => deleteLoan(loan.id)}
                  className="text-red-600 hover:underline"
                >
                  ❌ ডিলিট
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <Toaster />
    </div>
  );
};

export default Savings;
