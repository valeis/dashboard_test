 import axios from "axios";
import exp from "constants";
import React, { createContext, ReactNode, useState} from "react";
import { useMutation, useQuery  } from "react-query";
import { useNavigate } from "react-router-dom";
import { tokenToString } from "typescript";

type AuthProviderProps = {
    children: ReactNode;
}

interface AuthContextType {
    token: string | null,
    isLoggedIn: boolean,
    currentUser: User,
    mutation: (token?: string) => void,
    login: (token?: string | null) => void,
    logout: () => void,
    isLoading: boolean
}

interface User{
    name?: string,
    surname?: string,
    email?: string,
    gender?: string,
    password?: string 
}

export const AuthContext = React.createContext<AuthContextType>({
    token: '',
    isLoggedIn: false,
    currentUser: {},
    mutation: () => {},
    login: () => {},
    logout: () => {},
    isLoading: false
});

export const AuthContextProvider = ({ children }: AuthProviderProps) => {

    const initialToken = localStorage.getItem('token');
    
    const [token, setToken] = useState(initialToken);

    const [currentUser, setCurrentUser] = useState('');
    const userIsLoggedIn = !!token;
    const getRegisteredUser = async () => {
        const { data } = await axios.get("http://localhost:5000/users/"+ localStorage.getItem('token'));
        return data;
    }

    const loginUser = async () => {
        const { data } = await axios.get("http://localhost:5000/users/"+ localStorage.getItem('token'));
        return data;
    }

    const loginHandler = (token?: string | null) => {
        console.log(token);
        if(!token) return
        setToken(token);
        localStorage.setItem('token', token);
      };
    
      const logoutHandler = () => {
        setToken('');
        localStorage.removeItem('token');
      };

    const {data, isLoading} = useQuery('user', getRegisteredUser)
    
    // const mutation = useMutation(getRegisteredUser, {onSuccess: (data) => {
    //     setCurrentUser(data[0].name);
    // }})
    
    // mutation.mutate();

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
        currentUser: data,
        loginUser,
        mutation: ()=>{},
        isLoading
      };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
    
}

export default AuthContext;

