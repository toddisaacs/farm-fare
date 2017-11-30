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

exports.addMarket = async (req, res) => {
  res.render('addMarket', { title: 'Add Market' });
}

exports.createMarket = async (req, res) => {
  console.log(req.body);

  const market =  (new Market(req.body));
  console.log(market);
  await market.save();

  res.redirect('/markets');
}

exports.marketsNear =  async (req, res) => {
  
  const coordinates = [req.query.lng, req.query.lat].map(parseFloat); //note these are coordinates are flipped
 
  const q = {
    location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates
        },
        $maxDistance: 100000 // 10km
      }
    }
  };


  const markets = await Market.find(q).select('name description location photo').limit(10);
  res.json(markets);
}
