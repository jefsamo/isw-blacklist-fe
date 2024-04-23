import { useQuery } from "@tanstack/react-query";
import { getCategories  } from "../services/apiItems";

export const useGetCategories = () => {
  const user = JSON.parse(localStorage.getItem("user")!);
  const { isLoading, data: getCategory } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories (user?.jwToken),
  });

  return { isLoading, getCategory };
};
