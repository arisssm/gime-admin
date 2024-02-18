module.exports = {
    index: (req,res) => {
        res.locals.title = 'Master Data | Cart';
        res.locals.currentPage = 'cart';
        res.render('pages/cart');
    }
}