import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { updateUser as updateUserApi } from "../services/apiUsers";

type UserType = {
  firstName: string;
  lastName: string;
  imageUrl: string;
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { userId } = useParams();

  const currentUser = JSON.parse(localStorage.getItem("user")!);

  const { isPending, mutate: updateUser } = useMutation({
    mutationFn: async ({ firstName, imageUrl, lastName }: UserType) => {
      const user = await updateUserApi(currentUser?.jwToken, userId!, {
        firstName,
        lastName,
        imageUrl,
      });
      return user;
    },
    onSuccess: () => {
      toast.success("User updated successfully");
      queryClient.invalidateQueries();
      //   queryClient.invalidateQueries({
      //     queryKey: ["users", userId],
      //   });
      navigate("/users");
    },
    onError: (err) => {
      console.log("Error", err);
      toast.error("Error updating user");
    },
  });

  return { isPending, updateUser };
};
