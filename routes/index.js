const express = require('express');
const router = express.Router();
const marketController = require('../controllers/marketController');
const { catchErrors } = require('../handlers/errorHandlers');

/* GET home page. */
router.get('/', marketController.homePage);

router.get('/markets', catchErrors(marketController.getMarkets));
router.post('/markets', catchErrors(marketController.createMarket));
router.get('/markets/add', catchErrors(marketController.addMarket));
router.get('/markets/:id', catchErrors(marketController.getMarketById));


module.exports = router;
