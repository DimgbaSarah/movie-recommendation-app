require('dotenv').config();
const mongoose = require('mongoose');
const Movie = require('./src/models/Movie');

const movies = [
  {
    title: "The Shawshank Redemption",
    genre: "Drama",
    year: 1994,
    description: "Two imprisoned men bond over a number of years...",
    poster: "https://m.media-amazon.com/images/I/51NiGlapXlL._AC_.jpg"
  },
  {
    title: "Inception",
    genre: "Sci-Fi",
    year: 2010,
    description: "A thief who steals corporate secrets through dream-sharing technology...",
    poster: "https://m.media-amazon.com/images/I/81p+xe8cbnL._AC_SY679_.jpg"
  }
  // Add more movies as needed
];

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    await Movie.deleteMany({});
    await Movie.insertMany(movies);
    console.log('Movies populated');
    mongoose.disconnect();
  })
  .catch(err => console.error(err));