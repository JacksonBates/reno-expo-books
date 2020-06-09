const db = require("../../models/index");
const User = db.User;
const Book = db.Book;
const BookComment = db.BookComment;

exports.getBooks = (req, res) => {
  Book.findAll({ attributes: { exclude: ["createdAt", "updatedAt"] } })
    .then((data) => res.status(200).json(data))
    .catch((error) => res.send(error));
};

exports.postBook = (req, res) => {
  Book.create({ title: req.body.title })
    .then((book) => {
      res.status(200).json({ id: book.id, title: book.title });
    })
    .catch((error) => {
      res.send(error);
    });
};

exports.deleteBooks = (req, res) => {
  Book.destroy({ where: {} }).then((item) =>
    res.send("complete delete successful")
  );
};
