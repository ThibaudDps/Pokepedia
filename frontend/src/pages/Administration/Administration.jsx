import React, { useContext } from "react";
import { Outlet, Link, Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth";

import Footer from "../../components/Footer/Footer";

function Administration() {
  const { connected } = useContext(AuthContext);

  if (connected.is_admin === 1) {
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

  return <Navigate to="/" replace />;
}

export default Administration;
