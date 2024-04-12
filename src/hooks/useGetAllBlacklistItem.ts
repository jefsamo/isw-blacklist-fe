import { useQuery } from "@tanstack/react-query";
import { getAllBlacklistedItems } from "../services/apiBlacklistItems";

export const useGetAllBlacklistItem = () => {
  const user = JSON.parse(localStorage.getItem("user")!);
  const { isLoading, data: allBlacklistItems } = useQuery({
    queryKey: ["blacklist-items"],
    queryFn: () => getAllBlacklistedItems(user?.jwToken),
  });

  return { isLoading, allBlacklistItems };
};
