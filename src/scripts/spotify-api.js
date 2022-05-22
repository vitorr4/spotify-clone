import axios from "axios";

let myurl;

function requestAuth() {
  return axios({
    method: "get",
    url: "http://localhost:8000/login",
    header: { "Contet-Type": "application/x-www-form-urlencoded" },
  })
    .then((response) => {
      //url = response;
      //setTokenUrl(response.data.url);
      window.location.replace(response.data.url);
    })
    .catch((error) => {
      myurl = error;
    });
}

function requestToken(code, state, setToken) {
  axios({
    method: "get",
    url: `http://localhost:8000/callback?code=${code}&state=${state}`,
    header: { "Contet-Type": "application/x-www-form-urlencoded" },
  }).then((response) => {
    console.log("token callback", response.data);
    setToken(response.data.access_token);
    localStorage.setItem("token", response.data.access_token);
    localStorage.setItem("refresh_token", response.data.refresh_token);
    localStorage.setItem("expire_date", response.data.expire_date);
    window.location.replace("http://localhost:3000/");
  });
}

function refreshToken() {
  const refreshToken = localStorage.getItem("refresh_token");
  console.log("refresh", refreshToken);
  axios({
    method: "get",
    url: `http://localhost:8000/refresh_token?refreshToken=${refreshToken}`,
  }).then((response) => {
    console.log("token callback", response.data);
    localStorage.setItem("token", response.data.access_token);
    localStorage.setItem("expire_date", response.data.expire_date);
  });
}

function logOut() {
  localStorage.removeItem("token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("expire_date");
  window.location.replace("http://localhost:3000/");
}

function getUrl() {
  requestAuth();
  console.log(myurl);
}

function getTopSongs(setTopSongs) {
  /*axios({
    method: "get",
    url: "http://localhost:8000/top-tracks",
    params: { access_token: accessToken },
  });*/
  const accessToken = localStorage.getItem("token");
  axios({
    method: "get",
    url: `http://localhost:8000/top-tracks?token=${accessToken}`,
  })
    .then((response) => {
      console.log("top response", response);
      setTopSongs(response.data);
    })
    .catch((e) => {
      console.log("top error", e);
    });
}

function getUserProfile(setUserProfile) {
  const accessToken = localStorage.getItem("token");
  axios({
    method: "get",
    url: `http://localhost:8000/me?token=${accessToken}`,
  })
    .then((response) => {
      console.log("me response", response.data);
      setUserProfile(response.data);
    })
    .catch((e) => {
      console.log("me error", e);
    });
}

function getUserPlaylists(setUserPlaylists) {
  const accessToken = localStorage.getItem("token");
  axios({
    method: "get",
    url: `http://localhost:8000/userPlaylists?token=${accessToken}`,
  })
    .then((response) => {
      setUserPlaylists(response.data);
      console.log("playlists response", response.data);
      //setUserProfile(response.data);
    })
    .catch((e) => {
      console.log("playlists error", e);
    });
}

function getFeaturedPlaylists(setFeaturedPlaylists) {
  const accessToken = localStorage.getItem("token");
  axios({
    method: "get",
    url: `http://localhost:8000/featuredPlaylists?token=${accessToken}`,
  })
    .then((response) => {
      setFeaturedPlaylists(response.data);
      console.log("playlists response", response.data);
      //setUserProfile(response.data);
    })
    .catch((e) => {
      console.log("playlists error", e);
    });
}

function getPlaylist(setPlaylist, playlistId) {
  const accessToken = localStorage.getItem("token");
  axios({
    method: "get",
    url: `http://localhost:8000/playlist?token=${accessToken}&id=${playlistId}`,
  })
    .then((response) => {
      setPlaylist(response.data);
      console.log("playlists response", response.data);
      //setUserProfile(response.data);
    })
    .catch((e) => {
      console.log("playlists error", e);
    });
}

function getArtist(artistId, setArtist) {
  setArtist(true);
  const accessToken = localStorage.getItem("token");
  axios({
    method: "get",
    url: `http://localhost:8000/artist?token=${accessToken}&id=${artistId}`,
  })
    .then((response) => {
      setArtist(response.data);
      console.log("artist response", response.data);
      //setUserProfile(response.data);
    })
    .catch((e) => {
      console.log("artist error", e);
    });
}

function getArtistTopTracks(artistId, setArtistTracks) {
  setArtistTracks(true);
  const accessToken = localStorage.getItem("token");
  axios({
    method: "get",
    url: `http://localhost:8000/artistTopTracks?token=${accessToken}&id=${artistId}`,
  })
    .then((response) => {
      setArtistTracks(response.data);
      console.log("top tracks response", response.data);
      //setUserProfile(response.data);
    })
    .catch((e) => {
      setArtistTracks(e);
      console.log("artist error", e);
    });
}

function getArtistAlbums(artistId, setArtistAlbums, offset) {
  const accessToken = localStorage.getItem("token");
  setArtistAlbums((albums) => ({ ...albums, called: true }));
  axios({
    method: "get",
    url: `http://localhost:8000/artistAlbums?token=${accessToken}&id=${artistId}&offset=${offset}`,
  })
    .then((response) => {
      setArtistAlbums((albums) => ({
        total: response.data.total,
        limit: response.data.limit,
        offset: response.data.offset,
        items: [...albums.items, ...response.data.items],
      }));
      console.log("artist albums response", response.data);
      //setUserProfile(response.data);
    })
    .catch((e) => {
      setArtistAlbums(e);
      console.log("albums error", e);
    });
}

function getAlbum(albumId, setArtistAlbums) {
  const accessToken = localStorage.getItem("token");

  axios({
    method: "get",
    url: `http://localhost:8000/album?token=${accessToken}&id=${albumId}`,
  })
    .then((response) => {
      setArtistAlbums(response.data);
      console.log("album", response.data);
      //setUserProfile(response.data);
    })
    .catch((e) => {
      setArtistAlbums(e);
      console.log("album error", e);
    });
}

export {
  getUrl,
  requestToken,
  getTopSongs,
  getUserProfile,
  getUserPlaylists,
  getFeaturedPlaylists,
  getPlaylist,
  getArtist,
  getArtistTopTracks,
  getArtistAlbums,
  getAlbum,
  refreshToken,
  logOut,
};
