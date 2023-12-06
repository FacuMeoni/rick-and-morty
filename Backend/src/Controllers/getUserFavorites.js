const { User, Character} = require('../db');

async function getUserFavoritesController ({ userID }) {
        try {
            const user = await User.findByPk(userID, {
                include: {
                    model: Character,
                    through: {
                        attributes: [] 
                    }
                }
            });
    
            if (!user)throw new Error('User not found');
    
            const favorites = user.Characters; 
    
            return favorites;
        } catch (error) {
            throw new Error(error.message);
        }
    }

module.exports = getUserFavoritesController;