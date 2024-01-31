import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import "./CardPkmn.css";

function CardPkmn({ pokemon }) {
  return (
    <div className="list-card">
      <div className="card">
        <div className="card-body">
          <Link to={`/pokemons/${pokemon.id}`}>
            <img className="card-img" src={pokemon.image} alt={pokemon.name} />
          </Link>
          <div className="card-desc-all">
            <div className="card-info">
              <p className="card-name">{pokemon.name}</p>
              <p className="card-id">n°{pokemon.id}</p>
            </div>
            <div className="card-types">
              <img
                className="card-icon"
                src={pokemon.icon}
                alt={pokemon.icon}
              />
              <img
                className="card-icon"
                src={pokemon.icon2}
                alt={pokemon.icon2}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

CardPkmn.propTypes = {
  pokemon: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    icon2: PropTypes.string.isRequired,
  }).isRequired,
};

export default CardPkmn;
