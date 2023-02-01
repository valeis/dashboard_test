import React, { useContext } from "react";
//import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import AuthContext from "./store/auth-context";
import { RoutesData } from "./routes";
import 'ebs-design/dist/styles/index.scss';
import LayoutDashboard from "./components/Layout/Layout";

function App() {
  const {isLoggedIn} = useContext(AuthContext);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {RoutesData.map(
            ({isLoggedIn: loginState, element, ...props}, key) =>
            loginState === isLoggedIn && (
                <Route
                  element= {!loginState ? element : <LayoutDashboard>{element}</LayoutDashboard>}
                  key={key}
                  {...props}
                ></Route>
              )
          )}

          {isLoggedIn ? (
            <Route path="*" element={<Navigate to="/dashboard" />}></Route>
          ) : (
             <Route path="*" element={<Navigate to="/login" />}></Route>
          )}

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
