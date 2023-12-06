const { User, Character } = require('../db');


async function postFavoriteController ({ userID, characterID }){
try {
    
    const user = await User.findByPk(userID);
    if (!user) throw new Error('User doesnt exist');
    
    const favCharacter = await Character.findByPk(characterID);
    if (!favCharacter) throw new Error('Character not found');
    
    await user.addCharacter(favCharacter);
    
    return `${favCharacter.name} added successfully to favorites`;
    } catch (error) {
        throw new Error(error.message);
    }
}


module.exports = postFavoriteController;