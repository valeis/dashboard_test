import React from "react";

import LineRechartComponent from "../../components/Chart/Chart";
import Layout from "../../components/Layout";

import './Dashboard.css';

const Dashboard = () => {
  return (
    <>
      <h1 className="title">Statistica postărilor</h1>
      <LineRechartComponent />
    </>
  );
};
export default Dashboard;
