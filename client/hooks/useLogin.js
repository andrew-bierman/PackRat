import fetcher from "../api/fetcher";
import { api } from "../constants/api";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../constants/queryClient";
import { useAuth } from "../auth/provider";

const loginUser = async (user) => {
  return await fetcher(`${api}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
};

export default function useLogin() {
  const { signIn } = useAuth();

  const mutation = useMutation({
    mutationFn: async (user) => {
      return loginUser(user);
    },
    onSuccess: (data, variables, context) => {
      // Invalidate and refetch
      signIn(data.user);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return { loginUser: mutation };
}
