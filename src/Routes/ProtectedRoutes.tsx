import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoutes({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = useContext(AuthContext);


  if (!auth) {
    throw new Error("AuthContext must be used within AuthContextProvider");
  }

  const { isLoggedIn, isLoading } = auth;
  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(isLoggedIn);
  console.log("Auth state:", isLoggedIn);

  return isLoggedIn ? children : <Navigate to="/login" replace />;
}


