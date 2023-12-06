const {  User, Character } = require('../db');


async function deleteFavoritesController ({ userID, characterID }) {
    try {
        const user  = await User.findByPk(userID);
        if(!user) throw new Error('User doesnt exist');

        const characterForDelete = await Character.findByPk(characterID);
        if(!characterForDelete)throw new Error('Character arleady deleted');

        await user.removeCharacter(characterForDelete);
            
        return `${characterForDelete.name} removed succesfully of favorites`;
    } catch (error) {
        throw new Error(error.message);
    }
}



module.exports = deleteFavoritesController;