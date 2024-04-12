import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser as deleteUserApi } from "../services/apiUsers";
import { toast } from "react-hot-toast";

type DeleteType = {
  token: string;
  id: string;
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  const { isPending, mutate: deleteUser } = useMutation({
    mutationFn: async ({ token, id }: DeleteType) => {
      const user = await deleteUserApi({ token, id });
      return user;
    },
    onSuccess: () => {
      toast.success("User deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["users-all"],
      });
    },
    onError: (err) => {
      console.log("Error", err);
      toast.error("Error deleting user");
    },
  });

  return { isPending, deleteUser };
};
