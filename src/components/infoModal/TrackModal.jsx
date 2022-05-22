import React from "react";

function TrackModal(props) {
  return (
    <div id="track-modal">
      <div>{props.songInfo.releaseDate}</div>
      <div>{props.songInfo.features}</div>
      <div>{props.songInfo.plays}</div>
    </div>
  );
}

export default TrackModal;
