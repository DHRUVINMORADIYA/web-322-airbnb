const mongoose = require("mongoose");

const Room = new mongoose.Schema({
  roomTitle: {
    type: String,
    required: true,
  },
  roomPrice: {
    type: Number,
    required: true,
  },
  roomDescription: {
    type: String,
    required: true,
  },
  roomLocation: {
    type: String,
    required: true,
  },
  roomPhoto: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = mongoose.model("Room", Room);
