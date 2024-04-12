import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getABlacklistedItem } from "../services/apiBlacklistItems";

export const useGetABlacklistedItem = () => {
  const user = JSON.parse(localStorage.getItem("user")!);
  const { blacklistItemId } = useParams();

  const { isLoading, data: blacklistItem } = useQuery({
    queryKey: ["item", blacklistItemId],
    queryFn: () => getABlacklistedItem(user?.jwToken, blacklistItemId!),
  });

  return { isLoading, blacklistItem };
};
