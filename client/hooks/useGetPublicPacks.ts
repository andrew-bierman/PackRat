// import fetcher from "../api/fetcher";
// import { api } from "../constants/api";
// import { useQuery } from "@tanstack/react-query";

// export default function useGetPublicPacks(queryBy) {
//   const { data, isError, error, isLoading } = useQuery({
//     queryKey: ["packs", queryBy],
//     queryFn: async () =>
//       await fetcher(`${api}/pack/?queryBy=${queryBy || "Favorite"}`),
//   });

//   return { isLoading, isError, error, data };
// }
