const { Router } = require("express");
const authorRouter = Router();

const { addAuthor, getAuthorAndBooks } = require("./controllers");

authorRouter.post("/addAuthor", addAuthor);
authorRouter.get("/getAuthorAndBooks/:authorName", getAuthorAndBooks);

module.exports = authorRouter;
