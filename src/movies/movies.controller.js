const service = require("./movies.service");

// Routes

function list(req, res, next) {
  const { is_showing } = req.query;
  service
    .list(is_showing)
    .then((data) => res.json({ data }))
    .catch(next);
}

module.exports = {
  list,
}