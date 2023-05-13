// import fetcher from "../api/fetcher";
// import { api } from "../constants/api";
// import { useMutation } from "@tanstack/react-query";
// import { queryClient } from "../constants/queryClient";

// const changeStatus = async (updatePack) => {
//   return await fetcher(`${api}/pack/`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(updatePack),
//   });
// };

// export default function useChangePublicStatus() {
//   const mutation = useMutation({
//     mutationFn: async (updatePack) => {
//       return changeStatus(updatePack);
//     },
//     onSuccess: () => {
//       // Invalidate and refetch
//       queryClient.invalidateQueries({ queryKey: ["packs"] });
//     },
//   });

//   return { changeStatus: mutation };
// }
