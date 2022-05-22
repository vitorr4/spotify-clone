import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { getAlbum } from "../../scripts/spotify-api.js";
import TrackListItem from "../../components/trackListItem/TrackListItem.jsx";
import "../../style/playlist-album.css";

function AlbumPage(props) {
  let location = useLocation();
  const [album, setAlbum] = useState(null);

  const urlSearchParams = new URLSearchParams(location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  if (params.id !== null && params.id !== undefined && album === null) {
    getAlbum(params.id, setAlbum);
    return <div>Loading album...</div>;
  } else if (album !== null) {
    console.log("album page, ", album);
    return (
      <div>
        <div className="playlist-head">
          <div className="playlist-head-icon">
            <img
              className="playlist-image"
              src={album.images[1].url}
              alt={album.name}
            />
          </div>
          <div>
            <div id="playlist-head-title">
              <h1>{album.name}</h1>
            </div>
            <div className="playlist-head-info">
              <div>
                {album.album_type} | {album.release_date} | {album.total_tracks}{" "}
                tracks
              </div>
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
              {album.tracks.items.map((track, index) => (
                <TrackListItem
                  key={track.id}
                  preview_url={track.preview_url}
                  //player={props.player}
                  album={album}
                  artists={track.artists}
                  name={track.name}
                  player={props.player}
                  explicit={track.explicit}
                  index={index + 1}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return <div>Album Page</div>;
}

export default AlbumPage;
