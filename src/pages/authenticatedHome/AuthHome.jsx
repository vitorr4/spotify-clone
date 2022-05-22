import React, { useState } from "react";
import PlaylistIcon from "../../components/playlistIcon/PlaylistIcon.jsx";
import {
  getTopSongs,
  getUserPlaylists,
  //getFeaturedPlaylists,
} from "../../scripts/spotify-api.js";
import "../../style/home.css";

function AuthHome() {
  const [topSongs, setTopSongs] = useState(null);
  const [userPlaylists, setUserPlaylists] = useState(null);
  //const [featuredPlaylists, setFeaturedPlaylists] = useState(null);

  if (topSongs === null && userPlaylists === null) {
    getTopSongs(setTopSongs);
    getUserPlaylists(setUserPlaylists);
    return <div>loading top songs...</div>;
  } else if (topSongs !== null && userPlaylists !== null) {
    const playlistsItems = userPlaylists.items;
    return (
      <>
        <h3 className="page-title">Your Playlists</h3>
        <div className="playlist-grid">
          <PlaylistIcon playlistId="top_songs" playlistName="Your Top Songs" />
          {playlistsItems.map((playlist) => (
            <PlaylistIcon
              key={playlist.id}
              playlistId={playlist.id}
              icon={playlist.images[1]}
              playlistName={playlist.name}
              description={playlist.description}
            />
          ))}
        </div>
      </>
    );
  }
}

export default AuthHome;
