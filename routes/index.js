var express = require('express');
var router = express.Router();
const aboutController = require('../controller/AboutController');        
const billingController = require('../controller/BillingController');        
const carouselController = require('../controller/CarouselController');        
const cartController = require('../controller/CartController');        
const faqController = require('../controller/FaqController');
const featureController = require('../controller/FeatureController');
const gameController = require('../controller/GameController');
const libraryController = require('../controller/LibraryController');
const newsController = require('../controller/NewsController');  
const paymentMethodController = require('../controller/PaymentMethodController');  
const specificationController = require('../controller/SpecificationController');
const userController = require('../controller/UserController');
const dashboardController = require('../controller/DashboardController');
// multer upload
const { upload } = require('../middlewares/multer');
// auth session
const { isLogin } = require('../middlewares/auth');

// === Router Resgister
router.get('/register', userController.indexRegister);
router.post('/register', userController.store);

// === Router Login
router.get('/login', userController.indexLogin);
router.post('/login', userController.processLogin);
router.use(isLogin);

//==== Router Dashboard
router.get('/dashboard', dashboardController.index);

// ==== Router About
router.get('/about', aboutController.index);
router.post('/about', aboutController.store);
router.put('/about', aboutController.update);
router.delete('/about/:id', aboutController.delete);

//==== Router Billing 
router.get('/billing', billingController.index);

//==== Router Carousel
router.get('/carousel', carouselController.index);
router.post('/carousel', upload, carouselController.store);
router.put('/carousel', upload, carouselController.update);
router.delete('/carousel/:id', carouselController.delete);

//==== Router Cart 
router.get('/cart', cartController.index);

//==== Router FAQ
router.get('/faq', faqController.index);
router.post('/faq', faqController.store);
router.put('/faq', faqController.update);
router.delete('/faq/:id', faqController.delete);

//==== Router Feature
router.get('/feature', featureController.index);
router.post('/feature', upload, featureController.store);
router.put('/feature', upload, featureController.update);
router.delete('/feature/:id', featureController.delete);

//==== Router Game 
router.get('/game', gameController.index);
router.post('/game', upload, gameController.store);

//==== Router Library
router.get('/library', libraryController.index);

//==== Router News
router.get('/news', newsController.index);
router.post('/news', upload, newsController.store);
router.put('/news', upload, newsController.update);
router.delete('/news/:id', newsController.delete);

//==== Router Payment
router.get('/payment-method', paymentMethodController.index);
router.post('/payment-method', paymentMethodController.store);
router.put('/payment-method', paymentMethodController.update);
router.delete('/payment-method/:id', paymentMethodController.delete);

//==== Router Spesification
router.get('/specification', specificationController.index);

//==== Router User
router.get('/user', userController.index);
router.post('/user', userController.store);
router.put('/user', userController.update);
router.delete('/user/:id', userController.delete);

//=== Router Logout
router.get('/logout', userController.logout);

// Run All Router
module.exports = router;
