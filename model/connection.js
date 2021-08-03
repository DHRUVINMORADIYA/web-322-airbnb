const mongoose = require("mongoose");
require("dotenv").config();

const URI = process.env.MONGODB_URI;

const connectDB = async () => {
  await mongoose.connect(URI, {
    useNewUrlParser: true,
  });
  console.log("db connected..!");
};

module.exports = connectDB;
