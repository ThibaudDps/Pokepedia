import React from "react";
import { NavLink } from "react-router-dom";

import Seye from "../../assets/seye.gif";

import "./About.css";

function About() {
  return (
    <div className="about-page">
      <div className="about-desc">
        <div className="about-body">
          <img className="seye" src={Seye} alt="seye" />

          <h1 className="h1-about">Hey, I'm Thibaud</h1>
          <p className="p-about">
            I'm a Pkmn trainer since 95' <br /> and I made this website!
          </p>
        </div>
      </div>
      <div className="links">
        <NavLink to="https://github.com/ThibaudDps" target="_blank">
          <button className="link-button" type="button">
            Github
          </button>
        </NavLink>
        <NavLink
          to="https://www.linkedin.com/in/thibauddupuis/"
          target="_blank"
        >
          <button className="link-button" type="button">
            Linkedin
          </button>
        </NavLink>
        <NavLink to="https://www.twitch.tv/seyetv" target="_blank">
          <button className="link-button" type="button">
            Twitch
          </button>
        </NavLink>
      </div>
    </div>
  );
}

export default About;
