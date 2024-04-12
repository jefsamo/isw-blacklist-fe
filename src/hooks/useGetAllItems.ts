import { useQuery } from "@tanstack/react-query";
import { getAllItems } from "../services/apiItems";

export const useGetAllItems = () => {
  const user = JSON.parse(localStorage.getItem("user")!);
  const { isLoading, data: itemsAll } = useQuery({
    queryKey: ["items-all"],
    queryFn: () => getAllItems(user?.jwToken),
  });

  return { isLoading, itemsAll };
};
