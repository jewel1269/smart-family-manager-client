import React from "react";

const Dashboard = () => {
  const [budget, setBudget] = React.useState("২০০০");
  const [categories, setCategories] = React.useState([
    { name: "খাবার", amount: "৫০০" },
    { name: "বিল", amount: "৩০০" },
    { name: "শপিং", amount: "৪০০" },
  ]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [newBudget, setNewBudget] = React.useState("");

  // বাংলা সংখ্যা → ইংরেজি সংখ্যা
  const bnToEnNumber = (str) =>
    str.replace(/[০-৯]/g, (d) => "০১২৩৪৫৬৭৮৯".indexOf(d));

  // ইংরেজি সংখ্যা → বাংলা সংখ্যা
  const enToBnNumber = (str) =>
    str.toString().replace(/[0-9]/g, (d) => "০১২৩৪৫৬৭৮৯"[d]);

  const totalSpent = categories.reduce((acc, category) => {
    return acc + parseInt(bnToEnNumber(category.amount), 10);
  }, 0);

  const totalBudget = parseInt(bnToEnNumber(budget), 10);
  const remainingBudget = totalBudget - totalSpent;
  const budgetPercentage =
    totalBudget > 0 ? ((totalSpent / totalBudget) * 100).toFixed(2) : 0;

  const handleBudgetSubmit = () => {
    if (newBudget) {
      const converted = bnToEnNumber(newBudget);
      setBudget(converted);
      setIsModalOpen(false);
      setNewBudget("");
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">📊 ড্যাশবোর্ড</h1>

      {/* আজকের সারাংশ */}
      <section className="bg-white rounded-2xl shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          🗓️ আজকের সারাংশ
        </h2>
        <p className="text-gray-600">
          আপনি আজ <strong>{enToBnNumber(categories.length)}</strong>টি
          ক্যাটাগরিতে মোট <strong>৳ {enToBnNumber(totalSpent)}</strong> টাকা খরচ
          করেছেন।
        </p>
        <details className="mt-4">
          <summary className="text-blue-600 font-medium cursor-pointer">
            🔍 বিস্তারিত দেখুন
          </summary>
          <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
            {categories.map((category, index) => (
              <li key={index}>
                {category.name}:{" "}
                <span className="font-medium">৳{category.amount}</span>
              </li>
            ))}
          </ul>
        </details>
      </section>

      {/* মাসিক বাজেট পর্যালোচনা */}
      <section className="bg-white rounded-2xl shadow-md p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            📅 মাসিক বাজেট পর্যালোচনা
          </h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-sm text-blue-600 hover:underline"
          >
            ➕ বাজেট যোগ করুন
          </button>
        </div>

        <div className="flex justify-between items-center text-gray-700">
          <span>ব্যবহৃত বাজেট:</span>
          <span className="font-semibold text-blue-600">
            ৳ {enToBnNumber(totalSpent)} / ৳ {enToBnNumber(budget)}
          </span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-3 mt-3 overflow-hidden">
          <div
            className="bg-blue-500 h-3 transition-all duration-500"
            style={{ width: `${budgetPercentage}%` }}
          ></div>
        </div>
       <div className="flex justify-between items-center mt-2 text-gray-700">
       <h1 className="text-sm text-red-500">অবশিষ্ট বাজেটঃ ৳ {enToBnNumber(remainingBudget)}</h1>
       <p className="text-right text-sm mt-1 text-gray-500">
          {enToBnNumber(budgetPercentage)}% খরচ হয়েছে
        </p>
       </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0  bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-amber-50 p-6 rounded-xl shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              নতুন বাজেট দিন
            </h3>
            <input
              type="text"
              placeholder="যেমন: ৩০০০"
              value={newBudget}
              onChange={(e) => setNewBudget(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring focus:ring-blue-300"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                বাতিল
              </button>
              <button
                onClick={handleBudgetSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                সংরক্ষণ করুন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* শর্টকাট */}
      <section className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          ⚡ দ্রুত এক্সেস শর্টকাট
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl shadow">
            ➕ খরচ যোগ করুন
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl shadow">
            ➕ আয় যোগ করুন
          </button>
          <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-xl shadow">
            📈 রিপোর্ট দেখুন
          </button>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-xl shadow">
            ⚙️ সেটিংস
          </button>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
