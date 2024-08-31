import React from "react";
import "./Dashboard.css";
import Sidebar from "./sidebar.jsx";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboardContainer"></div>
    </div>
  );
};

export default Dashboard;
