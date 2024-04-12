import { useQuery } from "@tanstack/react-query";
import { checkValidToken } from "../services/apiItems";

export const useValidToken = () => {
  const user = JSON.parse(localStorage.getItem("user")!);
  const { isLoading, data: validUser } = useQuery({
    queryKey: ["valid"],
    queryFn: () => checkValidToken(user.jwToken),
  });

  return { isLoading, validUser };
};
