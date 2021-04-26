const service = require("./reviews.service");

// Middlewares

function reviewExists(req, res, next) {
  const review_id = Number(req.params.reviewId);
  service
    .read(review_id)
    .then(data => {
      if (data) {
        res.locals.review = data;
        return next();
      }
      next({
        status: 404,
        message: `Review cannot be found: ${review_id}`
      });
    })
    .catch(next);
}

// Routes

function update(req, res, next) {
  const updatedReview = {
    ...req.body.data,
    review_id: res.locals.review.review_id
  };

  service
    .update(updatedReview)
    .then((count) => {
      if (count) {
        const data = {
          ...res.locals.review,
          ...updatedReview
        }
        res.json({ data })
      }
    })
    .catch(next);
}

function destroy(req, res, next) {
  service
    .delete(res.locals.review.review_id)
    .then(() => res.sendStatus(204))
    .catch(next);
}

module.exports = {
  update: [reviewExists, update],
  delete: [reviewExists, destroy]
}