const Cart = require('../models/Cart');

module.exports = {
    index: async (req,res) => {
        try{
            const user = req.session.user;
            const cart = await Cart.find().populate('gameId');
            const alertMsg = req.flash('alertMsg');
            const alertStatus = req.flash('alertStatus');
            const alert = {
                message: alertMsg,
                status: alertStatus
            };
            res.locals.title = 'Master Data | Cart';
            res.locals.currentPage = 'cart';
            res.render('pages/cart', {user, cart, alert});
        } catch(error){
            console.log(error.message);
        }
    }
}