import React from "react";

function ArtistIcon(props) {
  return (
    <div id={`artist-icon-${props.id}`}>
      <div>Pic. - {props.artistPic}</div>
      <div>Name - {props.artist}</div>
    </div>
  );
}

export default ArtistIcon;
