const mongoose = require("mongoose");

const URI =
  "mongodb+srv://dhruvin-moradiya:9974420936Dd@cluster0.vm7vl.mongodb.net/airbnb?retryWrites=true&w=majority";

const connectDB = async () => {
  await mongoose.connect(URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log("db connected..!");
};

module.exports = connectDB;
