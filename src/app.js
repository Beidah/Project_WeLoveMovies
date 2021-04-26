if (process.env.USER) require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

// Routers
const moviesRouter = require("./movies/movies.router");

// Routes
app.use("/movies", moviesRouter);

// Error handlers
const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");

app.use(notFound);
app.use(errorHandler);

module.exports = app;
