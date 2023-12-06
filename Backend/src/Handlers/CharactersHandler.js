const getAllCharactersController = require('../Controllers/getAllCharacters');
const { Character } = require('../db');
const { searchCharacterByID, searchCharacterByName } = require('../Controllers/SearchCharacters');


async function getAllCharactersHandler(req,res){
    try {
        
        const allCharacters = await getAllCharactersController();

        return res.status(200).json(allCharacters);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}


async function getCharacterByIDHandler (req, res) {
    try {
        const { id } = req.params;

        const character = await searchCharacterByID(id);

        return res.status(200).json(character);
    } catch (error) {
        return res.status(404).send(error.message);
    }
}


async function getCharacterByNameHandler (req,res){
    try {
        const {name} = req.query;

        const characters = await searchCharacterByName(name);

        return res.status(200).json(characters);
    } catch (error) {
        return res.status(404).send(error.message);
    }
}

module.exports = {
    getAllCharactersHandler,
    getCharacterByIDHandler,
    getCharacterByNameHandler
};