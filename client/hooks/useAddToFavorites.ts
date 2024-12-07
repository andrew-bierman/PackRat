// import fetcher from "../api/fetcher";
// import { api } from "../constants/api";
// import { useMutation } from "@tanstack/react-query";
// import { queryClient } from "../constants/queryClient";
// // import { useAuth } from "../auth/provider";

// const addFavorite = async (data) => {
//   return await fetcher(`${api}/user/favorite`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });
// };

// export default function useAddToFavorite() {
//   const { signIn } = useAuth();

//   const mutation = useMutation({
//     mutationFn: async (data) => {
//       return addFavorite(data);
//     },
//     onSuccess: (data) => {
//       // Invalidate and refetch
//       signIn(data);
//       queryClient.invalidateQueries({ queryKey: ["packs"] });
//     },
//   });

//   return { addToFavorite: mutation };
// }
