const mongoose = require('mongoose');
const Market = mongoose.model('Market');

exports.homePage = (req, res) => {
  res.render('index', { title: 'Farm Fare' });
}

exports.getMarkets = async (req, res) => {
  const markets = await Market.find();
  res.render('markets', { title: 'Markets', markets });
}

exports.getMarketById = async (req, res) => {
  const market = await Market.findOne({ _id: req.params.id });
  res.render('market', { title: market.name, market });
};
