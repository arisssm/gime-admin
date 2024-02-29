const News = require('../models/News');

module.exports = {
    index: async (req, res) => {
        try {
            const { search } = req.query; // Mengambil query pencarian dari URL
            let news;
            if (search) {
                // Jika ada, cari berdasarkan nama
                news = await News.find({ name: { $regex: search, $options: 'i' } }); // Menggunakan regular expression untuk pencarian tanpa memperhatikan huruf besar/kecil
            } else {
                // Jika tidak ada, ambil semua berita
                news = await News.find();
            }
            const user = req.session.user;
            const alertMsg = req.flash('alertMsg');
            const alertStatus = req.flash('alertStatus');
            const alert = {
                message: alertMsg,
                status: alertStatus
            };
            res.locals.title = 'Master Data | News';
            res.locals.currentPage = 'news';
            res.render('pages/news', { news, alert, user });
        } catch (error) {
            console.error('Error:', error);
            req.flash('alertMsg', 'Error occurred while searching news.');
            req.flash('alertStatus', 'danger');
            res.redirect('/news');
        }
    },
    store: async (req, res) => {
        try {
            const {title, publishDate, content, isPopular} = req.body;
            // console.log(req.body);
            await News.create({
                title,
                publishDate,
                content,
                image: req.file.filename,
                isPopular
            });
            req.flash('alertMsg', 'Done, your data has been saved.');
            req.flash('alertStatus', 'success');
            res.redirect('/news');
        } catch (error) {
            // console.log(error.message);
            req.flash('alertMsg', error.message)
            req.flash('alertStatus', 'danger');
            res.redirect('/news');
        }
    },
    update: async (req, res) => {
        try{
            const { id, title, publishDate, content, isPopular} = req.body;
            // console.log(req.body);
            if (req.file !== undefined ){
                await News.updateOne({ _id:id },{
                    title: title,
                    publishDate: publishDate,
                    content: content,
                    image: req.file.filename,
                    isPopular: isPopular
                });
            } else {
                await News.updateOne({ _id:id },{
                    title: title,
                    publishDate: publishDate,
                    content: content,
                    isPopular: isPopular
                });
            };
            req.flash('alertMsg', 'Done, your data has been updated.');
            req.flash('alertStatus', 'success');
            res.redirect('/news');
        } catch(error) {
            // console.log(error.message);
            req.flash('alertMsg', error.message)
            req.flash('alertStatus', 'danger');
            res.redirect('/news');
        }
    },
    delete: async (req, res) => {
        const {id} = req.params;
        await News.deleteOne({ _id:id});
        req.flash('alertMsg', 'Done, your data has been deleted.');
        req.flash('alertStatus', 'warning');
        res.redirect('/news');
    }

}
