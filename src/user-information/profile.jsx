import React from "react";

const Profile = () => {
const user = {
    name: "জুয়েল মিয়া",
    email: "johir@example.com",
    phone: "+৮৮০১২৩৪৫৬৭৮৯০",
    role: "ফুল স্ট্যাক ডেভেলপার",
    location: "ঢাকা, বাংলাদেশ",
    photoURL: "https://i.pravatar.cc/150?img=2",
    about:
        "আমি একজন উদ্যমী ফুল-স্ট্যাক ডেভেলপার যিনি MERN স্ট্যাক ব্যবহার করে স্কেলেবল ওয়েব অ্যাপ্লিকেশন তৈরি করতে পছন্দ করি। নতুন প্রযুক্তি শেখার এবং অন্বেষণ করার জন্য সর্বদা আগ্রহী।",
};

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex justify-center items-start">
      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-40"></div>

        <div className="px-6 -mt-16 relative">
          <div className="flex items-center space-x-6">
            <img
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
              src={user.photoURL}
              alt="User avatar"
            />
            <div className="mt-10">
              <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
              <p className="text-sm text-gray-500">{user.role}</p>
              <p className="text-sm text-gray-400">{user.location}</p>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">About</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              {user.about}
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">📧 Email</h3>
              <p className="text-gray-700">{user.email}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">📞 Phone</h3>
              <p className="text-gray-700">{user.phone}</p>
            </div>
          </div>

          <div className="mt-8 mb-4 text-right">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all font-medium">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

