import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeBlacklist as removeBlacklistApi } from "../services/apiBlacklistItems";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type RemoveBlacklistItemType = {
  token: string;
  blacklistItemId: string;
  reason: string;
};

export const useRemoveBlacklist = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isPending, mutate: removeBlacklist } = useMutation({
    mutationFn: async ({
      token,
      blacklistItemId,
      reason,
    }: RemoveBlacklistItemType) => {
      const blacklist = await removeBlacklistApi({
        token,
        blacklistItemId,
        reason,
      });
      return blacklist;
    },
    onSuccess: () => {
      toast.success("Item removed from blacklist successfully");
      queryClient.invalidateQueries({
        queryKey: ["blacklist-items-total"],
      });
      navigate("/blacklist");
    },
    onError: (err) => {
      console.log("Error", err);
      toast.error("Error removing from blacklist");
    },
  });

  return { isPending, removeBlacklist };
};
