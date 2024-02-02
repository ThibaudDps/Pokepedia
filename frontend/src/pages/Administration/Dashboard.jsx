import React, { useContext } from "react";
import { AuthContext } from "../../contexts/Auth";

import "./Dashboard.css";

function Dashboard() {
  const { infosUser } = useContext(AuthContext);

  return (
    <div className="dashboard-page">
      <div className="dashboard-welcome">
        <img className="dashboard-profile" src={infosUser.picture} alt="user" />
        <h3 className="dashboard-title">Welcome Prof Oak</h3>
      </div>
    </div>
  );
}

export default Dashboard;
