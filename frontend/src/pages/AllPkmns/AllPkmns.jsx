import React from "react";
import { useLoaderData } from "react-router-dom";

import FilterByNav from "../../components/Filters/FilterByNav";
import CardPkmn from "../../components/CardPkmn/CardPkmn";

import "../../components/CardPkmn/CardPkmn.css";
import "./AllPkmns.css";

function AllPkmns() {
  const allPokemons = useLoaderData();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <div className="pkmn-page">
      <FilterByNav url="/pokemons" query="type" title="Type" props="type" />
      <div className="container">
        {allPokemons.map((pokemon) => (
          <CardPkmn key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>

      <button className="scroll-button" type="button" onClick={scrollToTop}>
        Scroll to top
      </button>
    </div>
  );
}

export default AllPkmns;
