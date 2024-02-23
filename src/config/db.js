const mongoose = require("mongoose");
const { mongodbURL } = require("../secret");
const connectDB = async (options = {}) => {
  try {
    await mongoose.connect(mongodbURL, options);
    console.log("connection to DB is successful...");
    mongoose.connection.on("error", (error) => {
      console.error("DB connection error", error);
    });
  } catch (error) {
    console.error("coundl not connect to db", error.toString());
  }
};

module.exports = connectDB;
