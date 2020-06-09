"use strict";
module.exports = (sequelize, DataTypes) => {
  const BookComment = sequelize.define(
    "BookComment",
    {
      comment: DataTypes.TEXT,
    },
    {}
  );
  BookComment.associate = function (models) {
    // associations can be defined here
    BookComment.belongsTo(models.Book);
  };
  return BookComment;
};
