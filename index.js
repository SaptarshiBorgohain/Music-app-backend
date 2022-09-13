require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const connection = require("./db");
const userRoutes = require("./routes/users");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const songsRoutes = require("./routes/songs");
const playlistsRoutes = require("./routes/playlist");
const searchRoutes = require("./routes/search");



connection() 
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/login", authRoutes);
app.use("/api/songs", songsRoutes);
app.use("/api/playlists", playlistsRoutes);
app.use("/api/search", searchRoutes);



const port = process.env.PORT || 8080;
app.listen(port, console.log('Listening on port ' + port));

// qwerty
// Rohan@kiit23