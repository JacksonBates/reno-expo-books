const path = require("path");
const verifySignUp = require("./verifySignUp");
const authJwt = require("./verifyJwtToken");

module.exports = function (app) {
  const controller = require("../controller/controller.js");
  const booksController = require("../controller/booksController");

  app.post(
    "/api/auth/signup",
    [verifySignUp.checkDuplicateUserNameOrEmail],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);

  app.get("/api/test/user", [authJwt.verifyToken], controller.userContent);

  // freeCodeCamp Personal Library API endpoints

  app.get("/api/books", booksController.getBooks);
  app.get("/api/books/:id", booksController.getBook);
  app.post("/api/books", booksController.postBook);
  app.post("/api/books/:id", booksController.postComment);
  app.delete("/api/books", booksController.deleteBooks);
  app.delete("/api/books/:id", booksController.deleteBook);

  //TODO: create the remaining controller actions

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
  });
};
