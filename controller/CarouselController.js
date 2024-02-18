const Carousel = require('../models/Carousel');

module.exports = {
    index: async (req,res) => {
        res.locals.title = 'Master Data | Carousel';
        res.locals.currentPage = 'carousel';
        const carousel = await Carousel.find();
        const alertMsg = req.flash('alertMsg');
        const alertStatus = req.flash('alertStatus');
        const alert = {
            message: alertMsg,
            status: alertStatus
        };
        res.render('pages/carousel', {carousel, alert});
    },

    store: async (req, res) => {
        try {
            const {title, description}  = req.body;
            // console.log(req.body);
            // console.log(req.file);
            // console.log({image,title,description});
            await Carousel.create({
                image: req.file.filename,
                title,
                description
            });
            req.flash('alertMsg', 'Done, your data has been saved.');
            req.flash('alertStatus', 'success');
            res.redirect('/carousel');
        } catch(error){
            req.flash('alertMsg', error.message)
            req.flash('alertStatus', 'danger');
            res.redirect('/carousel');
        }
    },
    update: async (req, res) => {
        try{
            const {id, title, description} = req.body;
            if(req.file !== undefined) {
                await Carousel.updateOne({_id:id}, {
                    image: req.file.filename,
                    title: title,
                    description: description
                });
            }else {
                await Carousel.updateOne({_id:id}, {
                    title: title,
                    description: description
                });
            }
            req.flash('alertMsg', 'Done, your data has been updated.');
            req.flash('alertStatus', 'success');
            res.redirect('/carousel');
        } catch(error){
            req.flash('alertMsg', error.message)
            req.flash('alertStatus', 'info');
            res.redirect('/carousel');
        }
    },
    delete: async (req, res) => {
        const {id} = req.params;
        await Carousel.deleteOne({_id:id});
        res.redirect('/carousel');
    }
}