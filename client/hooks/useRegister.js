// import fetcher from "../api/fetcher";
// import { api } from "../constants/api";
// import { useMutation } from "@tanstack/react-query";
// import { queryClient } from "../constants/queryClient";

// const addUser = async (newUser) => {
//   const response = await fetch(`${api}/user/`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(newUser),
//   });
//   const data = await response.json();
//   if (!response.ok) {
//     throw new Error(data.error.message);
//   }
//   return data;
// };

// export default function useRegister() {
//   const mutation = useMutation({
//     mutationFn: async (newUser) => {
//       return addUser(newUser);
//     },
//     onSuccess: (data, variables, context) => {
//       // Invalidate and refetch
//       queryClient.invalidateQueries({ queryKey: ["user"] });
//     },
//   });

//   return { addUser: mutation };
// }
