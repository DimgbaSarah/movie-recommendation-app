const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const Review = require('../models/Review');
const auth = require('../middleware/auth');

// Get all movies
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new movie
router.post('/', async (req, res) => {
  const movie = new Movie({
    title: req.body.title,
    genre: req.body.genre,
    year: req.body.year,
    description: req.body.description,
    poster: req.body.poster,
  });
  try {
    const newMovie = await movie.save();
    res.status(201).json(newMovie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get recommended movies for the logged-in user
router.get('/recommendations', auth, async (req, res) => {
  try {
    // Find all movie IDs the user has reviewed
    const userReviews = await Review.find({ user: req.user.userId }).select('movie');
    const reviewedMovieIds = userReviews.map(r => r.movie);

    // Find movies the user hasn't reviewed yet
    const unreviewedMovies = await Movie.find({ _id: { $nin: reviewedMovieIds } });
    
    // Pick up to 5 random movies
    const shuffled = unreviewedMovies.sort(() => 0.5 - Math.random());
    const recommendations = shuffled.slice(0, 5);

    res.json(recommendations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;