const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");

const authRoutes = require("./routes/auth.routes");
const postRoutes = require("./routes/post.routes");

const globalErrorHandler = require("./middlewares/error.middleware");

const app = express();

app.use(cors());

app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message:
      "Too many requests, please try again later.",
  },
});

app.use(limiter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Personal Blogging Platform API",
  });
});

app.use("/auth", authRoutes);

app.use("/posts", postRoutes);

app.use(globalErrorHandler);

module.exports = app;