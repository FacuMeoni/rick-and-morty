require('dotenv').config();
const axios = require('axios');
const { URL } = process.env
const { Character } = require('../db')


async function getAllCharactersApi () {
    try {
        let characters = [];
        let page = 1;
        while(page < 43){
            const data = await axios.get(`${URL}?page=${page}`);
            
            characters.push(data);
            page++;
        }
        
        characters = (await Promise.all(characters)).map(res => res.data.results.map(char => {
            return ({
                id: char.id,
                name: char.name,
                status: char.status,
                species: char.species,
                gender: char.gender,
                image: char.image,
                origin: char.origin?.name,
            })
        }))
        
        
        let allCharacters = [];

        characters.map(char => { allCharacters = allCharacters.concat(char)});
        
        
        return allCharacters;

    } catch (error) {
        throw new Error(error.message);
    }
}


async function saveCharactersOnDb () {
    try {
        const charactersOnDb = await Character.findAll();
        const allCharacters = await getAllCharactersApi();

        if(charactersOnDb.length === 0) { 
            await Character.bulkCreate(allCharacters) ;
            console.log(`${allCharacters.length} characters saved`);
        } else if(charactersOnDb.length === 826){
             console.log('All characters are already saved');
        }

    } catch (error) {
        throw new Error(error.message);
    }

}

module.exports = {
    saveCharactersOnDb
}