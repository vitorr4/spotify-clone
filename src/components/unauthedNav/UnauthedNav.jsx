import React from "react";
import { Link, NavLink } from "react-router-dom";
import { getUrl } from "../../scripts/spotify-api.js";
import "../../style/nav.css";

function UnauthedNav() {
  return (
    <>
      <nav>
        <ul className="nav-list">
          <li>
            <img
              className="nav-logo"
              src="Spotify_Logo_RGB_Green.png"
              alt="Spotify"
            />
          </li>
          <li>
            <NavLink
              exact
              to="/"
              className="nav-button"
              activeStyle={{
                fontWeight: "bold",
              }}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className="nav-button"
              activeStyle={{
                fontWeight: "bold",
              }}
            >
              About
            </NavLink>
          </li>
          <li
            className="sign-in"
            onClick={() => {
              getUrl();
            }}
          >
            Sign In
          </li>
        </ul>
      </nav>
    </>
  );
}

export default UnauthedNav;
