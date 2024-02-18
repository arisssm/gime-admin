const Feature = require('../models/Feature');
const fs = require('fs');
const path = require('path');

module.exports = {
    index: async (req, res) => {
        res.locals.title = 'Master Data | Feature';
        res.locals.currentPage = 'feature';
        const feature = await Feature.find();
        const alertMsg = req.flash('alertMsg');
        const alertStatus = req.flash('alertStatus');
        const alert = {
            message: alertMsg,
            status: alertStatus
        }
        res.render('pages/feature', {feature, alert});
    },
    store: async (req, res) => {
        try{
            const {featureName, description} = req.body;
            // console.log ({featureName, image, description});
            // console.log (req.file);
            await Feature.create({
                featureName,
                image: req.file.filename,
                description
            });
            req.flash('alertMsg', 'Done, your data has been saved.');
            req.flash('alertStatus', 'success');
            res.redirect('/feature');
        } catch(error) {
            req.flash('alertMsg', error.message)
            req.flash('alertStatus', 'danger');
            res.redirect('/feature');
        }
    },
    update: async (req, res) => {
        try{
            const {id, featureName, description} = req.body;
            // console.log({id, featureName, image, description});
            // console.log(req.file);
            if (req.file !== undefined ) {
                await Feature.updateOne({_id:id}, {
                    featureName: featureName,
                    image: req.file.filename,
                    description: description
                });
            } else {
                await Feature.updateOne({_id:id}, {
                    featureName: featureName,
                    description: description
                });
            }
            req.flash('alertMsg', 'Done, your data has been updated.');
            req.flash('alertStatus', 'success');
            res.redirect('/feature');
        } catch(error) {
            req.flash('alertMsg', error.message)
            req.flash('alertStatus', 'danger');
            res.redirect('/feature');
        }
    },
    delete: async (req, res) => {
        const { id } = req.params;
        try {
            // Mengambil data feature sebelum dihapus
            const feature = await Feature.findOne({_id: id});
            // Menghapus file gambar dari direktori
            if (feature && feature.image) {
                const imagePath = path.join(__dirname, '../public/images', feature.image);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }
            // Menghapus data dari database
            await Feature.deleteOne({_id: id});
            req.flash('alertMsg', 'Done, your data has been deleted.');
            req.flash('alertStatus', 'warning');
            res.redirect('/feature');
        } catch (error) {
            console.error(error);
            req.flash('alertMsg', 'Failed to delete data.');
            req.flash('alertStatus', 'danger');
            res.redirect('/feature');
        }
    }
}

// await Feature.deleteOne({_id:id});
// req.flash('alertMsg', 'Done, your data has been deleted.');
// req.flash('alertStatus', 'warning');
// res.redirect('/feature');