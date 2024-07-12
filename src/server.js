require("dotenv").config();
const express = require("express");
const { Sequelize } = require("sequelize");

const port = process.env.PORT || 5001;

const Book = require("./books/model");
const Author = require("./authors/model");

const bookRouter = require("./books/routes");
const authorRouter = require("./authors/routes");

const app = express();

app.use(express.json());

app.use("/books", bookRouter);
app.use("/authors", authorRouter);

const sequelize = new Sequelize(process.env.MYSQL_URI, {
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const syncTables = async () => {
  // Model.sync({alter: true})
  try {
    await sequelize.authenticate();
    console.log("Database connected...");

    Author.hasMany(Book, { foreignKey: "authorId" });
    Book.belongsTo(Author, { foreignKey: "authorId" });

    await Author.sync({ alter: true });
    await Book.sync({ alter: true });

    console.log("Models synchronized...");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
app.get("/health", (req, res) => {
  res.status(200).json({ message: "API is healthy" });
});

app.listen(port, () => {
  syncTables();
  console.log(`server is listening on port ${port}`);
});
