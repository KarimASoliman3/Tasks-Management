import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function AuthProtectedRoutes({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("AuthContext must be used within AuthContextProvider");
  }

  const { isLoggedIn } = auth;

  return !isLoggedIn ? children : <Navigate to="/" replace />;
}