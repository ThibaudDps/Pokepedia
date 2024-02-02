import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth";
import favimon from "../../assets/favimon.svg";

import "./Navbar.css";

function NavBar() {
  const { infosUser, setInfosUser } = useContext(AuthContext);

  return (
    <div>
      <div className="nav">
        <NavLink to="/">
          <img src={favimon} className="nav-logo" alt="pokepedia_logo" />
        </NavLink>
        <nav className="nav-menu">
          <ul>
            <li>
              <NavLink to="/pokemons">Pokedex</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>

            {infosUser.id && (
              <li>
                <NavLink to="/submit">Submit</NavLink>
              </li>
            )}
            {!infosUser.id && (
              <div className="nav-login">
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
                <li>
                  <NavLink to="/signup">SignUp</NavLink>
                </li>
              </div>
            )}
            {infosUser.is_admin === 1 && (
              <li>
                <NavLink to="/administration/">Admin</NavLink>
              </li>
            )}
            {infosUser.id && (
              <div className="nav-log">
                <li>
                  <button
                    type="button"
                    className="button-logout"
                    onClick={() => setInfosUser({ is_admin: null })}
                  >
                    Log Out
                  </button>
                </li>
                <div className="logon">
                  <p className="name-user">{infosUser.name}</p>
                  <li className="name-picture">
                    <NavLink to="/profile">
                      <img
                        className="profile-logo"
                        src={infosUser.picture}
                        alt="user"
                      />
                    </NavLink>
                  </li>
                </div>
              </div>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default NavBar;
