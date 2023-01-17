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

            {isLoggedIn && (
              <Route path="/users" element={<Users />}></Route>
            )}
            {/* <Route path = '*'> <Navigate to ='/login'/></Route>  */}
          </Routes>
        </BrowserRouter>
      </div>
    </QueryClientProvider>
  );
}

export default App;
