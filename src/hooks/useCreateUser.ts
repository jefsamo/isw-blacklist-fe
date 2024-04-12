import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser as createUserApi } from "../services/apiUsers";
import { toast } from "react-hot-toast";

type CreateType = {
  email: string;
  role: string;
  token: string;
  userAdminId: string;
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  const { isPending, mutate: createUser } = useMutation({
    mutationFn: async ({ token, email, role, userAdminId }: CreateType) => {
      const user = await createUserApi({ token, email, role, userAdminId });
      return user;
    },
    onSuccess: () => {
      toast.success("User created sucessfully");
      queryClient.invalidateQueries({
        queryKey: ["users-all"],
      });
    },
    onError: (err) => {
      console.log("Error", err);
      toast.error("Error creating user");
    },
  });

  return { isPending, createUser };
};
