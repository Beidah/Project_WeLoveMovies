const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

const mapCritics = reduceProperties("critic_id", {
  preferred_name: ["critic", "preferred_name"],
  surname: ["critic", "surname"],
  organization_name: ["critic", "organization_name"]
})

function read(review_id) {
  return knex("reviews")
    .join("critics", "critics.critic_id", "reviews.critic_id")
    .where({ review_id })
    .then(mapCritics)
    .then((records) => records[0])
}

function update(updatedReview) {
  return knex("reviews")
    .join("critics", "reviews.critic_id", "critics.critic_id")
    .where({ "reviews.review_id": updatedReview.review_id })
    .update(updatedReview, "*");
    // .then(updatedRecords => console.log(updatedRecords))
    // .then(mapCritics);
}

function destroy(review_id) {
  return knex("reviews")
    .where({ review_id })
    .del();
}

module.exports = {
  read,
  update,
  delete: destroy
}