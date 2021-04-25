const knex = require("../db/connection");

function list(is_showing) {
  if (is_showing === undefined) {
    return knex("movies");
  } else {
    is_showing = is_showing === "true" ? true : false;
    return knex("movies as m")
      .distinct()
      .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
      .select("m.*", "mt.is_showing")
      .where({ "mt.is_showing": is_showing });
  }
}

module.exports = {
  list
}