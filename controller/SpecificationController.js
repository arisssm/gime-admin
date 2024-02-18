module.exports = {
    index: (req, res) => {
        res.locals.title = 'Master Data | Specification';
        res.locals.currentPage = 'specification';
        res.render('pages/specification');
    }
}