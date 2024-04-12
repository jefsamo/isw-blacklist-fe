import { useQuery } from "@tanstack/react-query";
import { getItemsTotal } from "../services/apiItems";

export const useGetAllItemsTotal = () => {
  const user = JSON.parse(localStorage.getItem("user")!);
  const { isLoading, data: itemsAll } = useQuery({
    queryKey: ["items-all-total"],
    queryFn: () => getItemsTotal(user?.jwToken),
  });

  return { isLoading, itemsAll };
};
