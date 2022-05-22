import React, { useState } from "react";
import UnauthedNav from "../../components/unauthedNav/UnauthedNav.jsx";
import { getUrl, requestToken } from "../../scripts/spotify-api.js";
const queryString = require("query-string");

function LandingPage() {
  const [urlParams, setUrlParams] = useState(window.location.search);
  const [token, setToken] = useState(null);

  if (urlParams !== "" && token === null) {
    const code = queryString.parse(window.location.search).code;
    const state = queryString.parse(window.location.search).state;
    requestToken(code, state, setToken);
    //setUrlParams({ a: queryString.parse(window.location.search) });
    //console.log(urlParams);
  }

  return (
    <>
      <UnauthedNav />
      <div
        className="App-header"
        style={{
          margin: "auto",
          left: "0px",
          right: "0px",
          position: "relative",
          width: "500px",
          alignText: "center",
        }}
      >
        <h2 style={{ color: "#1ed760" }}>Spotify Clone</h2>
        <p style={{ color: "#f8f8ff" }}>Sign in with your Spotify account.</p>
      </div>
    </>
  );
}

export default LandingPage;
