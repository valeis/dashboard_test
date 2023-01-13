import axios from "axios";
import React, { useContext, useState } from "react";
import { useMutation } from "react-query";
import Navbar from "../components/Navbar/Navbar";
import AuthContext from "../store/auth-context";
const Home = () => {
  return (
    <>
      <Navbar/>
      <h1></h1>
    </>
  );
};
export default Home;
