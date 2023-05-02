import fetcher from "../api/fetcher";
import { api } from "../constants/api";
import { useQuery } from "@tanstack/react-query";

export default function useGetSinglePack(packId) {
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["packs"],
    queryFn: async () => await fetcher(`${api}/pack/p/${packId}`),
    enabled: Boolean(packId),
  });

  return { isLoading, isError, error, data };
}
