const express = require("express");
const exphbs = require("express-handlebars");
const connectDB = require("./model/connection");
const app = express();
var bodyParser = require("body-parser");
const handleLogin = require("./controller/handleLogin");
const handleSignup = require("./controller/handleSignup");

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

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/listings", (req, res) => {
  const listingData = [
    {
      id: "1",
      title: "one bed one bath",
      description: "some more info",
      price: "100",
      image: `https://picsum.photos/200`,
    },
    {
      id: "2",
      title: "two bed one bath",
      description: "some more info",
      price: "20",
      image: `https://picsum.photos/200`,
    },
    {
      id: "3",
      title: "no bed no bath",
      description: "some more info",
      price: "40",
      image: `https://picsum.photos/200`,
    },
    {
      id: "4",
      title: "100 bed no bath",
      description: "some more info",
      price: "10",
      image: `https://picsum.photos/200`,
    },
  ];
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

app.post("/dashboard", (req, res) => {
  res.render("dashboard");
});

app.listen(process.env.PORT || 8080, () => {
  console.log("The web server has started on port 8080");
});
