// import fetcher from "../api/fetcher";
// import { api } from "../constants/api";
// import { useQuery } from "@tanstack/react-query";

// export default function useGetItems(packId) {
//   const { data, isError, error, isLoading } = useQuery({
//     queryKey: ["items", packId],
//     queryFn: async () => await fetcher(`${api}/item/${packId}`),
//     enabled: Boolean(packId),
//   });

//   return { isLoading, isError, error, data };
// }
