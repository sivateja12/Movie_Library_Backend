// const mongoose = require('mongoose');

// const Schema = mongoose.Schema;

// const playlistSchema = new Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   type: { type: String, enum: ['public', 'private'], required: true },
//   movies: [{ type: String }],
// }, {
//   timestamps: true,
// });

// const Playlist = mongoose.model('Playlist', playlistSchema);

// module.exports = Playlist;
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const playlistSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['public', 'private'], required: true },
  movies: [{ type: String }],
}, {
  timestamps: true,
});

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;
