const Author = require("../authors/model");
const Book = require("..books/model");

Author.hasMany(nok, { foreignKey: "AuthorId" });
Book.belongsTo(Author, { foreignKey: "AuthorId" });

module.exports = { Author, Book };
