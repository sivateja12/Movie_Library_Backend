require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  "origin":"https://fasal-movie-library.vercel.app/",
    "methods":["GET","POST","DELETE","UPDATE"],
    "credentials":true,
}));
app.use(express.json());

mongoose.connect( process.env.MONGO_URL );
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

const userRouter = require('./routes/user');
const playlistRouter = require('./routes/playlist');

app.use('/users', userRouter);
app.use('/playlists', playlistRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
