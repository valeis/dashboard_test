import React, { useContext } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import AuthContext from "./store/auth-context";
import { RoutesData } from "./routes";
import Layout from "./components/Layout";

function App() {
  const authCtxx = useContext(AuthContext);
  const isLoggedIn = authCtxx.isLoggedIn;

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {RoutesData.map(
            (index, key) =>
              index.isLoggedIn === isLoggedIn && (
                <Route
                  path={index.path}
                  element= {(index.path==='/login' || index.path==='/register' ) ? index.element : <Layout>{index.element}</Layout>}
                  key={key}
                ></Route>
              )
          )}

          {isLoggedIn ? (
            <Route path="/" element={<Navigate to="/dashboard" />}></Route>
          ) : (
             <Route path="/" element={<Navigate to="/login" />}></Route>
          )}

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
