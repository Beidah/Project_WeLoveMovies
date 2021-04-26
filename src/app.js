if (process.env.USER) require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Routers
const moviesRouter = require("./movies/movies.router");
const theatersRouter = require("./theaters/theaters.router")
const reviewsRouter = require("./reviews/review.router");

// Routes
app.use("/movies", moviesRouter);
app.use("/theaters", theatersRouter);
app.use("/reviews", reviewsRouter);

// Error handlers
const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");

app.use(notFound);
app.use(errorHandler);

module.exports = app;
