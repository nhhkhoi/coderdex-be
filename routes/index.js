var express = require("express");
var router = express.Router();
var fs = require("fs");
var pokemons = require("../pokemons.json");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send(pokemons);
});

module.exports = router;
