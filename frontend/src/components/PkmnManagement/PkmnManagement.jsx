import { React, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import connexion from "../../services/connexion";

import "./PkmnManagement.css";

function PokemonManagement() {
  const [formVisible, setFormVisible] = useState("none");
  const [pokemons, setPokemons] = useState([]);
  const [pokemonValue, setPokemonValue] = useState({
    name: "",
    image: "",
    type_id: 0,
  });

  const showToastMessage = () => {
    toast.success("Success! Datas have been modified. :)", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const showToastErrorMessage = () => {
    toast.error("Error! Datas haven't been modified. :(", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const getPokemon = async () => {
    try {
      const response = await connexion.get("/pokemons");
      setPokemons(response.data);
    } catch (error) {
      console.error("Error fetching Pokemon data:", error);
    }
  };

  const handleChange = (event) => {
    if (event.target.name === "type_id") {
      setPokemonValue((previousState) => ({
        ...previousState,
        [event.target.name]: +event.target.value,
      }));
    } else {
      setPokemonValue((previousState) => ({
        ...previousState,
        [event.target.name]: event.target.value,
      }));
    }
  };

  const putPokemon = async (event) => {
    event.preventDefault();
    try {
      await connexion.put(`/pokemons/${pokemonValue.id}`, pokemonValue);
      showToastMessage();
      getPokemon();
      setFormVisible("none");
    } catch (error) {
      showToastErrorMessage();
    }
  };

  useEffect(() => {
    getPokemon();
  }, []);

  const loadPokemon = (pokemon) => {
    setFormVisible("grid");
    setPokemonValue(pokemon);
  };

  const deletePokemon = async (id) => {
    try {
      await connexion.delete(`/pokemons/${id}`);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleRequest = (event) => {
    if (pokemonValue.id) {
      putPokemon(event);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="table-pkmn-management">
        <div className="contain-form">
          <form
            onSubmit={handleRequest}
            className="mngmt-form"
            style={{ display: formVisible }}
          >
            <label>
              Name :
              <input
                type="text"
                name="name"
                value={pokemonValue.name}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              image :
              <input
                type="text"
                name="image"
                value={pokemonValue.image}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              type :
              <input
                type="number"
                name="type_id"
                value={pokemonValue.type_id}
                onChange={handleChange}
                required
              />
            </label>
            <div className="contain-submit">
              <button type="submit" className="button-submit">
                Edit
              </button>
            </div>
          </form>
        </div>
        <ToastContainer />
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {pokemons.map((pokemon) => {
              return (
                <tr className="pkmnLine" key={pokemon.id}>
                  <td>{pokemon.id}</td>
                  <td>{pokemon.name}</td>
                  <td>
                    <img src={pokemon.image} alt={pokemon.image} />
                  </td>
                  <td className="buttons">
                    <button
                      type="button"
                      onClick={() => deletePokemon(pokemon.id)}
                      className="button-delete"
                    >
                      -
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => loadPokemon(pokemon)}
                      className="button-put"
                    >
                      +
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <button className="scroll-button" type="button" onClick={scrollToTop}>
        Scroll to top
      </button>
    </>
  );
}

export default PokemonManagement;
