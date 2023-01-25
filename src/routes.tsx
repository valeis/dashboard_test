import React from "react";
import LoginForm from "./features/auth/LoginForm";
import Dashboard from "./features/Dashboard/Dashboard";
import CreatePosts from "./features/posts/pages/CreatePosts/CreatePosts";
import PostDetails from "./features/posts/pages/PostDetails/PostDetails";
import Posts from "./features/posts/pages/Posts/Posts";
import Users from "./features/users/pages/Users";
import RegistrationForm from "./features/users/RegistrationForm";

export const RoutesData = [
    {
        isLoggedIn: false,
        path: "/register",
        element: <RegistrationForm />, 
    },

    {
        isLoggedIn: false,
        path: "/login",
        element: <LoginForm />,      
    },

    {
        isLoggedIn: true,
        path: "/dashboard",
        element: <Dashboard />,  
    },

    {
        isLoggedIn: true,
        path: "/users",
        element: <Users />, 
    },

    {
        isLoggedIn: true,
        path: "/posts",
        element: <Posts />, 
    },

    {
        isLoggedIn: true,
        path: "/posts/create",
        element: <CreatePosts />, 
    },

    {
        isLoggedIn: true,
        path: "/posts/:id",
        element: <PostDetails />, 
    },

    {
        isLoggedIn: true,
        path: "/posts/:id/edit",
        element: <CreatePosts /> 
    }
]