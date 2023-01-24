import React, { useContext } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import AuthContext from "./store/auth-context";
import { RoutesData } from "./routes";

const queryClient = new QueryClient();

function App() {
  const authCtxx = useContext(AuthContext);
  const isLoggedIn = authCtxx.isLoggedIn;

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            {RoutesData.map ((index, key)  =>(
                index.isLoggedIn === isLoggedIn && <Route path={index.path} element={index.element} key={key}> </Route>
            ))}

            <Route path="/" element={<Navigate to="/login" />}></Route>
          
          </Routes>
        </BrowserRouter>
      </div>
    </QueryClientProvider>
  );
}

export default App;
