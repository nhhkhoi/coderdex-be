var express = require("express");
var router = express.Router();
var fs = require("fs");
var pokemons = require("../pokemons.json");

router.get("/", function (req, res, next) {
  try {
    const { search, type, page, limit } = req.query;
    let data = { data: [] };

    let searchLowerCase = search?.toLowerCase();

    if (type) {
      data.data = pokemons.data.filter((pokemon) =>
        pokemon.types.includes(type)
      );
    }
    if (search) {
      data.data = pokemons.data.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchLowerCase)
      );
    }
    if (!search && !type) {
      data = pokemons;
    }
    if (data.length === 0) {
      let err = new Error("No data matched!");
      throw err;
    }
    res.status(200).send(data);
  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
});

router.get("/:id", function (req, res, next) {
  try {
    const { id } = req.params;
    const pokemonIndex = pokemons.data.findIndex(
      (pokemon) => pokemon.id === id
    );
    if (pokemonIndex < 0) {
      let err = "No pokemon Matched!";
      throw err;
    }
    let data = {
      data: {
        pokemon: pokemons.data[pokemonIndex],
        nextPokemon: pokemons.data[pokemonIndex + 1] || pokemons.data[0],
        previousPokemon:
          pokemons.data[pokemonIndex - 1] ||
          pokemons.data[Number(pokemons.totalPokemons - 1)],
      },
    };
    res.send(data);
  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
});

router.post("/", function (req, res, next) {
  // input validation
  const pokemonTypes = [
    "bug",
    "dragon",
    "fairy",
    "fire",
    "ghost",
    "ground",
    "normal",
    "psychic",
    "steel",
    "dark",
    "electric",
    "fighting",
    "flyingText",
    "grass",
    "ice",
    "poison",
    "rock",
    "water",
  ];

  try {
    const { name, id, url, types } = req.body;
    let checkType = "true";
    const newTypes = types.map((type) => {
      const typeLowerCase = type.toLowerCase();
      return typeLowerCase;
    });
    if (!name || !id || !url || !types) {
      const err = new Error("Missing required data");
      throw err;
    }

    if (!Array.isArray(types)) {
      const err = new Error("Pokémon's type is invalid.");
      throw err;
    }

    types.forEach((type) => {
      const typeLowerCase = type.toLowerCase();
      checkType = pokemonTypes.includes(typeLowerCase);
      if (!checkType) {
        const err = new Error("Pokémon's type is invalid.");
        throw err;
      }
    });

    if (types?.length > 2) {
      const err = new Error("Pokémon can only have one or two types.");
      throw err;
    }

    pokemons.data.forEach((pokemon) => {
      if (pokemon.id === id || pokemon.name === name) {
        const err = new Error("The Pokémon is exist.");
        throw err;
      }
    });
    // processing logic
    let newPokemon = {
      name: name,
      types: newTypes,
      id: id,
      url: url,
    };

    let db = fs.readFileSync("pokemons.json", "utf-8");
    db = JSON.parse(db);
    const { data } = db;
    const push = data.push(newPokemon);
    db.totalPokemons = data.length;
    db.data = data;

    db = JSON.stringify(db, null, 1);

    fs.writeFileSync("pokemons.json", db);

    // send response
    res.status(200).send("Create pokemon successfully!");
  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
});

router.put("/:id", function (req, res, next) {
  try {
    const { id } = req.params;
    const { name, url, types } = req.body;
    let db = fs.readFileSync("pokemons.json", "utf-8");
    db = JSON.parse(db);
    const { data } = db;
    const newData = data.map((json) => {
      if (json.id !== id) return json;
      if (json.id === id) {
        const newJson = {
          name: name,
          id: json.id,
          url: url,
          types: types,
        };
        return newJson;
      }
    });
    db.data = newData;
    db = JSON.stringify(db, null, 1);
    fs.writeFileSync("pokemons.json", db);
    res.status(200).send("Edit Pokemon successfully!");
  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
});

router.delete("/:id", function (req, res, next) {
  try {
    const { id } = req.params;
    let db = fs.readFileSync("pokemons.json", "utf-8");
    db = JSON.parse(db);
    const { data } = db;
    const newData = data.filter((json) => json.id !== id);
    db.totalPokemons = newData.length;
    db.data = newData;
    db = JSON.stringify(db, null, 1);
    fs.writeFileSync("pokemons.json", db);
    res.status(200).send("Delete Pokemon successfully!");
  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
});

module.exports = router;
