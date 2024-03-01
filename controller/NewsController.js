const News = require('../models/News');

module.exports = {
    index: async (req, res) => {
        try {
            const news = await News.find();
            // format date
            // const formattedNews = news.map(item => {
            //     const date = new Date(item.publishDate);
            //     const options = { weekday: 'long', day: '2-digit', month: 'short', year: 'numeric' };
            //     const formattedDate = date.toLocaleDateString('en-US', options);
            //     return { ...item.toObject(), formattedDate }; // Menambahkan tanggal yang diformat ke objek
            // });
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
            req.flash('alertMsg', error.message);
            req.flash('alertStatus', 'danger');
            res.redirect('/news');
        }
    },
    search: async (req, res) => {
        try {
            const user = req.session.user;
            const searchNews = req.query.search || '';
            const regex = new RegExp(searchNews, 'i');
            
            let news;
            if (searchNews) {
                news = await News.find({ title: regex });
            } else {
                news = await News.find({});
            }

            const alertMsg = req.flash('alertMsg');
            const alertStatus = req.flash('alertStatus');
            const alert = {
                message: alertMsg,
                status: alertStatus
            };
        
            res.locals.title = 'Master Data | News';
            res.locals.currentPage = 'news';
            res.render('pages/news', { news, user, alert });
        } catch (error) {
            console.error('Error:', error);
            req.flash('alertMsg', error.message);
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
