var fs = require("fs");
const Room = require("../model/room");
var path = require("path");
var cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: "dmws3iedr",
  api_key: "277874439652669",
  api_secret: "PnpL3Mjuei5IceiZXXugXI0mbxI",
  secure: true,
});

module.exports = handleAddRoom = async (req, res) => {
  const { roomTitle, roomPrice, roomDescription, roomLocation } = req.body;
  let tempRoom = {};
  tempRoom.roomTitle = roomTitle;
  tempRoom.roomPrice = roomPrice;
  tempRoom.roomDescription = roomDescription;
  tempRoom.roomLocation = roomLocation;

  let url = "";
  await cloudinary.uploader.upload(
    path.join(__dirname + "/uploads/" + req.file.filename),
    function (error, result) {
      console.log(error.secure_url);
      url = error.secure_url;
    }
  );
  tempRoom.roomPhoto = url;

  let room = new Room(tempRoom);

  room.save((err) => {
    if (err) {
      return res.json({ success: false, statusCode: 500, message: err });
    } else {
      return res.redirect("/listings");
    }
  });
};
