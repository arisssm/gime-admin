const Faq = require('../models/Faq');

module.exports = {
    index: async (req, res) => {
        res.locals.title = 'Master Data | FAQ';
        res.locals.currentPage = 'faq';
        const faq = await Faq.find();
        const user = req.session.user;
        const alertMsg = req.flash('alertMsg');
        const alertStatus = req.flash('alertStatus');
        const alert = {
            message: alertMsg,
            status: alertStatus
        }
        res.render('pages/faq', {faq, alert, user});
    },
    store: async (req, res) => {
        try {
            const {question, answer} = req.body;
            //console.log{question,answer};
            await Faq.create({question, answer});
            req.flash('alertMsg', 'Done, your data has been saved.');
            req.flash('alertStatus', 'success');
            res.redirect('/faq');
        } catch(error) {
            req.flash('alertMsg', error.message)
            req.flash('alertStatus', 'danger');
            res.redirect('/faq');
        }
    },
    update: async (req, res) => {
        try{
            const {id, question, answer} = req.body;
            // console.log({id,question, answer});
            await Faq.updateOne({ _id:id }, {
                question: question,
                answer: answer,
            });
            req.flash('alertMsg', 'Done, your data has been updated.');
            req.flash('alertStatus', 'success');
            res.redirect('/faq');
        } catch(error) {
            req.flash('alertMsg', error.message)
            req.flash('alertStatus', 'danger');
            res.redirect('/faq');
        }
    },
    delete: async (req, res) => {
        const { id } = req.params;
        // console.log({id});
        await Faq.deleteOne({_id:id});
        req.flash('alertMsg', 'Done, your data has been deleted.');
        req.flash('alertStatus', 'warning');
        res.redirect('/faq');
    }
    
}