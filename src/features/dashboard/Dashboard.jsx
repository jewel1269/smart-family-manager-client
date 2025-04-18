import { Notifications } from "@mui/icons-material";
import React from "react";
import { NavLink } from "react-router-dom";
import useGroceryData from "../../hooks/useGroceryData";
import enToBn from "../en-to-bn/en-to-bn";
import useCostData from "../../hooks/useCostData";
import useIncomeData from "../../hooks/useIncomeData";
import useSaving from "../../hooks/useSaving";

const Dashboard = () => {
  const { data } = useGroceryData();
  const items = data?.data || [];
  const { data: cost } = useCostData();
  const expense = cost?.data || [];
  const { data: income } = useIncomeData();
  const incomes = income?.data || [];
  const { data: Jewel } = useSaving();
  const saving = Jewel?.data || [];

  const today = new Date();
  const todayDateString = today.toLocaleDateString("en-CA");

  const todaysItems = items.filter((item) => {
    const itemDate = new Date(item.date).toLocaleDateString("en-CA");
    return itemDate === todayDateString;
  });

  const totalSpent = todaysItems.reduce(
    (acc, item) => acc + Number(item.price || 0),
    0
  );
  const categories = todaysItems.reduce((acc, item) => {
    const category = item.category || "অন্যান্য";
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += Number(item.price || 0);
    return acc;
  }, {});

  const categoryList = Object.entries(categories).map(([name, amount]) => ({
    name,
    amount: enToBn(amount),
  }));

  const totalIncome = incomes.reduce((acc, item) => acc + item?.income, 0);

  const totalExpense = expense.reduce((acc, item) => acc + item?.cost, 0);

  const totalLoanTaken = saving
    .filter((item) => item.type === "taken")
    .reduce((acc, item) => acc + Number(item.amount), 0);

  const totalLoanGiven = saving
    .filter((item) => item.type === "given")
    .reduce((acc, item) => acc + Number(item.amount), 0);

  const totalSavings = saving
    .filter((item) => item.type === "saving")
    .reduce((acc, item) => acc + Number(item.amount), 0);

  return (
    <div className="lg:p-4 p-2 sm:p-6 lg:mt-0 md:mt-5 mt-10 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
      {/* হেডার */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          📊 ড্যাশবোর্ড
        </h1>
        <div className="flex items-center gap-1">
          <Notifications style={{ fontSize: 30, color: "red" }} />
          <h2 className="text-lg font-semibold text-gray-800">
            নোটিফিকেশন (0)
          </h2>
        </div>
      </div>

      {/* আজকের সারাংশ */}
      <section className="bg-white rounded-2xl shadow-md p-4 sm:p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          🗓️ আজকের সারাংশ
        </h2>
        {todaysItems.length > 0 ? (
          <>
            <p className="text-gray-600">
              আপনি আজ <strong>{enToBn(categoryList.length)}</strong>টি
              ক্যাটাগরিতে মোট <strong>৳ {enToBn(totalSpent)}</strong> টাকা খরচ
              করেছেন।
            </p>
            <details className="mt-4">
              <summary className="text-blue-600 font-medium cursor-pointer">
                🔍 বিস্তারিত দেখুন
              </summary>
              <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
                {todaysItems.map((item, index) => (
                  <li key={index}>
                    {item.title} —{" "}
                    <span className="font-medium">৳{enToBn(item.price)}</span>
                  </li>
                ))}
              </ul>
            </details>
          </>
        ) : (
          <p className="text-gray-600">আজকের জন্য কোনো খরচ পাওয়া যায়নি।</p>
        )}
      </section>

      {/* টাকার হিসাবের কার্ড */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card title="💰 মোট আয়" amount={enToBn(totalIncome)} color="green" />
        <Card title="💸 মোট খরচ" amount={enToBn(totalExpense)} color="red" />
        <Card
          title="🛒 মোট বাজার খরচ"
          amount={enToBn(totalSpent)}
          color="blue"
        />
        <Card
          title="📥 ঋণ নেওয়া"
          amount={enToBn(totalLoanTaken)}
          color="orange"
        />
        <Card
          title="📤 ঋণ দেয়া"
          amount={enToBn(totalLoanGiven)}
          color="yellow"
        />
        <Card title="💼 সঞ্চয়" amount={enToBn(totalSavings)} color="purple" />
      </div>

      {/* শর্টকাট */}
      <section className="rounded-2xl mt-5 p-4 sm:p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          ⚡ দ্রুত এক্সেস শর্টকাট
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <NavLink
            to="/expenseForm"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl shadow flex items-center justify-center text-center"
          >
            ➕ খরচ যোগ করুন
          </NavLink>

          <NavLink
            to="/incomeForm"
            className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl shadow flex items-center justify-center text-center"
          >
            ➕ আয় যোগ করুন
          </NavLink>

          <NavLink
            to="/report"
            className="bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-xl shadow flex items-center justify-center text-center"
          >
            📈 রিপোর্ট দেখুন
          </NavLink>

          <NavLink
            to="/settings"
            className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-xl shadow flex items-center justify-center text-center"
          >
            ⚙️ সেটিংস
          </NavLink>
        </div>
      </section>
    </div>
  );
};

// কার্ড কম্পোনেন্ট
const Card = ({ title, amount, color }) => {
  const bgColor = {
    green: "bg-green-100 text-green-800",
    red: "bg-red-100 text-red-800",
    blue: "bg-blue-100 text-blue-800",
    orange: "bg-orange-100 text-orange-800",
    yellow: "bg-yellow-100 text-yellow-800",
    purple: "bg-purple-100 text-purple-800",
  };

  return (
    <div
      className={`rounded-2xl shadow p-4 sm:p-6 ${bgColor[color]} transition-all`}
    >
      <h3 className="text-lg sm:text-xl font-semibold mb-2">{title}</h3>
      <p className="text-2xl sm:text-3xl font-bold">৳ {amount}</p>
    </div>
  );
};

export default Dashboard;
