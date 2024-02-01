import React from "react";
import { useLoaderData } from "react-router-dom";

import WidgetPkmn from "../../components/WidgetPkmn/WidgetPkmn";
import logomon from "../../assets/logomon.svg";

import "../../App.css";

function Home() {
  const pokemon = useLoaderData();

  return (
    <div className="home">
      <header className="home-header">
        <p className="home-title">Pokepedia v.1</p>
        <img src={logomon} className="home-logo" alt="logo" />
      </header>
      <WidgetPkmn pokemon={pokemon} />
    </div>
  );
}

export default Home;
