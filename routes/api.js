// deklarasi varibael
const express = require('express');
const router = express.Router();
const apiController = require('../controller/ApiController');
// router api
router.get('/news', apiController.indexNews);
router.get('/news/:id', apiController.showNews);
// ===cart
router.get('/cart', apiController.indexCart);
router.post('/cart', apiController.addCart);
// ===game
router.get('/game', apiController.indexGame);
router.get('/game/:id', apiController.showGame);
// ===billing
router.get('/billing', apiController.indexBilling);
router.post('/billing', apiController.addBilling);
// ===library
router.get('/library', apiController.indexLibrary);
router.post('/library', apiController.addLibrary);
// ===faq
router.get('/faq', apiController.indexFaq);
// ===feature
router.get('/feature', apiController.indexFeature);
// ===about
router.get('/about', apiController.indexAbout);
// ===user
router.get('/user', apiController.indexUser);
// ===payment
router.get('/payment', apiController.indexPayment);
// ===specification
router.get('/specification', apiController.indexSpecification);
// ===carousel
router.get('/carousel', apiController.indexCarousel);

module.exports = router;