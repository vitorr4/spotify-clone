import React from "react";
import { Link } from "react-router-dom";
//import { showTrackInfoModal } from "../../scripts/state.js";

function TrackListItem(props) {
  function displayArtistsNames() {
    if (props.track !== undefined && props.track !== null) {
      return props.track.track.artists.map((artist, index) => (
        <Link
          className="playlist-artist-link"
          to={{
            pathname: `/artist/${artist.id}`,
            // search: `id=${artist.id}`,
          }}
        >
          <span className="playlist-artist-name">{artist.name}</span>
          {props.track.track.artists.length - 1 !== index ? ", " : null}
        </Link>
      ));
    } else {
      return props.artists.map((artist, index) => (
        <Link
          className="playlist-artist-link"
          to={{
            pathname: `/artist/${artist.id}`,
            //search: `id=${artist.id}`,
          }}
        >
          <span className="playlist-artist-name">{artist.name}</span>
          {props.artists.length - 1 !== index ? ", " : null}
        </Link>
      ));
    }
  }

  return (
    <tr>
      <td className="table-index">{props.index ? props.index : "-"}</td>
      <td className="playlist-picture-container">
        {props.track ? (
          <div className="playlist-picture-button-container">
            <img
              className="playlist-picture"
              src={props.track.track.album.images[2].url}
              alt="album cover"
            />
            <div
              className="playlist-play-btn"
              onClick={() =>
                props.player(
                  props.track ? props.track.track.id : props.id,
                  props.track
                    ? props.track.track.preview_url
                    : props.preview_url
                )
              }
            >
              &#9654;
            </div>
          </div>
        ) : (
          <div
            className="album-player-btn"
            onClick={() =>
              props.player(
                props.track ? props.track.track.id : props.id,
                props.track ? props.track.track.preview_url : props.preview_url
              )
            }
          >
            &#9654;
          </div>
        )}
      </td>
      <td>
        <div>{props.track ? props.track.track.name : props.name}</div>
        <div className="playlist-song-details">
          <div>
            {props.track ? (
              props.track.track.explicit ? (
                <div className="playlist-explicit-song">E</div>
              ) : null
            ) : props.explicit ? (
              <div className="playlist-explicit-song">E</div>
            ) : null}
          </div>
          <div className="playlist-album-name">
            <Link
              className="icon-link"
              to={{
                pathname: "/album",
                search: `id=${props.track ? props.track.track.album.id : null}`,
              }}
            >
              {props.track ? props.track.track.album.name : null}
            </Link>
          </div>
        </div>
      </td>
      <td>{displayArtistsNames()}</td>
    </tr>
  );
}

export default TrackListItem;
