module.exports = {
    index: (req, res) => {
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
        res.render('pages/dashboard', {alert});
    }
}