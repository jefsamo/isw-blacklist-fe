import { useQuery } from "@tanstack/react-query";
import { emailExists } from "../services/apiAuth";

export const useEmailExists = (email: string) => {
  const { isLoading, data: result } = useQuery({
    queryKey: ["email-exists"],
    queryFn: () => emailExists(email),
  });

  return { isLoading, result };
};
