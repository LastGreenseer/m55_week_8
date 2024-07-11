const { Router } = require("express");
const bookRouter = Router();

const { addBook, getAllBooks, deleteBook, dynamicUpdate, getOneByTitle } = require("./controllers");

// http://localhost:5001/books/test
bookRouter.get("/test", async (req, res) => {
  res.status(200).json({ message: "test a okay!" });
});

// http://localhost:5001/books/awesome
bookRouter.get("/awesome", async (req, res) => {
  res.status(200).json({ message: "test a okay!" });
});

// http://localhost5001/books/addBook
bookRouter.post("/addBook", addBook);

bookRouter.get("/getAllBooks", getAllBooks);

bookRouter.delete("/deleteBook", deleteBook);

bookRouter.put("/dynamicUpdate", dynamicUpdate)

bookRouter.get("/getOneByTitle/:title", getOneByTitle  )



module.exports = bookRouter;
