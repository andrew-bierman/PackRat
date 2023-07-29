import fetcher from "../api/fetcher";
import { api } from "../constants/api";
import { useQuery } from "@tanstack/react-query";

export default function useGetUser(userId) {
  console.log({userId})
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["user", userId],
    queryFn: async () => await fetcher(`${api}/user/${userId}`),
    enabled: Boolean(userId),
  });

  return { isLoading, isError, error, data };
}