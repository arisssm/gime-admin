// deklarasi varibael
const express = require('express');
const router = express.Router();
const apiController = require('../controller/ApiController');
// router api
router.get('/news', apiController.indexNews);
router.get('/game', apiController.indexGame);

module.exports = router;