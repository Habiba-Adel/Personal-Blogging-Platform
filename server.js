
//first thing we will load the ,env thing inside the process variable environments 
require("dotenv").config();

//and then we will need to make the validation if there is any thing missing 
require("./config/env"); 


const config = require("./config/env");
const app = require("./app");
const connectDB = require("./config/db");

const PORT = config.port;

const startServer = async () => {
    //ensuring first that the db is working okay before making the server up
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();