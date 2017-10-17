const express = require('express');
const router = express.Router();
const marketController = require('../controllers/marketController');

/* GET home page. */
router.get('/', marketController.homePage);

router.get('/markets', marketController.getMarkets);

module.exports = router;
