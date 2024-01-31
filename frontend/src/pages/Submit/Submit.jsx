import React, { useState } from "react";
import connexion from "../../services/connexion";

import "./Submit.css";

const pokemonEntry = {
  name: "",
  description: "",
  image: "",
  type: "",
};

function Submit() {
  const [pokemon, setPokemon] = useState(pokemonEntry);

  const handlePokemon = (event) => {
    setPokemon((previousState) => ({
      ...previousState,
      [event.target.name]: event.target.value,
    }));
  };

  const postPokemon = async (event) => {
    event.preventDefault();
    try {
      await connexion.post("/pokemons", pokemon);
    } catch (error) {
      console(error);
    }
  };

  return (
    <div>
      <div className="submit">
        <form className="submit-form" onSubmit={postPokemon}>
          <p className="submit-text">
            Have you discover <br />a new pokemon?
            <br />
            <br />
            Submit your datas here!
          </p>
          <label>
            <p className="label-text">Name </p>
            <input
              type="text"
              name="name"
              required
              value={pokemon.name}
              onChange={handlePokemon}
            />
          </label>
          <label>
            <p className="label-text"> Description </p>
            <textarea
              name="description"
              required
              value={pokemon.description}
              onChange={handlePokemon}
            />
          </label>
          <label>
            <p className="label-text"> Image Url </p>
            <input
              type="url"
              name="image"
              required
              value={pokemon.image}
              onChange={handlePokemon}
            />
          </label>
          <label>
            <p className="label-text">Types </p>
            <select
              className="select-submit"
              name="type"
              value={pokemon.type}
              onChange={handlePokemon}
            >
              <option value="">Choose the type</option>
              <option value="Grass">Grass</option>
              <option value="Fire">Fire</option>
              <option value="Water">Water</option>
            </select>
          </label>
          <button className="submit-button" type="submit">
            Send your request
          </button>
        </form>
      </div>
    </div>
  );
}

export default Submit;
