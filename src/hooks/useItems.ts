import { useQuery } from "@tanstack/react-query";
import { getItems } from "../services/apiItems";

export const useItems = () => {
  const user = JSON.parse(localStorage.getItem("user")!);
  const { isLoading, data: items } = useQuery({
    queryKey: ["items"],
    queryFn: () => getItems(user.jwToken),
  });

  return { isLoading, items };
};
