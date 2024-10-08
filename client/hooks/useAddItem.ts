// import fetcher from "../api/fetcher";
// import { api } from "../constants/api";
// import { useMutation } from "@tanstack/react-query";
// import { queryClient } from "../constants/queryClient";

// const addItem = async (newItem) => {
//   return await fetcher(`${api}/item/`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(newItem),
//   });
// };

// export default function useAddItem() {
//   const mutation = useMutation({
//     mutationFn: async (newItem) => {
//       return addItem(newItem);
//     },
//     onSuccess: () => {
//       // Invalidate and refetch
//       queryClient.invalidateQueries({ queryKey: ["items"] });
//     },
//   });

//   return { addItem: mutation };
// }
