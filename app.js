require("dotenv").config();
// const cors = require("cors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var pokemonsRouter = require("./routes/pokemons");

var app = express();
// Cors
// const corsOptions = {
//   origin: process.env.REACT_APP_FRONTEND_URL, // Replace with your frontend domain
//   methods: "GET, POST, PUT, DELETE",
//   allowedHeaders: "Content-Type, Authorization",
// };
// app.use(cors(corsOptions));
// Cloudinary
const cloudinary = require("cloudinary").v2;

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.listen(3000, () => {
  app.use("/", indexRouter);
  app.use("/pokemons", pokemonsRouter);
  app.use((error, req, res, next) => {
    res.status(error.statusCode).send(error.message);
  });
});

module.exports = app;
