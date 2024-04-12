import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBlacklist as createBlacklistApi } from "../services/apiBlacklistItems";
import { toast } from "react-hot-toast";

type BlacklistType = {
  reason: string;
  token: string;
  itemId: string;
};

export const useBlacklistItem = () => {
  const queryClient = useQueryClient();

  const { isPending, mutate: createBlacklist } = useMutation({
    mutationFn: async ({ token, reason, itemId }: BlacklistType) => {
      const item = await createBlacklistApi({ token, reason, itemId });
      return item;
    },
    onSuccess: () => {
      toast.success("Item blacklisted successfully");
      queryClient.invalidateQueries({
        queryKey: ["non-blacklist-items"],
      });
    },
    onError: (err) => {
      console.log("Error", err);
      toast.error("Error backlisting item");
    },
  });

  return { isPending, createBlacklist };
};
