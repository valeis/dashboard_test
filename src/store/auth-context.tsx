import React, { ReactNode, useState } from "react";
import { useQuery } from "react-query";
import usersRequest from "../api/users";
import { User } from "../types/User";

type AuthProviderProps = {
  children: ReactNode;
};

interface AuthContextType {
  token: string | null;
  isLoggedIn: boolean;
  currentUser: User;
  login: (token?: string | null) => void;
  logout: () => void;
  isLoading: boolean;
}

export const AuthContext = React.createContext<AuthContextType>({
  token: "",
  isLoggedIn: false,
  currentUser: {},
  login: () => {},
  logout: () => {},
  isLoading: false,
});

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);
  const userIsLoggedIn = !!token;

  const loginHandler = (token?: string | null) => {
    console.log(token);
    if (!token) return;
    setToken(token);
    localStorage.setItem("token", token);
  };

  const logoutHandler = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  const { data, isLoading } = useQuery("user", () => usersRequest.getById(initialToken!), {enabled:!!initialToken});

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    currentUser: data!,
    isLoading,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
