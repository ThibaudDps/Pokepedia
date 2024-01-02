import React from "react";
import PkmnManagement from "../../components/PkmnManagement/PkmnManagement";
import "./Management.css";

function Management() {
  return (
    <div className="contain-management">
      <div className="pkmn-management">
        <h3>Pokemons</h3>
        <PkmnManagement />
      </div>
    </div>
  );
}

export default Management;
