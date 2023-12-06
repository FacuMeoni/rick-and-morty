const { User, Character } = require('../db');
const loginHandler = require('../Handlers/loginHandler');
const router = require('express').Router();
const registerHandler = require('../Handlers/registerHandler');
const { postFavoriteHandler, deleteFavoriteHandler, getUserFavoritesHandler, isFavoriteHandler}= require('../Handlers/favoritesHandler');

router.post('/register', registerHandler);

router.post('/login', loginHandler);

router.post('/favorites', postFavoriteHandler);

router.get('/favorites/:userID', getUserFavoritesHandler);

router.get('/favorites', isFavoriteHandler);

router.delete('/favorites', deleteFavoriteHandler);

module.exports = router;