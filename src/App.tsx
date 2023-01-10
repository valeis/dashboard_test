import React from "react";
import "./App.css";
import RegistrationForm from "./features/users/RegistrationForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from "./features/auth/LoginForm";
import Home from "./features/Dashboard";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<RegistrationForm />}></Route>
          <Route path="/login" element={<LoginForm/>}></Route>
          <Route path="/" element={<Home/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
