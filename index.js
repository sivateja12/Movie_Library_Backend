const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = 'mongodb+srv://sivateja:123@cluster0.mbw48dj.mongodb.net/test?retryWrites=true&w=majority'; // Replace with your MongoDB connection string
mongoose.connect(uri);
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
