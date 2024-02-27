const PaymentMethod = require('../models/PaymentMethod');

module.exports = {
    index: async (req, res) => {
        try{
            res.locals.title = 'Master Data | Payment Method';
            res.locals.currentPage = 'paymentMethod';
            const paymentmethod = await PaymentMethod.find();
            const user = req.session.user;
            const alertMsg = req.flash('alertMsg');
            const alertStatus = req.flash('alertStatus');
            const alert = {
                message: alertMsg,
                status: alertStatus
            }
            res.render('pages/paymentMethod', {paymentmethod, alert, user});
        } catch(error){
            req.flash('alertMsg', error.message)
            req.flash('alertStatus', 'danger');
            res.redirect('/dashboard');
        }
    },
    store: async (req, res) => {
        try {
            const {name, paymentSteps} = req.body;
            //console.log{name, paymentSteps};
            await PaymentMethod.create({name, paymentSteps});
            req.flash('alertMsg', 'Done, your data has been saved.');
            req.flash('alertStatus', 'success');
            res.redirect('/payment-method');
        } catch(error){
            req.flash('alertMsg', error.message)
            req.flash('alertStatus', 'danger');
            res.redirect('/payment-method');
        }
    },
    update: async (req, res) => {
        try{
            const {id, name, paymentSteps} = req.body;
            await PaymentMethod.updateOne({_id:id}, {
                name: name,
                paymentSteps: paymentSteps
            });
            req.flash('alertMsg', 'Done, your data has been updated.');
            req.flash('alertStatus', 'success');
            res.redirect('/payment-method');
        } catch(error) {
            req.flash('alertMsg', error.message)
            req.flash('alertStatus', 'danger');
            res.redirect('/payment-method');
        }
    },
    delete: async(req, res) => {
        const {id} = req.params;
        await PaymentMethod.deleteOne({_id:id});
        req.flash('alertMsg', 'Done, your data has been deleted.');
        req.flash('alertStatus', 'warning');
        res.redirect('/payment-method');
    }
}