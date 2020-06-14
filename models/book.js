"use strict";
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define(
    "Book",
    {
      title: DataTypes.STRING,
    },
    {}
  );
  Book.associate = function (models) {
    // associations can be defined here
    Book.hasMany(models.BookComment, {
      onDelete: "cascade",
      foreignKey: "bookId",
    });
    Book.belongsTo(models.User, {
      foreignKey: "userId",
    });
  };
  return Book;
};
