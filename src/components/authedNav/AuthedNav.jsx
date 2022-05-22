import React from "react";
import { Link, NavLink } from "react-router-dom";
import { logOut } from "../../scripts/spotify-api.js";
import "../../style/nav.css";

function AuthedNav() {
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
              to="/user"
              className="nav-button"
              activeStyle={{
                fontWeight: "bold",
              }}
            >
              Profile
            </NavLink>
          </li>
          <li
            className="sign-in"
            onClick={() => {
              logOut();
            }}
          >
            Log out
          </li>
        </ul>
      </nav>
    </>
  );
}

export default AuthedNav;
