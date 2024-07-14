const Book = require("./model");

const addBook = async (req, res) => {
  console.log("req.body: ", req.body);
  try {
    // const book = await Book.create({
    //   title: req.body.title,
    //   author: req.body.author,
    //   genre: req.body.genre,
    // });

    const book = await Book.create(req.body);

    res.status(201).json({ message: "success", book: book });
  } catch (error) {
    res.status(501).json({ message: error.message, error: error });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();

    res.status(201).json({ message: "success", books: books });
  } catch (error) {
    res.status(501).json({ message: error.message, error: error });
  }
};

// const getBooksByAuthor = async (req, res) => {};

//Find a book by its title and dynamically update its key values
const dynamicUpdate = async (req, res) => {
  const { title, author, genre } = req.body;

  try {
    if (!title) {
      return res.status(400).json({ message: "A title is required" });
    }

    const [oldTitle, newTitle] = title;

    const book = await Book.findOne({ where: { title: oldTitle } });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (newTitle) book.title = newTitle;

    if (author) {
      const [oldAuthor, newAuthor] = author;
      book.author = newAuthor;
    }

    if (genre) {
      const [oldGenre, newGenre] = genre;
      book.genre = newGenre;
    }

    await book.save();

    res.status(200).json({ message: "Book updated!", book });
  } catch (error) {
    res.status(501).json({ message: error.message, error: error });
  }
};

//Delete a book by its title
const deleteBook = async (req, res) => {
  const { title } = req.body;

  try {
    const deleted = await Book.destroy({
      where: { title: title },
    });

    if (!deleted) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: 'success' });
  } catch (error) {
    res.status(501).json({ message: error.message, error: error });
  }
};

//Delete all books
const deleteAllBooks = async (reg, res) => {
  try {
    await Book.destroy({
      where: {},
      truncate: true,
    });

    res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

const getOneByTitle = async (req, res) => {
  const title = req.params.title;

  const book = await Book.findOne({ where: { title: title } });

  res.status(200).json({ message: "book found", book: book });
};

const getOneByAuthor = async (req, res) => {
  const authorName = req.params.author;

  try {
    const author = await Book.findOne({
      where: { author: authorName },
    });

    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }

    res.status(200).json({ message: "Success", author: author });
  } catch (error) {
    res.status(501).json({ message: error.message, error: error });
  }
};

module.exports = {
  addBook: addBook,
  getAllBooks: getAllBooks,
  deleteBook: deleteBook,
  deleteAllBooks: deleteAllBooks,
  dynamicUpdate: dynamicUpdate,
  getBooksByAuthor: getBooksByAuthor,
  getOneByTitle: getOneByTitle,
  getOneByAuthor: getOneByAuthor,
};
