const User = require('../models/User');
const News = require('../models/News');
const Game = require('../models/Game');
const Billing = require('../models/Billing');
const Cart = require('../models/Cart');

module.exports = {
    index: async (req, res) => {
        try{
            const user = req.session.user;
            const countNews = await News.countDocuments();
            const countGame = await Game.countDocuments();
            const countBilling = await Billing.countDocuments();
            const countCart = await Cart.countDocuments();
            const alertMsg = req.flash('alertMsg');
            const alertStatus = req.flash('alertStatus');
            const alert = {
                message: alertMsg,
                status: alertStatus
            };
            // req.flash('alertMsg', 'Wecome to Admin, stay strong and goodluck !');
            // req.flash('alertStatus', 'success');
            res.locals.title = 'Dashboard Admin';
            res.locals.currentPage = 'dashboard';
            res.render('pages/dashboard', {alert, user, countNews, countGame, countBilling, countCart});
        } catch{
            // console.error(error);
            req.flash('alertMsg', error.message);
            req.flash('alertStatus', 'danger');
            res.redirect('/login');
        }
    }
}