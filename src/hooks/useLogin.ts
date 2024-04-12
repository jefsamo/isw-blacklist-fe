import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../services/apiAuth";
import { toast } from "react-hot-toast";

type LoginType = {
  email: string;
  password: string;
};

export const useLogin = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate: login, isPending } = useMutation({
    mutationFn: async ({ email, password }: LoginType) => {
      const user = await loginApi({ email, password });
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    },
    onSuccess: (user: unknown) => {
      queryClient.setQueryData(["user"], user);
      toast.success("Login successful");
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      console.log("Error", err);
      toast.error("Incorrect email or password");
    },
  });

  return { login, isPending };
};
