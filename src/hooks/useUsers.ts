import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../services/apiUsers";
import { useSearchParams } from "react-router-dom";

export const useUsers = () => {
  const user = JSON.parse(localStorage.getItem("user")!);
  const [searchParams] = useSearchParams();

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const { isLoading, data: users } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(user.jwToken, page),
  });

  return { isLoading, users };
};
