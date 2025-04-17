import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useEmail from "../features/auth/email";

const useSemester = () => {
  const email = useEmail();

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["semesterData", email],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5000/api/v1/semester/${email}`
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
    refetch,
  };
};

export default useSemester;
