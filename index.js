const express = require("express");
const exphbs = require("express-handlebars");
const connectDB = require("./model/connection");
const app = express();
var bodyParser = require("body-parser");
const handleLogin = require("./controller/handleLogin");
const handleSignup = require("./controller/handleSignup");
const handleAddRoom = require("./controller/handleAddRoom");
var path = require("path");
var multer = require("multer");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const room = require("./model/room");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
connectDB();

app.engine(
  "hbs",
  exphbs({
    defaultLayout: "main",
    extname: ".hbs",
    helpers: {
      json: function (context) {
        return JSON.stringify(context).replace(/"/g, "&quot;");
      },
      todaysDate: (date) => new Date(date),
    },
    onRoomClick: function (roomID) {
      console.log(roomID);
    },
  })
);

app.set("view engine", "hbs");
app.use("/", express.static("./"));
app.use(require("less-middleware")(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("home");
});

var Email = {
  send: function (a) {
    return new Promise(function (n, e) {
      (a.nocache = Math.floor(1e6 * Math.random() + 1)), (a.Action = "Send");
      var t = JSON.stringify(a);
      Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function (e) {
        n(e);
      });
    });
  },
  ajaxPost: function (e, n, t) {
    var a = Email.createCORSRequest("POST", e);
    a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"),
      (a.onload = function () {
        var e = a.responseText;
        null != t && t(e);
      }),
      a.send(n);
  },
  ajax: function (e, n) {
    var t = Email.createCORSRequest("GET", e);
    (t.onload = function () {
      var e = t.responseText;
      null != n && n(e);
    }),
      t.send();
  },
  createCORSRequest: function (e, n) {
    var t = new XMLHttpRequest();
    return (
      "withCredentials" in t
        ? t.open(e, n, !0)
        : "undefined" != typeof XDomainRequest
        ? (t = new XDomainRequest()).open(e, n)
        : (t = null),
      t
    );
  },
};

app.get("/listings", async (req, res) => {
  let listingData = await room.find({});
  listingData = listingData.map((i) => {
    return {
      roomID: i._id,
      roomTitle: i.roomTitle,
      roomPrice: i.roomPrice,
      roomDescription: i.roomDescription,
      roomPhoto: i.roomPhoto,
    };
  });
  res.render("listings", { listingData: listingData });
});

app.get("/roomPage/:id", (req, res) => {
  room.findById(req.params.id).then((room) => {
    var { roomID, roomTitle, roomPrice, roomDescription, roomPhoto } = room;

    res.render("roomPage", {
      roomID,
      roomTitle,
      roomPrice,
      roomDescription,
      roomPhoto,
    });
    console.log(roomID, roomTitle, roomPrice, roomDescription, roomPhoto);
  });
});

app.post("/bookRoom", (req, res) => {
  Email.send({
    SecureToken: "f71a15df-c5c8-49d3-bedb-eb5880a93ff8",
    To: "mdhruvin946@gmail.com", //reciever,
    From: "mdhruvin946@gmail.com",
    Subject: "Welcome to Airbnb",
    Body: "You have booked a room with Airbnb!\nHere are your details:",
  });
  res.redirect("/listings");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.use("/handleLogin", handleLogin);
app.use("/handleSignup", handleSignup);

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "controller/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

var upload = multer({ storage: storage });
app.use("/handleAddRoom", upload.single("rPhoto"), handleAddRoom);

app.post("/dashboard", (req, res) => {
  res.render("dashboard");
});

app.listen(process.env.PORT || 8080, () => {
  console.log("The web server has started on port 8080");
});
