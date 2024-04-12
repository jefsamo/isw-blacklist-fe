import { useQuery } from "@tanstack/react-query";

export const useUser = () => {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    // queryFn: () => {
    //   console.log("Wale");
    // },
  });

  return { isLoading, user };
};
