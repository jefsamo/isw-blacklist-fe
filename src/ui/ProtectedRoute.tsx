import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useValidToken } from "../hooks/useValidUser";

type Props = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
  const currentUser = JSON.parse(localStorage.getItem("user")!);

  const { validUser } = useValidToken();

  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser || validUser?.statusCode === 400) navigate("/CreateblacklistItem");
  }, [navigate, currentUser, validUser]);

  return children;
};

export default ProtectedRoute;
