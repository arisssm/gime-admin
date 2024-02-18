const PayMethod = require('../models/PaymentMethod');
const User = require('../models/User');
const CartShoping = require('../models/Cart');
const Billing = require('../models/Billing');
const PaymentMethod = require('../models/PaymentMethod');

module.exports = {
    index: async (req,res) => {
        res.locals.title = 'Master Data | Billing';
        res.locals.currentPage = 'billing';
        const payStatus = await PaymentMethod.find();
        const bill = await Billing.find();
        const alertMsg = req.flash('alertMsg');
        const alertStatus = req.flash('alertStatus');
        const alert = {
            message: alertMsg,
            status: alertStatus
        };
        res.render('pages/billing', {bill, alert });
    },
    store: async (req, res) => {
        try {
            const {
                qrCode,
                paymentStatus,
            } = req.body;

            let paidBilling = await PaymentMethod.create({

            });

            let unpaidBilling = await Paymentmethod.create({

            });

            let dataBilling = await Billing.create({
                qrCode: req.file.filename,
                paymentStatus: paymentStatus
            });


            req.flash('alertMsg', 'Done, your data has been saved.');
            req.flash('alertStatus', 'success'); 
        } catch(error){
            req.flash('alertMsg', error.message)
            req.flash('alertStatus', 'danger');
            res.redirect('/billing');
        }
    },
}