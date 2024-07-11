const { DataTypes } = require("sequelize");

const sequelize = require("../db/connection");

const Author = sequelize.define(
  "Author",
  {
    authorName: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: false }
);

module.exports = Author;
