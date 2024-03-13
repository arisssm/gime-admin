// deklarasi varibael
const express = require('express');
const router = express.Router();
const apiController = require('../controller/ApiController');
const { tokenJWT } = require('../middlewares/auth');

//===access for other port
router.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    next();
});

// ===register
router.post('/register', apiController.addRegister);
// ===login
router.post('/login', apiController.postLogin);
// ===news
router.get('/news', apiController.indexNews);
router.get('/news/:id', apiController.showNews);
// ===cart
router.get('/cart', tokenJWT, apiController.indexCart);
router.post('/cart', tokenJWT, apiController.addCart);
// ===game
router.get('/game', apiController.indexGame);
router.get('/game/:id', apiController.showGame);
// ===billing
router.get('/billing', tokenJWT, apiController.indexBilling);
router.post('/billing', tokenJWT, apiController.addBilling);
router.get('/billing/:id', tokenJWT, apiController.showBilling);
// ===library
router.get('/library/:id', tokenJWT, apiController.userLibrary);
router.post('/library', tokenJWT, apiController.addLibrary);
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