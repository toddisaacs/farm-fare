

exports.homePage = (req, res) => {
  res.render('index', { title: 'Farm Fare' });
}

exports.getMarkets =  (req, res) => {
  const markets = [];
  res.render('markets', { title: 'Markets', markets });
}