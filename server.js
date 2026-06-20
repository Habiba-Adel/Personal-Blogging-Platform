require("dotenv").config();


const config = require("./config/env");

const app = require("./app");

const connectDB = require("./config/db");

const PORT = config.port;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(
        `Server running on port ${PORT}`
      );
    });
  } catch (error) {
    console.error(
      "Failed to start application:",
      error
    );

    process.exit(1);
  }
};

startServer();