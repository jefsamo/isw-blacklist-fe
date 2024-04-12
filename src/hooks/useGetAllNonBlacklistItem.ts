import { useQuery } from "@tanstack/react-query";
import { getAllNonBlacklistedItems } from "../services/apiItems";

export const useGetAllNonBlacklistItem = () => {
  const user = JSON.parse(localStorage.getItem("user")!);
  const { isLoading, data: allNonBlacklistItems } = useQuery({
    queryKey: ["non-blacklist-items"],
    queryFn: () => getAllNonBlacklistedItems(user?.jwToken),
  });

  return { isLoading, allNonBlacklistItems };
};
