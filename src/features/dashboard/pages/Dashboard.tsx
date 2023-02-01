import React from "react";

import LineRechartComponent from "../../../components/Chart/Chart";

import './Dashboard.css';

const Dashboard = () => {
  return (
    <>
      <h1 className="title_dashboard">Statistica postărilor</h1>
      <LineRechartComponent />
    </>
  );
};
export default Dashboard;
