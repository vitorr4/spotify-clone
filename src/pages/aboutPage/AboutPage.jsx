import React from "react";
import UnauthedNav from "../../components/unauthedNav/UnauthedNav.jsx";
import AuthedNav from "../../components/authedNav/AuthedNav.jsx";

function AboutPage() {
  const isLoggedIn = false;
  return (
    <>
      {isLoggedIn ? <AuthedNav /> : <UnauthedNav />}
      <div
        style={{
          margin: "auto",
          left: "0px",
          right: "0px",
          position: "relative",
          width: "500px",
          alignText: "center",
        }}
      >
        <p style={{ color: "#f8f8ff" }}>
          This app is a clone of Spotify and most of its features with some
          design modifications.
        </p>
        <p style={{ color: "#f8f8ff" }}>
          This is the version 0.1. O.1 offers:
          <ul>
            <li>List of user's playlists</li>
            <li>User Profile</li>
            <li>Artist Profile</li>
            <li>Album</li>
            <li>Playlist</li>
            <li>
              Cross-page audio player (only plays the 30s version of songs
              provided by the Spotify API)
            </li>
          </ul>
        </p>
      </div>
    </>
  );
}

export default AboutPage;
