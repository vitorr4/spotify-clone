import React, { useState, useEffect, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  getArtist,
  getArtistTopTracks,
  getArtistAlbums,
} from "../../scripts/spotify-api.js";
import TrackListItem from "../../components/trackListItem/TrackListItem.jsx";
import "../../style/artist.css";
import PlaylistIcon from "../../components/playlistIcon/PlaylistIcon.jsx";

function ArtistProfile(props) {
  let location = useLocation();
  let { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [artistTopTracks, setArtistTopTracks] = useState(null);
  const [artistAlbums, setArtistAlbums] = useState({
    total: null,
    limit: null,
    offset: null,
    items: [],
    called: false,
  });

  const urlSearchParams = new URLSearchParams(location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  function loadMoreAlbums(limit, offset) {
    const newOffset = limit + offset;
    getArtistAlbums(id, setArtistAlbums, newOffset);
  }

  const isFirstRun = useRef(id);
  useEffect(() => {
    if (isFirstRun.current === id) {
      return;
    }
    setArtistAlbums({
      total: null,
      limit: null,
      offset: null,
      items: [],
      called: false,
    });
    getArtist(id, setArtist);
    getArtistTopTracks(id, setArtistTopTracks);
    getArtistAlbums(id, setArtistAlbums, 0);
  }, [id]);

  if (
    (id !== "" || id !== undefined || id !== null) &&
    (artist === null ||
      artistTopTracks === null ||
      artistAlbums.items.length === 0)
  ) {
    if (artistTopTracks === null) {
      getArtistTopTracks(id, setArtistTopTracks);
    }
    if (artist === null) {
      getArtist(id, setArtist);
    }
    if (artistAlbums.called === false) {
      getArtistAlbums(id, setArtistAlbums, 0);
    }
    return <div>loading...</div>;
  } else if (
    artist !== null &&
    artistTopTracks !== null &&
    artistAlbums.items.length !== 0 &&
    artist !== true &&
    artistTopTracks !== true
  ) {
    return (
      <div>
        <div className="profile-header">
          <div>
            <img
              alt="Artist pictue"
              src={artist.images[1].url}
              class="profile-picture"
            />
          </div>
          <div className="profile-body">
            <h1>{artist.name}</h1>
            <table className="artist-info-table">
              <tbody>
                <tr>
                  <td>Followers:</td>
                  <td>{artist.followers.total.toLocaleString()}</td>
                </tr>
                <tr>
                  <td>Genres:</td>
                  <td>
                    {artist.genres.map((genre, index) => (
                      <span>
                        {genre}
                        {artist.genres.length - 1 !== index ? ", " : null}
                      </span>
                    ))}
                  </td>
                </tr>
                <tr>
                  <td>Spotify link:</td>
                  <td>
                    <a href={artist.external_urls.spotify}>
                      {artist.external_urls.spotify}
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <hr />
        <h2 className="section-header">Top Songs</h2>
        <div>
          <table className="top-songs-table">
            <thead>
              <tr>
                <th>#</th>
                <th>PLAY</th>
                <th>TITLE</th>
                <th>ARTISTS</th>
              </tr>
            </thead>
            <tbody>
              {artistTopTracks.tracks.map((track, index) => (
                <TrackListItem
                  key={track.id}
                  id={track.id}
                  name={track.name}
                  album={track.album}
                  artists={track.artists}
                  preview_url={track.preview_url}
                  player={props.player}
                  index={index + 1}
                  explicit={track.explicit}
                />
              ))}
            </tbody>
          </table>
        </div>
        <hr />
        <h2 className="section-header">Albums</h2>
        <div className="albums-grid">
          {artistAlbums.items.map((album, index) => (
            <PlaylistIcon
              key={album.id}
              playlistId={album.id}
              icon={album.images[1]}
              playlistName={album.name}
              description={album.description}
              album={true}
            />
          ))}
          {artistAlbums.limit + artistAlbums.offset < artistAlbums.total ? (
            <div
              onClick={() => {
                loadMoreAlbums(artistAlbums.limit, artistAlbums.offset);
              }}
            >
              More
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default ArtistProfile;
