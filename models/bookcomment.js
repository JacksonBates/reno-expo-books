"use strict";
module.exports = (sequelize, DataTypes) => {
  const BookComment = sequelize.define(
    "BookComment",
    {
      comment: DataTypes.TEXT,
      bookId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Books",
          key: "id",
        },
      },
    },
    {}
  );
  BookComment.associate = function (models) {
    // associations can be defined here
    BookComment.belongsTo(models.Book, {
      foreignKey: "bookId",
    });
  };
  return BookComment;
};
