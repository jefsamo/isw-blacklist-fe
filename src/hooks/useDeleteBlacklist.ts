import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBlacklist as deleteBlacklistApi } from "../services/apiBlacklistItems";
import { toast } from "react-hot-toast";

type RemoveBlacklistItemType = {
  token: string;
  blacklistItemId: string;
  reason: string;
};

export const useDeleteBlacklist = () => {
  const queryClient = useQueryClient();

  const { isPending, mutate: deleteBlacklist } = useMutation({
    mutationFn: async ({
      token,
      blacklistItemId,
      reason,
    }: RemoveBlacklistItemType) => {
      const user = await deleteBlacklistApi({ token, blacklistItemId, reason });
      return user;
    },
    onSuccess: () => {
      toast.success("Item removed from blacklist successfully");
      queryClient.invalidateQueries({
        queryKey: ["blacklist-items-total"],
      });
    },
    onError: (err) => {
      console.log("Error", err);
      toast.error("Error removing blacklist item");
    },
  });

  return { isPending, deleteBlacklist };
};
