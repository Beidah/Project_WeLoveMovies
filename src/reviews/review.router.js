const router = require("express").Router();
const controller = require("./review.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
  .route("/:reviewId")
  .put(controller.update)
  .all(methodNotAllowed);

module.exports = router;