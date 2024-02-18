module.exports = {
    index: (req,res) => {
        res.locals.title = 'Master Data | Library';
        res.locals.currentPage = 'library';
        res.render('pages/library');
    }
}