const router = require('express').Router();
const Playlist = require('../models/playlist.model');

router.route('/:userId/:type').get(async (req, res) => {
  const { userId, type } = req.params;
  console.log(userId,type)

  console.log(`Fetching playlist for user: ${userId}, type: ${type}`);
  
  try {
    const playlist = await Playlist.findOne({ userId, type });
    if (!playlist) {
      console.log('Playlist not found');
      return res.status(404).json('Playlist not found');
    }
    console.log('Playlist found:', playlist);
    res.json(playlist.movies);
  } catch (error) {
    console.error('Error fetching playlist:', error);
    res.status(500).json('Internal Server Error');
  }
});

router.route('/:type').get(async (req, res) => {
  const { type } = req.params;
  console.log(type)

  console.log(`Fetching playlist for  type: ${type}`);
  
  try {
    const playlist = await Playlist.findOne({  type });
    if (!playlist) {
      console.log('Playlist not found');
      return res.status(404).json('Playlist not found');
    }
    console.log('Playlist found:', playlist);
    res.json(playlist.movies);
  } catch (error) {
    console.error('Error fetching playlist:', error);
    res.status(500).json('Internal Server Error');
  }
});

router.route('/add').post(async (req, res) => {
  const { userId, type, movie } = req.body;

  if (!userId || !type || !movie || !movie.imdbID) {
    return res.status(400).json('Missing required fields');
  }

  try {
    let playlist = await Playlist.findOne({ userId, type });
    if (!playlist) {
      playlist = new Playlist({ userId, type, movies: [movie.imdbID] });
    } else {
      playlist.movies.push(movie.imdbID);
    }

    await playlist.save();
    res.json('Movie added to playlist');
  } catch (err) {
    console.error('Error adding movie to playlist:', err);
    res.status(500).json('Internal Server Error');
  }
});

router.route('/delete').post(async (req, res) => {
  const { userId, type, movie } = req.body;

  if (!userId || !type || !movie || !movie.imdbID) {
    return res.status(400).json('Missing required fields');
  }

  try {
    const playlist = await Playlist.findOne({ userId, type });
    if (!playlist) {
      return res.status(404).json('Playlist not found');
    }

    playlist.movies = playlist.movies.filter(m => m !== movie.imdbID);

    await playlist.save();
    res.json('Movie deleted from playlist');
  } catch (err) {
    console.error('Error deleting movie from playlist:', err);
    res.status(500).json('Internal Server Error');
  }
});

module.exports = router;
