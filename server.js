require("dotenv").config();
const config = require("./config/env");
const app = require("./app");
const connectDB = require("./config/db");

connectDB();

module.exports = app;
