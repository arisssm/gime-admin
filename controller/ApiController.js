// step 4
const News = require('../models/News');
const Game = require('../models/Game');

module.exports = {
    indexNews: async (req, res) => {
        const news = await News.find();
        res.status(200).json(news);
    },
    indexGame: async (req, res) => {
        const game = await Game.find();
        res.status(200).json(game);
    }

}