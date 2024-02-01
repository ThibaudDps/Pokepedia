import React, { useContext } from "react";
import { Outlet, Link, Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth";

import Footer from "../../components/Footer/Footer";

function Administration() {
  const { connected } = useContext(AuthContext);

  if (connected !== "connected") {
    return <Navigate to="/" replace />;
  }
  return (
    <>
      <div className="nav">
        <nav className="nav-menu">
          <Link to="/">Home</Link>
          <Link to="/administration/management">Management</Link>
        </nav>
      </div>
      <Outlet />

      <Footer />
    </>
  );
}

export default Administration;
