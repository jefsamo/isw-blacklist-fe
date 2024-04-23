import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createItem as createItemApi } from "../services/apiItems";
import { useBlacklistItem } from "./useBlacklistItem";
import { toast } from "react-hot-toast";

type CreateItemType = {
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  imageUrl: string;
  token: string;
  reason:string;
};

export const useCreateblacklistItem = () => {
  const queryClient = useQueryClient();
  const { isPending, createBlacklist } = useBlacklistItem();
  const { mutate: createblacklistItem } = useMutation({
    mutationFn: async ({
      token,
      name,
      description,
      category,
      imageUrl,
      price,
      quantity,
      reason
    }: CreateItemType) => {
      const item = await createItemApi({
        token,
        name,
        description,
        imageUrl,
        category,
        price,
        quantity,
      });
      const id = item.data.id;

      
      await createBlacklist({
        itemId: id, // Use the id of the created item
        reason: reason,
        token: token,
      });

      return id;
    },
    onSuccess: () => {
      toast.success(`Item created successfully`);

      // Invalidate item query
      queryClient.invalidateQueries({
        queryKey: ["items-all"],
      });
    },
    onError: (err) => {
      console.log("Error", err);
      toast.error("Error creating item");
    },
  });

  return { isPending, createblacklistItem };
};
