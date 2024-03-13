const Billing = require('../models/Billing');

module.exports = {
    index: async(req, res) => {
        try {
            const user = req.session.user;
            const bills = await Billing.find().populate('gameId').populate('userId').populate('paymentId');
            const alertMsg = req.flash('alertMsg');
            const alertStatus = req.flash('alertStatus');
            const alert = {
                message: alertMsg,
                status: alertStatus
            };
            res.locals.title = 'Master Data | Billing';
            res.locals.currentPage = 'billing';
            res.render('pages/billing', { bills, alert, user });
        } catch (error) {
            console.error(error);
        }
    }
};