var fs = require("fs");
const Room = require("../model/room");
var path = require("path");

module.exports = handleAddRoom = (req, res) => {
  const { roomTitle, roomPrice, roomDescription, roomLocation } = req.body;
  let tempRoom = {};
  tempRoom.roomTitle = roomTitle;
  tempRoom.roomPrice = roomPrice;
  tempRoom.roomDescription = roomDescription;
  tempRoom.roomLocation = roomLocation;
  tempRoom.roomPhoto = {
    data: fs.readFileSync(
      path.join(__dirname + "/uploads/" + req.file.filename)
    ),
    contentType: "image/jpg",
  };
  let room = new Room(tempRoom);
  //console.log(room.roomPhoto);

  room.save((err) => {
    if (err) {
      return res.json({ success: false, statusCode: 500, message: err });
    } else {
      return res.render("listings");
    }
  });
};
