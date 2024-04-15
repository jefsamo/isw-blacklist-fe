import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createItem as createItemApi } from "../services/apiItems";
import { toast } from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

type CreateItemType = {
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  imageUrl: string;
  token: string;
};

export const useCreateItem = () => {
  const queryClient = useQueryClient();
  // const navigate = useNavigate();

  const { isPending, mutate: createItem } = useMutation({
    mutationFn: async ({
      token,
      name,
      description,
      category,
      imageUrl,
      price,
      quantity,
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
      return item;
    },
    onSuccess: () => {
      toast.success("Item created sucessfully");
      queryClient.invalidateQueries({
        queryKey: ["items-all"],
      });
      // navigate("/items");
    },
    onError: (err) => {
      console.log("Error", err);
      toast.error("Error creating item");
    },
  });

  return { isPending, createItem };
};
