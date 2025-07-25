const express = require('express');
const User = require('../models/User');

const router = express.Router();

// Get all users (for admin/testing)
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
