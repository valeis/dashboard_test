import React, { useContext } from "react";
import "./App.css";
import RegistrationForm from "./features/users/RegistrationForm";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import LoginForm from "./features/auth/LoginForm";
import { QueryClient, QueryClientProvider } from "react-query";
import AuthContext, { AuthContextProvider } from "./store/auth-context";
import Layout from "./components/Layout";
import Dashboard from "./features/Dashboard";
import Users from "./features/users/pages/Users";
import Posts from "./features/posts/pages/Posts/Posts";
import CreatePosts from "./features/posts/pages/CreatePosts/CreatePosts";
import PostDetails from "./features/posts/pages/PostDetails/PostDetails";

const queryClient = new QueryClient();

function App() {
  const authCtxx = useContext(AuthContext);
  const isLoggedIn = authCtxx.isLoggedIn;

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            {!isLoggedIn && (
              <Route path="/register" element={<RegistrationForm />}></Route>
            )}
            {!isLoggedIn && (
              <Route path="/login" element={<LoginForm />}></Route>
            )}

            <Route path="/" element={<Navigate to="/login" />}></Route>
            {isLoggedIn && (
              <Route path="/dashboard" element={<Dashboard />}></Route>
            )}

            {isLoggedIn && <Route path="/users" element={<Users />}></Route>}

            {isLoggedIn && <Route path="/posts" element={<Posts />}></Route>}

            {isLoggedIn && (
              <Route path="/posts/create" element={<CreatePosts />}></Route>
            )}

            {isLoggedIn && (
              <Route path="/posts/:id" element={<PostDetails />}></Route>
            )}
            {/* <Route path = '*'> <Navigate to ='/login'/></Route>  */}
          </Routes>
        </BrowserRouter>
      </div>
    </QueryClientProvider>
  );
}

export default App;
