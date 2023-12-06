const { Character } = require('../db');
const router = require('express').Router();
const {getAllCharactersHandler , getCharacterByIDHandler, getCharacterByNameHandler} = require('../Handlers/CharactersHandler');


router.get('/all', getAllCharactersHandler );


router.get('/search/:id', getCharacterByIDHandler);


router.get('/search', getCharacterByNameHandler);

module.exports = router;