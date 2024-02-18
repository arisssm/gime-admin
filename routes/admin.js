var express = require('express');
var router = express.Router();
const gameController = require('../controller/GameController');

router.get('/game', gameController.index);

module.exports = router;