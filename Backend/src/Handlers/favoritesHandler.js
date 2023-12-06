const postFavoriteController = require('../Controllers/postFavorites');
const deleteFavoriteController = require('../Controllers/deleteFavorites');
const getUserFavoritesController = require('../Controllers/getUserFavorites');
const isFavoriteController = require('../Controllers/isFavorite');

async function postFavoriteHandler(req, res) {
    try {
        const favorites = await postFavoriteController(req.body);

        return res.status(200).json(favorites);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}


async function deleteFavoriteHandler (req, res) {
    try {
        const deletedFavorite = await deleteFavoriteController(req.body);

        return res.status(200).json(deletedFavorite);
    } catch (error) {
        return res.status(404).send(error.message);
    }
}

async function getUserFavoritesHandler (req, res){
    try {
        const favorites = await getUserFavoritesController(req.params);

        return res.status(200).json(favorites);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}


async function isFavoriteHandler(req, res){
    try {
        const fav = await isFavoriteController(req.query);

        return res.status(200).json(fav)
    } catch (error) {
        return res.status(500).send(error.message);
    }
}



module.exports = {
    postFavoriteHandler,
    deleteFavoriteHandler,
    getUserFavoritesHandler,
    isFavoriteHandler
}