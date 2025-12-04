const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  author: {
    type: String,
  },
  publishedYear: {
    type: Number,
  },
  genre: [
    {
      type: String,
    },
  ],
  language: {
    type: String,
  },
  country: {
    type: String,
  },
  rating: {
    type: Number,
  },
  summary: {
    type: String,
  },
  coverImageUrl: {
    type: String,
  },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
