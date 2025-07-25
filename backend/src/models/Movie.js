const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: String,
  year: Number,
  description: String,
  poster: String
});

module.exports = mongoose.model('Movie', movieSchema);