import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getANonBlacklistedItem } from "../services/apiBlacklistItems";

export const useGetANonBlacklistedItem = () => {
  const user = JSON.parse(localStorage.getItem("user")!);
  const { itemId } = useParams();

  const { isLoading, data: nonBlacklistItem } = useQuery({
    queryKey: ["item", itemId],
    queryFn: () => getANonBlacklistedItem(user?.jwToken, itemId!),
  });

  return { isLoading, nonBlacklistItem };
};
