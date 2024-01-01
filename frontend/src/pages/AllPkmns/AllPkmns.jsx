import React from "react";
import { useLoaderData } from "react-router-dom";

import FilterByNav from "../../components/Filters/FilterByNav";
import CardPkmn from "../../components/CardPkmn/CardPkmn";

import "../../components/CardPkmn/CardPkmn.css";
import "./AllPkmns.css";

function AllPkmns() {
  const allPokemons = useLoaderData();

  return (
    <div className="">
      <FilterByNav url="/pokemons" query="type" title="Type" props="type" />
      <div className="container">
        {allPokemons.map((pokemon) => (
          <CardPkmn key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}

export default AllPkmns;
