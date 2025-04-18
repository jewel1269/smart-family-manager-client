import axios from "axios";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";

const BaseUri = "http://localhost:5000";

export const LoginUser = async (userData, navigate) => {
  if (userData) {
    try {
      const response = await axios.post(
        `${BaseUri}/api/v1/user/login`,
        userData
      );

      if (response.status === 200) {
        toast.success("OTP ভেরিফিকেশন করুন!");

        Cookies.set("email", userData.email, {
          expires: 5,
          secure: true,
          sameSite: "Strict",
        });

        setTimeout(() => {
          navigate("/otpVerify");
        }, 2000);
      } else {
        console.log("");
      }
    } catch (error) {
      console.error(error);
      toast.error(` ${error}, আবার চেষ্টা করুন`);
    }
  }
};

export const RegisterUser = async (userData, navigate) => {
  if (userData) {
    try {
      const response = await axios.post(
        `${BaseUri}/api/v1/user/register`,
        userData
      );

      if (response.status === 200) {
        toast.success("রেজিস্ট্রেশন সফল!");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        toast.error(
          `Error: ${response.data.message || "Something went wrong"}`
        );
      }
    } catch (error) {
      console.error(error);
      toast.error("নেটওয়ার্ক সমস্যা, আবার চেষ্টা করুন");
    }
  }
};

export const handleLogout = (navigate) => {
  Cookies.remove("email");

  toast.success("আপনি সফলভাবে সিস্টেম থেকে বের হয়েছেন!");
  navigate("/login");
};
