const service = require("./movies.service");

function movieExists(req, res, next) {
  const { movieId } = req.params;
  service
    .read(movieId)
    .then((movie) => {
      if (movie) {
        res.locals.movie = movie;
        return next();
      }
      next({ status: 404, message: `Movie cannot be found: ${movieId}`});
    })
    .catch(next);
}

// Routes

function list(req, res, next) {
  const { is_showing } = req.query;
  service
    .list(is_showing)
    .then((data) => res.json({ data }))
    .catch(next);
}

function read(req, res) {
  const data = res.locals.movie;
  res.json({ data });
}

function reviews(req, res) {
  const movie = res.locals.movie;
  service.
    reviews(movie.movie_id)
    .then(data => res.json({ data }));
}

module.exports = {
  list,
  read: [movieExists, read],
  reviews: [movieExists, reviews]
}