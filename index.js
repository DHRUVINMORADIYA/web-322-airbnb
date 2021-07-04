const express = require("express");
const exphbs = require("express-handlebars");
const app = express();

const PORT = process.env.port || 8080;

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

app.listen(PORT, () => {
  console.log("The web server has started on port 8080");
});
