const getUserFavorites = require('./getUserFavorites');



async function isFavorite ({userID, characterID}){
    try {
        console.log(userID);
        console.log(characterID);
        const userFavorites = await getUserFavorites({userID});

        const isFav = userFavorites.find(fav => fav.id === +characterID);

        if(!isFav)return({
            fav: false
        })

        return {
            fav: true
        }
    } catch (error) {
        throw Error(error.message);
    }
}


module.exports = isFavorite;