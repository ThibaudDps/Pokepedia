import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./WidgetPkmn.css";

function WidgetPkmn({ pokemon }) {
  if (!Array.isArray(pokemon) || pokemon.length === 0) {
    console.error("Pokemons data is not an array or is empty:", pokemon);
    return <div>Error: Pokemons data is not in the expected format.</div>;
  }

  const randomIndexPokemon = Math.floor(Math.random() * pokemon.length);
  const randomPokemon = pokemon[randomIndexPokemon];

  const randomIndexPktype = Math.floor(Math.random() * pokemon.length);
  const randomPktype = pokemon[randomIndexPktype];

  return (
    <div className="widget">
      <div className="widget-pkmn">
        <div key={randomPokemon.id}>
          <div className="widget-pkmn-ticket">
            <h5>Pokemon of the Week</h5>
            <div className="card-desc-home">
              <Link to={`/pokemons/${randomPokemon.id}`}>
                <img
                  className="pkmn"
                  src={randomPokemon.image}
                  alt={randomPokemon.name}
                />
              </Link>
              <p>{randomPokemon.name}</p>
            </div>
          </div>
        </div>
        <div key={randomPktype.type}>
          <div className="widget-pkmn-ticket">
            <h5>Type of the Week</h5>
            <div className="card-desc-home type">
              <img
                className="widget-desc-imgtype"
                src={randomPktype.icon}
                alt={randomPktype.type_id}
              />
              <p>{randomPktype.type}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

WidgetPkmn.propTypes = {
  pokemon: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      type_id: PropTypes.number.isRequired,
      type: PropTypes.string,
      icon: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default WidgetPkmn;
