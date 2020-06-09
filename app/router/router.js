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
  // app.get("/api/books/{id}", controller.getBook);
  app.post("/api/books", booksController.postBook);
  // app.post("/api/books/{id}", controller.postComment);
  app.delete("/api/books", booksController.deleteBooks);
  // app.delete("/api/books/{id}", controller.deleteBook);

  //TODO: create the controller actions (maybe in bookController?)
  // and the migrations necessary to store the books and comments

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
  });
};
