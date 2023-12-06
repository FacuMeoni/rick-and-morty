const { Op } = require('sequelize');
const { Character } = require('../db');

async function searchCharacterByID (id) {
    try {
        const character = await Character.findByPk(id);
        
        if (!character)throw new Error('Character not found');

        return character;
    } catch (error) {
        throw new Error(error.message);
    }
}

async function searchCharacterByName (name) {
        try {
            const characters = await Character.findAll({
                where: {
                    name: {
                        [Op.like]: `%${name}%` 
                    }
                }
            });
            if(!characters)throw new Error('Character not found');
        
            return characters;
        } catch (error) {
            throw new Error(error.message);
        }
}


module.exports = {
    searchCharacterByID,
    searchCharacterByName
}