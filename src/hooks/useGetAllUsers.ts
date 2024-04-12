import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../services/apiUsers";

export const useGetAllUsers = () => {
  const user = JSON.parse(localStorage.getItem("user")!);

  const { isLoading, data: users } = useQuery({
    queryKey: ["users-all"],
    queryFn: () => getAllUsers(user.jwToken),
  });

  return { isLoading, users };
};
