## Pokedex
- API for getting all Pokémons

Search Pokémons by Type

Search Pokémons by Name

- API for getting a single Pokémon information together with the previous and next pokemon information.

/api/pokemons/2 return the pokemon with id 2, 1 and 3

/api/pokemons/1 return the pokemon with id 1, 721 and 2

/api/pokemons/721 return the pokemon with id 721, 720 and 1

- API for creating new Pokémon (you can use the existing data set or faker. Handle error for the cases below:

“Missing required data.” (name, id, types or URL)
“Pokémon can only have one or two types.” (if the types's length is greater than 2)
“Pokémon's type is invalid.” (if the types of Pokémon are not included in the valid given PokémonTypes array)
“The Pokémon already exists.” (if id or name exists in the database)
The valid type array

🚀 API for updating a Pokémon

🚀 API for deleting a Pokémon by Id
