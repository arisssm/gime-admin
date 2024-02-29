const Game = require('../models/Game');
const User = require('../models/User');
const Library = require('../models/Library');

module.exports = {
    index: async (req, res) => {
        try {
            const library = await Library.find().populate('gameId').populate('userId');
            console.log(library);
            const game = await Game.find();
            const usr = await User.find();
            const user = req.session.user;
            const alertMsg = req.flash('alertMsg');
            const alertStatus = req.flash('alertStatus');
            const alert = {
                message: alertMsg,
                status: alertStatus
            };
            res.locals.title = 'Master Data | Library';
            res.locals.currentPage = 'library';
            res.render('pages/library', { user, library, alert, game, usr });
        } catch (error) {
            console.error(error);
            req.flash('alertMsg', 'An error occurred while processing your request.');
            req.flash('alertStatus', 'danger');
            res.redirect('/library');
        }
    }
}
