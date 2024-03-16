const mongoose = require("mongoose");
const { mongodbURL } = require("../secret");

const connectDB = async () => {
  try {
    await mongoose.connect(mongodbURL);
    console.log("Connection to DB is successful...");

    mongoose.connection.on("error", (error) => {
      console.error("DB connection error: ", error);
    });
  } catch (error) {
    console.error("Could not connect to DB: ", error.toString());
  }
};

module.exports = connectDB;
