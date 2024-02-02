import React, { useContext } from "react";
import { AuthContext } from "../../contexts/Auth";

import "./Profile.css";

function Profile() {
  const { infosUser } = useContext(AuthContext);

  return (
    <div className="profile-page">
      <div className="card-desc">
        <div className="profile-desc">
          <img
            className="dashboard-profile"
            src={infosUser.picture}
            alt={infosUser.name}
          />
          <h4>{infosUser.name}</h4>
        </div>
      </div>
    </div>
  );
}

export default Profile;
