const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUD_IMAGES_NAME,
  api_key: process.env.CLOUD_IMAGES_API_KEY,
  api_secret: process.env.CLOUD_IMAGES_API_SECRET,
});

const changeURL = async () => {
  try {
    let db = fs.readFileSync("./pokemons.json", "utf-8");
    db = JSON.parse(db);
    const { data } = db;
    const newData = await Promise.all(
      data.map(async (json) => {
        let URL = await uploadImage(json.id);
        console.log("URL", URL);
        json.url = URL;
        return json;
      })
    );
    console.log("newData", newData);
    db.data = newData;
    db = JSON.stringify(db, null, 1);
    fs.writeFileSync("pokemons.json", db);
  } catch (error) {
    console.log(error);
  }
};

const uploadImage = async (imageId) => {
  try {
    const result = await cloudinary.uploader.upload(
      `../images/${imageId}.png`,
      {
        use_filename: true,
        unique_filename: false,
        folder: "pokemons",
      }
    );
    return result.secure_url;
  } catch (error) {
    console.log(error);
  }
};

changeURL();
