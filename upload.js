const cloudinary = require("cloudinary").v2;
const pokemons = require("./pokemons.json");
const fs = require("fs");

const uploadImage = () => {
  cloudinary.config({
    cloud_name: "dzgl4fkl5",
    api_key: "689863593489865",
    api_secret: "cJCvGKuD306rG_sU-dExn605uU4",
  });
  cloudinary.uploader.upload(
    `../images/${json.id}.png`,
    {
      use_filename: true,
      unique_filename: false,
      folder: "pokemons",
    },
    (error, result) => {
      const url = result.secure_url;

      console.log("jsonURL", url);
      json.url = url;
    }
  );
  let db = fs.readFileSync("pokemons.json", "utf-8");
  db = JSON.parse(db);
  const { data } = db;
  const newData = data.map((json) => {
    return json.id;
  });
  db.data = newData;
  db = JSON.stringify(db, null, 1);
  fs.writeFileSync("pokemons.json", db);
};
uploadImage();
