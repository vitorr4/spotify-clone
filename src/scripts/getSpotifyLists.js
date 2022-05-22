const userPlaylists = [
  {
    name: "Top Global 2022",
    icon: "uri:1:spotify",
    description: "Top songs around the globe",
  },
  {
    name: "70s Smash Hits",
    icon: "uri:2:spotify",
    description: "A spring cleaning must-have",
  },
  {
    name: "Tastebreakers",
    icon: "uri:3:spotify",
    description: "Go beyond, discover new music",
  },
];

function getPLaylists() {
  userPlaylists.push({
    name: "[user_name] favorite songs",
    icon: "uri:4:spotify",
    description: "What has been in your ears",
  });

  userPlaylists.forEach((element, index) => {
    element.key = index;
  });
  //console.log(userPlaylists);

  return userPlaylists;
}

const mostListenedArtists = [
  { artist: "Anderson .Paak", artistPic: "uri:1:spotify" },
  { artist: "BADBADNOTGOOD", artistPic: "uri:2:spotify" },
  { artist: "Jorge Ben Jor", artistPic: "uri:3:spotify" },
  { artist: "Mac Miller", artistPic: "uri:4:spotify" },
];

function getMostListenedArtists() {
  mostListenedArtists.forEach((artistData, artistIndex) => {
    artistData.key = artistIndex;
  });
  console.log(mostListenedArtists);

  return mostListenedArtists;
}

const artistTopSongs = [
  {
    song: "Heroes Remastered 2011",
    songIcon: "heroes_icon",
    songInfo: {
      releaseDate: "10/1972",
      features: "David, Bowie",
      plays: "325,000,000",
    },
  },
  {
    song: "Starman",
    songIcon: "starman_icon",
    songInfo: {
      releaseDate: "03/1984",
      features: "David, Bowie",
      plays: "95,000,000",
    },
  },
  {
    song: "Rebel Rebel",
    songIcon: "rebel_rebel_icon",
    songInfo: {
      releaseDate: "11/1977",
      features: "David, Bowie",
      plays: "123,000,000",
    },
  },
  {
    song: "Space Oddity",
    songIcon: "space_oddity_icon",
    songInfo: {
      releaseDate: "12/1969",
      features: "David, Bowie",
      plays: "62,000,000",
    },
  },
];

function getArtistTopSongs(artistId, numOfSongs) {
  artistTopSongs.forEach((songElment, songIndex) => {
    songElment.key = songIndex;
  });

  return artistTopSongs;
}

export { getPLaylists, getMostListenedArtists, getArtistTopSongs };
