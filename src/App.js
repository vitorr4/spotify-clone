import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./pages/landingPage/LandingPage.jsx";
import AuthHome from "./pages/authenticatedHome/AuthHome.jsx";
import PlaylistPage from "./pages/playlistPage/PlaylistPage.jsx";
import ArtistProfile from "./pages/artistProfile/ArtistProfile.jsx";
import UserProfile from "./pages/userProfile/UserProfile.jsx";
import AboutPage from "./pages/aboutPage/AboutPage.jsx";
import SettingsPage from "./pages/settingsPage/SettingsPage.jsx";
import Footer from "./components/footer/Footer.jsx";
import AlbumPage from "./pages/playlistPage/AlbumPage.jsx";
import { refreshToken } from "./scripts/spotify-api.js";
import AuthedNav from "./components/authedNav/AuthedNav.jsx";

function App() {
  const [player, setPlayer] = useState(null);

  const expireDate = localStorage.getItem("expire_date");
  const refreshTokenValue = localStorage.getItem("refresh_token");
  const token = localStorage.getItem("token");
  const currentTime = new Date().getTime();

  console.log("expire ", parseInt(expireDate), "current ", currentTime);

  function getThePlayer(id, url) {
    console.log("player should be open, id: ", id);
    setPlayer(url);
    const player = document.getElementById("playlist-player");
    player.load();
    player.play();
  }

  if (
    refreshTokenValue === undefined ||
    refreshTokenValue === null ||
    isNaN(parseInt(expireDate)) ||
    token === undefined ||
    token === null
  ) {
    return (
      <Router>
        <div
          className="App"
          style={{
            backgroundColor: "#191A19",
            minHeight: "100vh",
          }}
        >
          <Switch>
            <Route path="/about">
              <AboutPage />
            </Route>
            <Route path="/">
              <LandingPage />
            </Route>
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  } else if (currentTime >= parseInt(expireDate)) {
    return refreshToken();
  } else {
    return (
      <Router>
        <div
          className="App"
          style={{
            backgroundColor: "#191A19",
            minHeight: "100vh",
          }}
        >
          <AuthedNav />
          <Switch>
            <Route path="/home">
              <AuthHome />
            </Route>
            <Route path="/playlist">
              <PlaylistPage player={getThePlayer} />
            </Route>
            <Route path="/artist/:id">
              <ArtistProfile player={getThePlayer} />
            </Route>
            <Route path="/user">
              <UserProfile />
            </Route>
            <Route path="/about">
              <AboutPage />
            </Route>
            <Route path="/settings">
              <SettingsPage />
            </Route>
            <Route path="/album">
              <AlbumPage player={getThePlayer} />
            </Route>
            <Route path="/">
              <AuthHome />
            </Route>
          </Switch>
          <Footer />
          {player !== null ? (
            <div
              style={{
                position: "fixed",
                bottom: "0px",
                height: "40px",
                width: "100%",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <audio controls id="playlist-player" style={{ flex: "20" }}>
                <source src={player} type="audio/mpeg" />
              </audio>
              <div
                onClick={() => setPlayer(null)}
                style={{
                  flex: "1",
                  fontSize: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                &#10006;
              </div>
            </div>
          ) : null}
        </div>
      </Router>
    );
  }

  /*  return (
    <Router>
      <div
        className="App"
        style={{
          backgroundColor: "#191A19",
          minHeight: "100vh",
        }}
      >
        {(currentTime >= parseInt(expireDate) &&
          refreshTokenValue !== undefined) ||
        isNaN(parseInt(expireDate)) ? null : (
          <AuthedNav />
        )}
        <Switch>
          <Route path="/home">
            <AuthHome />
          </Route>
          <Route path="/playlist">
            <PlaylistPage player={getThePlayer} />
          </Route>
          <Route path="/artist/:id">
            <ArtistProfile player={getThePlayer} />
          </Route>
          <Route path="/user">
            <UserProfile />
          </Route>
          <Route path="/about">
            <AboutPage />
          </Route>
          <Route path="/settings">
            <SettingsPage />
          </Route>
          <Route path="/album">
            <AlbumPage player={getThePlayer} />
          </Route>
          <Route path="/">
            {refreshTokenValue === undefined ||
            refreshTokenValue === null ||
            isNaN(parseInt(expireDate)) ||
            token === undefined ||
            token === null ? (
              <LandingPage />
            ) : currentTime >= parseInt(expireDate) ? (
              refreshToken()
            ) : (
              <AuthHome />
            )}
          </Route>
        </Switch>
        <Footer />
        {player !== null ? (
          <div
            style={{
              position: "fixed",
              bottom: "0px",
              height: "40px",
              width: "100%",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <audio controls id="playlist-player" style={{ flex: "20" }}>
              <source src={player} type="audio/mpeg" />
            </audio>
            <div
              onClick={() => setPlayer(null)}
              style={{
                flex: "1",
                fontSize: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              &#10006;
            </div>
          </div>
        ) : null}
      </div>
    </Router>
  );*/
}

export default App;
