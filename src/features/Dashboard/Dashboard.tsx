import React from "react";
import LineRechartComponent from "../../components/Chart/Chart";
import Layout from "../../components/Layout";
import './Dashboard.css';
const Dashboard = () => {
  return (
    <Layout>
      <h1 className="title">Statistica postărilor</h1>
      <LineRechartComponent />
    </Layout>
  );
};
export default Dashboard;
