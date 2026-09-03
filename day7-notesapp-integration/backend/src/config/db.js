const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.mongodb_uri);
    console.log("mongodb connected");
  } catch (error) {
    console.log("Error while connecting db", error);
  }
};

module.exports = connectDb;
