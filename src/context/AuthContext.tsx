import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { getCookie } from "../hooks/getCookie";

type AuthContextType = {
  isLoggedIn: boolean;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

type Props = {
  children: ReactNode;
};

export default function AuthContextProvider({ children }: Props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const token = getCookie("access_token");
    setIsLoggedIn(!!token);
    setIsLoading(false);
  }, []);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
    document.cookie = "access_token=; Max-Age=0; path=/";
    document.cookie = "refresh_token=; Max-Age=0; path=/";
  };

  return (
    <AuthContext.Provider value={{ isLoading, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
