import fetcher from "../api/fetcher";
import { api } from "../constants/api";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../constants/queryClient";

const addUser = async (newUser) => {
  return await fetcher(`${api}/user/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });
};

export default function useRegister() {
  const mutation = useMutation({
    mutationFn: async (newUser) => {
      return addUser(newUser);
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return { addUser: mutation };
}
