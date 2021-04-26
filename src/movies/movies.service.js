const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

const mapCritics = reduceProperties("critic_id", {
  critic_id: ["critic", "critic_id"],
  preferred_name: ["critic", "preferred_name"],
  surname: ["critic", "surname"],
  organization_name: ["critic", "organization_name"]
})

function read(movie_id) {
  return knex("movies")
    .where({ movie_id })
    .first();
}

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

function reviews(movie_id) {
  return knex("reviews")
    .join("critics", "reviews.critic_id", "critics.critic_id")
    .select("reviews.*", "critics.*")
    .where({ "reviews.movie_id": movie_id })
    .then(mapCritics);
}

module.exports = {
  list,
  read,
  reviews
}