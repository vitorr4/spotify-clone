import React from "react";
import { Link } from "react-router-dom";
import "../../style/icon-box.css";

function PlaylistIcon(props) {
  //<a href="https://www.vecteezy.com/free-png/music-notes">Music Notes PNGs by Vecteezy</a>
  //<img className="icon-picture" src="music-note.png" alt="none" />

  return (
    <Link
      className="icon-link"
      to={{
        pathname: props.album ? "/album" : "/playlist",
        search: `id=${props.playlistId}`,
      }}
    >
      <div id={`playlist-icon-${props.playlistId}`} className="playlist-icon">
        <div>
          {props.icon !== undefined ? (
            <img
              className="icon-picture"
              src={props.icon.url}
              alt={props.playlistName}
            />
          ) : (
            <div className="icon-default-symbol">&#119136;</div>
          )}
        </div>
        <div className="icon-name" title={props.playlistName}>
          {props.playlistName}
        </div>
        <div className="icon-description" title={props.description}>
          {props.description}
        </div>
      </div>
    </Link>
  );
}

export default PlaylistIcon;
