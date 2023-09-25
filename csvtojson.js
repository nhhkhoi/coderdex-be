const fs = require("fs");
const csv = require("csvtojson");
const faker = require("@faker-js/faker");
const csvFilePath = "./Pokemon.csv";

csv()
  .fromFile(csvFilePath)
  .then((jsonObj) => {
    let newJsonObj = [];
    jsonObj.forEach((json) => {
      transformJson(json);

      const newJson = {
        id: json.id,
        name: json.Name,
        types: json.types,
        url: json.url,
        description: faker.faker.commerce.productDescription(),
        height: faker.faker.number.int({ min: 1, max: 100 }),
        weight: faker.faker.number.int({ min: 1, max: 100 }),
        category: faker.faker.commerce.department(),
        abilities: faker.faker.company.catchPhraseAdjective(),
      };

      newJsonObj = [...newJsonObj, newJson];
    });

    // remove duplicate id
    let count = 0;
    newJsonObj = newJsonObj.filter((json) => {
      if (Number(json.id) === count + 1) {
        count += 1;
        return json;
      }
    });

    const jsonData = { data: newJsonObj, totalPokemons: newJsonObj.length };

    const jsonString = JSON.stringify(jsonData, null, 2);
    const jsonFilePath = "pokemons.json";
    fs.writeFile(jsonFilePath, jsonString, (err) => {
      if (err) {
        console.error("Error writing JSON file:", err);
      } else {
        console.log("CSV to JSON conversion successful!");
      }
    });
  })
  .catch((err) => {
    console.error("Error converting CSV to JSON:", err);
  });

const transformJson = (json) => {
  const newTypes = [];
  const types = "types";
  const typeOne = "Type 1";
  const typeTwo = "Type 2";
  const url = "url";

  for (let key in json) {
    // change # with id
    if (key.startsWith("#")) {
      const newKey = "id";
      json[newKey] = json[key];
      delete json[key];
      json[url] = "URL";
    }
    // make types to array
    if (key === typeOne) {
      if (json[typeOne] === "") {
        delete json[typeOne];
      } else {
        const typeLowerCase = json[typeOne].toLowerCase();
        const addTypeOne = newTypes.push(typeLowerCase);
        json[types] = newTypes;
        delete json[typeOne];
      }
    }
    if (key === typeTwo) {
      if (json[typeTwo] === "") {
        delete json[typeTwo];
      } else {
        const typeLowerCase = json[typeTwo].toLowerCase();
        const addTypeTwo = newTypes.push(typeLowerCase);
        json[types] = newTypes;
        delete json[typeTwo];
      }
    }
  }
};

const processedJson = (jsonObj) => {
  jsonObj.forEach()
}