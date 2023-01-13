import React, { useContext } from "react";
import "./App.css";
import RegistrationForm from "./features/users/RegistrationForm";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import LoginForm from "./features/auth/LoginForm";
import Home from "./features/Dashboard";
import { QueryClient, QueryClientProvider } from "react-query";
import AuthContext, { AuthContextProvider } from "./store/auth-context";
import Layout from "./components/Layout";

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
              {!isLoggedIn &&(<Route path="/login" element={<LoginForm />}></Route>)}
              {isLoggedIn && <Route path="/dashboard" element={<Home />}></Route>}
              {/* <Route path = '*'> <Navigate to ='/login'/></Route>  */}
            </Routes>
          </BrowserRouter>
      </div>
    </QueryClientProvider>
  );
}

export default App;
