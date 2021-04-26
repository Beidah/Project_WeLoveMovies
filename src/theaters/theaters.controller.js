const service = require("./theaters.service");

function list(req, res, next) {
  const { movieId } = req.params;
  const fetch = movieId ? service.listByMovie : service.list;
  fetch(movieId)
    .then((data) => res.json({ data }))
    .catch(next);
}

module.exports = {
  list
}