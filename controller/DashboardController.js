const User = require('../models/User');

module.exports = {
    index: async (req, res) => {
        try{
            const alertMsg = req.flash('alertMsg');
            const alertStatus = req.flash('alertStatus');
            const alert = {
                message: alertMsg,
                status: alertStatus
            };
            const user = req.session.user;
            // req.flash('alertMsg', 'Wecome to Admin, stay strong and goodluck !');
            // req.flash('alertStatus', 'success');
            res.locals.title = 'Dashboard Admin';
            res.locals.currentPage = 'dashboard';
            res.render('pages/dashboard', {alert, user});
        } catch{
            // console.error(error);
            req.flash('alertMsg', error.message);
            req.flash('alertStatus', 'danger');
            res.redirect('/login');
        }
    }
}