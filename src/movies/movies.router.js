const router = require("express").Router();
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

const theaterRouter = require("../theaters/theaters.router");

router.use("/:movieId/theaters", theaterRouter);

router
  .route("/:movieId/reviews")
  .get(controller.reviews)
  .all(methodNotAllowed);

router
  .route("/:movieId")
  .get(controller.read)
  .all(methodNotAllowed);

router
  .route("/")
  .get(controller.list)
  .all(methodNotAllowed);

module.exports = router;