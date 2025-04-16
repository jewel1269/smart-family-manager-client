import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useEmail from "../features/auth/email";


const useCostData = () => {
  const email = useEmail();

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["costData", email],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5000/api/v1/cost/${email}`
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

export default useCostData;
