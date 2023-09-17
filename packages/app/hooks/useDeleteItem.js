// import fetcher from "../api/fetcher";
// import { api } from "../constants/api";
// import { useMutation } from "@tanstack/react-query";
// import { queryClient } from "../constants/queryClient";

// const deleteItem = async (itemId) => {
//   return await fetcher(`${api}/item/`, {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ itemId }),
//   });
// };

// export default function useDeleteItem() {
//   const mutation = useMutation({
//     mutationFn: async (itemId) => {
//       return deleteItem(itemId);
//     },
//     onSuccess: () => {
//       // Invalidate and refetch
//       queryClient.invalidateQueries({ queryKey: ["items"] });
//     },
//   });

//   return { deleteItem: mutation };
// }
