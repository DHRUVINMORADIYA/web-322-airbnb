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
      todaysDate: (date) => new Date(date),
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

app.get("/listings", async (req, res) => {
  let listingData = await room.find({});
  listingData = listingData.map((i) => {
    return {
      roomTitle: i.roomTitle,
      roomPrice: i.roomPrice,
      roomDescription: i.roomDescription,
      roomPhoto: i.roomPhoto,
    };
  });
  console.log(listingData);
  res.render("listings", { listingData: listingData });
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
