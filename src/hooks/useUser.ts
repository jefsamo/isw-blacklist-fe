import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getUser } from "../services/apiUsers";

export const useUser = () => {
  const currentUser = JSON.parse(localStorage.getItem("user")!);
  const { userId } = useParams();

  const { isLoading, data: user } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUser(currentUser.jwToken, userId!),
  });

  return { isLoading, user };
};
