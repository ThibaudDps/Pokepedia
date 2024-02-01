import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import "./CardDesc.css";

function CardDesc({ pokemon }) {
  const navigate = useNavigate(); // Utilisation de useNavigate au lieu de useHistory
  const [currentPage, setCurrentPage] = useState(pokemon.id);

  const goToPreviousPokemon = () => {
    const previousPokemonId = currentPage - 1;
    if (previousPokemonId > 0) {
      setCurrentPage(previousPokemonId);
      navigate(`/pokemons/${previousPokemonId}`); // Utilisation de navigate pour la navigation
    }
  };

  const goToNextPokemon = () => {
    const nextPokemonId = currentPage + 1;
    setCurrentPage(nextPokemonId);
    navigate(`/pokemons/${nextPokemonId}`); // Utilisation de navigate pour la navigation
  };

  return (
    <div className="card-desc-page">
      <div className="card-desc">
        <div className="card-desc-body">
          <img
            className="card-desc-img"
            src={pokemon.image}
            alt={pokemon.name}
          />
          <div className="text-desc">
            <div className="types">
              <div className="type1">
                <img
                  className="card-desc-imgtype"
                  src={pokemon.icon}
                  alt={pokemon.type}
                />
              </div>
              <div className="type2">
                {pokemon.type2 && (
                  <img
                    className="card-desc-imgtype"
                    src={pokemon.icon2}
                    alt={pokemon.type2}
                  />
                )}
              </div>
            </div>
            <h1 className="card-desc-name">{pokemon.name}</h1>
            <p>n°{pokemon.id}</p>
            <p className="p-desc">{pokemon.description}</p>
          </div>
        </div>
      </div>
      <div className="navigation-buttons">
        <button type="button" onClick={goToPreviousPokemon}>
          Previous
        </button>
        <button type="button" onClick={goToNextPokemon}>
          Next
        </button>
      </div>
    </div>
  );
}

CardDesc.propTypes = {
  pokemon: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    type2: PropTypes.string.isRequired,
    icon2: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default CardDesc;
