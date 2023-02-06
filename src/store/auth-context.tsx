import { any } from "prop-types";
import React, { ReactNode, useState } from "react";
import { useMutation, useQuery, UseMutationResult } from "react-query";
import usersRequest from "../api/users";
import { User } from "../types/User";

type AuthProviderProps = {
  children: ReactNode;
};

interface AuthContextType {
  token: string | null;
  isLoggedIn: boolean;
  currentUser: User;
  login: any
  logout: () => void;
  isLoading: boolean;
}

export const AuthContext = React.createContext<AuthContextType>({
  token: "",
  isLoggedIn: false,
  currentUser: {},
  login: any,
  logout: () => {},
  isLoading: false,
});

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);
  
  const { data, isLoading, refetch} = useQuery(["user",initialToken], () => usersRequest.getById(initialToken!), {enabled:!!initialToken});

  const userIsLoggedIn = !!data;


  const mutation = useMutation(usersRequest.getAuth,{
    onSuccess: (data) => {
      if (!data || data?.length === 0) {
        setToken("");
        return;
      }
      localStorage.setItem("token", data[0].id);
    }
  })

  const logoutHandler = () => {
    setToken("");
    localStorage.removeItem("token");
    refetch()
  };

  
  
  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: mutation,
    logout: logoutHandler,
    currentUser: data!,
    isLoading,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;

