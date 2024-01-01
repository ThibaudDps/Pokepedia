import React, { useContext } from "react";
import { Outlet, Link, Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth";

function Administration() {
  const { connected } = useContext(AuthContext);

  if (connected !== "connected") {
    return <Navigate to="/" replace />;
  }
  return (
    <div className="nav">
      <nav className="nav-menu">
        <Link to="/">Home</Link>
        <Link to="/administration">Dashboard</Link>
        <Link to="/administration/adminCard">AdminCard</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default Administration;
