const PORT = 8000;
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const queryString = require("query-string");
require("dotenv").config();

function generateRandomString(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const app = express();
const corsOptions = {
  methods: "GET,POST,PATCH,DELETE,OPTIONS",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.json("youre home");
});

app.get("/login", function (req, res) {
  var state = generateRandomString(16);
  var scope = "user-read-private user-read-email user-top-read";
  var url =
    "https://accounts.spotify.com/authorize?" +
    queryString.stringify({
      response_type: "code",
      client_id: process.env.REACT_APP_CLIENT_ID,
      scope: scope,
      redirect_uri: "http://localhost:3000/",
      state: state,
    });
  /*res.redirect(
    "https://accounts.spotify.com/authorize?" +
      queryString.stringify({
        response_type: "code",
        client_id: process.env.REACT_APP_CLIENT_ID,
        scope: scope,
        redirect_uri: "http://localhost:3000/",
        state: state,
      })
  );*/
  res.send({ url: url });
});

app.get("/callback", function (req, res) {
  var code = req.query.code || null;
  var state = req.query.state || null;

  if (state === null) {
    res.send("error");
    res.redirect(
      "/#" +
        queryString.stringify({
          error: "state_mismatch",
        })
    );
  } else {
    axios({
      method: "post",
      url: "https://accounts.spotify.com/api/token",
      headers: {
        Authorization:
          "Basic " +
          new Buffer.from(
            process.env.REACT_APP_CLIENT_ID +
              ":" +
              process.env.REACT_APP_CLIENT_SECRET
          ).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      params: {
        grant_type: "authorization_code",
        redirect_uri: "http://localhost:3000/",
        code: code,
      },
      json: true,
    })
      .then((body) => {
        const newDate = new Date();
        const expiredateMili = newDate.getTime() + body.data.expires_in * 1000;
        body.data.expire_date = expiredateMili;
        console.log(body.data);
        res.send(body.data);
      })
      .catch((e) => {
        res.send(e.response.data);
      });
  }
});

app.get("/refresh_token", function (req, res) {
  var refresh_token = req.query.refreshToken;
  console.log("refresh, ", refresh_token);
  axios({
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization:
        "Basic " +
        new Buffer.from(
          process.env.REACT_APP_CLIENT_ID +
            ":" +
            process.env.REACT_APP_CLIENT_SECRET
        ).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    params: {
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    },
    json: true,
  })
    .then((body) => {
      const newDate = new Date();
      const expiredateMili = newDate.getTime() + body.data.expires_in * 1000;
      body.data.expire_date = expiredateMili;
      console.log(body.data);
      res.send(body.data);
    })
    .catch((e) => {
      console.log(e.response.data);
    });
});

app.get("/top-tracks", function (req, res) {
  //console.log(req.query.access_token);
  var token = req.query.token;
  console.log("access_token", token);
  axios({
    method: "get",
    url: "https://api.spotify.com/v1/me/top/tracks",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      //console.log("response", response.data);
      res.send(response.data);
    })
    .catch((error) => {
      res.send(error);
    });
});

app.get("/me", function (req, res) {
  //console.log(req.query.access_token);
  var token = req.query.token;
  console.log("access_token", token);
  axios({
    method: "get",
    url: "https://api.spotify.com/v1/me",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      //console.log("response", response.data);
      res.send(response.data);
    })
    .catch((error) => {
      res.send(error);
    });
});

app.get("/userPlaylists", function (req, res) {
  //console.log(req.query.access_token);
  var token = req.query.token;
  console.log("access_token", token);
  axios({
    method: "get",
    url: "https://api.spotify.com/v1/me/playlists",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      //console.log("response", response.data);
      res.send(response.data);
    })
    .catch((error) => {
      res.send(error);
    });
});

app.get("/featuredPlaylists", function (req, res) {
  //console.log(req.query.access_token);
  var token = req.query.token;
  console.log("access_token", token);
  axios({
    method: "get",
    url: "https://api.spotify.com/v1/browse/featured-playlists",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      //console.log("response", response.data);
      res.send(response.data);
    })
    .catch((error) => {
      res.send(error);
    });
});

app.get("/playlist", function (req, res) {
  //console.log(req.query.access_token);
  var token = req.query.token;
  var id = req.query.id;
  console.log("id", id);
  axios({
    method: "get",
    url: `https://api.spotify.com/v1/playlists/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      //console.log("response playlist", response.data);
      res.send(response.data);
    })
    .catch((error) => {
      res.send(error);
    });
});

app.get("/artist", function (req, res) {
  //console.log(req.query.access_token);
  var token = req.query.token;
  var id = req.query.id;
  console.log("id", id);
  axios({
    method: "get",
    url: `https://api.spotify.com/v1/artists/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.send(error);
    });
});

app.get("/artistTopTracks", function (req, res) {
  //console.log(req.query.access_token);
  var token = req.query.token;
  var id = req.query.id;

  axios({
    method: "get",
    url: `https://api.spotify.com/v1/artists/${id}/top-tracks`,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    params: {
      market: "US",
    },
    json: true,
  })
    .then((response) => {
      //console.log("tracks playlist", response.data);
      res.send(response.data);
    })
    .catch((error) => {
      res.send(error);
    });
});

app.get("/artistAlbums", function (req, res) {
  //console.log(req.query.access_token);
  var token = req.query.token;
  var id = req.query.id;
  var offset = req.query.offset;
  axios({
    method: "get",
    url: `https://api.spotify.com/v1/artists/${id}/albums`,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    params: {
      include_groups: "album",
      limit: 50,
      market: "US",
      offset: offset,
    },
    json: true,
  })
    .then((response) => {
      //console.log("tracks playlist", response.data);
      res.send(response.data);
    })
    .catch((error) => {
      console.log("error getting albums");
      res.send(error);
    });
});

app.get("/album", function (req, res) {
  //console.log(req.query.access_token);
  var token = req.query.token;
  var id = req.query.id;
  axios({
    method: "get",
    url: `https://api.spotify.com/v1/albums/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    params: {
      market: "US",
    },
    json: true,
  })
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.send(error);
    });
});

/*app.get("/refresh_token", function (req, res) {
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization:
        "Basic " +
        new Buffer(client_id + ":" + client_secret).toString("base64"),
    },
    form: {
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    },
    json: true,
  };

  axios.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        access_token: access_token,
      });
    }
  });
});*/

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
