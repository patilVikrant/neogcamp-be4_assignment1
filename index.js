const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());

const { initializeDatabase } = require("./db/db.connect");
const Book = require("./models/book.models");
initializeDatabase();

// 1 & 2
async function createBook(newBook) {
  try {
    const book = new Book(newBook);
    const saveBook = await book.save();
    return saveBook;
  } catch (error) {
    throw error;
  }
}

app.post("/books", async (req, res) => {
  try {
    const savedBook = await createBook(req.body);
    res
      .status(201)
      .json({ message: "Book added successfully", book: savedBook });
  } catch (error) {
    res.status(500).json({ error: "Failed to add the book" });
  }
});

// 3
async function getAllBooks() {
  try {
    const books = await Book.find();
    return books;
  } catch (error) {
    console.log(error);
  }
}

app.get("/books", async (req, res) => {
  try {
    const books = await getAllBooks();
    if (books.length != 0) {
      res.json(books);
    } else {
      res.status(404).json({ error: "Books not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the Books" });
  }
});

// 4
async function getBookByTitle(bookTitle) {
  try {
    const book = await Book.findOne({ title: bookTitle });
    return book;
  } catch (error) {
    console.log(error);
  }
}

app.get("/books/:bookTitle", async (req, res) => {
  try {
    const book = await getBookByTitle(req.params.bookTitle);
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the book" });
  }
});

// 5
async function getBooksByAuthor(author) {
  try {
    const books = await Book.find({ author: author });
    return books;
  } catch (error) {
    console.log(error);
  }
}

app.get("/books/author/:authorName", async (req, res) => {
  try {
    const books = await getBooksByAuthor(req.params.authorName);
    if (books.length != 0) {
      res.json(books);
    } else {
      res.status(404).json({ error: "Books not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

// 6
async function getBooksByGenre(genre) {
  try {
    const books = await Book.find({ genre: genre });
    return books;
  } catch (error) {
    console.log(error);
  }
}

app.get("/books/genre/:bookGenre", async (req, res) => {
  try {
    const books = await getBooksByGenre(req.params.bookGenre);
    if (books.length != 0) {
      res.json(books);
    } else {
      res.status(404).json({ error: "Books not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

// 7
async function getBooksByYear(year) {
  try {
    const books = await Book.find({ publishedYear: year });
    return books;
  } catch (error) {
    console.log(error);
  }
}

app.get("/books/publishedYear/:year", async (req, res) => {
  try {
    const books = await getBooksByYear(req.params.year);
    if (books.length != 0) {
      res.json(books);
    } else {
      res.status(404).json({ error: "Books not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

// 8
async function updateBookById(bookId, dataToUpdate) {
  try {
    const updatedBook = await Book.findByIdAndUpdate(bookId, dataToUpdate, {
      new: true,
    });
    return updatedBook;
  } catch (error) {
    console.log("Error in updating book", error);
  }
}

app.post("/books/:bookId", async (req, res) => {
  try {
    const updatedBook = await updateBookById(req.params.bookId, req.body);
    if (updatedBook) {
      res.status(200).json({
        message: "Book updated successfully",
        updatedBook: updatedBook,
      });
    } else {
      res.status(404).json({ error: "Book does not exist" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update book" });
  }
});

// 9
async function updateBookByTitle(title, dataToUpdate) {
  try {
    const updatedBook = await Book.findOneAndUpdate(
      { title: title },
      dataToUpdate,
      {
        new: true,
      }
    );
    return updatedBook;
  } catch (error) {
    console.log("Error in updating book", error);
  }
}

app.post("/books/title/:bookTitle", async (req, res) => {
  try {
    const updatedBook = await updateBookByTitle(req.params.bookTitle, req.body);
    if (updatedBook) {
      res.status(200).json({
        message: "Book updated successfully",
        updatedBook: updatedBook,
      });
    } else {
      res.status(404).json({ error: "Book does not exist" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update book" });
  }
});

// 10
async function deleteBook(bookId) {
  try {
    const deletedBook = await Book.findByIdAndDelete(bookId);
    return deletedBook;
  } catch (error) {
    console.log(error);
  }
}

app.delete("/books/:bookId", async (req, res) => {
  try {
    const deletedBook = await deleteBook(req.params.bookId);
    if (deletedBook) {
      res.status(200).json({
        message: "Book deleted successfully",
        deletedBook: deletedBook,
      });
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the book" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
