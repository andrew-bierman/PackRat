// import fetcher from "../api/fetcher";
// import { api } from "../constants/api";
// import { useMutation } from "@tanstack/react-query";
// import { queryClient } from "../constants/queryClient";

// const addPack = async (newPack) => {
//   return await fetcher(`${api}/pack/`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(newPack),
//   });
// };

// export default function useAddPack() {
//   const mutation = useMutation({
//     mutationFn: async (newPack) => {
//       return addPack(newPack);
//     },
//     onSuccess: () => {
//       // Invalidate and refetch
//       queryClient.invalidateQueries({ queryKey: ["packs"] });
//     },
//   });

//   return { addPack: mutation };
// }
