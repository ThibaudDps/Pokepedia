import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import connexion from "../../services/connexion";

import "react-toastify/dist/ReactToastify.css";

import "./Submit.css";

const pokemonEntry = {
  name: "",
  description: "",
  image: "",
  type: "",
  type2: "",
};

const showToastMessage = () => {
  toast.success("The entry has been saved successfully", {
    position: toast.POSITION.BOTTOM_CENTER,
  });
};

const showToastErrorMessage = () => {
  toast.error("The entry was not saved !", {
    position: toast.POSITION.BOTTOM_CENTER,
  });
};

function Submit() {
  const [pokemon, setPokemon] = useState(pokemonEntry);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await connexion.get("/types");
        setTypes(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTypes();
  }, []);

  const handlePokemon = (event) => {
    setPokemon((previousState) => ({
      ...previousState,
      [event.target.name]: event.target.value,
    }));
  };

  const postPokemon = async (event) => {
    event.preventDefault();
    try {
      const { type, type2, ...rest } = pokemon;
      const pokemonWithIds = {
        ...rest,
        type_id: type,
        type_id_2: type2 !== "" ? type2 : null,
      };
      await connexion.post("/pokemons", pokemonWithIds);
      showToastMessage();

      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      showToastErrorMessage(error);
    }
  };

  return (
    <div>
      <div className="submit">
        <form className="submit-form" onSubmit={postPokemon}>
          <p className="submit-text">
            Have you discovered <br />a new pokemon?
            <br />
            <br />
            Submit your data here!
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
            <p className="label-text">Description</p>
            <textarea
              name="description"
              required
              value={pokemon.description}
              onChange={handlePokemon}
            />
          </label>
          <label>
            <p className="label-text">Image Url </p>
            <input
              type="url"
              name="image"
              required
              value={pokemon.image}
              onChange={handlePokemon}
            />
          </label>
          <label>
            <p className="label-text">Type 1</p>
            <select
              className="select-submit"
              name="type"
              value={pokemon.type}
              onChange={handlePokemon}
            >
              <option value="">Choose the type</option>
              {types.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.type}
                </option>
              ))}
            </select>
          </label>
          <label>
            <p className="label-text">Type 2</p>
            <select
              className="select-submit"
              name="type2"
              value={pokemon.type2}
              onChange={handlePokemon}
            >
              <option value="">Choose the type (optional)</option>
              {types.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.type}
                </option>
              ))}
            </select>
          </label>
          <button className="submit-button" type="submit">
            Send your request
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Submit;
