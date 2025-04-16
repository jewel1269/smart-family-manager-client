import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const useEmail = () => {
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const savedEmail = Cookies.get("email");
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  return email;
};

export default useEmail;
