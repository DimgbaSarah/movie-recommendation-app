const express = require('express');
const Review = require('../models/Review');
const Movie = require('../models/Movie');
const auth = require('../middleware/auth');

const router = express.Router();

// Add review
router.post('/:movieId', auth, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const review = new Review({
      user: req.user.userId,
      movie: req.params.movieId,
      rating,
      comment
    });
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get reviews for a movie
router.get('/:movieId', async (req, res) => {
  try {
    const reviews = await Review.find({ movie: req.params.movieId }).populate('user', 'username');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
