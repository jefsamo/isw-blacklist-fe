import { useQuery } from "@tanstack/react-query";
import { getAllBlacklisted } from "../services/apiBlacklistItems";

export const useGetAllBlacklist = () => {
  const user = JSON.parse(localStorage.getItem("user")!);
  const { isLoading, data: allBlacklistItemsTotal } = useQuery({
    queryKey: ["blacklist-items-total"],
    queryFn: () => getAllBlacklisted(user?.jwToken),
  });

  return { isLoading, allBlacklistItemsTotal };
};
