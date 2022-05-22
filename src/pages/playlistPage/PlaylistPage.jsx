import React, { useState } from "react";
import TrackListItem from "../../components/trackListItem/TrackListItem.jsx";
import { useLocation } from "react-router-dom";
import { getPlaylist } from "../../scripts/spotify-api.js";
import "../../style/playlist-album.css";

function PlaylistPage(props) {
  let location = useLocation();
  const [playlist, setPlaylist] = useState(null);

  const urlSearchParams = new URLSearchParams(location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  if (params.id !== undefined && playlist === null) {
    getPlaylist(setPlaylist, params.id);
    return <div>Loading playlist data...</div>;
  } else if (playlist !== null) {
    console.log("playlist ", playlist);
    const trackItems = playlist.tracks.items;
    return (
      <div>
        <div className="playlist-head">
          <div className="playlist-head-icon">
            <img
              className="playlist-image"
              src={playlist.images[1].url}
              alt={playlist.name}
            />
          </div>
          <div>
            <div id="playlist-head-title">
              <h1>{playlist.name}</h1>
            </div>
            <div className="playlist-head-info">
              <h3>{playlist.description}</h3>
            </div>
          </div>
        </div>
        <div className="playlist-body">
          <table className="playlist-table">
            <thead>
              <tr>
                <th className="table-index">#</th>
                <th>PLAY</th>
                <th>TITLE</th>
                <th>ARTIST</th>
              </tr>
            </thead>
            <tbody>
              {trackItems.map((track, index) => (
                <TrackListItem
                  key={track.track.id}
                  track={track}
                  player={props.player}
                  index={index + 1}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default PlaylistPage;
