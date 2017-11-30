const marketController = require('../controllers/marketController');
const { catchErrors } = require('../handlers/errorHandlers');

const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('API routes');
});


router.get('/markets', (req, res) => {
  res.send('');
});

router.get('/markets/near', catchErrors(marketController.marketsNear));

module.exports = router;
