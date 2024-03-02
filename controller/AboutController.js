const About = require('../models/About');

module.exports = {
    index: async (req, res) => {
        res.locals.title = 'Master Data | About ';
        res.locals.currentPage = 'about';
        const about = await About.find();
        const user = req.session.user;
        const alertMsg = req.flash('alertMsg');
        const alertStatus = req.flash('alertStatus');
        const alert = {
            message: alertMsg,
            status: alertStatus
        };
        // console.log(about);
        res.render('pages/about', {about, alert, user});
    },
    store: async (req, res) => {
        try{
            const {corporateName,location,description,address,phone} = req.body;
            // console.log({corporateName,location,description,address,phone});
            // console.log(req.body);
            await About.create({
                corporateName,
                location,
                description,
                address,
                phone
            });
            req.flash('alertMsg', 'Done, your data has been saved.');
            req.flash('alertStatus', 'success');
            res.redirect('/about');
        } catch(error){
            req.flash('alertMsg', error.message)
            req.flash('alertStatus', 'danger');
            res.redirect('/about');
        }
    },
    update: async (req, res) => {
        try{
            const{id, corporateName, location, description, address, phone} = req.body;
            await About.updateOne({_id:id}, {
                corporateName: corporateName,
                location: location,
                description: description,
                address: address,
                phone: phone
            });
            req.flash('alertMsg', 'Done, your data has been saved.');
            req.flash('alertStatus', 'success');
            res.redirect('/about');
        } catch(error){
            req.flash('alertMsg', error.message)
            req.flash('alertStatus', 'danger');
            res.redirect('/about');
        }
    },
    delete: async (req, res) => {
        const{id} = req.params;
        await About.deleteOne({_id:id});
        res.redirect('/about');
    }
}
