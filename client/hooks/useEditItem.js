// import fetcher from "../api/fetcher";
// import { api } from "../constants/api";
// import { useMutation } from "@tanstack/react-query";
// import { queryClient } from "../constants/queryClient";

// const editItem = async (newItem) => {
//   return await fetcher(`${api}/item/`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(newItem),
//   });
// };

// export default function useEditItem() {
//   const mutation = useMutation({
//     mutationFn: async (newItem) => {
//       return editItem(newItem);
//     },
//     onSuccess: () => {
//       // Invalidate and refetch
//       queryClient.invalidateQueries({ queryKey: ["items"] });
//     },
//   });

//   return { editItem: mutation };
// }
