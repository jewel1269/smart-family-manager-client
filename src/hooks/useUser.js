import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useEmail from "../features/auth/email";


const useUser = () => {
  const email = useEmail();

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["userData", email],
    queryFn: async () => {
      const res = await axios.get(
        `https://smart-family-backend.vercel.app/api/v1/user/${email}`
      );
      return res.data;
    },
    enabled: !!email,
  });


  return {
    data,
    isLoading,
    isError,
    error,
    refetch
  };
};

export default useUser;
