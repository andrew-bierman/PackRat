// import fetcher from "../api/fetcher";
// import { api } from "../constants/api";
// import { useQuery } from "@tanstack/react-query";
// import { useAuth } from "../auth/provider";

// export default function useGetPacks(owner_id) {
//   const { data, isError, error, isLoading } = useQuery({
//     queryKey: ["packs"],
//     queryFn: async () => await fetcher(`${api}/pack/${owner_id}`),
//     enabled: Boolean(owner_id),
//   });

//   return { isLoading, isError, error, data };
// }
