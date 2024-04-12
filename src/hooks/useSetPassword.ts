import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { setPassword as setPasswordApi } from "../services/apiAuth";
import { toast } from "react-hot-toast";

type SetPasswordType = {
  email: string;
  newPassword: string;
  confirmPassword: string;
};

export const useSetPassword = () => {
  const navigate = useNavigate();

  // const queryClient = useQueryClient();

  const { mutate: passwordSet, isPending: isSetPassword } = useMutation({
    mutationFn: async ({
      email,
      newPassword,
      confirmPassword,
    }: SetPasswordType) => {
      const user = await setPasswordApi({
        email,
        newPassword,
        confirmPassword,
      });
      // localStorage.setItem("user", JSON.stringify(user));
      return user;
    },
    onSuccess: () => {
      // queryClient.setQueryData(["user"], user);
      toast.success("Password set successfully");
      navigate("/login");
    },
    onError: (err) => {
      console.log("Error", err);
      toast.error("Incorrect email or password");
    },
  });

  return { passwordSet, isSetPassword };
};
