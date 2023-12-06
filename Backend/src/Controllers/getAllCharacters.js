const { Character } = require('../db');

async function getAllCharactersController() {
  try {
    const allCharacters = await Character.findAll();

    if (!allCharacters || allCharacters.length === 0) {
      throw new Error('No characters found.');
    }

    return allCharacters;
  } catch (error) {
    console.error('Error in getAllCharactersController:', error.message);
    throw error; // Re-lanza la excepción para que pueda ser manejada en otro lugar si es necesario.
  }
}

module.exports = getAllCharactersController;
