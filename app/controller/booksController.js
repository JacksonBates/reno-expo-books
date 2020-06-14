const db = require("../../models/index");
const Sequelize = require("sequelize");
const User = db.User;
const Book = db.Book;
const BookComment = db.BookComment;

// Public routes

exports.getBooks = (req, res) => {
  Book.findAll({
    where: { userId: null },
    attributes: {
      include: [
        [
          Sequelize.fn("COUNT", Sequelize.col("BookComments.id")),
          "commentcount",
        ],
      ],
      exclude: ["createdAt", "updatedAt"],
    },
    include: {
      model: BookComment,
      attributes: [],
    },
    group: ["Book.id"],
  })
    .then((data) => res.status(200).json(data))
    .catch((error) => res.send(error));
};

exports.getBook = (req, res) => {
  Book.findByPk(req.params.id, {
    attributes: { exclude: ["createdAt", "updatedAt"] },
    include: {
      model: BookComment,
      attributes: { exclude: ["createdAt", "updatedAt"] },
    },
  })
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

exports.postComment = (req, res) => {
  BookComment.create({
    comment: req.body.comment,
    bookId: req.params.id,
  }).then((data) => {
    Book.findByPk(data.bookId, {
      include: {
        model: BookComment,
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    })
      .then((data) => res.status(200).json(data))
      .catch((error) => res.send(error));
  });
};

exports.deleteBooks = (req, res) => {
  Book.destroy({ where: { userId: null } }).then((item) =>
    res.send("complete delete successful")
  );
};

exports.deleteBook = (req, res) => {
  Book.destroy({ where: { id: req.params.id } })
    .then((item) => res.send("delete successful"))
    .catch((error) => res.send(error));
};

// Protected Routes

exports.getUserBooks = (req, res) => {
  Book.findAll({
    where: { userId: req.userId },
    attributes: {
      include: [
        [
          Sequelize.fn("COUNT", Sequelize.col("BookComments.id")),
          "commentcount",
        ],
      ],
      exclude: ["createdAt", "updatedAt"],
    },
    include: {
      model: BookComment,
      attributes: [],
    },
    group: ["Book.id"],
  })
    .then((data) => res.status(200).json(data))
    .catch((error) => res.send(error));
};

exports.getUserBook = (req, res) => {
  Book.findOne({
    where: { id: req.params.id, userId: req.userId },
    attributes: { exclude: ["createdAt", "updatedAt"] },
    include: {
      model: BookComment,
      attributes: { exclude: ["createdAt", "updatedAt"] },
    },
  })
    .then((data) => res.status(200).json(data))
    .catch((error) => res.send(error));
};

exports.postUserBook = (req, res) => {
  Book.create({ title: req.body.title, userId: req.userId })
    .then((book) => {
      res
        .status(200)
        .json({ id: book.id, userId: req.userId, title: book.title });
    })
    .catch((error) => {
      res.send(error);
    });
};

exports.postUserComment = (req, res) => {
  BookComment.create({
    comment: req.body.comment,
    bookId: req.params.id,
  }).then((data) => {
    Book.findByPk(data.bookId, {
      include: {
        model: BookComment,
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    })
      .then((data) => res.status(200).json(data))
      .catch((error) => res.send(error));
  });
};

exports.deleteUserBooks = (req, res) => {
  Book.destroy({ where: { userId: req.userId } }).then((item) =>
    res.send("complete delete successful")
  );
};

exports.deleteUserBook = (req, res) => {
  Book.destroy({ where: { id: req.params.id, userId: req.userId } })
    .then((item) => res.send("delete successful"))
    .catch((error) => res.send(error));
};
