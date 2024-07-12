const Author = require("./model");
const Book = require("../books/model");

const addAuthor = async (req, res) => {
  try {
    const author = await Author.create(req.body);

    res.status(201).json({ message: "success", author: author });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

const getOneByAuthor = async (req, res) => {
  const authorName = req.params.author;

  try {
    const author = await Author.findOne({
      where: { authorName: authorName },
      include: Book,
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
  addAuthor: addAuthor,
  getOneByAuthor: getOneByAuthor,
};
