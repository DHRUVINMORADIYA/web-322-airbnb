const mongoose = require("mongoose");

const User = new mongoose.Schema({
  email: {
    type: String,
    uniqueItems: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  province: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  isAdmin: Boolean,
});

module.exports = mongoose.model("User", User);
