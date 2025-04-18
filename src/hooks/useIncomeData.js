import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useEmail from "../features/auth/email";


const useIncomeData = () => {
  const email = useEmail();

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["incomeData", email],
    queryFn: async () => {
      const res = await axios.get(
        `https://smart-family-backend.vercel.app/api/v1/income/${email}`
      );
      return res.data;
    },
    enabled: !!email,
  });

  // ✅ Processed data using DSA concept=

  return {
    data,
    isLoading,
    isError,
    error,
    refetch
  };
};

export default useIncomeData;
