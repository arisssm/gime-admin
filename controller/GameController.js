const Games = require('../models/Game');
const Specification = require('../models/Specification');

module.exports = {
    index: async (req, res) => {
        const games = await Games.find();
        const reqSpecifications = await Specification.find({ category: 'req' });
        const minSpecifications = await Specification.find({ category: 'min' });
        const user = req.session.user;
        const alertMsg = req.flash('alertMsg');
        const alertStatus = req.flash('alertStatus');
        const alert = {
            message: alertMsg,
            status: alertStatus
        };
        res.locals.title = 'Master Data | Game ';
        res.locals.currentPage = 'game';
        res.render('pages/game', {games, alert, reqSpecifications, minSpecifications, user });
    },
    search: async (req, res) => {
        try {
            const user = req.session.user;
            const searchGames = req.query.search || '';
            const regex = new RegExp(searchGames, 'i');
            
            let games;
            if (searchGames) {
                games = await Games.find({ name: regex });
            } else {
                games = await Games.find({});
            }
            const reqSpecifications = await Specification.find({ category: 'req' });
            const minSpecifications = await Specification.find({ category: 'min' });
            const alertMsg = req.flash('alertMsg');
            const alertStatus = req.flash('alertStatus');
            const alert = {
                message: alertMsg,
                status: alertStatus
            };
        
            res.locals.title = 'Master Data | Game';
            res.locals.currentPage = 'game';
            res.render('pages/game', { games, user, alert, reqSpecifications, minSpecifications });
        } catch (error) {
            console.error('Error:', error);
            req.flash('alertMsg', error.message);
            req.flash('alertStatus', 'danger');
            res.redirect('/game');
        }        
    },
    store: async (req, res) => {
        try{
            const{ 
                name, 
                price, 
                description, 
                trailer, 
                isRecommendation, 
                isOnSale, 
                isFreeGame, 
                isSpecialOffer,
                min_os,
                min_processor,
                min_memory,
                min_graphic,
                req_os,
                req_processor,
                req_memory,
                req_graphic
            } = req.body;

            let minSpecification = await Specification.create({
                os: min_os,
                processor: min_processor,
                memory: min_memory,
                graphic: min_graphic,
                category: 'min'
            });
            let reqSpecification = await Specification.create({
                os: req_os,
                processor: req_processor,
                memory: req_memory,
                graphic: req_graphic,
                category: 'req'
            });
            let newGame = await Games.create({
                name,
                price,
                description,
                cover: req.file.filename,
                trailer,
                isRecommendation,
                isOnSale,
                isFreeGame,
                isSpecialOffer,
                // specificationId: [ minSpecification._id, reqSpecification._id]
            });
            newGame.specificationId.push({ _id: minSpecification._id});
            newGame.specificationId.push({ _id: reqSpecification._id});
            await newGame.save();
            
            req.flash('alertMsg', 'Done, your data has been saved.');
            req.flash('alertStatus', 'success');
            res.redirect('/game');
        } catch(error){
            req.flash('alertMsg', error.message)
            req.flash('alertStatus', 'danger');
            res.redirect('/game');
        }
    }
}
