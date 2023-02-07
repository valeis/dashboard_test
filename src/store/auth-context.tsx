import React, { ReactNode } from "react";
import { UseMutateFunction, useMutation, useQuery} from "react-query";
import usersRequest from "../api/users";
import { User } from "../types/User";

type AuthProviderProps = {
  children: ReactNode;
};

interface AuthContextType {
  isLoggedIn: boolean;
  currentUser: User;
  login: UseMutateFunction<any, unknown, { email: string; password: string; }>
  logout: () => void;
  isLoading: boolean;
}

export const AuthContext = React.createContext<AuthContextType>({
  isLoggedIn: false,
  currentUser: {},
  login: () => {},
  logout: () => {},
  isLoading: false,
});

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const initialToken = localStorage.getItem("token");
  
  const { data, isLoading, refetch} = useQuery(["user",initialToken], () => usersRequest.getById(initialToken!), {enabled:!!initialToken});

  const userIsLoggedIn = !!data;


  const mutation = useMutation(usersRequest.getAuth,{
    onSuccess: (data) => {
      if (!data || data?.length === 0) {
        return;
      }
      localStorage.setItem("token", data[0].id);
    }
  })

  const logoutHandler = () => {
    localStorage.removeItem("token");
    refetch()
  };

  
  
  const contextValue = {
    isLoggedIn: userIsLoggedIn,
    login: mutation.mutate,
    logout: logoutHandler,
    currentUser: data!,
    isLoading,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;

