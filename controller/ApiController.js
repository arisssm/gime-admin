const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const About = require('../models/About');
const Billing = require('../models/Billing');
const Carousel = require('../models/Carousel');
const Cart = require('../models/Cart');
const News = require('../models/News');
const Faq = require('../models/Faq');
const Feature = require('../models/Feature');
const Game = require('../models/Game');
const Library = require('../models/Library');
const Payment = require('../models/PaymentMethod');
const User = require('../models/User');
const Specification = require('../models/Specification');

module.exports = {
/* =========  Register ========= */
    addRegister: async (req, res) => {
        try{
            const {fullName, phone, email, password, username} = req.body;
            await User.create({fullName, phone, email, password, username, role:'admin'});
            res.status(200).json({message: 'Success, your has been regster!'});
            // console.log(req.body);
        } catch(error){
            res.status(400).json({message: 'Please check again your code!'});
        }
    },
    postLogin: async (req, res) => {
        try{
            const { username, password } = req.body;
            const user = await User.findOne({username: username});
            if (!user){
                return res.status(401).json({message: 'Sorry, username not found!'});
            } 
            const isPasswordMatch =  await bcrypt.compare(password, user.password);
            if (!isPasswordMatch){
                return res.status(401).json({message: 'Sorry, password not found!'});
            }
            // console.log(isPasswordMatch);
            if (user.role != 'customer'){
                return res.status(401).json({message: 'Sorry, your account not valid!'});
            }
            const token = jwt.sign({
                userId: user._id,
                username: user.username,
            },
                "RANDOM-TOKEN", { expiresIn: "3h"}
            );
            return res.status(200).json({token, username: user.username});
        } catch(error){
            return res.status(400).json({message: error.message});
        }
    },
/* =========  News ========= */
    indexNews: async (req, res) => {
        try{
            const news = await News.find();
            res.status(200).json({news});
        } catch(error){
            console.log('Error in', error);
            res.status(400).json({message: 'Please check again your code!'});
        }
    },
    showNews: async (req, res) => {
        try{
            const {id} = req.params;
            const news = await News.findOne({ _id:id });
            res.status(200).json({news});
        } catch(error){
            console.log('Error in', error);
            res.status(400).json({message: 'Please check again your code!'});
        }
    },
/* =========  Cart ========= */
    indexCart: async (req, res) => {
        try{
            const cart = await Cart.find().populate('gameId');
            res.status(200).json({cart});
        } catch(error) {
            console.log('Error in', error);
            res.status(400).json({message: 'Please check again your code!'});
        }
    },
    addCart: async (req, res) => {
        try{
            const {gameId} = req.body;
            const game = await Game.findOne({_id:gameId});
            if (!game) return res.status(400).json({message: 'Sorry, game is undefined!'});
            const cart = await Cart.findOne({_id:gameId});
            if (!cart) {
                return res.status(400).json({message: 'Sorry, game has been add cart before!'});
            }
            await Cart.create({gameId});
            return res.status(200).json({message: 'Yeay, your game has been add to cart!'});
        } catch(error) {
            console.log('Error in', error);
            res.status(400).json({message: 'Please check again your code!'});
        }
    },
/* =========  Billing ========= */
    indexBilling: async (req, res) => {
        try{
            const billing = await Billing.find().populate('gameId').populate('userId').populate('paymentId');
            res.status(200).json({billing});
        } catch(error){
            console.log('Error in', error);
            res.status(400).json({message: 'Please check again your code!'});
        }
    },
    addBilling: async (req, res) => {
        try{
            const {gameId, userId, paymentId} = req.body;
            const game = await Game.findOne({_id:gameId});
            const user = await User.findOne({_id:userId});
            const payment = await Payment.findOne({_id:paymentId});
            if(!game && !user && !payment){
                return res.status(400).json({message: 'Sorry, cannot access billing!'})
            }
            await Billing.create({
                gameId,
                userId,
                paymentId,
                status: 'unpaid'
            });
            return res.status(200).json({message: 'Success, please check your billing! '});
        } catch(error) {
            console.log('Error in', error);
            res.status(400).json({message: 'Please check again your code!'});
        }
    },
/* =========  Library ========= */
    indexLibrary: async (req, res) => {
        try{
            const library = await Library.find().populate('gameId').populate('userId');
            res.status(200).json({library});
        } catch(error){
            console.log('Error in', error);
            res.status(400).json({message: 'Please check again your code!'});
        }
    },
    addLibrary: async ( req, res) => {
        try{
            const { gameId, userId} = req.body;
            const game = await Game.findOne({_id:gameId});
            const user = await User.findOne({_id:userId});
            if ( !game && !user) {
                res.status(400).json({message: 'Sorry, cannot access your library!'});
            }
            await Library.create({
                gameId,
                userId,
            });
            res.status(200).json({message: 'Success, your library has been created!'});
        } catch(error){
            console.log('Error in', error);
            res.status(400).json({message: 'Please check again your code!'});
        }
    },
/* =========  Game ========= */
    indexGame: async (req, res) => {
        try{
            const game = await Game.find();
            res.status(200).json(game);
        } catch(error){
            console.log('Error in', error);
            res.status(400).json({message: 'Please check again your code!'});
        }
    },
    showGame: async (req, res) => {
        try{
            const {id} = req.params;
            const game = await Game.findOne({ _id:id });
            res.status(200).json({game});
        } catch(error){
            console.log('Error in', error);
            res.status(400).json({message: 'Please check again your code!'});
        }
    },
/* =========  Faq ========= */
    indexFaq: async (req, res) => {
        try{
            const faq = await Faq.find();
            res.status(200).json(faq);
        } catch(error){
            console.log('Error in', error);
            res.status(400).json({message: 'Please check again your code!'});
        }
    },
/* =========  Feature ========= */
    indexFeature: async (req, res) => {
        try{
            const feature = await Feature.find();
            res.status(200).json(feature);
        } catch(error){
            console.log('Error in', error);
            res.status(400).json({message: 'Please check again your code!'});
        }
    },
/* =========  About ========= */
    indexAbout: async (req, res) => {
        try{
            const about = await About.find();
            res.status(200).json(about);
        } catch(error){
            console.log('Error in', error);
            res.status(400).json({message: 'Please check again your code!'});
        }
    },
/* =========  Payment ========= */
    indexPayment: async (req, res) => {
        try{
            const payment = await Payment.find();
            res.status(200).json(payment);
        } catch(error){
            console.log('Error in', error);
            res.status(400).json({message: 'Please check again your code!'});
        }
    },
/* =========  Carousel ========= */
    indexCarousel: async (req, res) => {
        try{
            const carousel = await Carousel.find();
            res.status(200).json(carousel);
        } catch(error) {
            console.log('Error in', error);
            res.status(400).json({message: 'Please check again your code!'});
        }
    },
/* =========  User ========= */
    indexUser: async (req, res) => {
        try{
            const user = await User.find();
            res.status(200).json(user);
        } catch(error) {
            console.log('Error in', error);
            res.status(400).json({message: 'Please check again your code!'});
        }
    },
/* =========  Specification ========= */
indexSpecification: async (req, res) => {
    try{
        const specification = await Specification.find();
        res.status(200).json(specification);
    } catch(error) {
        console.log('Error in', error);
        res.status(400).json({message: 'Please check again your code!'});
    }
}

}